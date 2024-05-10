import { isEmpty } from "lodash";

export function validate<T>(user: T, requiredFields: (keyof T)[]) {
  const errors: { [key in keyof T]?: string } = {};

  requiredFields.forEach((field) => {
    const data = user[field];
    if (typeof data === "string") {
      if (!user[field]) {
        errors[field] = `${String(field)} is required`;
      }
    } else if (typeof data === "object" && Array.isArray(data)) {
      if (data.length === 0) {
        errors[field] = `${String(field)} is required`;
      }
    }
  });

  return isEmpty(errors) ? null : errors;
}
