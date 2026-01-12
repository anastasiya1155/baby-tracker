import { memo, useMemo } from 'react'
import { Activity, ActivityConfig } from '../types'
import ActivityItem from './ActivityItem'
import { formatDateSeparator, getDateKey } from '../utils/formatting'

interface ActivityHistoryProps {
  activities: Activity[]
  configs: ActivityConfig[]
  onEditActivity?: (activity: Activity) => void
}

function ActivityHistory({ activities, configs, onEditActivity }: ActivityHistoryProps) {
  const configMap = useMemo(() => {
    const map = new Map<string, ActivityConfig>()
    configs.forEach(config => map.set(config.type, config))
    return map
  }, [configs])

  const sortedActivities = useMemo(() =>
    [...activities].sort((a, b) => b.startTime - a.startTime),
    [activities]
  )

  const todayKey = useMemo(() => getDateKey(Date.now()), [])

  if (activities.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="space-y-3">
        {sortedActivities.map((activity, index) => {
          const config = configMap.get(activity.type)
          if (!config) return null

          const currentDateKey = getDateKey(activity.startTime)
          const previousDateKey = index > 0 ? getDateKey(sortedActivities[index - 1].startTime) : null
          const isToday = currentDateKey === todayKey
          const showDateSeparator = currentDateKey !== previousDateKey

          const nextActivity = sortedActivities[index + 1]
          const nextDateKey = nextActivity ? getDateKey(nextActivity.startTime) : null
          const showConnector = nextDateKey === currentDateKey

          return (
            <div key={activity.id}>
              {showDateSeparator && (
                <div className="flex items-center gap-3 py-2 mt-2 first:mt-0">
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {isToday ? 'Today' : formatDateSeparator(new Date(activity.startTime))}
                  </span>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>
              )}
              <ActivityItem
                activity={activity}
                config={config}
                onEdit={onEditActivity}
                showConnector={showConnector}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(ActivityHistory)
