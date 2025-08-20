import { useState, useCallback } from 'react'

type AnimationType = 
  | 'animate-ripple'
  | 'animate-confetti-burst'
  | 'animate-sparkle'
  | 'animate-trail-fade'
  | 'animate-clone-float'
  | 'animate-pulse-wave'
  | 'animate-ink-spread'
  | 'animate-firework-particle'
  | 'animate-pixel-explosion'
  | 'animate-shockwave'
  | 'animate-sound-wave'

interface UseButtonAnimationOptions {
  animationType?: AnimationType
  duration?: number
  resetOnComplete?: boolean
}

export function useButtonAnimation(options: UseButtonAnimationOptions = {}) {
  const {
    animationType = 'animate-ripple',
    duration = 1000,
    resetOnComplete = true
  } = options

  const [isAnimating, setIsAnimating] = useState(false)
  const [animationClass, setAnimationClass] = useState<string | null>(null)

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return // Prevent multiple animations

    setIsAnimating(true)
    setAnimationClass(animationType)

    // Reset animation after duration
    setTimeout(() => {
      setIsAnimating(false)
      if (resetOnComplete) {
        setAnimationClass(null)
      }
    }, duration)
  }, [animationType, duration, resetOnComplete, isAnimating])

  return {
    isAnimating,
    animationClass,
    triggerAnimation
  }
}
