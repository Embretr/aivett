import { Navbar } from "../../components/marketing/navbar"
import { Footer } from "../../components/marketing/footer"

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
