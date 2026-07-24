import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const projectRoot = join(import.meta.dirname, '..');
const staticBuild = join(projectRoot, 'build');
const cpanelOverlay = join(projectRoot, 'deploy/cpanel');
const distRoot = join(projectRoot, 'dist');
const releaseDirectory = join(distRoot, 'cpanel');
const archivePath = join(distRoot, 'nordic-solutions-cpanel.zip');
const requiredFiles = [
	'index.html',
	'en.html',
	'ar.html',
	'sitemap.xml',
	'.htaccess',
	'api/contact.php'
];
const zipExecutable = Bun.which('zip');

if (!zipExecutable) {
	throw new Error('The zip command is required to create the cPanel upload archive.');
}

await rm(releaseDirectory, { recursive: true, force: true });
await rm(archivePath, { force: true });
await mkdir(releaseDirectory, { recursive: true });
await cp(staticBuild, releaseDirectory, { recursive: true });
await cp(cpanelOverlay, releaseDirectory, { recursive: true });

for (const relativePath of requiredFiles) {
	if (!(await Bun.file(join(releaseDirectory, relativePath)).exists())) {
		throw new Error(`Missing cPanel release file: ${relativePath}`);
	}
}

const zip = Bun.spawnSync([zipExecutable, '-qr', archivePath, '.'], {
	cwd: releaseDirectory,
	stderr: 'pipe'
});

if (!zip.success) {
	throw new Error(`Could not create cPanel archive: ${zip.stderr.toString().trim()}`);
}

const checksum = createHash('sha256')
	.update(await readFile(archivePath))
	.digest('hex');

console.log(`cPanel release: ${releaseDirectory}`);
console.log(`Upload archive: ${archivePath}`);
console.log(`SHA-256: ${checksum}`);
