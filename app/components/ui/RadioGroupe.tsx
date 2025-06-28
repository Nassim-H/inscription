interface RadioOption {
  label: string
  value: string
}

interface RadioGroupProps {
  id: string
  label?: string
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
}

export default function RadioGroup({
  id,
  label,
  value,
  onChange,
  options
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-gray-800">{label}</p>
      )}
      <div className="flex gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 border transition 
              ${
                value === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name={id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="hidden"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  )
}
