import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Sparkles, Moon, Sun, Heart, Eye } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Header */}
      <header className="border-b border-majestic-text/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-majestic-accent-purple" />
              <h1 className="font-bebas text-h2 text-majestic-text">Majestic Tarot</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-majestic-text hover:text-majestic-hover transition-colors">
                Readings
              </a>
              <a href="#" className="text-majestic-text hover:text-majestic-hover transition-colors">
                Cards
              </a>
              <a href="#" className="text-majestic-text hover:text-majestic-hover transition-colors">
                Journal
              </a>
              <a href="#" className="text-majestic-text hover:text-majestic-hover transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary"
              >
                Sign In
              </Button>
              <Button className="bg-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary">
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
            <h1 className="font-bebas text-h1 md:text-6xl lg:text-7xl text-majestic-text mb-6 animate-float">
              Discover Your Spiritual Path
            </h1>
            <p className="text-lg md:text-xl text-majestic-text/80 mb-8 max-w-2xl mx-auto">
              Unlock ancient wisdom through personalized tarot readings, daily guidance, and spiritual insights tailored
              to your unique journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary text-lg px-8 py-3"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Reading
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-majestic-text text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary text-lg px-8 py-3 bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                Explore Cards
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-h2 md:text-5xl text-majestic-text mb-4">Your Mystical Journey Awaits</h2>
            <p className="text-lg text-majestic-text/80 max-w-2xl mx-auto">
              Experience the power of tarot through our comprehensive digital platform designed for modern seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Daily Readings</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Start each day with personalized guidance and spiritual insights tailored to your energy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-red/20 rounded-lg flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-majestic-accent-red" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Comprehensive Spreads</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Explore various tarot spreads from simple three-card draws to complex Celtic Cross layouts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-hover/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-majestic-hover" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Spiritual Journal</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Track your spiritual growth and reflect on your readings with our integrated journaling system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Card Meanings</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Discover the rich symbolism and meanings behind each card in our comprehensive database.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-red/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-majestic-accent-red" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Intuitive Interface</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Experience tarot like never before with our beautifully designed, user-friendly interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-hover/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-majestic-hover" />
                </div>
                <CardTitle className="font-bebas text-h4 text-majestic-text">Personal Insights</CardTitle>
                <CardDescription className="text-majestic-text/70">
                  Gain deeper understanding of yourself through personalized interpretations and guidance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="glass-card text-center p-12">
            <CardContent className="space-y-6">
              <h2 className="font-bebas text-h2 md:text-5xl text-majestic-text">Begin Your Spiritual Journey Today</h2>
              <p className="text-lg text-majestic-text/80 max-w-2xl mx-auto">
                Join thousands of seekers who have discovered clarity, guidance, and spiritual growth through our
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary text-lg px-8 py-3 animate-pulse-glow"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Get Your Free Reading
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-majestic-text text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary text-lg px-8 py-3 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-majestic-text/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-majestic-accent-purple" />
                <span className="font-bebas text-h5 text-majestic-text">Majestic Tarot</span>
              </div>
              <p className="text-majestic-text/70 text-sm">
                Your trusted companion for spiritual guidance and tarot wisdom.
              </p>
            </div>
            <div>
              <h3 className="font-bebas text-h6 text-majestic-text mb-4">Readings</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Daily Card
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Love Reading
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Celtic Cross
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bebas text-h6 text-majestic-text mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Card Meanings
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Spreads Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Tarot History
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bebas text-h6 text-majestic-text mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-majestic-text/70 hover:text-majestic-hover">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-majestic-text/20 mt-8 pt-8 text-center">
            <p className="text-majestic-text/70 text-sm">
              © 2024 Majestic Tarot. All rights reserved. Made with ✨ for spiritual seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
