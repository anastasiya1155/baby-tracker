import { ActivityConfig } from '../types'

interface ActivityButtonProps {
  config: ActivityConfig
  onClick: () => void
  disabled?: boolean
}

export default function ActivityButton({ config, onClick, disabled }: ActivityButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${config.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
    >
      <div className="text-5xl mb-3">{config.icon}</div>
      <h3 className="text-xl font-semibold text-white">{config.title}</h3>
    </button>
  )
}
