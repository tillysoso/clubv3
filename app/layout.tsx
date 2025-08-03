import type React from "react"
import type { Metadata } from "next"
import { Poppins, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Majestic Tarot - Your Spiritual Journey Awaits",
  description:
    "Discover the mystical world of tarot with personalized readings, daily insights, and spiritual guidance.",
  keywords: "tarot, spirituality, readings, mystical, guidance, cards",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen bg-majestic-primary text-majestic-text font-poppins">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
