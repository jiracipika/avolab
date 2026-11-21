"use client"

import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Reveal, SectionHead } from "./reveal"

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }
    const dur = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionHead
            title={<>We build our own products <span className="text-avo">first.</span></>}
          />
        </div>
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-cream/90">
              Avolab Solutions is a Canadian studio in the habit of shipping.
              RepFinder helps Canadians reach their elected representatives.
              Snapkeep turns a private data export into an organized library
              without uploading a single byte. DashVerse keeps score of one
              more jump.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 leading-relaxed text-mist">
              Those products are also the portfolio: the automation, computer
              vision and product engineering we offer is the same machinery
              running on our own shelf. We take on client work when the problem
              is interesting — and we’d rather show you something live than a
              slide deck.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-12 max-w-xl font-display text-2xl font-bold leading-snug tracking-[-0.03em] text-cream sm:text-[1.7rem]">
              <span className="text-avo"><Counter to={12} /></span> products live,{" "}
              <span className="text-avo"><Counter to={5} /></span> of them games,{" "}
              <span className="text-avo"><Counter to={2} /></span> that never phone
              home — <span className="text-avo"><Counter to={1} /></span> playable
              on this page.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
