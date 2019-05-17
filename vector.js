'use strict';
class Vector{
	constructor( x = 0, y = 0){
		this.x = x;
		this.y = y;
	};
	plus(v){
		if(v.constructor !== Vector) 
			throw "Ошибка пприведения типов, переданный объект не является вектором типа Vector";
		let sum = new Vector(this.x + v.x, this.y+ v.y);
		return sum;
	};
	times(cft){
		let v = new Vector(this.x * cft, this.y * cft);
		return v;
	};
}