import Label from "../ui/Label"
import { CheckboxItem } from "../ui/Checkbox"

// 🔧 Déclare les props attendues
interface Props {
  index: number
  selected: string[]
  onChange: (value: string[]) => void
}

const coursOptions = [
  { value: "1", label: "1 – Éducation Religieuse (120€)" },
  { value: "2", label: "2 – Dar Al Coran Scolaire (120€)" },
  { value: "3", label: "3 – Dar Al Coran Vacances (40€)" },
]

export default function CoursSelector({ index, selected = [], onChange }: Props) {
  const toggle = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, value])
    } else {
      onChange(selected.filter((v) => v !== value))
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`cours_${index}`}>Cours choisis</Label>
      <div className="space-y-2">
        {coursOptions.map(({ value, label }) => (
          <CheckboxItem
            key={value}
            id={`cours${value}_${index}`}
            label={label}
            checked={selected.includes(value)}
            onChange={(checked) => toggle(value, checked)}
          />
        ))}
      </div>
    </div>
  )
}
