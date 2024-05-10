/**
 * Decodes a string or object from a base64 string.
 * @param str The string to decode.
 * @returns The decoded object or null if the string could not be decoded.
 */
export const fromBase64ToObject = <DecodedDataT = object>(str: string): DecodedDataT | null => {
	const decodedStr = atob(str);
	try {
		return JSON.parse(decodedStr);
	} catch (e) {
		return null;
	}
};

/**
 * Decodes a string or object from a base64 string.
 * @param str The string to decode.
 * @returns The decoded string or null if the string could not be decoded.
 */
export const fromBase64ToString = (str: string): string | null => {
	try {
		const decodedStr = atob(str);
		return decodedStr;
	} catch (e) {
		return null;
	}
};
