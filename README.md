# Sambisari Field Guide

Independent Indonesian and English visitor guide. React/Vite renders interactive controls; the production build prerenders eight guide/legal URLs with corresponding topic language links, unique metadata, canonical URLs and full initial content. URL paths determine language; local storage does not replace the page language.

Install the committed lockfile with the pinned package manager. Run `pnpm check`, `pnpm build` and `pnpm exec wrangler deploy --dry-run`. Build output is `dist/public`; `scripts/prerender.tsx` also writes the sitemap, robots file and noindex404. The ASSETS Worker runs first, preserving path/query when HTTP/www redirects to HTTPS apex and retaining real 404 responses. The optional Node server also preserves unknown-path404.

Visible FAQs and JSON-LD share one array. Native FAQ disclosure and language links work without JavaScript. Cookie preferences are applied after hydration and analytics stays opt-in. Public source dates and uncertainties are recorded in `research_notes.md`; images and licences in `images/README_IMAGES.md`.

Keep private reports, credentials and runtime state out of the public tree. A local build/dry-run does not establish deployment or actual narrow-viewport acceptance.
