Viral Clip Frontend — Netlify Build Fixes

This bundle contains two files that fix both errors:
1) Module not found: '@/lib/edl/captions'
2) Type error when returning the ZIP from the handoff API route

Files in this zip (drop them into the SAME paths in your repo):
- lib/edl/captions.ts
- app/api/handoff/route.ts

Notes:
- The route now imports with a RELATIVE path, so no tsconfig alias is required.
- NextResponse now receives an ArrayBuffer (`type: 'arraybuffer'`), which satisfies TypeScript.

After you commit these two files to GitHub, on Netlify click:
Deploys → More actions (⋯) → Clear cache and deploy site.
