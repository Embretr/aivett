import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./server/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes: user profile
  if (pathname.startsWith("/profil")) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      const loginUrl = new URL("/logg-inn", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Lesson routes: require auth (access is checked inside the page/procedure)
  if (pathname.match(/^\/kurs\/[^/]+\/leksjoner/)) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
      const loginUrl = new URL("/logg-inn", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profil/:path*", "/kurs/:slug/leksjoner/:path*"],
}
