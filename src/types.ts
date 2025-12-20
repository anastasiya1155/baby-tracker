export type ActivityType = 'feeding' | 'sleeping' | 'playing' | 'health' | 'diaper_change' | 'measurements' | 'pumping'

export type FeedingSubcategory = 'left_breast' | 'right_breast' | 'bottle' | 'solids'
export type SleepingSubcategory = 'nap' | 'night'
export type PlayingSubcategory = 'tummy_time' | 'outdoors' | 'bath' | 'gym'
export type HealthSubcategory = 'vaccination' | 'medicine' | 'sick' | 'temperature'
export type DiaperChangeSubcategory = 'dirty' | 'wet'
export type MeasurementsSubcategory = 'height' | 'weight' | 'head'
export type PumpingSubcategory = 'left' | 'right' | 'both'

export type ActivitySubcategory = FeedingSubcategory | SleepingSubcategory | PlayingSubcategory | HealthSubcategory | DiaperChangeSubcategory | MeasurementsSubcategory | PumpingSubcategory

export type InputType = 'timer' | 'instant' | 'number' | 'comment'

export interface Activity {
  id: string
  type: ActivityType
  subcategory?: ActivitySubcategory
  startTime: number
  endTime?: number
  comments?: string
  value?: number
}

export interface SubcategoryConfig {
  value: ActivitySubcategory
  label: string
  icon?: string
}

export interface ActivityConfig {
  type: ActivityType
  icon: string | React.ComponentType<{ className?: string }>
  title: string
  color: string
  subcategories: SubcategoryConfig[]
  inputType: InputType
  unit?: string
}

export type Gender = 'male' | 'female' | 'other' | ''

export type Relationship = 'parent' | 'caregiver' | 'grandparent' | 'other' | ''

export interface BabySettings {
  babyName: string
  dateOfBirth: string
  gender: Gender
  relationship: Relationship
}

export interface DayComment {
  id: string
  date: string // ISO date string (YYYY-MM-DD)
  comment: string
  createdAt: number
}
