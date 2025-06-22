"use client"

import { useState, useRef, useEffect } from "react"

export default function ReglementModal({
  isOpen,
  onClose,
  onAcceptScroll,
}: {
  isOpen: boolean
  onClose: () => void
  onAcceptScroll: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isBottom, setIsBottom] = useState(false)
  const [reglementText, setReglementText] = useState("Chargement...")

  useEffect(() => {
    // Charger le texte depuis /public/reglement.txt
    fetch("/reglement.txt")
      .then((res) => res.text())
      .then((text) => setReglementText(text))
      .catch(() => setReglementText("❌ Erreur de chargement du règlement."))

    const handleScroll = () => {
      const el = scrollRef.current
      if (!el) return

      const { scrollTop, scrollHeight, clientHeight } = el
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 20
      setIsBottom(scrolledToBottom)

      if (scrolledToBottom) {
        onAcceptScroll()
      }
    }

    const el = scrollRef.current
    if (el) el.addEventListener("scroll", handleScroll)

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll)
    }
  }, [onAcceptScroll])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
        <h2 className="text-xl font-bold mb-4">📜 Règlement intérieur</h2>

        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto border p-4 text-sm whitespace-pre-wrap"
        >
          {reglementText}
        </div>

        {!isBottom && (
          <p className="text-xs text-red-500 mt-3">
            ⚠️ Veuillez faire défiler jusqu’en bas pour activer la validation.
          </p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-sm text-gray-500">
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
