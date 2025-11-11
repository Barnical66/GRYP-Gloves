import React from "react";
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export const Input: React.FC<Props> = ({ className="", ...props }) => (
  <input className={`px-4 py-2 rounded-2xl outline-none ${className}`} {...props} />
);
export default Input;
