const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertImagesToWebP() {
  const publicImagesDir = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(publicImagesDir);
  
  console.log('Starting image conversion to WebP...');
  
  for (const file of files) {
    const filePath = path.join(publicImagesDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Only convert jpg, jpeg, and png files
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const baseName = path.basename(file, ext);
      const webpPath = path.join(publicImagesDir, `${baseName}.webp`);
      
      try {
        console.log(`Converting ${file} to ${baseName}.webp...`);
        await sharp(filePath)
          .webp({ quality: 80 }) // High quality WebP
          .toFile(webpPath);
        
        console.log(`✓ Successfully converted ${file}`);
        
        // Optionally delete the original file (uncomment if you want to)
        // fs.unlinkSync(filePath);
        
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error);
      }
    }
  }
  
  console.log('Image conversion completed!');
}

convertImagesToWebP().catch(console.error);
