import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Sparkles, BookOpen, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-majestic-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-majestic-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-majestic-primary/50 to-majestic-primary"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-h1 font-bebas font-header text-majestic-text mb-6">
            Discover Your Path with Majestic Tarot
          </h1>
          <p className="text-p font-poppins text-majestic-text/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unlock the mysteries of your future with personalized tarot readings, daily insights, and a comprehensive
            journal to track your spiritual journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-majestic-text font-poppins transition-colors duration-300 px-8 py-3 border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-p">Start Free Journey</span>
              </Button>
            </Link>
            <Link href="/daily-card">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-majestic-text text-majestic-text hover:bg-majestic-text hover:text-majestic-primary font-poppins transition-colors duration-300 px-8 py-3 bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-p">Get Daily Card</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-majestic-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 font-bebas font-header text-majestic-text text-center mb-12">
            Your Spiritual Journey Awaits
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-majestic-primary/80 backdrop-blur-md border border-majestic-text/20 rounded-lg hover:bg-majestic-primary/60 hover:border-majestic-hover/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-majestic-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-majestic-accent-purple" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Daily Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-poppins text-majestic-text/80 text-center">
                  Receive personalized daily tarot insights to guide your decisions and illuminate your path forward.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-majestic-primary/80 backdrop-blur-md border border-majestic-text/20 rounded-lg hover:bg-majestic-primary/60 hover:border-majestic-hover/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-majestic-accent-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-majestic-accent-red" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Tarot Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-poppins text-majestic-text/80 text-center">
                  Document your readings, track patterns, and reflect on your spiritual growth with our intuitive
                  journal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-majestic-primary/80 backdrop-blur-md border border-majestic-text/20 rounded-lg hover:bg-majestic-primary/60 hover:border-majestic-hover/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-majestic-hover/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-majestic-hover" />
                </div>
                <CardTitle className="text-h4 font-bebas font-header text-majestic-text">Card Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-p font-poppins text-majestic-text/80 text-center">
                  Explore detailed meanings and interpretations of all 78 tarot cards in our comprehensive library.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-majestic-primary/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-bebas font-header text-majestic-text mb-12">Begin Your Journey in Three Steps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-majestic-accent-purple rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-bebas font-header text-majestic-text">1</span>
              </div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text">Create Account</h3>
              <p className="text-p font-poppins text-majestic-text/80">
                Sign up for free and set your spiritual intentions
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-majestic-accent-red rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-bebas font-header text-majestic-text">2</span>
              </div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text">Draw Your Cards</h3>
              <p className="text-p font-poppins text-majestic-text/80">
                Receive daily guidance and explore different spreads
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-majestic-hover rounded-full flex items-center justify-center mx-auto">
                <span className="text-h5 font-bebas font-header text-majestic-primary">3</span>
              </div>
              <h3 className="text-h5 font-bebas font-header text-majestic-text">Track & Reflect</h3>
              <p className="text-p font-poppins text-majestic-text/80">
                Journal your insights and watch patterns emerge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-majestic-primary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 font-bebas font-header text-majestic-text mb-6">Ready to Unlock Your Destiny?</h2>
          <p className="text-p font-poppins text-majestic-text/80 mb-8">
            Join thousands of seekers who trust Majestic Tarot for daily guidance and spiritual insight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-majestic-accent-purple hover:bg-majestic-hover hover:text-majestic-primary text-majestic-text font-poppins transition-colors duration-300 px-8 py-3 border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-p">Start Your Journey</span>
              </Button>
            </Link>
            <Link href="/cards">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-majestic-text text-majestic-text hover:bg-majestic-text hover:text-majestic-primary font-poppins transition-colors duration-300 px-8 py-3 bg-transparent"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="text-p">Explore Cards</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
