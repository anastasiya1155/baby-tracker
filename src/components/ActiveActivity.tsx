import { useState, useEffect, memo, useCallback, useMemo } from 'react'
import { Activity, ActivityConfig } from '../types'
import { formatTime } from '../utils/formatting'

interface ActiveActivityProps {
  activity: Activity
  config: ActivityConfig
  onStop: (comments?: string, value?: number) => void
  onUpdateComments: (comments: string) => void
  onUpdateStartTime: (startTime: number) => void
}

function ActiveActivity({ activity, config, onStop, onUpdateComments, onUpdateStartTime }: ActiveActivityProps) {
  const [duration, setDuration] = useState(0)
  const [comments, setComments] = useState(activity.comments || '')
  const [amount, setAmount] = useState<string>('')
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

  const formattedDuration = useMemo(() => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const secs = duration % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }, [duration])

  const formatStartTime = useCallback((timestamp: number) => {
    return formatTime(new Date(timestamp))
  }, [])

  const handleCommentsChange = useCallback((value: string) => {
    setComments(value)
    onUpdateComments(value)
  }, [onUpdateComments])

  const handleStop = useCallback(() => {
    const amountValue = amount.trim() ? parseFloat(amount) : undefined
    onStop(comments.trim() || undefined, amountValue)
  }, [onStop, comments, amount])

  const handleTimerClick = useCallback(() => {
    const start = new Date(activity.startTime)
    setEditDate(start.toISOString().split('T')[0])
    setEditTime(start.toTimeString().slice(0, 5))
    setIsEditingTime(true)
  }, [activity.startTime])

  const handleSaveTime = useCallback(() => {
    const newStartTime = new Date(`${editDate}T${editTime}`).getTime()
    if (newStartTime > Date.now()) {
      alert('Start time cannot be in the future')
      return
    }
    onUpdateStartTime(newStartTime)
    setIsEditingTime(false)
  }, [editDate, editTime, onUpdateStartTime])

  const handleCancelEditTime = useCallback(() => {
    setIsEditingTime(false)
  }, [])

  const subcategoryInfo = useMemo(() => {
    if (!activity.subcategory) return null
    const subConfig = config.subcategories.find(s => s.value === activity.subcategory)
    return subConfig ? { icon: subConfig.icon, label: subConfig.label } : null
  }, [activity.subcategory, config.subcategories])

  return (
    <div className={`${config.color} rounded-3xl p-8 shadow-xl mb-8 animate-pulse-slow`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {typeof config.icon === 'function' ? <config.icon className="w-16 h-16 text-white" /> : <span className="text-6xl">{config.icon}</span>}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{config.title} in Progress</h2>
        {subcategoryInfo && (
          <p className="text-white/90 text-xl mb-2 flex items-center justify-center gap-2">
            {subcategoryInfo.icon && <subcategoryInfo.icon className="w-5 h-5" />}
            {subcategoryInfo.label}
          </p>
        )}

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
          {formattedDuration}
        </button>

        {/* Amount Input - Only show if config has unit */}
        {config.unit && (
          <div className="mb-6 max-w-md mx-auto">
            <label className="block text-white text-sm mb-2">
              Amount ({config.unit})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${config.unit}`}
              className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        )}

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

export default memo(ActiveActivity)
