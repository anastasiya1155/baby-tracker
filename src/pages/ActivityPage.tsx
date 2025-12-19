import { useState, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Activity, ActivityConfig, ActivitySubcategory, ActivityType } from '../types'
import ActiveActivity from '../components/ActiveActivity'
import InstantActivity from '../components/InstantActivity'
import NumberInputActivity from '../components/NumberInputActivity'
import CommentInputActivity from '../components/CommentInputActivity'
import ActivityHistory from '../components/ActivityHistory'
import EditActivityModal from '../components/EditActivityModal'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ActivityPageProps {
  activityConfigs: ActivityConfig[]
}

function ActivityPage({ activityConfigs }: ActivityPageProps) {
  const [activeActivity, setActiveActivity] = useLocalStorage<Activity | null>('activeActivity', null)
  const [activities, setActivities] = useLocalStorage<Activity[]>('activities', [])
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const navigate = useNavigate()
  const { activityType } = useParams<{ activityType: ActivityType }>()

  const config = useMemo(
    () => activityConfigs.find(c => c.type === activityType),
    [activityConfigs, activityType]
  )

  const activeConfig = useMemo(
    () => activeActivity ? activityConfigs.find(c => c.type === activeActivity.type) : null,
    [activeActivity, activityConfigs]
  )

  const filteredActivities = useMemo(
    () => activities.filter(a => a.type === activityType),
    [activities, activityType]
  )

  const editingConfig = useMemo(
    () => editingActivity ? activityConfigs.find(c => c.type === editingActivity.type) : null,
    [editingActivity, activityConfigs]
  )

  const handleBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const startActivity = useCallback((type: ActivityType, subcategory?: ActivitySubcategory) => {
    const newActivity: Activity = {
      id: `${type}-${Date.now()}`,
      type,
      subcategory,
      startTime: Date.now()
    }
    setActiveActivity(newActivity)
  }, [setActiveActivity])

  const stopActivity = useCallback((comments?: string, value?: number) => {
    if (activeActivity) {
      const completedActivity: Activity = {
        ...activeActivity,
        endTime: Date.now(),
        comments,
        value
      }
      setActivities([completedActivity, ...activities])
      setActiveActivity(null)
    }
  }, [activeActivity, activities, setActiveActivity, setActivities])

  const saveInstantActivity = useCallback((comments?: string) => {
    if (activeActivity) {
      const completedActivity: Activity = {
        ...activeActivity,
        endTime: activeActivity.startTime,
        comments
      }
      setActivities([completedActivity, ...activities])
      setActiveActivity(null)
    }
  }, [activeActivity, activities, setActiveActivity, setActivities])

  const saveNumberActivity = useCallback((value: number, comments?: string) => {
    if (activeActivity) {
      const completedActivity: Activity = {
        ...activeActivity,
        endTime: activeActivity.startTime,
        value,
        comments
      }
      setActivities([completedActivity, ...activities])
      setActiveActivity(null)
    }
  }, [activeActivity, activities, setActiveActivity, setActivities])

  const saveCommentActivity = useCallback((comments: string) => {
    if (activeActivity) {
      const completedActivity: Activity = {
        ...activeActivity,
        endTime: activeActivity.startTime,
        comments
      }
      setActivities([completedActivity, ...activities])
      setActiveActivity(null)
    }
  }, [activeActivity, activities, setActiveActivity, setActivities])

  const cancelActivity = useCallback(() => {
    setActiveActivity(null)
  }, [setActiveActivity])

  const updateActiveActivityComments = useCallback((comments: string) => {
    if (activeActivity) {
      setActiveActivity({
        ...activeActivity,
        comments
      })
    }
  }, [activeActivity, setActiveActivity])

  const updateActiveActivityStartTime = useCallback((startTime: number) => {
    if (activeActivity) {
      setActiveActivity({
        ...activeActivity,
        startTime
      })
    }
  }, [activeActivity, setActiveActivity])

  const handleEditActivity = useCallback((activity: Activity) => {
    setEditingActivity(activity)
  }, [])

  const handleSaveActivity = useCallback((updatedActivity: Activity) => {
    const updatedActivities = activities.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    )
    setActivities(updatedActivities)
    setEditingActivity(null)
  }, [activities, setActivities])

  const handleCloseModal = useCallback(() => {
    setEditingActivity(null)
  }, [])

  const handleSubcategoryClick = useCallback((subcategory: ActivitySubcategory) => {
    if (activityType) {
      startActivity(activityType, subcategory)
    }
  }, [activityType, startActivity])

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Activity not found</h2>
            <button
              onClick={handleBack}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Back to home"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
              <span className="text-2xl">{config.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{config.title}</h1>
          </div>
        </div>

        {/* Active Activity or Subcategory Selection */}
        {activeActivity && activeConfig && activeConfig.type === activityType ? (
          activeConfig.inputType === 'timer' ? (
            <ActiveActivity
              activity={activeActivity}
              config={activeConfig}
              onStop={stopActivity}
              onUpdateComments={updateActiveActivityComments}
              onUpdateStartTime={updateActiveActivityStartTime}
            />
          ) : activeConfig.inputType === 'instant' ? (
            <InstantActivity
              activity={activeActivity}
              config={activeConfig}
              onSave={saveInstantActivity}
              onCancel={cancelActivity}
            />
          ) : activeConfig.inputType === 'number' ? (
            <NumberInputActivity
              activity={activeActivity}
              config={activeConfig}
              onSave={saveNumberActivity}
              onCancel={cancelActivity}
            />
          ) : activeConfig.inputType === 'comment' ? (
            <CommentInputActivity
              activity={activeActivity}
              config={activeConfig}
              onSave={saveCommentActivity}
              onCancel={cancelActivity}
            />
          ) : null
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Select a Category
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Choose what type of {config.title.toLowerCase()} to track
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {config.subcategories.map(sub => (
                <button
                  key={sub.value}
                  onClick={() => handleSubcategoryClick(sub.value)}
                  className={`${config.color} rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
                >
                  <div className="text-4xl mb-2">{sub.icon}</div>
                  <div className="text-lg font-medium text-white">{sub.label}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Activity History filtered by type */}
        <ActivityHistory
          activities={filteredActivities}
          configs={activityConfigs}
          onEditActivity={handleEditActivity}
        />
      </div>

      {/* Edit Activity Modal */}
      {editingActivity && editingConfig && (
        <EditActivityModal
          activity={editingActivity}
          config={editingConfig}
          onSave={handleSaveActivity}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ActivityPage
