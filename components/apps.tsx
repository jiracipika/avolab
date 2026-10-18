"use client"

import Image from "next/image"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { useRef, type MouseEvent } from "react"
import { apps, type AppItem } from "@/lib/apps"
import { Reveal, SectionHead } from "./reveal"

function TiltCard({ app, index }: { app: AppItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const transform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg)`

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 7)
    rx.set((0.5 - py) * 7)
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Reveal delay={(index % 3) * 0.07}>
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={reduce ? undefined : { y: -6 }}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <a
          ref={ref as never}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ transform: transform as never }}
          className="spotlight group block h-full overflow-hidden rounded-3xl border border-line bg-panel transition-colors duration-300 hover:border-avo/35"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            {app.shot ? (
              <Image
                src={app.shot}
                alt={`${app.name} interface`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            ) : (
              <div
                className="noise relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ background: `linear-gradient(135deg, ${app.poster!.from}26, ${app.poster!.to}4d), #0d120e` }}
              >
                <span className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" />
                <span className="text-7xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">{app.poster!.glyph}</span>
                <span
                  className="absolute bottom-4 left-5 font-display text-2xl font-bold uppercase italic tracking-tight"
                  style={{ color: app.poster!.from, textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}
                >
                  {app.name}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />
            <span className="glass absolute left-4 top-4 rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
              {app.category}
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold tracking-tight">{app.name}</h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-all duration-300 group-hover:border-avo group-hover:bg-avo group-hover:text-[#0B100B]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-mist">{app.tagline}</p>
          </div>
        </a>
      </motion.div>
    </Reveal>
  )
}

function Featured() {
  const dashverse = apps[0]
  return (
    <Reveal>
      <a
        href="#arcade"
        className="group relative block overflow-hidden rounded-[2rem] border border-line bg-panel"
      >
        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={dashverse.shot!}
              alt="DashVerse game menu with neon purple and lime UI"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-panel" />
          </div>
          <div className="relative flex flex-col justify-center gap-5 p-8 sm:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-avo/40 bg-avo/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-avo">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-avo" />
              Playable on this page
            </span>
            <h3 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              DashVerse
            </h3>
            <p className="max-w-md leading-relaxed text-mist">
              Our neon infinite side-scroller. One more jump. One more world.
              Make this run count — load it right here in the Avolab Arcade,
              no download, no install.
            </p>
            <span className="inline-flex w-fit items-center gap-2.5 rounded-2xl bg-avo px-6 py-3 font-semibold text-[#0B100B] transition-transform duration-300 group-hover:scale-[1.04]">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 2.8c0-.9 1-1.5 1.8-1L13 6.9c.8.5.8 1.7 0 2.2L5.8 14.2c-.8.5-1.8-.1-1.8-1V2.8Z" />
              </svg>
              Enter the Arcade
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export function Apps() {
  const rest = apps.slice(1)
  return (
    <section id="apps" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="Built at Avolab"
          title={<>A shelf of <span className="text-gradient-avo">live products.</span></>}
          copy="We don't just consult — we ship. Every product below is live, in-browser, and maintained by us. Click any card to open it."
        />
        <div className="mt-14">
          <Featured />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((app, i) => (
            <TiltCard key={app.slug} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
