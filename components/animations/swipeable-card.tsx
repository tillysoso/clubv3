"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSwipeGesture } from "@/hooks/use-swipe-gesture"

interface TarotCard {
  id: string
  name: string
  suit?: string
  meaning: string
  reversed_meaning: string
  description: string
  keywords: string[]
  image?: string
}

interface SpreadCard {
  card: TarotCard
  position: string
  isReversed: boolean
  revealed: boolean
  x: number
  y: number
  rotation: number
}

interface SwipeableCardProps {
  card: SpreadCard | TarotCard
  isRevealed: boolean
  onReveal: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
  style?: React.CSSProperties
}

export function SwipeableCard({
  card,
  isRevealed,
  onReveal,
  onSwipeLeft,
  onSwipeRight,
  className = "",
  style = {},
}: SwipeableCardProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  // Handle card data structure differences
  const cardData = "card" in card ? card.card : card
  const isReversed = "isReversed" in card ? card.isReversed : false
  const position = "position" in card ? card.position : ""

  const {
    elementRef,
    isPressed,
    swipeDirection: gestureDirection,
  } = useSwipeGesture({
    onSwipeLeft: onSwipeLeft || (() => {}),
    onSwipeRight: onSwipeRight || (() => {}),
    onTap: () => {
      if (!isRevealed && !isFlipping) {
        handleReveal()
      }
    },
    threshold: 50,
  })

  const handleReveal = () => {
    if (isRevealed || isFlipping) return

    setIsFlipping(true)
    setTimeout(() => {
      onReveal()
      setTimeout(() => {
        setIsFlipping(false)
      }, 300)
    }, 300)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isRevealed && !isFlipping) {
      handleReveal()
    }
  }

  // Apply swipe animation based on gesture
  React.useEffect(() => {
    if (gestureDirection) {
      setSwipeDirection(gestureDirection)
      const timer = setTimeout(() => {
        setSwipeDirection(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [gestureDirection])

  return (
    <div
      ref={elementRef}
      className={`
        relative w-32 h-48 cursor-pointer select-none
        ${className}
        ${isPressed ? "scale-95" : ""}
        ${swipeDirection === "left" ? "animate-swipe-left" : ""}
        ${swipeDirection === "right" ? "animate-swipe-right" : ""}
        ${!isRevealed && !isFlipping ? "animate-bounce-horizontal" : ""}
        transition-transform duration-200
      `}
      style={style}
      onClick={handleClick}
    >
      {/* Card Container with 3D flip effect */}
      <div
        className={`
          relative w-full h-full transition-transform duration-600 transform-gpu
          ${isFlipping ? "card-flip" : ""}
          ${isRevealed ? "rotate-y-0" : "rotate-y-0"}
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <Card
          className={`
            absolute inset-0 backface-hidden
            ${isRevealed ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"}
            bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900
            border-2 border-yellow-400/30 shadow-lg
            transition-all duration-600
          `}
        >
          <CardContent className="p-0 h-full flex items-center justify-center">
            <div className="text-center">
              {/* Mystical Pattern */}
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-80" />
                <div className="absolute inset-2 bg-purple-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse-star" />
                </div>
              </div>

              {/* Mystical Text */}
              <div className="text-yellow-400 text-xs font-seaweed">Majestic</div>
              <div className="text-yellow-300 text-xs font-seaweed">Tarot</div>

              {/* Decorative Elements */}
              <div className="flex justify-center space-x-1 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Front */}
        <Card
          className={`
            absolute inset-0 backface-hidden
            ${isRevealed ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"}
            bg-gradient-to-br from-white to-purple-50
            border-2 shadow-xl
            transition-all duration-600
            ${isRevealed ? "border-yellow-400 animate-pulse-glow" : "border-gray-200"}
          `}
        >
          <CardContent className="p-3 h-full flex flex-col">
            {/* Card Header */}
            <div className="text-center mb-2">
              <h3 className="font-fugaz text-sm text-purple-900 leading-tight">{cardData.name}</h3>
              {cardData.suit && <p className="text-xs text-purple-600 mt-1">{cardData.suit}</p>}
              {isReversed && (
                <Badge variant="outline" className="text-xs mt-1 border-red-400 text-red-600">
                  Reversed
                </Badge>
              )}
            </div>

            {/* Card Image Placeholder */}
            <div className="flex-1 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md mb-2 flex items-center justify-center">
              <div className="text-purple-400 text-xs text-center">
                <div className="w-8 h-8 mx-auto mb-1 bg-purple-300 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-600 rounded-full animate-float-star" />
                </div>
                Card Art
              </div>
            </div>

            {/* Card Keywords */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-1">
                {cardData.keywords.slice(0, 2).map((keyword, index) => (
                  <span key={index} className="text-xs bg-purple-100 text-purple-700 px-1 py-0.5 rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Position Label */}
            {position && (
              <div className="text-center mt-1">
                <span className="text-xs text-gray-600 font-medium">{position}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interaction Hints */}
      {!isRevealed && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-gray-500 text-center animate-fade-in">
            {onSwipeLeft || onSwipeRight ? "Tap to reveal • Swipe to navigate" : "Tap to reveal"}
          </div>
        </div>
      )}

      {/* Reveal Effect Particles */}
      {isRevealed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-sparkle-star"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
