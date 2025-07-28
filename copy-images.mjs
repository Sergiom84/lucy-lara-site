import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, 'public', 'images');
const dst = path.join(__dirname, 'dist', 'public', 'images');

// Create destination directory if it doesn't exist
if (!fs.existsSync(dst)) {
  fs.mkdirSync(dst, { recursive: true });
}

// Copy all .webp and .png files
const files = fs.readdirSync(src);
const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.png'));

imageFiles.forEach(file => {
  const srcFile = path.join(src, file);
  const dstFile = path.join(dst, file);
  fs.copyFileSync(srcFile, dstFile);
  console.log(`Copied: ${file}`);
});

console.log(`Successfully copied ${imageFiles.length} image files`);
