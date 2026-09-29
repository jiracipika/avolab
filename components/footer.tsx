"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Logo } from "./logo"
import { apps } from "@/lib/apps"

const explore = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#apps", label: "Apps" },
  { href: "#arcade", label: "Arcade" },
  { href: "#newsletter", label: "Newsletter" },
]

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg font-bold tracking-tight">
                Avolab Solutions<span className="text-avo">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Empowering people with smarter technology for a more efficient
              future.
            </p>
            <a
              href="https://github.com/jiracipika"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-cream"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
              GitHub
            </a>
          </div>

          <nav aria-label="Explore">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist/70">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-mist transition-colors hover:text-avo">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist/70">Products</p>
            <ul className="mt-4 space-y-2.5">
              {apps.slice(0, 6).map((a) => (
                <li key={a.slug}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-sm text-mist transition-colors hover:text-avo">
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist/70">Legal</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/privacy" className="text-sm text-mist transition-colors hover:text-avo">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-mist transition-colors hover:text-avo">Terms of Service</Link></li>
              <li><a href="mailto:hello@avolab.ca" className="text-sm text-mist transition-colors hover:text-avo">hello@avolab.ca</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-mist/70 sm:flex-row">
          <p>© 2026 Avolab Solutions. All rights reserved.</p>
          <p>Built in Canada 🇨🇦 · Deployed on Vercel</p>
        </div>
      </div>

      <motion.p
        style={{ x }}
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.78] tracking-tight text-white/[0.035]"
      >
        AVOLAB
      </motion.p>
    </footer>
  )
}
