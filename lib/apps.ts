export type AppItem = {
  slug: string
  name: string
  tagline: string
  category: string
  url: string
  shot?: string
  poster?: { glyph: string; from: string; to: string }
  accent?: string
}

export const apps: AppItem[] = [
  {
    slug: "dashverse",
    name: "DashVerse",
    tagline: "A neon infinite side-scroller — one more jump, one more world. Playable right on this page.",
    category: "Game",
    url: "https://infinite-side-scroller.vercel.app",
    shot: "/shots/dashverse.jpg",
    accent: "#a855f7",
  },
  {
    slug: "repfinder",
    name: "RepFinder",
    tagline: "Canadians' shortcut to their federal, provincial and municipal representatives.",
    category: "Civic",
    url: "https://repfinder.avolab.ca",
    shot: "/shots/repfinder.jpg",
    accent: "#e2374b",
  },
  {
    slug: "snapkeep",
    name: "Snapkeep",
    tagline: "Turns a Snapchat data export into an organized library — processed entirely in your browser.",
    category: "Privacy-first tool",
    url: "https://snapkeeper.vercel.app",
    shot: "/shots/snapkeep.jpg",
    accent: "#f5d90a",
  },
  {
    slug: "pitch-therapy",
    name: "Pitch Therapy",
    tagline: "Ear training, recomposed — 18 focused drills for pitch, intervals and memory.",
    category: "Music · AI",
    url: "https://pitch-therapy.vercel.app",
    shot: "/shots/pitchtherapy.jpg",
    accent: "#b4f24e",
  },
  {
    slug: "gangsign",
    name: "GANGSIGN.GG",
    tagline: "Get street certified — a webcam watches your hand and grades thirteen legendary signs.",
    category: "Game · CV",
    url: "https://hand-signs-not-crimes.vercel.app",
    shot: "/shots/gangsign.jpg",
    accent: "#fbbf24",
  },
  {
    slug: "signflow",
    name: "SignFlow",
    tagline: "On-device ASL fingerspelling assistant — camera to letters to words, nothing uploaded.",
    category: "Accessibility · CV",
    url: "https://signflow-five.vercel.app",
    shot: "/shots/signflow.jpg",
    accent: "#60a5fa",
  },
  {
    slug: "newsltr",
    name: "Newsltr",
    tagline: "AI-generated community newsletters on autopilot — research, write, send.",
    category: "AI platform",
    url: "https://newsltr.ca",
    shot: "/shots/newsltr.jpg",
    accent: "#34d399",
  },
  {
    slug: "rent-central",
    name: "Rent Central",
    tagline: "Browse, apply, pay and sign — a Canadian rental marketplace.",
    category: "Marketplace",
    url: "https://rent-central.vercel.app",
    shot: "/shots/rentcentral.jpg",
    accent: "#38bdf8",
  },
  {
    slug: "friday-evacuation",
    name: "Friday Evacuation",
    tagline: "A tiny arcade about getting out in time — per-layout personal bests, ghost pacing.",
    category: "Game",
    url: "https://friday-evacuation.vercel.app",
    poster: { glyph: "🧯", from: "#1d4ed8", to: "#0ea5e9" },
  },
  {
    slug: "breakrun",
    name: "BREAKRUN",
    tagline: "Sunbreak Riot — a 3D combat runner where every enemy is a weapon.",
    category: "Game · 3D",
    url: "https://breakrun.vercel.app",
    poster: { glyph: "⚡", from: "#f59e0b", to: "#dc2626" },
  },
  {
    slug: "soundspace",
    name: "Soundspace",
    tagline: "Generative ambient soundscapes that never repeat a moment.",
    category: "Audio",
    url: "https://soundspace.vercel.app",
    poster: { glyph: "🪐", from: "#7c3aed", to: "#2563eb" },
  },
  {
    slug: "printshop-sim",
    name: "Print Shop Sim",
    tagline: "Run your own print studio — first-person, from intake to pickup shelf.",
    category: "Sim",
    url: "https://printshop-sim.vercel.app",
    poster: { glyph: "🖨️", from: "#eab308", to: "#ea580c" },
  },
]

export const marqueeApps = apps.map((a) => a.name)
