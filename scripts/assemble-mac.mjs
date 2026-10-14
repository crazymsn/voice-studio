import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, rmSync, cpSync, copyFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const sevenZip = 'C:\\Users\\Alex\\AppData\\Local\\electron-builder\\Cache\\7zip@1.0.0\\7zip-win-x64-a34pt\\bin\\7za.exe';
const releaseDir = resolve(root, 'electron/release');
const outputDir = resolve(releaseDir, 'mac-arm64');
const targetZip = resolve(releaseDir, 'VoiceStudio-Electron-0.5.7-darwin-arm64.zip');

console.log('Extracting Electron for Mac...');
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

execFileSync(sevenZip, ['x', 'electron-v44.3.0-darwin-arm64.zip', '-omac-arm64', '-y'], {
  cwd: releaseDir,
  stdio: 'inherit',
});

const electronApp = resolve(outputDir, 'Electron.app');
const voiceStudioApp = resolve(outputDir, 'VoiceStudio.app');
if (existsSync(electronApp)) {
  renameSync(electronApp, voiceStudioApp);
}

const macosDir = resolve(voiceStudioApp, 'Contents/MacOS');
const oldExe = resolve(macosDir, 'Electron');
const newExe = resolve(macosDir, 'VoiceStudio');
if (existsSync(oldExe)) {
  renameSync(oldExe, newExe);
}

// Update Info.plist
const plistPath = resolve(voiceStudioApp, 'Contents/Info.plist');
if (existsSync(plistPath)) {
  let plist = readFileSync(plistPath, 'utf8');
  plist = plist.replace(/<key>CFBundleDisplayName<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleDisplayName</key>\n\t<string>VoiceStudio</string>');
  plist = plist.replace(/<key>CFBundleName<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleName</key>\n\t<string>VoiceStudio</string>');
  plist = plist.replace(/<key>CFBundleExecutable<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleExecutable</key>\n\t<string>VoiceStudio</string>');
  plist = plist.replace(/<key>CFBundleIdentifier<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleIdentifier</key>\n\t<string>com.voicestudio.desktop</string>');
  plist = plist.replace(/<key>CFBundleVersion<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleVersion</key>\n\t<string>0.5.7</string>');
  plist = plist.replace(/<key>CFBundleShortVersionString<\/key>\s*<string>[^<]*<\/string>/, '<key>CFBundleShortVersionString</key>\n\t<string>0.5.7</string>');
  writeFileSync(plistPath, plist, 'utf8');
}

// Copy icon
const iconSource = resolve(root, 'electron/build/icons/icon.icns');
const iconDest = resolve(voiceStudioApp, 'Contents/Resources/electron.icns');
if (existsSync(iconSource)) {
  rmSync(iconDest, { force: true });
  copyFileSync(iconSource, iconDest);
}

// Copy resources from win-unpacked resources
const winResources = resolve(root, 'electron/release/win-unpacked/resources');
const macResources = resolve(voiceStudioApp, 'Contents/Resources');

console.log('Copying application resources...');
// Copy app.asar
copyFileSync(resolve(winResources, 'app.asar'), resolve(macResources, 'app.asar'));

// Copy extra resources
const itemsToCopy = ['backend', 'omnivoice', 'frontend', 'brand', 'native', 'pyproject.toml', 'uv.lock', 'README.md', 'LICENSE', 'LICENSE-NOTICE.md'];
for (const item of itemsToCopy) {
  const src = resolve(winResources, item);
  const dest = resolve(macResources, item);
  if (existsSync(src)) {
    console.log('Copying', item);
    if (statSync(src).isDirectory()) {
      try {
        execFileSync('robocopy', [src, dest, '/E', '/NFL', '/NDL', '/NJH', '/NJS', '/nc', '/ns', '/np'], { stdio: 'ignore' });
      } catch (e) {
        if (e.status > 7) throw e;
      }
    } else {
      copyFileSync(src, dest);
    }
  }
}

console.log('Compressing VoiceStudio-Electron-0.5.7-darwin-arm64.zip...');
rmSync(targetZip, { force: true });
try {
  execFileSync(sevenZip, ['a', '-tzip', '../VoiceStudio-Electron-0.5.7-darwin-arm64.zip', 'VoiceStudio.app'], {
    cwd: outputDir,
    stdio: 'inherit',
  });
} catch (e) {
  // 7za returns exit code 1 for non-fatal warnings (such as symlinks on Windows)
  if (e.status > 1) throw e;
}

console.log('Mac client packaging complete!');
console.log('Target:', targetZip);
