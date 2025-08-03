export interface TarotCard {
  id: string
  name: string
  suit: string
  number?: number
  arcana: "major" | "minor"
  upright: string[]
  reversed: string[]
  description: string
  image: string
  keywords: string[]
  element?: string
  astrology?: string
}

export const suits = {
  cups: {
    name: "Cups",
    element: "Water",
    keywords: ["emotions", "relationships", "intuition", "spirituality"],
  },
  wands: {
    name: "Wands",
    element: "Fire",
    keywords: ["passion", "creativity", "energy", "ambition"],
  },
  swords: {
    name: "Swords",
    element: "Air",
    keywords: ["thoughts", "communication", "conflict", "intellect"],
  },
  pentacles: {
    name: "Pentacles",
    element: "Earth",
    keywords: ["material", "practical", "resources", "stability"],
  },
}

export const majorArcana: TarotCard[] = [
  {
    id: "fool",
    name: "The Fool",
    suit: "major",
    number: 0,
    arcana: "major",
    upright: ["New beginnings", "Innocence", "Spontaneity", "Free spirit"],
    reversed: ["Recklessness", "Risk-taking", "Foolishness", "Lack of direction"],
    description:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
    image: "/placeholder.svg?height=400&width=300&text=The+Fool",
    keywords: ["beginnings", "innocence", "spontaneity", "free spirit"],
    element: "Air",
    astrology: "Uranus",
  },
  {
    id: "magician",
    name: "The Magician",
    suit: "major",
    number: 1,
    arcana: "major",
    upright: ["Manifestation", "Resourcefulness", "Power", "Inspired action"],
    reversed: ["Manipulation", "Poor planning", "Untapped talents", "Lack of energy"],
    description:
      "The Magician is about making higher and better use of one's spiritual and material resources. The Magician is the bridge between the world of the spirit and the world of humanity.",
    image: "/placeholder.svg?height=400&width=300&text=The+Magician",
    keywords: ["manifestation", "resourcefulness", "power", "inspired action"],
    element: "Air",
    astrology: "Mercury",
  },
  {
    id: "high-priestess",
    name: "The High Priestess",
    suit: "major",
    number: 2,
    arcana: "major",
    upright: ["Intuition", "Sacred knowledge", "Divine feminine", "Subconscious mind"],
    reversed: ["Secrets", "Disconnected from intuition", "Withdrawal", "Silence"],
    description:
      "The High Priestess is a card of mystery, stillness and passivity. This card suggests that it is time to retreat and reflect upon the situation and trust your inner instincts to guide you through it.",
    image: "/placeholder.svg?height=400&width=300&text=High+Priestess",
    keywords: ["intuition", "sacred knowledge", "divine feminine", "subconscious"],
    element: "Water",
    astrology: "Moon",
  },
]

export const minorArcana: TarotCard[] = [
  {
    id: "ace-cups",
    name: "Ace of Cups",
    suit: "cups",
    number: 1,
    arcana: "minor",
    upright: ["Love", "New relationships", "Compassion", "Creativity"],
    reversed: ["Self-love", "Intuition", "Repressed emotions", "Emptiness"],
    description:
      "The Ace of Cups represents new beginnings in love, relationships, and emotions. It signifies the start of a new emotional journey.",
    image: "/placeholder.svg?height=400&width=300&text=Ace+of+Cups",
    keywords: ["love", "new relationships", "compassion", "creativity"],
    element: "Water",
  },
  {
    id: "ace-wands",
    name: "Ace of Wands",
    suit: "wands",
    number: 1,
    arcana: "minor",
    upright: ["Inspiration", "New opportunities", "Growth", "Potential"],
    reversed: ["Lack of energy", "Lack of passion", "Boredom", "Missed opportunities"],
    description:
      "The Ace of Wands represents inspiration, new opportunities, and growth. It's a sign that you are ready to start something new.",
    image: "/placeholder.svg?height=400&width=300&text=Ace+of+Wands",
    keywords: ["inspiration", "new opportunities", "growth", "potential"],
    element: "Fire",
  },
]

export const allCards: TarotCard[] = [...majorArcana, ...minorArcana]

export function getRandomCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * allCards.length)
  return allCards[randomIndex]
}

export function getCardById(id: string): TarotCard | undefined {
  return allCards.find((card) => card.id === id)
}

export function getCardsBysuit(suit: string): TarotCard[] {
  return allCards.filter((card) => card.suit === suit)
}

export function getMajorArcana(): TarotCard[] {
  return majorArcana
}

export function getMinorArcana(): TarotCard[] {
  return minorArcana
}
