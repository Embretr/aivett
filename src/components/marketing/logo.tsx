import Link from "next/link"
import { cn } from "../../lib/utils"

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#6d28d9" />
        <line x1="16" y1="7" x2="16" y2="25" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="7.4" y1="11.5" x2="24.6" y2="20.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="7.4" y1="20.5" x2="24.6" y2="11.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={cn(
        "text-[1.05rem] font-bold tracking-tight select-none transition-colors duration-300",
        light ? "text-white" : "text-gray-950"
      )}>
        AI<span className={cn(
          "transition-colors duration-300",
          light ? "text-violet-300" : "text-violet-700"
        )}>vett</span>
      </span>
    </Link>
  )
}
