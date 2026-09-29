"use client"

import { Magnetic } from "./magnetic"
import { Reveal } from "./reveal"

function RotatingBadge() {
  return (
    <div className="animate-spin-slow relative h-28 w-28" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-mist text-[10.5px] font-semibold uppercase" style={{ letterSpacing: "0.32em" }}>
          <textPath href="#circlePath">let's build something · let's build something ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-avo/15 text-avo">
        <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none">
          <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 sm:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(180,242,78,0.10),transparent)] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-avo">Contact</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Ready to streamline
            <br />
            <span className="text-gradient-avo">your workflow?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Let's discuss how we can use automation and AI to help you focus on
            what really matters.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            <Magnetic strength={0.3}>
              <a
                href="mailto:hello@avolab.ca?subject=Project%20inquiry"
                className="group inline-flex items-center gap-3 rounded-2xl bg-avo px-9 py-4.5 text-lg font-semibold text-[#0B100B] shadow-[0_0_60px_-12px_rgba(180,242,78,0.7)] transition-shadow hover:shadow-[0_0_80px_-10px_rgba(180,242,78,0.85)]"
              >
                hello@avolab.ca
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <RotatingBadge />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
