import { memo, useMemo } from 'react'
import { Activity, ActivityConfig, ActivityType } from '../types'
import ActivityItem from './ActivityItem'

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

  // Calculate time since previous activity of the same type for each activity
  // Activities are sorted by startTime descending (most recent first)
  const timeSinceLastMap = useMemo(() => {
    const map = new Map<string, number>()
    const lastSeenByType = new Map<ActivityType, number>()

    // Iterate through activities (most recent first)
    for (const activity of activities) {
      const previousTime = lastSeenByType.get(activity.type)
      if (previousTime !== undefined) {
        // Time since this activity until the next one of the same type (which we saw first)
        const timeSince = previousTime - activity.startTime
        map.set(activity.id, timeSince)
      }
      // Update the last seen time for this type
      lastSeenByType.set(activity.type, activity.startTime)
    }

    return map
  }, [activities])

  if (activities.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="space-y-3">
        {activities.map(activity => {
          const config = configMap.get(activity.type)
          if (!config) return null

          return (
            <ActivityItem
              key={activity.id}
              activity={activity}
              config={config}
              onEdit={onEditActivity}
              timeSincePrevious={timeSinceLastMap.get(activity.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default memo(ActivityHistory)
