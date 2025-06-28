"use client"

import { Button } from "../ui/Button"
import Label from "../ui/Label"

interface ChildSelectorProps {
  value: number
  onChange: (value: number) => void
}

export default function ChildSelector({ value, onChange }: ChildSelectorProps) {
  const decrement = () => onChange(Math.max(1, value - 1))
  const increment = () => onChange(Math.min(7, value + 1))

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Nombre d'enfants à inscrire</h2>
      <p className="text-sm text-gray-600">Sélectionnez entre 1 et 7 enfants</p>

      <div className="flex items-center justify-center gap-6 mt-2">
        <Button
          type="button"
          onClick={decrement}
          variant="outline"
          disabled={value <= 1}
          className="w-10 h-10 text-xl"
        >
          −
        </Button>

        <span className="text-2xl font-semibold text-gray-900 w-10">{value}</span>

        <Button
          type="button"
          onClick={increment}
          variant="outline"
          disabled={value >= 7}
          className="w-10 h-10 text-xl"
        >
          +
        </Button>
      </div>
    </div>
  )
}
