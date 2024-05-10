export function percentage(numerator = 0, denominator = 0, decimalPlaces = 1): number {
	if (!denominator) return 0;

	const fraction = ((numerator || 0) * 100) / denominator;
	if (decimalPlaces === 3) {
		return Math.round(fraction * 1000) / 1000;
	} else {
		return Math.round(fraction * 10) / 10;
	}
}

export function percentageChangeFromRange(present: number, past: number) {
	const value = ((present - past) / past) * 100;
	if (Number.isNaN(value)) {
		return 0;
	}
	if (Infinity === value) {
		return 100;
	}
	return Number(value.toFixed(2));
}
