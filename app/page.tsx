import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Moon, Star, SnowflakeIcon as Crystal, Eye, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Header */}
      <header className="bg-majestic-primary border-b border-majestic-accent-purple/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-majestic-accent-purple" />
              <h1 className="text-h2 font-bebas font-header text-majestic-text">Majestic Tarot</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-body font-poppins text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Readings
              </a>
              <a
                href="#"
                className="text-body font-poppins text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Cards
              </a>
              <a
                href="#"
                className="text-body font-poppins text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Journal
              </a>
              <a
                href="#"
                className="text-body font-poppins text-majestic-text hover:text-majestic-hover transition-colors"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="text-body font-poppins border-majestic-accent-purple text-majestic-text hover:bg-majestic-accent-purple hover:text-majestic-text bg-transparent"
              >
                Sign In
              </Button>
              <Button className="text-body font-poppins bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-majestic-text">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-majestic-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 font-bebas font-header text-majestic-text mb-6">
              Discover Your Destiny Through the Ancient Art of Tarot
            </h1>
            <p className="text-body font-poppins text-majestic-text/80 mb-8 max-w-2xl mx-auto">
              Unlock the mysteries of your future with professional tarot readings, personalized insights, and mystical
              guidance tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-body font-poppins bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-majestic-text px-8 py-3"
              >
                Start Free Reading
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-body font-poppins border-majestic-accent-purple text-majestic-text hover:bg-majestic-accent-purple hover:text-majestic-text px-8 py-3 bg-transparent"
              >
                Explore Cards
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-majestic-primary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bebas font-header text-majestic-text mb-4">Your Journey to Self-Discovery</h2>
            <p className="text-body font-poppins text-majestic-text/80 max-w-2xl mx-auto">
              Experience the power of tarot with our comprehensive suite of mystical tools and personalized guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Moon className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Daily Readings</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Start each day with personalized tarot guidance and cosmic insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Card Library</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Explore the complete tarot deck with detailed meanings and interpretations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Crystal className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Spread Readings</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Choose from various spreads for love, career, and spiritual guidance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Intuitive Insights</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Receive AI-powered interpretations combined with ancient wisdom.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Personal Journal</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Track your spiritual journey and reflect on your readings over time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-majestic-primary/50 backdrop-blur-sm border-majestic-accent-purple/20 hover:border-majestic-hover/40 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-majestic-accent-purple/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Mystical Community</CardTitle>
                <CardDescription className="text-body font-poppins text-majestic-text/70">
                  Connect with fellow seekers and share your spiritual experiences.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-majestic-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-h2 font-bebas font-header text-majestic-text mb-6">Ready to Unlock Your Destiny?</h2>
            <p className="text-body font-poppins text-majestic-text/80 mb-8">
              Join thousands of seekers who have discovered clarity, purpose, and guidance through our mystical tarot
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-body font-poppins bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-majestic-text px-8 py-3"
              >
                Begin Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-body font-poppins border-majestic-accent-purple text-majestic-text hover:bg-majestic-accent-purple hover:text-majestic-text px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-majestic-primary border-t border-majestic-accent-purple/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-majestic-accent-purple" />
                <h3 className="text-h5 font-bebas font-header text-majestic-text">Majestic Tarot</h3>
              </div>
              <p className="text-body font-poppins text-majestic-text/70">
                Discover your destiny through the ancient art of tarot reading.
              </p>
            </div>

            <div>
              <h4 className="text-h6 font-bebas font-header text-majestic-text mb-4">Readings</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Daily Card
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Love Reading
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Spiritual Path
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-h6 font-bebas font-header text-majestic-text mb-4">Learn</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Card Meanings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Spread Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Tarot History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-h6 font-bebas font-header text-majestic-text mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body font-poppins text-majestic-text/70 hover:text-majestic-hover transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-majestic-accent-purple/20 mt-8 pt-8 text-center">
            <p className="text-body font-poppins text-majestic-text/70">
              © 2024 Majestic Tarot. All rights reserved. Embrace your mystical journey.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
