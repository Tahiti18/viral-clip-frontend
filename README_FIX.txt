HOW TO APPLY THESE FIXES (copy-paste friendly)

1) Copy files into your repo keeping folders:
   - lib/edl/captions.ts
   - app/api/handoff/route.ts

2) Open your tsconfig.json and merge in:
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": { "@/*": ["./*"] }
     }
   }

3) Commit and push, then in Netlify click: Deploys → Clear cache and deploy.
