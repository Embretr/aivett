import Link from "next/link"

const footerLinks = {
  Lær: [
    { href: "/kurs", label: "Alle kurs" },
    { href: "/guider", label: "Guider" },
    { href: "/veiledninger", label: "Veiledninger" },
    { href: "/sammenligninger", label: "Sammenligninger" },
  ],
  Innhold: [
    { href: "/nyheter", label: "AI-nyheter" },
    { href: "/priser", label: "Priser" },
    { href: "/om", label: "Om AIvett" },
  ],
  Konto: [
    { href: "/logg-inn", label: "Logg inn" },
    { href: "/registrer", label: "Registrer deg" },
    { href: "/profil/kurs", label: "Mine kurs" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-950">
              AI<span className="text-blue-600">vett</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              Norges ledende plattform for AI-læring. Alt du trenger for å forstå og bruke kunstig intelligens.
            </p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">{group}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-950 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} AIvett. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  )
}
