#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MAX_DIMENSION = 1200;
const QUALITY = 80;

async function getImageFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(inputPath) {
  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, `${basename}.webp`);

  const originalSize = fs.statSync(inputPath).size;

  try {
    await sharp(inputPath)
      .resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    // Delete original
    fs.unlinkSync(inputPath);

    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`  ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (${savings}% smaller)`);

    return { originalSize, newSize };
  } catch (err) {
    console.error(`✗ Failed: ${inputPath}`);
    console.error(`  ${err.message}`);
    return { originalSize: 0, newSize: 0, error: true };
  }
}

async function main() {
  const targetDir = process.argv[2];

  if (!targetDir) {
    console.log('Usage: npm run optimize-images <folder>');
    console.log('Example: npm run optimize-images app/assets/dinners');
    process.exit(1);
  }

  const resolvedDir = path.resolve(targetDir);

  if (!fs.existsSync(resolvedDir)) {
    console.error(`Error: Directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  console.log(`\nOptimizing images in: ${resolvedDir}`);
  console.log(`Max dimension: ${MAX_DIMENSION}px | Quality: ${QUALITY}%\n`);

  const files = await getImageFiles(resolvedDir);

  if (files.length === 0) {
    console.log('No JPG or PNG files found.');
    process.exit(0);
  }

  console.log(`Found ${files.length} image(s) to optimize\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (!result.error) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Optimized: ${successCount}/${files.length} images`);
  console.log(`Total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB → ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('='.repeat(50));
  console.log('\nRemember to update your imports from .jpg/.png to .webp!');
}

main();
