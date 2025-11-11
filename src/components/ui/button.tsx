import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline", size?: "sm" | "md" | "lg" };
export const Button: React.FC<Props> = ({ className="", variant="default", size="md", ...props }) => {
  const base = "inline-flex items-center justify-center font-medium rounded-2xl transition";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-5 py-2.5 text-base" }[size];
  const styles = variant === "outline"
    ? "border border-white/20 text-white hover:bg-white/10"
    : "bg-violet-600 hover:bg-violet-500 text-white";
  return <button className={`${base} ${sizes} ${styles} ${className}`} {...props} />;
};
export default Button;
