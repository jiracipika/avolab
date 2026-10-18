"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/**
 * Global Motion config — honours the user's prefers-reduced-motion setting:
 * transform/layout animations are disabled, opacity fades are kept.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
