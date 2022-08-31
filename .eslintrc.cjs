/** @type {import('eslint/conf/eslint-recommended')} */
module.exports = {
	root: true,
	extends: ['eslint:recommended'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022
	},
	env: {
		browser: true,
		es2022:true,
		node: true
	}
};

