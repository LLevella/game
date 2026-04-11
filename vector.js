'use strict';
class Vector{
  constructor( x = 0, y = 0){
    this.x = x;
    this.y = y;
  };
  plus(v){
    if(!(v instanceof Vector))
      throw Error("Ошибка приведения типов, переданный объект не является вектором типа Vector");
    return new Vector(this.x + v.x, this.y + v.y);
  };
  times(cft){
    return new Vector(this.x * cft, this.y * cft);
  };
  copy(){
    return new Vector(this.x, this.y);
  }
}
