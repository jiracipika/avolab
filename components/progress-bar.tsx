"use client"

import { motion, useScroll, useSpring } from "motion/react"

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-avo-deep via-avo to-[#d8ff8a]"
      aria-hidden="true"
    />
  )
}
