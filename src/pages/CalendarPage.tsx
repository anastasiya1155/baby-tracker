import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DayComment, BabySettings } from '../types'
import { BirthdayIcon } from '../components/icons/ActivityIcons'

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export function CalendarPage() {
  const navigate = useNavigate()
  const [comments, setComments] = useLocalStorage<DayComment[]>('dayComments', [])
  const [settings] = useLocalStorage<BabySettings>('babySettings', {
    babyName: '',
    dateOfBirth: '',
    gender: '',
    relationship: ''
  })

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [showAllComments, setShowAllComments] = useState(false)

  // Helper function to parse date string in local timezone
  const parseLocalDate = useCallback((dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }, [])

  // Helper function to format date to YYYY-MM-DD in local timezone
  const formatLocalDate = useCallback((date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [])

  // Parse birth date once and memoize
  const birthDate = useMemo(() => {
    return settings.dateOfBirth ? parseLocalDate(settings.dateOfBirth) : null
  }, [settings.dateOfBirth, parseLocalDate])

  // Calculate baby's age in weeks and months
  const calculateBabyAge = useCallback((date: Date) => {
    if (!birthDate) return null

    const diffTime = date.getTime() - birthDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(diffDays / 7)
    const months = Math.floor(diffDays / 30)

    return { weeks, months, days: diffDays }
  }, [birthDate])

  // Get calendar days for the current month view
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Convert Sunday=0 to Monday=0 format (0=Mon, 1=Tue, ..., 6=Sun)
    let startingDayOfWeek = firstDay.getDay() - 1
    if (startingDayOfWeek === -1) startingDayOfWeek = 6 // Sunday becomes 6

    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }, [currentDate])

  // Create a map for faster comment lookup
  const commentsMap = useMemo(() => {
    const map = new Map<string, DayComment>()
    comments.forEach(comment => map.set(comment.date, comment))
    return map
  }, [comments])

  const formatDateKey = useCallback((date: Date) => {
    return formatLocalDate(date)
  }, [formatLocalDate])

  const getCommentForDate = useCallback((date: Date) => {
    const dateKey = formatDateKey(date)
    return commentsMap.get(dateKey)
  }, [commentsMap, formatDateKey])

  const handleDateClick = useCallback((date: Date) => {
    const dateKey = formatDateKey(date)
    setSelectedDate(dateKey)
    const existingComment = commentsMap.get(dateKey)
    setCommentText(existingComment?.comment || '')
  }, [formatDateKey, commentsMap])

  const handleSaveComment = useCallback(() => {
    if (!selectedDate) return

    const existingCommentIndex = comments.findIndex(c => c.date === selectedDate)

    if (commentText.trim()) {
      const newComment: DayComment = {
        id: existingCommentIndex >= 0 ? comments[existingCommentIndex].id : Date.now().toString(),
        date: selectedDate,
        comment: commentText.trim(),
        createdAt: Date.now()
      }

      if (existingCommentIndex >= 0) {
        const updatedComments = [...comments]
        updatedComments[existingCommentIndex] = newComment
        setComments(updatedComments)
      } else {
        setComments([...comments, newComment])
      }
    } else if (existingCommentIndex >= 0) {
      // Remove comment if text is empty
      setComments(comments.filter(c => c.date !== selectedDate))
    }

    setSelectedDate(null)
    setCommentText('')
  }, [selectedDate, commentText, comments, setComments])

  // Memoize today's date key to avoid recalculating on every render
  const todayKey = useMemo(() => formatLocalDate(new Date()), [formatLocalDate])

  const getDayClassName = useCallback((date: Date) => {
    const dateKey = formatDateKey(date)
    const hasComment = commentsMap.has(dateKey)
    const isToday = todayKey === dateKey
    const age = calculateBabyAge(date)

    let classes = 'h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 '

    if (isToday) {
      classes += 'ring-2 ring-blue-500 '
    }

    if (hasComment) {
      classes += 'bg-yellow-50 dark:bg-yellow-900/20 '
    }

    // Highlight weeks (up to 4 months) and months
    if (age && birthDate) {
      // Check if this is a week anniversary (up to 16 weeks / ~4 months)
      if (age.days > 0 && age.days % 7 === 0 && age.weeks <= 16) {
        classes += 'ring-2 ring-pink-400 dark:ring-pink-600 '
      }

      // Check if this is a month anniversary
      if (date.getDate() === birthDate.getDate() && age.months > 0) {
        classes += 'ring-2 ring-purple-500 dark:ring-purple-600 '
      }
    }

    return classes
  }, [formatDateKey, commentsMap, todayKey, calculateBabyAge, birthDate])

  const changeMonth = useCallback((delta: number) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + delta, 1))
  }, [])

  const handleCancelComment = useCallback(() => {
    setSelectedDate(null)
    setCommentText('')
  }, [])

  const handleViewSummary = useCallback(() => {
    if (selectedDate) {
      navigate(`/summary?date=${selectedDate}`)
    }
  }, [selectedDate, navigate])

  // Memoize sorted comments
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => parseLocalDate(b.date).getTime() - parseLocalDate(a.date).getTime())
  }, [comments, parseLocalDate])

  if (showAllComments) {

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Comments</h1>
          <button
            onClick={() => setShowAllComments(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Back to Calendar
          </button>
        </div>

        {sortedComments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {sortedComments.map(comment => {
              const date = parseLocalDate(comment.date)
              const age = calculateBabyAge(date)

              return (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </h3>
                      {age && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {age.weeks > 0 && `${age.weeks} week${age.weeks !== 1 ? 's' : ''}`}
                          {age.weeks > 0 && age.months > 0 && ' / '}
                          {age.months > 0 && `${age.months} month${age.months !== 1 ? 's' : ''} old`}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Back to homepage"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Previous month"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h1>

          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Next month"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setShowAllComments(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          View All Comments
        </button>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 ring-2 ring-blue-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-50 dark:bg-yellow-900/20 border border-gray-300 dark:border-gray-600 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Has Comment</span>
        </div>
        {settings.dateOfBirth && (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 ring-2 ring-pink-400 dark:ring-pink-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">Week Anniversary (up to 16 weeks)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 ring-2 ring-purple-500 dark:ring-purple-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">Month Anniversary</span>
            </div>
          </>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAY_HEADERS.map(day => (
            <div key={day} className="text-center font-semibold text-gray-700 dark:text-gray-300">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-24"></div>
            }

            const age = calculateBabyAge(day)
            const comment = getCommentForDate(day)

            return (
              <div
                key={formatDateKey(day)}
                onClick={() => handleDateClick(day)}
                className={getDayClassName(day)}
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {day.getDate()}
                </div>
                {age && age.days >= 0 && settings.dateOfBirth && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {age.days === 0 && <span className="flex items-center gap-1"><BirthdayIcon className="w-3 h-3 inline" /> Birth</span>}
                    {age.days > 0 && age.days % 7 === 0 && age.weeks <= 16 && (
                      <div className="font-semibold text-pink-600 dark:text-pink-400">
                        {age.weeks}w
                      </div>
                    )}
                    {age.days > 0 && birthDate && day.getDate() === birthDate.getDate() && age.months > 0 && (
                      <div className="font-semibold text-purple-600 dark:text-purple-400">
                        {age.months}m
                      </div>
                    )}
                  </div>
                )}
                {comment && (
                  <div className="text-xs text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                    {comment.comment}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Comment Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {parseLocalDate(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>

            {settings.dateOfBirth && (() => {
              const age = calculateBabyAge(parseLocalDate(selectedDate))
              return age && age.days >= 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {age.days === 0 && 'Birth day!'}
                  {age.days > 0 && (
                    <>
                      {age.weeks > 0 && `${age.weeks} week${age.weeks !== 1 ? 's' : ''}`}
                      {age.weeks > 0 && age.months > 0 && ' / '}
                      {age.months > 0 && `${age.months} month${age.months !== 1 ? 's' : ''} old`}
                    </>
                  )}
                </p>
              ) : null
            })()}

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment for this day..."
              className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            />

            <div className="flex flex-col space-y-3 mt-4">
              <button
                onClick={handleViewSummary}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                View Day Summary
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveComment}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Comment
                </button>
                <button
                  onClick={handleCancelComment}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
