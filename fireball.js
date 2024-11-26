'use strict'
class Fireball extends Actor{
	constructor(position, speed) {
		super(position,undefined,speed);
	}

	get type() {
    return 'fireball';
	}

	getNextPosition(time = 1){
		return this.pos.plus(this.speed.times(time));
	}

	handleObstacle(){
		this.speed = this.speed.times(-1);
	}

	act(time, level){
		const nextpos = this.getNextPosition(time);
		if(level.obstacleAt(nextpos, this.size)) {
			this.handleObstacle();
		}
		else{
			this.pos = nextpos;
		}
	}
};

class HorizontalFireball extends Fireball{
	constructor(position){
		super(position, new Vector(2, 0)); 
	}
};

class VerticalFireball extends Fireball{
	constructor(position){
		super(position, new Vector(0, 2)); 
	}
};

class FireRain extends Fireball{
	constructor(position){
		super(position,new Vector(0, 3));
		this.prevPos = position;
	}
	
	handleObstacle(){
		this.pos = this.prevPos;
	}
}