"use client"

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef, type PointerEvent } from "react"
import { Magnetic } from "./magnetic"
import { Shelf } from "./shelf"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "38%"])
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // Pointer parallax on both axes: every depth layer moves by its own factor.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 22, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 60, damping: 22, mass: 0.6 })
  const blob1x = useTransform(sx, (v) => v * 30)
  const blob1y = useTransform(sy, (v) => v * 20)
  const blob2x = useTransform(sx, (v) => v * -38)
  const blob2y = useTransform(sy, (v) => v * -24)
  const blob3x = useTransform(sx, (v) => v * 16)

  function onPointer(e: PointerEvent<HTMLElement>) {
    // Mouse only: a finger dragging the page is not a pointer hovering it.
    if (reduce || e.pointerType !== "mouse") return
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
      {/* aurora field — three depth layers, each on its own parallax factor */}
      <motion.div
        style={{ y: reduce ? 0 : blobY1, x: blob1x }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(180,242,78,0.16),transparent)] blur-3xl"
      />
      <motion.div
        style={{ y: reduce ? 0 : blobY2, x: blob2x }}
        aria-hidden="true"
        className="blob-hue pointer-events-none absolute -right-52 top-1/3 h-[480px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent)] blur-3xl"
      />
      <motion.div
        style={{ y: reduce ? 0 : blobY1, x: blob3x }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 top-1/2 h-[460px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)] blur-3xl"
      />

      {/* The statement is server-rendered and static: it paints with the first frame. */}
      <motion.div style={{ opacity: reduce ? 1 : fade }} className="hero-copy relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="glass flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-mist">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-avo" aria-hidden="true" />
          Accepting new projects
        </div>

        <h1 className="hero-title mt-7 font-display font-bold tracking-[-0.04em]">
          We don’t pitch.
          <br />
          We <span className="text-avo">ship.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-mist sm:text-lg sm:leading-relaxed">
          A Canadian studio with twelve products live right now — civic tools,
          privacy-first apps, arcade games. One is playable below. For clients,
          we build the AI automation and web engineering we run on our own shelf.
        </p>

        <div className="hero-actions mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-2xl border border-avo bg-avo px-4 py-3.5 text-[15px] font-semibold text-[#0B100B] shadow-[0_16px_44px_-14px_rgba(180,242,78,0.45)] transition-shadow hover:shadow-[0_22px_60px_-16px_rgba(180,242,78,0.6)] sm:px-7 sm:text-base"
            >
              <span className="whitespace-nowrap leading-6">Work with us</span>
              <svg className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#arcade"
              className="group inline-flex items-center gap-2 rounded-2xl border border-line px-4 py-3.5 text-[15px] font-semibold text-cream transition-colors hover:border-avo/50 hover:text-avo sm:px-7 sm:text-base"
            >
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 2.8c0-.9 1-1.5 1.8-1L13 6.9c.8.5.8 1.7 0 2.2L5.8 14.2c-.8.5-1.8-.1-1.8-1V2.8Z" />
              </svg>
              <span className="whitespace-nowrap leading-6">Play DashVerse</span>
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <Shelf sx={sx} sy={sy} progress={scrollYProgress} />
    </section>
  )
}
