import { LabelHTMLAttributes } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
