"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Trash2, Mail, Clock, CheckCircle, XCircle } from "lucide-react"
import { emailService, type EmailSchedule, type EmailReport } from "@/lib/email-service"

export default function EmailReportsPage() {
  const [schedules, setSchedules] = useState<EmailSchedule[]>([])
  const [reports, setReports] = useState<EmailReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Form state
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [time, setTime] = useState("09:00")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      loadData()
    }
  }, [isMounted])

  const loadData = () => {
    try {
      const loadedSchedules = emailService.getSchedules()
      const loadedReports = emailService.getReports()
      setSchedules(loadedSchedules)
      setReports(loadedReports)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSchedule = async () => {
    setIsSubmitting(true)
    try {
      const newSchedule = emailService.upsertSchedule({
        frequency,
        time,
        enabled: true,
      })
      setSchedules((prev) => {
        const filtered = prev.filter((s) => s.frequency !== frequency)
        return [...filtered, newSchedule]
      })

      // Reset form
      setFrequency("daily")
      setTime("09:00")
    } catch (error) {
      console.error("Error creating schedule:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleSchedule = (id: string) => {
    emailService.toggleSchedule(id)
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const handleDeleteSchedule = (id: string) => {
    emailService.deleteSchedule(id)
    setSchedules((prev) => prev.filter((s) => s.id !== id))
  }

  const formatNextSend = (nextSend?: string) => {
    if (!nextSend) return "Not scheduled"
    const date = new Date(nextSend)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatReportDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-majestic-primary flex items-center justify-center">
        <div className="text-majestic-text">Loading...</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-majestic-primary flex items-center justify-center">
        <div className="text-majestic-text">Loading email settings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-majestic-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-h1 text-majestic-text">Email Reports</h1>
            <p className="text-majestic-text/80 max-w-2xl mx-auto">
              Schedule automated email reports to receive your tarot insights directly in your inbox.
            </p>
          </div>

          {/* Create Schedule Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-h3 text-majestic-text flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Create Email Schedule
              </CardTitle>
              <CardDescription className="text-majestic-text/70">
                Set up automated email reports for your tarot readings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-majestic-text">
                    Frequency
                  </Label>
                  <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
                    <SelectTrigger className="sleek-input">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-majestic-primary border-majestic-text/20">
                      <SelectItem value="daily" className="text-majestic-text hover:bg-majestic-text/10">
                        Daily Card
                      </SelectItem>
                      <SelectItem value="weekly" className="text-majestic-text hover:bg-majestic-text/10">
                        Weekly Summary
                      </SelectItem>
                      <SelectItem value="monthly" className="text-majestic-text hover:bg-majestic-text/10">
                        Monthly Insights
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-majestic-text">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="sleek-input"
                  />
                </div>
              </div>

              <Button onClick={handleCreateSchedule} disabled={isSubmitting} className="glass-button w-full">
                {isSubmitting ? "Creating..." : "Create Schedule"}
              </Button>
            </CardContent>
          </Card>

          {/* Active Schedules */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-h3 text-majestic-text flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Active Schedules
              </CardTitle>
              <CardDescription className="text-majestic-text/70">Manage your email report schedules</CardDescription>
            </CardHeader>
            <CardContent>
              {schedules.length === 0 ? (
                <div className="text-center py-8 text-majestic-text/60">No email schedules configured yet.</div>
              ) : (
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-majestic-text/5 border border-majestic-text/10"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-majestic-text font-medium capitalize">
                            {schedule.frequency} Reports
                          </span>
                          {schedule.enabled ? (
                            <CheckCircle className="w-4 h-4 text-majestic-hover" />
                          ) : (
                            <XCircle className="w-4 h-4 text-majestic-accent-red" />
                          )}
                        </div>
                        <div className="text-sm text-majestic-text/70">
                          {schedule.enabled ? <>Next: {formatNextSend(schedule.nextSend)}</> : "Disabled"}
                        </div>
                        <div className="text-sm text-majestic-text/70">Time: {schedule.time}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch checked={schedule.enabled} onCheckedChange={() => handleToggleSchedule(schedule.id)} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="text-majestic-accent-red hover:bg-majestic-accent-red/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-h3 text-majestic-text">Recent Reports</CardTitle>
              <CardDescription className="text-majestic-text/70">View your recent email reports</CardDescription>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8 text-majestic-text/60">No reports generated yet.</div>
              ) : (
                <div className="space-y-4">
                  {reports.slice(0, 10).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-majestic-text/5 border border-majestic-text/10"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-majestic-text font-medium capitalize">
                            {report.type.replace("-", " ")}
                          </span>
                          {report.sent ? (
                            <CheckCircle className="w-4 h-4 text-majestic-hover" />
                          ) : (
                            <Clock className="w-4 h-4 text-majestic-accent-purple" />
                          )}
                        </div>
                        <div className="text-sm text-majestic-text/70">
                          {report.sent ? "Sent" : "Scheduled for"}: {formatReportDate(report.scheduledFor)}
                        </div>
                        <div className="text-sm text-majestic-text/70">
                          Created: {formatReportDate(report.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
