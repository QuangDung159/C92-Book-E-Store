/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

// Đường dẫn tới file nguồn và file đích
const sourceFile = '.env.prod';
const destinationFile = '.env';

// Đọc nội dung từ file nguồn
fs.readFile(sourceFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Không thể đọc file ${sourceFile}:`, err);
    return;
  }

  // Ghi nội dung vào file đích
  fs.writeFile(destinationFile, data, (err) => {
    if (err) {
      console.error(`Không thể ghi file ${destinationFile}:`, err);
      return;
    }
    console.log(
      `Đã sao chép nội dung từ ${sourceFile} sang ${destinationFile}`,
    );
  });
});
