module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	"ignorePatterns": ["public/js/face-api.js", "node_modules/"],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{
				"allowTemplateLiterals": true
			}
		],
		'semi': [
			'error',
			'always'
		]
	}
};