'use strict';
class LevelParser{
  constructor(dict ={}){
    this.dict = dict;
  }

  actorFromSymbol(key){
    if (key in this.dict) return this.dict[key];
  }

  obstacleFromSymbol(letter){
    if ((letter === 'x')||(letter === '!')) return gameKeys[letter].key
  }

  createGrid(astr = []){
    return astr.map( 
      str => [].map.call(str, 
        function(letter){ 
          if((letter in gameKeys)&&(!gameKeys[letter].canMove)) return gameKeys[letter].key
        }
      )
    )
  }

  createActors(astr = []){
    const actors = [];
    astr.forEach(
      (str, j) => [].forEach.call(str,
        (letter, i) => {
          if (this.dict && this.dict[letter] && typeof this.dict[letter] === 'function') {
            const actor = new this.dict[letter](new Vector(i, j));
            if (actor instanceof Actor) actors.push(actor);
          }
      })
    );
    return actors;
  }

  parse(astr = []){
    const grid = this.createGrid(astr);
    const actors = this.createActors(astr);
    return new Level(grid, actors);
  }
}