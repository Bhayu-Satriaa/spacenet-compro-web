import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-onblue hover:brightness-110 active:brightness-95",
  secondary: "border border-line bg-surface text-ink hover:border-blue hover:text-blue",
  quiet: "text-blue underline underline-offset-4 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

function classes({ variant = "primary", size = "md", className = "", fullWidth }: CommonProps) {
  return [base, variants[variant], sizes[size], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

export function ButtonLink({
  children,
  href,
  external = false,
  variant,
  size,
  className,
  fullWidth,
  onClick,
}: AnchorProps) {
  const cls = classes({ children, variant, size, className, fullWidth });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={cls} onClick={onClick}>
      {children}
    </a>
  );
}

export function Button({
  children,
  type = "button",
  variant,
  size,
  className,
  fullWidth,
  ...rest
}: NativeButtonProps) {
  return (
    <button
      type={type}
      className={classes({ children, variant, size, className, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
}
