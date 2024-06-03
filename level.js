'use strict';
class Level{
	constructor(grid = [], actors = []){
		this.grid = grid;
		this.actors = actors;
    this.player = actors.find(actor => actor.type === 'player');
		this.height = grid.length;
		this.width = Math.max(0, ...grid.map(str => str.length));
		this.status = null;
		this.finishDelay = 1;

	}
	
	isFinished(){
		return ((this.status !== null) && (this.finishDelay < 0));
	}
	
	actorAt(actor){
		if(!actor) 
			throw "Ошибка приведения типов, передан пустой объект";
		if(actor.constructor !== Actor) 
			throw "Ошибка приведения типов, переданный объект не является движущимся объектом типа Actor";
      //console.log(this.actors);
		return this.actors.find(elem => elem.isIntersect(actor));
	}

	obstacleAt (shift, size){
		if((shift.constructor !== Vector) ||(size.constructor !== Vector))
			throw "Ошибка приведения типов, переданный объект не является вектором типа Vector";

		let vAfterShift = size.plus(shift);
		if (vAfterShift.y >= this.height) return 'lava';
		if(shift.y < 0 || shift.x < 0||vAfterShift.x >= this.width) return 'wall';

		for(let y = shift.y; y < vAfterShift.y; y++)
			for(let x = shift.x; x < Math.min(vAfterShift.x,this.grid[y].length); x++)
				return this.grid[y][x];
	}

	removeActor(actor){
		if(!actor) return;
    this.actors = this.actors.filter(el => el !== actor);
	}

	noMoreActors(aType){
    return (this.actors.findIndex(elem => (elem.type === aType))<0)


	}

	playerTouched(aType, actor){
		if(this.status !== null) return;
		if((aType === 'lava')||(aType === 'fireball')){
			this.status = 'lost';
			return
		}
		if((aType === 'coin') && (actor.type = 'coin' )){
			this.removeActor(actor);
			if(this.noMoreActors(aType))
				this.status = 'won';
		}
	}
}