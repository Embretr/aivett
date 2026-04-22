"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession, signOut } from "../../lib/auth-client"
import { Button } from "../ui/button"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { cn } from "../../lib/utils"
import { Logo } from "./logo"

const navLinks = [
  { href: "/kurs", label: "Kurs" },
  { href: "/nyheter", label: "Nyheter" },
  { href: "/guider", label: "Guider" },
  { href: "/veiledninger", label: "Veiledninger" },
  { href: "/sammenligninger", label: "Sammenligninger" },
  { href: "/konsultasjon", label: "Konsultasjon" },
]

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      {/* Fixed navbar */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out",
          scrolled ? "pt-3" : "pt-0"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300 ease-out",
            isTransparent
              // Transparent — overlays dark hero, full width
              ? "max-w-7xl px-6 lg:px-8 py-5"
              : scrolled
                // Pill — floating, centered, white with blur
                ? "max-w-[calc(100%-2rem)] md:max-w-2xl lg:max-w-5xl rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-black/8 border border-gray-200/80 px-5 py-3"
                // Non-home, not scrolled — full-width white bar
                : "max-w-7xl px-6 lg:px-8 py-4 bg-white border-b border-gray-100"
          )}
        >
          <Logo light={isTransparent} />

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isTransparent
                    ? "text-white/65 hover:text-white"
                    : "text-gray-500 hover:text-gray-950"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 md:flex">
            {session ? (
              <>
                <Link href="/profil">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isTransparent ? "text-white/65 hover:text-white hover:bg-white/10" : "text-gray-600"}
                  >
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isTransparent ? "text-white/65 hover:text-white hover:bg-white/10" : "text-gray-600"}
                  >
                    Logg inn
                  </Button>
                </Link>
                <Link href="/registrer">
                  <Button size="sm" className="bg-violet-700 hover:bg-violet-600 text-white shadow-none">
                    Kom i gang
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isTransparent
                ? "text-white/65 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-gray-950 hover:bg-gray-100"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Meny"
          >
            {mobileOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </button>
        </nav>

        {/* Mobile menu — always white regardless of hero */}
        {mobileOpen && (
          <div className="md:hidden mx-auto mt-2 max-w-[calc(100%-2rem)] rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-1 border-gray-100" />
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
                    <Button size="sm" className="w-full bg-violet-700 hover:bg-violet-600 text-white shadow-none">
                      Kom i gang
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/*
        Document-flow spacer for non-home pages.
        The home page hero has its own top padding that accommodates the transparent nav.
        All other pages need this spacer so content doesn't hide under the fixed header.
      */}
      {!isHome && <div className="h-[72px]" aria-hidden="true" />}
    </>
  )
}
