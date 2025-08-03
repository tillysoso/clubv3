"use client"

import React from "react"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Heart,
  Zap,
  Sword,
  Coins,
  Sparkles,
  Star,
  Sun,
  Moon,
  Briefcase,
  Award,
  Activity,
  Eye,
  Download,
  FileText,
  Table,
} from "lucide-react"
import {
  exportDailyDrawsToCSV,
  exportWeeklyInsightsToCSV,
  exportMonthlyInsightsToCSV,
  exportInsightsToPDF,
} from "@/lib/export-utils"

interface DailyDraw {
  id: string
  date: string
  card: {
    name: string
    slug: string
    suit?: string
    keywords: string[]
    arcana: string
  }
  question: string
  focusArea: string
  currentMood: string
  personalInterpretation: string
  isReversed: boolean
}

interface WeeklyInsight {
  weekStart: string
  weekEnd: string
  draws: DailyDraw[]
  dominantSuit?: string
  dominantFocus: string
  dominantMood: string
  reversedCount: number
  themes: string[]
  moodTrend: "improving" | "declining" | "stable"
}

interface MonthlyInsight {
  month: string
  year: number
  draws: DailyDraw[]
  totalDraws: number
  suitDistribution: Record<string, number>
  focusDistribution: Record<string, number>
  moodDistribution: Record<string, number>
  reversedPercentage: number
  topCards: Array<{ name: string; count: number }>
  topThemes: Array<{ theme: string; count: number }>
  streakDays: number
  insights: string[]
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

const moodLabels = {
  optimistic: "Optimistic",
  anxious: "Anxious",
  confused: "Confused",
  excited: "Excited",
  peaceful: "Peaceful",
  frustrated: "Frustrated",
  curious: "Curious",
}

const moodColors = {
  optimistic: "bg-green-100 text-green-800",
  anxious: "bg-red-100 text-red-800",
  confused: "bg-yellow-100 text-yellow-800",
  excited: "bg-orange-100 text-orange-800",
  peaceful: "bg-blue-100 text-blue-800",
  frustrated: "bg-purple-100 text-purple-800",
  curious: "bg-indigo-100 text-indigo-800",
}

export default function DailyCardInsightsPage() {
  const [draws, setDraws] = useState<DailyDraw[]>([])
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedWeek, setSelectedWeek] = useState("")
  const [activeTab, setActiveTab] = useState("weekly")

  useEffect(() => {
    const savedDraws = JSON.parse(localStorage.getItem("dailyCardDraws") || "[]")
    setDraws(savedDraws)

    // Set default selections
    if (savedDraws.length > 0) {
      const latestDate = new Date(savedDraws[0].date)
      setSelectedMonth(`${latestDate.getFullYear()}-${String(latestDate.getMonth() + 1).padStart(2, "0")}`)

      // Get current week
      const startOfWeek = new Date(latestDate)
      startOfWeek.setDate(latestDate.getDate() - latestDate.getDay())
      setSelectedWeek(startOfWeek.toISOString().split("T")[0])
    }
  }, [])

