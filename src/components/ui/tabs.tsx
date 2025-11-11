import React, { useState } from "react";
export const Tabs: React.FC<{ defaultValue: string, className?: string, children: React.ReactNode }> = ({ defaultValue, className="", children }) => {
  const [value, setValue] = useState(defaultValue);
  return <div className={className}>
    {React.Children.map(children as any, (child: any) => React.cloneElement(child, { value, setValue }))}
  </div>;
};
export const TabsList: React.FC<{ className?: string, children: React.ReactNode }> = ({ className="", children }) => (
  <div className={`inline-flex rounded-xl p-1 ${className}`}>{children}</div>
);
export const TabsTrigger: React.FC<{ value: string, className?: string, children: React.ReactNode, setValue?: any, ['data-state']?: any }> = ({ value, className="", children, setValue, ...rest }) => (
  <button onClick={()=>setValue(value)} className={`px-3 py-1.5 rounded-lg text-sm ${className}`} {...rest}>{children}</button>
);
export const TabsContent: React.FC<{ value: string, className?: string, children: React.ReactNode, setValue?: any }> = ({ value, className="", children, setValue }) => {
  return <div className={className} data-value={value}>
    {children}
  </div>;
};
