import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ActivityButton from '../components/ActivityButton'
import ActivityItem from '../components/ActivityItem'
import { DaySummaryCard } from '../components/DaySummaryCard'
import { ThreeColumnLayout } from '../components/ThreeColumnLayout'
import { ActivityConfig, Activity } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculateDaySummary, getTodayDate } from '../utils/summaries'

interface HomePageProps {
  activityConfigs: ActivityConfig[]
}

function HomePage({ activityConfigs }: HomePageProps) {
  const [activities] = useLocalStorage<Activity[]>('activities', [])
  const navigate = useNavigate()

  const todaySummary = calculateDaySummary(activities, getTodayDate())

  const configMap = useMemo(() => {
    const map = new Map<string, ActivityConfig>()
    activityConfigs.forEach(config => map.set(config.type, config))
    return map
  }, [activityConfigs])

  const handleSummaryClick = () => {
    navigate('/summary')
  }

  return (
    <>
      {/* Today's Summary Card */}
      <div className="mb-6">
        <DaySummaryCard summary={todaySummary} onClick={handleSummaryClick} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {activityConfigs.map(config => (
          <ActivityButton
            key={config.type}
            config={config}
          />
        ))}
      </div>

      {/* Activity History - 3 column layout with interdependent scroll */}
      {activities.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h2>
          <ThreeColumnLayout>
            {activities.map(activity => {
              const config = configMap.get(activity.type)
              if (!config) return null
              return (
                <div key={activity.id} className="mb-3">
                  <ActivityItem
                    activity={activity}
                    config={config}
                  />
                </div>
              )
            })}
          </ThreeColumnLayout>
        </>
      )}
    </>
  )
}

export default HomePage
