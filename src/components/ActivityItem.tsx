import { memo, useMemo, useCallback } from 'react'
import { Activity, ActivityConfig } from '../types'
import { formatTime, formatDate, formatDuration, getSubcategoryLabel, getUnit } from '../utils/formatting'

interface ActivityItemProps {
  activity: Activity
  config: ActivityConfig
  onEdit: (activity: Activity) => void
}

const ActivityItem = memo(function ActivityItem({ activity, config, onEdit }: ActivityItemProps) {
  const subcategoryLabel = useMemo(() =>
    getSubcategoryLabel(activity.subcategory),
    [activity.subcategory]
  )

  const startDate = useMemo(() =>
    formatDate(new Date(activity.startTime)),
    [activity.startTime]
  )

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
      return 'Instant'
    }

    return formatDuration(new Date(activity.startTime), new Date(activity.endTime))
  }, [activity.startTime, activity.endTime, activity.value, activity.subcategory])

  const handleEdit = useCallback(() => {
    onEdit(activity)
  }, [onEdit, activity])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`${config.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0`}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {config.title}
              {subcategoryLabel && (
                <span className="ml-2 text-sm font-normal">
                  {subcategoryLabel}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {startDate} at {startTimeFormatted}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {duration}
            </div>
            {activity.endTime && activity.startTime !== activity.endTime && endTimeFormatted && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ended {endTimeFormatted}
              </p>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            aria-label="Edit activity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
      {activity.comments && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            "{activity.comments}"
          </p>
        </div>
      )}
    </div>
  )
})

export default ActivityItem
