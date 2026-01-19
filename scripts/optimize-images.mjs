import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const ASSETS_DIR = './app/assets';
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;

// Different quality settings based on image type
const QUALITY_SETTINGS = {
  dinner: { quality: 80, maxWidth: 1600 },    // Event photos
  team: { quality: 85, maxWidth: 800 },       // Headshots
  advisors: { quality: 85, maxWidth: 600 },   // Smaller headshots
  logos: { quality: 90, maxWidth: 400 },      // Logos need to stay crisp
  default: { quality: 80, maxWidth: 1920 }
};

async function getFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else {
      const ext = extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function getSettings(filePath) {
  if (filePath.includes('dinner')) return QUALITY_SETTINGS.dinner;
  if (filePath.includes('team')) return QUALITY_SETTINGS.team;
  if (filePath.includes('advisor')) return QUALITY_SETTINGS.advisors;
  if (filePath.includes('logo')) return QUALITY_SETTINGS.logos;
  return QUALITY_SETTINGS.default;
}

async function optimizeImage(filePath) {
  const settings = getSettings(filePath.toLowerCase());
  const stats = await stat(filePath);
  const originalSize = stats.size;

  // Skip if already small (under 100KB for logos, 200KB for others)
  const threshold = filePath.toLowerCase().includes('logo') ? 100 * 1024 : 200 * 1024;
  if (originalSize < threshold) {
    console.log(`⏭️  Skipping (already optimized): ${filePath}`);
    return { skipped: true, saved: 0 };
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Calculate new dimensions
    let width = metadata.width;
    let height = metadata.height;

    if (width > settings.maxWidth) {
      height = Math.round(height * (settings.maxWidth / width));
      width = settings.maxWidth;
    }

    // Create optimized version (overwrite original)
    const ext = extname(filePath).toLowerCase();
    let outputBuffer;

    if (ext === '.png') {
      // For PNGs, convert to WebP for photos, keep PNG for logos/graphics
      if (filePath.toLowerCase().includes('logo')) {
        outputBuffer = await image
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: settings.quality, compressionLevel: 9 })
          .toBuffer();
      } else {
        // Convert photos to JPEG (better compression for photos)
        const newPath = filePath.replace(/\.png$/i, '.jpg');
        outputBuffer = await image
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: settings.quality, mozjpeg: true })
          .toFile(newPath);

        // We'll need to update imports - for now just optimize in place
        outputBuffer = await image
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: settings.quality, compressionLevel: 9 })
          .toBuffer();
      }
    } else {
      // JPEG optimization
      outputBuffer = await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: settings.quality, mozjpeg: true })
        .toBuffer();
    }

    // Write back to original file
    await sharp(outputBuffer).toFile(filePath);

    const newStats = await stat(filePath);
    const newSize = newStats.size;
    const saved = originalSize - newSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);

    console.log(`✅ ${basename(filePath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (saved ${percent}%)`);

    return { skipped: false, saved };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { skipped: true, saved: 0, error: true };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('Scanning for images...\n');

  const files = await getFiles(ASSETS_DIR);
  console.log(`Found ${files.length} images to process\n`);

  let totalSaved = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result.skipped) {
      skipped++;
    } else {
      processed++;
      totalSaved += result.saved;
    }
  }

  console.log('\n========================================');
  console.log(`✨ Optimization complete!`);
  console.log(`   Processed: ${processed} images`);
  console.log(`   Skipped: ${skipped} images`);
  console.log(`   Total saved: ${(totalSaved/1024/1024).toFixed(2)} MB`);
  console.log('========================================\n');
}

main().catch(console.error);
