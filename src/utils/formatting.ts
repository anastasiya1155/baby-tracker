import { ActivitySubcategory } from '../types'

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(date: Date): string {
  const now = new Date()
  const activityDate = new Date(date)

  // Reset time parts for comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const compareDate = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate())

  const diffTime = today.getTime() - compareDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return activityDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function formatDuration(startTime: Date, endTime: Date): string {
  const duration = endTime.getTime() - startTime.getTime()
  const hours = Math.floor(duration / (1000 * 60 * 60))
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((duration % (1000 * 60)) / 1000)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

export function getSubcategoryLabel(subcategory?: ActivitySubcategory): string {
  if (!subcategory) return ''

  const labels: Record<ActivitySubcategory, string> = {
    // Feeding
    left_breast: 'Left Breast',
    right_breast: 'Right Breast',
    bottle: 'Bottle',
    solids: 'Solids',
    // Diaper
    wet: 'Wet',
    dirty: 'Dirty',
    // Sleep
    night: 'Night',
    nap: 'Nap',
    // Play
    tummy_time: 'Tummy Time',
    outdoors: 'Outdoors',
    bath: 'Bath',
    gym: 'Gym',
    // Health
    vaccination: 'Vaccination',
    medicine: 'Medicine',
    sick: 'Sick',
    temperature: 'Temperature',
    // Measurements
    height: 'Height',
    weight: 'Weight',
    head: 'Head',
    // Pumping
    left: 'Left',
    right: 'Right',
    both: 'Both',
  }

  return labels[subcategory] || subcategory
}

export function getUnit(subcategory?: ActivitySubcategory): string {
  if (!subcategory) return ''

  const units: Partial<Record<ActivitySubcategory, string>> = {
    bottle: 'oz',
    left_breast: 'min',
    right_breast: 'min',
    solids: 'oz',
    temperature: '°F',
    height: 'cm',
    weight: 'kg',
    head: 'cm',
    left: 'ml',
    right: 'ml',
    both: 'ml',
  }

  return units[subcategory] || ''
}

export function formatTimeSince(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const days = Math.floor(totalHours / 24)

  if (days > 0) {
    const remainingHours = totalHours % 24
    if (remainingHours > 0) {
      return `${days} d ${remainingHours} h`
    }
    return `${days} d`
  }

  if (totalHours > 0) {
    const remainingMinutes = totalMinutes % 60
    if (remainingMinutes > 0) {
      return `${totalHours} h ${remainingMinutes} m`
    }
    return `${totalHours} h`
  }

  if (totalMinutes > 0) {
    return `${totalMinutes} m`
  }

  return `${totalSeconds} s`
}
