class Player extends Actor{
  constructor(position){
		super(position, new Vector(0.8, 1.5));
		console.log("Player", this.pos);
		this.pos = this.pos.plus(new Vector(0, -0.5));
		console.log("Player pos+", this.pos );
  }

  get type(){
    return 'player';
  }
}