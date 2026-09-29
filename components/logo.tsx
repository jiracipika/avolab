export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#B4F24E" />
      <path
        d="M14 34.5 23.2 13h1.9L34 34.5h-4.6l-1.9-4.8h-9.3l-1.9 4.8H14Zm7-9h6.1L24.1 18.6 21 25.5Z"
        fill="#0B100B"
      />
      <circle cx="33.5" cy="14.5" r="3" fill="#0B100B" />
    </svg>
  )
}
