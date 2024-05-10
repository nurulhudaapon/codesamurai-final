import { getPhoneObject } from './utils';

/**
 * Pretty formats a phone number to BD format.
 * @param phoneNumber The phone number to format
 * @returns `+880 NXXX-XXXXXX`
 * @returns `null` if phone number is invalid
 * @example `prettyFormat(01934567890) // +880 1934-567890`
 * @example `prettyFormat('+880 1 923 456 7890') // +880 1923-456789`
 */
export function prettyFormat(phoneNumber: string | number) {
	const phoneObj = getPhoneObject(phoneNumber);

	if (!phoneObj) return null;

	const { countryCode, areaCode, lineNumber } = phoneObj;

	return `+${countryCode} ${areaCode}-${lineNumber}`;
}
