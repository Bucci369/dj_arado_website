'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth color transitions matching section backgrounds
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.08, 0.12, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1],
    [
      '#050508', // Landing start (matches original gradient start)
      '#0f1419', // Landing end (matches original gradient end)
      '#0f1419', // Bio start (seamless transition)
      '#1a2832', // Bio end
      '#ffffff', // Music (white section)
      '#3a5668', // Stats
      '#1a2832', // Labels
      '#050508', // Clubs
      '#0f1419', // Gallery
      '#3a5668', // Video
      '#1a2832', // Contact
      '#050508'  // Contact end
    ]
  )

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      className="fixed inset-0 -z-50"
      style={{
        background: backgroundColor,
      }}
    />
  )
}