import { DaySummary, formatSummaryDuration } from '../utils/summaries'
import { FeedingIcon, PumpingIcon, SleepingIcon, PlayingIcon } from './icons/ActivityIcons'

interface DaySummaryCardProps {
  summary: DaySummary
  onClick?: () => void
}

export const DaySummaryCard: React.FC<DaySummaryCardProps> = ({ summary, onClick }) => {
  const summaryItems = [
    {
      icon: <FeedingIcon className="w-6 h-6" />,
      label: 'Feeding',
      value: formatSummaryDuration(summary.totalFeeding),
      count: summary.feedingCount,
      color: 'text-pink-600 dark:text-pink-400'
    },
    {
      icon: <PumpingIcon className="w-6 h-6" />,
      label: 'Pumping',
      value: summary.totalPumping > 0 ? `${summary.totalPumping} ml` : '0 ml',
      count: summary.pumpingCount,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: <SleepingIcon className="w-6 h-6" />,
      label: 'Sleep',
      value: formatSummaryDuration(summary.totalSleep),
      count: summary.sleepCount,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <PlayingIcon className="w-6 h-6" />,
      label: 'Play',
      value: formatSummaryDuration(summary.totalPlay),
      count: summary.playCount,
      color: 'text-green-600 dark:text-green-400'
    },
  ]

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${
        onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      }`}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Today's Summary
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className={item.color}>{item.icon}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {item.label}
            </div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {item.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.count} {item.count === 1 ? 'time' : 'times'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
