'use strict';

const gameKeys = {
  'x': {key: 'wall', canMove: false},
  '!': {key: 'lava', canMove: false},
  '@': {key: 'player', canMove: true},
  'o': {key: 'coin' , canMove: true},
  '=': {key: 'gfireball', canMove: true},
  '|': {key: 'vfireball', canMove: true},
  'v': {key: 'firerain', canMove: true}
};

const actorDict = {
  '@': Player,
  'v': FireRain,
  '=': HorizontalFireball,
  '|': VerticalFireball,
  'o': Coin
};



function startGame(){
  loadLevels()
    .then((json) => {
      const levels = JSON.parse(json);
      const parser = new LevelParser(actorDict);
      return runGame(levels, parser, DOMDisplay);
    })
    .then(() => alert("Игра окончена"))
    .catch(() => alert("Не удалось загрузить уровни"));
}

function shouldAskToStartGame() {
  return (typeof window === 'undefined' || !window.__GAME_DISABLE_AUTOSTART__) &&
    typeof document !== 'undefined' &&
    !document.getElementById('mocha');
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', function(){
    if (!shouldAskToStartGame()) return;
    const isStart = confirm("Начать игру?");
    if(isStart) startGame();
  });
}
