"use client"

import { useRef, type MouseEvent } from "react"
import { Reveal, SectionHead } from "./reveal"

const services = [
  {
    n: "01",
    title: "AI Automation",
    copy: "Integrate intelligent agents to handle repetitive tasks and customer interactions.",
    icon: (
      <path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    ),
  },
  {
    n: "02",
    title: "Workflow Optimization",
    copy: "Streamline your business processes to remove bottlenecks and save valuable time.",
    icon: (
      <path d="M4 6h10M4 12h16M4 18h7m6-1 2.5 2.5L20 14" />
    ),
  },
  {
    n: "03",
    title: "Digital Solutions",
    copy: "Custom web applications and interfaces designed for clarity and ease of use.",
    icon: (
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2 1.5h14M6.5 10.5h5v6h-5v-6Zm8.5 0h3M15 13.5h3M15 16.5h3" />
    ),
  },
  {
    n: "04",
    title: "Smart Data Handling",
    copy: "Automated tracking, reporting, and management of your critical business data.",
    icon: (
      <path d="M5 20V10m7 10V4m7 16v-7M3 20h18" />
    ),
  },
  {
    n: "05",
    title: "Tool Integration",
    copy: "Connect your existing software ecosystem for seamless data flow and communication.",
    icon: (
      <path d="M9 7H7a4 4 0 0 0 0 8h2m6-8h2a4 4 0 0 1 0 8h-2M8.5 11h7" />
    ),
  },
  {
    n: "06",
    title: "Consulting",
    copy: "Strategic advice on how to leverage modern technology for your specific goals.",
    icon: (
      <path d="M8 10h8m-8 4h5m-7 6.5V19a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v1.5M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.2-3 5.2V15H9v-.8C7.2 13.2 6 11.2 6 9a6 6 0 0 1 6-6Z" />
    ),
  },
]

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <Reveal delay={(i % 3) * 0.08}>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="spotlight group glass h-full rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-avo/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-avo/25 bg-avo/10 text-avo transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {s.icon}
            </svg>
          </div>
          <span className="font-display text-sm font-semibold text-mist/50">{s.n}</span>
        </div>
        <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{s.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-mist">{s.copy}</p>
      </div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHead
        eyebrow="What we do"
        title={<>Transforming <span className="text-gradient-avo">everyday work.</span></>}
        copy="We believe real transformation starts with improving the mundane tasks that quietly slow people down."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}
