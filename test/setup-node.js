'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

global.expect = require('chai').expect;
global.window = {
  addEventListener() {}
};
global.document = {
  getElementById() {
    return true;
  }
};
global.alert = function() {};
global.confirm = function() {
  return false;
};

global.extend = function(base, props = {}) {
  const result = class extends base {};
  Object.defineProperties(result.prototype, props);
  return result;
};

const root = path.resolve(__dirname, '..');
const sourceFiles = [
  'vector.js',
  'actor.js',
  'level.js',
  'levelparser.js',
  'fireball.js',
  'coin.js',
  'player.js',
  'js/app.js',
  'game.js'
];

for (const file of sourceFiles) {
  const filename = path.join(root, file);
  vm.runInThisContext(fs.readFileSync(filename, 'utf8'), { filename });
}

vm.runInThisContext(`
  Object.assign(globalThis, {
    Vector,
    Actor,
    Level,
    LevelParser,
    Fireball,
    HorizontalFireball,
    VerticalFireball,
    FireRain,
    Coin,
    Player,
    initGameObjects,
    trackKeys,
    runAnimation,
    runLevel,
    runGame
  });
`);
