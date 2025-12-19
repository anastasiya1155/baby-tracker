import { useState, memo, useCallback, useMemo } from 'react'
import { Activity, ActivityConfig } from '../types'
import { formatTime, getUnit } from '../utils/formatting'

interface NumberInputActivityProps {
  activity: Activity
  config: ActivityConfig
  onSave: (value: number, comments?: string) => void
  onCancel: () => void
}

function NumberInputActivity({ activity, config, onSave, onCancel }: NumberInputActivityProps) {
  const [value, setValue] = useState('')
  const [comments, setComments] = useState('')

  const handleSave = useCallback(() => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      alert('Please enter a valid positive number')
      return
    }
    onSave(numValue, comments.trim() || undefined)
  }, [value, comments, onSave])

  const subcategoryLabel = useMemo(() => {
    if (!activity.subcategory) return null
    const subConfig = config.subcategories.find(s => s.value === activity.subcategory)
    return subConfig ? `${subConfig.icon} ${subConfig.label}` : null
  }, [activity.subcategory, config.subcategories])

  const formattedTime = useMemo(() => {
    return formatTime(new Date(activity.startTime))
  }, [activity.startTime])

  const unit = useMemo(() => {
    return getUnit(activity.subcategory)
  }, [activity.subcategory])

  return (
    <div className={`${config.color} rounded-3xl p-8 shadow-xl mb-8`}>
      <div className="text-center">
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{config.title}</h2>
        {subcategoryLabel && (
          <p className="text-white/90 text-xl mb-2">{subcategoryLabel}</p>
        )}
        <p className="text-white/80 mb-6">
          at {formattedTime}
        </p>

        {/* Number Input */}
        <div className="mb-4 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              step="0.1"
              min="0"
              className="w-40 px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-2xl font-bold text-center placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              autoFocus
            />
            <span className="text-2xl font-bold text-white">{unit}</span>
          </div>
        </div>

        {/* Comments Input */}
        <div className="mb-6 max-w-md mx-auto">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add notes (optional)..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Save {config.title}
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(NumberInputActivity)
