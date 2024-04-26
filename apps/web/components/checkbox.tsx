import React, { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value=""
          className="
            w-4
            h-4
            text-green400
            bg-gray-100
            border-gray-300
            rounded
            focus:ring-green300
            dark:focus:ring-green400
            dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700
            dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
