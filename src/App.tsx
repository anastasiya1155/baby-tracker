import { useState, useEffect } from 'react'
import PWABadge from './PWABadge.tsx'
import { VibeKanbanWebCompanion } from 'vibe-kanban-web-companion'
import Clock from './components/Clock'
import ActivityButton from './components/ActivityButton'
import ActiveActivity from './components/ActiveActivity'
import ActivityHistory from './components/ActivityHistory'
import EditActivityModal from './components/EditActivityModal'
import { Activity, ActivityType, ActivityConfig, ActivitySubcategory } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

const activityConfigs: ActivityConfig[] = [
  {
    type: 'feeding',
    icon: '🍼',
    title: 'Feeding',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    subcategories: [
      { value: 'left_breast', label: 'Left Breast', icon: '👈' },
      { value: 'right_breast', label: 'Right Breast', icon: '👉' },
      { value: 'bottle', label: 'Bottle', icon: '🍼' },
      { value: 'solids', label: 'Solids', icon: '🥄' }
    ]
  },
  {
    type: 'sleeping',
    icon: '😴',
    title: 'Sleeping',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    subcategories: [
      { value: 'nap', label: 'Nap', icon: '💤' },
      { value: 'night', label: 'Night', icon: '🌙' }
    ]
  },
  {
    type: 'playing',
    icon: '🎮',
    title: 'Playing',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    subcategories: [
      { value: 'tummy_time', label: 'Tummy Time', icon: '🤸' },
      { value: 'outdoors', label: 'Outdoors', icon: '🌳' },
      { value: 'bath', label: 'Bath', icon: '🛁' },
      { value: 'gym', label: 'Gym', icon: '🎪' }
    ]
  },
  {
    type: 'health',
    icon: '💊',
    title: 'Health',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    subcategories: [
      { value: 'vaccination', label: 'Vaccination', icon: '💉' },
      { value: 'weight', label: 'Weight', icon: '⚖️' },
      { value: 'height', label: 'Height', icon: '📏' },
      { value: 'head', label: 'Head', icon: '📐' },
      { value: 'medicine', label: 'Medicine', icon: '💊' },
      { value: 'sick', label: 'Sick', icon: '🤒' }
    ]
  }
]

function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeActivity, setActiveActivity] = useLocalStorage<Activity | null>('activeActivity', null)
  const [activities, setActivities] = useLocalStorage<Activity[]>('activities', [])
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const startActivity = (type: ActivityType, subcategory?: ActivitySubcategory) => {
    const newActivity: Activity = {
      id: `${type}-${Date.now()}`,
      type,
      subcategory,
      startTime: Date.now()
    }
    setActiveActivity(newActivity)
  }

  const stopActivity = (comments?: string) => {
    if (activeActivity) {
      const completedActivity: Activity = {
        ...activeActivity,
        endTime: Date.now(),
        comments
      }
      setActivities([completedActivity, ...activities])
      setActiveActivity(null)
    }
  }

  const updateActiveActivityComments = (comments: string) => {
    if (activeActivity) {
      setActiveActivity({
        ...activeActivity,
        comments
      })
    }
  }

  const updateActiveActivityStartTime = (startTime: number) => {
    if (activeActivity) {
      setActiveActivity({
        ...activeActivity,
        startTime
      })
    }
  }

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity)
  }

  const handleSaveActivity = (updatedActivity: Activity) => {
    const updatedActivities = activities.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    )
    setActivities(updatedActivities)
    setEditingActivity(null)
  }

  const activeConfig = activeActivity
    ? activityConfigs.find(c => c.type === activeActivity.type)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👶</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BabyTrack</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </header>

        {/* Clock */}
        <Clock />

        {/* Active Activity or Activity Buttons */}
        {activeActivity && activeConfig ? (
          <ActiveActivity
            activity={activeActivity}
            config={activeConfig}
            onStop={stopActivity}
            onUpdateComments={updateActiveActivityComments}
            onUpdateStartTime={updateActiveActivityStartTime}
          />
        ) : (
          <>
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
                  onClick={(subcategory) => startActivity(config.type, subcategory)}
                />
              ))}
            </div>
          </>
        )}

        {/* Activity History */}
        <ActivityHistory
          activities={activities}
          configs={activityConfigs}
          onEditActivity={handleEditActivity}
        />
      </div>

      {/* Edit Activity Modal */}
      {editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          config={activityConfigs.find(c => c.type === editingActivity.type)!}
          onSave={handleSaveActivity}
          onClose={() => setEditingActivity(null)}
        />
      )}

      <PWABadge />
      <VibeKanbanWebCompanion />
    </div>
  )
}

export default App
