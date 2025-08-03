import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Moon, Star, Heart, Eye, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Header */}
      <header className="bg-majestic-primary border-b border-majestic-accent-purple/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-majestic-accent-purple" />
            <h1 className="font-bebas font-header text-h2 text-majestic-text">Majestic Tarot</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/cards" className="text-majestic-text hover:text-majestic-hover transition-colors text-body">
              Cards
            </Link>
            <Link href="/readings" className="text-majestic-text hover:text-majestic-hover transition-colors text-body">
              Readings
            </Link>
            <Link href="/journal" className="text-majestic-text hover:text-majestic-hover transition-colors text-body">
              Journal
            </Link>
            <Link
              href="/daily-card"
              className="text-majestic-text hover:text-majestic-hover transition-colors text-body"
            >
              Daily Card
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary bg-transparent"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-majestic-accent-purple hover:bg-majestic-hover text-majestic-text hover:text-majestic-primary"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-majestic-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-bebas font-header text-h1 md:text-6xl lg:text-7xl text-majestic-text mb-6">
              Unlock the Mysteries of Your Future
            </h1>
            <p className="text-h4 text-majestic-text/80 mb-8 max-w-2xl mx-auto">
              Discover profound insights through personalized tarot readings, daily guidance, and spiritual wisdom that
              illuminates your path forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-majestic-accent-purple hover:bg-majestic-hover text-majestic-text hover:text-majestic-primary text-h5 px-8 py-3"
              >
                <Link href="/daily-card" className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Get Your Daily Card
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary text-h5 px-8 py-3 bg-transparent"
              >
                <Link href="/readings" className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Explore Readings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-majestic-primary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bebas font-header text-h2 text-majestic-text mb-4">Your Spiritual Journey Awaits</h2>
            <p className="text-h5 text-majestic-text/80 max-w-2xl mx-auto">
              Explore the ancient wisdom of tarot through modern, intuitive tools designed to guide your spiritual
              growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Daily Insights</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Start each day with personalized tarot guidance and spiritual wisdom.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Sacred Spreads</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Explore various tarot spreads for love, career, and spiritual growth.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Spiritual Journal</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Track your spiritual journey and reflect on your tarot experiences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Card Library</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Discover the meaning and symbolism behind every tarot card.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Instant Readings</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Get immediate guidance with our quick and accurate tarot readings.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas font-header text-h4 text-majestic-text">Mystical Insights</CardTitle>
                <CardDescription className="text-body text-majestic-text/70">
                  Unlock deeper understanding with advanced interpretations and guidance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-majestic-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bebas font-header text-h2 text-majestic-text mb-6">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-h5 text-majestic-text/80 mb-8">
              Join thousands of seekers who have discovered clarity, purpose, and spiritual growth through the ancient
              wisdom of tarot.
            </p>
            <Button
              size="lg"
              className="bg-majestic-accent-purple hover:bg-majestic-hover text-majestic-text hover:text-majestic-primary text-h5 px-8 py-3"
            >
              <Link href="/signup" className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-majestic-primary border-t border-majestic-accent-purple/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
              <span className="font-bebas font-header text-h5 text-majestic-text">Majestic Tarot</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-body text-majestic-text/70 hover:text-majestic-hover transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-body text-majestic-text/70 hover:text-majestic-hover transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-body text-majestic-text/70 hover:text-majestic-hover transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-majestic-accent-purple/20 text-center">
            <p className="text-body text-majestic-text/60">
              © 2024 Majestic Tarot. All rights reserved. Embrace the mystical journey within.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
