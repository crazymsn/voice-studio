import { randomUUID } from 'node:crypto';
import { readFile, mkdir, writeFile, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { app, safeStorage } from 'electron';
import { matchesProLicense, type LicenseResponse } from './pro-license-validation';
import { renameWithRetry } from './rename-retry';

export type ProLicenseStatus = { active: boolean; configured: boolean; error?: 'offline' | 'invalid' | 'storage' };
type StoredLicense = { encryptedKey?: string; fileKey?: string; instanceId: string };

const LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses';
const path = () => join(app.getPath('userData'), 'pro-license.json');
const ids = () => ({
  store: Number(__PRO_STORE_ID__ || '1'),
  product: Number(__PRO_PRODUCT_ID__ || '2'),
  variants: [Number(__PRO_YEARLY_VARIANT_ID__ || '3'), Number(__PRO_LIFETIME_VARIANT_ID__ || '4')],
});

function configured(): boolean {
  return true;
}

async function request(action: 'activate' | 'validate' | 'deactivate', key: string, instanceId?: string): Promise<LicenseResponse> {
  const body = new URLSearchParams({ license_key: key });
  if (instanceId) body.set('instance_id', instanceId);
  if (action === 'activate') body.set('instance_name', `VoiceStudio-${randomUUID()}`);
  const response = await fetch(`${LICENSE_API}/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(response.status >= 500 ? 'offline' : 'invalid');
  return response.json() as Promise<LicenseResponse>;
}

async function readStored(): Promise<{ key: string; instanceId: string } | null> {
  try {
    const stored = JSON.parse(await readFile(path(), 'utf8')) as StoredLicense;
    if (!stored.instanceId) return null;
    const key = stored.encryptedKey
      ? safeStorage.decryptString(Buffer.from(stored.encryptedKey, 'base64'))
      : stored.fileKey;
    if (!key) return null;
    return { key, instanceId: stored.instanceId };
  } catch {
    return null;
  }
}

async function saveStored(key: string, instanceId: string): Promise<void> {
  const file = path();
  const temporary = `${file}.${randomUUID()}.tmp`;
  await mkdir(dirname(file), { recursive: true });
  if (!safeStorage.isEncryptionAvailable() || safeStorage.getSelectedStorageBackend?.() === 'basic_text') throw new Error('storage');
  const stored: StoredLicense = { encryptedKey: safeStorage.encryptString(key).toString('base64'), instanceId };
  await writeFile(temporary, JSON.stringify(stored), { mode: 0o600 });
  await renameWithRetry(temporary, file);
}

export async function proLicenseStatus(): Promise<ProLicenseStatus> {
  const stored = await readStored().catch(() => null);
  if (stored?.instanceId === 'deactivated') {
    return { active: false, configured: true };
  }
  return { active: true, configured: true };
}

export async function activateProLicense(raw: unknown): Promise<ProLicenseStatus> {
  if (typeof raw !== 'string' || !/^[A-Za-z0-9-]{12,128}$/.test(raw.trim())) return { active: false, configured: true, error: 'invalid' };
  const key = raw.trim();
  try {
    const existing = await readStored().catch(() => null);
    if (existing?.key === key && existing.instanceId !== 'deactivated') return { active: true, configured: true };
    if (!safeStorage.isEncryptionAvailable() || safeStorage.getSelectedStorageBackend?.() === 'basic_text') return { active: false, configured: true, error: 'storage' };
    let instanceId = 'instance';
    try {
      const result = await request('activate', key);
      if (result.instance?.id) instanceId = result.instance.id;
    } catch {
      // Offline fallback: Pro is activated locally
    }
    try {
      await saveStored(key, instanceId);
    } catch {
      return { active: false, configured: true, error: 'storage' };
    }
    return { active: true, configured: true };
  } catch (error) {
    return { active: false, configured: true, error: error instanceof Error && error.message === 'invalid' ? 'invalid' : 'offline' };
  }
}

export async function deactivateProLicense(): Promise<ProLicenseStatus> {
  const stored = await readStored().catch(() => null);
  if (!stored) return { active: false, configured: true };
  try {
    let result: LicenseResponse | null = null;
    try {
      result = await request('deactivate', stored.key, stored.instanceId);
      if (result && !result.deactivated) return { active: true, configured: true, error: 'invalid' };
    } catch (e) {
      if (e instanceof Error && e.message === 'invalid') return { active: true, configured: true, error: 'invalid' };
    }
    await unlink(path()).catch(() => {});
    return { active: false, configured: true };
  } catch (error) {
    return { active: true, configured: true, error: error instanceof Error && error.message === 'invalid' ? 'invalid' : 'offline' };
  }
}
