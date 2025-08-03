import jsPDF from "jspdf"
import "jspdf-autotable"

interface DailyDraw {
  id: string
  date: string
  card: {
    name: string
    slug: string
    suit?: string
    keywords: string[]
    arcana: string
  }
  question: string
  focusArea: string
  currentMood: string
  personalInterpretation: string
  isReversed: boolean
}

interface WeeklyInsight {
  weekStart: string
  weekEnd: string
  draws: DailyDraw[]
  dominantSuit?: string
  dominantFocus: string
  dominantMood: string
  reversedCount: number
  themes: string[]
  moodTrend: "improving" | "declining" | "stable"
}

interface MonthlyInsight {
  month: string
  year: number
  draws: DailyDraw[]
  totalDraws: number
  suitDistribution: Record<string, number>
  focusDistribution: Record<string, number>
  moodDistribution: Record<string, number>
  reversedPercentage: number
  topCards: Array<{ name: string; count: number }>
  topThemes: Array<{ theme: string; count: number }>
  streakDays: number
  insights: string[]
}

const focusAreaLabels = {
  love: "Love & Relationships",
  career: "Career & Work",
  personal: "Personal Growth",
  health: "Health & Wellness",
  finances: "Money & Finances",
  spirituality: "Spirituality",
  general: "General Guidance",
}

const moodLabels = {
  optimistic: "Optimistic",
  anxious: "Anxious",
  confused: "Confused",
  excited: "Excited",
  peaceful: "Peaceful",
  frustrated: "Frustrated",
  curious: "Curious",
}

// CSV Export Functions
export function exportDailyDrawsToCSV(draws: DailyDraw[]): void {
  const headers = [
    "Date",
    "Card Name",
    "Suit",
    "Arcana",
    "Is Reversed",
    "Focus Area",
    "Current Mood",
    "Question",
    "Keywords",
    "Personal Interpretation",
  ]

  const csvData = draws.map((draw) => [
    draw.date,
    draw.card.name,
    draw.card.suit || "N/A",
    draw.card.arcana,
    draw.isReversed ? "Yes" : "No",
    focusAreaLabels[draw.focusArea as keyof typeof focusAreaLabels] || draw.focusArea,
    moodLabels[draw.currentMood as keyof typeof moodLabels] || draw.currentMood,
    `"${draw.question.replace(/"/g, '""')}"`,
    `"${draw.card.keywords.join(", ")}"`,
    `"${draw.personalInterpretation.replace(/"/g, '""')}"`,
  ])

  const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

  downloadFile(csvContent, "daily-card-draws.csv", "text/csv")
}

export function exportWeeklyInsightsToCSV(weeklyInsights: WeeklyInsight[]): void {
  const headers = [
    "Week Start",
    "Week End",
    "Total Draws",
    "Dominant Suit",
    "Dominant Focus",
    "Dominant Mood",
    "Reversed Count",
    "Mood Trend",
    "Key Themes",
  ]

  const csvData = weeklyInsights.map((week) => [
    week.weekStart,
    week.weekEnd,
    week.draws.length.toString(),
    week.dominantSuit || "N/A",
    focusAreaLabels[week.dominantFocus as keyof typeof focusAreaLabels] || week.dominantFocus,
    moodLabels[week.dominantMood as keyof typeof moodLabels] || week.dominantMood,
    week.reversedCount.toString(),
    week.moodTrend,
    `"${week.themes.join(", ")}"`,
  ])

  const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

  downloadFile(csvContent, "weekly-insights.csv", "text/csv")
}

export function exportMonthlyInsightsToCSV(monthlyInsights: MonthlyInsight[]): void {
  const headers = [
    "Month",
    "Year",
    "Total Draws",
    "Longest Streak",
    "Reversed Percentage",
    "Top Card",
    "Top Theme",
    "Dominant Focus",
    "Key Insights",
  ]

  const csvData = monthlyInsights.map((month) => [
    month.month,
    month.year.toString(),
    month.totalDraws.toString(),
    month.streakDays.toString(),
    Math.round(month.reversedPercentage).toString() + "%",
    month.topCards[0]?.name || "N/A",
    month.topThemes[0]?.theme || "N/A",
    Object.entries(month.focusDistribution).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A",
    `"${month.insights.join("; ")}"`,
  ])

  const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

  downloadFile(csvContent, "monthly-insights.csv", "text/csv")
}

