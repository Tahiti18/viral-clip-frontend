# UnityLab Frontend (Next.js 14) — Deploy to Netlify

## Netlify
1. Create **New site from Git** and pick this repo.
2. Settings for monorepo are not needed (this repo contains frontend only).
3. Build command: `npm run build`
   Publish directory: `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_API_BASE=https://<your-backend-on-railway>`
   - (Optional) `NODE_VERSION=20`
5. Deploy and visit `/app` and `/exports`.

## Notes
- If SSE streaming on `/app` is flaky, remove `export const runtime = "edge";` from `app/api/jobs/[id]/stream/route.ts` and redeploy.
