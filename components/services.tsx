"use client"

import type { ReactNode } from "react"
import { Reveal, SectionHead } from "./reveal"
import { apps } from "@/lib/apps"

/** A product named as evidence is a link to the live thing. */
function Product({ slug, children }: { slug: string; children: ReactNode }) {
  const app = apps.find((a) => a.slug === slug)
  if (!app) return <>{children}</>
  return (
    <a href={app.url} target="_blank" rel="noopener noreferrer" className="product-link">
      {children}
    </a>
  )
}

const capabilities: { title: string; proof: ReactNode }[] = [
  {
    title: "AI agents & automation",
    proof: (
      <>
        <Product slug="newsltr">Newsltr</Product> researches, writes and sends community
        newsletters on autopilot — the same agent plumbing we deploy for client operations.
      </>
    ),
  },
  {
    title: "Product engineering",
    proof: (
      <>
        Full-stack Next.js, end to end: <Product slug="rent-central">Rent Central</Product>&rsquo;s
        rental marketplace, <Product slug="repfinder">RepFinder</Product>&rsquo;s civic platform,
        and this site you&rsquo;re on.
      </>
    ),
  },
  {
    title: "On-device computer vision",
    proof: (
      <>
        <Product slug="gangsign">GANGSIGN.GG</Product> grades thirteen hand signs from a webcam.{" "}
        <Product slug="signflow">SignFlow</Product> reads ASL fingerspelling without uploading a
        single frame.
      </>
    ),
  },
  {
    title: "Games & interactive",
    proof: (
      <>
        <Product slug="dashverse">DashVerse</Product>&rsquo;s infinite runner,{" "}
        <Product slug="breakrun">BREAKRUN</Product>&rsquo;s 3D combat,{" "}
        <Product slug="printshop-sim">Print Shop Sim</Product>&rsquo;s first-person studio. Playable,
        not pitch decks.
      </>
    ),
  },
  {
    title: "Privacy-first engineering",
    proof: (
      <>
        <Product slug="snapkeep">Snapkeep</Product> unpacks a Snapchat export entirely in the
        browser. When we say on-device, the network tab stays empty.
      </>
    ),
  },
  {
    title: "Data & workflow plumbing",
    proof: (
      <>
        Tracking, reporting and scheduled refreshes — the unglamorous plumbing that keeps a live
        product&rsquo;s data trustworthy.
      </>
    ),
  },
]

function CapabilityRow({ title, proof, i }: { title: string; proof: ReactNode; i: number }) {
  return (
    <Reveal delay={i * 0.05}>
      <div className="group grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-10">
        <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-cream">{title}</h3>
        <p className="text-[15px] leading-relaxed text-mist md:text-base">{proof}</p>
      </div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHead
        title={<>We don&rsquo;t sell what we haven&rsquo;t <span className="text-avo">shipped.</span></>}
        copy="Every capability below runs on our own shelf first — the products named here are the proof, live and clickable."
      />
      <div className="mt-12 border-b border-line">
        {capabilities.map((c, i) => (
          <CapabilityRow key={c.title} title={c.title} proof={c.proof} i={i} />
        ))}
      </div>
    </section>
  )
}
