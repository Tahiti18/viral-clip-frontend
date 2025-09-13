# Patch: Use NEXT_PUBLIC_API_BASE everywhere

This patch updates **lib/api.ts** so all frontend requests go to the value you set
in Netlify as `NEXT_PUBLIC_API_BASE` (e.g. your Railway backend). It handles:

- Trailing slashes
- Timeouts (20s)
- JSON + text responses
- Helpful error messages
- A `healthCheck()` helper

## Install via GitHub (works on iPad)

1. Open your GitHub repo (`viral-clip-frontend`).
2. Click **Add file → Upload files**.
3. Drag the `lib/api.ts` file from this patch into the repo, **replacing** the existing file.
4. Commit to `main`.
5. Netlify → **Deploys → Trigger deploy → Clear cache and deploy site**.

## Usage

```ts
import { getJSON, postJSON } from "../lib/api";

// GET
const jobs = await getJSON("/api/jobs");

// POST
await postJSON("/api/queue", { templateId: "t_123" });
```

If a page still uses hardcoded URLs (like `http://localhost:8000`), replace them
with `getJSON("/api/...")` or `postJSON(...)` imports from this file.
