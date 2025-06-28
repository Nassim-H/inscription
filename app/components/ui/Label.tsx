import { LabelHTMLAttributes } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`block text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
