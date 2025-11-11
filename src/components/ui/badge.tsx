import React from "react";
type Props = React.HTMLAttributes<HTMLSpanElement>;
export const Badge: React.FC<Props> = ({ className="", ...props }) => (
  <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${className}`} {...props} />
);
export default Badge;
