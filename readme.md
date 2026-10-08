# Lakhtar Singh · Portfolio

Interactive portfolio built with React 19, Vite, Framer Motion and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Two designs

| Route | Design |
| --- | --- |
| `/` | Dark "workbench" design: amber accent, canvas dot field, `git log` career, bento project grid with modal demos |
| `/home-v2` | Light "spec sheet" design: cobalt accent, x-ray hero, sticky Lead → Build story, isometric 3D stack, horizontal project gallery with slide-in demo drawers, chat-style contact |

Both pages read the same content from `src/data.js` and share the live demos in `src/demos/`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) make `/home-v2` work after deploy.

## What's inside (design v1)

- Animated loader, custom cursor, magnetic buttons, scroll progress bar
- Hero with an interactive dot field (canvas) and a typing code window
- Scroll-linked text reveal and velocity-reactive marquees
- Filterable skills grid with a pointer spotlight
- Experience rendered as a `git log` with expandable diffs
- Team lead / full-stack developer switcher
- Eleven project cards, each opening a working demo:
  - TenantDesk (Laravel + MySQL: token auth, roles, tenant isolation)
  - StockRoom (MERN: React → Express → Mongoose → MongoDB request tracer)
  - PressBook (custom WordPress plugin: REST route, nonce, custom table)
  - ReleaseTrain (GitHub Actions → AWS EC2 pipeline, with a failing-test mode)
  - ShipDeck (multi-carrier rates, labels, tracking)
  - InboxPilot (AI-drafted support replies)
  - SortLine (Arduino sorting station simulation)
  - Pulseboard (real-time dashboard)
  - Atlas UI (token-driven component library)
  - Contrast Lab (WCAG contrast checker with auto-fix)
  - Headless Publisher (WordPress → React publish flow)
- Command menu: press ⌘K / Ctrl+K anywhere
- Respects `prefers-reduced-motion`

## Editing content

All text lives in `src/data.js`: profile, skills, team lead / developer roles, experience, education and projects.

## Deploying

The `dist/` folder is a static site. Drag it into Netlify, or import the repo into Vercel (framework preset: Vite).
