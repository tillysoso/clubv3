import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Moon, Star, SnowflakeIcon as Crystal, Eye, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Header */}
      <header className="border-b border-majestic-accent-purple/20 bg-majestic-primary/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-majestic-accent-purple" />
              <h1 className="text-h3 font-bebas font-header text-majestic-text">Majestic Tarot</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/cards" className="text-body text-majestic-text hover:text-majestic-hover transition-colors">
                Cards
              </Link>
              <Link
                href="/readings"
                className="text-body text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Readings
              </Link>
              <Link
                href="/journal"
                className="text-body text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Journal
              </Link>
              <Link
                href="/daily-card"
                className="text-body text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Daily Card
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-majestic-accent-purple text-majestic-text hover:bg-majestic-accent-purple bg-transparent"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 font-bebas font-header text-majestic-text mb-6">
              Unlock the Mysteries of Your Future
            </h1>
            <p className="text-h5 text-majestic-text/80 mb-8 max-w-2xl mx-auto">
              Discover profound insights through the ancient art of tarot. Get personalized readings, track your
              spiritual journey, and explore the deeper meanings of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-h5 px-8 py-3"
              >
                Start Your Reading
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-majestic-text text-majestic-text hover:bg-majestic-text hover:text-majestic-primary text-h5 px-8 py-3 bg-transparent"
              >
                Explore Cards
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bebas font-header text-majestic-text mb-4">Your Spiritual Journey Awaits</h2>
            <p className="text-h5 text-majestic-text/80 max-w-2xl mx-auto">
              Explore our comprehensive tarot platform designed to guide you on your path to self-discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Daily Readings</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Start each day with personalized tarot guidance and spiritual insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Card Library</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Explore detailed meanings and interpretations of all 78 tarot cards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Crystal className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Spread Readings</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Choose from various spreads for different aspects of your life
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Reading History</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Track your spiritual journey and see patterns in your readings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Personal Journal</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Record your thoughts, insights, and spiritual reflections
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-majestic-accent-purple/30 hover:border-majestic-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Guided Learning</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Learn tarot with our comprehensive guides and tutorials
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto glass rounded-2xl p-12 border border-majestic-accent-purple/30">
            <h2 className="text-h2 font-bebas font-header text-majestic-text mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-h5 text-majestic-text/80 mb-8">
              Join thousands of seekers who have discovered clarity and guidance through our tarot platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-majestic-accent-red hover:bg-majestic-hover hover:text-majestic-primary text-h5 px-8 py-3"
              >
                Get Your First Reading
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-majestic-text text-majestic-text hover:bg-majestic-text hover:text-majestic-primary text-h5 px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-majestic-accent-purple/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
                <span className="text-h4 font-bebas font-header text-majestic-text">Majestic Tarot</span>
              </div>
              <p className="text-body text-majestic-text/70">
                Your trusted companion on the journey of spiritual discovery and self-awareness.
              </p>
            </div>

            <div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/daily-card" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Daily Card
                  </Link>
                </li>
                <li>
                  <Link href="/readings" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Readings
                  </Link>
                </li>
                <li>
                  <Link href="/cards" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Card Library
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="text-body text-majestic-text/70 hover:text-majestic-hover">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-majestic-accent-purple/20 mt-8 pt-8 text-center">
            <p className="text-body text-majestic-text/70">
              © 2024 Majestic Tarot. All rights reserved. Made with ✨ for spiritual seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
