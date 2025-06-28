"use client"

import { ReactNode, useState } from "react"
import { ChevronDown } from "lucide-react"

interface FormSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function FormSection({ title, children, defaultOpen = true }: FormSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left py-2"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${open ? "opacity-100" : "max-h-0 opacity-0"}`}
      >
<div
  className={`transition-all duration-300 overflow-hidden ${
    open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="space-y-4">{children}</div>
</div>
      </div>
    </div>
  )
}
