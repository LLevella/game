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
    .then( (json) => {
      let levels = JSON.parse(json)
      const parser = new LevelParser(actorDict);
      runGame(levels, parser, DOMDisplay)
        .then(() => alert( "Игра окончена" ));
    }
  )
}

window.onload = function(){
  var isStart = confirm("Начать игру?");
  if(isStart) startGame();
};