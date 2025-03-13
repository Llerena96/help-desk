import React from "react";

export function TextInput({ className, ...props }) {
  return (
    <input
      type="text"
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${className || ""}`}
      {...props}
    />
  );
}
