import { useState, memo, useCallback, useMemo } from 'react'
import { Activity, ActivityConfig } from '../types'
import { formatTime } from '../utils/formatting'

interface InstantActivityProps {
  activity: Activity
  config: ActivityConfig
  onSave: (comments?: string) => void
  onCancel: () => void
}

function InstantActivity({ activity, config, onSave, onCancel }: InstantActivityProps) {
  const [comments, setComments] = useState('')

  const handleSave = useCallback(() => {
    onSave(comments.trim() || undefined)
  }, [onSave, comments])

  const subcategoryInfo = useMemo(() => {
    if (!activity.subcategory) return null
    const subConfig = config.subcategories.find(s => s.value === activity.subcategory)
    return subConfig ? { icon: subConfig.icon, label: subConfig.label } : null
  }, [activity.subcategory, config.subcategories])

  const formattedTime = useMemo(() => {
    return formatTime(new Date(activity.startTime))
  }, [activity.startTime])

  return (
    <div className={`${config.color} rounded-3xl p-8 shadow-xl mb-8`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {typeof config.icon === 'function' ? <config.icon className="w-16 h-16 text-white" /> : <span className="text-6xl">{config.icon}</span>}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{config.title}</h2>
        {subcategoryInfo && (
          <p className="text-white/90 text-xl mb-2 flex items-center justify-center gap-2">
            {subcategoryInfo.icon && <subcategoryInfo.icon className="w-5 h-5" />}
            {subcategoryInfo.label}
          </p>
        )}
        <p className="text-white/80 mb-6">
          at {formattedTime}
        </p>

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

export default memo(InstantActivity)
