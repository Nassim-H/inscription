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
  const [reglementHtml, setReglementHtml] = useState("Chargement...")

  useEffect(() => {
    fetch("/reglement.txt")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n")

        const htmlFormatted = lines
          .map((line) => {
            const trimmed = line.trim()

            if (trimmed.startsWith("Article")) {
              return `<h3 class="text-base font-semibold mt-6 mb-2 text-gray-800">${trimmed}</h3>`
            } else if (trimmed === "") {
              return "<br />"
            } else {
              return `<p class="mb-2 text-sm text-gray-700 leading-relaxed">${trimmed}</p>`
            }
          })
          .join("")

        setReglementHtml(htmlFormatted)
      })
      .catch(() => {
        setReglementHtml("<p class='text-red-500'>❌ Erreur de chargement du règlement.</p>")
      })

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-lg max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Règlement intérieur</h2>

        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: reglementHtml }}
        />

        {!isBottom && (
          <div className="mt-3 text-xs text-orange-600">
            ⚠️ Faites défiler jusqu’en bas pour continuer.
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
