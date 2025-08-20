'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function AnimationTest() {
  const [triggerAnimations, setTriggerAnimations] = useState(false)

  const triggerAllAnimations = () => {
    setTriggerAnimations(true)
    setTimeout(() => setTriggerAnimations(false), 5000) // Increased to 5 seconds
  }

  // Debug function to see if state is changing
  const debugState = () => {
    console.log('Current triggerAnimations state:', triggerAnimations)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Animation Test Page</h1>
            <p className="text-muted-foreground">Test all CSS animations defined in globals.css</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex gap-4 mb-8">
          <Button onClick={triggerAllAnimations}>
            Trigger All Animations
          </Button>
          <Button onClick={debugState} variant="outline">
            Debug State: {triggerAnimations ? 'TRUE' : 'FALSE'}
          </Button>
        </div>

        {/* Background Effect Animations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Background Effect Animations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gradient Animation */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Gradient Animation</h3>
              <div className="h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x rounded-lg"></div>
            </div>

            {/* Twinkle Animation */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Twinkle Animation</h3>
              <div className="h-24 bg-blue-900 rounded-lg relative overflow-hidden">
                <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse stars-far"></div>
                <div className="absolute top-8 right-4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse stars-medium"></div>
                <div className="absolute bottom-4 left-1/2 w-1 h-1 bg-yellow-100 rounded-full animate-pulse stars-close"></div>
              </div>
            </div>

            {/* Rain Effect */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Rain Effect</h3>
              <div className="h-24 bg-gray-800 rounded-lg relative overflow-hidden">
                <div className="rain-column absolute top-0 left-2 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-6 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-10 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-14 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-18 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-22 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-26 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-30 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-34 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-38 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-42 w-0.5 h-6 bg-blue-400"></div>
                <div className="rain-column absolute top-0 left-46 w-0.5 h-6 bg-blue-400"></div>
              </div>
            </div>

            {/* Firefly */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Firefly Animation</h3>
              <div className="h-24 bg-gray-900 rounded-lg relative overflow-hidden">
                <div className="firefly absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="firefly absolute top-12 right-6 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Morphing Blob */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Morphing Blob</h3>
              <div className="h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg morph-blob-1" style={{ animation: 'morph-blob-1 4s ease-in-out infinite' }}></div>
            </div>

            {/* Kaleidoscope */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Kaleidoscope</h3>
              <div className="h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg kaleidoscope-pattern" style={{ animation: 'rotate-kaleidoscope 8s linear infinite' }}></div>
            </div>

            {/* Wave Animation */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Wave Animation</h3>
              <div className="h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg wave-layer" style={{ animation: 'wave-move-1 6s linear infinite' }}></div>
            </div>
          </div>
        </section>

        {/* Click Effect Animations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Click Effect Animations</h2>
          
          {/* Simple Test Animation */}
          <div className="mb-8 p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3">Simple Test Animation</h3>
            <div className="h-24 bg-green-500 rounded-lg relative overflow-hidden">
              {triggerAnimations && (
                <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-yellow-400 rounded-full animate-bounce border-2 border-white shadow-lg" style={{ transform: 'translate(-50%, -50%)' }}></div>
              )}
              <div className="absolute top-2 right-2 text-xs text-white">
                {triggerAnimations ? 'BOUNCING!' : 'Click button above'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ripple Effect */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Ripple Effect</h3>
              <div className="h-24 bg-blue-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-red-500 rounded-full animate-ripple" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'ANIMATING!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Confetti Burst */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Confetti Burst</h3>
              <div className="h-24 bg-green-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)', animationDelay: '0.1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-300 rounded animate-confetti-burst" style={{ transform: 'translate(-50%, -50%)', animationDelay: '0.2s' }}></div>
                  </>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'CONFETTI!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Sparkle Effect */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Sparkle Effect</h3>
              <div className="h-24 bg-purple-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-300 rounded animate-sparkle" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'SPARKLE!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Trail Fade */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Trail Fade</h3>
              <div className="h-24 bg-pink-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-trail-fade" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'TRAIL!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Clone Float */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Clone Float</h3>
              <div className="h-24 bg-orange-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 bg-green-500 text-white rounded-lg font-medium animate-clone-float" style={{ transform: 'translate(-50%, -50%)', padding: '8px 16px' }}>Clone</div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'CLONE!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Pulse Wave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Pulse Wave</h3>
              <div className="h-24 bg-teal-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-blue-300/50 rounded-full animate-pulse-wave" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'PULSE!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Ink Spread */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Ink Spread</h3>
              <div className="h-24 bg-indigo-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-black/60 rounded-full animate-ink-spread" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'INK!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Firework Particle */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Firework Particle</h3>
              <div className="h-24 bg-red-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-firework-particle" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'FIREWORK!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Pixel Explosion */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Pixel Explosion</h3>
              <div className="h-24 bg-gray-700 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white animate-pixel-explosion" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'PIXEL!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Shockwave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Shockwave</h3>
              <div className="h-24 bg-yellow-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full animate-shockwave" style={{ transform: 'translate(-50%, -50%)' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'SHOCKWAVE!' : 'Click button above'}
                </div>
              </div>
            </div>

            {/* Sound Wave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Sound Wave</h3>
              <div className="h-24 bg-cyan-500 rounded-lg relative overflow-hidden">
                {triggerAnimations && (
                  <div className="absolute top-1/2 left-1/2 border-2 border-white/40 rounded-full animate-sound-wave" style={{ transform: 'translate(-50%, -50%)', width: '20px', height: '20px' }}></div>
                )}
                <div className="absolute top-2 right-2 text-xs text-white">
                  {triggerAnimations ? 'SOUND!' : 'Click button above'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-semibold text-foreground mb-3">How to Test:</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Click "Trigger All Animations" to see click effects in action</li>
            <li>Background effects run continuously</li>
            <li>Each animation uses the CSS classes defined in globals.css</li>
            <li>Check browser dev tools to verify CSS is being applied</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