  // Generate weekly insights
  const weeklyInsights = useMemo(() => {
    const weeks: WeeklyInsight[] = []
    const weekMap = new Map<string, DailyDraw[]>()

    draws.forEach((draw) => {
      const date = new Date(draw.date)
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay())
      const weekKey = startOfWeek.toISOString().split("T")[0]

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, [])
      }
      weekMap.get(weekKey)!.push(draw)
    })

    weekMap.forEach((weekDraws, weekStart) => {
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)

      // Calculate dominant patterns
      const suitCounts = weekDraws.reduce(
        (acc, draw) => {
          if (draw.card.suit) {
            acc[draw.card.suit] = (acc[draw.card.suit] || 0) + 1
          }
          return acc
        },
        {} as Record<string, number>,
      )

      const focusCounts = weekDraws.reduce(
        (acc, draw) => {
          acc[draw.focusArea] = (acc[draw.focusArea] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const moodCounts = weekDraws.reduce(
        (acc, draw) => {
          acc[draw.currentMood] = (acc[draw.currentMood] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const dominantSuit = Object.entries(suitCounts).sort(([, a], [, b]) => b - a)[0]?.[0]
      const dominantFocus = Object.entries(focusCounts).sort(([, a], [, b]) => b - a)[0]?.[0]
      const dominantMood = Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0]?.[0]

      // Extract themes from keywords
      const allKeywords = weekDraws.flatMap((draw) => draw.card.keywords)
      const keywordCounts = allKeywords.reduce(
        (acc, keyword) => {
          acc[keyword] = (acc[keyword] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
      const themes = Object.entries(keywordCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([keyword]) => keyword)

      // Determine mood trend (simplified)
      const positiveMoods = ["optimistic", "excited", "peaceful", "curious"]
      const positiveCount = weekDraws.filter((draw) => positiveMoods.includes(draw.currentMood)).length
      const moodTrend: "improving" | "declining" | "stable" =
        positiveCount > weekDraws.length / 2
          ? "improving"
          : positiveCount < weekDraws.length / 3
            ? "declining"
            : "stable"

      weeks.push({
        weekStart,
        weekEnd: weekEnd.toISOString().split("T")[0],
        draws: weekDraws,
        dominantSuit,
        dominantFocus,
        dominantMood,
        reversedCount: weekDraws.filter((draw) => draw.isReversed).length,
        themes,
        moodTrend,
      })
    })

    return weeks.sort((a, b) => new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime())
  }, [draws])

  // Generate monthly insights
  const monthlyInsights = useMemo(() => {
    const months: MonthlyInsight[] = []
    const monthMap = new Map<string, DailyDraw[]>()

    draws.forEach((draw) => {
      const date = new Date(draw.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, [])
      }
      monthMap.get(monthKey)!.push(draw)
    })

    monthMap.forEach((monthDraws, monthKey) => {
      const [year, month] = monthKey.split("-")

      // Calculate distributions
      const suitDistribution = monthDraws.reduce(
        (acc, draw) => {
          if (draw.card.suit) {
            acc[draw.card.suit] = (acc[draw.card.suit] || 0) + 1
          }
          return acc
        },
        {} as Record<string, number>,
      )

      const focusDistribution = monthDraws.reduce(
        (acc, draw) => {
          acc[draw.focusArea] = (acc[draw.focusArea] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const moodDistribution = monthDraws.reduce(
        (acc, draw) => {
          acc[draw.currentMood] = (acc[draw.currentMood] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      // Top cards
      const cardCounts = monthDraws.reduce(
        (acc, draw) => {
          acc[draw.card.name] = (acc[draw.card.name] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
      const topCards = Object.entries(cardCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }))

      // Top themes
      const allKeywords = monthDraws.flatMap((draw) => draw.card.keywords)
      const keywordCounts = allKeywords.reduce(
        (acc, keyword) => {
          acc[keyword] = (acc[keyword] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
      const topThemes = Object.entries(keywordCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([theme, count]) => ({ theme, count }))

      // Calculate streak (consecutive days with draws)
      const sortedDates = monthDraws.map((draw) => new Date(draw.date)).sort((a, b) => a.getTime() - b.getTime())

      let streakDays = 0
      let currentStreak = 1
      for (let i = 1; i < sortedDates.length; i++) {
        const dayDiff = (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24)
        if (dayDiff === 1) {
          currentStreak++
        } else {
          streakDays = Math.max(streakDays, currentStreak)
          currentStreak = 1
        }
      }
      streakDays = Math.max(streakDays, currentStreak)

      // Generate insights
      const insights: string[] = []
      const dominantSuit = Object.entries(suitDistribution).sort(([, a], [, b]) => b - a)[0]
      const dominantFocus = Object.entries(focusDistribution).sort(([, a], [, b]) => b - a)[0]
      const reversedPercentage = (monthDraws.filter((draw) => draw.isReversed).length / monthDraws.length) * 100

      if (dominantSuit) {
        insights.push(`Your focus this month was heavily on ${dominantSuit[0]} energy (${dominantSuit[1]} draws)`)
      }
      if (dominantFocus) {
        insights.push(
          `${focusAreaLabels[dominantFocus[0] as keyof typeof focusAreaLabels]} was your primary area of concern`,
        )
      }
      if (reversedPercentage > 40) {
        insights.push("You encountered many challenges this month with frequent reversed cards")
      } else if (reversedPercentage < 20) {
        insights.push("This was a month of positive energy with mostly upright cards")
      }
      if (streakDays >= 7) {
        insights.push(`You maintained a ${streakDays}-day streak of daily practice!`)
      }

      months.push({
        month: monthKey,
        year: Number.parseInt(year),
        draws: monthDraws,
        totalDraws: monthDraws.length,
        suitDistribution,
        focusDistribution,
        moodDistribution,
        reversedPercentage,
        topCards,
        topThemes,
        streakDays,
        insights,
      })
    })

    return months.sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime())
  }, [draws])

  // Get available months and weeks for selectors
  const availableMonths = monthlyInsights.map((insight) => insight.month)
  const availableWeeks = weeklyInsights.map((insight) => insight.weekStart)

  const selectedWeekData = weeklyInsights.find((week) => week.weekStart === selectedWeek)
  const selectedMonthData = monthlyInsights.find((month) => month.month === selectedMonth)

  // Export handlers
  const handleExportCSV = (type: "daily" | "weekly" | "monthly") => {
    switch (type) {
      case "daily":
        exportDailyDrawsToCSV(draws)
        break
      case "weekly":
        exportWeeklyInsightsToCSV(weeklyInsights)
        break
      case "monthly":
        exportMonthlyInsightsToCSV(monthlyInsights)
        break
    }
  }

  const handleExportPDF = (type: "full" | "current") => {
    if (type === "full") {
      exportInsightsToPDF(draws, weeklyInsights, monthlyInsights)
    } else {
      // Export current selected period
      const selectedPeriod =
        activeTab === "weekly"
          ? { type: "week" as const, value: selectedWeek }
          : { type: "month" as const, value: selectedMonth }

      exportInsightsToPDF(draws, weeklyInsights, monthlyInsights, selectedPeriod)
    }
  }

  if (draws.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <Link href="/daily-card">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Daily Card
              </Button>
            </Link>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Yet</h3>
              <p className="text-gray-600 mb-4">Start drawing daily cards to see your patterns and insights</p>
              <Link href="/daily-card">
                <Button>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Draw Your First Card
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily Card Insights</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover patterns and themes in your spiritual journey
              </p>
            </div>

            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => handleExportPDF("full")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Full Report (PDF)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportPDF("current")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Current Period (PDF)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExportCSV("daily")}>
                  <Table className="h-4 w-4 mr-2" />
                  Daily Draws (CSV)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportCSV("weekly")}>
                  <Table className="h-4 w-4 mr-2" />
                  Weekly Insights (CSV)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportCSV("monthly")}>
                  <Table className="h-4 w-4 mr-2" />
                  Monthly Insights (CSV)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{draws.length}</p>
              <p className="text-sm text-gray-600">Total Draws</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(...monthlyInsights.map((m) => m.streakDays), 0)}
              </p>
              <p className="text-sm text-gray-600">Longest Streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((draws.filter((d) => !d.isReversed).length / draws.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Upright Cards</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyInsights.length}</p>
              <p className="text-sm text-gray-600">Months Tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Weekly/Monthly Views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly Insights</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Insights</TabsTrigger>
          </TabsList>

          {/* Weekly View */}
          <TabsContent value="weekly" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Weekly Patterns</h2>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  {availableWeeks.map((week) => {
                    const weekStart = new Date(week)
                    const weekEnd = new Date(week)
                    weekEnd.setDate(weekEnd.getDate() + 6)
                    return (
                      <SelectItem key={week} value={week}>
                        {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedWeekData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Week Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Week Overview
                    </CardTitle>
                    <CardDescription>
                      {new Date(selectedWeekData.weekStart).toLocaleDateString()} -{" "}
                      {new Date(selectedWeekData.weekEnd).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cards Drawn:</span>
                      <Badge variant="outline">{selectedWeekData.draws.length} days</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dominant Focus:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {focusAreaLabels[selectedWeekData.dominantFocus as keyof typeof focusAreaLabels]}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mood Trend:</span>
                      <div className="flex items-center">
                        {selectedWeekData.moodTrend === "improving" ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : selectedWeekData.moodTrend === "declining" ? (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        ) : (
                          <Activity className="h-4 w-4 text-gray-600 mr-1" />
                        )}
                        <span className="text-sm capitalize">{selectedWeekData.moodTrend}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Reversed Cards:</span>
                      <Badge
                        variant={
                          selectedWeekData.reversedCount > selectedWeekData.draws.length / 2
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {selectedWeekData.reversedCount} / {selectedWeekData.draws.length}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Themes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Key Themes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Dominant Themes:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedWeekData.themes.map((theme, index) => (
                            <Badge key={index} variant="secondary">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedWeekData.dominantSuit && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Dominant Suit:</p>
                          <div className="flex items-center">
                            {React.createElement(suitIcons[selectedWeekData.dominantSuit as keyof typeof suitIcons], {
                              className: "h-4 w-4 mr-2",
                            })}
                            <span className="capitalize">{selectedWeekData.dominantSuit}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Dominant Mood:</p>
                        <Badge className={moodColors[selectedWeekData.dominantMood as keyof typeof moodColors]}>
                          {moodLabels[selectedWeekData.dominantMood as keyof typeof moodLabels]}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Cards This Week */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Daily Cards This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {Array.from({ length: 7 }, (_, i) => {
                        const date = new Date(selectedWeekData.weekStart)
                        date.setDate(date.getDate() + i)
                        const dateStr = date.toISOString().split("T")[0]
                        const draw = selectedWeekData.draws.find((d) => d.date === dateStr)

                        return (
                          <div key={i} className="text-center">
                            <p className="text-xs text-gray-500 mb-2">
                              {date.toLocaleDateString("en-US", { weekday: "short" })}
                            </p>
                            {draw ? (
                              <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="w-8 h-12 bg-purple-600 rounded mx-auto mb-2 flex items-center justify-center">
                                  {React.createElement(
                                    draw.card.suit ? suitIcons[draw.card.suit as keyof typeof suitIcons] : Sparkles,
                                    { className: "h-4 w-4 text-white" },
                                  )}
                                </div>
                                <p className="text-xs font-medium">{draw.card.name}</p>
                                {draw.isReversed && <p className="text-xs text-red-600">Reversed</p>}
                              </div>
                            ) : (
                              <div className="p-3 bg-gray-100 rounded-lg">
                                <div className="w-8 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
                                <p className="text-xs text-gray-500">No draw</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Monthly View */}
          <TabsContent value="monthly" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Monthly Analysis</h2>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths.map((month) => {
                    const date = new Date(month + "-01")
                    return (
                      <SelectItem key={month} value={month}>
                        {date.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedMonthData && (
              <div className="space-y-6">
                {/* Monthly Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Draws:</span>
                        <Badge variant="outline">{selectedMonthData.totalDraws}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Longest Streak:</span>
                        <Badge className="bg-green-100 text-green-800">{selectedMonthData.streakDays} days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reversed Cards:</span>
                        <Badge variant={selectedMonthData.reversedPercentage > 40 ? "destructive" : "secondary"}>
                          {Math.round(selectedMonthData.reversedPercentage)}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Focus Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(selectedMonthData.focusDistribution)
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([focus, count]) => {
                            const percentage = Math.round((count / selectedMonthData.totalDraws) * 100)
                            const IconComponent = focusAreaIcons[focus as keyof typeof focusAreaIcons]
                            return (
                              <div key={focus} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <IconComponent className="h-4 w-4 mr-2" />
                                    {focusAreaLabels[focus as keyof typeof focusAreaLabels]}
                                  </div>
                                  <span>{percentage}%</span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                              </div>
                            )
                          })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Suit Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(selectedMonthData.suitDistribution)
                          .sort(([, a], [, b]) => b - a)
                          .map(([suit, count]) => {
                            const percentage = Math.round((count / selectedMonthData.totalDraws) * 100)
                            const IconComponent = suitIcons[suit as keyof typeof suitIcons]
                            return (
                              <div key={suit} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <IconComponent className="h-4 w-4 mr-2" />
                                    <span className="capitalize">{suit}</span>
                                  </div>
                                  <span>{percentage}%</span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                              </div>
                            )
                          })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Cards and Themes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Most Frequent Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedMonthData.topCards.map((card, index) => (
                          <div key={card.name} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-3">
                                #{index + 1}
                              </Badge>
                              <span className="text-sm font-medium">{card.name}</span>
                            </div>
                            <Badge variant="secondary">{card.count}x</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Dominant Themes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedMonthData.topThemes.map((theme, index) => (
                          <div key={theme.theme} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-3">
                                #{index + 1}
                              </Badge>
                              <span className="text-sm font-medium capitalize">{theme.theme}</span>
                            </div>
                            <Badge variant="secondary">{theme.count}x</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Monthly Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedMonthData.insights.map((insight, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
