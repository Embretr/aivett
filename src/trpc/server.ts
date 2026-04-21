import "server-only"
import { cache } from "react"
import { createCaller } from "../server/api/root"
import { createTRPCContext } from "../server/api/trpc"
import { headers } from "next/headers"

const createContext = cache(async () => {
  const heads = new Headers(await headers())
  heads.set("x-trpc-source", "rsc")

  return createTRPCContext({
    req: new Request("http://internal", { headers: heads }),
  } as Parameters<typeof createTRPCContext>[0])
})

export const api = cache(async () => {
  const ctx = await createContext()
  return createCaller(ctx)
})
