"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { SwipeableCard } from "./swipeable-card"
import { StarLoading } from "@/components/ui/star-loading"
import { Eye, EyeOff, RotateCcw, Save, ChevronLeft, ChevronRight } from "lucide-react"

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

interface AnimatedCardSpreadProps {
  spreadType: string
  cards: SpreadCard[]
  onCardReveal: (index: number) => void
  onSaveReading?: (cards: SpreadCard[]) => void
  isLoading?: boolean
}

const SPREAD_LAYOUTS = {
  "three-card": {
    positions: [
      { x: 20, y: 50, rotation: -5 },
      { x: 50, y: 45, rotation: 0 },
      { x: 80, y: 50, rotation: 5 },
    ],
  },
  "celtic-cross": {
    positions: [
      { x: 50, y: 50, rotation: 0 }, // Present
      { x: 50, y: 50, rotation: 90 }, // Challenge
      { x: 50, y: 25, rotation: 0 }, // Distant Past
      { x: 25, y: 50, rotation: 0 }, // Recent Past
      { x: 50, y: 75, rotation: 0 }, // Possible Outcome
      { x: 75, y: 50, rotation: 0 }, // Near Future
      { x: 85, y: 85, rotation: 5 }, // Your Approach
      { x: 85, y: 65, rotation: -5 }, // External Influences
      { x: 85, y: 45, rotation: 5 }, // Hopes and Fears
      { x: 85, y: 25, rotation: -5 }, // Final Outcome
    ],
  },
  horseshoe: {
    positions: [
      { x: 15, y: 70, rotation: -15 },
      { x: 25, y: 45, rotation: -10 },
      { x: 40, y: 25, rotation: -5 },
      { x: 60, y: 25, rotation: 5 },
      { x: 75, y: 45, rotation: 10 },
      { x: 85, y: 70, rotation: 15 },
    ],
  },
}

export function AnimatedCardSpread({
  spreadType,
  cards,
  onCardReveal,
  onSaveReading,
  isLoading = false,
}: AnimatedCardSpreadProps) {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())
  const [allRevealed, setAllRevealed] = useState(false)
  const [isDealing, setIsDealing] = useState(true)
  const [currentMobileCard, setCurrentMobileCard] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Deal cards animation
  useEffect(() => {
    if (cards.length === 0) return

    const dealTimer = setTimeout(
      () => {
        setIsDealing(false)
      },
      cards.length * 200 + 500,
    )

    return () => clearTimeout(dealTimer)
  }, [cards.length])

  const handleCardReveal = (index: number) => {
    if (isAnimating || revealedCards.has(index)) return

    setIsAnimating(true)
    setRevealedCards((prev) => new Set([...prev, index]))
    onCardReveal(index)

    // Animation delay
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const handleRevealAll = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const newRevealed = new Set<number>()

    cards.forEach((_, index) => {
      setTimeout(() => {
        newRevealed.add(index)
        setRevealedCards(new Set(newRevealed))
        onCardReveal(index)

        if (index === cards.length - 1) {
          setAllRevealed(true)
          setTimeout(() => setIsAnimating(false), 600)
        }
      }, index * 300)
    })
  }

  const handleHideAll = () => {
    if (isAnimating) return

    setRevealedCards(new Set())
    setAllRevealed(false)
  }

  const handleReset = () => {
    if (isAnimating) return

    setRevealedCards(new Set())
    setAllRevealed(false)
    setIsDealing(true)
    setCurrentMobileCard(0)

    setTimeout(
      () => {
        setIsDealing(false)
      },
      cards.length * 200 + 500,
    )
  }

  const handleSave = () => {
    if (onSaveReading && revealedCards.size > 0) {
      onSaveReading(cards)
    }
  }

  const navigateMobile = (direction: "prev" | "next") => {
    if (direction === "prev" && currentMobileCard > 0) {
      setCurrentMobileCard(currentMobileCard - 1)
    } else if (direction === "next" && currentMobileCard < cards.length - 1) {
      setCurrentMobileCard(currentMobileCard + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <StarLoading variant="constellation" message="Shuffling the cosmic deck..." />
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        <p>No cards available for this spread</p>
      </div>
    )
  }

  const layout = SPREAD_LAYOUTS[spreadType as keyof typeof SPREAD_LAYOUTS] || SPREAD_LAYOUTS["three-card"]

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button
          onClick={handleRevealAll}
          disabled={allRevealed || isAnimating}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          Reveal All
        </Button>

        <Button onClick={handleHideAll} disabled={revealedCards.size === 0 || isAnimating} variant="outline">
          <EyeOff className="w-4 h-4 mr-2" />
          Hide All
        </Button>

        <Button onClick={handleReset} disabled={isAnimating} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        {onSaveReading && (
          <Button
            onClick={handleSave}
            disabled={revealedCards.size === 0}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Reading
          </Button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Cards Revealed: {revealedCards.size} / {cards.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round((revealedCards.size / cards.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(revealedCards.size / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile View */}
      {isMobile ? (
        <div className="relative">
          {/* Mobile Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => navigateMobile("prev")}
              disabled={currentMobileCard === 0}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="text-sm text-gray-600">
              {currentMobileCard + 1} of {cards.length}
            </span>

            <Button
              onClick={() => navigateMobile("next")}
              disabled={currentMobileCard === cards.length - 1}
              variant="outline"
              size="sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Card Display */}
          <div className="flex justify-center">
            <SwipeableCard
              card={cards[currentMobileCard]}
              isRevealed={revealedCards.has(currentMobileCard)}
              onReveal={() => handleCardReveal(currentMobileCard)}
              onSwipeLeft={() => navigateMobile("next")}
              onSwipeRight={() => navigateMobile("prev")}
              className={`
                ${isDealing ? "card-deal" : ""}
                ${revealedCards.has(currentMobileCard) ? "card-revealed" : ""}
              `}
              style={{
                animationDelay: `${currentMobileCard * 200}ms`,
              }}
            />
          </div>

          {/* Mobile Progress Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMobileCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentMobileCard
                    ? "bg-purple-600 scale-125"
                    : revealedCards.has(index)
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop View */
        <div ref={containerRef} className="relative w-full h-[600px] mx-auto" style={{ minHeight: "600px" }}>
          {cards.map((spreadCard, index) => {
            const position = layout.positions[index] || { x: 50, y: 50, rotation: 0 }

            return (
              <div
                key={`${spreadCard.card.id}-${index}`}
                className={`
                  absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                  ${isDealing ? "card-deal" : ""}
                  ${revealedCards.has(index) ? "card-revealed" : ""}
                `}
                style={
                  {
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    animationDelay: `${index * 200}ms`,
                    "--card-rotation": `${position.rotation}deg`,
                  } as React.CSSProperties
                }
              >
                <SwipeableCard
                  card={spreadCard}
                  isRevealed={revealedCards.has(index)}
                  onReveal={() => handleCardReveal(index)}
                  className="hover:scale-105 transition-transform duration-200"
                />

                {/* Position Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                    {spreadCard.position}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-gray-600">
        {isMobile ? (
          <p>Tap cards to reveal • Swipe left/right to navigate • Use dots to jump to specific cards</p>
        ) : (
          <p>Click on any card to reveal its meaning • Use the controls above to reveal all or reset the spread</p>
        )}
      </div>
    </div>
  )
}
