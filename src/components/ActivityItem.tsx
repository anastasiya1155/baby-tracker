import { memo, useMemo, useCallback } from 'react'
import { Activity, ActivityConfig } from '../types'
import { formatTime, formatDuration, getUnit } from '../utils/formatting'

interface ActivityItemProps {
  activity: Activity
  config: ActivityConfig
  onEdit?: (activity: Activity) => void
  showConnector?: boolean
}

const ActivityItem = memo(function ActivityItem({ activity, config, onEdit, showConnector = false }: ActivityItemProps) {
  const startTimeFormatted = useMemo(() =>
    formatTime(new Date(activity.startTime)),
    [activity.startTime]
  )

  const endTimeFormatted = useMemo(() =>
    activity.endTime ? formatTime(new Date(activity.endTime)) : null,
    [activity.endTime]
  )

  const duration = useMemo(() => {
    if (!activity.endTime) return 'In progress'

    // For instant activities (diaper changes, measurements, health), don't show duration
    if (activity.startTime === activity.endTime) {
      if (activity.value !== undefined) {
        const unit = getUnit(activity.subcategory)
        return `${activity.value} ${unit}`
      }
      return ''
    }

    // For timer activities with a value (like pumping), show both duration and amount
    const durationStr = formatDuration(new Date(activity.startTime), new Date(activity.endTime))
    if (activity.value !== undefined) {
      const unit = getUnit(activity.subcategory)
      return `${durationStr} • ${activity.value} ${unit}`
    }

    return durationStr
  }, [activity.startTime, activity.endTime, activity.value, activity.subcategory])

  const handleEdit = useCallback(() => {
    onEdit?.(activity)
  }, [onEdit, activity])

  // Get subcategory icon if available, otherwise use main activity icon
  const subcategoryConfig = useMemo(() => {
    if (activity.subcategory) {
      return config.subcategories.find(s => s.value === activity.subcategory)
    }
    return null
  }, [activity.subcategory, config.subcategories])

  const IconComponent = subcategoryConfig?.icon || (typeof config.icon === 'string' ? null : config.icon)

  return (
    <div className="flex items-center py-2 gap-3">
      <div className="relative flex flex-col items-center">
        <div className={`${config.color} w-8 h-8 rounded-lg flex items-center justify-center shrink-0 z-10`}>
          {IconComponent ? (
            <IconComponent className="w-4 h-4 text-white" />
          ) : (
            <span className="text-lg">{config.icon}</span>
          )}
        </div>
        {showConnector && (
          <div className="absolute top-8 w-px h-6 bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {activity.endTime && activity.startTime !== activity.endTime && endTimeFormatted
          ? `${startTimeFormatted} - ${endTimeFormatted}`
          : startTimeFormatted}
      </span>
      {duration && (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {duration}
        </span>
      )}
      {activity.comments && (
        <span className="text-sm text-gray-500 dark:text-gray-400 italic truncate flex-1">
          {activity.comments}
        </span>
      )}
      {onEdit && (
        <button
          onClick={handleEdit}
          className="p-1 text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400 transition-colors ml-auto"
          aria-label="Edit activity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  )
})

export default ActivityItem
