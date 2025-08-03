"use client"

import { useEffect, useRef, useState } from "react"

interface SwipeGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onLongPress?: () => void
  threshold?: number
  longPressDelay?: number
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
  isLongPress: boolean
}

export function useSwipeGesture(options: SwipeGestureOptions) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    threshold = 50,
    longPressDelay = 500,
  } = options

  const touchState = useRef<TouchState | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isLongPress: false,
    }
    setIsPressed(true)

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      if (touchState.current) {
        touchState.current.isLongPress = true
        onLongPress?.()
      }
    }, longPressDelay)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchState.current) return

    const touch = e.touches[0]
    const deltaX = Math.abs(touch.clientX - touchState.current.startX)
    const deltaY = Math.abs(touch.clientY - touchState.current.startY)

    // If moved significantly, cancel long press
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchState.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchState.current.startX
    const deltaY = touch.clientY - touchState.current.startY
    const deltaTime = Date.now() - touchState.current.startTime

    setIsPressed(false)

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    // Don't process swipes if it was a long press
    if (touchState.current.isLongPress) {
      touchState.current = null
      return
    }

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Determine if it's a swipe or tap
    if (absX < threshold && absY < threshold && deltaTime < 300) {
      // It's a tap
      onTap?.()
    } else if (absX > threshold || absY > threshold) {
      // It's a swipe
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onSwipeDown?.()
        } else {
          onSwipeUp?.()
        }
      }
    }

    touchState.current = null
  }

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchmove", handleTouchMove, { passive: true })
    element.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return { ref, isPressed }
}
