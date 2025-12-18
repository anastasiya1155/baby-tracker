import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-2 font-mono">
          {formatTime(time)}
        </div>
        <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          {formatDate(time)}
        </div>
      </div>
    </div>
  )
}
