import { memo, useMemo, useState, useEffect } from 'react'
import { Activity, ActivityConfig, ActivityType } from '../types'
import ActivityItem from './ActivityItem'
import { formatTimeSince } from '../utils/formatting'

interface ActivityHistoryProps {
  activities: Activity[]
  configs: ActivityConfig[]
  onEditActivity?: (activity: Activity) => void
}

function ActivityHistory({ activities, configs, onEditActivity }: ActivityHistoryProps) {
  const [now, setNow] = useState(Date.now())

  // Update current time when component mounts or activities change
  useEffect(() => {
    setNow(Date.now())
  }, [activities])

  const configMap = useMemo(() => {
    const map = new Map<string, ActivityConfig>()
    configs.forEach(config => map.set(config.type, config))
    return map
  }, [configs])

  // Calculate time since previous activity of the same type for each activity
  // Activities are sorted by startTime descending (most recent first)
  // Also track the most recent activity of each type to show time since now
  const { timeSinceLastMap, timeSinceNowMap } = useMemo(() => {
    const timeSinceLastMap = new Map<string, number>()
    const timeSinceNowMap = new Map<string, number>()
    const lastSeenByType = new Map<ActivityType, number>()
    const mostRecentByType = new Map<ActivityType, string>()

    // Iterate through activities (most recent first)
    for (const activity of activities) {
      const previousTime = lastSeenByType.get(activity.type)
      if (previousTime !== undefined) {
        // Time since this activity until the next one of the same type (which we saw first)
        const timeSince = previousTime - activity.startTime
        timeSinceLastMap.set(activity.id, timeSince)
      } else {
        // This is the most recent activity of this type
        mostRecentByType.set(activity.type, activity.id)
      }
      // Update the last seen time for this type
      lastSeenByType.set(activity.type, activity.startTime)
    }

    // Calculate time since now for the most recent activity of each type
    for (const activity of activities) {
      if (mostRecentByType.get(activity.type) === activity.id) {
        timeSinceNowMap.set(activity.id, now - activity.startTime)
      }
    }

    return { timeSinceLastMap, timeSinceNowMap }
  }, [activities, now])

  if (activities.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="flex flex-col gap-3">
        {activities.map((activity, index) => {
          const config = configMap.get(activity.type)
          if (!config) return null

          const timeSince = timeSinceLastMap.get(activity.id)
          const timeSinceNow = timeSinceNowMap.get(activity.id)
          const showTimeSince = index > 0 && timeSince !== undefined

          return (
            <div key={activity.id} className="flex flex-col gap-3">
              {showTimeSince && (
                <div className="flex items-center -my-1.5 pl-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatTimeSince(timeSince)}
                  </span>
                </div>
              )}
              <ActivityItem
                activity={activity}
                config={config}
                onEdit={onEditActivity}
              />
              {timeSinceNow !== undefined && (
                <div className="flex items-center -mt-1.5 pl-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatTimeSince(timeSinceNow)}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(ActivityHistory)
