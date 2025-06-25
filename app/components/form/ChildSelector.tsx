"use client"

import { Button } from "../ui/Button";
import Label from "../ui/Label"

interface ChildSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ChildSelector({ value, onChange }: ChildSelectorProps) {
  const decrement = () => onChange(Math.max(1, value - 1))
  const increment = () => onChange(Math.min(7, value + 1))

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Nombre d'enfants à inscrire</h2>
      <Label htmlFor="nb-enfants">Sélectionnez entre 1 et 7 enfants</Label>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={decrement} disabled={value <= 1}>
          -
        </Button>
        <span className="text-lg font-medium w-8 text-center">{value}</span>
        <Button type="button" onClick={increment} disabled={value >= 7}>
          +
        </Button>
      </div>
    </div>
  )
}
