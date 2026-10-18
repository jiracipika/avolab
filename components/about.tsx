"use client"

import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Reveal, SectionHead } from "./reveal"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const dur = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      if (reduce) {
        setN(to)
        return
      }
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 100, suffix: "%", label: "Focus on Efficiency" },
  { value: 24, suffix: "/7", label: "Automated Operations" },
  { value: 12, suffix: "+", label: "Live Products Shipped" },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionHead
            eyebrow="About the studio"
            title={<>Innovation meets <span className="text-gradient-avo">human insight.</span></>}
          />
        </div>
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-cream/90">
              Avolab Solutions is a technology-driven studio focused on helping
              individuals and businesses work smarter by leveraging AI,
              automation, and modern digital tools.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 leading-relaxed text-mist">
              We create solutions that simplify workflows, enhance productivity,
              and connect people with the technology they need to achieve
              meaningful results. Blending technical expertise with a practical,
              people-first mindset, we bring clarity, reliability, and
              innovation to every project.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 leading-relaxed text-mist">
              We believe real transformation starts with improving the mundane
              tasks that quietly slow people down — then compounding those wins
              into products people actually use every day.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="glass rounded-2xl border border-line p-5">
                  <p className="font-display text-4xl font-bold tracking-tight text-avo sm:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-mist">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
