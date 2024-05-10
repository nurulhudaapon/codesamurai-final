/**
 * Coerces all numbers in the given object to numbers.
 *
 * @param obj - The object to coerce numbers in.
 * @param keys - Optional array of keys to limit the coercion to.
 * @returns void
 */
const coerceNumbers = <ObjT extends object>(
  obj: ObjT,
  keys?: (keyof ObjT)[]
) => {
  // coerce all numbers to numbers
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        typeof obj[key] === "string" &&
        !isNaN(parseFloat(String(obj[key]))) &&
        (keys === undefined || keys.includes(key))
      ) {
        // @ts-ignore
        obj[key] = parseFloat(String(obj[key]));
      }
    }
  }
};

export const Objects = Object.assign({}, { coerceNumbers });
