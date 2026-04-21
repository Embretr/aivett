import Link from "next/link"
import { Logo } from "./logo"

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
    <footer className="border-t border-gray-100 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
              Norges ledende plattform for AI-læring. Alt du trenger for å forstå og bruke kunstig intelligens.
            </p>
            <a
              href="mailto:hei@aivett.no"
              className="mt-4 block text-sm text-violet-600 hover:text-violet-700 transition-colors"
            >
              hei@aivett.no
            </a>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-300">{group}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-950 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-gray-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} AIvett. Alle rettigheter reservert.
          </p>
          <p className="text-xs text-gray-300">Laget med omhu i Norge</p>
        </div>
      </div>
    </footer>
  )
}
