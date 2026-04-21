export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { auth } from "../../../server/auth"
import { db } from "../../../server/db"
import { buildMetadata } from "../../../lib/seo"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { formatDate } from "../../../lib/utils"

export const metadata = buildMetadata({
  title: "Min profil",
  slug: "/profil",
})

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/logg-inn?redirect=/profil")

  const [user, subscription] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, createdAt: true },
    }),
    db.subscription.findUnique({
      where: { userId: session.user.id },
    }),
  ])

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950">Min profil</h1>

        <div className="mt-8 space-y-6">
          {/* User info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-950 mb-4">Kontoinformasjon</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Navn</p>
                <p className="text-sm font-medium text-gray-950">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">E-post</p>
                <p className="text-sm font-medium text-gray-950">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Medlem siden</p>
                <p className="text-sm text-gray-600">
                  {user?.createdAt ? formatDate(user.createdAt) : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-950 mb-4">Abonnement</h2>
            {subscription?.status === "ACTIVE" ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="success">Aktivt abonnement</Badge>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Forlenges automatisk {formatDate(subscription.currentPeriodEnd)}
                </p>
                <ManageSubscriptionButton />
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Du har ingen aktivt abonnement. Oppgrader for a fa tilgang til alle kurs.
                </p>
                <Link href="/priser">
                  <Button>Se abonnement</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-950 mb-4">Mine kurs</h2>
            <p className="text-sm text-gray-500 mb-4">Se fremgangen din og fortsett der du slapp.</p>
            <Link href="/profil/kurs">
              <Button variant="secondary">Ga til mine kurs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ManageSubscriptionButton() {
  "use client"
  // This is rendered server-side — the manage button needs client
  return (
    <Link href="/api/auth/manage-subscription">
      <Button variant="secondary" size="sm">
        Administrer abonnement
      </Button>
    </Link>
  )
}
