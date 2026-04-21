"use client"

import Link from "next/link"
import { useSession, signOut } from "../../lib/auth-client"
import { Button } from "../ui/button"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { cn } from "../../lib/utils"
import { Logo } from "./logo"

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
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-950 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <Link href="/profil">
                <Button variant="ghost" size="sm" className="text-gray-600">
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
                <Button variant="ghost" size="sm" className="text-gray-600">
                  Logg inn
                </Button>
              </Link>
              <Link href="/registrer">
                <Button size="sm" className="bg-violet-700 hover:bg-violet-800 text-white">
                  Kom i gang
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-950 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Meny"
        >
          {mobileOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4">
          <div className="flex flex-col gap-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {session ? (
              <>
                <Link href="/profil" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                    Min profil
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/" } } })}
                >
                  Logg ut
                </Button>
              </>
            ) : (
              <>
                <Link href="/logg-inn" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full text-gray-600">
                    Logg inn
                  </Button>
                </Link>
                <Link href="/registrer" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-violet-700 hover:bg-violet-800 text-white">
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
