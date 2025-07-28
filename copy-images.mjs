import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Copy from both public/images and top-level images
const sources = [
  { src: path.join(__dirname, 'public', 'images'), dst: path.join(__dirname, 'dist', 'public', 'images') },
  { src: path.join(__dirname, 'images'), dst: path.join(__dirname, 'dist', 'images') }
];

sources.forEach(({ src, dst }) => {
  if (!fs.existsSync(src)) {
    console.log(`Source directory does not exist: ${src}`);
    return;
  }

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
    console.log(`Copied: ${file} to ${dst}`);
  });

  console.log(`Successfully copied ${imageFiles.length} image files from ${src}`);
});
