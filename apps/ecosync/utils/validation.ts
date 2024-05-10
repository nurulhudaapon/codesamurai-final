import { isEmpty } from "lodash";

export function validate<T>(user: T, requiredFields: (keyof T)[]) {
  const errors: { [key in keyof T]?: string } = {};

  requiredFields.forEach((field) => {
    if (!user[field]) {
      errors[field] = `${String(field)} is required`;
    }
  });

  return isEmpty(errors) ? null : errors;
}