// PDF Export Functions
export function exportInsightsToPDF(
  draws: DailyDraw[],
  weeklyInsights: WeeklyInsight[],
  monthlyInsights: MonthlyInsight[],
  selectedPeriod?: { type: "week" | "month"; value: string },
): void {
  const doc = new jsPDF()
  let yPosition = 20

  // Header
  doc.setFontSize(20)
  doc.setTextColor(75, 0, 130) // Purple color
  doc.text("Majestic Tarot - Daily Card Insights Report", 20, yPosition)
  yPosition += 15

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, yPosition)
  yPosition += 20

  // Overall Statistics
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Overall Statistics", 20, yPosition)
  yPosition += 10

  const overallStats = [
    ["Total Daily Draws", draws.length.toString()],
    ["Longest Streak", Math.max(...monthlyInsights.map((m) => m.streakDays), 0).toString() + " days"],
    ["Upright Cards", Math.round((draws.filter((d) => !d.isReversed).length / draws.length) * 100) + "%"],
    ["Months Tracked", monthlyInsights.length.toString()],
    [
      "Most Common Focus",
      Object.entries(
        draws.reduce(
          (acc, draw) => {
            acc[draw.focusArea] = (acc[draw.focusArea] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
      ).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A",
    ],
  ]

  // @ts-ignore - jsPDF autoTable types
  doc.autoTable({
    startY: yPosition,
    head: [["Metric", "Value"]],
    body: overallStats,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })

  // @ts-ignore
  yPosition = doc.lastAutoTable.finalY + 20

  // Selected Period Analysis
  if (selectedPeriod) {
    if (selectedPeriod.type === "week") {
      const weekData = weeklyInsights.find((w) => w.weekStart === selectedPeriod.value)
      if (weekData) {
        addWeeklyAnalysisToPDF(doc, weekData, yPosition)
      }
    } else if (selectedPeriod.type === "month") {
      const monthData = monthlyInsights.find((m) => m.month === selectedPeriod.value)
      if (monthData) {
        addMonthlyAnalysisToPDF(doc, monthData, yPosition)
      }
    }
  } else {
    // Add recent monthly summary if no specific period selected
    if (monthlyInsights.length > 0) {
      addMonthlyAnalysisToPDF(doc, monthlyInsights[0], yPosition)
    }
  }

  // Save the PDF
  const filename = selectedPeriod
    ? `tarot-insights-${selectedPeriod.type}-${selectedPeriod.value}.pdf`
    : "tarot-insights-report.pdf"

  doc.save(filename)
}

function addWeeklyAnalysisToPDF(doc: jsPDF, weekData: WeeklyInsight, startY: number): void {
  let yPosition = startY

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Weekly Analysis", 20, yPosition)
  yPosition += 5

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(
    `${new Date(weekData.weekStart).toLocaleDateString()} - ${new Date(weekData.weekEnd).toLocaleDateString()}`,
    20,
    yPosition,
  )
  yPosition += 15

  const weeklyStats = [
    ["Cards Drawn", weekData.draws.length.toString() + " days"],
    [
      "Dominant Focus",
      focusAreaLabels[weekData.dominantFocus as keyof typeof focusAreaLabels] || weekData.dominantFocus,
    ],
    ["Dominant Mood", moodLabels[weekData.dominantMood as keyof typeof moodLabels] || weekData.dominantMood],
    ["Mood Trend", weekData.moodTrend.charAt(0).toUpperCase() + weekData.moodTrend.slice(1)],
    ["Reversed Cards", `${weekData.reversedCount} / ${weekData.draws.length}`],
    ["Key Themes", weekData.themes.join(", ")],
  ]

  // @ts-ignore
  doc.autoTable({
    startY: yPosition,
    head: [["Aspect", "Details"]],
    body: weeklyStats,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })

  // Daily cards table
  // @ts-ignore
  yPosition = doc.lastAutoTable.finalY + 15

  if (yPosition > 220) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.text("Daily Cards This Week", 20, yPosition)
  yPosition += 10

  const dailyCards = weekData.draws.map((draw) => [
    new Date(draw.date).toLocaleDateString(),
    draw.card.name,
    draw.isReversed ? "Reversed" : "Upright",
    focusAreaLabels[draw.focusArea as keyof typeof focusAreaLabels] || draw.focusArea,
  ])

  // @ts-ignore
  doc.autoTable({
    startY: yPosition,
    head: [["Date", "Card", "Orientation", "Focus Area"]],
    body: dailyCards,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })
}

function addMonthlyAnalysisToPDF(doc: jsPDF, monthData: MonthlyInsight, startY: number): void {
  let yPosition = startY

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Monthly Analysis", 20, yPosition)
  yPosition += 5

  const monthDate = new Date(monthData.month + "-01")
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(monthDate.toLocaleDateString("en-US", { year: "numeric", month: "long" }), 20, yPosition)
  yPosition += 15

  const monthlyStats = [
    ["Total Draws", monthData.totalDraws.toString()],
    ["Longest Streak", monthData.streakDays.toString() + " days"],
    ["Reversed Percentage", Math.round(monthData.reversedPercentage) + "%"],
    ["Most Common Card", monthData.topCards[0]?.name || "N/A"],
    ["Top Theme", monthData.topThemes[0]?.theme || "N/A"],
  ]

  // @ts-ignore
  doc.autoTable({
    startY: yPosition,
    head: [["Metric", "Value"]],
    body: monthlyStats,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })

  // @ts-ignore
  yPosition = doc.lastAutoTable.finalY + 15

  // Focus Area Distribution
  if (yPosition > 200) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.text("Focus Area Distribution", 20, yPosition)
  yPosition += 10

  const focusData = Object.entries(monthData.focusDistribution)
    .sort(([, a], [, b]) => b - a)
    .map(([focus, count]) => [
      focusAreaLabels[focus as keyof typeof focusAreaLabels] || focus,
      count.toString(),
      Math.round((count / monthData.totalDraws) * 100) + "%",
    ])

  // @ts-ignore
  doc.autoTable({
    startY: yPosition,
    head: [["Focus Area", "Count", "Percentage"]],
    body: focusData,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })

  // Monthly Insights
  // @ts-ignore
  yPosition = doc.lastAutoTable.finalY + 15

  if (yPosition > 220) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.text("Key Insights", 20, yPosition)
  yPosition += 10

  monthData.insights.forEach((insight, index) => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const lines = doc.splitTextToSize(`• ${insight}`, 170)
    doc.text(lines, 20, yPosition)
    yPosition += lines.length * 5 + 5
  })
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Export individual daily draw as PDF
export function exportDailyDrawToPDF(draw: DailyDraw): void {
  const doc = new jsPDF()
  let yPosition = 20

  // Header
  doc.setFontSize(20)
  doc.setTextColor(75, 0, 130)
  doc.text("Daily Card Reading Report", 20, yPosition)
  yPosition += 15

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(`Date: ${new Date(draw.date).toLocaleDateString()}`, 20, yPosition)
  yPosition += 20

  // Card Information
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text(`Card: ${draw.card.name}${draw.isReversed ? " (Reversed)" : ""}`, 20, yPosition)
  yPosition += 15

  // Details table
  const cardDetails = [
    ["Suit", draw.card.suit ? draw.card.suit.charAt(0).toUpperCase() + draw.card.suit.slice(1) : "Major Arcana"],
    ["Arcana", draw.card.arcana.charAt(0).toUpperCase() + draw.card.arcana.slice(1)],
    ["Focus Area", focusAreaLabels[draw.focusArea as keyof typeof focusAreaLabels] || draw.focusArea],
    ["Your Mood", moodLabels[draw.currentMood as keyof typeof moodLabels] || draw.currentMood],
    ["Keywords", draw.card.keywords.join(", ")],
  ]

  // @ts-ignore
  doc.autoTable({
    startY: yPosition,
    head: [["Aspect", "Details"]],
    body: cardDetails,
    theme: "grid",
    headStyles: { fillColor: [75, 0, 130] },
    margin: { left: 20, right: 20 },
  })

  // @ts-ignore
  yPosition = doc.lastAutoTable.finalY + 20

  // Your Question
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text("Your Question:", 20, yPosition)
  yPosition += 10

  doc.setFontSize(11)
  const questionLines = doc.splitTextToSize(draw.question, 170)
  doc.text(questionLines, 20, yPosition)
  yPosition += questionLines.length * 5 + 15

  // Personal Interpretation
  doc.setFontSize(14)
  doc.text("Personal Interpretation:", 20, yPosition)
  yPosition += 10

  doc.setFontSize(11)
  const interpretationLines = doc.splitTextToSize(draw.personalInterpretation, 170)
  doc.text(interpretationLines, 20, yPosition)

  doc.save(`daily-card-${draw.date}-${draw.card.name.replace(/\s+/g, "-").toLowerCase()}.pdf`)
}
