import { useState } from 'react'
import { ActivityConfig, ActivitySubcategory } from '../types'

interface ActivityButtonProps {
  config: ActivityConfig
  onClick: (subcategory?: ActivitySubcategory) => void
  disabled?: boolean
}

export default function ActivityButton({ config, onClick, disabled }: ActivityButtonProps) {
  const [showSubcategories, setShowSubcategories] = useState(false)

  const handleMainClick = () => {
    if (config.subcategories.length > 0) {
      setShowSubcategories(true)
    } else {
      onClick()
    }
  }

  const handleSubcategoryClick = (subcategory: ActivitySubcategory) => {
    onClick(subcategory)
    setShowSubcategories(false)
  }

  const handleBack = () => {
    setShowSubcategories(false)
  }

  if (showSubcategories) {
    return (
      <div className="col-span-2 md:col-span-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{config.icon}</span>
              <span>{config.title}</span>
            </h3>
            <button
              onClick={handleBack}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {config.subcategories.map(sub => (
              <button
                key={sub.value}
                onClick={() => handleSubcategoryClick(sub.value)}
                className={`${config.color} rounded-xl p-4 shadow hover:shadow-lg transform hover:scale-105 transition-all`}
              >
                <div className="text-3xl mb-2">{sub.icon}</div>
                <div className="text-sm font-medium text-white">{sub.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleMainClick}
      disabled={disabled}
      className={`${config.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
    >
      <div className="text-5xl mb-3">{config.icon}</div>
      <h3 className="text-xl font-semibold text-white">{config.title}</h3>
    </button>
  )
}
