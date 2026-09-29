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
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string
  title: ReactNode
  copy?: string
  align?: "left" | "center"
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-avo"
           style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <span className="inline-block h-px w-8 bg-avo/70" aria-hidden="true" />
          {eyebrow}
          {align === "center" && <span className="inline-block h-px w-8 bg-avo/70" aria-hidden="true" />}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-2xl text-lg leading-relaxed text-mist ${align === "center" ? "mx-auto" : ""}`}>
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  )
}
