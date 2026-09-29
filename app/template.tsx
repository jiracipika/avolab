"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { ProgressBar } from "@/components/progress-bar"

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <ProgressBar />
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: [0.22, 0.68, 0.22, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
