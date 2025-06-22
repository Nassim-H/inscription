import { TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  id: string
  className?: string
  rows?: number
}

export default function Textarea({
  label,
  id,
  className = "",
  rows = 3,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full border rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
        {...props}
      />
    </div>
  )
}
