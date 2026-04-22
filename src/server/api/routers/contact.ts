import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Navn må være minst 2 tegn"),
        email: z.string().email("Ugyldig e-postadresse"),
        company: z.string().optional(),
        phone: z.string().optional(),
        service: z.enum(["call", "audit", "implementation"]),
        message: z.string().min(10, "Beskriv gjerne situasjonen din (minst 10 tegn)"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.contactSubmission.create({ data: input })
      return { success: true }
    }),
})
