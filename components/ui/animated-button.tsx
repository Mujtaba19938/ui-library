'use client'

import React, { forwardRef } from 'react'
import { useButtonAnimation } from '@/hooks/use-button-animation'

interface AnimatedButtonProps {
  children: React.ReactNode
  animationType?: 'animate-ripple' | 'animate-confetti-burst' | 'animate-sparkle' | 'animate-trail-fade' | 'animate-clone-float' | 'animate-pulse-wave' | 'animate-ink-spread' | 'animate-firework-particle' | 'animate-pixel-explosion' | 'animate-shockwave' | 'animate-sound-wave'
  duration?: number
  resetOnComplete?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
  [key: string]: any // Allow any other props to pass through
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    animationType = 'animate-ripple', 
    duration = 1000, 
    resetOnComplete = true,
    className = '',
    onClick,
    ...props 
  }, ref) => {
    const { isAnimating, animationClass, triggerAnimation } = useButtonAnimation({
      animationType,
      duration,
      resetOnComplete
    })

    const handleClick = (e: React.MouseEvent) => {
      triggerAnimation()
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        onClick={handleClick}
        {...props}
      >
        {/* Original button content */}
        {children}
        
        {/* Animation overlay */}
        {isAnimating && animationClass && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Ripple effect */}
            {animationClass === 'animate-ripple' && (
              <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full animate-ripple" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Confetti burst */}
            {animationClass === 'animate-confetti-burst' && (
              <>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)', animationDelay: '0.1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)', animationDelay: '0.2s' }}></div>
              </>
            )}
            
            {/* Sparkle effect */}
            {animationClass === 'animate-sparkle' && (
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-300 rounded animate-sparkle" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Trail fade */}
            {animationClass === 'animate-trail-fade' && (
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-trail-fade" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Clone float */}
            {animationClass === 'animate-clone-float' && (
              <div className="absolute top-1/2 left-1/2 bg-green-500 text-white rounded-lg font-medium animate-clone-float" style={{ transform: 'translate(-50%, -50%)', padding: '8px 16px' }}>Clone</div>
            )}
            
            {/* Pulse wave */}
            {animationClass === 'animate-pulse-wave' && (
              <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-blue-300/50 rounded-full animate-pulse-wave" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Ink spread */}
            {animationClass === 'animate-ink-spread' && (
              <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-black/60 rounded-full animate-ink-spread" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Firework particle */}
            {animationClass === 'animate-firework-particle' && (
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-firework-particle" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Pixel explosion */}
            {animationClass === 'animate-pixel-explosion' && (
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white animate-pixel-explosion" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Shockwave */}
            {animationClass === 'animate-shockwave' && (
              <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full animate-shockwave" style={{ transform: 'translate(-50%, -50%)' }}></div>
            )}
            
            {/* Sound wave */}
            {animationClass === 'animate-sound-wave' && (
              <div className="absolute top-1/2 left-1/2 border-2 border-white/40 rounded-full animate-sound-wave" style={{ transform: 'translate(-50%, -50%)', width: '20px', height: '20px' }}></div>
            )}
          </div>
        )}
      </button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'
