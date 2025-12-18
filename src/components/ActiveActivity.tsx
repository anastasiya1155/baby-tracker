import { useState, useEffect } from 'react'
import { Activity, ActivityConfig } from '../types'

interface ActiveActivityProps {
  activity: Activity
  config: ActivityConfig
  onStop: (comments?: string) => void
  onUpdateComments: (comments: string) => void
  onUpdateStartTime: (startTime: number) => void
}

export default function ActiveActivity({ activity, config, onStop, onUpdateComments, onUpdateStartTime }: ActiveActivityProps) {
  const [duration, setDuration] = useState(0)
  const [comments, setComments] = useState(activity.comments || '')
  const [isEditingTime, setIsEditingTime] = useState(false)
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')

  useEffect(() => {
    const updateDuration = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - activity.startTime) / 1000)
      setDuration(elapsed)
    }

    updateDuration()
    const timer = setInterval(updateDuration, 1000)

    return () => clearInterval(timer)
  }, [activity.startTime])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatStartTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleCommentsChange = (value: string) => {
    setComments(value)
    onUpdateComments(value)
  }

  const handleStop = () => {
    onStop(comments.trim() || undefined)
  }

  const handleTimerClick = () => {
    const start = new Date(activity.startTime)
    setEditDate(start.toISOString().split('T')[0])
    setEditTime(start.toTimeString().slice(0, 5))
    setIsEditingTime(true)
  }

  const handleSaveTime = () => {
    const newStartTime = new Date(`${editDate}T${editTime}`).getTime()
    if (newStartTime > Date.now()) {
      alert('Start time cannot be in the future')
      return
    }
    onUpdateStartTime(newStartTime)
    setIsEditingTime(false)
  }

  const handleCancelEditTime = () => {
    setIsEditingTime(false)
  }

  return (
    <div className={`${config.color} rounded-3xl p-8 shadow-xl mb-8 animate-pulse-slow`}>
      <div className="text-center">
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{config.title} in Progress</h2>

        {/* Start Time - Clickable */}
        {!isEditingTime ? (
          <button
            onClick={handleTimerClick}
            className="text-white/80 mb-6 hover:text-white hover:underline transition-colors cursor-pointer"
          >
            Started at {formatStartTime(activity.startTime)} (click to edit)
          </button>
        ) : (
          <div className="mb-6 max-w-md mx-auto bg-white/10 rounded-xl p-4">
            <p className="text-white text-sm mb-3">Edit Start Time</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEditTime}
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTime}
                className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Duration Timer - Clickable */}
        <button
          onClick={handleTimerClick}
          className="text-6xl font-mono font-bold text-white mb-6 hover:scale-105 transition-transform cursor-pointer"
        >
          {formatDuration(duration)}
        </button>

        {/* Comments Input */}
        <div className="mb-6 max-w-md mx-auto">
          <textarea
            value={comments}
            onChange={(e) => handleCommentsChange(e.target.value)}
            placeholder="Add notes about this activity..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          />
        </div>

        <button
          onClick={handleStop}
          className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Stop {config.title}
        </button>
      </div>
    </div>
  )
}
