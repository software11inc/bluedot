const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_DIR = path.join(__dirname, '../app/assets/team-logos');
const TARGET_RATIO = 3; // Target width:height ratio (3:1)
const MIN_RATIO = 2.5; // Only pad logos with ratio below this

async function standardizeLogo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpeg', '.jpg'].includes(ext)) return;

  const fileName = path.basename(filePath);

  try {
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;
    const currentRatio = width / height;

    // Skip if already wide enough
    if (currentRatio >= MIN_RATIO) {
      console.log(`✓ ${fileName} - ratio ${currentRatio.toFixed(2)} (already wide enough)`);
      return;
    }

    // Calculate new width to achieve target ratio
    const newWidth = Math.round(height * TARGET_RATIO);
    const paddingLeft = Math.round((newWidth - width) / 2);
    const paddingRight = newWidth - width - paddingLeft;

    console.log(`→ ${fileName} - ratio ${currentRatio.toFixed(2)} → ${TARGET_RATIO}:1 (adding ${paddingLeft + paddingRight}px horizontal padding)`);

    // Determine background color (transparent for PNG, white for JPEG)
    const background = ext === '.png'
      ? { r: 255, g: 255, b: 255, alpha: 0 }
      : { r: 255, g: 255, b: 255 };

    const outputBuffer = await sharp(filePath)
      .extend({
        top: 0,
        bottom: 0,
        left: paddingLeft,
        right: paddingRight,
        background
      })
      .toBuffer();

    // Write back to same file
    fs.writeFileSync(filePath, outputBuffer);
    console.log(`  ✓ Saved ${fileName}`);

  } catch (err) {
    console.error(`✗ Error processing ${fileName}:`, err.message);
  }
}

async function main() {
  console.log('Standardizing logo aspect ratios...\n');
  console.log(`Target ratio: ${TARGET_RATIO}:1`);
  console.log(`Min ratio threshold: ${MIN_RATIO}:1\n`);

  const files = fs.readdirSync(LOGO_DIR);

  for (const file of files) {
    const filePath = path.join(LOGO_DIR, file);
    if (fs.statSync(filePath).isFile()) {
      await standardizeLogo(filePath);
    }
  }

  console.log('\nDone!');
}

main();
