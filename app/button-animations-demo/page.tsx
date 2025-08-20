'use client'

import { Button } from '@/components/ui/button'
import { AnimatedButton } from '@/components/ui/animated-button'
import { useButtonAnimation } from '@/hooks/use-button-animation'
import { ThemeToggle } from '@/components/theme-toggle'

export default function ButtonAnimationsDemo() {
  // Example of using the hook directly
  const { animationClass, triggerAnimation } = useButtonAnimation({
    animationType: 'animate-confetti-burst',
    duration: 1500
  })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Button Animations Demo</h1>
            <p className="text-muted-foreground">Add click animations to your existing buttons</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Method 1: Using AnimatedButton wrapper */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Method 1: AnimatedButton Wrapper</h2>
          <p className="text-muted-foreground mb-6">
            Wrap your existing buttons with AnimatedButton to add animations without changing their styling.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ripple Effect */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Ripple Effect</h3>
              <AnimatedButton 
                animationType="animate-ripple"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Click for Ripple
              </AnimatedButton>
            </div>

            {/* Confetti Burst */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Confetti Burst</h3>
              <AnimatedButton 
                animationType="animate-confetti-burst"
                duration={1500}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Click for Confetti
              </AnimatedButton>
            </div>

            {/* Sparkle Effect */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Sparkle Effect</h3>
              <AnimatedButton 
                animationType="animate-sparkle"
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Click for Sparkle
              </AnimatedButton>
            </div>

            {/* Trail Fade */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Trail Fade</h3>
              <AnimatedButton 
                animationType="animate-trail-fade"
                className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Click for Trail
              </AnimatedButton>
            </div>

            {/* Clone Float */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Clone Float</h3>
              <AnimatedButton 
                animationType="animate-clone-float"
                duration={2000}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Click for Clone
              </AnimatedButton>
            </div>

            {/* Pulse Wave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Pulse Wave</h3>
              <AnimatedButton 
                animationType="animate-pulse-wave"
                className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Click for Pulse
              </AnimatedButton>
            </div>

            {/* Ink Spread */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Ink Spread</h3>
              <AnimatedButton 
                animationType="animate-ink-spread"
                duration={2000}
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Click for Ink
              </AnimatedButton>
            </div>

            {/* Firework Particle */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Firework Particle</h3>
              <AnimatedButton 
                animationType="animate-firework-particle"
                duration={1500}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Click for Firework
              </AnimatedButton>
            </div>

            {/* Pixel Explosion */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Pixel Explosion</h3>
              <AnimatedButton 
                animationType="animate-pixel-explosion"
                duration={1500}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Click for Pixels
              </AnimatedButton>
            </div>

            {/* Shockwave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Shockwave</h3>
              <AnimatedButton 
                animationType="animate-shockwave"
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Click for Shockwave
              </AnimatedButton>
            </div>

            {/* Sound Wave */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Sound Wave</h3>
              <AnimatedButton 
                animationType="animate-sound-wave"
                duration={2000}
                className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Click for Sound
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* Method 2: Using the hook directly */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Method 2: Using the Hook Directly</h2>
          <p className="text-muted-foreground mb-6">
            Use the useButtonAnimation hook to add animations to any element with custom logic.
          </p>
          
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-medium mb-3">Custom Hook Example</h3>
            <div className="flex gap-4 items-center">
              <Button 
                onClick={triggerAnimation}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Trigger Confetti Animation
              </Button>
              
              {animationClass && (
                <div className="text-sm text-muted-foreground">
                  Animation active: {animationClass}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Method 3: Existing Button Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Method 3: Your Existing Button Components</h2>
          <p className="text-muted-foreground mb-6">
            You can also wrap your existing Button components from @/components/ui/button.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Primary Button with Ripple</h3>
              <AnimatedButton animationType="animate-ripple">
                <Button className="w-full">
                  Primary Button
                </Button>
              </AnimatedButton>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Secondary Button with Sparkle</h3>
              <AnimatedButton animationType="animate-sparkle">
                <Button variant="secondary" className="w-full">
                  Secondary Button
                </Button>
              </AnimatedButton>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Destructive Button with Shockwave</h3>
              <AnimatedButton animationType="animate-shockwave">
                <Button variant="destructive" className="w-full">
                  Destructive Button
                </Button>
              </AnimatedButton>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium mb-3">Outline Button with Confetti</h3>
              <AnimatedButton animationType="animate-confetti-burst">
                <Button variant="outline" className="w-full">
                  Outline Button
                </Button>
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-semibold text-foreground mb-3">How to Use:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Method 1: AnimatedButton Wrapper</h4>
              <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
{`<AnimatedButton 
  animationType="animate-ripple"
  className="your-existing-classes"
>
  Your Button Content
</AnimatedButton>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Method 2: Custom Hook</h4>
              <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
{`const { animationClass, triggerAnimation } = useButtonAnimation({
  animationType: 'animate-confetti-burst',
  duration: 1500
})`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
