"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { trpc } from "../../trpc/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import { cn } from "../../lib/utils"

const schema = z.object({
  name: z.string().min(2, "Navn må være minst 2 tegn"),
  email: z.string().email("Ugyldig e-postadresse"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.enum(["call", "audit", "implementation"]),
  message: z.string().min(10, "Beskriv gjerne situasjonen din (minst 10 tegn)"),
})

type ContactForm = z.infer<typeof schema>

const services = [
  {
    value: "call" as const,
    label: "Gratis oppdagelsessamtale",
    description: "30 min — vi kartlegger AI-muligheter i din bedrift",
  },
  {
    value: "audit" as const,
    label: "Prosessgjennomgang",
    description: "Grundig analyse av arbeidsflyt og AI-potensial, med skriftlig rapport",
  },
  {
    value: "implementation" as const,
    label: "AI-implementering",
    description: "Vi designer og bygger løsningen for deg fra start til mål",
  },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } =
    useForm<ContactForm>({
      resolver: zodResolver(schema),
      defaultValues: { service: "call" },
    })

  const selectedService = watch("service")

  const submit = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true)
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  if (submitted) {
    return (
      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-10 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-violet-600">
          <svg className="size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-950">Takk for henvendelsen!</h3>
        <p className="mt-2 text-gray-500">Vi tar kontakt innen én virkedag.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit((data) => submit.mutate(data))}
      className="space-y-6"
    >
      {/* Service selector */}
      <div className="space-y-3">
        <Label>Hva kan vi hjelpe med?</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setValue("service", s.value)}
              className={cn(
                "rounded-2xl border-2 p-4 text-left transition-all",
                selectedService === s.value
                  ? "border-violet-600 bg-violet-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <p className={cn(
                "text-sm font-semibold",
                selectedService === s.value ? "text-violet-700" : "text-gray-950"
              )}>
                {s.label}
              </p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{s.description}</p>
            </button>
          ))}
        </div>
        {errors.service && <p className="text-xs text-red-600">{errors.service.message}</p>}
      </div>

      {/* Name + email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Navn</Label>
          <Input id="name" placeholder="Ola Nordmann" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" placeholder="ola@bedrift.no" {...register("email")} />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      {/* Company + phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="company">Bedrift <span className="text-gray-400">(valgfritt)</span></Label>
          <Input id="company" placeholder="Bedrift AS" {...register("company")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon <span className="text-gray-400">(valgfritt)</span></Label>
          <Input id="phone" type="tel" placeholder="+47 000 00 000" {...register("phone")} />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message">Beskriv situasjonen din</Label>
        <textarea
          id="message"
          rows={4}
          placeholder="Fortell litt om bedriften din, hva dere driver med, og hvilke prosesser dere ønsker å forbedre..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition resize-none"
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || submit.isPending}
        className="w-full bg-violet-700 hover:bg-violet-600 text-white py-3 text-base"
      >
        {submit.isPending ? "Sender..." : "Send henvendelse"}
      </Button>

      <p className="text-center text-xs text-gray-400">
        Vi svarer innen én virkedag. Ingen spam, ingen forpliktelser.
      </p>
    </form>
  )
}
