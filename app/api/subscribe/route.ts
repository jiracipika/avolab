import { NextResponse } from "next/server"
import postgres from "postgres"

export const runtime = "nodejs"

const NOTIFY_EMAIL = process.env.SUBSCRIBE_NOTIFY_EMAIL ?? "hello@avolab.ca"

let sql: postgres.Sql | null = null
let schemaReady: Promise<void> | null = null

function db(): postgres.Sql | null {
  const url = process.env.POSTGRES_URL
  if (!url) return null
  if (!sql) sql = postgres(url, { max: 3, idle_timeout: 20, connect_timeout: 8 })
  return sql
}

function ensureSchema(client: postgres.Sql) {
  if (!schemaReady) {
    schemaReady = client`
      CREATE TABLE IF NOT EXISTS avolab_ship_notes (
        id serial PRIMARY KEY,
        email text NOT NULL UNIQUE,
        source text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `.then(() => undefined)
  }
  return schemaReady
}

async function storeInPostgres(email: string, source: string | null): Promise<"stored" | "duplicate"> {
  const client = db()
  if (!client) throw new Error("no database configured")
  await ensureSchema(client)
  const inserted = await client`
    INSERT INTO avolab_ship_notes (email, source)
    VALUES (${email}, ${source})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `
  return inserted.length === 0 ? "duplicate" : "stored"
}

async function notifyByEmail(email: string, source: string | null): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("no email fallback configured")
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ship Notes <info@newsltr.ca>",
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `New Ship Notes subscriber: ${email}`,
      text: `New newsletter signup from the avolab.ca overhaul.\n\nEmail: ${email}\nSource: ${source ?? "avolab.ca"}\n\nReply to welcome them, or add them to the list manually.`,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`resend failed (${res.status}): ${body.slice(0, 200)}`)
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// small per-instance rate limit: 5 subscriptions per IP per 10 minutes
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (list.length >= MAX_HITS) {
    hits.set(ip, list)
    return true
  }
  list.push(now)
  hits.set(ip, list)
  return false
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"

  let body: { email?: unknown; company?: unknown; source?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 })
  }

  // honeypot: pretend success so bots move on
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, message: "You're on the list." })
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, message: "That email doesn't look right — mind checking it?" },
      { status: 422 }
    )
  }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts — try again in a few minutes." },
      { status: 429 }
    )
  }

  const source = typeof body.source === "string" ? body.source.slice(0, 120) : null

  // Primary: the shared Neon table. Fallback: email a notification to the
  // studio inbox (the Neon free tier periodically pauses on quota).
  try {
    const result = await storeInPostgres(email, source)
    return NextResponse.json({
      ok: true,
      message: result === "duplicate" ? "You're already on the list." : "You're on the list.",
    })
  } catch (dbErr) {
    console.warn("[subscribe] postgres unavailable, falling back to email:", dbErr)
  }

  try {
    await notifyByEmail(email, source)
    return NextResponse.json({ ok: true, message: "You're on the list." })
  } catch (err) {
    console.error("[subscribe] all paths failed:", err)
    return NextResponse.json(
      { ok: false, message: "Something went wrong on our end. Try again shortly." },
      { status: 500 }
    )
  }
}
