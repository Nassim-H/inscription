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
  options,
  className = "",
  required,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-800">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={id}
        required={required}
        className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white ${className}`}
        {...props}
      >
        <option value="">-- Sélectionner --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
