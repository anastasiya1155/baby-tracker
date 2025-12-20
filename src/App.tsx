import { useState, useEffect, useCallback, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import { VibeKanbanWebCompanion } from 'vibe-kanban-web-companion'
import HomePage from './pages/HomePage'
import ActivityPage from './pages/ActivityPage'
import SettingsPage from './pages/SettingsPage'
import FirstLaunchModal from './components/FirstLaunchModal'
import { ActivityConfig, BabySettings } from './types'
import { FeedingIcon, PumpingIcon, DiaperIcon, SleepingIcon, PlayingIcon, HealthIcon, MeasurementsIcon } from './components/icons/ActivityIcons'
import { useLocalStorage } from './hooks/useLocalStorage'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const [settings, setSettings] = useLocalStorage<BabySettings>('babySettings', {
    babyName: '',
    dateOfBirth: '',
    gender: '',
    relationship: ''
  })
  const [showFirstLaunch, setShowFirstLaunch] = useState(false)

  useEffect(() => {
    if (!settings.babyName) {
      setShowFirstLaunch(true)
    }
  }, [settings.babyName])

  const handleFirstLaunchComplete = (newSettings: BabySettings) => {
    setSettings(newSettings)
    setShowFirstLaunch(false)
  }

  const activityConfigs: ActivityConfig[] = useMemo(() => [
    {
      type: 'feeding',
      icon: FeedingIcon,
      title: 'Feeding',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      inputType: 'timer',
      subcategories: [
        { value: 'left_breast', label: 'Left Breast', icon: '👈' },
        { value: 'right_breast', label: 'Right Breast', icon: '👉' },
        { value: 'bottle', label: 'Bottle', icon: '🍼' },
        { value: 'solids', label: 'Solids', icon: '🥄' }
      ]
    },
    {
      type: 'pumping',
      icon: PumpingIcon,
      title: 'Pumping',
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      inputType: 'timer',
      unit: 'ml',
      subcategories: [
        { value: 'left', label: 'Left', icon: '👈' },
        { value: 'right', label: 'Right', icon: '👉' },
        { value: 'both', label: 'Both', icon: '🤝' }
      ]
    },
    {
      type: 'diaper_change',
      icon: DiaperIcon,
      title: 'Diaper Change',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      inputType: 'instant',
      subcategories: [
        { value: 'dirty', label: 'Dirty', icon: '💩' },
        { value: 'wet', label: 'Wet', icon: '💧' }
      ]
    },
    {
      type: 'sleeping',
      icon: SleepingIcon,
      title: 'Sleeping',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      inputType: 'timer',
      subcategories: [
        { value: 'nap', label: 'Nap', icon: '💤' },
        { value: 'night', label: 'Night', icon: '🌙' }
      ]
    },
    {
      type: 'playing',
      icon: PlayingIcon,
      title: 'Playing',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      inputType: 'timer',
      subcategories: [
        { value: 'tummy_time', label: 'Tummy Time', icon: '🤸' },
        { value: 'outdoors', label: 'Outdoors', icon: '🌳' },
        { value: 'bath', label: 'Bath', icon: '🛁' },
        { value: 'gym', label: 'Gym', icon: '🎪' }
      ]
    },
    {
      type: 'health',
      icon: HealthIcon,
      title: 'Health',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      inputType: 'comment',
      subcategories: [
        { value: 'vaccination', label: 'Vaccination', icon: '💉' },
        { value: 'medicine', label: 'Medicine', icon: '💊' },
        { value: 'sick', label: 'Sick', icon: '🤒' },
        { value: 'temperature', label: 'Temperature', icon: '🌡️' }
      ]
    },
    {
      type: 'measurements',
      icon: MeasurementsIcon,
      title: 'Measurements',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      inputType: 'number',
      subcategories: [
        { value: 'height', label: 'Height', icon: '📏' },
        { value: 'weight', label: 'Weight', icon: '⚖️' },
        { value: 'head', label: 'Head', icon: '📐' }
      ]
    }
  ], [])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }, [isDark])

  return (
    <>
      {showFirstLaunch && <FirstLaunchModal onComplete={handleFirstLaunchComplete} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👶</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BabyTrack</h1>
                {settings.babyName && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tracking for {settings.babyName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {location.pathname === '/' && (
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Settings"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </header>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={<HomePage activityConfigs={activityConfigs} />}
            />
            <Route
              path="/activity/:activityType"
              element={<ActivityPage activityConfigs={activityConfigs} />}
            />
            <Route
              path="/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </div>

        <PWABadge />
        <VibeKanbanWebCompanion />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
