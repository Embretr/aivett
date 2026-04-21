import { buildMetadata } from "../../../lib/seo"

export const metadata = buildMetadata({
  title: "Om AIvett",
  description:
    "Les om AIvett — Norges første plattform for AI-læring på norsk. Vår misjon er å gjøre kunstig intelligens tilgjengelig for alle nordmenn.",
  slug: "/om",
})

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">Om AIvett</h1>
        <div className="mt-8 prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            AIvett ble grunnlagt med en enkel misjon: a gjore kunstig intelligens tilgjengelig og
            forstaelig for alle nordmenn.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            AI-teknologien utvikler seg raskt, og det kan være vanskelig å holde seg oppdatert —
            særlig når det meste av innholdet er på engelsk. AIvett fyller dette gapet ved å tilby
            kurs, guider, nyheter og sammenligninger pa norsk.
          </p>
          <h2 className="mt-10 text-2xl font-bold text-gray-950">Vart innhold</h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><strong>Kurs:</strong> Strukturerte læringsløp med leksjoner, quizer og praktiske oppgaver.</li>
            <li><strong>Guider:</strong> Dyptgaende gjennomganger av AI-verktoy og konsepter.</li>
            <li><strong>Veiledninger:</strong> Steg-for-steg instruksjoner for a ta i bruk AI.</li>
            <li><strong>Sammenligninger:</strong> Uavhengige sammenligninger av populære AI-tjenester.</li>
            <li><strong>Nyheter:</strong> Siste nytt fra AI-verdenen, forklart pa norsk.</li>
          </ul>
          <h2 className="mt-10 text-2xl font-bold text-gray-950">Kontakt</h2>
          <p className="mt-4 text-gray-600">
            Har du sporsmal, forslag eller vil bidra med innhold? Send oss en e-post pa{" "}
            <a href="mailto:hei@aivett.no" className="text-blue-600 hover:underline">
              hei@aivett.no
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
