import { Constants } from '../constants';

/**
 * Returns a phone object from a phone number
 * @param phoneNumber
 */
export const getPhoneObject = (phoneNumber: number | string) => {
	// Return null if phone number is invalid
	if (!isValidPhone(phoneNumber)) return null;

	// Cleanup to only have digits
	let cleaned = String(phoneNumber).replace(/\D/g, '');

	// Remove starting 0 if phone number has 11 digits
	if (cleaned.length === Constants.Phone.DigitCount + 1) cleaned = cleaned.slice(1);

	// Match digits to BD phone number format
	const compiledRegex = `^(${Constants.Phone.BdCountryCode}|)?(\\d{${Constants.Phone.AreaDigitCount}})(\\d{${Constants.Phone.LineDigitCount}})$`;
	const match = cleaned.match(compiledRegex);

	// Return null if phone number doesn't match BD phone number format
	if (!match) return null;

	return {
		countryCode: Constants.Phone.BdCountryCode,
		areaCode: match[2],
		// officeCode: match[3],
		lineNumber: match[3],
	};
};

/**
 * Returns true if phone number is valid
 * @param phoneNumber
 * @returns `true` if phone number is valid, `false` otherwise
 * @example `isValidPhone(1234567890) // true`
 */
export const isValidPhone = (phoneNumber: number | string): boolean => {
	const cleaned = String(phoneNumber).replace(/\D/g, '');

	// Phone number has proper digit count
	if (cleaned.length === Constants.Phone.DigitCount) return true;
	if (cleaned.length === Constants.Phone.DigitCount + 1) return true;
	if (cleaned.length === Constants.Phone.FullDigitCount) return true;

	// Phone number doesn't have proper digit count
	return false;
};
