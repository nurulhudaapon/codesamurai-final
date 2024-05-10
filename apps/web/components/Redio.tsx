import React, { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errors?: Record<string, string[]> | null;
};

const InputRadio: React.FC<InputProps> = ({ label, errors, ...rest }) => {
  return (
    <div className="mb-4 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
      <input
        id="bordered-radio-1"
        type="radio"
        value=""
        name="bordered-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="bordered-radio-1"
        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
