"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Sparkles, Heart, Zap, Sword, Coins } from "lucide-react"
import { tarotCards, suits } from "@/lib/tarot-cards"

const suitIcons = {
  cups: Heart,
  wands: Zap,
  swords: Sword,
  pentacles: Coins,
}

const suitColors = {
  cups: "bg-blue-100 text-blue-800 border-blue-200",
  wands: "bg-red-100 text-red-800 border-red-200",
  swords: "bg-gray-100 text-gray-800 border-gray-200",
  pentacles: "bg-green-100 text-green-800 border-green-200",
}

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArcana, setFilterArcana] = useState("all")
  const [filterSuit, setFilterSuit] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredAndSortedCards = useMemo(() => {
    const filtered = tarotCards.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesArcana = filterArcana === "all" || card.arcana === filterArcana
      const matchesSuit = filterSuit === "all" || card.suit === filterSuit

      return matchesSearch && matchesArcana && matchesSuit
    })

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "arcana":
          if (a.arcana !== b.arcana) {
            return a.arcana === "major" ? -1 : 1
          }
          return a.name.localeCompare(b.name)
        case "suit":
          if (a.suit && b.suit) {
            return a.suit.localeCompare(b.suit)
          }
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, filterArcana, filterSuit, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tarot Cards Almanac</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the complete collection of tarot cards with detailed meanings, symbolism, and interpretations
          </p>
        </div>

        {/* Suits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {Object.entries(suits).map(([key, suit]) => {
            const IconComponent = suitIcons[key as keyof typeof suitIcons]
            return (
              <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{suit.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {suit.element}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-sm">{suit.description}</CardDescription>
                  <div className="flex flex-wrap gap-1 mt-3 justify-center">
                    {suit.keywords.slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cards by name, keywords, or meaning..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={filterArcana} onValueChange={setFilterArcana}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Arcana" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Arcana</SelectItem>
                  <SelectItem value="major">Major Arcana</SelectItem>
                  <SelectItem value="minor">Minor Arcana</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSuit} onValueChange={setFilterSuit}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Suit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suits</SelectItem>
                  <SelectItem value="cups">Cups</SelectItem>
                  <SelectItem value="wands">Wands</SelectItem>
                  <SelectItem value="swords">Swords</SelectItem>
                  <SelectItem value="pentacles">Pentacles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="arcana">Arcana</SelectItem>
                  <SelectItem value="suit">Suit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-6xl mx-auto mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedCards.length} of {tarotCards.length} cards
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredAndSortedCards.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cards found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterArcana("all")
                    setFilterSuit("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCards.map((card) => {
                const SuitIcon = card.suit ? suitIcons[card.suit] : Sparkles
                const suitColorClass = card.suit
                  ? suitColors[card.suit]
                  : "bg-purple-100 text-purple-800 border-purple-200"

                return (
                  <Card key={card.id} className="hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className={
                            card.arcana === "major" ? "bg-gold-100 text-gold-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {card.arcana === "major" ? "Major" : "Minor"}
                        </Badge>
                        {card.suit && (
                          <Badge variant="outline" className={suitColorClass}>
                            <SuitIcon className="h-3 w-3 mr-1" />
                            {suits[card.suit].name}
                          </Badge>
                        )}
                      </div>

                      <div className="w-full h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-3 group-hover:from-purple-700 group-hover:to-indigo-700 transition-colors">
                        <div className="text-white text-center">
                          <SuitIcon className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">{card.number}</p>
                        </div>
                      </div>

                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        <Link href={`/cards/${card.slug}`}>{card.name}</Link>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-3 line-clamp-2">{card.description}</CardDescription>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {card.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {card.keywords.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{card.keywords.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Link href={`/cards/${card.slug}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
