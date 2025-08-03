"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Plus, Search, Calendar, Star, Heart, Sword, TrendingUp, Download } from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  content: string
  readingType: string
  mood: string
  date: string
  tags: string[]
  cards: string[]
  insights: string
}

const moodIcons = {
  positive: Star,
  hopeful: Heart,
  neutral: Calendar,
  confused: Search,
  negative: Sword,
}

const readingTypeColors = {
  love: "text-majestic-accent-red",
  career: "text-majestic-hover",
  general: "text-majestic-accent-purple",
  daily: "text-majestic-text",
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterMood, setFilterMood] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem("tarotJournalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === "all" || entry.readingType === filterType
    const matchesMood = filterMood === "all" || entry.mood === filterMood

    return matchesSearch && matchesType && matchesMood
  })

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "type":
        return a.readingType.localeCompare(b.readingType)
      default:
        return 0
    }
  })

  const getEntryStats = () => {
    const totalEntries = entries.length
    const thisMonth = entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      const now = new Date()
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear()
    }).length

    const mostCommonType = entries.reduce(
      (acc, entry) => {
        acc[entry.readingType] = (acc[entry.readingType] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topType = Object.entries(mostCommonType).sort(([, a], [, b]) => b - a)[0]

    return { totalEntries, thisMonth, topType: topType?.[0] || "none" }
  }

  const stats = getEntryStats()

  return (
    <div className="min-h-screen bg-majestic-primary py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="w-16 h-16 bg-gradient-to-br from-majestic-accent-purple to-majestic-accent-red rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-majestic-text" />
            </div>
            <h1 className="text-h1 mb-4">Spiritual Journal</h1>
            <p className="text-p text-majestic-text/80 max-w-2xl leading-relaxed">
              Track your tarot journey, record insights, and reflect on your spiritual growth through your personal
              journal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
            <Link href="/journal/new">
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                <span className="text-p">New Entry</span>
              </Button>
            </Link>
            <Button variant="outline" className="btn-ghost border-majestic-text/30 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              <span className="text-p">Export</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-p text-majestic-text/70">Total Entries</p>
                  <p className="text-h3">{stats.totalEntries}</p>
                </div>
                <BookOpen className="h-8 w-8 text-majestic-accent-purple" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-p text-majestic-text/70">This Month</p>
                  <p className="text-h3">{stats.thisMonth}</p>
                </div>
                <Calendar className="h-8 w-8 text-majestic-hover" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-p text-majestic-text/70">Top Category</p>
                  <p className="text-h6 capitalize">{stats.topType}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-majestic-accent-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-majestic-text/60" />
            <Input
              placeholder="Search entries, tags, or insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sleek-input pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 sleek-input">
                <SelectValue placeholder="Reading Type" />
              </SelectTrigger>
              <SelectContent className="bg-majestic-primary border-majestic-text/20">
                <SelectItem value="all" className="text-majestic-text">
                  All Types
                </SelectItem>
                <SelectItem value="love" className="text-majestic-text">
                  Love
                </SelectItem>
                <SelectItem value="career" className="text-majestic-text">
                  Career
                </SelectItem>
                <SelectItem value="general" className="text-majestic-text">
                  General
                </SelectItem>
                <SelectItem value="daily" className="text-majestic-text">
                  Daily
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMood} onValueChange={setFilterMood}>
              <SelectTrigger className="w-32 sleek-input">
                <SelectValue placeholder="Mood" />
              </SelectTrigger>
              <SelectContent className="bg-majestic-primary border-majestic-text/20">
                <SelectItem value="all" className="text-majestic-text">
                  All Moods
                </SelectItem>
                <SelectItem value="positive" className="text-majestic-text">
                  Positive
                </SelectItem>
                <SelectItem value="hopeful" className="text-majestic-text">
                  Hopeful
                </SelectItem>
                <SelectItem value="neutral" className="text-majestic-text">
                  Neutral
                </SelectItem>
                <SelectItem value="confused" className="text-majestic-text">
                  Confused
                </SelectItem>
                <SelectItem value="negative" className="text-majestic-text">
                  Negative
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 sleek-input">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-majestic-primary border-majestic-text/20">
                <SelectItem value="date" className="text-majestic-text">
                  Date
                </SelectItem>
                <SelectItem value="title" className="text-majestic-text">
                  Title
                </SelectItem>
                <SelectItem value="type" className="text-majestic-text">
                  Type
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Journal Entries */}
        {sortedEntries.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedEntries.map((entry) => {
              const MoodIcon = moodIcons[entry.mood as keyof typeof moodIcons] || Star
              const typeColor =
                readingTypeColors[entry.readingType as keyof typeof readingTypeColors] || "text-majestic-text"

              return (
                <Card
                  key={entry.id}
                  className="glass-card hover:bg-majestic-primary/60 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`border-majestic-text/30 ${typeColor}`}>
                          <span className="text-p capitalize">{entry.readingType}</span>
                        </Badge>
                        <div className="flex items-center">
                          <MoodIcon className="h-3 w-3 text-majestic-text/60 mr-1" />
                          <span className="text-p text-majestic-text/60 capitalize">{entry.mood}</span>
                        </div>
                      </div>
                      <span className="text-p text-majestic-text/60">{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-h5 group-hover:text-majestic-hover transition-colors">
                      {entry.title}
                    </CardTitle>
                    <CardDescription className="text-p text-majestic-text/70 leading-relaxed">
                      {entry.content.substring(0, 150)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {entry.cards.length > 0 && (
                      <div className="mb-4">
                        <p className="text-p text-majestic-text/60 mb-2">Cards:</p>
                        <div className="flex flex-wrap gap-1">
                          {entry.cards.slice(0, 3).map((card, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-majestic-text/10 text-majestic-text/80"
                            >
                              <span className="text-p">{card}</span>
                            </Badge>
                          ))}
                          {entry.cards.length > 3 && (
                            <Badge variant="secondary" className="bg-majestic-text/10 text-majestic-text/80">
                              <span className="text-p">+{entry.cards.length - 3} more</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.slice(0, 4).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-majestic-text/20 text-majestic-text/70"
                            >
                              <span className="text-p">#{tag}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link href={`/journal/${entry.id}`}>
                      <Button size="sm" className="btn-ghost group-hover:text-majestic-hover">
                        <span className="text-p">Read Full Entry</span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            {entries.length === 0 ? (
              <>
                <BookOpen className="h-16 w-16 text-majestic-text/40 mx-auto mb-6" />
                <h3 className="text-h4 mb-4">Start Your Spiritual Journal</h3>
                <p className="text-p text-majestic-text/70 mb-8 max-w-md mx-auto leading-relaxed">
                  Begin documenting your tarot journey. Record your readings, insights, and spiritual growth in your
                  personal journal.
                </p>
                <Link href="/journal/new">
                  <Button className="btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="text-p">Create First Entry</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Search className="h-16 w-16 text-majestic-text/40 mx-auto mb-6" />
                <h3 className="text-h4 mb-4">No Entries Found</h3>
                <p className="text-p text-majestic-text/70 mb-8">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterType("all")
                    setFilterMood("all")
                  }}
                  className="btn-primary"
                >
                  <span className="text-p">Clear Filters</span>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
