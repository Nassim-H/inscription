"use client"

import Label from "../ui/Label"

interface Props {
  index: number
  selected: string[] // ou number[] si tu préfères
  onChange: (value: string[]) => void
}

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

      <div className="flex flex-col gap-1">
        <div>
          <input
            type="checkbox"
            id={`cours1_${index}`}
            checked={selected?.includes("1")}
            onChange={(e) => toggle("1", e.target.checked)}
          />
          <label htmlFor={`cours1_${index}`} className="ml-2">1 – Éducation Religieuse (120€)</label>
        </div>

        <div>
          <input
            type="checkbox"
            id={`cours2_${index}`}
            checked={selected?.includes("2")}
            onChange={(e) => toggle("2", e.target.checked)}
          />
          <label htmlFor={`cours2_${index}`} className="ml-2">2 – Dar Al Coran Scolaire (120€)</label>
        </div>

        <div>
          <input
            type="checkbox"
            id={`cours3_${index}`}
            checked={selected?.includes("3")}
            onChange={(e) => toggle("3", e.target.checked)}
          />
          <label htmlFor={`cours3_${index}`} className="ml-2">3 – Dar Al Coran Vacances (40€)</label>
        </div>
      </div>
    </div>
  )
}
