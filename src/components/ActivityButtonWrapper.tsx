import { memo, useCallback } from 'react'
import ActivityButton from './ActivityButton'
import { ActivityConfig, ActivityType, ActivitySubcategory } from '../types'

interface ActivityButtonWrapperProps {
  config: ActivityConfig
  onStartActivity: (type: ActivityType, subcategory?: ActivitySubcategory) => void
}

const ActivityButtonWrapper = memo(function ActivityButtonWrapper({ config, onStartActivity }: ActivityButtonWrapperProps) {
  const handleClick = useCallback((subcategory?: ActivitySubcategory) => {
    onStartActivity(config.type, subcategory)
  }, [config.type, onStartActivity])

  return <ActivityButton config={config} onClick={handleClick} />
})

export default ActivityButtonWrapper
