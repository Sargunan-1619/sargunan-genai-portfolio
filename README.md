# Sargunan C — Applied GenAI Engineer Portfolio

A 3D personal portfolio built with React, TypeScript, React Three Fiber, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Output goes to `dist/`, ready to deploy on Vercel, Netlify, or Railway with zero config.

## Structure

```
src/
  components/       shared UI (Navigation, Footer, ProjectCard, MagneticButton, Reveal)
  components/3d/    the pipeline node-graph scene, canvas wrapper, 2D fallback
  sections/         one file per page section
  data/profile.ts   single source of truth for all resume content — edit here to update copy
  hooks/            scroll-linked active section + device capability detection
  assets/           your photo, project screenshots
public/
  Sargunan-C-Resume.pdf   swap this file to update the downloadable resume
```

## Notes

- All content in `src/data/profile.ts` is taken directly from the uploaded resume. Edit that file to update any text across the site — nothing is duplicated elsewhere.
- The 3D scene automatically falls back to a 2D version if WebGL is unavailable, and respects `prefers-reduced-motion`.
- Particle count and DPR scale down automatically on mobile viewports for performance.
- The contact form opens a pre-filled email via `mailto:` — there's no backend. Wire up a form service (e.g. Formspree) in `src/sections/Contact.tsx` if you want submissions to land somewhere other than your inbox directly.
