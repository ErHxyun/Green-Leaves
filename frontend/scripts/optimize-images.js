/*
 * Generate WebP and AVIF copies for images under src/pictures and mirror them to public/pictures.
 * Usage: npm install; npm run optimize:images
 */

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const INPUT_DIR = path.join(ROOT, 'src', 'pictures');
const OUTPUT_ROOT = path.join(ROOT, 'public', 'pictures');
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png']);
const OUTPUT_FORMATS = [
	{ ext: '.webp', format: 'webp', options: { quality: 78 } },
	{ ext: '.avif', format: 'avif', options: { quality: 50 } },
];

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(fullPath);
			continue;
		}
		const ext = path.extname(entry.name).toLowerCase();
		if (!VALID_EXT.has(ext)) continue;
		await convertImage(fullPath, ext);
	}
}

async function convertImage(filePath, ext) {
	const baseName = path.basename(filePath, ext);
	const relativeDir = path.dirname(path.relative(INPUT_DIR, filePath));
	const outDir = path.join(OUTPUT_ROOT, relativeDir);
	await fs.mkdir(outDir, { recursive: true });

	const targetOriginal = path.join(outDir, `${baseName}${ext}`);
	await fs.copyFile(filePath, targetOriginal);
	console.log('✔ copied', path.relative(ROOT, targetOriginal));
	const input = sharp(filePath).rotate();
	const meta = await input.metadata();
	for (const { ext: outExt, format, options } of OUTPUT_FORMATS) {
		const outPath = path.join(outDir, `${baseName}${outExt}`);
		await sharp(filePath)
			.rotate()
			.resize({ width: Math.min(meta.width || 2000, 2000) })
			.toFormat(format, options)
			.toFile(outPath);
		console.log('✔ wrote', path.relative(ROOT, outPath));
	}
}

(async () => {
	try {
		await fs.mkdir(OUTPUT_ROOT, { recursive: true });
		await walk(INPUT_DIR);
		console.log('Done.');
	} catch (err) {
		console.error('Image optimization failed:', err);
		process.exitCode = 1;
	}
})();
