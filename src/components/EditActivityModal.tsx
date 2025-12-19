import { useState, useEffect, memo, useCallback, useMemo } from 'react'
import { Activity, ActivityConfig, ActivitySubcategory } from '../types'
import { getUnit } from '../utils/formatting'

interface EditActivityModalProps {
  activity: Activity
  config: ActivityConfig
  onSave: (activity: Activity) => void
  onClose: () => void
}

function EditActivityModal({ activity, config, onSave, onClose }: EditActivityModalProps) {
  const [startTime, setStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [comments, setComments] = useState(activity.comments || '')
  const [subcategory, setSubcategory] = useState<ActivitySubcategory | undefined>(activity.subcategory)
  const [value, setValue] = useState(activity.value?.toString() || '')

  useEffect(() => {
    const start = new Date(activity.startTime)
    setStartDate(start.toISOString().split('T')[0])
    setStartTime(start.toTimeString().slice(0, 5))

    if (activity.endTime) {
      const end = new Date(activity.endTime)
      setEndDate(end.toISOString().split('T')[0])
      setEndTime(end.toTimeString().slice(0, 5))
    }
  }, [activity])

  const handleSave = useCallback(() => {
    const startDateTime = new Date(`${startDate}T${startTime}`).getTime()
    let endDateTime: number | undefined

    if (activity.endTime && endDate && endTime) {
      endDateTime = new Date(`${endDate}T${endTime}`).getTime()
    }

    if (endDateTime && endDateTime <= startDateTime) {
      alert('End time must be after start time')
      return
    }

    // Validate number input for measurements or timer activities with units (like pumping)
    if ((config.inputType === 'number' || config.unit) && value) {
      const numValue = parseFloat(value)
      if (isNaN(numValue) || numValue <= 0) {
        alert('Please enter a valid positive number')
        return
      }
    }

    const updatedActivity: Activity = {
      ...activity,
      startTime: startDateTime,
      endTime: endDateTime,
      comments: comments.trim() || undefined,
      subcategory,
      value: (config.inputType === 'number' || config.unit) && value ? parseFloat(value) : undefined
    }

    onSave(updatedActivity)
    onClose()
  }, [startDate, startTime, endDate, endTime, activity, config.inputType, config.unit, value, comments, subcategory, onSave, onClose])

  const unit = useMemo(() => getUnit(subcategory), [subcategory])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`${config.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {config.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit {config.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Subcategory */}
            {config.subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subcategory
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {config.subcategories.map(sub => (
                    <button
                      key={sub.value}
                      type="button"
                      onClick={() => setSubcategory(sub.value)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all ${
                        subcategory === sub.value
                          ? `${config.color} border-transparent text-white`
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className="mr-1">{sub.icon}</span>
                      <span className="text-sm">{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Number Value (for measurements and timer activities with units like pumping) */}
            {(config.inputType === 'number' || config.unit) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {config.unit ? `Amount (${config.unit})` : 'Value'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    step="0.1"
                    min="0"
                    placeholder={config.unit ? `Enter amount in ${config.unit}` : 'Enter value'}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {unit && (
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      {unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {config.inputType === 'timer' ? 'Start Time' : 'Time'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* End Time */}
            {activity.endTime && config.inputType === 'timer' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  End Time
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Comments */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Comments (optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add notes about this activity..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EditActivityModal)
