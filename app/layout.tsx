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
  title: "Majestic Tarot - Discover Your Destiny",
  description:
    "Professional tarot readings, daily insights, and spiritual guidance. Unlock the mysteries of your future with our comprehensive tarot experience.",
  keywords: "tarot, readings, spiritual, guidance, cards, fortune, destiny",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${bebasNeue.variable} font-poppins bg-majestic-primary text-majestic-text`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
