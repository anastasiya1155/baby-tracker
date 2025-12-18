export type ActivityType = 'feeding' | 'sleeping' | 'playing' | 'health'

export interface Activity {
  id: string
  type: ActivityType
  startTime: number
  endTime?: number
  comments?: string
}

export interface ActivityConfig {
  type: ActivityType
  icon: string
  title: string
  color: string
}
