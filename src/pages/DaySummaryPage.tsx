import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Activity, ActivityConfig } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculateDaySummary, formatSummaryDate, formatSummaryDuration } from '../utils/summaries'
import { FeedingIcon, PumpingIcon, SleepingIcon, PlayingIcon, DiaperIcon, HealthIcon, MeasurementsIcon } from '../components/icons/ActivityIcons'
import ActivityHistory from '../components/ActivityHistory'

interface DaySummaryPageProps {
  activityConfigs: ActivityConfig[]
}

function DaySummaryPage({ activityConfigs }: DaySummaryPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activities] = useLocalStorage<Activity[]>('activities', [])

  // Get date from URL params or default to today
  const dateParam = searchParams.get('date')
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (dateParam) {
      const date = new Date(dateParam)
      date.setHours(0, 0, 0, 0)
      return date
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  })

  // Update URL when date changes
  useEffect(() => {
    const dateString = currentDate.toISOString().split('T')[0]
    setSearchParams({ date: dateString }, { replace: true })
  }, [currentDate, setSearchParams])

  const summary = calculateDaySummary(activities, currentDate)

  // Filter activities for the current date
  const dayActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.startTime)
    return (
      activityDate.getFullYear() === currentDate.getFullYear() &&
      activityDate.getMonth() === currentDate.getMonth() &&
      activityDate.getDate() === currentDate.getDate()
    )
  })

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    setCurrentDate(today)
  }

  const isToday = () => {
    const today = new Date()
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getDate() === today.getDate()
    )
  }

  const summaryItems = [
    {
      icon: <FeedingIcon className="w-6 h-6" />,
      label: 'Feeding',
      value: formatSummaryDuration(summary.totalFeeding),
      count: summary.feedingCount,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      icon: <PumpingIcon className="w-6 h-6" />,
      label: 'Pumping',
      value: summary.totalPumping > 0 ? `${summary.totalPumping} ml` : '0 ml',
      count: summary.pumpingCount,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: <SleepingIcon className="w-6 h-6" />,
      label: 'Sleep',
      value: formatSummaryDuration(summary.totalSleep),
      count: summary.sleepCount,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <PlayingIcon className="w-6 h-6" />,
      label: 'Play',
      value: formatSummaryDuration(summary.totalPlay),
      count: summary.playCount,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <DiaperIcon className="w-6 h-6" />,
      label: 'Diaper Changes',
      value: `${summary.diaperCount}`,
      count: summary.diaperCount,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: <HealthIcon className="w-6 h-6" />,
      label: 'Health',
      value: `${summary.healthCount}`,
      count: summary.healthCount,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: <MeasurementsIcon className="w-6 h-6" />,
      label: 'Measurements',
      value: `${summary.measurementCount}`,
      count: summary.measurementCount,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
  ]

  return (
    <div className="pb-4">
      {/* Header with navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous day"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {formatSummaryDate(currentDate)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next day"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {!isToday() && (
          <button
            onClick={goToToday}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Today
          </button>
        )}
      </div>

      {/* Summary Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Daily Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center p-4 rounded-lg ${item.bgColor}`}
            >
              <div className={item.color}>{item.icon}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                {item.label}
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                {item.value}
              </div>
              {item.count > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.count} {item.count === 1 ? 'time' : 'times'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activities for the day */}
      {dayActivities.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Activities
          </h3>
          <ActivityHistory
            activities={dayActivities}
            configs={activityConfigs}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No activities recorded for this day
          </p>
        </div>
      )}
    </div>
  )
}

export default DaySummaryPage
