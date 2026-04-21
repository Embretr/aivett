"use client"

import Link from "next/link"
import { useSession, signOut } from "../../lib/auth-client"
import { Button } from "../ui/button"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { cn } from "../../lib/utils"

const navLinks = [
  { href: "/kurs", label: "Kurs" },
  { href: "/nyheter", label: "Nyheter" },
  { href: "/guider", label: "Guider" },
  { href: "/sammenligninger", label: "Sammenligninger" },
  { href: "/priser", label: "Priser" },
]

export function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={cn("relative z-10", className)}>
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-950">
            AI<span className="text-blue-600">vett</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/profil">
                <Button variant="ghost" size="sm">
                  Min profil
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/" } } })}
              >
                Logg ut
              </Button>
            </>
          ) : (
            <>
              <Link href="/logg-inn">
                <Button variant="ghost" size="sm">
                  Logg inn
                </Button>
              </Link>
              <Link href="/registrer">
                <Button size="sm">Kom i gang</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-950"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Meny"
        >
          {mobileOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4">
          <div className="flex flex-col gap-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-950"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {session ? (
              <>
                <Link href="/profil" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Min profil
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/" } } })}
                >
                  Logg ut
                </Button>
              </>
            ) : (
              <>
                <Link href="/logg-inn" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Logg inn
                  </Button>
                </Link>
                <Link href="/registrer" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Kom i gang
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
