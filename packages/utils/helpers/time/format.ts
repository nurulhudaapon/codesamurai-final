export { format } from 'date-fns';
import { getDateObject, getMonthName, isValidDate } from './utils';

/**
 * ### Format Date to `Jan 1, 2000`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @param isLocal If `true`, converts date to local time
 * @returns MMM DD, YYYY
 * @returns `null` if date is invalid
 * @example `Jan 1, 2000`
 */
export const formatToDate = (
	date?: Date | string,
	isLocal = true,
	granularity: 'month' | 'year' | 'day' = 'day'
): string | null => {
	// get date parts
	const dateObject = getDateObject(date, isLocal);

	if (!dateObject) return null;

	const { day, month, year } = dateObject;

	if (granularity === 'month') return `${getMonthName(month)}, ${year}`;
	if (granularity === 'year') return `${year}`;

	// format date
	return `${getMonthName(month)} ${day}, ${year}`;
};

/**
 * ### Format Date to `12:00 AM`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @param isLocal If `true`, converts date to local time
 * @returns HH:MM AM/PM
 * @returns `null` if date is invalid
 * @example `12:00 AM`
 */
export const formatToTime = (date?: Date | string, isLocal = true): string | null => {
	// get date parts
	const dateObject = getDateObject(date, isLocal);

	if (!dateObject) return null;

	const { hour, minute } = dateObject;

	// format time
	const hours = hour % 12 || 12;
	const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
	const minutes = minute < 10 ? `0${minute}` : minute;

	return `${hours}:${minutes} ${ampm}`;
};

/**
 * ### Format Date to `Jan 1, 2000 12:00 AM`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @param isLocal If `true`, converts date to local time
 * @returns MMM DD, YYYY HH:MM AM/PM
 * @returns `null` if date is invalid
 * @example `Jan 1, 2000 12:00 AM`
 */

export const formatToDateTime = (date?: Date | string, isLocal = true): string | null => {
	const dateStr = formatToDate(date, isLocal);
	const timeStr = formatToTime(date, isLocal);

	if (!dateStr || !timeStr) return null;

	return `${dateStr} ${timeStr}`;
}

/**
 * ### Format Date to `2/32/2023`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @returns MM/DD/YYYY (Local format)
 * @returns `null` if date is invalid
 * @example `2/32/2023`
 */
export const formatToLocalDate = (date?: Date | string): string | null => {
	// check if date is valid
	if (!isValidDate(date)) return null;

	// parse date
	const safeDate = new Date(date);

	// format date
	return safeDate.toLocaleDateString();
};
/**
 * ### Format time to relative time
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @returns [Time] [Unit] ago
 * @returns `null` if date is invalid
 * @example `2 days ago`
 * @example `2 hours ago`
 * @example `just now`
 */
export const formatToRelativeTime = (date?: Date | string): string | null => {
	// check if date is valid
	if (!isValidDate(date)) return null;

	// parse date
	const safeDate = new Date(date);

	// format date
	const seconds = Math.abs(Math.floor((Date.now() - safeDate.getTime()) / 1000));
	const minutes = Math.abs(Math.floor(seconds / 60));
	const hours = Math.abs(Math.floor(minutes / 60));
	const days = Math.abs(Math.floor(hours / 24));

	const isFuture = Date.now() - safeDate.getTime() < 0;

	const prefix = isFuture ? 'in ' : '';
	const suffix = isFuture ? '' : ' ago';

	if (days > 0) return `${prefix}${days} day${days > 1 ? 's' : ''}${suffix}`;
	if (hours > 0) return `${prefix}${hours} hour${hours > 1 ? 's' : ''}${suffix}`;
	if (minutes > 0) return `${prefix}${minutes} minute${minutes > 1 ? 's' : ''}${suffix}`;
	return 'just now';
};
