"use client"

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { Logo } from "./logo"

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#apps", label: "Apps" },
  { href: "#arcade", label: "Arcade" },
  { href: "#newsletter", label: "Newsletter" },
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160 && !open)
  })

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav className="glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-line px-4 py-2.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]">
          <Link href="#top" className="flex items-center gap-2.5" aria-label="Avolab Solutions home">
            <Logo className="h-8 w-8" />
            <span className="font-display text-[15px] font-bold tracking-tight">
              Avolab<span className="text-avo">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden rounded-xl bg-avo px-4 py-2 text-sm font-semibold text-[#0B100B] transition-transform hover:scale-[1.04] active:scale-95 sm:block"
            >
              Start a project
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl border border-line md:hidden"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }} className="block h-0.5 w-4 bg-cream" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }} className="block h-0.5 w-4 bg-cream" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#090d0a] px-8 md:hidden"
          >
            <div className="space-y-2">
              {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 + i * 0.06, duration: 0.45, ease: "easeOut" }}
                  className="block font-display text-4xl font-bold tracking-tight text-cream active:text-avo"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute bottom-10 left-8 text-sm text-mist"
            >
              hello@avolab.ca
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
