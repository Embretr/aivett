"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string | null
}

interface QuizBlockProps {
  quiz: QuizQuestion
}

export function QuizBlock({ quiz }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const isCorrect = selected === quiz.correctAnswer

  return (
    <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          Sporsmal
        </span>
      </div>
      <p className="font-semibold text-gray-950 mb-4">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((option, i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left text-sm transition-all",
              submitted && i === quiz.correctAnswer
                ? "border-green-400 bg-green-50 text-green-800"
                : submitted && i === selected && !isCorrect
                  ? "border-red-300 bg-red-50 text-red-700"
                  : selected === i
                    ? "border-blue-400 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
            )}
          >
            <span className="mr-3 font-medium">{String.fromCharCode(65 + i)}.</span>
            {option}
          </button>
        ))}
      </div>

      {!submitted && (
        <Button
          className="mt-4"
          size="sm"
          disabled={selected === null}
          onClick={() => setSubmitted(true)}
        >
          Sjekk svar
        </Button>
      )}

      {submitted && (
        <div className={cn("mt-4 rounded-xl p-4", isCorrect ? "bg-green-50" : "bg-red-50")}>
          <p className={cn("font-semibold text-sm", isCorrect ? "text-green-800" : "text-red-700")}>
            {isCorrect ? "Riktig!" : "Ikke riktig."}
          </p>
          {quiz.explanation && (
            <p className="mt-1 text-sm text-gray-600">{quiz.explanation}</p>
          )}
          <button
            onClick={() => { setSubmitted(false); setSelected(null) }}
            className="mt-2 text-xs text-gray-500 underline hover:text-gray-900"
          >
            Prov igjen
          </button>
        </div>
      )}
    </div>
  )
}
