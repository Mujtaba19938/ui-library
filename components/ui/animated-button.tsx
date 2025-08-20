'use client'

import React, { forwardRef, useState } from 'react'
import { useButtonAnimation } from '@/hooks/use-button-animation'

interface AnimatedButtonProps {
  children: React.ReactNode
  animationType?: 'animate-ripple' | 'animate-confetti-burst' | 'animate-sparkle' | 'animate-trail-fade' | 'animate-clone-float' | 'animate-pulse-wave' | 'animate-ink-spread' | 'animate-firework-particle' | 'animate-pixel-explosion' | 'animate-shockwave' | 'animate-sound-wave' | 'animate-bounce' | 'animate-pulse' | 'animate-clone'
  duration?: number
  resetOnComplete?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
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
    variant = 'default',
    size = 'default',
    disabled = false,
    type = 'button',
    ...props 
  }, ref) => {
    const { isAnimating, animationClass, triggerAnimation } = useButtonAnimation({
      animationType,
      duration,
      resetOnComplete
    })

    // State for clone animation
    const [clones, setClones] = useState<Array<{id: number, x: number, y: number, width: number, height: number, text: React.ReactNode}>>([])

    const handleClick = (e: React.MouseEvent) => {
      // Handle clone animation specially
      if (animationType === 'animate-clone') {
        const rect = e.currentTarget.getBoundingClientRect()
        const newClone = {
          id: Date.now(),
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          text: children,
        }
        
        setClones(prev => [...prev, newClone])
        
        // Remove clone after animation ends
        setTimeout(() => {
          setClones(prev => prev.filter(c => c.id !== newClone.id))
        }, 600)
      } else {
        triggerAnimation()
      }
      
      onClick?.(e)
    }

    // Base button classes based on variant
    const baseClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    }

    // Size classes
    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10'
    }

    const buttonClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${baseClasses[variant as keyof typeof baseClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`

    // For bounce, pulse, and clone animations, we apply the class directly to the button
    const shouldApplyDirectly = animationClass === 'animate-bounce' || animationClass === 'animate-pulse'
    const directAnimationClass = animationClass === 'animate-bounce' ? 'bounce' : animationClass === 'animate-pulse' ? 'pulse' : ''
    const buttonClassName = shouldApplyDirectly 
      ? `relative overflow-hidden ${buttonClasses} ${directAnimationClass}`
      : `relative overflow-hidden ${buttonClasses}`

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={buttonClassName}
        onClick={handleClick}
        {...props}
      >
        {/* Original button content */}
        {children}
        
        {/* Clone animation - render animated clones */}
        {animationType === 'animate-clone' && clones.map((clone) => (
          <span
            key={clone.id}
            className="clone bg-blue-500 text-white rounded flex items-center justify-center"
            style={{
              left: clone.x,
              top: clone.y,
              width: clone.width,
              height: clone.height,
              position: "fixed",
            }}
          >
            {clone.text}
          </span>
        ))}
        
        {/* Animation overlay - only for non-direct animations */}
        {isAnimating && animationClass && !shouldApplyDirectly && (
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
