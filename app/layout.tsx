import type React from "react"
import type { Metadata } from "next"
import { Seaweed_Script, Bebas_Neue, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"

const seaweedScript = Seaweed_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-seaweed",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Majestic Tarot - Your Digital Spiritual Journey",
  description:
    "Discover ancient wisdom through modern tarot. Get personalized readings, daily guidance, and track your spiritual journey with our comprehensive digital platform.",
  keywords: ["tarot", "spiritual", "readings", "daily card", "mystical", "divination"],
  authors: [{ name: "Majestic Tarot" }],
  creator: "Majestic Tarot",
  publisher: "Majestic Tarot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://majestictarot.com"),
  openGraph: {
    title: "Majestic Tarot - Your Digital Spiritual Journey",
    description:
      "Discover ancient wisdom through modern tarot. Get personalized readings, daily guidance, and track your spiritual journey.",
    url: "https://majestictarot.com",
    siteName: "Majestic Tarot",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Majestic Tarot - Digital Spiritual Journey",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Majestic Tarot - Your Digital Spiritual Journey",
    description:
      "Discover ancient wisdom through modern tarot. Get personalized readings, daily guidance, and track your spiritual journey.",
    images: ["/og-image.jpg"],
    creator: "@majestictarot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${seaweedScript.variable} ${bebasNeue.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2C194F" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${poppins.className} antialiased bg-majestic-primary text-majestic-text min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
