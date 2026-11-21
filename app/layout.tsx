import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Space_Grotesk } from "next/font/google"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://avolab.ca"),
  title: {
    default: "Avolab Solutions — a studio that ships",
    template: "%s | Avolab Solutions",
  },
  description:
    "Canadian studio with twelve live products — RepFinder, Snapkeep, DashVerse and more — plus AI automation and product engineering for clients. Play one before you scroll past.",
  keywords: [
    "Avolab Solutions",
    "AI automation",
    "web development",
    "DashVerse",
    "RepFinder",
    "Snapkeep",
    "Canada",
  ],
  openGraph: {
    type: "website",
    url: "https://avolab.ca",
    siteName: "Avolab Solutions",
    title: "Avolab Solutions — a studio that ships",
    description:
      "A Canadian studio shipping civic tools, privacy-first apps and arcade games. Twelve products live right now — one playable on the page.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolab Solutions — a studio that ships",
    description:
      "A Canadian studio shipping civic tools, privacy-first apps and arcade games.",
  },
}

export const viewport: Viewport = {
  themeColor: "#070a08",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-cream">
        <a href="#main" className="skip-link">Skip to content</a>
        <MotionProvider>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4128325832827761"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
