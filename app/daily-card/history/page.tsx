"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  Heart,
  Zap,
  Sword,
  Coins,
  Sparkles,
  RotateCcw,
  Briefcase,
  Star,
  Sun,
  Moon,
  Download,
  FileText,
} from "lucide-react"
import { exportDailyDrawToPDF } from "@/lib/export-utils"

interface DailyDraw {
  id: string
  date: string
  card: {
    name: string
    slug: string
    suit?: string
    keywords: string[]
  }
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

const focusAreaIcons = {
  love: Heart,
  career: Briefcase,
  personal: Star,
  health: Sun,
  finances: Coins,
  spirituality: Moon,
  general: Sparkles,
}

const focusAreaLabels = {
  love: "Love & Relationships",
  career: "Career & Work",
  personal: "Personal Growth",
  health: "Health & Wellness",
  finances: "Money & Finances",
  spirituality: "Spirituality",
  general: "General Guidance",
}

export default function DailyCardHistoryPage() {
  const [draws, setDraws] = useState<DailyDraw[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFocus, setFilterFocus] = useState("all")
  const [filterMonth, setFilterMonth] = useState("all")

  useEffect(() => {
    const savedDraws = JSON.parse(localStorage.getItem("dailyCardDraws") || "[]")
    setDraws(savedDraws)
  }, [])

  const filteredDraws = draws.filter((draw) => {
    const matchesSearch =
      draw.card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draw.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draw.card.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFocus = filterFocus === "all" || draw.focusArea === filterFocus

    const matchesMonth = filterMonth === "all" || new Date(draw.date).toISOString().slice(0, 7) === filterMonth

    return matchesSearch && matchesFocus && matchesMonth
  })

  // Get unique months from draws for filter
  const availableMonths = [...new Set(draws.map((draw) => new Date(draw.date).toISOString().slice(0, 7)))]
    .sort()
    .reverse()

  const handleExportDraw = (draw: DailyDraw) => {
    exportDailyDrawToPDF(draw)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/daily-card">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Daily Card
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Card History</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Review your past daily card draws and track your spiritual journey
            </p>
          </div>
        </div>

        {draws.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Daily Cards Yet</h3>
              <p className="text-gray-600 mb-4">Start your daily practice by drawing your first card</p>
              <Link href="/daily-card">
                <Button>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Draw Today's Card
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by card name, question, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterFocus} onValueChange={setFilterFocus}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Focus Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="love">Love</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="finances">Finances</SelectItem>
                      <SelectItem value="spirituality">Spirituality</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterMonth} onValueChange={setFilterMonth}>
                    <SelectTrigger className="w-32">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      {availableMonths.map((month) => (
                        <SelectItem key={month} value={month}>
                          {new Date(month + "-01").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredDraws.length} of {draws.length} daily cards
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDraws.map((draw) => {
                const SuitIcon = draw.card.suit ? suitIcons[draw.card.suit as keyof typeof suitIcons] : Sparkles
                const FocusIcon = focusAreaIcons[draw.focusArea as keyof typeof focusAreaIcons]

                return (
                  <Card key={draw.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(draw.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          {draw.isReversed && (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Reversed
                            </Badge>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleExportDraw(draw)}>
                                <FileText className="h-4 w-4 mr-2" />
                                Export as PDF
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="w-full h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-3">
                        <div className="text-white text-center">
                          <SuitIcon className="h-6 w-6 mx-auto mb-1" />
                          <p className="text-sm font-medium">{draw.card.name}</p>
                        </div>
                      </div>

                      <CardTitle className="text-lg">
                        <Link href={`/cards/${draw.card.slug}`} className="hover:text-purple-600 transition-colors">
                          {draw.card.name}
                        </Link>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FocusIcon className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {focusAreaLabels[draw.focusArea as keyof typeof focusAreaLabels]}
                          </span>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Your Question:</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{draw.question}</p>
                        </div>

                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm font-medium text-yellow-800 mb-1">Personal Message:</p>
                          <p className="text-sm text-yellow-700 line-clamp-3">{draw.personalInterpretation}</p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {draw.card.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredDraws.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setFilterFocus("all")
                      setFilterMonth("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
