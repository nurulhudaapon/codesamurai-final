/**
 * Clear number by removing all non-numeric characters
 * @param {string} number
 * @returns {string}
 * @example
 * parseNumber('123-456-7890') // '1234567890'
 */
export const clean = (number: string): string => number.replace(/\D/g, '');
