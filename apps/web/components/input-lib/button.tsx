import { forwardRef } from "react";
import { BaseProps } from "../index.types";
import cx from "classnames";

export type ButtonProps = BaseProps<
  "disabled" | "fullWidth" | "loading" | "size"
> & {
  text?: string;
  variant?: keyof typeof BUTTON_VARIANT_CLASSES;
  color?: string;
  bgColor?: string;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      loading,
      color,
      bgColor,
      size,
      disabled,
      fullWidth,
      variant,
      ...props
    }: ButtonProps,
    ref
  ): JSX.Element => (
    <button
      ref={ref}
      disabled={loading || disabled}
      className={cx([
        fullWidth && "w-full",
        "btn",
        size && "btn-" + size,
        "disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400",
        variant && BUTTON_VARIANT_CLASSES[variant],
        color && `text-${color}`,
        bgColor && `bg-${bgColor}-500 hover:bg-${bgColor}-600`,
      ])}
      {...props}
    >
      {text}
    </button>
  )
);

Button.defaultProps = {
  variant: "primary",
};

const BUTTON_VARIANT_CLASSES = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white",
  secondary:
    "bg-white hover:bg-gray-100 text-primary-500 border-slate-200 hover:border-slate-300",
  tertiary:
    "bg-white hover:bg-gray-100 text-slate-500 border-slate-200 hover:border-slate-300",
  danger: "bg-rose-500 hover:bg-rose-600 text-white",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  "text-success": "text-emerald-500 hover:text-emerald-600",
  "text-danger": "text-rose-500 hover:text-rose-600",
  "text-primary": "text-primary-500 hover:text-primary-600",
  "text-secondary": "text-slate-500 hover:text-slate-600",
  "text-tertiary": "text-slate-500 hover:text-slate-600",
};
