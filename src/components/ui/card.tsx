import React from "react";
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={`rounded-2xl border ${className}`} {...props} />
);
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={`px-5 pt-5 ${className}`} {...props} />
);
export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={`text-xl font-semibold ${className}`} {...props} />
);
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={`px-5 pb-5 ${className}`} {...props} />
);
export default Card;
