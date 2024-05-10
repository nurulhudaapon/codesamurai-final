import { Constants } from '../../constants';

/**
 * ### Converts a string to title case.
 * @param str The string to convert.
 * @returns The converted string.
 * @example toTitleCase('hello world'); // 'Hello World'
 * @example toTitleCase('homepage_url'); // 'Homepage URL'
 */
export const toTitleCase = (str: string): string => {
	// Upper case the first letter of each word.
	const startCaseStr = toStartCase(str);
	const words = startCaseStr.split(' ');

	const titleCaseWords = words.map((word, index) => {
		// Lower case words that are in the list of lower cased words when not the first word
		if (Constants.String.LowerCasedWords.has(word.toLowerCase()) && index) return word.toLowerCase();

		// Upper case words that are in the list of upper cased words.
		if (Constants.String.UpperCasedWords.has(word.toUpperCase())) return word.toUpperCase();

		return word;
	});

	return titleCaseWords.join(' ');
};

/**
 * ### Converts a string to start case.
 * @param str The string to convert.
 * @returns The converted string.
 * @example toStartCase('hello world'); // 'Hello World'
 * @example toStartCase('homepage_url'); // 'Homepage Url'
 * @example toStartCase('homepageUrl'); // 'Homepage Url'
 */
export const toStartCase = (str: string): string =>
	str
		// Replace underscores with spaces
		.replace(/_/g, ' ')
		// Add space for camelCase
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		// Capitalize the first letter of each word
		.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const toHttpUrl = (url: string): string => {
	if (url.startsWith('http://') || url.startsWith('https://')) return url;

	return `http://${url}`;
};
