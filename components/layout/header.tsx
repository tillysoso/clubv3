"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Sparkles, User, Settings } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Daily Card", href: "/daily-card" },
  { name: "Readings", href: "/readings" },
  { name: "Cards", href: "/cards" },
  { name: "Journal", href: "/journal" },
  { name: "Blog", href: "/blog" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-majestic-text/20 bg-majestic-primary/95 backdrop-blur supports-[backdrop-filter]:bg-majestic-primary/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-majestic-accent-purple to-majestic-accent-red rounded-full flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-majestic-text" />
          </div>
          <span className="text-logo text-2xl">Majestic Tarot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-p transition-colors hover:text-majestic-hover ${
                pathname === item.href ? "text-majestic-hover font-medium" : "text-majestic-text"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="btn-ghost">
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-p">Settings</span>
            </Button>
          </Link>
          <Link href="/signin">
            <Button size="sm" className="btn-primary">
              <User className="h-4 w-4 mr-2" />
              <span className="text-p">Sign In</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="btn-ghost">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-majestic-primary border-majestic-text/20">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between pb-6 border-b border-majestic-text/20">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="w-6 h-6 bg-gradient-to-br from-majestic-accent-purple to-majestic-accent-red rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-majestic-text" />
                  </div>
                  <span className="text-logo text-xl">Majestic Tarot</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="btn-ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4 py-6 flex-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-p transition-colors hover:text-majestic-hover px-2 py-1 rounded ${
                      pathname === item.href
                        ? "text-majestic-hover font-medium bg-majestic-hover/10"
                        : "text-majestic-text"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-majestic-text/20">
                <Link href="/settings" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start btn-ghost">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="text-p">Settings</span>
                  </Button>
                </Link>
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  <Button className="w-full btn-primary">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-p">Sign In</span>
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
