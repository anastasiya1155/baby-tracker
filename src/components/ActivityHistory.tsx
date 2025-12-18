import { Activity, ActivityConfig } from '../types'

interface ActivityHistoryProps {
  activities: Activity[]
  configs: ActivityConfig[]
  onEditActivity: (activity: Activity) => void
}

export default function ActivityHistory({ activities, configs, onEditActivity }: ActivityHistoryProps) {
  if (activities.length === 0) {
    return null
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const formatDuration = (startTime: number, endTime?: number) => {
    if (!endTime) return 'In progress'

    const seconds = Math.floor((endTime - startTime) / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const getConfig = (type: string) => {
    return configs.find(c => c.type === type)
  }

  const getSubcategoryLabel = (activity: Activity, config: ActivityConfig) => {
    if (!activity.subcategory) return null
    const subConfig = config.subcategories.find(s => s.value === activity.subcategory)
    return subConfig ? `${subConfig.icon} ${subConfig.label}` : null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h2>
      <div className="space-y-3">
        {activities.map(activity => {
          const config = getConfig(activity.type)
          if (!config) return null

          return (
            <div
              key={activity.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`${config.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {config.title}
                      {getSubcategoryLabel(activity, config) && (
                        <span className="ml-2 text-sm font-normal">
                          {getSubcategoryLabel(activity, config)}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(activity.startTime)} at {formatTime(activity.startTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatDuration(activity.startTime, activity.endTime)}
                    </div>
                    {activity.endTime && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ended {formatTime(activity.endTime)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onEditActivity(activity)}
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
        })}
      </div>
    </div>
  )
}
