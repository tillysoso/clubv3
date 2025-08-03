"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Heart, Briefcase, Sparkles, Star, Clock, Users } from "lucide-react"

const readingTypes = [
  {
    id: "three-card",
    title: "Three Card Spread",
    description: "Past, Present, Future - Perfect for quick insights",
    icon: Star,
    cards: 3,
    duration: "5-10 minutes",
    difficulty: "Beginner",
    href: "/readings/spread/three-card",
  },
  {
    id: "five-card",
    title: "Five Card Spread",
    description: "Comprehensive guidance on your current situation",
    icon: Sparkles,
    cards: 5,
    duration: "10-15 minutes",
    difficulty: "Intermediate",
    href: "/readings/spread/five-card",
  },
  {
    id: "celtic-cross",
    title: "Celtic Cross",
    description: "The most detailed and comprehensive tarot reading",
    icon: Users,
    cards: 10,
    duration: "20-30 minutes",
    difficulty: "Advanced",
    href: "/readings/spread/celtic-cross",
  },
  {
    id: "love",
    title: "Love & Relationships",
    description: "Discover insights about your romantic life and relationships",
    icon: Heart,
    cards: 3,
    duration: "5-10 minutes",
    difficulty: "Beginner",
    href: "/readings/spread/three-card?focus=love",
  },
  {
    id: "career",
    title: "Career & Finance",
    description: "Get guidance on your professional path and financial decisions",
    icon: Briefcase,
    cards: 5,
    duration: "10-15 minutes",
    difficulty: "Intermediate",
    href: "/readings/spread/five-card?focus=career",
  },
]

export default function ReadingsPage() {
  const [selectedReading, setSelectedReading] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Tarot Readings</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your reading type and let the cards reveal their wisdom through beautiful animations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {readingTypes.map((reading) => {
            const IconComponent = reading.icon
            return (
              <Card key={reading.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                    {reading.title}
                  </CardTitle>
                  <CardDescription className="text-center">{reading.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Shuffle className="h-4 w-4 mr-1" />
                      {reading.cards} Cards
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {reading.duration}
                    </div>
                  </div>

                  <div className="text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        reading.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : reading.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reading.difficulty}
                    </span>
                  </div>

                  <Link href={reading.href}>
                    <Button className="w-full group-hover:bg-purple-700 transition-colors">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Start Reading
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Enhanced Reading Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Animated Card Reveals</h3>
              <p className="text-gray-600">Watch as cards are dealt and revealed with smooth, mystical animations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Interpretations</h3>
              <p className="text-gray-600">Each reading is tailored to your specific question and situation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save & Track</h3>
              <p className="text-gray-600">Automatically save readings to your journal for future reference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
