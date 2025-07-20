/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/bump-version.js
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../app.config.js'); // hoặc app.json nếu bạn dùng static
let configText = fs.readFileSync(configPath, 'utf8');

// Regex tăng iOS buildNumber
configText = configText.replace(
  /buildNumber: ['"](\d+)['"]/,
  (_, v) => `buildNumber: '${parseInt(v) + 1}'`,
);

// Regex tăng Android versionCode
configText = configText.replace(
  /versionCode: (\d+)/,
  (_, v) => `versionCode: ${parseInt(v) + 1}`,
);

fs.writeFileSync(configPath, configText);
console.log('✅ Bumped buildNumber and versionCode.');
