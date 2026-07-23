/* eslint-disable @typescript-eslint/no-require-imports */
const readline = require('readline');
const { spawnSync } = require('child_process');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

async function runWizard() {
  console.log(`\n${colors.cyan}${colors.bright}===========================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}  🚀 C92 BOOK E-STORE BUILD WIZARD 🚀  ${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}===========================================${colors.reset}\n`);

  // 1. Select Platform
  console.log(`${colors.yellow}1. Choose Target Platform:${colors.reset}`);
  console.log('   [1] Android');
  console.log('   [2] iOS');
  console.log('   [3] Both (Android + iOS)');
  const platformChoice = (await askQuestion('\nSelect (1-3) [default: 1]: ')).trim() || '1';

  let platforms = [];
  if (platformChoice === '2') {
    platforms = ['ios'];
  } else if (platformChoice === '3') {
    platforms = ['android', 'ios'];
  } else {
    platforms = ['android'];
  }

  // 2. Select Environment
  console.log(`\n${colors.yellow}2. Choose Environment:${colors.reset}`);
  console.log('   [1] QA  (.env.qa)');
  console.log('   [2] STG (.env.stg)');
  console.log('   [3] DEV (.env.dev)');
  console.log('   [4] PROD (.env.prod)');
  const envChoice = (await askQuestion('\nSelect (1-4) [default: 1]: ')).trim() || '1';

  let env = 'qa';
  if (envChoice === '2') env = 'stg';
  if (envChoice === '3') env = 'dev';
  if (envChoice === '4') env = 'prod';

  // 3. Select Output Format for Android (if Android selected)
  let androidFormat = 'apk';
  if (platforms.includes('android')) {
    console.log(`\n${colors.yellow}3. Choose Android Format:${colors.reset}`);
    console.log('   [1] APK (Preview / Testing)');
    console.log('   [2] AAB (Google Play Store)');
    const formatChoice = (await askQuestion('\nSelect (1-2) [default: 1]: ')).trim() || '1';
    if (formatChoice === '2') androidFormat = 'aab';
  }

  // 4. Select Build Location (Local vs EAS Cloud)
  console.log(`\n${colors.yellow}4. Choose Build Location:${colors.reset}`);
  console.log('   [1] Local Build (--local)');
  console.log('   [2] EAS Cloud (Remote Server)');
  const locationChoice = (await askQuestion('\nSelect (1-2) [default: 1]: ')).trim() || '1';
  const isLocal = locationChoice !== '2';

  // Determine Profile
  let profile = `preview.${env}`;
  if (env === 'dev') profile = 'development';
  if (androidFormat === 'aab') profile = 'production';

  // Summary
  console.log(`\n${colors.cyan}${colors.bright}---------------- BUILD SUMMARY ----------------${colors.reset}`);
  console.log(`  Platform:   ${colors.green}${platforms.join(', ').toUpperCase()}${colors.reset}`);
  console.log(`  Environment: ${colors.green}${env.toUpperCase()}${colors.reset}`);
  if (platforms.includes('android')) {
    console.log(`  Android Format: ${colors.green}${androidFormat.toUpperCase()}${colors.reset}`);
  }
  console.log(`  EAS Profile: ${colors.green}${profile}${colors.reset}`);
  console.log(`  Location:   ${colors.green}${isLocal ? 'Local (--local)' : 'EAS Cloud'}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}-----------------------------------------------${colors.reset}\n`);

  const confirm = (await askQuestion(`${colors.magenta}Proceed with build? (Y/n): ${colors.reset}`)).trim().toLowerCase();
  if (confirm === 'n') {
    console.log(`\n${colors.red}Build cancelled.${colors.reset}\n`);
    rl.close();
    return;
  }

  rl.close();

  // Execute Build Flow
  console.log(`\n${colors.yellow}🔄 Setting environment to ${env.toUpperCase()}...${colors.reset}`);
  runCommand(`npm run set:env:${env}:build`);

  try {
    for (const p of platforms) {
      let cmd = `dotenv -- eas build -p ${p} --profile ${profile}`;
      if (isLocal) cmd += ' --local';

      console.log(`\n${colors.green}${colors.bright}🚀 Executing: ${cmd}${colors.reset}\n`);
      const result = spawnSync(cmd, { shell: true, stdio: 'inherit' });
      if (result.status !== 0) {
        console.error(`\n${colors.red}Build failed for ${p}${colors.reset}`);
      }
    }
  } finally {
    console.log(`\n${colors.yellow}🧹 Reverting environment files...${colors.reset}`);
    runCommand('npm run set:env:revert');
    console.log(`\n${colors.green}${colors.bright}✅ Done!${colors.reset}\n`);
  }
}

function runCommand(command) {
  const res = spawnSync(command, { shell: true, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`Command failed: ${command}`);
  }
}

runWizard().catch((err) => {
  console.error(err);
  rl.close();
});
