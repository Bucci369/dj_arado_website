'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Define color transitions based on scroll progress
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.5, 0.65, 0.8, 1],
    [
      'linear-gradient(180deg, #050508 0%, #0a0a10 100%)', // Landing - very dark
      'linear-gradient(180deg, #0a0a10 0%, #182030 100%)', // Bio start - dark blue
      'linear-gradient(180deg, #182030 0%, #606070 100%)', // Bio end - medium
      'linear-gradient(180deg, #d0d0d0 0%, #ffffff 100%)', // Music/Stats - white
      '#ffffff', // Labels/Clubs - pure white
      'linear-gradient(180deg, #ffffff 0%, #2a2a2a 100%)', // Gallery start - back to dark
      'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)'  // Video/Contact/Footer - dark
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