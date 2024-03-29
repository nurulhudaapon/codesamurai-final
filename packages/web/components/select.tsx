import { cn } from "@/utils/cn";
import React, { SelectHTMLAttributes } from "react";

type OptionType = {
  value?: string;
  label: string;
  isSelected?: boolean;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: (OptionType | undefined)[]
};

export const Select: React.FC<SelectProps> = ({ className, options, ...props }) => {
  const valiedoOptions = options.filter(Boolean) as OptionType[];
  return (
    <select
      {...props}
      id="countries"
      className={cn(
        `
            bg-gray-50
            border
            border-gray-300
            text-gray-900
            text-sm
            rounded-lg
            focus:ring-blue-500
            focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          `,
        className
      )}
    >
      {valiedoOptions.map((option, idx) => (
        <option selected={option.isSelected} key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};