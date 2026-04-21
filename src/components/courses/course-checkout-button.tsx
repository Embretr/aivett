"use client"

import { Button } from "../ui/button"
import { trpc } from "../../trpc/react"
import { useSession } from "../../lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CourseCheckoutButtonProps {
  courseId: string
  courseTitle: string
}

export function CourseCheckoutButton({ courseId, courseTitle }: CourseCheckoutButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const checkout = trpc.payments.createCourseCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url
    },
    onError: (err) => toast.error(err.message),
  })

  const handleClick = () => {
    if (!session) {
      router.push(`/logg-inn?redirect=/kurs/${courseId}`)
      return
    }
    checkout.mutate({ courseId })
  }

  return (
    <Button className="w-full mt-4" onClick={handleClick} disabled={checkout.isPending}>
      {checkout.isPending ? "Vent..." : `Kjop tilgang`}
    </Button>
  )
}
