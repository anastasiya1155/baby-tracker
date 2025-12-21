import { useNavigate } from 'react-router-dom'
import ActivityButton from '../components/ActivityButton'
import ActivityHistory from '../components/ActivityHistory'
import { DaySummaryCard } from '../components/DaySummaryCard'
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

  const handleSummaryClick = () => {
    navigate('/summary')
  }

  return (
    <>
      {/* Today's Summary Card */}
      <div className="mb-6">
        <DaySummaryCard summary={todaySummary} onClick={handleSummaryClick} />
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
