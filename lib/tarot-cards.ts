export interface TarotCard {
  id: string
  name: string
  slug: string
  number: string
  arcana: "major" | "minor"
  suit?: "cups" | "wands" | "swords" | "pentacles"
  element?: string
  keywords: string[]
  description: string
  uprightMeaning: string
  reversedMeaning: string
  symbolism: string[]
  numerology?: string
  astrology?: string
  yesNo: "yes" | "no" | "maybe"
}

export interface Suit {
  name: string
  element: string
  description: string
  keywords: string[]
}

export const suits: Record<string, Suit> = {
  cups: {
    name: "Cups",
    element: "Water",
    description: "Represents emotions, relationships, love, and spirituality. Connected to the heart and intuition.",
    keywords: ["emotions", "love", "relationships", "intuition", "spirituality", "healing"],
  },
  wands: {
    name: "Wands",
    element: "Fire",
    description: "Represents passion, creativity, career, and personal growth. Connected to action and inspiration.",
    keywords: ["passion", "creativity", "career", "growth", "inspiration", "energy"],
  },
  swords: {
    name: "Swords",
    element: "Air",
    description:
      "Represents thoughts, communication, conflict, and mental challenges. Connected to the mind and intellect.",
    keywords: ["thoughts", "communication", "conflict", "challenges", "intellect", "truth"],
  },
  pentacles: {
    name: "Pentacles",
    element: "Earth",
    description:
      "Represents material matters, money, career, and physical manifestation. Connected to the material world.",
    keywords: ["money", "career", "material", "manifestation", "stability", "resources"],
  },
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  {
    id: "0",
    name: "The Fool",
    slug: "the-fool",
    number: "0",
    arcana: "major",
    element: "Air",
    keywords: ["new beginnings", "innocence", "spontaneity", "free spirit"],
    description:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
    uprightMeaning: "New beginnings, optimism, trust in life",
    reversedMeaning: "Recklessness, taken advantage of, inconsideration",
    symbolism: ["White rose of purity", "Small bag of memories", "Loyal dog companion", "Mountain peaks of challenges"],
    numerology: "Zero represents infinite potential and the beginning of a spiritual journey",
    astrology: "Associated with Uranus and the element of Air",
    yesNo: "yes",
  },
  {
    id: "1",
    name: "The Magician",
    slug: "the-magician",
    number: "I",
    arcana: "major",
    element: "Air",
    keywords: ["manifestation", "resourcefulness", "power", "inspired action"],
    description:
      "The Magician is a powerful card representing manifestation, resourcefulness, and having the tools you need to achieve your goals.",
    uprightMeaning: "Manifestation, resourcefulness, power, inspired action",
    reversedMeaning: "Manipulation, poor planning, untapped talents",
    symbolism: [
      "Infinity symbol above head",
      "Four suit symbols on table",
      "White robe of purity",
      "Red cloak of worldly experience",
    ],
    numerology: "One represents new beginnings and individual will",
    astrology: "Associated with Mercury",
    yesNo: "yes",
  },
  {
    id: "2",
    name: "The High Priestess",
    slug: "the-high-priestess",
    number: "II",
    arcana: "major",
    element: "Water",
    keywords: ["intuition", "sacred knowledge", "divine feminine", "the subconscious mind"],
    description:
      "The High Priestess represents intuition, sacred knowledge, divine feminine, and the subconscious mind.",
    uprightMeaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
    reversedMeaning: "Secrets, disconnected from intuition, withdrawal and silence",
    symbolism: [
      "Pomegranates of feminine fertility",
      "Veil of mysteries",
      "Crescent moon at feet",
      "Pillars of duality",
    ],
    numerology: "Two represents duality and balance",
    astrology: "Associated with the Moon",
    yesNo: "maybe",
  },
  // Minor Arcana - Cups
  {
    id: "cups-ace",
    name: "Ace of Cups",
    slug: "ace-of-cups",
    number: "Ace",
    arcana: "minor",
    suit: "cups",
    element: "Water",
    keywords: ["love", "new relationships", "compassion", "creativity"],
    description: "The Ace of Cups represents new love, emotional beginnings, compassion, and creativity.",
    uprightMeaning: "Love, new relationships, compassion, creativity",
    reversedMeaning: "Self-love, intuition, repressed emotions",
    symbolism: ["Overflowing cup", "Hand from cloud", "Dove of peace", "Lotus blossoms"],
    numerology: "Ace represents new beginnings and potential",
    astrology: "Water signs: Cancer, Scorpio, Pisces",
    yesNo: "yes",
  },
  {
    id: "cups-two",
    name: "Two of Cups",
    slug: "two-of-cups",
    number: "Two",
    arcana: "minor",
    suit: "cups",
    element: "Water",
    keywords: ["unified love", "partnership", "mutual attraction", "relationships"],
    description: "The Two of Cups represents unified love, partnership, and mutual attraction in relationships.",
    uprightMeaning: "Unified love, partnership, mutual attraction, relationships",
    reversedMeaning: "Self-love, break-ups, disharmony, distrust",
    symbolism: [
      "Two figures exchanging cups",
      "Caduceus of healing",
      "Lion head of passion",
      "Wings of spiritual connection",
    ],
    numerology: "Two represents partnership and cooperation",
    astrology: "Venus in Cancer",
    yesNo: "yes",
  },
  // Minor Arcana - Wands
  {
    id: "wands-ace",
    name: "Ace of Wands",
    slug: "ace-of-wands",
    number: "Ace",
    arcana: "minor",
    suit: "wands",
    element: "Fire",
    keywords: ["inspiration", "new opportunities", "growth", "potential"],
    description: "The Ace of Wands represents inspiration, new opportunities, and creative potential.",
    uprightMeaning: "Inspiration, new opportunities, growth, potential",
    reversedMeaning: "Lack of energy, lack of passion, boredom",
    symbolism: ["Hand emerging from cloud", "Sprouting leaves", "Castle in distance", "Mountains of challenges"],
    numerology: "Ace represents new beginnings and raw potential",
    astrology: "Fire signs: Aries, Leo, Sagittarius",
    yesNo: "yes",
  },
  // Minor Arcana - Swords
  {
    id: "swords-ace",
    name: "Ace of Swords",
    slug: "ace-of-swords",
    number: "Ace",
    arcana: "minor",
    suit: "swords",
    element: "Air",
    keywords: ["breakthrough", "clarity", "sharp mind", "new ideas"],
    description: "The Ace of Swords represents breakthrough, mental clarity, and new ideas.",
    uprightMeaning: "Breakthrough, clarity, sharp mind, new ideas",
    reversedMeaning: "Confusion, brutality, chaos",
    symbolism: ["Sword piercing crown", "Hand from cloud", "Mountains in background", "Olive and palm branches"],
    numerology: "Ace represents new mental beginnings",
    astrology: "Air signs: Gemini, Libra, Aquarius",
    yesNo: "yes",
  },
  // Minor Arcana - Pentacles
  {
    id: "pentacles-ace",
    name: "Ace of Pentacles",
    slug: "ace-of-pentacles",
    number: "Ace",
    arcana: "minor",
    suit: "pentacles",
    element: "Earth",
    keywords: ["manifestation", "new financial opportunity", "abundance", "prosperity"],
    description: "The Ace of Pentacles represents manifestation, new financial opportunities, and material abundance.",
    uprightMeaning: "Manifestation, new financial opportunity, abundance, prosperity",
    reversedMeaning: "Lost opportunity, lack of planning, poor financial decisions",
    symbolism: ["Hand holding pentacle", "Garden of abundance", "Archway of opportunity", "Mountain of achievement"],
    numerology: "Ace represents new material beginnings",
    astrology: "Earth signs: Taurus, Virgo, Capricorn",
    yesNo: "yes",
  },
]

export function getCardBySlug(slug: string): TarotCard | undefined {
  return tarotCards.find((card) => card.slug === slug)
}

export function getCardsByArcana(arcana: "major" | "minor"): TarotCard[] {
  return tarotCards.filter((card) => card.arcana === arcana)
}

export function getCardsBySuit(suit: string): TarotCard[] {
  return tarotCards.filter((card) => card.suit === suit)
}

export function searchCards(query: string): TarotCard[] {
  const lowercaseQuery = query.toLowerCase()
  return tarotCards.filter(
    (card) =>
      card.name.toLowerCase().includes(lowercaseQuery) ||
      card.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseQuery)) ||
      card.description.toLowerCase().includes(lowercaseQuery),
  )
}
