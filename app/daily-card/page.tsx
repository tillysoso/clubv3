"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Shuffle,
  Heart,
  Zap,
  Sword,
  Coins,
  Sparkles,
  Calendar,
  Save,
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sun,
  Moon,
  Star,
  Briefcase,
  BarChart3,
} from "lucide-react"
import { tarotCards, type TarotCard } from "@/lib/tarot-cards"

interface DailyDraw {
  id: string
  date: string
  card: TarotCard
  question: string
  focusArea: string
  currentMood: string
  personalInterpretation: string
  isReversed: boolean
}

const suitIcons = {
  cups: Heart,
  wands: Zap,
  swords: Sword,
  pentacles: Coins,
}

const focusAreas = [
  { value: "love", label: "Love & Relationships", icon: Heart },
  { value: "career", label: "Career & Work", icon: Briefcase },
  { value: "personal", label: "Personal Growth", icon: Star },
  { value: "health", label: "Health & Wellness", icon: Sun },
  { value: "finances", label: "Money & Finances", icon: Coins },
  { value: "spirituality", label: "Spirituality", icon: Moon },
  { value: "general", label: "General Guidance", icon: Sparkles },
]

const moods = [
  { value: "optimistic", label: "Optimistic & Hopeful" },
  { value: "anxious", label: "Anxious or Worried" },
  { value: "confused", label: "Confused or Uncertain" },
  { value: "excited", label: "Excited & Energetic" },
  { value: "peaceful", label: "Calm & Peaceful" },
  { value: "frustrated", label: "Frustrated or Stuck" },
  { value: "curious", label: "Curious & Open" },
]

function generatePersonalInterpretation(
  card: TarotCard,
  question: string,
  focusArea: string,
  mood: string,
  isReversed: boolean,
): string {
  const baseMeaning = isReversed ? card.reversedMeaning : card.uprightMeaning

  let interpretation = `Today, ${card.name} ${isReversed ? "(reversed)" : ""} speaks directly to your situation. `

  // Add focus area context
  switch (focusArea) {
    case "love":
      interpretation += `In matters of the heart, this card suggests ${baseMeaning.toLowerCase()} Your relationships may benefit from ${card.keywords.slice(0, 2).join(" and ")}. `
      break
    case "career":
      interpretation += `Regarding your professional life, ${card.name} indicates ${baseMeaning.toLowerCase()} Consider how ${card.keywords[0]} might influence your work decisions today. `
      break
    case "personal":
      interpretation += `For your personal growth journey, this card encourages ${baseMeaning.toLowerCase()} Focus on developing ${card.keywords.slice(0, 2).join(" and ")} within yourself. `
      break
    case "health":
      interpretation += `In terms of your wellbeing, ${card.name} suggests ${baseMeaning.toLowerCase()} Pay attention to how ${card.keywords[0]} affects your physical and mental health. `
      break
    case "finances":
      interpretation += `Financially speaking, this card points to ${baseMeaning.toLowerCase()} Your money matters may be influenced by themes of ${card.keywords.slice(0, 2).join(" and ")}. `
      break
    case "spirituality":
      interpretation += `On your spiritual path, ${card.name} reveals ${baseMeaning.toLowerCase()} Connect with the energy of ${card.keywords[0]} in your spiritual practices today. `
      break
    default:
      interpretation += `${baseMeaning} The themes of ${card.keywords.slice(0, 2).join(" and ")} are particularly relevant for you today. `
  }

  // Add mood-based guidance
  switch (mood) {
    case "optimistic":
      interpretation += `Your positive outlook aligns well with this card's energy. Channel this optimism into ${card.keywords[0]}.`
      break
    case "anxious":
      interpretation += `While you may feel anxious, this card offers reassurance. Let the energy of ${card.keywords[0]} help calm your worries.`
      break
    case "confused":
      interpretation += `In your current state of uncertainty, this card provides clarity. Focus on ${card.keywords[0]} to find your direction.`
      break
    case "excited":
      interpretation += `Your excitement resonates with this card's message. Use this energy to embrace ${card.keywords[0]} fully.`
      break
    case "peaceful":
      interpretation += `Your calm state of mind allows you to fully receive this card's wisdom about ${card.keywords[0]}.`
      break
    case "frustrated":
      interpretation += `Though you may feel stuck, this card suggests a path forward through ${card.keywords[0]}. Be patient with the process.`
      break
    default:
      interpretation += `Stay open to the message of ${card.keywords[0]} as you navigate your day.`
  }

  return interpretation
}

