import { THREE } from '../../deps.js';

export const trees = {
	tree: {
		name: 'Tree',
		url: './trees/FBX/Tree_1.fbx',
		textures: {
			Bark: './trees/Textures/Tree_Bark.jpg',
			Tree_Leaves: './trees/Textures/Tree_Leaves.png'
		},
		textureData: {
			Tree_Leaves: {
				// TODO-DefinitelyMaybe: get these working again
				// emissive: new THREE.Color(0x000000),
				// specular: new THREE.Color(0x000000),
				// castShadow: true,
				// receiveShadow: true,
				// encoding: THREE.sRGBEncoding,
				// wrapS: THREE.RepeatWrapping,
				// wrapT: THREE.RepeatWrapping,
				alphaTest: 0.5,
				side: THREE.DoubleSide
			}
		},
		children: {
			Tree_1: {
				scale: 8,
				rotate: [0.707, 0, 0, -0.707]
			}
		},
		physics: {}
	},
	birch: {
		name: 'Birch',
		url: './trees/FBX/Birch_1.fbx',
		textures: {
			Birch_Bark: './trees/Textures/Birch_Bark.png',
			Birch_Leaves: './trees/Textures/Birch_Leaves_Green.png'
		},
		textureData: {
			Birch_Leaves: {
				// TODO-DefinitelyMaybe: get these working again
				// wrapS: THREE.RepeatWrapping,
				// wrapT: THREE.RepeatWrapping,
				alphaTest: 0.5,
				side: THREE.DoubleSide
			}
		},
		children: {
			Birch_1: {
				scale: 7.5
			}
		}
	}
};
