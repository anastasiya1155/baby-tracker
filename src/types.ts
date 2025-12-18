export type ActivityType = 'feeding' | 'sleeping' | 'playing' | 'health'

export type FeedingSubcategory = 'left_breast' | 'right_breast' | 'bottle' | 'solids'
export type SleepingSubcategory = 'nap' | 'night'
export type PlayingSubcategory = 'tummy_time' | 'outdoors' | 'bath' | 'gym'
export type HealthSubcategory = 'vaccination' | 'weight' | 'height' | 'head' | 'medicine' | 'sick'

export type ActivitySubcategory = FeedingSubcategory | SleepingSubcategory | PlayingSubcategory | HealthSubcategory

export interface Activity {
  id: string
  type: ActivityType
  subcategory?: ActivitySubcategory
  startTime: number
  endTime?: number
  comments?: string
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
}
