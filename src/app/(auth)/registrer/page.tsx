"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { signUp } from "../../../lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const registerSchema = z.object({
  name: z.string().min(2, "Navn må være minst 2 tegn"),
  email: z.string().email("Ugyldig e-postadresse"),
  password: z.string().min(8, "Passord må være minst 8 tegn"),
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Konto opprettet! Velkommen til AIvett.")
          router.push("/profil")
        },
        onError: (ctx) => { toast.error(ctx.error.message) },
      },
    })
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-950">Opprett konto</h1>
      <p className="mt-2 text-sm text-gray-500">Gratis — ingen kredittkort nødvendig</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Navn</Label>
          <Input
            id="name"
            type="text"
            placeholder="Ditt navn"
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            type="email"
            placeholder="deg@eksempel.no"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Passord</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minst 8 tegn"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Oppretter konto..." : "Opprett konto"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-400">
        Ved å registrere deg godtar du våre{" "}
        <Link href="/vilkar" className="underline hover:text-gray-600">
          brukervilkar
        </Link>
      </p>

      <p className="mt-4 text-center text-sm text-gray-500">
        Har du konto?{" "}
        <Link href="/logg-inn" className="font-medium text-blue-600 hover:underline">
          Logg inn
        </Link>
      </p>
    </div>
  )
}
