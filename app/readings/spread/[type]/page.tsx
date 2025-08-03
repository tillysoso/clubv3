"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCardSpread } from "@/components/animations/animated-card-spread"
import { StarLoading } from "@/components/ui/star-loading"
import { ArrowLeft, Shuffle, BookOpen } from "lucide-react"
import { tarotCards } from "@/lib/tarot-cards"

interface SpreadCard {
  card: any
  position: string
  isReversed: boolean
  revealed: boolean
  x: number
  y: number
  rotation: number
}

const SPREAD_CONFIGS = {
  "three-card": {
    name: "Three Card Spread",
    description: "Past, Present, Future",
    positions: ["Past", "Present", "Future"],
    cardCount: 3,
  },
  "celtic-cross": {
    name: "Celtic Cross",
    description: "Comprehensive 10-card reading",
    positions: [
      "Present Situation",
      "Challenge/Cross",
      "Distant Past/Foundation",
      "Recent Past",
      "Possible Outcome",
      "Near Future",
      "Your Approach",
      "External Influences",
      "Hopes and Fears",
      "Final Outcome",
    ],
    cardCount: 10,
  },
  horseshoe: {
    name: "Horseshoe Spread",
    description: "Seven cards for guidance",
    positions: [
      "Past",
      "Present",
      "Hidden Influences",
      "Obstacles",
      "Possible Outcome",
      "Action to Take",
      "Final Result",
    ],
    cardCount: 7,
  },
}

export default function SpreadPage() {
  const params = useParams()
  const router = useRouter()
  const spreadType = params.type as string

  const [cards, setCards] = useState<SpreadCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedReading, setSavedReading] = useState<SpreadCard[] | null>(null)

  const spreadConfig = SPREAD_CONFIGS[spreadType as keyof typeof SPREAD_CONFIGS]

  useEffect(() => {
    if (spreadConfig) {
      generateCards()
    } else {
      setIsLoading(false)
    }
  }, [spreadType, spreadConfig])

  const generateCards = async () => {
    setIsLoading(true)
    setIsGenerating(true)

    // Simulate card shuffling delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5)
    const selectedCards = shuffledCards.slice(0, spreadConfig.cardCount)

    const spreadCards: SpreadCard[] = selectedCards.map((card, index) => ({
      card,
      position: spreadConfig.positions[index],
      isReversed: Math.random() < 0.3, // 30% chance of reversed
      revealed: false,
      x: 0,
      y: 0,
      rotation: Math.random() * 10 - 5, // Random rotation between -5 and 5 degrees
    }))

    setCards(spreadCards)
    setIsLoading(false)
    setIsGenerating(false)
  }

  const handleCardReveal = (index: number) => {
    setCards((prev) => prev.map((card, i) => (i === index ? { ...card, revealed: true } : card)))
  }

  const handleSaveReading = (readingCards: SpreadCard[]) => {
    setSavedReading(readingCards)
    // Here you would typically save to a database or local storage
    console.log("Saving reading:", readingCards)
  }

  const handleNewReading = () => {
    generateCards()
    setSavedReading(null)
  }

  if (!spreadConfig) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Spread Not Found</h1>
          <p className="text-gray-600 mb-6">The requested spread type does not exist.</p>
          <Button onClick={() => router.push("/readings")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Readings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/readings")} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-fugaz text-purple-900">{spreadConfig.name}</h1>
            <p className="text-gray-600">{spreadConfig.description}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleNewReading}
            disabled={isLoading || isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            New Reading
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <StarLoading
            variant="constellation"
            message={isGenerating ? "Shuffling the cosmic deck..." : "Preparing your reading..."}
          />
        </div>
      ) : (
        <>
          {/* Card Spread */}
          <div className="mb-8">
            <AnimatedCardSpread
              spreadType={spreadType}
              cards={cards}
              onCardReveal={handleCardReveal}
              onSaveReading={handleSaveReading}
              isLoading={isLoading}
            />
          </div>

          {/* Reading Interpretation */}
          {cards.some((card) => card.revealed) && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Reading Interpretation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cards
                    .filter((card) => card.revealed)
                    .map((spreadCard, index) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold text-lg text-purple-900 mb-2">
                          {spreadCard.position}: {spreadCard.card.name}
                          {spreadCard.isReversed && <span className="text-red-600 text-sm ml-2">(Reversed)</span>}
                        </h3>
                        <p className="text-gray-700 mb-3">
                          {spreadCard.isReversed ? spreadCard.card.reversed_meaning : spreadCard.card.meaning}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {spreadCard.card.keywords.map((keyword: string, i: number) => (
                            <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Saved Reading Confirmation */}
          {savedReading && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-green-600 mb-2">
                    <BookOpen className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Reading Saved Successfully!</h3>
                  <p className="text-green-700">Your {spreadConfig.name} reading has been saved to your journal.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
