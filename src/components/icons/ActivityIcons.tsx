interface IconProps {
  className?: string
}

export function FeedingIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Nipple */}
      <path d="M10 2c0 0-1 1-1 2s1 2 1 2h4c0 0 1-1 1-2s-1-2-1-2" />
      {/* Bottle cap/collar */}
      <rect x="8" y="6" width="8" height="3" rx="1" />
      {/* Bottle body */}
      <path d="M8 9v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9" />
      {/* Measurement lines */}
      <path d="M8 13h2" />
      <path d="M8 17h3" />
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

// Subcategory Icons

// Hand icons for breast feeding and pumping sides
export function LeftHandIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  )
}

export function RightHandIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  )
}

// Bottle icon for bottle feeding
export function BottleIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v2.343" />
      <path d="M14 2v2.343" />
      <path d="M8 4h8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M8 9h8v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9z" />
      <path d="M8 13h8" />
    </svg>
  )
}

// Spoon icon for solids
export function SpoonIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
      <path d="M8 6a4 4 0 0 1 8 0" />
    </svg>
  )
}

// Both hands icon for pumping both sides
export function BothHandsIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6V4a2 2 0 1 1 4 0v2" />
      <path d="M12 6V4a2 2 0 1 1 4 0v2" />
      <path d="M8 6a2 2 0 0 0-2 2v6a6 6 0 0 0 12 0V8a2 2 0 0 0-2-2" />
      <path d="M6 12h12" />
    </svg>
  )
}

// Diaper icons
export function DirtyDiaperIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="16" rx="7" ry="5" />
      <path d="M12 11c-1.5-2-1-4 .5-5" />
      <path d="M9 11c-1-1.5-.5-3 .5-4" />
      <path d="M15 11c1-1.5.5-3-.5-4" />
    </svg>
  )
}

export function WetDiaperIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="M12 22c-4 0-7-3-7-7 0-3 7-9 7-9s7 6 7 9c0 4-3 7-7 7z" />
    </svg>
  )
}

// Sleep icons
export function NapIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4h3l-3 5h3" />
      <path d="M17 7h2l-2 4h2" />
      <path d="M4 19h16" />
      <path d="M4 19c0-4 3-5 5-5h6c2 0 5 1 5 5" />
    </svg>
  )
}

export function NightIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

// Playing icons
export function TummyTimeIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="3" />
      <path d="M5 20h14" />
      <path d="M5 14c0-2 1-3 3-3h3c2 0 4 1 6 3" />
      <path d="M17 11l2 3" />
      <path d="M5 17c1-2 3-3 6-3" />
    </svg>
  )
}

export function OutdoorsIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-7" />
      <path d="M12 15c-4 0-6-2-6-6 0-3 2-5 4-6 .5 1 1.5 2 4 2s3.5-1 4-2c2 1 4 3 4 6 0 4-2 6-6 6z" />
      <circle cx="12" cy="6" r="2" />
    </svg>
  )
}

export function BathIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M6 12V5a2 2 0 0 1 2-2h1" />
      <circle cx="12" cy="5" r="2" />
    </svg>
  )
}

export function GymIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l4 4" />
      <path d="M20 4l-4 4" />
      <path d="M4 4h16" />
      <path d="M8 8v10" />
      <path d="M16 8v10" />
      <path d="M6 12h4" />
      <path d="M14 12h4" />
      <circle cx="8" cy="20" r="2" />
      <circle cx="16" cy="20" r="2" />
    </svg>
  )
}

// Health icons
export function VaccinationIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2l4 4" />
      <path d="M17 7l3-3" />
      <path d="M19 9l-9 9-5 1 1-5 9-9" />
      <path d="M15 5l4 4" />
      <path d="M2 22l5-1-4-4" />
    </svg>
  )
}

export function MedicineIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M6 12h12" />
      <path d="M12 4v8" />
    </svg>
  )
}

export function SickIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 9h.01" />
      <path d="M16 9h.01" />
      <path d="M8 16s1.5-2 4-2 4 2 4 2" />
      <path d="M12 2v2" />
    </svg>
  )
}

export function TemperatureIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      <path d="M10 9h4" />
      <path d="M10 6h4" />
    </svg>
  )
}

// Measurement icons
export function HeightIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v20" />
      <path d="M6 2h4" />
      <path d="M6 6h2" />
      <path d="M6 10h3" />
      <path d="M6 14h2" />
      <path d="M6 18h3" />
      <path d="M6 22h4" />
      <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M18 8v14" />
      <path d="M15 12h6" />
    </svg>
  )
}

export function WeightIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M6.5 8h11l1.5 14H5L6.5 8z" />
      <path d="M12 8v6" />
    </svg>
  )
}

export function HeadCircumferenceIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="7" />
      <path d="M5 10h14" />
      <path d="M12 3v14" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  )
}

// Baby icon for logo/branding
export function BabyIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M8 8h.01" />
      <path d="M16 8h.01" />
      <path d="M10 11a2 2 0 0 0 4 0" />
      <path d="M12 13c-4 0-6 3-6 6v2h12v-2c0-3-2-6-6-6z" />
    </svg>
  )
}

// Birthday cake icon for calendar birth date
export function BirthdayIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M10 6h4" />
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M4 15h16" />
      <path d="M8 10V8" />
      <path d="M12 10V6" />
      <path d="M16 10V8" />
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
