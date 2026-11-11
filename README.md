| Above-the-fold entrances (CSS, no hydration wait) | `app/globals.css` (`.rise`, `.line-up`) |
| Route fade transition, custom scrollbar, stacked sections, takeover menu | `components/RouteTransition.tsx`, `components/Scrollbar.tsx`, `components/StackSections.tsx`, `components/Nav.tsx`, CSS at the end of `app/globals.css` |# pronelweb · Portfolio

The studio site for pronelweb (Vincent Pronel): client work, research, and hackathon and leadership work, on a dark cinematic system.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP (ScrollTrigger) · Lenis · Geist

## Run it

```bash
npm install
npm run dev
```

Deploys to Vercel with zero extra config (`npm run build` locally to verify).

## Where things live

| Thing | File |
|---|---|
| All project content, images, walkthrough clips | `data/projects.ts` |
| Research narratives | `data/research.ts` |
| Service tracks on the home page | `data/tracks.ts` |
| Skills | `data/skills.ts` |
| Brand, email, socials, domain, client marquee, resume path | `data/site.ts` |
| Design tokens (colors, fonts, motion) | `app/globals.css` (`@theme` block) |
| Page curtain and above-the-fold entrances (CSS, no hydration wait) | `app/globals.css` (`.curtain`, `.rise`, `.line-up`) + `app/template.tsx` |

## Design rules baked in

- One accent, `#00E5FF`, used flat and only on interactive states (hover borders, focus rings, active tabs, live dots). No glow or box-shadow effects anywhere.
- No pills. Buttons use a 4px radius; tech stacks and labels are mono text.
- Categories are carried by their label, not a color.
- The mobile menu is a full-screen takeover under a fixed header: three-bar icon morphs into an X, links stagger up, body and html scroll lock, Escape and route changes close it, hidden links leave the tab order, short viewports compact the type.
- Every top-level section of a page is a stacked card: it pins when its bottom reaches the screen bottom and the next section slides over it with rounded corners. Keep sections as direct children of `<main>`, give nothing an `overflow: hidden` ancestor, and add `data-stack-skip` to opt one element out or `data-stack="off"` on `<main>` to opt a page out.
- Internal navigation fades `<main>` out over 180ms with a 2px accent line, then the new page fades in. Header and footer stay put. Reduced motion skips it.
- The native scrollbar is replaced by a slim auto-hiding thumb once JS mounts; drag and keyboard work on it.
- Framer components never read `prefers-reduced-motion` during render (hydration mismatch); use `useReducedMotionSafe` from `lib/`, and `MotionConfig reducedMotion="user"` handles the rest.

## Video

Three kinds of clip, three components in `components/video/`:

| Component | Used for | Loading |
|---|---|---|
| `HeroVideo` | home hero | eager; browser picks the mobile or desktop source at parse time; poster is preloaded in `app/layout.tsx` and is the LCP |
| `AmbientVideo` | footer, tracks, project walkthroughs, 404 | source attached when within 600px of the viewport with `preload="auto"`, plays in view, pauses out of view; `eager` for case-study heroes; `mode="manual"` for hover cards |
| `ScrubVideo` | the pinned process section | all-intra encode, `currentTime` driven by ScrollTrigger, loads one viewport ahead |

Under `prefers-reduced-motion` no clip loads; posters render instead.

### Sources and processing

Source clips live in `Video Backgrounds/` (not served, see `.vercelignore`):

- six Gemini loops in the root, graded into the dark palette (topo inverted, ink inverted and hue-shifted to cyan, silks hue-shifted)
- project walkthrough recordings in `Video Backgrounds/projects/`

`scripts/process-videos.ps1` builds everything in `public/video/` from the Gemini loops (crop out the baked-in watermark, grade, 9s crossfade loop, H.264, WebP poster). Requires `ffmpeg` on PATH:

```bash
powershell -File scripts/process-videos.ps1
```

Project walkthroughs are encoded by hand with the letterbox cropped off, at two sizes (1280 for heroes, 800 for cards), silent, `-g 60`, faststart. Example:

```bash
ffmpeg -i "Video Backgrounds/projects/clip.mp4" -an -vf "crop=1920:864:0:108,scale=1280:576,fps=30,format=yuv420p" -c:v libx264 -crf 27 -preset slow -g 60 -movflags +faststart public/video/project-<slug>.mp4
```

Then set `video`, `videoSmall`, and `videoPoster` on the project in `data/projects.ts`.

## Placeholders to swap before launch

Search the codebase for `PLACEHOLDER`. Every one is commented with exactly what to drop in:

1. **Deaf Shark Coffee copy**: `data/projects.ts`. The entry was created from the walkthrough clip alone; the one-liner, timeframe, stack, problem, built, outcome, and links are stubs.
3. **New Orleans photos**: `app/about/page.tsx`, three tiles under Education.
4. **Production domain**: `data/site.ts` (`url`), used by SEO/OG/sitemap.
5. **GitHub repo links per project**: commented slots in `data/projects.ts`.
6. **IUSE Google Charts exports**: chart block on `/research`.
7. **Contact form email delivery**: add `RESEND_API_KEY` (see `.env.example`); the form works via mailto fallback until then.
8. **Screenshots** for projects without `image` or `video` (Tedi's, Sonder, HowToob, WiCyS, the research studies): drop files in `public/projects/` and set `image:`.

Done: resume PDF, screenshots for Day's Ice Cream, AIO Training, and Adzio, walkthrough clips for AIO Training and Deaf Shark Coffee, and the GitHub / LinkedIn / Instagram profile URLs.

## Updating the resume

Replace `public/resume.pdf` and every download link follows automatically. The saved filename is `site.resumeDownloadName` in `data/site.ts`.
