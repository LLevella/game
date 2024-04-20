'use strict';

const gameKeys = {
	'x': {key: 'wall', canMove: false},
	'!': {key: 'lava', canMove: false},
	'@': {key: 'player', canMove: true},
	'o': {key: 'coin' , canMove: true},
	'=': {key: 'gfireball', canMove: true},
	'|': {key: 'vfireball', canMove: true},
	'v': {key: 'firerain', canMove: true}
};