'use strict';
class Level{
	constructor(grid = [], actors = []){
		this.grid = grid;
		this.actors = actors;
		this.height = grid.length;
		this.width = Math.max(0, ...grid.map(str => str.length));
		this.status = null;
		this.finishDelay = 1;
	}
	
	get player() {
    return this.actors.find(actor => actor.type === 'player');
  }
	
	isFinished(){
		return ((this.status !== null) && (this.finishDelay < 0));
	}
	
	actorAt(actor) {
		if (!(actor instanceof Actor) || !actor) {
			throw new Error("Ошибка приведения типов, переданный объект не является движущимся объектом типа Actor");
		}
		if (!this.actors) 
			return undefined;
	
		return this.actors.find(elem => elem.isIntersect(actor));
		
	}

	obstacleAt (shift, size){
		if((shift.constructor !== Vector) ||(size.constructor !== Vector))
			throw Error("Ошибка приведения типов, переданный объект не является вектором типа Vector");
		let vAfterShift = size.plus(shift);
		if(shift.y < 0 || shift.x < 0||vAfterShift.x > this.width) return 'wall';
		if (vAfterShift.y > this.height) return 'lava';
		for(let y = shift.y; y < vAfterShift.y; y++)
			for(let x = shift.x; x < vAfterShift.x; x++)
				return this.grid[y][x];
	}

	removeActor(actor){
		//if((actor === undefined) || (actor.constructor !== Actor)) return;
	
		let ind = this.actors.indexOf(actor);
		if (ind > -1) this.actors.splice(ind, 1);
	}

	noMoreActors(aType){
		if (this.actors.find(elem => elem.type === aType)) {
			return false;
		}
		return true;
	}

	playerTouched(aType, actor){
		if(this.status !== null) return;
		if((aType === 'lava')||(aType === 'fireball')){
			this.status = 'lost';
			return
		}
		if((aType === 'coin') && (actor.type === 'coin' )){
			this.removeActor(actor);
			if(this.noMoreActors(aType))
				this.status = 'won';
		}
	}
}