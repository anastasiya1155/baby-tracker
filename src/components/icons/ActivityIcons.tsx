interface IconProps {
  className?: string
}

export function FeedingIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v7a4 4 0 0 0 4 4v8" />
      <ellipse cx="11" cy="6" rx="2" ry="3" />
      <path d="M17 3v4" />
      <path d="M17 7v11" />
      <path d="M15 3l2-1 2 1" />
      <path d="M15 5l2-1 2 1" />
      <path d="M15 7h4" />
    </svg>
  )
}

export function PumpingIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v2H9z" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <rect x="10" y="7" width="4" height="2" rx="0.5" />
      <path d="M9 9v1.5A1.5 1.5 0 0 0 10.5 12h3a1.5 1.5 0 0 0 1.5-1.5V9" />
      <path d="M8.5 12h7l1 9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1l1-9z" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  )
}

export function DiaperIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18v4c0 3-2 6-5 8H8c-3-2-5-5-5-8V9z" />
      <path d="M8 9L9 5h6l1 4" />
      <path d="M3 9l2-2h2" />
      <path d="M21 9l-2-2h-2" />
    </svg>
  )
}

export function SleepingIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export function PlayingIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function HealthIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9V2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MeasurementsIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

// Utility function to get the appropriate icon component
export function getActivityIcon(activityType: string) {
  switch (activityType) {
    case 'feeding':
      return FeedingIcon
    case 'pumping':
      return PumpingIcon
    case 'diaper_change':
      return DiaperIcon
    case 'sleeping':
      return SleepingIcon
    case 'playing':
      return PlayingIcon
    case 'health':
      return HealthIcon
    case 'measurements':
      return MeasurementsIcon
    default:
      return FeedingIcon
  }
}
