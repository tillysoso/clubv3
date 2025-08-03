"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  color: string
  animationType: "twinkle" | "pulse" | "rotate" | "float" | "sparkle"
  delay: number
}

interface AnimatedStarsProps {
  count?: number
  className?: string
}

export function AnimatedStars({ count = 5, className = "" }: AnimatedStarsProps) {
  const [stars, setStars] = useState<Star[]>([])

  const colors = ["#460982", "#D4D444", "#99D13B", "#DD4444", "#7D3FFF"]
  const animations: Star["animationType"][] = ["twinkle", "pulse", "rotate", "float", "sparkle"]

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20, // 20-50px
          color: colors[Math.floor(Math.random() * colors.length)],
          animationType: animations[Math.floor(Math.random() * animations.length)],
          delay: Math.random() * 3,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [count])

  const getAnimationClass = (type: Star["animationType"]) => {
    switch (type) {
      case "twinkle":
        return "animate-twinkle"
      case "pulse":
        return "animate-pulse-star"
      case "rotate":
        return "animate-rotate-star"
      case "float":
        return "animate-float-star"
      case "sparkle":
        return "animate-sparkle-star"
      default:
        return "animate-twinkle"
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${getAnimationClass(star.animationType)}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <svg
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: star.color }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
