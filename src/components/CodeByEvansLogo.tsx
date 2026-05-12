import { forwardRef } from "react";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes: Record<string, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
};

const CodeByEvansLogo = forwardRef<HTMLSpanElement, Props>(
  ({ className = "", size = "lg" }, ref) => {
    return (
      <span
        ref={ref}
        className={`font-bold tracking-tight leading-none text-white ${sizes[size]} ${className}`}
      >
        CodeBy
        <span className="text-cyan-400">Evans</span>
      </span>
    );
  }
);

CodeByEvansLogo.displayName = "CodeByEvansLogo";

export default CodeByEvansLogo;
