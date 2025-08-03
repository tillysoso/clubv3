"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { FormLoading, ValidationStar, SubmitButtonWithLoading } from "@/components/ui/form-loading"

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

export default function NewJournalEntryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    readingType: "",
    mood: "",
    insights: "",
  })
  const [cards, setCards] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newCard, setNewCard] = useState("")
  const [newTag, setNewTag] = useState("")
  const [showCardsSection, setShowCardsSection] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [validation, setValidation] = useState({
    title: undefined as boolean | undefined,
    content: undefined as boolean | undefined,
    readingType: undefined as boolean | undefined,
    mood: undefined as boolean | undefined,
  })

  const validateTitle = (title: string) => {
    return title.trim().length >= 3
  }

  const validateContent = (content: string) => {
    return content.trim().length >= 10
  }

  const validateReadingType = (readingType: string) => {
    return readingType.length > 0
  }

  const validateMood = (mood: string) => {
    return mood.length > 0
  }

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    // Real-time validation
    if (field === "title") {
      setValidation((prev) => ({ ...prev, title: validateTitle(value) }))
    } else if (field === "content") {
      setValidation((prev) => ({ ...prev, content: validateContent(value) }))
    } else if (field === "readingType") {
      setValidation((prev) => ({ ...prev, readingType: validateReadingType(value) }))
    } else if (field === "mood") {
      setValidation((prev) => ({ ...prev, mood: validateMood(value) }))
    }
  }

  const addCard = () => {
    if (newCard.trim() && !cards.includes(newCard.trim())) {
      setCards([...cards, newCard.trim()])
      setNewCard("")
    }
  }

  const removeCard = (cardToRemove: string) => {
    setCards(cards.filter((card) => card !== cardToRemove))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setIsError(false)
    setIsSuccess(false)
    setErrorMessage("")

    // Validate all fields
    const titleValid = validateTitle(formData.title)
    const contentValid = validateContent(formData.content)
    const readingTypeValid = validateReadingType(formData.readingType)
    const moodValid = validateMood(formData.mood)

    setValidation({
      title: titleValid,
      content: contentValid,
      readingType: readingTypeValid,
      mood: moodValid,
    })

    if (!titleValid || !contentValid || !readingTypeValid || !moodValid) {
      setIsError(true)
      setErrorMessage("Please complete all required fields")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        readingType: formData.readingType,
        mood: formData.mood,
        date: new Date().toISOString().split("T")[0],
        tags,
        cards,
        insights: formData.insights,
      }

      // Save to localStorage
      const existingEntries = JSON.parse(localStorage.getItem("tarotJournalEntries") || "[]")
      const updatedEntries = [newEntry, ...existingEntries]
      localStorage.setItem("tarotJournalEntries", JSON.stringify(updatedEntries))

      setIsSuccess(true)

      setTimeout(() => {
        router.push("/journal")
      }, 2000)
    } catch (error) {
      setIsError(true)
      setErrorMessage("Failed to save your journal entry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/journal">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Journal
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Journal Entry</h1>
          <p className="text-gray-600">Record your tarot reading and spiritual insights</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Entry Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Morning Love Reading, Career Guidance Session"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className={`${
                    validation.title === false
                      ? "border-red-500 focus:border-red-500"
                      : validation.title === true
                        ? "border-green-500 focus:border-green-500"
                        : ""
                  }`}
                />
                <ValidationStar
                  isValid={validation.title === true}
                  isInvalid={validation.title === false}
                  message={
                    validation.title === false
                      ? "Title must be at least 3 characters"
                      : validation.title === true
                        ? "Great title!"
                        : undefined
                  }
                />
              </div>

              {/* Reading Type and Mood */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Reading Type *</Label>
                  <Select
                    value={formData.readingType}
                    onValueChange={(value) => handleInputChange("readingType", value)}
                  >
                    <SelectTrigger
                      className={`${
                        validation.readingType === false
                          ? "border-red-500 focus:border-red-500"
                          : validation.readingType === true
                            ? "border-green-500 focus:border-green-500"
                            : ""
                      }`}
                    >
                      <SelectValue placeholder="Select reading type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="love">Love & Relationships</SelectItem>
                      <SelectItem value="career">Career & Finance</SelectItem>
                      <SelectItem value="general">General Life</SelectItem>
                      <SelectItem value="daily">Daily Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                  <ValidationStar
                    isValid={validation.readingType === true}
                    isInvalid={validation.readingType === false}
                    message={validation.readingType === false ? "Please select a reading type" : undefined}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Current Mood *</Label>
                  <Select value={formData.mood} onValueChange={(value) => handleInputChange("mood", value)}>
                    <SelectTrigger
                      className={`${
                        validation.mood === false
                          ? "border-red-500 focus:border-red-500"
                          : validation.mood === true
                            ? "border-green-500 focus:border-green-500"
                            : ""
                      }`}
                    >
                      <SelectValue placeholder="How are you feeling?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="hopeful">Hopeful</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="confused">Confused</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                  <ValidationStar
                    isValid={validation.mood === true}
                    isInvalid={validation.mood === false}
                    message={validation.mood === false ? "Please select your current mood" : undefined}
                  />
                </div>
              </div>

              {/* Optional Cards Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-600">Cards Drawn (Optional)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCardsSection(!showCardsSection)}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    {showCardsSection ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide Cards
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Add Cards
                      </>
                    )}
                  </Button>
                </div>

                {showCardsSection && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500">
                      Add the specific tarot cards you drew for this reading (optional)
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter card name (e.g., The Fool, Ace of Cups)"
                        value={newCard}
                        onChange={(e) => setNewCard(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCard())}
                      />
                      <Button type="button" onClick={addCard} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {cards.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cards.map((card, index) => (
                          <Badge key={index} variant="outline" className="text-purple-700 border-purple-200">
                            {card}
                            <button type="button" onClick={() => removeCard(card)} className="ml-2 hover:text-red-500">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Reading Description *</Label>
                <Textarea
                  id="content"
                  placeholder="Describe your reading experience, the question you asked, and your initial thoughts..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={4}
                  required
                  className={`${
                    validation.content === false
                      ? "border-red-500 focus:border-red-500"
                      : validation.content === true
                        ? "border-green-500 focus:border-green-500"
                        : ""
                  }`}
                />
                <ValidationStar
                  isValid={validation.content === true}
                  isInvalid={validation.content === false}
                  message={
                    validation.content === false
                      ? "Description must be at least 10 characters"
                      : validation.content === true
                        ? "Great description!"
                        : undefined
                  }
                />
              </div>

              {/* Insights */}
              <div className="space-y-2">
                <Label htmlFor="insights">Key Insights & Reflections</Label>
                <Textarea
                  id="insights"
                  placeholder="What did you learn? How do the cards relate to your situation? Any patterns or messages?"
                  value={formData.insights}
                  onChange={(e) => handleInputChange("insights", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tags (e.g., relationship, decision, growth)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <SubmitButtonWithLoading type="submit" isLoading={isLoading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </SubmitButtonWithLoading>
                <Link href="/journal">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>

              <FormLoading
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                loadingMessage="Saving your spiritual insights..."
                successMessage="Journal entry saved! Redirecting to your journal..."
                errorMessage={errorMessage}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
