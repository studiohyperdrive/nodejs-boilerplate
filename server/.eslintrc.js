const tabIndentation = ['error', 'tab'];

module.exports = {
	root: true,
	env: {
		node: true,
		jest: true,
	},
	parser: "@typescript-eslint/parser",
	settings: {
		// https://github.com/alexgorbatchev/eslint-import-resolver-typescript
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.ts']
		},
		'import/resolver': {
			// use <root>/tsconfig.json
			typescript: {},
		}
	},

	plugins: [
		'@typescript-eslint',
		'eslint-comments',
		'jest',
		'promise',
		'unicorn',
		'import',
	],

	extends: [
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:jest/recommended',
		'plugin:promise/recommended',
		'plugin:unicorn/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],

	rules: {
		'no-tabs': 'off',
		'max-len': ['error', 160, 2, {
			'ignoreUrls': true,
			'ignoreComments': true,
			'ignoreRegExpLiterals': true,
			'ignoreStrings': true,
			'ignoreTemplateLiterals': true
		}],
		'lines-between-class-members': 'off',

		'import/prefer-default-export': 'off',

		'unicorn/filename-case': 'off',
		'unicorn/prevent-abbreviations': 'off',

		'@typescript-eslint/indent': tabIndentation,
		'@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces for clarity in naming.
	}
};
