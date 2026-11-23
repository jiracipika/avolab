"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useEffect, useRef, useSyncExternalStore } from "react"
import { apps, type AppItem } from "@/lib/apps"

/**
 * The hero shelf: the studio's live products as windows on a bench, with the
 * two flagships in focus at the centre and the rest receding into blur.
 * Blur is the depth cue, so every layer's motion agrees with it — nearer
 * windows travel further under the pointer than far ones.
 */

// Document order is importance order: the two flagships lead. That is the
// reading order for screen readers, the tab order, and — on phones — simply
// the left-to-right order of the scrolling row, with nothing to re-position
// after load. Wider screens lay the same windows out symmetrically (see the
// `order` rule in globals.css) using the positions below.
const layout: [slug: string, position: number][] = [
  ["signflow", 0],
  ["gangsign", 1],
  ["snapkeep", 2],
  ["dashverse", 3],
  ["repfinder", 4],
  ["pitch-therapy", 5],
  ["newsltr", 6],
  ["rent-central", 7],
]
const bySlug = new Map(layout.map(([slug, position]) => [slug, position]))

const items: { app: AppItem; position: number }[] = [
  "dashverse",
  "repfinder",
  "snapkeep",
  "pitch-therapy",
  "gangsign",
  "signflow",
  "newsltr",
  "rent-central",
].map((slug) => {
  const app = apps.find((a) => a.slug === slug)
  return app?.shot ? { app, position: bySlug.get(slug) ?? 0 } : null
}).filter((entry): entry is { app: AppItem; position: number } => entry !== null)

const centre = (items.length - 1) / 2
const FOCUS = { ease: [0.22, 0.68, 0.22, 1] as const }

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", notify)
      return () => mql.removeEventListener("change", notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

function Window({
  app,
  position,
  sx,
  sy,
  progress,
}: {
  app: AppItem
  position: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const d = Math.abs(position - centre)
  const side = position < centre ? -1 : 1
  const near = 1 - d / (centre + 1) // 1 at the centre pair, ~0.2 at the far ends

  // Pointer parallax on both axes, plus a scatter as the shelf scrolls away.
  const x = useTransform([sx, progress], (v) => {
    const [p, s] = v as [number, number]
    return p * 28 * near + side * d * 20 * s
  })
  const y = useTransform([sy, progress], (v) => {
    const [q, s] = v as [number, number]
    return q * 13 * near - s * 9 * d
  })
  const rotate = useTransform(progress, (s) => side * d * 0.9 * s)

  return (
    <motion.a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x, y, rotate, "--d": d, "--pos": position } as never}
      className="shelf-window"
    >
      {/* focus pull on arrival: starts visible and soft, resolves sharp */}
      <motion.span
        className="block"
        initial={reduce ? false : { filter: "blur(7px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.12 + d * 0.09, ease: FOCUS.ease }}
      >
        <span className="shelf-frame">
          <Image src={app.shot!} alt="" fill sizes="(max-width: 639px) 150px, 230px" className="shelf-img" />
        </span>
      </motion.span>
      <span className="shelf-name">{app.name}</span>
      <span className="sr-only">
        — {app.category}, opens in a new tab
      </span>
    </motion.a>
  )
}

export function Shelf({
  sx,
  sy,
  progress,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const scrolling = useMediaQuery("(max-width: 639px)")
  const scroller = useRef<HTMLDivElement>(null)
  const zero = useMotionValue(0)

  // The whole bench tilts back and falls out of focus as the visitor passes it.
  const tilt = useTransform(progress, [0, 1], [0, 15])
  const lift = useTransform(progress, [0, 1], [0, 34])
  const dim = useTransform(progress, [0, 0.6], [1, 0])

  useEffect(() => {
    const el = scroller.current
    if (!scrolling || !el || reduce) return
    // Touch-linked parallax: each screenshot slides inside its window as the
    // shelf is dragged, like scenery seen through a train window.
    const shots = Array.from(el.querySelectorAll<HTMLElement>(".shelf-img"))
    let raf = 0
    const update = () => {
      raf = 0
      const mid = el.getBoundingClientRect().left + el.clientWidth / 2
      for (const shot of shots) {
        const box = shot.parentElement?.getBoundingClientRect()
        if (!box) continue
        const off = Math.max(-1, Math.min(1, (box.left + box.width / 2 - mid) / el.clientWidth))
        shot.style.transform = `translateX(${(off * -18).toFixed(2)}px) scale(1.26)`
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    el.addEventListener("scroll", schedule, { passive: true })
    update()
    return () => {
      el.removeEventListener("scroll", schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrolling, reduce])

  return (
    <motion.div
      ref={scroller}
      className="shelf"
      aria-label="Live products"
      style={
        reduce || scrolling
          ? undefined
          : { rotateX: tilt, y: lift, opacity: dim, transformPerspective: 1100 }
      }
    >
      <div className="shelf-row">
        {items.map(({ app, position }) => (
          <Window
            key={app.slug}
            app={app}
            position={position}
            sx={reduce ? zero : sx}
            sy={reduce ? zero : sy}
            progress={reduce ? zero : progress}
          />
        ))}
      </div>
    </motion.div>
  )
}
