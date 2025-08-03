"use client"

import type React from "react"

interface StarLoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal" | "constellation" | "orbit" | "cascade"
  message?: string
  className?: string
}

const StarIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export function StarLoading({
  size = "md",
  variant = "default",
  message = "Loading...",
  className = "",
}: StarLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const colors = ["#460982", "#D4D444", "#99D13B", "#DD4444", "#7D3FFF"]

  const renderStars = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <StarIcon
                key={i}
                className={`${sizeClasses[size]} animate-pulse`}
                style={{
                  color: colors[i % colors.length],
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )

      case "constellation":
        return (
          <div className="relative w-32 h-32">
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = i * 72 * (Math.PI / 180)
              const radius = 40
              const x = Math.cos(angle) * radius + 64
              const y = Math.sin(angle) * radius + 64

              return (
                <StarIcon
                  key={i}
                  className={`absolute ${sizeClasses[size]} animate-pulse`}
                  style={{
                    left: `${x - 24}px`,
                    top: `${y - 24}px`,
                    color: colors[i],
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              )
            })}
          </div>
        )

      case "orbit":
        return (
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 animate-spin">
              {[0, 1, 2].map((i) => (
                <StarIcon
                  key={i}
                  className={`absolute ${sizeClasses[size]}`}
                  style={{
                    color: colors[i],
                    transform: `rotate(${i * 120}deg) translateY(-40px)`,
                    transformOrigin: "50% 48px",
                  }}
                />
              ))}
            </div>
          </div>
        )

      case "cascade":
        return (
          <div className="flex flex-col space-y-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center">
                <StarIcon
                  className={`${sizeClasses[size]} animate-bounce`}
                  style={{
                    color: colors[i],
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className="relative w-32 h-32">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <StarIcon
                key={i}
                className={`absolute ${sizeClasses[size]} animate-pulse`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  color: colors[i % colors.length],
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderStars()}
      {message && (
        <p className="text-center font-fugaz text-lg" style={{ color: "#460982" }}>
          {message}
        </p>
      )}
    </div>
  )
}

export function FullPageStarLoading({ message = "Loading your mystical experience..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <StarLoading size="lg" variant="constellation" message={message} />
      <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"
          style={{ width: "70%" }}
        />
      </div>
    </div>
  )
}

export function CardLoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-center mb-4">
        <StarLoading size="sm" variant="minimal" message="" />
      </div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}
