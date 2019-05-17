'use strict';
class LevelParser{
	constructor(dict ={}){
		this.dict = dict;
	}

	actorFromSymbol(key){
		if (key in dict) return dict[key];
	}

	obstacleFromSymbol(letter){
		if ((letter === 'x')||(letter === '!')) return gameKeys[letter].key
	}

	createGrid(astr = []){
		return astr.map( 
			str => [].map.call(str, 
				letter => { 
					if((letter in gameKeys)&&(!gameKeys[letter].canMove)) return letter
				}
			)
		)
	}

	createActors(astr = []){
		return 
	}
}