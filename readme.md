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
| `/` | **Main site.** Light "spec sheet" design: cobalt accent, x-ray hero, isometric 3D stack, horizontal project gallery with slide-in demo drawers, About me panels, chat-style contact |
| `/home-v2` | Original dark "workbench" design: amber accent, canvas dot field, `git log` career, bento project grid with modal demos |

Both pages read the same content from `src/data.js` and share the live demos in `src/demos/`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) make `/home-v2` work after deploy.

The route switch lives in `src/main.jsx`. Both pages have a **Dark design / Light design** button (top bar, mobile dock, footer and ⌘K). It wipes into the other design and lands on the same section; the logic is in `src/lib/designSwitch.js`.

Both designs render the same content from `src/data.js`, including the shared section headings in `sectionCopy`. Edit text there, not in components.

## What's inside (original design, `/home-v2`)

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
