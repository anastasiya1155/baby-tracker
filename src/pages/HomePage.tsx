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
