import { useState } from 'react'
import { Activity, ActivityConfig } from '../types'

interface InstantActivityProps {
  activity: Activity
  config: ActivityConfig
  onSave: (comments?: string) => void
  onCancel: () => void
}

export default function InstantActivity({ activity, config, onSave, onCancel }: InstantActivityProps) {
  const [comments, setComments] = useState('')

  const handleSave = () => {
    onSave(comments.trim() || undefined)
  }

  const getSubcategoryLabel = () => {
    if (!activity.subcategory) return null
    const subConfig = config.subcategories.find(s => s.value === activity.subcategory)
    return subConfig ? `${subConfig.icon} ${subConfig.label}` : null
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className={`${config.color} rounded-3xl p-8 shadow-xl mb-8`}>
      <div className="text-center">
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{config.title}</h2>
        {getSubcategoryLabel() && (
          <p className="text-white/90 text-xl mb-2">{getSubcategoryLabel()}</p>
        )}
        <p className="text-white/80 mb-6">
          at {formatTime(activity.startTime)}
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
