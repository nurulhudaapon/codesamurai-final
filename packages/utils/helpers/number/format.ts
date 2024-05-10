/**
 * ### Formats a number to a given number of decimal places.
 * @param number Number to format
 * @param decimalPlaces Number of decimal places to format to
 * @returns Formatted number
 * @example formatNumber(1.2345, 2) // 1.23
 */
export const formatNumber = (number: number, decimalPlaces = 2) => {
	const factor = Math.pow(10, decimalPlaces);
	return Math.round(number * factor) / factor;
};

export const formatToString = (number: number, decimalPlaces = 2) => {
	const factor = Math.pow(10, decimalPlaces);
	return (Math.round(number * factor) / factor).toLocaleString();
};

export const abbreviateNumber = (n: number, fixed = 0) => {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(fixed) + 'K';
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(fixed) + 'M';
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(fixed) + 'B';
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';

	return n.toLocaleString();
};

export const abbreviateToThousands = (n: number, fixed = 1) => +(n / 1e3).toFixed(fixed) + 'K';
