"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.65, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({
  title,
  copy,
  align = "left",
}: {
  title: ReactNode
  copy?: string
  align?: "left" | "center"
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={align === "center" ? "text-center" : "text-left"}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
    >
      <motion.h2
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)", y: 22, opacity: 0 },
          visible: {
            clipPath: "inset(0 0 -12% 0)",
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 0.68, 0.22, 1] },
          },
        }}
        className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-cream sm:text-5xl"
      >
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, delay: 0.14, ease: [0.21, 0.65, 0.25, 1] },
            },
          }}
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-mist ${align === "center" ? "mx-auto" : ""}`}
        >
          {copy}
        </motion.p>
      )}
    </motion.div>
  )
}
