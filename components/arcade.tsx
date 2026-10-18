"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Reveal, SectionHead } from "./reveal"

export function Arcade() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="arcade" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.10),transparent)] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="The Avolab Arcade"
          title={<>Don’t take our word for it. <span className="text-gradient-avo">Play.</span></>}
          copy="DashVerse, our infinite side-scroller, running live below the fold. Desktop: A/D or arrows to move, Space to jump. Touch: tap to jump, swipe down to slide."
        />

        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_40px_120px_-40px_rgba(168,85,247,0.35)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="hidden text-xs font-medium tracking-wide text-mist sm:block">
                infinite-side-scroller.vercel.app
              </p>
              <a
                href="https://infinite-side-scroller.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-avo transition-opacity hover:opacity-75"
              >
                Open fullscreen ↗
              </a>
            </div>

            <div className="relative aspect-[16/10] w-full">
              <AnimatePresence mode="wait">
                {playing ? (
                  <motion.div
                    key="game"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <iframe
                      src="https://infinite-side-scroller.vercel.app?embed=1"
                      title="DashVerse — infinite side-scroller"
                      className="h-full w-full border-0"
                      allow="fullscreen; gamepad"
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    key="poster"
                    onClick={() => setPlaying(true)}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.3 }}
                    className="group absolute inset-0 block h-full w-full cursor-pointer"
                    aria-label="Load and play DashVerse"
                  >
                    <Image
                      src="/shots/dashverse.jpg"
                      alt="DashVerse start screen"
                      fill
                      sizes="(max-width: 1024px) 100vw, 90vw"
                      className="object-cover object-top"
                    />
                    <span className="absolute inset-0 bg-[#070a08]/55 transition-colors duration-300 group-hover:bg-[#070a08]/40" />
                    <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-avo text-[#0B100B] shadow-[0_0_60px_-5px_rgba(180,242,78,0.8)] transition-transform duration-300 group-hover:scale-110">
                      <svg className="ml-1 h-8 w-8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M4 2.8c0-.9 1-1.5 1.8-1L13 6.9c.8.5.8 1.7 0 2.2L5.8 14.2c-.8.5-1.8-.1-1.8-1V2.8Z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.25em] text-cream/90">
                      Insert coin — load DashVerse
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
