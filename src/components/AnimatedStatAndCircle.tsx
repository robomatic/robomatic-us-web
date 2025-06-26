'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function bezier(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number,
) {
  // Clamp t to [0, 1] to prevent overshooting
  const clampedT = Math.max(0, Math.min(1, t))
  return (
    (1 - clampedT) * (1 - clampedT) * (1 - clampedT) * initial +
    3 * (1 - clampedT) * (1 - clampedT) * clampedT * p1 +
    3 * (1 - clampedT) * clampedT * clampedT * p2 +
    clampedT * clampedT * clampedT * final
  )
}

export function AnimatedStatAndCircle({
  value,
  stat,
}: {
  value: number
  stat: { label: string; value: number }
}) {
  const [mounted, setMounted] = useState(false)
  const [currentValue, setCurrentValue] = useState(0)
  const [currentStrokeOffset, setCurrentStrokeOffset] = useState(629) // Start with full offset (empty circle)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)
  const lastUpdateRef = useRef<number>(0)

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const duration = 1500 // Increased to 1.5 seconds for smoother animation
      const progress = Math.min(elapsed / duration, 1)

      // Only update every 16ms (roughly 60fps but throttled) to reduce jitter
      if (timestamp - lastUpdateRef.current >= 16) {
        // Use smoother easing function
        const easedProgress = bezier(progress, 0, 0.25, 0.75, 1)
        const animatedValue = Math.ceil(value * easedProgress)
        const animatedStrokeOffset = 629 * (1 - (value * easedProgress) / 100)

        setCurrentValue(animatedValue)
        setCurrentStrokeOffset(animatedStrokeOffset)
        lastUpdateRef.current = timestamp
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    },
    [value],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || value === 0) {
      setCurrentValue(0)
      setCurrentStrokeOffset(629)
      return
    }

    // Reset animation state
    startTimeRef.current = undefined
    lastUpdateRef.current = 0
    setCurrentValue(0)
    setCurrentStrokeOffset(629)

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, value, animate])

  return (
    <div className="relative">
      <svg
        viewBox="0 0 220 220"
        className="h-24 w-24 rotate-90"
        role="img"
        aria-label={`${stat.label}: ${stat.value}%`}
      >
        <circle
          className="stroke-zinc-100 dark:stroke-zinc-950/80"
          cx="50%"
          cy="50%"
          r="100"
          fill="none"
          strokeWidth="20"
        />
        <circle
          className="stroke-zinc-500 transition-colors duration-200"
          cx="50%"
          cy="50%"
          r="100"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeDashoffset={currentStrokeOffset}
          strokeDasharray="629"
          style={{
            transition: 'none', // Remove CSS transition to prevent conflicts with JS animation
          }}
        />
      </svg>
      <span
        className="absolute inset-0 z-10 flex items-center justify-center text-center font-semibold"
        aria-live="polite"
        aria-label={`${currentValue} percent`}
      >
        {currentValue}%
      </span>
    </div>
  )
}
