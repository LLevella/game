class Player extends Actor{
  constructor(position){
    super(position,new Vector(0.8, 1.5));
    this.pos = this.pos.plus(new Vector(0, -0.5));
  }

  get type(){
    return 'player';
  }
}