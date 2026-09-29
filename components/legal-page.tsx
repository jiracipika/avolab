import Link from "next/link"
import type { ReactNode } from "react"

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-36">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-avo"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M14 8H3m4.5-4.5L3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>
      <h1 className="mt-8 font-display text-5xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-mist">Last updated: {updated}</p>
      <div className="mt-12 space-y-10 text-[15.5px] leading-relaxed text-mist [&_a]:text-avo [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-cream [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </main>
  )
}
