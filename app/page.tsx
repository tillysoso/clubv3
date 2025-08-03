import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Sparkles, BookOpen, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-h1 font-headers font-light text-logo mb-6">Discover Your Path with Majestic Tarot</h1>
          <p className="text-p font-body text-logo/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unlock the mysteries of your future with personalized tarot readings, daily insights, and a comprehensive
            journal to track your spiritual journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-accent-purple hover:bg-hover text-logo font-body text-p px-8 py-3 transition-colors duration-300 border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Free Journey
              </Button>
            </Link>
            <Link href="/daily-card">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-logo text-logo hover:bg-logo hover:text-primary font-body text-p px-8 py-3 transition-colors duration-300 bg-transparent"
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
            <Card className="glass-card border-logo/20 hover:border-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-purple/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Daily Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Start each day with personalized tarot insights and guidance for your path ahead.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-logo/20 hover:border-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-red/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-accent-red" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Spiritual Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Document your readings, insights, and spiritual growth with our comprehensive journal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-logo/20 hover:border-hover/50 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-hover/20 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-hover" />
                </div>
                <CardTitle className="text-h4 font-headers font-light text-logo">Card Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-body text-logo/80 text-center">
                  Explore the complete tarot deck with detailed meanings and interpretations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-primary/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-headers font-light text-logo mb-12">Begin Your Journey in Three Steps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-accent-purple rounded-full flex items-center justify-center text-logo font-headers text-h5">
                1
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Draw Your Cards</h3>
              <p className="text-p font-body text-logo/80">
                Select from various spreads or get your daily card for instant guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-accent-red rounded-full flex items-center justify-center text-logo font-headers text-h5">
                2
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Receive Insights</h3>
              <p className="text-p font-body text-logo/80">
                Get detailed interpretations and meanings tailored to your situation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-hover rounded-full flex items-center justify-center text-primary font-headers text-h5">
                3
              </div>
              <h3 className="text-h5 font-headers font-light text-logo">Track Your Growth</h3>
              <p className="text-p font-body text-logo/80">
                Journal your experiences and watch your spiritual journey unfold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 font-headers font-light text-logo mb-6">Ready to Unlock Your Destiny?</h2>
          <p className="text-p font-body text-logo/90 mb-8">
            Join thousands of seekers who have discovered clarity and guidance through Majestic Tarot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-accent-purple hover:bg-hover text-logo font-body text-p px-8 py-3 transition-colors duration-300 border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Free Journey
              </Button>
            </Link>
            <Link href="/cards">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-logo text-logo hover:bg-logo hover:text-primary font-body text-p px-8 py-3 transition-colors duration-300 bg-transparent"
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
