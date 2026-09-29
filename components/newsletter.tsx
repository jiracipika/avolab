"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Reveal, SectionHead } from "./reveal"

type Status = "idle" | "loading" | "success" | "error"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("") // honeypot
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source: "avolab.ca" }),
      })
      const data = (await res.json()) as { ok: boolean; message?: string }
      if (!res.ok || !data.ok) {
        setStatus("error")
        setMessage(data.message ?? "Something went wrong. Try again?")
        return
      }
      setStatus("success")
      setMessage(data.message ?? "You're on the list.")
    } catch {
      setStatus("error")
      setMessage("Network hiccup — try again?")
    }
  }

  return (
    <section id="newsletter" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.5rem] border border-avo/25 bg-gradient-to-br from-panel-2 via-panel to-[#0a100b] p-8 sm:p-14">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(180,242,78,0.18),transparent)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <SectionHead
                  eyebrow="Ship Notes — our newsletter"
                  title={<>See what we <span className="text-gradient-avo">shipped.</span></>}
                  copy="A short, honest digest of new products, features and behind-the-scenes build notes from the Avolab lab. No spam, unsubscribe anytime."
                />
                <Reveal delay={0.2}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["DashVerse updates", "Snapkeep 2.0", "RepFinder data refresh", "Build postmortems"].map((chip) => (
                      <span key={chip} className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-mist">
                        {chip}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15}>
                <div className="glass rounded-3xl border border-line p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        className="flex min-h-40 flex-col items-center justify-center text-center"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.08 }}
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-avo text-[#0B100B]"
                        >
                          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="m5 13 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                        <p className="mt-4 font-display text-xl font-bold">{message}</p>
                        <p className="mt-1 text-sm text-mist">First Ship Notes lands in your inbox soon.</p>
                      </motion.div>
                    ) : (
                      <motion.form key="form" exit={{ opacity: 0, y: -8 }} onSubmit={onSubmit} className="space-y-4">
                        <label htmlFor="newsletter-email" className="block text-sm font-semibold text-cream">
                          Get Ship Notes in your inbox
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full rounded-2xl border border-line bg-void/70 px-4.5 py-3.5 text-cream placeholder:text-mist/60 outline-none transition-colors focus:border-avo/60 focus:ring-2 focus:ring-avo/25"
                        />
                        {/* honeypot — hidden from humans */}
                        <input
                          type="text"
                          name="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          className="hidden"
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-avo px-6 py-3.5 font-semibold text-[#0B100B] transition-all hover:shadow-[0_0_50px_-10px_rgba(180,242,78,0.6)] disabled:cursor-wait disabled:opacity-70"
                        >
                          {status === "loading" ? (
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                              className="h-5 w-5 rounded-full border-2 border-[#0B100B]/30 border-t-[#0B100B]"
                            />
                          ) : (
                            <>
                              Subscribe
                              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </>
                          )}
                        </button>
                        {status === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-400"
                            role="alert"
                          >
                            {message}
                          </motion.p>
                        )}
                        <p className="text-xs leading-relaxed text-mist">
                          By subscribing you agree to our{" "}
                          <Link href="/privacy" className="underline underline-offset-2 hover:text-cream">
                            privacy policy
                          </Link>
                          . One email a month at most.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
