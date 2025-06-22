import { SelectHTMLAttributes } from "react"

interface Option {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string
  options: Option[]
  className?: string
}

export default function Select({
  label,
  id,
  options = [],
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full border rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
