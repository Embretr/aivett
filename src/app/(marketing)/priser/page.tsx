"use client"

import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { trpc } from "../../../trpc/react"
import { useSession } from "../../../lib/auth-client"
import { CheckIcon } from "@heroicons/react/20/solid"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { faqJsonLd } from "../../../lib/seo"

const plans = [
  {
    name: "Gratis",
    price: "0",
    period: "",
    description: "Kom i gang med gratis kurs og artikler",
    cta: "Start gratis",
    href: "/registrer",
    featured: false,
    features: [
      "Gratis kurs",
      "AI-nyheter og artikler",
      "Guider og veiledninger",
      "Annonser vises",
    ],
  },
  {
    name: "Manedlig",
    price: "249",
    period: "/maned",
    description: "Full tilgang til alle kurs",
    cta: "Start abonnement",
    plan: "monthly" as const,
    featured: true,
    features: [
      "Alle premium-kurs",
      "Ubegrenset tilgang",
      "Quizer og oppgaver",
      "Fremgangsporingen",
      "Ingen annonser",
      "Avbryt nar som helst",
    ],
  },
  {
    name: "Arlig",
    price: "1 999",
    period: "/ar",
    description: "Beste verdi — spar 1 000 kr",
    cta: "Start arsabonnement",
    plan: "yearly" as const,
    featured: false,
    features: [
      "Alt i Manedlig",
      "2 maneder gratis",
      "Prioritert support",
      "Tidlig tilgang til nytt innhold",
    ],
  },
]

const faqs = [
  {
    question: "Kan jeg avbryte nar som helst?",
    answer: "Ja, du kan avbryte abonnementet nar du vil. Du beholder tilgangen ut betalingsperioden.",
  },
  {
    question: "Hva er forskjellen pa enkelt kurs og abonnement?",
    answer:
      "Enkelt kurs gir 1 ars tilgang til ett spesifikt kurs (499–999 kr). Abonnement gir tilgang til alle kurs sla lenge det er aktivt.",
  },
  {
    question: "Aksepterer dere Vipps?",
    answer: "Vi aksepterer alle vanlige kredittkort via Stripe. Vipps-stotte er planlagt.",
  },
  {
    question: "Hva hvis jeg er misfornoy?",
    answer: "Kontakt oss innen 14 dager for full refusjon — ingen sporsmal stilt.",
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const createSubscription = trpc.payments.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url
    },
    onError: (err) => toast.error(err.message),
  })

  const handleSubscribe = (plan: "monthly" | "yearly") => {
    if (!session) {
      router.push(`/logg-inn?redirect=/priser`)
      return
    }
    createSubscription.mutate({ plan })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Enkle priser, ingen overraskelser
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Start gratis. Oppgrader nar du er klar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.featured
                    ? "bg-gray-950 text-white ring-2 ring-blue-600 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.featured && (
                  <div className="mb-4">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Mest populær
                    </span>
                  </div>
                )}
                <h2 className={`text-lg font-semibold ${plan.featured ? "text-white" : "text-gray-950"}`}>
                  {plan.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-gray-950"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                    kr{plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckIcon
                        className={`size-5 shrink-0 ${plan.featured ? "text-blue-400" : "text-blue-600"}`}
                      />
                      <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {"plan" in plan && plan.plan ? (
                    <Button
                      className="w-full"
                      variant={plan.featured ? "default" : "secondary"}
                      onClick={() => handleSubscribe(plan.plan!)}
                      disabled={createSubscription.isPending}
                    >
                      {createSubscription.isPending ? "Vent..." : plan.cta}
                    </Button>
                  ) : (
                    <Link href={plan.href ?? "/registrer"}>
                      <Button
                        className="w-full"
                        variant={plan.featured ? "default" : "secondary"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Enkelt kurs: 499–999 kr med 1 ars tilgang.{" "}
            <Link href="/kurs" className="text-blue-600 hover:underline">
              Se alle kurs
            </Link>
          </p>

          {/* FAQ */}
          <div className="mt-24">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-950 mb-10">
              Ofte stilte sporsmal om priser
            </h2>
            <div className="mx-auto max-w-3xl space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-950">{faq.question}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
