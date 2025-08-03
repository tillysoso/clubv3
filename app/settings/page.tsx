"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Bell, Mail, Shield, Download, Palette, HelpCircle, SettingsIcon } from "lucide-react"

const settingsCategories = [
  {
    title: "Account",
    description: "Manage your profile and account settings",
    icon: User,
    href: "/settings/account",
    items: ["Profile information", "Password", "Account preferences"],
  },
  {
    title: "Email Reports",
    description: "Schedule automated weekly and monthly insights",
    icon: Mail,
    href: "/settings/email-reports",
    items: ["Weekly reports", "Monthly analysis", "Custom schedules"],
  },
  {
    title: "Notifications",
    description: "Control how and when you receive notifications",
    icon: Bell,
    href: "/settings/notifications",
    items: ["Daily reminders", "Reading alerts", "Achievement notifications"],
  },
  {
    title: "Privacy & Security",
    description: "Manage your privacy settings and data",
    icon: Shield,
    href: "/settings/privacy",
    items: ["Data privacy", "Export data", "Delete account"],
  },
  {
    title: "Appearance",
    description: "Customize the look and feel of your experience",
    icon: Palette,
    href: "/settings/appearance",
    items: ["Theme selection", "Card designs", "Layout preferences"],
  },
  {
    title: "Data & Export",
    description: "Manage your data and export options",
    icon: Download,
    href: "/settings/data",
    items: ["Export readings", "Backup data", "Import from other apps"],
  },
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Customize your Majestic Tarot experience and manage your account
            </p>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.href} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <Link href={category.href}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="group-hover:text-purple-600 transition-colors">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common settings and helpful resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/settings/email-reports">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Set up Email Reports
                </Button>
              </Link>
              <Link href="/daily-card/insights">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Your Data
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help with your settings?</p>
          <div className="flex justify-center space-x-4">
            <Link href="/help">
              <Button variant="outline" className="bg-transparent">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
