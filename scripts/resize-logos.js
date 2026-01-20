const sharp = require('sharp');
const path = require('path');

const logosDir = path.join(__dirname, '../app/assets/team-logos');

// Target: At 42px rendered height, we want ~120-180px width
// So target aspect ratio is roughly 3:1 to 4:1 (width:height)

async function resizeLogo(filename, targetAspectRatio) {
  const inputPath = path.join(logosDir, filename);
  const tempPath = path.join(logosDir, `temp_${filename}`);

  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;
  const currentRatio = width / height;

  console.log(`${filename}: ${width}x${height} (ratio ${currentRatio.toFixed(2)}) -> target ${targetAspectRatio}`);

  if (currentRatio < targetAspectRatio) {
    // Logo is too tall (square-ish), need to crop height to make it wider proportionally
    const newHeight = Math.round(width / targetAspectRatio);
    const top = Math.round((height - newHeight) / 2);

    await sharp(inputPath)
      .extract({ left: 0, top: top, width: width, height: newHeight })
      .toFile(tempPath);

    console.log(`  Cropped to ${width}x${newHeight}`);
  } else if (currentRatio > targetAspectRatio) {
    // Logo is too wide, add padding to top/bottom
    const newHeight = Math.round(width / targetAspectRatio);
    const padding = Math.round((newHeight - height) / 2);

    await sharp(inputPath)
      .extend({
        top: padding,
        bottom: padding,
        left: 0,
        right: 0,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(tempPath);

    console.log(`  Padded to ${width}x${newHeight}`);
  }

  // Replace original with resized
  const fs = require('fs');
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);
    console.log(`  Saved!`);
  }
}

async function main() {
  // Make these BIGGER (currently too small/square) - crop to ~4:1 ratio
  // Capital One, Varo, Lloyds, Robinhood
  await resizeLogo('capital-one@logotyp.us.png', 4);
  await resizeLogo('varo@logotyp.us.png', 4);
  await resizeLogo('lloyds@logotyp.us.png', 4);
  await resizeLogo('Robinhood.png', 4);

  // Make these SMALLER (currently too wide) - pad to ~4:1 ratio
  // Discover (currently 6:1), Argus (currently 6:1)
  await resizeLogo('Discover.png', 4);
  await resizeLogo('Argus_Advisory.png', 3); // Match Oak which is 2:1

  // Make NYCA and Cross River bigger - crop to ~5:1 to match AFC/Bloomberg
  await resizeLogo('NYCA.png', 5);
  await resizeLogo('cross_river.png', 5);

  // Make Prosper smaller (currently ~4.5:1, make it ~3:1)
  await resizeLogo('Prosper.png', 3);

  console.log('\nDone! Check the logos visually.');
}

main().catch(console.error);
