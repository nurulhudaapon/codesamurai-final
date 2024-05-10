const LowerCasedWords = new Set([
	'a',
	'an',
	'and',
	'at',
	'but',
	'by',
	'for',
	'in',
	'nor',
	'of',
	'on',
	'or',
	'out',
	'so',
	'the',
	'to',
	'up',
	'yet',
	'as',
	'is',
]);

const UpperCasedWords = new Set(['API', 'ID', 'URL', 'HTTP', 'HTTPS', 'JSON', 'AB', 'ZIP', 'SDK']);

export const String = {
	LowerCasedWords,
	UpperCasedWords,
};
