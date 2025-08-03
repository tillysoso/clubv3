"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Edit, Trash2, Share2, BookOpen, Star, Heart, Search, Sword, Download } from "lucide-react"

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

export default function JournalEntryPage() {
  const params = useParams()
  const router = useRouter()
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const entryId = params.id as string
    const savedEntries = localStorage.getItem("tarotJournalEntries")

    if (savedEntries) {
      const entries: JournalEntry[] = JSON.parse(savedEntries)
      const foundEntry = entries.find((e) => e.id === entryId)
      setEntry(foundEntry || null)
    }

    setIsLoading(false)
  }, [params.id])

  const handleDelete = () => {
    if (!entry) return

    if (confirm("Are you sure you want to delete this journal entry? This action cannot be undone.")) {
      const savedEntries = localStorage.getItem("tarotJournalEntries")
      if (savedEntries) {
        const entries: JournalEntry[] = JSON.parse(savedEntries)
        const updatedEntries = entries.filter((e) => e.id !== entry.id)
        localStorage.setItem("tarotJournalEntries", JSON.stringify(updatedEntries))
        router.push("/journal")
      }
    }
  }

  const handleShare = async () => {
    if (!entry) return

    const shareText = `${entry.title}\n\n${entry.content}\n\nTags: ${entry.tags.join(", ")}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: entry.title,
          text: shareText,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert("Entry copied to clipboard!")
    }
  }

  const handleExport = () => {
    if (!entry) return

    const exportData = {
      title: entry.title,
      content: entry.content,
      readingType: entry.readingType,
      mood: entry.mood,
      date: entry.date,
      tags: entry.tags,
      cards: entry.cards,
      insights: entry.insights,
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `journal-entry-${entry.title.replace(/\s+/g, "-").toLowerCase()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-majestic-primary flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-majestic-text/40 mx-auto mb-4 animate-pulse" />
          <p className="text-p text-majestic-text/70">Loading your journal entry...</p>
        </div>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-majestic-primary flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-majestic-text/40 mx-auto mb-6" />
          <h2 className="text-h3 mb-4">Entry Not Found</h2>
          <p className="text-p text-majestic-text/70 mb-8">
            The journal entry you're looking for doesn't exist or may have been deleted.
          </p>
          <Link href="/journal">
            <Button className="btn-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-p">Back to Journal</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const MoodIcon = moodIcons[entry.mood as keyof typeof moodIcons] || Star
  const typeColor = readingTypeColors[entry.readingType as keyof typeof readingTypeColors] || "text-majestic-text"

  return (
    <div className="min-h-screen bg-majestic-primary py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <Link href="/journal">
            <Button variant="ghost" className="btn-ghost mb-4 md:mb-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-p">Back to Journal</span>
            </Button>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleShare} className="btn-ghost">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="text-p">Share</span>
            </Button>
            <Button size="sm" onClick={handleExport} className="btn-ghost">
              <Download className="h-4 w-4 mr-2" />
              <span className="text-p">Export</span>
            </Button>
            <Link href={`/journal/${entry.id}/edit`}>
              <Button size="sm" className="btn-primary">
                <Edit className="h-4 w-4 mr-2" />
                <span className="text-p">Edit</span>
              </Button>
            </Link>
            <Button size="sm" onClick={handleDelete} className="btn-secondary">
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="text-p">Delete</span>
            </Button>
          </div>
        </div>

        {/* Entry Content */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`border-majestic-text/30 ${typeColor}`}>
                  <span className="text-p capitalize">{entry.readingType} Reading</span>
                </Badge>
                <div className="flex items-center">
                  <MoodIcon className="h-4 w-4 text-majestic-text/60 mr-2" />
                  <span className="text-p text-majestic-text/60 capitalize">{entry.mood}</span>
                </div>
              </div>
              <div className="flex items-center text-majestic-text/60">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-p">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <CardTitle className="text-h2">{entry.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Main Content */}
            <div>
              <h3 className="text-h5 mb-4">Reading Description</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-p text-majestic-text/80 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </div>
            </div>

            <Separator className="bg-majestic-text/20" />

            {/* Cards Section */}
            {entry.cards.length > 0 && (
              <div>
                <h3 className="text-h5 mb-4">Cards Drawn</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.cards.map((card, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-majestic-accent-purple/30 text-majestic-accent-purple"
                    >
                      <span className="text-p">{card}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Section */}
            {entry.insights && (
              <>
                <Separator className="bg-majestic-text/20" />
                <div>
                  <h3 className="text-h5 mb-4">Key Insights & Reflections</h3>
                  <div className="bg-majestic-primary/30 rounded-lg p-6 border border-majestic-text/10">
                    <p className="text-p text-majestic-text/80 leading-relaxed whitespace-pre-wrap">{entry.insights}</p>
                  </div>
                </div>
              </>
            )}

            {/* Tags Section */}
            {entry.tags.length > 0 && (
              <>
                <Separator className="bg-majestic-text/20" />
                <div>
                  <h3 className="text-h5 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-majestic-text/10 text-majestic-text/80">
                        <span className="text-p">#{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Related Entries */}
        <div className="mt-12">
          <h3 className="text-h4 mb-6">Continue Your Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/journal/new">
              <Card className="glass-card hover:bg-majestic-primary/60 transition-all duration-300 cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-full flex items-center justify-center mr-4">
                      <Edit className="h-6 w-6 text-majestic-accent-purple" />
                    </div>
                    <div>
                      <h4 className="text-h6 group-hover:text-majestic-hover transition-colors">Create New Entry</h4>
                      <p className="text-p text-majestic-text/70">Record another reading or insight</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/journal">
              <Card className="glass-card hover:bg-majestic-primary/60 transition-all duration-300 cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-majestic-hover/20 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-majestic-hover" />
                    </div>
                    <div>
                      <h4 className="text-h6 group-hover:text-majestic-hover transition-colors">View All Entries</h4>
                      <p className="text-p text-majestic-text/70">Browse your complete journal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
