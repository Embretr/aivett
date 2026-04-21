"use client"

import { Button } from "../ui/button"
import { trpc } from "../../trpc/react"
import { toast } from "sonner"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

interface LessonCompleteButtonProps {
  lessonId: string
  isCompleted: boolean
  nextLessonHref?: string
}

export function LessonCompleteButton({ lessonId, isCompleted, nextLessonHref }: LessonCompleteButtonProps) {
  const utils = trpc.useUtils()
  const mark = trpc.courses.markLessonComplete.useMutation({
    onSuccess: () => {
      void utils.courses.progress.invalidate()
      toast.success("Leksjon fullfort!")
    },
  })

  if (isCompleted) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircleIcon className="size-5" />
          <span className="text-sm font-medium">Fullfort</span>
        </div>
        {nextLessonHref && (
          <a href={nextLessonHref}>
            <Button size="sm">Neste leksjon &rarr;</Button>
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={() => mark.mutate({ lessonId })}
        disabled={mark.isPending}
        size="sm"
      >
        {mark.isPending ? "Lagrer..." : "Merk som fullfort"}
      </Button>
      {nextLessonHref && (
        <a href={nextLessonHref}>
          <Button variant="secondary" size="sm">
            Neste leksjon &rarr;
          </Button>
        </a>
      )}
    </div>
  )
}
