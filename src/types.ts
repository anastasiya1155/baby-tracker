export type ActivityType = 'feeding' | 'sleeping' | 'playing' | 'health' | 'diaper_change' | 'measurements'

export type FeedingSubcategory = 'left_breast' | 'right_breast' | 'bottle' | 'solids'
export type SleepingSubcategory = 'nap' | 'night'
export type PlayingSubcategory = 'tummy_time' | 'outdoors' | 'bath' | 'gym'
export type HealthSubcategory = 'vaccination' | 'medicine' | 'sick' | 'temperature'
export type DiaperChangeSubcategory = 'dirty' | 'wet'
export type MeasurementsSubcategory = 'height' | 'weight' | 'head'

export type ActivitySubcategory = FeedingSubcategory | SleepingSubcategory | PlayingSubcategory | HealthSubcategory | DiaperChangeSubcategory | MeasurementsSubcategory

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
  icon: string
  title: string
  color: string
  subcategories: SubcategoryConfig[]
  inputType: InputType
  unit?: string
}
