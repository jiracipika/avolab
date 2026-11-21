"use client"

import { Reveal, SectionHead } from "./reveal"

const capabilities = [
  {
    title: "AI agents & automation",
    proof:
      "Newsltr researches, writes and sends community newsletters on autopilot — the same agent plumbing we deploy for client operations.",
  },
  {
    title: "Product engineering",
    proof:
      "Full-stack Next.js, end to end: Rent Central’s rental marketplace, RepFinder’s civic platform, and this site you’re on.",
  },
  {
    title: "On-device computer vision",
    proof:
      "GANGSIGN.GG grades thirteen hand signs from a webcam. SignFlow reads ASL fingerspelling without uploading a single frame.",
  },
  {
    title: "Games & interactive",
    proof:
      "DashVerse’s infinite runner, BREAKRUN’s 3D combat, Print Shop Sim’s first-person studio. Playable, not pitch decks.",
  },
  {
    title: "Privacy-first engineering",
    proof:
      "Snapkeep unpacks a Snapchat export entirely in the browser. When we say on-device, the network tab stays empty.",
  },
  {
    title: "Data & workflow plumbing",
    proof:
      "Automated tracking, reporting and refreshes — the pipelines that keep RepFinder’s representative data current across three levels of government.",
  },
]

function CapabilityRow({ title, proof, i }: { title: string; proof: string; i: number }) {
  return (
    <Reveal delay={i * 0.05}>
      <div className="group grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-10">
        <h3 className="flex items-baseline font-display text-2xl font-bold tracking-[-0.03em] text-cream transition-colors duration-300 group-hover:text-avo">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-mist md:text-base">{proof}</p>
      </div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHead
        title={<>We don’t sell what we haven’t <span className="text-avo">shipped.</span></>}
        copy="Every capability below runs on our own shelf first — the products up the page are the proof, live and clickable."
      />
      <div className="mt-12 border-b border-line">
        {capabilities.map((c, i) => (
          <CapabilityRow key={c.title} title={c.title} proof={c.proof} i={i} />
        ))}
      </div>
    </section>
  )
}
