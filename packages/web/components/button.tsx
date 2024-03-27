import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import { Spinner } from "./spinner";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  to,
  loading,
  ...rest
}) => {
  const Wrapper = (props: { children: React.ReactNode }) => {
    if (to) {
      return <Link href={to}>{props.children}</Link>;
    } else {
      return <>{props.children}</>;
    }
  };

  return (
    <Wrapper>
      <button
        type="button"
        className={cn(`
            flex
            justify-center
            items-center
            gap-2
            focus:outline-none
            text-white
            bg-green-700
            hover:bg-green-800
            focus:ring-4
            focus:ring-green-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            me-2
            mb-2
            dark:bg-green-600
            dark:hover:bg-green-700
            dark:focus:ring-green-800
          `,
          className)
        }
        {...rest}
      >
        {loading && <Spinner />}
        {children}
      </button>
    </Wrapper>
  );
};

export default Button;
