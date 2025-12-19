import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivityConfig } from '../types'

interface ActivityButtonProps {
  config: ActivityConfig
  disabled?: boolean
}

function ActivityButton({ config, disabled }: ActivityButtonProps) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/activity/${config.type}`)
  }, [config.type, navigate])

  const IconComponent = typeof config.icon === 'string' ? null : config.icon

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${config.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
    >
      <div className="mb-3 flex justify-center">
        {IconComponent ? (
          <IconComponent className="w-12 h-12 text-white" />
        ) : (
          <span className="text-5xl">{config.icon}</span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-white">{config.title}</h3>
    </button>
  )
}

export default memo(ActivityButton)
