"use client"

import Link from "next/link"
import { Sparkles, Heart, Mail, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-majestic-primary border-t border-majestic-text/20 mt-auto">
      <div className="container py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo and Tagline */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-majestic-accent-purple to-majestic-accent-red rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-majestic-text" />
              </div>
              <span className="text-logo text-xl">Majestic Tarot</span>
            </Link>
            <p className="text-p text-majestic-text/70 text-center md:text-left">
              Your digital spiritual journey awaits
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-p text-majestic-text/80 hover:text-majestic-hover transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-p text-majestic-text/80 hover:text-majestic-hover transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-p text-majestic-text/80 hover:text-majestic-hover transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-p text-majestic-text/80 hover:text-majestic-hover transition-colors">
              Contact
            </Link>
            <Link href="/help" className="text-p text-majestic-text/80 hover:text-majestic-hover transition-colors">
              Help
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-majestic-text/60 hover:text-majestic-hover transition-colors">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-majestic-text/60 hover:text-majestic-hover transition-colors">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-majestic-text/60 hover:text-majestic-hover transition-colors">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:hello@majestictarot.com"
              className="text-majestic-text/60 hover:text-majestic-hover transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 mt-6 border-t border-majestic-text/20 space-y-2 md:space-y-0">
          <p className="text-p text-majestic-text/60 text-center md:text-left">
            © 2024 Majestic Tarot. All rights reserved.
          </p>
          <p className="flex items-center text-p text-majestic-text/60">
            Made with <Heart className="h-3 w-3 mx-1 text-majestic-accent-red" /> for spiritual seekers
          </p>
        </div>
      </div>
    </footer>
  )
}
