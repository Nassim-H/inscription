import { TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  id: string
  className?: string
}

export default function Textarea({
  label,
  id,
  value,
  onChange,
  required = false,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-800">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={3}
        className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
        {...props}
      />
    </div>
  )
}
