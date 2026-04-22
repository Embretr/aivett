export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { db } from "../../server/db"
import { CourseCard } from "../../components/courses/course-card"
import { buildMetadata, faqJsonLd } from "../../lib/seo"
import { ArrowRightIcon } from "@heroicons/react/20/solid"

export const metadata = buildMetadata({
  title: "Lær kunstig intelligens på norsk",
  description:
    "Norges ledende plattform for AI-læring. Kurs, guider, nyheter og sammenligninger om kunstig intelligens på norsk.",
})

const testimonials = [
  {
    text: "AIvett har gjort det så enkelt å komme i gang med AI. Kurset om ChatGPT forandret måten jeg jobber på.",
    author: "Maria H.",
    role: "Markedssjef",
  },
  {
    text: "Endelig norsk innhold om AI som faktisk er bra! Guiden om Midjourney var super.",
    author: "Lars A.",
    role: "Designer",
  },
  {
    text: "Jeg bruker AIvett til å holde meg oppdatert på nyheter og prøver kursene på fritiden.",
    author: "Kristin M.",
    role: "Lærer",
  },
]

const faqs = [
  {
    question: "Er kursene på norsk?",
    answer: "Ja, alt innhold på AIvett er på norsk — kurs, guider, nyheter og sammenligninger.",
  },
  {
    question: "Hva er forskjellen på gratis og betalt innhold?",
    answer:
      "Nyheter, guider og noen gratiskurs er alltid gratis. Premium-kurs krever kjøp (1 års tilgang) eller et abonnement.",
  },
  {
    question: "Kan jeg ta kursene i mitt eget tempo?",
    answer: "Ja! Alle kurs er selvdrevne — du bestemmer når og i hvilken rekkefølge du gjennomfører dem.",
  },
  {
    question: "Hva skjer når 1 året er over?",
    answer:
      "Etter 1 år mister du tilgangen til betalte kurs, men kan forlenge ved å kjøpe på nytt eller tegne abonnement.",
  },
]

async function getFeaturedCourses() {
  return db.course.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      modules: { include: { lessons: { select: { id: true } } } },
    },
  })
}

async function getLatestArticles() {
  return db.article.findMany({
    where: { published: true },
    take: 4,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      publishedAt: true,
      author: true,
      readingTime: true,
      ogImage: true,
    },
  })
}

const categoryPaths: Record<string, string> = {
  NEWS: "nyheter",
  GUIDE: "guider",
  TUTORIAL: "veiledninger",
  COMPARISON: "sammenligninger",
}

const categoryLabels: Record<string, string> = {
  NEWS: "Nyhet",
  GUIDE: "Guide",
  TUTORIAL: "Veiledning",
  COMPARISON: "Sammenligning",
}

export default async function LandingPage() {
  const [courses, articles] = await Promise.all([getFeaturedCourses(), getLatestArticles()])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      {/* Hero — dark editorial */}
      <section className="relative overflow-hidden bg-[#080808]">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.11) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Violet glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-violet-700/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 lg:px-8 lg:pt-28 lg:pb-36">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/50">
              <span className="size-1.5 rounded-full bg-violet-400 shrink-0" />
              Norges første AI-læringsplattform
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.08]">
              Forstå og bruk<br />
              <span className="text-violet-400">kunstig intelligens</span><br />
              på norsk.
            </h1>

            <p className="mt-8 text-lg leading-8 text-white/50 max-w-xl">
              Kurs, guider og nyheter om AI — forklart enkelt, på norsk. For deg som vil henge med i utviklingen.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/kurs">
                <Button size="lg" className="bg-violet-700 hover:bg-violet-600 text-white shadow-none">
                  Se alle kurs
                </Button>
              </Link>
              <Link href="/registrer">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                >
                  Opprett gratis konto
                </Button>
              </Link>
            </div>


          </div>
        </div>
      </section>

      {/* Category strip */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 py-3">
            <span className="text-xs font-medium text-gray-300 mr-2 shrink-0">Utforsk:</span>
            {[
              { href: "/kurs", label: "Kurs" },
              { href: "/nyheter", label: "Nyheter innen AI" },
              { href: "/guider", label: "Guider" },
              { href: "/veiledninger", label: "Veiledninger" },
              { href: "/sammenligninger", label: "Sammenligninger" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-3.5 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-950 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured courses */}
      {courses.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Kurs</p>
                <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-gray-950">Populære kurs</h2>
              </div>
              <Link
                href="/kurs"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-700 transition-colors"
              >
                Se alle <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing — dark editorial */}
      <section className="relative overflow-hidden py-20 bg-gray-950">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.11) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Priser</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                Start gratis, oppgrader når du er klar
              </h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                Gratis kurs og artikler er alltid tilgjengelig. Få ubegrenset tilgang til alle kurs for 249 kr/måned.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Ubegrenset tilgang til alle kurs",
                  "Quizer og praktiske oppgaver",
                  "Fremgangssporing per leksjon",
                  "Ingen annonser",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="size-1.5 rounded-full bg-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/priser">
                  <Button size="lg" variant="secondary">
                    Se alle planer
                  </Button>
                </Link>
                <Link href="/registrer">
                  <Button size="lg" className="bg-violet-700 hover:bg-violet-600 text-white shadow-none">
                    Start gratis
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Gratis</p>
                <p className="mt-1 text-2xl font-bold text-white">0 kr</p>
                <p className="mt-1 text-sm text-gray-500">Nyheter, guider og gratis kurs</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 p-5 ring-1 ring-violet-500/20">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Månedlig</p>
                  <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                    Populær
                  </span>
                </div>
                <p className="mt-1 text-2xl font-bold text-white">
                  249 kr<span className="text-base font-normal text-gray-400">/mnd</span>
                </p>
                <p className="mt-1 text-sm text-gray-400">Alle kurs, ingen annonser</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Årlig</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  1 999 kr<span className="text-base font-normal text-gray-400">/år</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">Beste pris — spar 1 000 kr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest articles — editorial list */}
      {articles.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Innhold</p>
                <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-gray-950">Siste fra redaksjonen</h2>
              </div>
              <Link
                href="/nyheter"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-700 transition-colors"
              >
                Se alle <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {articles.map((article) => {
                const path = categoryPaths[article.category] ?? "nyheter"
                const label = categoryLabels[article.category] ?? article.category
                return (
                  <Link
                    key={article.id}
                    href={`/${path}/${article.slug}`}
                    className="group flex items-start gap-6 py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <span className="mt-0.5 w-24 shrink-0 text-xs font-semibold uppercase tracking-widest text-violet-600">
                      {label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-950 group-hover:text-violet-700 transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                    </div>
                    {article.readingTime && (
                      <span className="shrink-0 text-xs text-gray-400 mt-0.5 hidden sm:block">
                        {article.readingTime} min
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 text-center mb-3">
            Tilbakemeldinger
          </p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 mb-14">
            Hva brukerne sier
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author}>
                <p className="text-gray-600 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-700 shrink-0">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-950">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 text-center mb-3">FAQ</p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 mb-12">
            Vanlige spørsmål
          </h2>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-semibold text-gray-950">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-[#080808]">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.11) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-bold text-white tracking-tight">Klar til å starte?</h2>
          <p className="mt-4 text-lg text-white/40">
            Bli med nordmenn som lærer AI på AIvett.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/registrer">
              <Button size="lg" className="bg-violet-700 hover:bg-violet-600 text-white shadow-none">
                Opprett gratis konto
              </Button>
            </Link>
            <Link href="/kurs">
              <Button
                size="lg"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
              >
                Se kursene
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
