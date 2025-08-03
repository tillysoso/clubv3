"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, User, ArrowRight, BookOpen, Star, Sparkles } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding the Major Arcana: A Beginner's Guide",
    slug: "understanding-major-arcana-beginners-guide",
    excerpt:
      "Dive deep into the 22 cards of the Major Arcana and discover their profound meanings and spiritual significance in your tarot journey.",
    content: "The Major Arcana represents the major themes and lessons in our spiritual journey...",
    author: "Luna Mystic",
    publishedAt: "2024-01-15",
    readTime: 8,
    category: "Education",
    tags: ["major arcana", "beginners", "spirituality", "tarot basics"],
    featured: true,
  },
  {
    id: "2",
    title: "Daily Tarot Practice: Building Your Spiritual Routine",
    slug: "daily-tarot-practice-spiritual-routine",
    excerpt:
      "Learn how to incorporate tarot into your daily spiritual practice for consistent growth and deeper self-understanding.",
    content: "Creating a daily tarot practice can transform your spiritual journey...",
    author: "Sage Moonwhisper",
    publishedAt: "2024-01-12",
    readTime: 6,
    category: "Practice",
    tags: ["daily practice", "routine", "spiritual growth", "meditation"],
    featured: false,
  },
  {
    id: "3",
    title: "The Art of Tarot Journaling: Tracking Your Spiritual Growth",
    slug: "art-of-tarot-journaling-spiritual-growth",
    excerpt:
      "Discover how keeping a tarot journal can enhance your readings and provide valuable insights into your personal development.",
    content: "Tarot journaling is one of the most powerful tools for spiritual development...",
    author: "Crystal Starweaver",
    publishedAt: "2024-01-10",
    readTime: 7,
    category: "Practice",
    tags: ["journaling", "spiritual growth", "self-reflection", "tracking"],
    featured: true,
  },
  {
    id: "4",
    title: "Celtic Cross Spread: Mastering the Classic Reading",
    slug: "celtic-cross-spread-mastering-classic-reading",
    excerpt:
      "Master the most popular tarot spread with our comprehensive guide to the Celtic Cross and its ten positions.",
    content: "The Celtic Cross is perhaps the most well-known tarot spread...",
    author: "Raven Nightshade",
    publishedAt: "2024-01-08",
    readTime: 10,
    category: "Spreads",
    tags: ["celtic cross", "spreads", "advanced", "reading techniques"],
    featured: false,
  },
  {
    id: "5",
    title: "Moon Phases and Tarot: Aligning Your Readings with Lunar Energy",
    slug: "moon-phases-tarot-lunar-energy",
    excerpt:
      "Explore how different moon phases can enhance your tarot readings and deepen your connection to cosmic energies.",
    content: "The moon has long been associated with intuition and divination...",
    author: "Luna Mystic",
    publishedAt: "2024-01-05",
    readTime: 9,
    category: "Spirituality",
    tags: ["moon phases", "lunar energy", "cosmic connection", "timing"],
    featured: false,
  },
  {
    id: "6",
    title: "Tarot Ethics: Reading Responsibly and with Compassion",
    slug: "tarot-ethics-reading-responsibly-compassion",
    excerpt:
      "Learn the important ethical considerations when reading tarot for yourself and others, ensuring a positive and healing experience.",
    content: "With great power comes great responsibility, and tarot reading is no exception...",
    author: "Sage Moonwhisper",
    publishedAt: "2024-01-03",
    readTime: 5,
    category: "Ethics",
    tags: ["ethics", "responsibility", "compassion", "professional reading"],
    featured: false,
  },
]

const categories = ["All", "Education", "Practice", "Spreads", "Spirituality", "Ethics"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-majestic-primary py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-majestic-accent-purple to-majestic-accent-red rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-majestic-text" />
          </div>
          <h1 className="text-h1 mb-4">Mystical Insights Blog</h1>
          <p className="text-p text-majestic-text/80 max-w-2xl mx-auto leading-relaxed">
            Explore the depths of tarot wisdom with our comprehensive guides, spiritual insights, and practical advice
            for your mystical journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-majestic-text/60" />
            <Input
              placeholder="Search articles, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sleek-input pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category ? "btn-primary" : "btn-ghost border-majestic-text/30 bg-transparent"
                }
              >
                <span className="text-p">{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Star className="h-5 w-5 text-majestic-hover mr-2" />
              <h2 className="text-h3">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="glass-card hover:bg-majestic-primary/60 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-majestic-accent-purple/20 text-majestic-hover border-majestic-hover/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span className="text-p">Featured</span>
                      </Badge>
                      <Badge variant="outline" className="border-majestic-text/30 text-majestic-text/70">
                        <span className="text-p">{post.category}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-h4 group-hover:text-majestic-hover transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-p text-majestic-text/70 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-p text-majestic-text/60 mb-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div>{post.readTime} min read</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-majestic-text/10 text-majestic-text/80">
                          <span className="text-p">#{tag}</span>
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="btn-ghost group-hover:text-majestic-hover">
                        <span className="text-p">Read Article</span>
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-h3 mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="glass-card hover:bg-majestic-primary/60 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-majestic-text/30 text-majestic-text/70">
                        <span className="text-p">{post.category}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-h5 group-hover:text-majestic-hover transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-p text-majestic-text/70 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-p text-majestic-text/60 mb-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                      <div>{post.readTime} min</div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-majestic-text/10 text-majestic-text/80">
                          <span className="text-p">#{tag}</span>
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" className="btn-ghost group-hover:text-majestic-hover">
                        <span className="text-p">Read More</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-majestic-text/40 mx-auto mb-4" />
            <h3 className="text-h4 mb-2">No Articles Found</h3>
            <p className="text-p text-majestic-text/70 mb-6">
              Try adjusting your search terms or category filter to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="btn-primary"
            >
              <span className="text-p">Clear Filters</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
