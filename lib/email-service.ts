"use client"

export interface EmailSchedule {
  id: string
  frequency: "daily" | "weekly" | "monthly"
  time: string
  enabled: boolean
  lastSent?: string
  nextSend?: string
}

export interface EmailReport {
  id: string
  type: "daily-card" | "weekly-summary" | "monthly-insights"
  content: string
  scheduledFor: string
  sent: boolean
  createdAt: string
}

class EmailService {
  private storageKey = "majestic-email-schedules"
  private reportsKey = "majestic-email-reports"

  private schedules: EmailSchedule[] = []
  private isInitialized = false

  constructor() {
    // Don't initialize in constructor to avoid SSR issues
  }

  initialize() {
    if (typeof window === "undefined" || this.isInitialized) return

    try {
      this.loadSchedules()
      this.isInitialized = true
    } catch (error) {
      console.error("Failed to initialize EmailService:", error)
    }
  }

  private loadSchedules() {
    if (typeof window === "undefined") return

    try {
      const saved = localStorage.getItem(this.storageKey)
      if (saved) {
        this.schedules = JSON.parse(saved)
      }
    } catch (error) {
      console.error("Failed to load email schedules:", error)
      this.schedules = []
    }
  }

  private saveSchedules() {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.schedules))
    } catch (error) {
      console.error("Failed to save email schedules:", error)
    }
  }

  getSchedules(): EmailSchedule[] {
    if (!this.isInitialized) this.initialize()
    return this.schedules
  }

  saveSchedules(schedules: EmailSchedule[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(schedules))
    } catch (error) {
      console.error("Error saving email schedules:", error)
    }
  }

  upsertSchedule(schedule: Omit<EmailSchedule, "id">): EmailSchedule {
    const schedules = this.getSchedules()
    const existingIndex = schedules.findIndex((s) => s.frequency === schedule.frequency)

    const newSchedule: EmailSchedule = {
      ...schedule,
      id: existingIndex >= 0 ? schedules[existingIndex].id : this.generateId(),
      nextSend: this.calculateNextSend(schedule.frequency, schedule.time),
    }

    if (existingIndex >= 0) {
      schedules[existingIndex] = newSchedule
    } else {
      schedules.push(newSchedule)
    }

    this.saveSchedules(schedules)
    return newSchedule
  }

  deleteSchedule(id: string): void {
    const schedules = this.getSchedules().filter((s) => s.id !== id)
    this.saveSchedules(schedules)
  }

  toggleSchedule(id: string): void {
    const schedules = this.getSchedules()
    const schedule = schedules.find((s) => s.id === id)

    if (schedule) {
      schedule.enabled = !schedule.enabled
      if (schedule.enabled) {
        schedule.nextSend = this.calculateNextSend(schedule.frequency, schedule.time)
      }
      this.saveSchedules(schedules)
    }
  }

  getReports(): EmailReport[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.reportsKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading email reports:", error)
      return []
    }
  }

  saveReports(reports: EmailReport[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.reportsKey, JSON.stringify(reports))
    } catch (error) {
      console.error("Error saving email reports:", error)
    }
  }

  createReport(report: Omit<EmailReport, "id" | "createdAt">): EmailReport {
    const reports = this.getReports()
    const newReport: EmailReport = {
      ...report,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    }

    reports.unshift(newReport) // Add to beginning
    this.saveReports(reports.slice(0, 100)) // Keep only last 100 reports
    return newReport
  }

  markReportSent(id: string): void {
    const reports = this.getReports()
    const report = reports.find((r) => r.id === id)

    if (report) {
      report.sent = true
      this.saveReports(reports)
    }
  }

  private calculateNextSend(frequency: EmailSchedule["frequency"], time: string): string {
    const now = new Date()
    const [hours, minutes] = time.split(":").map(Number)

    const nextSend = new Date()
    nextSend.setHours(hours, minutes, 0, 0)

    // If time has passed today, move to next occurrence
    if (nextSend <= now) {
      switch (frequency) {
        case "daily":
          nextSend.setDate(nextSend.getDate() + 1)
          break
        case "weekly":
          nextSend.setDate(nextSend.getDate() + 7)
          break
        case "monthly":
          nextSend.setMonth(nextSend.getMonth() + 1)
          break
      }
    }

    return nextSend.toISOString()
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  async sendEmail(to: string, subject: string, content: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate 95% success rate
    const success = Math.random() > 0.05

    if (success) {
      console.log(`Email sent to ${to}: ${subject}`)
    } else {
      console.error(`Failed to send email to ${to}`)
    }

    return success
  }

  async processPendingSchedules(): Promise<void> {
    const schedules = this.getSchedules().filter((s) => s.enabled)
    const now = new Date()

    for (const schedule of schedules) {
      if (schedule.nextSend && new Date(schedule.nextSend) <= now) {
        try {
          // Generate content based on schedule type
          const content = await this.generateEmailContent(schedule.frequency)

          // Create report
          const report = this.createReport({
            type: this.getReportType(schedule.frequency),
            content,
            scheduledFor: schedule.nextSend,
            sent: false,
          })

          // Send email (in real app, you'd have user's email)
          const success = await this.sendEmail(
            "user@example.com", // Would be actual user email
            this.getEmailSubject(schedule.frequency),
            content,
          )

          if (success) {
            this.markReportSent(report.id)

            // Update schedule for next send
            schedule.lastSent = now.toISOString()
            schedule.nextSend = this.calculateNextSend(schedule.frequency, schedule.time)
          }
        } catch (error) {
          console.error("Error processing schedule:", error)
        }
      }
    }

    this.saveSchedules(schedules)
  }

  private getReportType(frequency: EmailSchedule["frequency"]): EmailReport["type"] {
    switch (frequency) {
      case "daily":
        return "daily-card"
      case "weekly":
        return "weekly-summary"
      case "monthly":
        return "monthly-insights"
    }
  }

  private getEmailSubject(frequency: EmailSchedule["frequency"]): string {
    switch (frequency) {
      case "daily":
        return "Your Daily Tarot Card"
      case "weekly":
        return "Your Weekly Tarot Summary"
      case "monthly":
        return "Your Monthly Tarot Insights"
    }
  }

  private async generateEmailContent(frequency: EmailSchedule["frequency"]): Promise<string> {
    // In a real app, this would generate actual tarot content
    switch (frequency) {
      case "daily":
        return `
          <h2>Your Daily Tarot Card</h2>
          <p>Today's card brings wisdom and guidance for your journey ahead.</p>
          <div style="text-align: center; margin: 20px 0;">
            <h3>The Star</h3>
            <p><em>Hope, inspiration, and spiritual guidance</em></p>
          </div>
          <p>The Star card encourages you to have faith in the future and trust in your inner wisdom...</p>
        `
      case "weekly":
        return `
          <h2>Your Weekly Tarot Summary</h2>
          <p>Reflecting on the past week's spiritual journey and looking ahead.</p>
          <h3>Key Themes This Week:</h3>
          <ul>
            <li>Personal growth and transformation</li>
            <li>New opportunities on the horizon</li>
            <li>Trust in your intuitive abilities</li>
          </ul>
        `
      case "monthly":
        return `
          <h2>Your Monthly Tarot Insights</h2>
          <p>A deeper look at your spiritual journey over the past month.</p>
          <h3>Monthly Overview:</h3>
          <p>This month has been a time of significant personal development...</p>
          <h3>Looking Ahead:</h3>
          <p>The coming month holds promise for new beginnings and creative expression...</p>
        `
    }
  }
}

export const emailService = new EmailService()
