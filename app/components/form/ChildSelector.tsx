"use client"

import Input from "../ui/Input"
import Label from "../ui/Label"


interface ChildSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ChildSelector({ value, onChange }: ChildSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Nombre d'enfants à inscrire</h2>
      <Label htmlFor="nb-enfants">Nombre d'enfants (1 à 7)</Label>
      <Input
        id="nb-enfants"
        type="number"
        min={1}
        max={7}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Math.max(1, Math.min(7, parseInt(e.target.value) || 1)))}
        required
        className="w-24" label={undefined}      />
    </div>
  )
}
