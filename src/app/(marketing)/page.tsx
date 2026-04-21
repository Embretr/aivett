export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Gradient } from "../../components/marketing/gradient"
import { db } from "../../server/db"
import { CourseCard } from "../../components/courses/course-card"
import { ArticleCard } from "../../components/shared/article-card"
import { buildMetadata, faqJsonLd } from "../../lib/seo"
import {
  AcademicCapIcon,
  NewspaperIcon,
  BookOpenIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/20/solid"

export const metadata = buildMetadata({
  title: "Lær kunstig intelligens på norsk",
  description:
    "Norges ledende plattform for AI-læring. Kurs, guider, nyheter og sammenligninger om kunstig intelligens på norsk.",
})

const features = [
  {
    icon: AcademicCapIcon,
    title: "Kurs på norsk",
    description: "Strukturerte kurs med leksjoner, quizer og oppgaver — alt på norsk.",
  },
  {
    icon: NewspaperIcon,
    title: "AI-nyheter",
    description: "Hold deg oppdatert med de siste nyhetene fra AI-verdenen, forklart på norsk.",
  },
  {
    icon: BookOpenIcon,
    title: "Guider og veiledninger",
    description: "Dyptgående guider som hjelper deg å ta i bruk AI-verktoy i praksis.",
  },
  {
    icon: ChartBarIcon,
    title: "Sammenligninger",
    description: "Uavhengige sammenligninger av AI-verktoy slik at du velger riktig.",
  },
  {
    icon: BoltIcon,
    title: "Praktisk innhold",
    description: "Fokus pa praktiske ferdigheter du kan bruke med en gang.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Alltid oppdatert",
    description: "AI utvikler seg raskt. Vi holder innholdet oppdatert for deg.",
  },
]

const testimonials = [
  {
    text: "AIvett har gjort det sa enkelt a komme i gang med AI. Kurset om ChatGPT forandret maten jeg jobber pa.",
    author: "Maria H.",
    role: "Markedssjef",
  },
  {
    text: "Endelig norsk innhold om AI som faktisk er bra! Guiden om Midjourney var super.",
    author: "Lars A.",
    role: "Designer",
  },
  {
    text: "Jeg bruker AIvett til a holde meg oppdatert pa nyheter og prover kursene pa fritiden.",
    author: "Kristin M.",
    role: "Lærer",
  },
]

const faqs = [
  {
    question: "Er kursene pa norsk?",
    answer: "Ja, alt innhold pa AIvett er pa norsk — kurs, guider, nyheter og sammenligninger.",
  },
  {
    question: "Hva er forskjellen pa gratis og betalt innhold?",
    answer:
      "Nyheter, guider og noen gratiskurs er alltid gratis. Premium-kurs krever kjop (1 ars tilgang) eller et abonnement.",
  },
  {
    question: "Kan jeg ta kursene i mitt eget tempo?",
    answer: "Ja! Alle kurs er selvdrevne — du bestemmer nar og i hvilken rekkefylge du gjennomforer dem.",
  },
  {
    question: "Hva skjer nar 1 aret er over?",
    answer:
      "Etter 1 ar mister du tilgangen til betalte kurs, men kan forlenge tilgangen ved a kjope pa nytt eller tegne abonnement.",
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
    take: 3,
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

export default async function LandingPage() {
  const [courses, articles] = await Promise.all([getFeaturedCourses(), getLatestArticles()])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Gradient className="absolute inset-x-0 top-0 h-[600px] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
              Norges første AI-læringsplattform
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
              Forsta og bruk{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                kunstig intelligens
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Kurs, guider, nyheter og sammenligninger om AI — pa norsk. For deg som vil holde deg
              oppdatert og lare praktiske AI-ferdigheter.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/kurs">
                <Button size="lg">Se alle kurs</Button>
              </Link>
              <Link href="/priser">
                <Button variant="secondary" size="lg">
                  Se priser
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Gratis kurs tilgjengelig — ingen kredittkort nodvendig
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              Alt du trenger for å lære AI
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Fra nybegynner til ekspert — pa dine premisser
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white border border-gray-200 p-6">
                <feature.icon className="size-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-950 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      {courses.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-950">Populære kurs</h2>
                <p className="mt-2 text-gray-500">Kom i gang med det beste innholdet vart</p>
              </div>
              <Link href="/kurs" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Se alle kurs &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing preview */}
      <section className="py-20 bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Start gratis, oppgrader nar du er klar
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Gratis kurs og artikler alltid tilgjengelig. Fa tilgang til alle kurs for 249 kr/maned.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Ubegrenset tilgang til alle kurs",
                  "Quizer og praktiske oppgaver",
                  "Fremgangsporingen",
                  "Ingen annonser",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon className="size-5 text-blue-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/priser">
                  <Button size="lg" variant="secondary">
                    Se alle planer
                  </Button>
                </Link>
                <Link href="/registrer">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Start gratis
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">249</span>
                <span className="text-xl text-gray-400">kr/maned</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">eller 1 999 kr/ar — spar 1 000 kr</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">Enkelt kurs</p>
                  <p className="text-xs text-gray-400 mt-1">499–999 kr · 1 ars tilgang</p>
                </div>
                <div className="rounded-xl bg-blue-600/20 border border-blue-500/30 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Manedlig abonnement</p>
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                      Populær
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">249 kr/maned · Alle kurs</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">Arsabonnement</p>
                  <p className="text-xs text-gray-400 mt-1">1 999 kr/ar · Alle kurs · Beste pris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 mb-12">
            Hva brukerne sier
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm text-gray-950">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-950">Siste nyheter</h2>
                <p className="mt-2 text-gray-500">Hold deg oppdatert pa hva som skjer i AI-verdenen</p>
              </div>
              <Link href="/nyheter" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Se alle nyheter &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 mb-12">
            Vanlige sporsmal
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-950">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Klar til a starte?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Bli med tusenvis av nordmenn som lærer AI på AIvett.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/registrer">
              <Button size="lg" variant="secondary">
                Opprett gratis konto
              </Button>
            </Link>
            <Link href="/kurs">
              <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 border border-white/20">
                Se kursene
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
