'use strict'
class Coin extends Actor{
  constructor(position){
    super(position,new Vector(0.6,0.6));
    this.pos = this.pos.plus(new Vector(0.2, 0.1));
    this.basePos = this.pos.copy();
    this.springSpeed = 8;
    this.springDist = 0.07;
    this.spring = 2.0*Math.PI*Math.random();
}

  get type(){
    return 'coin';
  }

  updateSpring(time = 1){
    this.spring += time*this.springSpeed;
  }

  getSpringVector(){
    return new Vector(0, Math.sin(this.spring) * this.springDist);
  }

  getNextPosition(time){
    this.updateSpring(time);
    return this.basePos.plus(this.getSpringVector());
  }

  act(time){
    this.pos = this.getNextPosition(time);
  }
}