import { Activity } from '../types'

export interface DaySummary {
  date: string // YYYY-MM-DD format
  totalFeeding: number // in milliseconds
  totalPumping: number // in ml
  totalSleep: number // in milliseconds
  totalPlay: number // in milliseconds
  feedingCount: number
  pumpingCount: number
  sleepCount: number
  playCount: number
  diaperCount: number
  healthCount: number
  measurementCount: number
}

/**
 * Check if a timestamp falls on a specific date (in local timezone)
 */
const isSameDay = (timestamp: number, targetDate: Date): boolean => {
  const activityDate = new Date(timestamp)
  return (
    activityDate.getFullYear() === targetDate.getFullYear() &&
    activityDate.getMonth() === targetDate.getMonth() &&
    activityDate.getDate() === targetDate.getDate()
  )
}

/**
 * Calculate duration for an activity in milliseconds
 */
const calculateDuration = (activity: Activity): number => {
  if (!activity.endTime) {
    return 0
  }
  return activity.endTime - activity.startTime
}

/**
 * Calculate summary statistics for a specific day
 */
export const calculateDaySummary = (
  activities: Activity[],
  date: Date
): DaySummary => {
  const dateString = date.toISOString().split('T')[0]

  const dayActivities = activities.filter((activity) =>
    isSameDay(activity.startTime, date)
  )

  const summary: DaySummary = {
    date: dateString,
    totalFeeding: 0,
    totalPumping: 0,
    totalSleep: 0,
    totalPlay: 0,
    feedingCount: 0,
    pumpingCount: 0,
    sleepCount: 0,
    playCount: 0,
    diaperCount: 0,
    healthCount: 0,
    measurementCount: 0,
  }

  dayActivities.forEach((activity) => {
    switch (activity.type) {
      case 'feeding':
        summary.feedingCount++
        summary.totalFeeding += calculateDuration(activity)
        break
      case 'pumping':
        summary.pumpingCount++
        if (activity.value) {
          summary.totalPumping += activity.value
        }
        break
      case 'sleeping':
        summary.sleepCount++
        summary.totalSleep += calculateDuration(activity)
        break
      case 'playing':
        summary.playCount++
        summary.totalPlay += calculateDuration(activity)
        break
      case 'diaper_change':
        summary.diaperCount++
        break
      case 'health':
        summary.healthCount++
        break
      case 'measurements':
        summary.measurementCount++
        break
    }
  })

  return summary
}

/**
 * Get today's date at midnight (local timezone)
 */
export const getTodayDate = (): Date => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Format duration in milliseconds to readable format
 */
export const formatSummaryDuration = (ms: number): string => {
  if (ms === 0) return '0m'

  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
}

/**
 * Format date for display
 */
export const formatSummaryDate = (date: Date): string => {
  const today = getTodayDate()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
}
