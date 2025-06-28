interface ProgressBarFormProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export default function ProgressBarForm({ currentStep, totalSteps, labels = [] }: ProgressBarFormProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100 )

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-2">
        {labels.length === totalSteps && (
          <div className="mb-1 flex justify-between text-[11px] sm:text-xs text-gray-500">
            {labels.map((label, i) => (
              <span
                key={i}
                className={`${i + 1 === currentStep ? "font-semibold text-gray-800" : ""}`}
              >
                
              </span>
            ))}
          </div>
        )}

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-800 h-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-1 text-[10px] sm:text-xs text-right text-gray-500">
          {percentage}% complété
        </p>
      </div>
    </div>
  )
}
