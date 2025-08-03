import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Heart,
  Zap,
  Sword,
  Coins,
  Sparkles,
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react"
import { getCardBySlug, suits } from "@/lib/tarot-cards"

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

const yesNoIcons = {
  yes: CheckCircle,
  no: XCircle,
  maybe: HelpCircle,
}

const yesNoColors = {
  yes: "text-green-600",
  no: "text-red-600",
  maybe: "text-yellow-600",
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CardDetailPage({ params }: PageProps) {
  const { slug } = await params
  const card = getCardBySlug(slug)

  if (!card) {
    notFound()
  }

  const SuitIcon = card.suit ? suitIcons[card.suit] : Sparkles
  const suitColorClass = card.suit ? suitColors[card.suit] : "bg-purple-100 text-purple-800 border-purple-200"
  const YesNoIcon = yesNoIcons[card.yesNo]
  const yesNoColorClass = yesNoColors[card.yesNo]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cards">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cards
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Visual */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="w-full h-80 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-white text-center">
                    <SuitIcon className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">{card.number}</p>
                    <p className="text-lg font-medium">{card.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={card.arcana === "major" ? "bg-gold-100 text-gold-800" : "bg-gray-100 text-gray-800"}
                    >
                      {card.arcana === "major" ? "Major Arcana" : "Minor Arcana"}
                    </Badge>
                    {card.suit && (
                      <Badge variant="outline" className={suitColorClass}>
                        <SuitIcon className="h-3 w-3 mr-1" />
                        {suits[card.suit].name}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Yes/No Reading:</span>
                    <div className="flex items-center">
                      <YesNoIcon className={`h-4 w-4 mr-1 ${yesNoColorClass}`} />
                      <span className={`text-sm font-medium capitalize ${yesNoColorClass}`}>{card.yesNo}</span>
                    </div>
                  </div>

                  {card.element && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Element:</span>
                      <Badge variant="secondary">{card.element}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{card.name}</CardTitle>
                <CardDescription className="text-lg">{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meanings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Upright Meaning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{card.uprightMeaning}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reversed Meaning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{card.reversedMeaning}</p>
                </CardContent>
              </Card>
            </div>

            {/* Symbolism */}
            <Card>
              <CardHeader>
                <CardTitle>Symbolism</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {card.symbolism.map((symbol, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{symbol}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {card.numerology && (
                <Card>
                  <CardHeader>
                    <CardTitle>Numerology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{card.numerology}</p>
                  </CardContent>
                </Card>
              )}

              {card.astrology && (
                <Card>
                  <CardHeader>
                    <CardTitle>Astrology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{card.astrology}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Suit Information */}
            {card.suit && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SuitIcon className="h-5 w-5 mr-2" />
                    About the Suit of {suits[card.suit].name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{suits[card.suit].description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-2">Element:</span>
                      <Badge variant="outline">{suits[card.suit].element}</Badge>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Key Themes:</span>
                    <div className="flex flex-wrap gap-2">
                      {suits[card.suit].keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
