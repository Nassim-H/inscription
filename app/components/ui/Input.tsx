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
<div className="w-full py-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-800 pb-2 pl-1">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${className}`}
        {...props}
      />
    </div>
  )
}
