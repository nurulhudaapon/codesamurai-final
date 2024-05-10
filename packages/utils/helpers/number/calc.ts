/**
 * Calculates the percentage of num in total
 * @param num The number to calculate the percentage of
 * @param total The total number to calculate the percentage of
 * @returns The percentage of num in total
 */
export const calcPercentage = (num: number, total: number, decimal = 2): number => {
	if (typeof +num !== 'number') return 0;
	if (typeof +total !== 'number') return 0;

	if (!+total) return 0;
	if (!+num) return 0;

	return +((+num / +total) * 100).toFixed(decimal);
};

export const calcIncrementPercentage = (from: number, to: number, decimal = 2): number => {
	if (typeof +from !== 'number') return 0;
	if (typeof +to !== 'number') return 0;

	if (!+from) return 0;
	if (!+to) return 0;

	const inc = +to - +from;

	return +((+inc / +from) * 100).toFixed(decimal);
};

/**
 * Divides a number safely
 * @param num The number to divide
 * @param divisor The divisor
 * @returns The result of the division
 **/
export const calcDivide = (num: number, divisor: number) => {
	if (typeof +num !== 'number') return 0;
	if (typeof +divisor !== 'number') return 0;

	const result = +divisor === 0 ? 0 : +num / +divisor;
	if (Number.isNaN(result)) return 0;

	return result;
};
