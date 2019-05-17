'use strict';
class Actor{
	constructor(position, size, speed){
		if(position == undefined) position = new Vector(0,0);
		if(size == undefined) size = new Vector(1,1);
		if(speed == undefined) speed = new Vector(0,0);

		if((position.constructor !== Vector) ||(size.constructor !== Vector)||(speed.constructor !== Vector))
			throw "Ошибка приведения типов, переданный объект не является вектором типа Vector";
		
		this.pos = position;
		this.size = size;
		this.speed = speed;
		
	};

	act(){};

	get left(){
		return this.pos.x;
	};

	get top(){
		return this.pos.y;
	};

	get right(){
		return this.pos.plus(this.size).x;
	};

	get bottom(){
		return this.pos.plus(this.size).y;
	};

	get type(){
		return 'actor';
	};

	isIntersect(actor){
		if(actor.constructor !== Actor)
			throw "Ошибка приведения типов, переданный объект не является движущимся объектом типа Actor";
		if(actor === this) return false;
	 return ((actor.left >= this.left)&& (actor.left < this.right)||(this.left >= actor.left)&& (this.left < actor.right)) &&
			 ((actor.top >= this.top)&& (actor.top < this.bottom)||(this.top >= actor.top)&& (this.top < actor.bottom));
	}
}