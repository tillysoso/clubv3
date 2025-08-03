import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Sparkles, BookOpen, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-h1 font-headers font-light text-logo mb-6">Discover Your Path with Majestic Tarot</h1>
          <p className="text-p font-body text-logo/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unlock the mysteries of your future with personalized tarot readings, daily insights, and a comprehensive
            journal to track your spiritual journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-accent-purple hover:bg-hover text-logo font-body text-p px-8 py-3 transition-colors duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Free Journey
              </Button>
            </Link>
            <Link href="/daily-card">
              <Button
                size="lg"
                variant="outline"
                className="border-logo text-logo hover:bg-logo hover:text-primary font-body text-p px-8 py-3 transition-colors duration-300 bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Get Daily Card
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 font-headers font-light text-logo text-center mb-12">Your Spiritual Journey Awaits</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary/20 backdrop-blur-sm border-logo/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Daily Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Receive personalized daily tarot insights to guide your decisions and illuminate your path forward.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-primary/20 backdrop-blur-sm border-logo/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-accent-red" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Tarot Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Document your readings, track patterns, and reflect on your spiritual growth with our intuitive
                  journal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-primary/20 backdrop-blur-sm border-logo/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-hover/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-hover" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Card Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Explore detailed meanings and interpretations of all 78 tarot cards in our comprehensive library.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-primary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-headers font-light text-logo mb-12">Begin Your Journey in Three Steps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-headers font-light text-logo">1</span>
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Create Account</h3>
              <p className="text-p font-body text-logo/80">Sign up for free and set your spiritual intentions</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-headers font-light text-logo">2</span>
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Draw Your Cards</h3>
              <p className="text-p font-body text-logo/80">Receive daily guidance and explore different spreads</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-hover rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-headers font-light text-primary">3</span>
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Track & Reflect</h3>
              <p className="text-p font-body text-logo/80">Journal your insights and watch patterns emerge</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 font-headers font-light text-logo mb-6">Ready to Unlock Your Destiny?</h2>
          <p className="text-p font-body text-logo/80 mb-8">
            Join thousands of seekers who trust Majestic Tarot for daily guidance and spiritual insight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-accent-purple hover:bg-hover text-logo font-body text-p px-8 py-3 transition-colors duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link href="/cards">
              <Button
                size="lg"
                variant="outline"
                className="border-logo text-logo hover:bg-logo hover:text-primary font-body text-p px-8 py-3 transition-colors duration-300 bg-transparent"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Cards
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
