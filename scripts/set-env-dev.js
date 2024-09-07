/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

// Đường dẫn tới file nguồn và file đích
const sourceFile = '.env.dev';
const destinationFile = '.env';

// Đọc nội dung từ file nguồn
fs.readFile(sourceFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Cannot read file ${sourceFile}:`, err);
    return;
  }

  // Ghi nội dung vào file đích
  fs.writeFile(destinationFile, data, (err) => {
    if (err) {
      console.error(`Cannot write file ${destinationFile}:`, err);
      return;
    }
    console.log(`Completed copy from ${sourceFile} to ${destinationFile}`);
  });
});
