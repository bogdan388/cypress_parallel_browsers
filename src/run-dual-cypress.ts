import { spawn, ChildProcess } from 'child_process';

const withVideo = process.argv.includes('--video');
const mode = withVideo ? 'WITH VIDEO RECORDING' : 'WITHOUT VIDEO';

console.log(`🎬 Starting TWO CYPRESS INSTANCES simultaneously... ${mode}\n`);

const aliceArgs = [
  'cypress', 'run',
  '--spec', 'cypress/e2e/alice-cypress.cy.ts',
  '--browser', 'electron'
];

const bobArgs = [
  'cypress', 'run',
  '--spec', 'cypress/e2e/bob-cypress.cy.ts',
  '--browser', 'chrome'
];

// Add headed mode if not recording video (video recording works better in headless)
if (!withVideo) {
  aliceArgs.push('--headed');
  bobArgs.push('--headed');
}

const alice: ChildProcess = spawn('npx', aliceArgs, { stdio: 'inherit' });
const bob: ChildProcess = spawn('npx', bobArgs, { stdio: 'inherit' });

Promise.all([
  new Promise<number | null>((resolve) => alice.on('close', resolve)),
  new Promise<number | null>((resolve) => bob.on('close', resolve))
]).then(([aliceCode, bobCode]: [number | null, number | null]): void => {
  console.log('\n========== BOTH CYPRESS TESTS COMPLETED ==========');
  console.log(`Alice Cypress exited with code: ${aliceCode}`);
  console.log(`Bob Cypress exited with code: ${bobCode}`);

  if (aliceCode === 0 && bobCode === 0) {
    console.log('\n✅ SUCCESS! Both Cypress instances passed!');
    if (withVideo) {
      console.log('\n📹 Videos saved to:');
      console.log('   - cypress/videos/alice-cypress.cy.ts.mp4');
      console.log('   - cypress/videos/bob-cypress.cy.ts.mp4');
    }
  } else {
    console.log('\n❌ Tests failed. Check the output above.');
    process.exit(1);
  }
});