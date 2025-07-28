import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to copy directory recursively
function copyDirSync(src, dst) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory does not exist: ${src}`);
    return 0;
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst, { recursive: true });
  }

  let copiedFiles = 0;
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copiedFiles += copyDirSync(srcPath, dstPath);
    } else if (entry.isFile()) {
      // Copy all image files
      const ext = path.extname(entry.name).toLowerCase();
      if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
        fs.copyFileSync(srcPath, dstPath);
        console.log(`Copied: ${entry.name} to ${dst}`);
        copiedFiles++;
      }
    }
  }

  return copiedFiles;
}

// Copy from multiple sources to ensure images are available in all needed locations
const sources = [
  // From client/public/images to dist/public/images (for Vite build)
  { 
    src: path.join(__dirname, 'client', 'public', 'images'), 
    dst: path.join(__dirname, 'dist', 'public', 'images'),
    name: 'client/public/images → dist/public/images'
  },
  // From client/public/images to dist/images (for Express static serving)
  { 
    src: path.join(__dirname, 'client', 'public', 'images'), 
    dst: path.join(__dirname, 'dist', 'images'),
    name: 'client/public/images → dist/images'
  },
  // From top-level public/images to dist/images (fallback)
  { 
    src: path.join(__dirname, 'public', 'images'), 
    dst: path.join(__dirname, 'dist', 'images'),
    name: 'public/images → dist/images'
  },
  // From attached_assets to dist/images (for your uploaded assets)
  { 
    src: path.join(__dirname, 'attached_assets'), 
    dst: path.join(__dirname, 'dist', 'images'),
    name: 'attached_assets → dist/images'
  }
];

console.log('🖼️  Starting image copy process...\n');

let totalCopied = 0;
sources.forEach(({ src, dst, name }) => {
  console.log(`📁 Processing: ${name}`);
  const copied = copyDirSync(src, dst);
  totalCopied += copied;
  console.log(`✅ Copied ${copied} files\n`);
});

// Also ensure images from dist/public/images are copied to dist/images (post-build fix)
const postBuildSrc = path.join(__dirname, 'dist', 'public', 'images');
const postBuildDst = path.join(__dirname, 'dist', 'images');

if (fs.existsSync(postBuildSrc)) {
  console.log(`📁 Post-build copy: dist/public/images → dist/images`);
  const postBuildCopied = copyDirSync(postBuildSrc, postBuildDst);
  totalCopied += postBuildCopied;
  console.log(`✅ Post-build copied ${postBuildCopied} files\n`);
}

console.log(`🎉 Image copy completed! Total files copied: ${totalCopied}`);
