import { truncate as _truncate } from 'lodash';

/**
 * ### Pluralize a word based on a count
 * @param word Word to pluralize
 * @param count A number to determine if the word should be pluralized
 * @returns Pluralized word
 * @example pluralize('apple', 1) // apple
 * @example pluralize('apple', 2) // apples
 */
export function pluralize(word: string, count: number): string {
	if (count === 1) return word;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const RULES_MAP: Record<string, string> = {
		ch: 'ches',
		x: 'xes',
		s: 'ses',
		o: 'oes',
		f: 'ves',
		fe: 'ves',
		y: 'ies',
		ay: 'ays',
	};

	const last2Chars = word.slice(-2);
	const lastChar = word.slice(-1);

	if (RULES_MAP[last2Chars]) return word.slice(0, -2) + RULES_MAP[last2Chars];
	if (RULES_MAP[lastChar]) return word.slice(0, -1) + RULES_MAP[lastChar];

	return `${word}s`;
}

/**
 * ### Truncate a string
 * @param str String to truncate
 * @param length Length to truncate to
 * @param omission String to append to the end of the truncated string
 * @returns Truncated string
 * @example truncate('Hello World', 5) // Hello...
 */
export const truncate = _truncate;
