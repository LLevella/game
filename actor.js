'use strict';
class Actor{
  constructor(position = new Vector(0,0), size = new Vector(1,1), speed = new Vector(0,0)){

    if((position.constructor !== Vector) ||(size.constructor !== Vector)||(speed.constructor !== Vector))
      throw Error("Ошибка приведения типов, переданный объект не является вектором типа Vector");
    
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
    if (!(actor instanceof Actor) || !actor) {
      throw new Error(`В качестве аргумента можно передавать только вектор типа Vector`);
    }

    if (actor === this) {
      return false;
    }

    return (this.left < actor.right && this.right > actor.left &&  this.bottom > actor.top &&  this.top < actor.bottom);
  }
}