# avolab.ca

Marketing site + product showcase for **Avolab Solutions** — live at [avolab.ca](https://avolab.ca).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4
- Motion (framer-motion) for scroll/hover/page transitions
- Newsletter signups stored in a Neon Postgres table (`avolab_ship_notes`) shared with the newsltr project

## Develop

```bash
npm install
npm run dev      # needs POSTGRES_URL in .env.local for /api/subscribe
```

## Newsletter

`POST /api/subscribe` `{ email, source?, company? }` — `company` is a honeypot.
Emails land in the `avolab_ship_notes` table of the Neon database (connection
string in Vercel env `POSTGRES_URL` on this project).

## Deploy

Linked to Vercel project `v0-avolab-solutions-website` (domain avolab.ca).
Pushes to `main` deploy automatically once git integration is connected;
otherwise `vercel --prod` from this directory.

## Mobile Hub (Android-first preview)

The separate Expo / React Native app lives in `apps/mobile`; it does not replace this website. It includes offline catalogue browsing, favourites, recently opened products, native sharing and the Pulse reaction game. Product destinations open in the system browser.

See [mobile setup and validation](apps/mobile/README.md). Android has a locally built, emulator-tested APK. iOS is not built or tested yet; production signing, Codemagic and both store-testing tracks are not configured.

## Editing the showcase

All products live in `lib/apps.ts` — add an entry with a `shot` (drop a JPG in
`public/shots/`) or a `poster` gradient for apps that don't screenshot well.
