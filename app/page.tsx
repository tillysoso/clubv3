import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Moon, Star, SnowflakeIcon as Crystal, Eye, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Header */}
      <header className="border-b border-majestic-accent-purple/20 bg-majestic-primary/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-majestic-hover" />
              <h1 className="font-bebas font-header text-h2 text-majestic-text">Majestic Tarot</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/readings"
                className="text-body text-majestic-text hover:text-majestic-hover transition-colors"
              >
                Readings
              </Link>
              <Link href="/cards" className="text-body text-majestic-text hover:text-majestic-hover transition-colors">
                Cards
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
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-majestic-accent-purple text-majestic-text hover:bg-majestic-hover hover:text-majestic-primary bg-transparent"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-majestic-accent-purple hover:bg-majestic-accent-purple/80 text-majestic-text"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-majestic-primary">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-bebas font-header text-h1 md:text-6xl lg:text-7xl text-majestic-text mb-6">
              Discover Your Destiny
            </h1>
            <p className="text-body md:text-lg text-majestic-text/80 mb-8 max-w-2xl mx-auto">
              Unlock the mysteries of your future with professional tarot readings, daily insights, and spiritual
              guidance. Your journey to self-discovery starts here.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-majestic-accent-purple hover:bg-majestic-accent-purple/80 text-majestic-text px-8 py-3"
            >
              Start Free Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-majestic-hover text-majestic-hover hover:bg-majestic-hover hover:text-majestic-primary px-8 py-3 bg-transparent"
            >
              Explore Cards
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-majestic-primary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bebas font-header text-h2 md:text-5xl text-majestic-text mb-4">
              Your Spiritual Journey Awaits
            </h2>
            <p className="text-body md:text-lg text-majestic-text/80 max-w-2xl mx-auto">
              Explore the ancient wisdom of tarot with modern convenience and personalized insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Moon className="h-8 w-8" />,
                title: "Daily Readings",
                description: "Start each day with personalized tarot guidance and spiritual insights.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Card Library",
                description: "Explore the complete tarot deck with detailed meanings and interpretations.",
              },
              {
                icon: <Crystal className="h-8 w-8" />,
                title: "Spread Layouts",
                description: "Choose from various spread patterns for different types of questions.",
              },
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Reading History",
                description: "Track your spiritual journey with detailed reading history and insights.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Quick Insights",
                description: "Get instant answers to your pressing questions with single-card draws.",
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Personal Journal",
                description: "Document your thoughts, dreams, and spiritual experiences.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-majestic-primary/50 border-majestic-accent-purple/30 backdrop-blur-sm hover:bg-majestic-primary/70 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="text-majestic-hover mb-4">{feature.icon}</div>
                  <CardTitle className="font-bebas font-header text-h4 text-majestic-text">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-body text-majestic-text/80">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-majestic-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bebas font-header text-h2 md:text-5xl text-majestic-text mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-body md:text-lg text-majestic-text/80 mb-8">
              Join thousands of seekers who have discovered clarity and guidance through our tarot readings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-majestic-accent-red hover:bg-majestic-accent-red/80 text-majestic-text px-8 py-3"
              >
                Get Your Reading Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-majestic-text text-majestic-text hover:bg-majestic-text hover:text-majestic-primary px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-majestic-primary border-t border-majestic-accent-purple/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-majestic-hover" />
                <h3 className="font-bebas font-header text-h4 text-majestic-text">Majestic Tarot</h3>
              </div>
              <p className="text-body text-majestic-text/80 mb-4 max-w-md">
                Your trusted companion for spiritual guidance and self-discovery through the ancient art of tarot.
              </p>
            </div>
            <div>
              <h4 className="font-bebas font-header text-h5 text-majestic-text mb-4">Features</h4>
              <ul className="space-y-2 text-body text-majestic-text/80">
                <li>
                  <Link href="/readings" className="hover:text-majestic-hover transition-colors">
                    Tarot Readings
                  </Link>
                </li>
                <li>
                  <Link href="/cards" className="hover:text-majestic-hover transition-colors">
                    Card Library
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-majestic-hover transition-colors">
                    Personal Journal
                  </Link>
                </li>
                <li>
                  <Link href="/daily-card" className="hover:text-majestic-hover transition-colors">
                    Daily Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bebas font-header text-h5 text-majestic-text mb-4">Support</h4>
              <ul className="space-y-2 text-body text-majestic-text/80">
                <li>
                  <Link href="/help" className="hover:text-majestic-hover transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-majestic-hover transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-majestic-hover transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-majestic-hover transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-majestic-accent-purple/20 mt-8 pt-8 text-center">
            <p className="text-body text-majestic-text/60">© 2024 Majestic Tarot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
