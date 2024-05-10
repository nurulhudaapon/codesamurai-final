import { error } from "console";
import React, { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errors?: Record<string, string[]> | null;
};

const Input: React.FC<InputProps> = ({
  className,
  name,
  label,
  errors,
  ...rest
}) => {
  const errorMessage = name ? errors?.[name]?.[0] : null;
  console.log(errors);
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="latitude"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
        name={name}
      />

      {errorMessage ? (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      ) : (
        <span className="text-red-500 text-sm"> {"‎"}</span>
      )}
    </div>
  );
};

export default Input;
