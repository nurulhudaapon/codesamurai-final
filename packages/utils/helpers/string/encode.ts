/**
 * Encodes a string or object to a base64 string.
 * @param data The string or object to encode.
 * @returns The encoded string.
 */
export const toBase64 = <DataTypeT extends object | string>(data: DataTypeT): string => {
	if (typeof data === 'string') return btoa(data);
	return btoa(JSON.stringify(data));
};
