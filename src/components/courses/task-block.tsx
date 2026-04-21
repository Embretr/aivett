"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { trpc } from "../../trpc/react"
import { toast } from "sonner"

interface TaskBlockProps {
  task: {
    id: string
    title: string
    description: string
    type: string
  }
  existingSubmission?: string
}

export function TaskBlock({ task, existingSubmission }: TaskBlockProps) {
  const [answer, setAnswer] = useState(existingSubmission ?? "")
  const [completed, setCompleted] = useState(!!existingSubmission)

  const submit = trpc.courses.submitTask.useMutation({
    onSuccess: () => {
      setCompleted(true)
      toast.success("Oppgave levert!")
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return (
    <div className="my-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
          Oppgave
        </span>
        {completed && (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
            Fullfort
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-950 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      {task.type !== "MULTIPLE_CHOICE" && (
        <textarea
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={4}
          placeholder={task.type === "CODE" ? "// Skriv koden din her..." : "Skriv svaret ditt her..."}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={completed && !existingSubmission}
        />
      )}

      <Button
        size="sm"
        className="mt-3"
        disabled={!answer.trim() || submit.isPending}
        onClick={() => submit.mutate({ taskId: task.id, content: answer })}
      >
        {submit.isPending ? "Sender..." : completed ? "Oppdater svar" : "Lever oppgave"}
      </Button>
    </div>
  )
}
