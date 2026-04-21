import Link from "next/link"
import { Button } from "../components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-950">404</h1>
      <p className="mt-4 text-xl text-gray-500">Siden ble ikke funnet</p>
      <p className="mt-2 text-gray-400">
        Det du leter etter finnes ikke, eller har blitt flyttet.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button>Ga til forsiden</Button>
        </Link>
        <Link href="/kurs">
          <Button variant="secondary">Se kurs</Button>
        </Link>
      </div>
    </div>
  )
}
