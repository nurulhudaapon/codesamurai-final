import { forwardRef, useRef } from "react";
import cx from "classnames";
import { nanoid } from "nanoid";
import { BaseProps } from "../index.types";

export type TextProps = BaseProps<"size" | "disabled"> & {
  label?: string;
  supportingText?: string;
  error?: string;
} & Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "onChange"
    | "placeholder"
    | "required"
    | "type"
    | "value"
    | "readOnly"
    | "style"
    | "min"
    | "max"
    | "step"
    | "pattern"
    | "autoComplete"
    | "autoFocus"
    | "accept"
  >;

// eslint-disable-next-line react/display-name
export const Text = forwardRef<HTMLInputElement, TextProps>(
  (
    {
      required,
      readOnly,
      style,
      accept,
      label,
      supportingText,
      size,
      disabled,
      error,
      ...props
    }: TextProps,
    ref
  ): JSX.Element => {
    const inputId = useRef("input-" + nanoid()).current;
    return (
      <div>
        <div className="flex items-center justify-between">
          <label
            className="mb-1 block text-sm font-medium text-slate-500"
            htmlFor={inputId}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            accept={accept}
            required={required}
            disabled={disabled}
            style={style}
            className={cx([
              "border-[#cbd6e2] border-[1px] rounded-[3px] w-full focus:border-[#4d90fe] focus:outline-none",
              size === "sm" ? "px-2 py-1" : size === "lg" ? "px-4 py-3" : "",
              disabled && "cursor-not-allowed text-slate-400",
              error && "border-rose-300 border-[1px]",
            ])}
            {...props}
          />
        </div>
        <p
          className={cx([
            "mt-1 h-1 text-xs",
            supportingText && "text-slate-400",
            error && "text-rose-500",
          ])}
        >
          {error || supportingText}
        </p>
      </div>
    );
  }
);
