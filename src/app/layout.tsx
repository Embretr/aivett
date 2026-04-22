import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "sonner"
import { TRPCReactProvider } from "../trpc/react"
import { websiteJsonLd, organizationJsonLd } from "../lib/seo"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "AIvett – Lær kunstig intelligens på norsk",
    template: "%s | AIvett",
  },
  description:
    "Norges ledende plattform for AI-læring. Kurs, guider, nyheter og sammenligninger om kunstig intelligens på norsk.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://aivett.no"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    siteName: "AIvett",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${spaceGrotesk.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full bg-white antialiased">
        <TRPCReactProvider>
          {children}
          <Toaster position="top-right" richColors />
        </TRPCReactProvider>
      </body>
    </html>
  )
}
