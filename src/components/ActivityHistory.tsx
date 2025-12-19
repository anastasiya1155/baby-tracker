import { memo, useMemo } from 'react'
import { Activity, ActivityConfig } from '../types'
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
            />
          )
        })}
      </div>
    </div>
  )
}

export default memo(ActivityHistory)
