import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
  className?: string
}

export default function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
        {...props}
      />
    </div>
  )
}
