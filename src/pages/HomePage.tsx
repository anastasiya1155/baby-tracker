import Clock from '../components/Clock'
import ActivityButton from '../components/ActivityButton'
import ActivityHistory from '../components/ActivityHistory'
import { ActivityConfig, Activity } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface HomePageProps {
  activityConfigs: ActivityConfig[]
}

function HomePage({ activityConfigs }: HomePageProps) {
  const [activities] = useLocalStorage<Activity[]>('activities', [])

  return (
    <>
      {/* Clock */}
      <Clock />

      {/* Activity Selection */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Start Tracking an Activity
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tap an activity to start tracking
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activityConfigs.map(config => (
          <ActivityButton
            key={config.type}
            config={config}
          />
        ))}
      </div>

      {/* Activity History - read-only on home page */}
      <ActivityHistory
        activities={activities}
        configs={activityConfigs}
      />
    </>
  )
}

export default HomePage