export default function DailyCardPage() {
  const [hasDrawnToday, setHasDrawnToday] = useState(false)
  const [currentDraw, setCurrentDraw] = useState<DailyDraw | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [question, setQuestion] = useState("")
  const [focusArea, setFocusArea] = useState("")
  const [currentMood, setCurrentMood] = useState("")

  useEffect(() => {
    // Check if user has already drawn a card today
    const today = new Date().toISOString().split("T")[0]
    const savedDraws = JSON.parse(localStorage.getItem("dailyCardDraws") || "[]")
    const todaysDraw = savedDraws.find((draw: DailyDraw) => draw.date === today)

    if (todaysDraw) {
      setHasDrawnToday(true)
      setCurrentDraw(todaysDraw)
    }
  }, [])

  const handleDrawCard = () => {
    if (!question.trim() || !focusArea || !currentMood) {
      return
    }

    setIsDrawing(true)
    setShowForm(false)

    // Simulate card shuffling
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      const isReversed = Math.random() < 0.3 // 30% chance of reversed
      const today = new Date().toISOString().split("T")[0]

      const personalInterpretation = generatePersonalInterpretation(
        randomCard,
        question,
        focusArea,
        currentMood,
        isReversed,
      )

      const newDraw: DailyDraw = {
        id: Date.now().toString(),
        date: today,
        card: randomCard,
        question: question.trim(),
        focusArea,
        currentMood,
        personalInterpretation,
        isReversed,
      }

      // Save to localStorage
      const savedDraws = JSON.parse(localStorage.getItem("dailyCardDraws") || "[]")
      const updatedDraws = [newDraw, ...savedDraws.filter((draw: DailyDraw) => draw.date !== today)]
      localStorage.setItem("dailyCardDraws", JSON.stringify(updatedDraws))

      setCurrentDraw(newDraw)
      setHasDrawnToday(true)
      setIsDrawing(false)
    }, 3000)
  }

  const saveToJournal = () => {
    if (!currentDraw) return

    const journalEntry = {
      id: Date.now().toString(),
      title: `Daily Card: ${currentDraw.card.name}`,
      content: `Daily card draw for ${new Date(currentDraw.date).toLocaleDateString()}.\n\nQuestion: ${currentDraw.question}\n\nFocus Area: ${focusAreas.find((f) => f.value === currentDraw.focusArea)?.label}\n\nCard drawn: ${currentDraw.card.name}${currentDraw.isReversed ? " (Reversed)" : ""}`,
      readingType: "daily",
      mood: currentDraw.currentMood,
      date: currentDraw.date,
      tags: ["daily-card", currentDraw.focusArea, ...currentDraw.card.keywords.slice(0, 2)],
      cards: [currentDraw.card.name + (currentDraw.isReversed ? " (Reversed)" : "")],
      insights: currentDraw.personalInterpretation,
    }

    const existingEntries = JSON.parse(localStorage.getItem("tarotJournalEntries") || "[]")
    const updatedEntries = [journalEntry, ...existingEntries]
    localStorage.setItem("tarotJournalEntries", JSON.stringify(updatedEntries))

    // Show success message or redirect
    alert("Daily card saved to your journal!")
  }

  const resetForNewDraw = () => {
    setHasDrawnToday(false)
    setCurrentDraw(null)
    setQuestion("")
    setFocusArea("")
    setCurrentMood("")
    setShowForm(true)
  }

  const SuitIcon = currentDraw?.card.suit ? suitIcons[currentDraw.card.suit] : Sparkles
  const YesNoIcon = currentDraw
    ? currentDraw.card.yesNo === "yes"
      ? CheckCircle
      : currentDraw.card.yesNo === "no"
        ? XCircle
        : HelpCircle
    : HelpCircle

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sun className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Card Draw</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Receive personalized guidance from the cards each day
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {!hasDrawnToday && !showForm && (
          <Card className="text-center py-12 mb-8">
            <CardContent>
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shuffle className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for Today's Guidance?</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Draw your daily card to receive personalized insights and guidance for the day ahead.
              </p>
              <Button size="lg" onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
                <Shuffle className="h-5 w-5 mr-2" />
                Draw My Daily Card
              </Button>
            </CardContent>
          </Card>
        )}

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personalize Your Reading</CardTitle>
              <CardDescription>
                Help us provide more meaningful guidance by sharing your current situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question">What's on your mind today? *</Label>
                <Textarea
                  id="question"
                  placeholder="e.g., I'm feeling uncertain about a decision I need to make..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>What area of life would you like guidance on? *</Label>
                <Select value={focusArea} onValueChange={setFocusArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    {focusAreas.map((area) => {
                      const IconComponent = area.icon
                      return (
                        <SelectItem key={area.value} value={area.value}>
                          <div className="flex items-center">
                            <IconComponent className="h-4 w-4 mr-2" />
                            {area.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>How are you feeling right now? *</Label>
                <Select value={currentMood} onValueChange={setCurrentMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleDrawCard}
                  disabled={!question.trim() || !focusArea || !currentMood}
                  className="flex-1"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw My Card
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isDrawing && (
          <Card className="text-center py-16 mb-8">
            <CardContent>
              <div className="animate-spin w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-8"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Cards Are Speaking...</h2>
              <p className="text-gray-600">Channeling your personal energy and finding the perfect guidance for you</p>
            </CardContent>
          </Card>
        )}

        {currentDraw && hasDrawnToday && (
          <div className="space-y-8">
            {/* Card Display */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">
                    Daily Card for {new Date(currentDraw.date).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-3xl mb-2">
                  {currentDraw.card.name}
                  {currentDraw.isReversed && (
                    <Badge variant="outline" className="ml-3 text-red-600 border-red-200">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reversed
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Card Visual */}
                  <div className="lg:w-1/3">
                    <div
                      className={`w-full h-80 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 ${currentDraw.isReversed ? "transform rotate-180" : ""}`}
                    >
                      <div className="text-white text-center">
                        <SuitIcon className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-2xl font-bold mb-2">{currentDraw.card.number}</p>
                        <p className="text-lg font-medium">{currentDraw.card.name}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Yes/No:</span>
                        <div className="flex items-center">
                          <YesNoIcon
                            className={`h-4 w-4 mr-1 ${
                              currentDraw.card.yesNo === "yes"
                                ? "text-green-600"
                                : currentDraw.card.yesNo === "no"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }`}
                          />
                          <span className="text-sm font-medium capitalize">{currentDraw.card.yesNo}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-2">Keywords:</span>
                        <div className="flex flex-wrap gap-1">
                          {currentDraw.card.keywords.slice(0, 4).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="lg:w-2/3 space-y-6">
                    {/* Your Question */}
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <h3 className="font-semibold text-blue-900 mb-2">Your Question:</h3>
                      <p className="text-blue-800">{currentDraw.question}</p>
                      <div className="flex items-center mt-3 space-x-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-blue-700 mr-1">Focus:</span>
                          <Badge variant="outline" className="text-blue-700 border-blue-200">
                            {focusAreas.find((f) => f.value === currentDraw.focusArea)?.label}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <span className="text-blue-700 mr-1">Mood:</span>
                          <Badge variant="outline" className="text-blue-700 border-blue-200">
                            {moods.find((m) => m.value === currentDraw.currentMood)?.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Personal Interpretation */}
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <h3 className="font-semibold text-yellow-900 mb-2">Your Personal Message:</h3>
                      <p className="text-yellow-800 leading-relaxed">{currentDraw.personalInterpretation}</p>
                    </div>

                    {/* Card Meaning */}
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <h3 className="font-semibold text-purple-900 mb-2">
                        {currentDraw.isReversed ? "Reversed" : "Upright"} Meaning:
                      </h3>
                      <p className="text-purple-800 leading-relaxed">
                        {currentDraw.isReversed ? currentDraw.card.reversedMeaning : currentDraw.card.uprightMeaning}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={saveToJournal} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
              <Link href={`/cards/${currentDraw.card.slug}`}>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Learn More About This Card
                </Button>
              </Link>
              <Link href="/daily-card/history">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Past Draws
                </Button>
              </Link>
              <Link href="/daily-card/insights">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Insights
                </Button>
              </Link>
            </div>

            {/* Tomorrow's Draw */}
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardContent className="text-center py-8">
                <Moon className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">See You Tomorrow</h3>
                <p className="opacity-90 mb-4">Return tomorrow for fresh guidance and new insights from the cards</p>
                <p className="text-sm opacity-75">Your next daily card will be available at midnight</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
