export const weapons = {
	axe: {
		name: 'Axe',
		damage: 3,
		url: './weapons/FBX/Axe.fbx',
		icon: './icons/weapons/war-axe-64.png',
		children: {
			Axe: {
				scale: 1
			}
		}
	},
	hammer: {
		name: 'Hammer',
		damage: 3,
		url: './weapons/FBX/Hammer_Small.fbx',
		icon: './icons/weapons/hammer-64.png',
		children: {
			Hammer_small: {
				scale: 1
			}
		}
	},
	sword: {
		name: 'Sword',
		damage: 3,
		url: './weapons/FBX/Sword.fbx',
		icon: './icons/weapons/pointy-sword-64.png',
		children: {
			Sword: {
				scale: 1
			}
		}
	}
};
