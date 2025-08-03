export interface TarotCard {
  id: string
  name: string
  slug: string
  arcana: "major" | "minor"
  suit?: "cups" | "wands" | "swords" | "pentacles"
  number?: number | string
  keywords: string[]
  uprightMeaning: string
  reversedMeaning: string
  description: string
  symbolism: string[]
  numerology?: string
  astrology?: string
  element?: string
  yesNo: "yes" | "no" | "maybe"
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  {
    id: "0",
    name: "The Fool",
    slug: "the-fool",
    arcana: "major",
    number: 0,
    keywords: ["new beginnings", "innocence", "spontaneity", "free spirit"],
    uprightMeaning:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
    reversedMeaning:
      "When reversed, The Fool can indicate recklessness, taking unnecessary risks, being foolish, acting without thinking, or being gullible and naive.",
    description:
      "The Fool is the first card of the Major Arcana and represents the beginning of a journey. It symbolizes innocence, new experiences, and unlimited potential.",
    symbolism: [
      "white rose (purity)",
      "small bag (untapped knowledge)",
      "cliff edge (leap of faith)",
      "mountains (challenges ahead)",
    ],
    numerology: "Number 0 represents infinite potential and the beginning of a spiritual journey.",
    astrology: "Associated with Uranus and the element of Air",
    element: "Air",
    yesNo: "yes",
  },
  {
    id: "1",
    name: "The Magician",
    slug: "the-magician",
    arcana: "major",
    number: 1,
    keywords: ["manifestation", "resourcefulness", "power", "inspired action"],
    uprightMeaning:
      "The Magician represents manifestation, resourcefulness, power, and inspired action. You have the tools and abilities to achieve your goals.",
    reversedMeaning:
      "Reversed, The Magician can indicate manipulation, poor planning, untapped talents, or using your skills for selfish purposes.",
    description:
      "The Magician is a powerful card representing the ability to manifest your desires through willpower and determination.",
    symbolism: [
      "infinity symbol (unlimited potential)",
      "four suit symbols (mastery of elements)",
      "red roses (passion)",
      "white lilies (purity)",
    ],
    numerology: "Number 1 represents new beginnings, leadership, and individual power.",
    astrology: "Associated with Mercury",
    element: "Air",
    yesNo: "yes",
  },
  {
    id: "2",
    name: "The High Priestess",
    slug: "the-high-priestess",
    arcana: "major",
    number: 2,
    keywords: ["intuition", "sacred knowledge", "divine feminine", "subconscious mind"],
    uprightMeaning:
      "The High Priestess represents intuition, sacred knowledge, divine feminine, and the subconscious mind. Trust your inner voice and intuition.",
    reversedMeaning:
      "Reversed, she can indicate secrets, disconnected from intuition, withdrawal, or silence when you should speak up.",
    description:
      "The High Priestess sits between the conscious and subconscious realms, representing intuitive knowledge and inner wisdom.",
    symbolism: [
      "veil (hidden knowledge)",
      "pomegranates (feminine fertility)",
      "crescent moon (intuition)",
      "pillars (balance)",
    ],
    numerology: "Number 2 represents duality, balance, and cooperation.",
    astrology: "Associated with the Moon",
    element: "Water",
    yesNo: "maybe",
  },
  {
    id: "3",
    name: "The Empress",
    slug: "the-empress",
    arcana: "major",
    number: 3,
    keywords: ["femininity", "beauty", "nature", "nurturing", "abundance"],
    uprightMeaning:
      "The Empress represents femininity, beauty, nature, nurturing, and abundance. A time of growth, creativity, and fertility.",
    reversedMeaning:
      "Reversed, The Empress can indicate creative block, dependence on others, smothering, or lack of growth.",
    description:
      "The Empress embodies the archetypal mother figure, representing fertility, abundance, and the nurturing aspects of femininity.",
    symbolism: [
      "wheat (fertility)",
      "venus symbol (love)",
      "crown of stars (divine connection)",
      "flowing water (emotion)",
    ],
    numerology: "Number 3 represents creativity, communication, and growth.",
    astrology: "Associated with Venus",
    element: "Earth",
    yesNo: "yes",
  },
  {
    id: "4",
    name: "The Emperor",
    slug: "the-emperor",
    arcana: "major",
    number: 4,
    keywords: ["authority", "father-figure", "structure", "control"],
    uprightMeaning:
      "The Emperor represents authority, father-figure, structure, and control. Leadership, stability, and the establishment of rules and systems.",
    reversedMeaning:
      "Reversed, The Emperor can indicate domination, excessive control, lack of discipline, or inflexibility.",
    description:
      "The Emperor represents the archetypal father figure and symbolizes authority, structure, and control.",
    symbolism: ["throne (authority)", "ram heads (Aries)", "red robes (passion)", "mountains (strength)"],
    numerology: "Number 4 represents stability, structure, and foundation.",
    astrology: "Associated with Aries",
    element: "Fire",
    yesNo: "yes",
  },

  // Minor Arcana - Cups
  {
    id: "ace-cups",
    name: "Ace of Cups",
    slug: "ace-of-cups",
    arcana: "minor",
    suit: "cups",
    number: 1,
    keywords: ["new relationships", "compassion", "creativity", "emotional beginnings"],
    uprightMeaning:
      "The Ace of Cups represents new relationships, compassion, creativity, and emotional beginnings. A new emotional or spiritual journey is beginning.",
    reversedMeaning:
      "Reversed, it can indicate emotional loss, blocked creativity, emptiness, or difficulty expressing emotions.",
    description:
      "The Ace of Cups represents the beginning of emotional and spiritual journeys, new relationships, and creative inspiration.",
    symbolism: ["overflowing cup (abundance)", "dove (peace)", "lotus (spiritual awakening)", "water (emotions)"],
    numerology: "Aces represent new beginnings and potential.",
    element: "Water",
    yesNo: "yes",
  },
  {
    id: "two-cups",
    name: "Two of Cups",
    slug: "two-of-cups",
    arcana: "minor",
    suit: "cups",
    number: 2,
    keywords: ["unified love", "partnership", "mutual attraction", "relationships"],
    uprightMeaning:
      "The Two of Cups represents unified love, partnership, mutual attraction, and relationships. A harmonious connection with another person.",
    reversedMeaning: "Reversed, it can indicate broken relationships, imbalance, or lack of harmony in partnerships.",
    description: "The Two of Cups symbolizes the union of two people in love, friendship, or partnership.",
    symbolism: ["two cups (partnership)", "caduceus (healing)", "lion head (strength)", "exchange of energy"],
    numerology: "Number 2 represents partnership and cooperation.",
    element: "Water",
    yesNo: "yes",
  },
  {
    id: "three-cups",
    name: "Three of Cups",
    slug: "three-of-cups",
    arcana: "minor",
    suit: "cups",
    number: 3,
    keywords: ["celebration", "friendship", "creativity", "community"],
    uprightMeaning:
      "The Three of Cups represents celebration, friendship, creativity, and community. A time of joy, social gatherings, and shared happiness.",
    reversedMeaning: "Reversed, it can indicate gossip, isolation, overindulgence, or lack of social connection.",
    description: "The Three of Cups celebrates friendship, community, and shared joy among groups of people.",
    symbolism: ["three women (friendship)", "raised cups (celebration)", "fruits (abundance)", "dancing (joy)"],
    numerology: "Number 3 represents creativity and social expression.",
    element: "Water",
    yesNo: "yes",
  },

  // Minor Arcana - Wands
  {
    id: "ace-wands",
    name: "Ace of Wands",
    slug: "ace-of-wands",
    arcana: "minor",
    suit: "wands",
    number: 1,
    keywords: ["inspiration", "new opportunities", "growth", "potential"],
    uprightMeaning:
      "The Ace of Wands represents inspiration, new opportunities, growth, and potential. A spark of creative energy and new beginnings.",
    reversedMeaning: "Reversed, it can indicate lack of energy, delays, false starts, or missed opportunities.",
    description:
      "The Ace of Wands represents the spark of inspiration and the beginning of creative or spiritual endeavors.",
    symbolism: [
      "sprouting wand (growth)",
      "hand from cloud (divine inspiration)",
      "mountains (challenges)",
      "castle (goals)",
    ],
    numerology: "Aces represent new beginnings and raw potential.",
    element: "Fire",
    yesNo: "yes",
  },
  {
    id: "two-wands",
    name: "Two of Wands",
    slug: "two-of-wands",
    arcana: "minor",
    suit: "wands",
    number: 2,
    keywords: ["future planning", "making decisions", "leaving comfort zone", "personal power"],
    uprightMeaning:
      "The Two of Wands represents future planning, making decisions, leaving comfort zone, and personal power. Time to make important choices about your path.",
    reversedMeaning: "Reversed, it can indicate poor planning, lack of control, or fear of change.",
    description:
      "The Two of Wands represents planning for the future and making important decisions about your life path.",
    symbolism: ["globe (world of possibilities)", "two wands (choice)", "red roses (passion)", "white lilies (purity)"],
    numerology: "Number 2 represents choices and duality.",
    element: "Fire",
    yesNo: "maybe",
  },

  // Minor Arcana - Swords
  {
    id: "ace-swords",
    name: "Ace of Swords",
    slug: "ace-of-swords",
    arcana: "minor",
    suit: "swords",
    number: 1,
    keywords: ["breakthrough", "clarity", "sharp mind", "new ideas"],
    uprightMeaning:
      "The Ace of Swords represents breakthrough, clarity, sharp mind, and new ideas. Mental clarity and the power of truth.",
    reversedMeaning: "Reversed, it can indicate confusion, chaos, lack of clarity, or destructive thinking.",
    description: "The Ace of Swords represents mental breakthroughs, new ideas, and the power of clear thinking.",
    symbolism: ["upright sword (truth)", "crown (victory)", "mountains (challenges)", "clouds (thoughts)"],
    numerology: "Aces represent new beginnings and potential.",
    element: "Air",
    yesNo: "yes",
  },
  {
    id: "two-swords",
    name: "Two of Swords",
    slug: "two-of-swords",
    arcana: "minor",
    suit: "swords",
    number: 2,
    keywords: ["difficult decisions", "weighing options", "indecision", "stalemate"],
    uprightMeaning:
      "The Two of Swords represents difficult decisions, weighing options, indecision, and stalemate. A need to make a choice despite uncertainty.",
    reversedMeaning: "Reversed, it can indicate confusion, information overload, or avoiding decisions.",
    description: "The Two of Swords represents being at a crossroads and needing to make a difficult decision.",
    symbolism: [
      "blindfolded figure (uncertainty)",
      "crossed swords (conflict)",
      "water (emotions)",
      "crescent moon (intuition)",
    ],
    numerology: "Number 2 represents duality and choice.",
    element: "Air",
    yesNo: "maybe",
  },

  // Minor Arcana - Pentacles
  {
    id: "ace-pentacles",
    name: "Ace of Pentacles",
    slug: "ace-of-pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 1,
    keywords: ["manifestation", "new financial opportunity", "abundance", "prosperity"],
    uprightMeaning:
      "The Ace of Pentacles represents manifestation, new financial opportunity, abundance, and prosperity. A new opportunity for material success.",
    reversedMeaning: "Reversed, it can indicate missed opportunities, lack of planning, or poor financial decisions.",
    description: "The Ace of Pentacles represents new opportunities for material and financial success.",
    symbolism: [
      "golden pentacle (prosperity)",
      "hand from cloud (divine gift)",
      "garden (growth)",
      "mountains (stability)",
    ],
    numerology: "Aces represent new beginnings and potential.",
    element: "Earth",
    yesNo: "yes",
  },
  {
    id: "two-pentacles",
    name: "Two of Pentacles",
    slug: "two-of-pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 2,
    keywords: ["balance", "priorities", "time management", "juggling"],
    uprightMeaning:
      "The Two of Pentacles represents balance, priorities, time management, and juggling multiple responsibilities. Finding balance in a busy life.",
    reversedMeaning: "Reversed, it can indicate imbalance, overwhelm, or poor time management.",
    description: "The Two of Pentacles represents the need to balance multiple priorities and responsibilities.",
    symbolism: [
      "juggling pentacles (balance)",
      "infinity symbol (endless cycle)",
      "ships (ups and downs)",
      "waves (change)",
    ],
    numerology: "Number 2 represents balance and duality.",
    element: "Earth",
    yesNo: "maybe",
  },
]

export const suits = {
  cups: {
    name: "Cups",
    element: "Water",
    keywords: ["emotions", "relationships", "intuition", "spirituality"],
    description:
      "Cups represent the emotional and spiritual aspects of life, including love, relationships, intuition, and creativity.",
  },
  wands: {
    name: "Wands",
    element: "Fire",
    keywords: ["passion", "creativity", "energy", "inspiration"],
    description:
      "Wands represent passion, creativity, energy, and inspiration. They deal with career, ambition, and personal growth.",
  },
  swords: {
    name: "Swords",
    element: "Air",
    keywords: ["thoughts", "communication", "conflict", "intellect"],
    description:
      "Swords represent the mind, thoughts, communication, and conflict. They deal with challenges and mental processes.",
  },
  pentacles: {
    name: "Pentacles",
    element: "Earth",
    keywords: ["material", "money", "career", "health"],
    description: "Pentacles represent the material world, including money, career, health, and physical manifestation.",
  },
}

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
      card.uprightMeaning.toLowerCase().includes(lowercaseQuery) ||
      card.description.toLowerCase().includes(lowercaseQuery),
  )
}
