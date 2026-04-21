"use client"

import { useEffect, useRef } from "react"
import { useSession } from "../../lib/auth-client"
import { trpc } from "../../trpc/react"

interface AdSlotProps {
  slot: string
  format?: "auto" | "horizontal" | "rectangle"
  className?: string
}

export function AdSlot({ slot, format = "auto", className }: AdSlotProps) {
  const { data: session } = useSession()
  const subscription = trpc.payments.getSubscription.useQuery(undefined, {
    enabled: !!session,
  })
  const adRef = useRef<HTMLIFrameElement>(null)
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID

  // Hide ads for active subscribers
  const hasActiveSubscription = subscription.data?.status === "ACTIVE"
  if (hasActiveSubscription || !adsenseId) return null

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
