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
		return 
	}
}