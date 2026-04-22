import { buildMetadata } from "../../../lib/seo"
import { ContactForm } from "../../../components/marketing/contact-form"

export const metadata = buildMetadata({
  title: "AI-konsultasjon for norske bedrifter",
  description:
    "Vi hjelper norske virksomheter med å identifisere og implementere AI. Fra gratis samtale til ferdig løsning.",
  slug: "/konsultasjon",
})

const steps = [
  {
    n: "01",
    title: "Send inn skjema",
    body: "Fortell oss litt om bedriften og hva du ønsker å oppnå. Det tar under to minutter.",
  },
  {
    n: "02",
    title: "Vi tar kontakt",
    body: "En AI-rådgiver fra AIvett kontakter deg innen én virkedag for å avtale videre.",
  },
  {
    n: "03",
    title: "Vi leverer",
    body: "Enten det er en rapport, en plan eller en ferdig løsning — vi sørger for at du faktisk kommer i gang.",
  },
]

const services = [
  {
    tag: "Gratis",
    title: "Oppdagelsessamtale",
    price: "0 kr",
    description:
      "En 30-minutters videsamtale der vi kartlegger bedriften din og identifiserer de tre til fem stedene der AI kan gi størst effekt — raskt og uten store investeringer.",
    includes: [
      "30 min videsamtale",
      "Identifisering av AI-muligheter",
      "Konkrete neste steg",
      "Ingen forpliktelser",
    ],
    cta: "Book gratis samtale",
    highlighted: false,
  },
  {
    tag: "Mest populær",
    title: "Prosessgjennomgang",
    price: "Fra 4 990 kr",
    description:
      "Vi går grundig gjennom eksisterende arbeidsprosesser, kartlegger AI-potensialet og leverer en skriftlig rapport med prioriterte anbefalinger og estimert ROI.",
    includes: [
      "Dybdeintervju med nøkkelpersoner",
      "Kartlegging av alle relevante prosesser",
      "Skriftlig rapport med prioriteringer",
      "Estimert tids- og kostnadsbesparelse",
      "Oppfølgingssamtale inkludert",
    ],
    cta: "Kom i gang",
    highlighted: true,
  },
  {
    tag: "Skreddersydd",
    title: "AI-implementering",
    price: "Pristilbud",
    description:
      "Vi designer, bygger og ruller ut AI-løsningen for deg. Fra automatiserte arbeidsflyter i n8n til egne GPT-er og integrasjoner mot eksisterende systemer.",
    includes: [
      "Kravspesifikasjon og design",
      "Bygging og testing",
      "Opplæring av ansatte",
      "Dokumentasjon",
      "3 måneders support inkludert",
    ],
    cta: "Be om tilbud",
    highlighted: false,
  },
]

const useCases = [
  { icon: "✦", title: "Automatisering av rapportering", body: "Fra manuelle Excel-ark til automatiske ukentlige rapporter sendt rett i innboksen." },
  { icon: "✦", title: "Kundeservice-bot", body: "Svar på 80 % av henvendelsene automatisk, døgnet rundt, på norsk." },
  { icon: "✦", title: "Dokumentbehandling", body: "Trekk ut nøkkeldata fra fakturaer, kontrakter og skjemaer uten manuell jobb." },
  { icon: "✦", title: "Innholdsproduksjon", body: "Generer nyhetsbrev, produktbeskrivelser og sosiale medier-innlegg i merkevarens tone." },
  { icon: "✦", title: "Intern kunnskapsbase", body: "En AI-assistent som kjenner bedriftens rutiner, produkter og prosedyrer." },
  { icon: "✦", title: "Salgsstøtte", body: "Automatisk kvalifisering av leads, oppfølging og CRM-oppdatering." },
]

export default function KonsultasjonPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-violet-950 py-24 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(167,139,250,0.12) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 size-[600px] rounded-full bg-violet-600/25 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-300 uppercase">
            AI-konsultasjon
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-6xl leading-[1.1]">
            Vi implementerer AI<br />
            <span className="text-violet-300">i din bedrift.</span>
          </h1>
          <p className="mt-6 text-xl text-violet-200/70 max-w-2xl mx-auto leading-relaxed">
            De fleste norske virksomheter vet at AI kan hjelpe dem — men vet ikke hvor de skal begynne.
            Vi tar deg fra idé til ferdig løsning.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-violet-900 hover:bg-violet-50 transition-colors shadow-lg shadow-violet-900/30"
            >
              Book gratis samtale
            </a>
            <a
              href="#tjenester"
              className="inline-block rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
            >
              Se tjenester
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            {[
              { stat: "40–70 %", label: "tidsbesparelse på repetitive oppgaver" },
              { stat: "< 4 uker", label: "fra samtale til ferdig løsning" },
              { stat: "100 %", label: "norske rådgivere som kjenner markedet" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold tracking-tight text-violet-700">{stat}</p>
                <p className="mt-2 text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="tjenester" className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-violet-700 uppercase">Tjenester</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
              Velg det som passer deg
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Enten du er nysgjerrig og vil lære mer, eller klar til å bygge — vi møter deg der du er.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  s.highlighted
                    ? "border-violet-600 bg-violet-700 text-white shadow-xl shadow-violet-900/20"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className={`text-xs font-semibold tracking-widest uppercase ${
                  s.highlighted ? "text-violet-200" : "text-violet-700"
                }`}>
                  {s.tag}
                </span>
                <h3 className={`mt-3 text-xl font-bold ${s.highlighted ? "text-white" : "text-gray-950"}`}>
                  {s.title}
                </h3>
                <p className={`mt-1 text-2xl font-bold ${s.highlighted ? "text-violet-200" : "text-violet-700"}`}>
                  {s.price}
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${s.highlighted ? "text-violet-100" : "text-gray-500"}`}>
                  {s.description}
                </p>
                <ul className="mt-6 space-y-2 flex-1">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className={`mt-0.5 size-4 shrink-0 ${s.highlighted ? "text-violet-300" : "text-violet-600"}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={s.highlighted ? "text-violet-100" : "text-gray-600"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`mt-8 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-colors ${
                    s.highlighted
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "bg-violet-700 text-white hover:bg-violet-600"
                  }`}
                >
                  {s.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-violet-700 uppercase">Eksempler</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
              Hva vi typisk bygger
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-violet-200 hover:shadow-sm transition-all">
                <span className="text-violet-600 text-lg">{u.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-gray-950">{u.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest text-violet-700 uppercase">Prosess</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
              Slik foregår det
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <span className="text-5xl font-bold text-violet-200 select-none">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-gray-950">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="kontakt" className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-violet-700 uppercase">Kom i gang</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
              Ta kontakt
            </h2>
            <p className="mt-4 text-gray-500">
              Fyll ut skjemaet under, så hører du fra oss innen én virkedag.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
