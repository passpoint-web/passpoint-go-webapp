module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	overrides: [
		{
			env: {
				'node': true
			},
			files: [
				'.eslintrc.{js,cjs}'
			],
			parserOptions: {
				'sourceType': 'script'
			}
		}
	],
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		'react/prop-types': 'off',
		// indent: ['error','tab'],
		// 'linebreak-style': ['error','unix'],
		// 'semi': 0,
		// 'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
		// 'react/jsx-max-props-per-line': [1, {'maximum': 1}],
		'react/react-in-jsx-scope': 'off'
	}
}
