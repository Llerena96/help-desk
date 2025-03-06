import type React from "react"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary hover:file:cursor-pointer ${className || ""}`}
      {...props}
    />
  )
}

