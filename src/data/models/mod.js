import { characters } from './characters.js';
import { plants } from './plants.js';
import { rocks } from './rocks.js';
import { trees } from './trees.js';
import { weapons } from './weapons.js';
import { cloud } from './cloud.js';

export const modelData = Object.assign(
	{},
	{ cloud },
	characters,
	plants,
	rocks,
	trees,
	weapons
);
