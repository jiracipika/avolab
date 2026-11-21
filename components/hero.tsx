"use client"

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef, type MouseEvent } from "react"
import { Magnetic } from "./magnetic"
import { marqueeApps } from "@/lib/apps"

const LINE1 = ["We", "don’t", "pitch."]
const LINE2 = ["We", "ship."]

function Words({ words, offset = 0 }: { words: string[]; offset?: number }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={w + i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "108%", filter: "blur(8px)" }}
            animate={{ y: "0%", filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35 + (offset + i) * 0.09, ease: [0.22, 0.68, 0.22, 1] }}
          >
            {w}
          </motion.span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "38%"])
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // multi-axis pointer parallax: each depth layer moves by its own factor
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 22, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 60, damping: 22, mass: 0.6 })
  const blob1x = useTransform(sx, (v) => v * 30)
  const blob1y = useTransform(sy, (v) => v * 20)
  const blob2x = useTransform(sx, (v) => v * -38)
  const blob2y = useTransform(sy, (v) => v * -24)
  const blob3x = useTransform(sx, (v) => v * 16)

  function onPointer(e: MouseEvent<HTMLElement>) {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  function resetPointer() {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointer}
      onPointerLeave={resetPointer}
      className="noise relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* aurora field — three depth layers + blueprint grid, all parallaxing */}
      <motion.div
        style={{ y: reduce ? 0 : blobY1, x: blob1x }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(180,242,78,0.16),transparent)] blur-3xl"
      />
      <motion.div
        style={{ y: reduce ? 0 : blobY2, x: blob2x }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-1/3 h-[480px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent)] blur-3xl"
      />
      <motion.div
        style={{ y: reduce ? 0 : blobY1, x: blob3x }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 top-1/2 h-[460px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)] blur-3xl"
      />
      <motion.div style={{ opacity: reduce ? 1 : fade }} className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6, delay: 0.15 }}
          className="glass flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-mist"
        >
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-avo" aria-hidden="true" />
          Accepting new projects
        </motion.div>

        <h1 className="mt-8 font-display text-[13.5vw] font-bold leading-[1.02] tracking-[-0.04em] sm:text-7xl md:text-8xl">
          <Words words={LINE1} />
          <br />
          <Words words={LINE2} offset={LINE1.length} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.28, duration: 0.7, delay: 1.05 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-mist"
        >
          A Canadian studio with twelve products live right now — civic tools,
          privacy-first apps, arcade games. One is playable below. For clients,
          we build the AI automation and web engineering we run on our own shelf.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.28, duration: 0.7, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-2xl bg-avo px-7 py-3.5 font-semibold text-[#0B100B] shadow-[0_16px_44px_-14px_rgba(180,242,78,0.45)] transition-shadow hover:shadow-[0_22px_60px_-16px_rgba(180,242,78,0.6)]"
            >
              Work with us
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#arcade"
              className="group inline-flex items-center gap-2 rounded-2xl border border-line px-7 py-3.5 font-semibold text-cream transition-colors hover:border-avo/50 hover:text-avo"
            >
              <svg className="h-3.5 w-3.5 transition-transform group-hover:scale-110" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 2.8c0-.9 1-1.5 1.8-1L13 6.9c.8.5.8 1.7 0 2.2L5.8 14.2c-.8.5-1.8-.1-1.8-1V2.8Z" />
              </svg>
              Play DashVerse
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* app marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative border-y border-line bg-panel/40 py-4"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeApps.map((name) => (
                <span key={copy + name} className="flex items-center gap-6 pr-6 font-display text-sm font-semibold uppercase tracking-[0.22em] text-mist">
                  {name}
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-avo/60" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
