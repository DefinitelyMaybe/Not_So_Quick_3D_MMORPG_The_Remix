export const characters = {
	paladin: {
		name: 'Paladin',
		url: './characters/paladin.glb',
		equip: {
			rightHand: 'RightHandIndex1'
		},
		children: {
			Character: {
				scale: 0.06,
				rotate: [0, 1, 0, 0]
			}
		},
		nameOffset: 11,
		physics: {}
	},
	sorceror: {
		name: 'sorceror',
		url: './characters/sorceror.glb',
		equip: {
			rightHand: 'RightHandIndex1'
		},
		children: {
			Character: {
				scale: 0.04,
				rotate: [0, 1, 0, 0]
			}
		},
		nameOffset: 10,
		physics: {}
	},
	warrok: {
		name: 'Warrok',
		url: './characters/warrok.glb',
		equip: {
			rightHand: 'RightHandIndex1'
		},
		children: {
			Character: {
				scale: 0.08,
				rotate: [0, 1, 0, 0]
			}
		},
		nameOffset: 16,
		physics: {}
	},
	zombie: {
		name: 'Zombie',
		url: './characters/zombie-guy.glb',
		equip: {
			rightHand: 'RightHandIndex1'
		},
		children: {
			Character: {
				scale: 0.04,
				rotate: [0, 1, 0, 0]
			}
		},
		nameOffset: 8,
		physics: {}
	}
};
