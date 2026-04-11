'use strict';

const fs = require('fs');
const path = require('path');

const rootSuite = createSuite('');
const suiteStack = [rootSuite];
let failures = 0;

function createSuite(name) {
  return {
    name,
    suites: [],
    tests: [],
    beforeAll: [],
    beforeEach: []
  };
}

function currentSuite() {
  return suiteStack[suiteStack.length - 1];
}

global.describe = function(name, fn) {
  const suite = createSuite(name);
  currentSuite().suites.push(suite);
  suiteStack.push(suite);
  fn();
  suiteStack.pop();
};

global.it = function(name, fn) {
  currentSuite().tests.push({ name, fn });
};

global.before = function(fn) {
  currentSuite().beforeAll.push(fn);
};

global.beforeEach = function(fn) {
  currentSuite().beforeEach.push(fn);
};

require('./setup-node');

const testDir = __dirname;
const specFiles = fs.readdirSync(testDir)
  .filter(file => file.endsWith('.spec.js'))
  .sort();

for (const file of specFiles) {
  require(path.join(testDir, file));
}

async function runHook(fn) {
  await Promise.resolve(fn());
}

async function runTest(test, beforeEachHooks, suiteNames) {
  try {
    for (const hook of beforeEachHooks) {
      await runHook(hook);
    }
    await Promise.resolve(test.fn());
    console.log(`ok - ${suiteNames.concat(test.name).join(' > ')}`);
  } catch (error) {
    failures += 1;
    console.error(`not ok - ${suiteNames.concat(test.name).join(' > ')}`);
    console.error(error && error.stack ? error.stack : error);
  }
}

async function runSuite(suite, inheritedBeforeEach = [], names = []) {
  const suiteNames = suite.name ? names.concat(suite.name) : names;

  for (const hook of suite.beforeAll) {
    await runHook(hook);
  }

  const beforeEachHooks = inheritedBeforeEach.concat(suite.beforeEach);

  for (const test of suite.tests) {
    await runTest(test, beforeEachHooks, suiteNames);
  }

  for (const child of suite.suites) {
    await runSuite(child, beforeEachHooks, suiteNames);
  }
}

runSuite(rootSuite).then(() => {
  if (failures > 0) {
    console.error(`\n${failures} test(s) failed.`);
    process.exit(1);
  }

  console.log(`\n${specFiles.length} spec file(s) passed.`);
}).catch(error => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
