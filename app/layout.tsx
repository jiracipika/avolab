import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Space_Grotesk } from "next/font/google"
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
    default: "Avolab Solutions | Smarter Technology",
    template: "%s | Avolab Solutions",
  },
  description:
    "Avolab Solutions is a technology studio empowering people with smarter technology — AI automation, workflow optimization, and a shelf of live products including DashVerse, RepFinder and Snapkeep.",
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
    title: "Avolab Solutions | Smarter Technology",
    description:
      "A technology studio shipping AI automation, custom web apps and a shelf of live products. Empowering people with smarter technology.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avolab Solutions | Smarter Technology",
    description:
      "A technology studio shipping AI automation, custom web apps and a shelf of live products.",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4128325832827761"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}
