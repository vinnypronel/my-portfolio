# Vinny · Portfolio

Personal portfolio: research, freelance client work, and hackathons & leadership, in one place.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP

## Run it

```bash
npm install
npm run dev
```

Deploys to Vercel with zero extra config (`npm run build` locally to verify).

## Where things live

| Thing | File |
|---|---|
| All project content | `data/projects.ts` |
| Research narratives | `data/research.ts` |
| Skills + home stats | `data/skills.ts` |
| Name, email, socials, domain, resume path | `data/site.ts` |
| Category colors, labels, hover clips | `data/categories.ts` + tokens in `app/globals.css` |
| Design tokens (colors, fonts, shadows) | `app/globals.css` (`@theme` block) |

## Background video

Source clips from Gemini live in `Video Backgrounds/` (not served). The web-ready
loops in `public/video/` are generated from them by
`scripts/process-videos.ps1`, which:

1. crops to 1120x630 to remove the baked-in Gemini sparkle watermark
2. crossfades the tail over the head into a seamless 9s loop
3. encodes H.264 and exports a poster frame

Requires `ffmpeg` on PATH. Re-run it after dropping in new source clips:

```bash
powershell -File scripts/process-videos.ps1
```

`components/video/` (`HeroVideo`, `AmbientVideo`, `ScrubVideo`) renders them: nothing downloads until the clip
nears the viewport, playback pauses off-screen, and under
`prefers-reduced-motion` the poster frame renders instead of any video.

## Placeholders to swap before launch

Search the codebase for `PLACEHOLDER`. Every one is commented with exactly what to drop in:

1. **Project screenshots**: drop files in `public/projects/` and set `image:` on each project in `data/projects.ts`. Designed placeholder visuals render until then.
2. **Headshot**: `app/about/page.tsx`, drop the photo at `public/about/headshot.jpg`.
3. **New Orleans photos**: `app/about/page.tsx`, three tiles near Education & Training.
4. **Production domain**: `data/site.ts` (`url`), used by SEO/OG/sitemap.
5. **GitHub repo links per project**: commented slots in `data/projects.ts`.
6. **IUSE Google Charts exports**: chart block on `/research`.
7. **Contact form email delivery**: add `RESEND_API_KEY` (see `.env.example`); the form works via mailto fallback until then.

Done: resume PDF (`public/resume.pdf`), and the GitHub / LinkedIn / Instagram profile URLs in `data/site.ts`.

## Updating the resume

Replace `public/resume.pdf` and everything follows automatically: the inline
viewer on `/resume` and all three download buttons. The saved filename is
`site.resumeDownloadName` in `data/site.ts`.
