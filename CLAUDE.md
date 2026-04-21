# AIvett — Norwegian AI Learning Platform

## Stack
- Next.js 16 App Router (TypeScript)
- tRPC v11 + TanStack Query
- Prisma v7 + PostgreSQL (driver adapter: `@prisma/adapter-pg`)
- Better Auth v1
- Tailwind CSS v4
- Stripe (payments)
- Playwright (E2E tests)

## Key conventions

### Prisma v7
- **No `url` in schema.prisma** — URL is in `prisma.config.ts` via `datasource.url`
- **Driver adapter required** — `PrismaPg` from `@prisma/adapter-pg` in `src/server/db.ts`
- Push schema: `npm run db:push`
- Generate client: `npm run db:generate`
- Seed data: `npm run db:seed`

### Next.js proxy (was middleware)
- Auth protection lives in `src/proxy.ts` (not middleware.ts — deprecated in Next 16)
- Export function must be named `proxy`, not `middleware`

### All DB pages need `export const dynamic = "force-dynamic"`
- Every page that queries the DB must have this at the top
- Otherwise Next.js tries to statically render at build time (no DB available)

### tRPC
- Server-side caller: `api()` from `src/trpc/server.ts`
- Client: `trpc` from `src/trpc/react.tsx`
- All client-server communication through tRPC (no Server Actions)

### Stripe
- Lazy singleton via Proxy in `src/lib/stripe.ts` (avoids build-time eval)
- Webhooks: `/api/webhooks/stripe` — verifies signature, grants/revokes access

### Norwegian UI
- All UI text in Norwegian (bokmål)
- `<html lang="nb">` in root layout
- Dates formatted with `nb-NO` locale

## Routes
| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/kurs` | Course catalog |
| `/kurs/[slug]` | Course detail |
| `/kurs/[slug]/leksjoner/[lessonSlug]` | Lesson (Compass sidebar layout) |
| `/nyheter`, `/guider`, `/veiledninger`, `/sammenligninger` | Article listings |
| `/[category]/[slug]` | Article detail |
| `/priser` | Pricing |
| `/logg-inn`, `/registrer` | Auth |
| `/profil`, `/profil/kurs` | Protected user pages |

## Env vars needed (see .env.example)
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — 32+ char random string
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_MONTHLY_PRICE_ID`, `STRIPE_YEARLY_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Revenue model
- Free tier: news, guides, free courses (ads via AdSense)
- Per-course: 499–999 NOK, 1 year access
- Monthly subscription: 249 NOK/month (all courses, no ads)
- Annual subscription: 1,999 NOK/year

## Testing
```bash
npm run playwright:install  # First time only
npm run test:e2e            # Run all E2E tests
npm run test:e2e:ui         # Interactive Playwright UI
```

## Deploy Configuration (configured by /setup-deploy)
- Platform: Railway
- Production URL: https://aivett-web.up.railway.app
- Deploy workflow: `railway up --service aivett-web` or GitHub autodeploy (configure in Railway dashboard)
- Deploy status command: `railway status`
- Merge method: squash
- Project type: web app
- Post-deploy health check: https://aivett-web.up.railway.app

### Custom deploy hooks
- Pre-merge: `npm run build` (SKIP_ENV_VALIDATION=1)
- Deploy trigger: `railway up --service aivett-web --detach`
- Deploy status: `railway logs --service aivett-web`
- Health check: https://aivett-web.up.railway.app

### Railway project details
- Project ID: 382c4d12-f3d5-4430-9f1b-443685006df8
- Web service: aivett-web
- Database: Postgres (internal URL via ${{Postgres.DATABASE_URL}})
- Dashboard: https://railway.com/project/382c4d12-f3d5-4430-9f1b-443685006df8

### Stripe env vars still needed (add via Railway dashboard)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MONTHLY_PRICE_ID`
- `STRIPE_ANNUAL_PRICE_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
