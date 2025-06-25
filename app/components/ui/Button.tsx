import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", disabled, ...props }, ref) => {
    let baseClasses =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-8 px-3"

    let variantClasses = ""

    if (variant === "outline") {
      variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-100"
    } else if (variant === "ghost") {
      variantClasses = "text-gray-700 hover:bg-gray-100"
    } else {
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700"
    }

    const finalClassName = `${baseClasses} ${variantClasses} ${className}`.trim()

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
