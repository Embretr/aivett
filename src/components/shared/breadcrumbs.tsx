import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/16/solid"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Brødsmule" className="flex items-center gap-1 text-sm text-gray-500">
      <Link href="/" className="hover:text-gray-950 transition-colors">
        Hjem
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRightIcon className="size-3.5 text-gray-400" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-gray-950 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-950">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
