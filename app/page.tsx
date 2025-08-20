"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Github,
  Twitter,
  Linkedin,
  Zap,
  Palette,
  Smartphone,
  Copy,
  Star,
  Download,
  ArrowRight,
  Check,
} from "lucide-react"

export default function HomePage() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [animatedNumbers, setAnimatedNumbers] = useState({ stars: 0, downloads: 0 })
  const [typedText, setTypedText] = useState("")
  const [showSubtext, setShowSubtext] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showComponents, setShowComponents] = useState(false)
  const [showNavItems, setShowNavItems] = useState(false)
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const fullText = "Build Faster with Beautiful UI Components"

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }



  useEffect(() => {
    // Cursor blinking animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    // Terminal loading text animation
    const loadingMessages = ["INITIALIZING...", "LOADING COMPONENTS...", "PREPARING UI...", "READY!"]
    let messageIndex = 0
    let charIndex = 0

    const typeMessage = () => {
      if (messageIndex < loadingMessages.length) {
        const currentMessage = loadingMessages[messageIndex]
        if (charIndex < currentMessage.length) {
          setLoadingText(currentMessage.slice(0, charIndex + 1))
          charIndex++
          setTimeout(typeMessage, 50)
        } else {
          setTimeout(() => {
            messageIndex++
            charIndex = 0
            if (messageIndex < loadingMessages.length) {
              setLoadingText("")
              setTimeout(typeMessage, 200)
            }
          }, 500)
        }
      }
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    // Start typing animation after a brief delay
    setTimeout(typeMessage, 500)

    // Complete loading after 3 seconds
    const timer = setTimeout(() => {
      clearInterval(cursorInterval)
      clearInterval(progressInterval)
      setIsLoading(false)
      setTimeout(() => {
        setShowNavItems(true)
        let i = 0
        const typeTimer = setInterval(() => {
          if (i < fullText.length) {
            setTypedText(fullText.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeTimer)
            setTimeout(() => setShowSubtext(true), 300)
            setTimeout(() => setShowButtons(true), 600)
            setTimeout(() => setShowComponents(true), 900)
          }
        }, 50)
      }, 100)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (visibleElements.has("testimonials")) {
      const animateNumber = (target: number, key: "stars" | "downloads") => {
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setAnimatedNumbers((prev) => ({ ...prev, [key]: Math.floor(current) }))
        }, 30)
      }

      animateNumber(4.9, "stars")
      animateNumber(50, "downloads")
    }
  }, [visibleElements])

  const setupObserver = (element: HTMLElement | null, id: string) => {
    if (element && observerRef.current) {
      element.id = id
      observerRef.current.observe(element)
    }
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Pre-built components that integrate seamlessly into your workflow.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Fully Customizable",
      description: "Tailor every component to match your brand and design system.",
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Accessible by Default",
      description: "WCAG-compliant components that work for everyone, out of the box.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Looks perfect on desktop, tablet, and mobile devices.",
    },
  ]

  const components = [
    { name: "Button", color: "bg-blue-500" },
    { name: "Card", color: "bg-purple-500" },
    { name: "Modal", color: "bg-teal-500" },
    { name: "Form", color: "bg-indigo-500" },
    { name: "Navigation", color: "bg-cyan-500" },
    { name: "Table", color: "bg-violet-500" },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      quote: "These components saved us weeks of development time. The quality and attention to detail is outstanding.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Design System Lead",
      company: "StartupXYZ",
      quote:
        "Finally, a component library that actually understands developer experience. Clean, consistent, and customizable.",
    },
    {
      name: "Emily Johnson",
      role: "Product Designer",
      company: "InnovateLab",
      quote: "The accessibility features are top-notch. We can ship inclusive products without the extra overhead.",
    },
  ]

  const getDockScale = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.15 // Hovered item
    if (distance === 1) return 1.08 // Adjacent items
    if (distance === 2) return 1.03 // Second adjacent items
    return 1 // Default scale
  }

  const getDockTranslateY = (index: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 0
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return -4 // Hovered item moves up most
    if (distance === 1) return -2 // Adjacent items move up slightly
    return 0 // No movement for distant items
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        {/* CRT Scanlines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 dark:via-blue-500/5 to-transparent animate-scanlines"></div>
        </div>

        {/* Retro Computer Monitor */}
        <div className="relative">
          {/* Monitor Glow */}
          <div className="absolute -inset-3 rounded-xl blur-xl animate-pulse bg-black/20 dark:bg-blue-500/20"></div>

          {/* Monitor Frame */}
          <div className="relative p-2 rounded-lg shadow-2xl bg-black dark:bg-blue-500">
            <div className="p-1.5 rounded-md bg-black/80 dark:bg-blue-500/80">
              <div className="p-3 rounded-md min-w-[240px] min-h-[160px] flex flex-col justify-center items-center relative overflow-hidden bg-white dark:bg-blue-500 border border-gray-300 dark:border-blue-500/30">
                {/* Screen Glow */}
                <div className="absolute inset-0 animate-pulse bg-black/10 dark:bg-blue-500/20"></div>

                {/* Terminal Content */}
                <div className="relative z-10 text-center font-mono">
                  {/* Computer Icon */}
                  <div className="mb-3 text-3xl text-black dark:text-blue-400">
                    <div className="inline-block">
                      ▄▄▄▄▄▄▄▄▄
                      <br />
                      █░░░░░░░█
                      <br />
                      █░░░░░░░█
                      <br />
                      █░░░░░░░█
                      <br />
                      ▀▀▀▀▀▀▀▀▀
                      <br />
                      ░░▄▄▄░░
                    </div>
                  </div>

                  {/* Loading Text */}
                  <div className="text-base mb-3 h-5 text-black dark:text-blue-400">
                    {loadingText}
                    {showCursor && <span className="animate-pulse">_</span>}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-48 mb-2">
                    <div className="text-xs mb-1 font-mono text-black dark:text-blue-400">
                      [{Math.floor(loadingProgress)}%]
                    </div>
                    <div className="h-2.5 rounded border bg-gray-200 dark:bg-blue-500/30 border-gray-400 dark:border-blue-500/30">
                      <div
                        className="h-full rounded transition-all duration-100 flex items-center justify-center text-xs font-bold bg-black dark:bg-blue-500 text-white"
                        style={{ width: `${loadingProgress}%` }}
                      >
                        <div className="flex">
                          {Array.from({ length: Math.floor(loadingProgress / 5) }).map((_, i) => (
                            <span key={i}></span>
                          ))}
                          {Array.from({ length: Math.floor((100 - loadingProgress) / 5) }).map((_, i) => (
                            <span key={i} className="text-gray-400 dark:text-blue-800">
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="text-xs font-mono opacity-70 text-black dark:text-blue-300">
                    UIKIT OS v2.0 - TERMINAL READY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <header className="relative z-10 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-md border border-border/40 rounded-full px-4 py-2 flex items-center justify-between shadow-lg dark:shadow-[0_0_60px_rgba(59,130,246,0.4)] dark:shadow-blue-500/50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="text-lg font-bold">UIKit</span>
            </div>

            <nav className="hidden md:flex items-center space-x-4 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30 dark:shadow-[0_0_40px_rgba(59,130,246,0.35)] dark:shadow-blue-500/40">
              {["Features", "Components", "Docs", "Pricing"].map((item, index) => (
                <a
                  key={item}
                  href={item === "Docs" ? "/docs" : `#${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (item !== "Docs") {
                      e.preventDefault()
                      scrollToSection(item.toLowerCase())
                    }
                  }}
                  className={`relative px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 ease-out rounded-full ${
                    showNavItems ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: showNavItems
                      ? `scale(${getDockScale(index, hoveredNavIndex)}) translateY(${getDockTranslateY(index, hoveredNavIndex)}px)`
                      : `translateX(${20 + index * 10}px) scale(1)`,
                  }}
                  onMouseEnter={() => {
                    if (showNavItems) {
                      setHoveredNavIndex(index)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredNavIndex(null)
                  }}
                >
                  <span className="relative z-10">{item}</span>
                  {hoveredNavIndex === index && showNavItems && (
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-in fade-in-0 zoom-in-95 duration-200" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full bg-transparent transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 text-xs px-3 py-1.5 h-8 ${
                  showNavItems ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: showNavItems ? "0ms" : "0ms" }} // Removed delay so GitHub button appears with navbar items
              >
                <Github className="h-3.5 w-3.5 mr-1.5" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in-up">
              ✨ New: Dark mode support
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent min-h-[1.2em]">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>

            <p
              className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Ship stunning interfaces in minutes, not hours. Our component library combines speed, consistency, and
              modern design.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 animate-pulse-glow"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:shadow-lg transition-all duration-300"
              >
                <a href="/docs">View Docs</a>
              </Button>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {!showComponents && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-24 bg-muted rounded-xl animate-shimmer"></div>
                  ))}
                </div>
              )}

              {showComponents && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 perspective-1000">
                  {components.map((component, index) => (
                    <div
                      key={component.name}
                      className={`${component.color} rounded-xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl animate-fade-in-up`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-sm font-medium">{component.name}</div>
                      <div className="mt-2 h-8 bg-white/20 rounded"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Components?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern best practices and developer experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {features.map((feature, index) => (
              <div key={index} className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 animate-glow-rotate transition-opacity duration-500"></div>
                <Card
                  ref={(el) => setupObserver(el, `feature-${index}`)}
                  className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-background h-full flex flex-col ${
                    visibleElements.has(`feature-${index}`)
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="components" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Component Gallery</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hover over components to see them in action
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {components.map((component, index) => (
              <Card
                key={component.name}
                ref={(el) => setupObserver(el, `showcase-${index}`)}
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 ${
                  hoveredComponent === component.name ? "border-primary scale-105" : "border-transparent"
                } ${
                  visibleElements.has(`showcase-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredComponent(component.name)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <CardHeader>
                  <div
                    className={`w-full h-32 ${component.color} rounded-lg mb-4 flex items-center justify-center text-white font-semibold text-lg transition-all duration-300 ${
                      hoveredComponent === component.name ? "scale-110" : ""
                    }`}
                  >
                    {component.name}
                  </div>
                  <CardTitle>{component.name} Component</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Beautiful, accessible {component.name.toLowerCase()} component ready to use in your project.
                  </CardDescription>
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free, upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card
              ref={(el) => setupObserver(el, "pricing-free")}
              className={`relative border-2 transition-all duration-700 hover:shadow-xl ${
                visibleElements.has("pricing-free") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold mb-2">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">5 Components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic Templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Community Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">MIT License</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card
              ref={(el) => setupObserver(el, "pricing-pro")}
              className={`relative border-2 border-primary shadow-lg scale-105 transition-all duration-700 hover:shadow-2xl ${
                visibleElements.has("pricing-pro") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold mb-2">$29</div>
                <CardDescription>For professional developers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">50+ Components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Premium Templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced Customization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Figma Design System</span>
                  </div>
                </div>
                <Button className="w-full mt-6">Start Pro Trial</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card
              ref={(el) => setupObserver(el, "pricing-enterprise")}
              className={`relative border-2 transition-all duration-700 hover:shadow-xl ${
                visibleElements.has("pricing-enterprise") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold mb-2">$99</div>
                <CardDescription>For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Unlimited Components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom Templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Team Collaboration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">White-label License</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="cta" className="relative z-10 py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto" ref={(el) => setupObserver(el, "cta")}>
            <h2
              className={`text-3xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
                visibleElements.has("cta") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              Start Building Smarter Today
            </h2>
            <p
              className={`text-xl text-muted-foreground mb-8 transition-all duration-700 delay-200 ${
                visibleElements.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Join thousands of developers who are shipping faster with our component library
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
                visibleElements.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 animate-pulse-glow"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:shadow-lg transition-all duration-300"
              >
                <a href="/docs">Browse Docs</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Developers</h2>
            <div
              className="flex items-center justify-center gap-6 mb-8"
              ref={(el) => setupObserver(el, "testimonials")}
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{animatedNumbers.stars.toFixed(1)}/5</span>
                <span className="text-muted-foreground">on GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span className="font-semibold">{animatedNumbers.downloads}k+</span>
                <span className="text-muted-foreground">downloads</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                ref={(el) => setupObserver(el, `testimonial-${index}`)}
                className={`border-0 shadow-lg transition-all duration-700 ${
                  visibleElements.has(`testimonial-${index}`) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
                <span className="text-xl font-bold">UIKit</span>
              </div>
              <p className="text-muted-foreground">Beautiful, accessible UI components for modern web applications.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground text-sm mb-4">Get the latest updates and new component releases.</p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <Button size="sm" className="w-full">
                  Subscribe
                </Button>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 hover:rotate-12 hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/20"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 hover:-rotate-12 hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 hover:rotate-6 hover:bg-blue-600/10 hover:text-blue-600 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-600/20"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 UIKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
