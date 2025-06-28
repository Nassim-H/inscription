interface CheckboxItemProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxItem({ id, label, checked, onChange }: CheckboxItemProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor={id} className="text-sm text-gray-800">
        {label}
      </label>
    </div>
  )
}
