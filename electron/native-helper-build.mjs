import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chmod, copyFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Arch } from 'builder-util';
import { packageLinuxLibraries, packageLinuxLibraryNotices } from './native-linux-libraries.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../native/desktop-bridge');
const targets = {
  win32: { x64: 'x86_64-pc-windows-msvc', arm64: 'aarch64-pc-windows-msvc' },
  darwin: { x64: 'x86_64-apple-darwin', arm64: 'aarch64-apple-darwin' },
  linux: { x64: 'x86_64-unknown-linux-gnu', arm64: 'aarch64-unknown-linux-gnu' },
};

export function nativeTarget(platform, arch) {
  const target = targets[platform]?.[arch];
  if (!target) throw new Error(`Unsupported native helper target: ${platform}/${arch}`);
  return target;
}

/** Build for the actual installer architecture, then copy before signing. */
export async function packageNativeHelper(context) {
  const platform = context.electronPlatformName;
  const target = nativeTarget(platform, Arch[context.arch]);
  const targetDir = join(root, 'target');
  const name = 'voicestudio-desktop-bridge' + (platform === 'win32' ? '.exe' : '');
  const source = join(targetDir, target, 'release', name);
  const destination = join(context.packager.getResourcesDir(context.appOutDir), 'native');
  await mkdir(destination, { recursive: true });
  const binary = join(destination, name);

  const cachedBinary = resolve(root, '../../electron/release/win-unpacked/resources/native', name);
  if (!existsSync(source) && existsSync(cachedBinary)) {
    await mkdir(dirname(source), { recursive: true });
    await copyFile(cachedBinary, source);
  }

  if (!existsSync(source)) {
    await new Promise((resolve, reject) => {
      const child = spawn('cargo', ['build', '--locked', '--release', '--target', target], {
        cwd: root,
        env: { ...process.env, CARGO_TARGET_DIR: targetDir },
        stdio: 'inherit',
        windowsHide: true,
      });
      child.once('error', reject);
      child.once('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`Native helper build failed (${code})`)),
      );
    });
  }
  await copyFile(source, binary);
  if (platform === 'linux') {
    await packageLinuxLibraries(join(targetDir, target, 'release', name), binary);
    await packageLinuxLibraryNotices(join(targetDir, target, 'release', name), binary);
  }
  if (platform === 'win32') await context.packager.signIf(binary);
  else await chmod(binary, 0o755);
}
