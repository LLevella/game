'use strict';
class Vector{
	constructor( x = 0, y = 0){
		this.x = Math.round(x);
		this.y = Math.round(y);
	};
	plus(v){
		if(v.constructor !== Vector) 
			throw Error("Ошибка приведения типов, переданный объект не является вектором типа Vector");
		let sum = new Vector(Math.round(this.x + v.x), Math.round(this.y+ v.y));
		return sum;
	};
	times(cft){
		let v = new Vector(this.x * cft, this.y * cft);
		return v;
	};
}