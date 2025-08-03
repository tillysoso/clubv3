"use client"

import { StarLoading } from "./star-loading"

interface LoadingCardProps {
  title?: string
  description?: string
  variant?: "default" | "minimal" | "constellation" | "orbit" | "cascade"
  className?: string
}

export function LoadingCard({
  title = "Loading...",
  description,
  variant = "minimal",
  className = "",
}: LoadingCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-purple-200 p-6 ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <StarLoading size="md" variant={variant} message="" />
        <div className="text-center">
          <h3 className="font-fugaz text-lg mb-2" style={{ color: "#460982" }}>
            {title}
          </h3>
          {description && <p className="font-space-grotesk text-sm text-gray-600">{description}</p>}
        </div>
      </div>
    </div>
  )
}

export function InlineStarLoader({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="inline-flex items-center space-x-2">
      <StarLoading size={size} variant="minimal" message="" />
    </div>
  )
}
