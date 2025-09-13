DROP-IN PATCH (Next.js 14 / Netlify)
===================================

What this contains:
- lib/edl/captions.ts (real implementation exporting toSrt, toVtt, sampleCaptions)
- app/api/export/vtt/route.ts  (uses relative import to captions)
- app/api/export/srt/route.ts  (uses relative import to captions)
- app/api/handoff/route.ts     (creates a zip; requires 'jszip' dependency)

How to apply (GitHub web UI friendly):
1) Download this zip and extract it at the ROOT of your repo so that folders merge.
2) Commit the four files above to main.
3) Ensure package.json has:  "jszip": "^3.10.1"  (or similar) in dependencies.
4) In Netlify → Deploys → Options → Clear cache and deploy site.

Why this fixes the errors:
- Eliminates "@/lib/..." alias issues by using stable relative imports.
- Adds missing 'captions' module with toVtt & toSrt exports.
- Handled Response types correctly (string for text assets; Buffer for zip).
