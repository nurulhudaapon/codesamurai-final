import {
	addDays,
	addMonths,
	addYears,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
	isToday,
	isYesterday,
	startOfMonth,
	endOfMonth,
	isSameMonth,
	startOfYear,
	endOfYear,
	isSameYear,
	isThisYear,
} from 'date-fns';

/**
 * ### Get date object from date
 * @param date Date or string to get date object from
 * @param isLocal If `true`, converts date to local time
 * @returns A date object with day, month, year, hour, minute and second
 */
export const getDateObject = (rawDate?: Date | string, isLocal = true) => {
	if (!isValidDate(rawDate)) return null;

	const date = new Date(rawDate);

	// convert to local time if needed
	if (isLocal) {
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	}

	return {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
	};
};

/**
 * ### Checks if date is valid and parsable as a Date object
 * @param date Date or string to check
 * @returns `true` if date is valid, `false` otherwise
 */
export const isValidDate = (date?: Date | string): date is Date => {
	if (!date) return false;

	if (new Date(date).toString() === 'Invalid Date') return false;

	return true;
};

/**
 * ### Get month name from month number
 * @param month Month number
 * @returns Month name
 * @example getMonthName(1) // Jan
 */
export const getMonthName = (month: number) => {
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return monthNames[month - 1];
};

/**
 * ### Check past time in second
 * @param date seconds
 * @returns `true` if date is past, `false` otherwise
 */
export const isPastTime = (date?: number) => {
	if (!date) return true;
	return date < Date.now();
};

export const isStartOfAMonth = (date: Date) => {
	return date.getDate() === startOfMonth(date).getDate();
}

export const isEndOfAMonth = (date: Date) => {
	return date.getDate() === endOfMonth(date).getDate();
}

export const isStartOfYear = (date: Date) => {
	return date.getDate() === startOfYear(date).getDate();
}

export const isEndOfAYear = (date: Date) => {
	return date.getDate() === endOfYear(date).getDate();
}

export {
	addDays,
	addMonths,
	addYears,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
	isToday,
	isYesterday,
	startOfMonth,
	endOfMonth,
	isThisYear,
	isSameMonth,
	startOfYear,
	endOfYear,
	isSameYear,
};