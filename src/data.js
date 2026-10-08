export const profile = {
  name: 'Lakhtar Singh',
  role: 'Full-Stack Developer',
  status: 'Open to full-stack roles',
  intro: 'I build products end to end, from the React screen down to the database index, and I spent four years leading the team that ships them.',
  stackLine: 'React and Vue on the front; Node, Express, Laravel, PHP and WordPress behind it; MySQL and MongoDB underneath.',
  location: 'Toronto, Canada',
  timezone: 'America/Toronto',
  email: 'Singhlakhtar3@gmail.com',
  phone: '+1 519 566 0321',
  linkedin: 'https://www.linkedin.com/in/lakhtar-singh/',
}

export const rotatingWords = ['fast', 'accessible', 'effortless', 'alive', 'scalable']

export const stats = [
  { value: 12, suffix: '+', label: 'years shipping full-stack code' },
  { value: 4, suffix: '', label: 'years as a team lead' },
  { value: 11, suffix: '', label: 'live demos on this page' },
]

export const heroFacts = [
  ['Now', 'Senior Full-Stack Developer, Tags for Hope'],
  ['Led', 'Development team, Kays Harbor, 2021–2025'],
  ['Based', 'Toronto, Canada'],
]

export const marqueeTop = ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Laravel', 'PHP', 'WordPress', 'MySQL', 'MongoDB', 'AWS']
export const marqueeBottom = ['Full-stack delivery', 'Team leadership', 'Git & code review', 'REST APIs', 'Headless CMS', 'CI/CD', 'Accessible by default', 'Component libraries']

export const skillCategories = [
  { id: 'Frontend', blurb: 'What users see and touch.' },
  { id: 'Backend', blurb: 'APIs, auth and business logic.' },
  { id: 'Data', blurb: 'Schemas, queries and indexes that stay fast.' },
  { id: 'Git & workflow', blurb: 'How code moves from a branch to production.' },
  { id: 'Cloud & DevOps', blurb: 'Servers, pipelines and deploys.' },
  { id: 'Leadership', blurb: 'Running the team that ships it.' },
  { id: 'Practices', blurb: 'Quality habits under everything.' },
]

export const skills = [
  { name: 'React', abbr: 'Re', cat: 'Frontend', note: 'Portals, dashboards and a shared component library at Tags for Hope and Kays Harbor.' },
  { name: 'Vue.js', abbr: 'Vu', cat: 'Frontend', note: 'Rebuilt the Always Infotech marketing site and co-maintained a Vue + React pattern library.' },
  { name: 'Next.js', abbr: 'Nx', cat: 'Frontend', note: 'Server-rendered React pages for content-heavy sites.' },
  { name: 'TypeScript', abbr: 'Ts', cat: 'Frontend', note: 'Typed props and API contracts so shared code stays safe to change.' },
  { name: 'JavaScript ES6+', abbr: 'Js', cat: 'Frontend', note: 'The daily driver since 2013, from jQuery days to modern modules.' },
  { name: 'Redux Toolkit', abbr: 'Rx', cat: 'Frontend', note: 'Shared state for larger React apps.' },
  { name: 'HTML5', abbr: 'Ht', cat: 'Frontend', note: 'Semantic markup first, so screen readers and search engines get structure for free.' },
  { name: 'CSS3 & SASS', abbr: 'Cs', cat: 'Frontend', note: 'Grid, custom properties and motion that respects reduced-motion settings.' },
  { name: 'Tailwind CSS', abbr: 'Tw', cat: 'Frontend', note: 'Styled the shared React/Vue library so every team ships the same UI.' },
  { name: 'Bootstrap', abbr: 'Bs', cat: 'Frontend', note: 'Fast, responsive layouts for client sites and admin panels.' },
  { name: 'jQuery', abbr: 'Jq', cat: 'Frontend', note: 'Years of legacy front-ends, and the migrations off them.' },
  { name: 'Vite', abbr: 'Vi', cat: 'Frontend', note: 'Fast dev servers and split production builds, including this site.' },

  { name: 'Node.js', abbr: 'No', cat: 'Backend', note: 'Services and APIs consumed by React front-ends at Kays Harbor.' },
  { name: 'Express.js', abbr: 'Ex', cat: 'Backend', note: 'REST endpoints, middleware and validation with clean contracts.' },
  { name: 'PHP', abbr: 'Ph', cat: 'Backend', note: 'Where it all started in 2013 at Logic Digger, and still a daily tool.' },
  { name: 'Laravel', abbr: 'La', cat: 'Backend', note: 'APIs, queues, token auth and role-based access for multi-client platforms.' },
  { name: 'Eloquent ORM', abbr: 'El', cat: 'Backend', note: 'Models, relationships and scoped queries per client.' },
  { name: 'WordPress', abbr: 'Wp', cat: 'Backend', note: 'Custom themes, plugins and headless setups so marketers publish without deploys.' },
  { name: 'WP plugins & blocks', abbr: 'Pl', cat: 'Backend', note: 'Plugins with their own REST routes, database tables and Gutenberg blocks.' },
  { name: 'WooCommerce', abbr: 'Wc', cat: 'Backend', note: 'Store builds, shipping integrations and checkout changes.' },
  { name: 'WPGraphQL', abbr: 'Gq', cat: 'Backend', note: 'Editable page templates and content blocks feeding React and Vue front-ends.' },
  { name: 'REST APIs', abbr: 'Ap', cat: 'Backend', note: 'Designed, built, documented and integrated in every role.' },
  { name: 'Auth: Sanctum & JWT', abbr: 'Au', cat: 'Backend', note: 'Token-based auth for SPAs, mobile clients and APIs.' },
  { name: 'Carrier & third-party APIs', abbr: '3p', cat: 'Backend', note: 'UPS, FedEx, Stallion Express and AI services wired into real workflows.' },

  { name: 'MySQL', abbr: 'My', cat: 'Data', note: 'Schema design, indexing and query tuning that kept pages fast as data grew.' },
  { name: 'MongoDB', abbr: 'Mg', cat: 'Data', note: 'Document storage for MERN stack projects.' },
  { name: 'Mongoose', abbr: 'Mo', cat: 'Data', note: 'Schemas, validation and atomic updates from Node.' },
  { name: 'Query optimisation', abbr: 'Qo', cat: 'Data', note: 'EXPLAIN plans, composite indexes and fewer round-trips.' },
  { name: 'Migrations & seeding', abbr: 'Mi', cat: 'Data', note: 'Versioned schema changes that run the same in every environment.' },

  { name: 'Git', abbr: 'Gt', cat: 'Git & workflow', note: 'Daily version control: branching, rebasing, cherry-picks and clean history.' },
  { name: 'GitHub', abbr: 'Gh', cat: 'Git & workflow', note: 'Pull requests, protected branches, issues and project boards.' },
  { name: 'Branching strategy', abbr: 'Br', cat: 'Git & workflow', note: 'Git Flow and trunk-based flows chosen to fit the team and release rhythm.' },
  { name: 'Pull request reviews', abbr: 'Pr', cat: 'Git & workflow', note: 'Reviewed the team’s PRs as lead, with checklists for security and accessibility.' },
  { name: 'Merge conflict resolution', abbr: 'Mc', cat: 'Git & workflow', note: 'Untangling long-lived branches without losing anyone’s work.' },
  { name: 'Semantic versioning', abbr: 'Sv', cat: 'Git & workflow', note: 'Tagged releases and changelogs so everyone knows what shipped.' },
  { name: 'Jira & Trello', abbr: 'Ji', cat: 'Git & workflow', note: 'Sprint boards, estimates and defect tracking.' },
  { name: 'Postman', abbr: 'Pm', cat: 'Git & workflow', note: 'Shared API collections for testing and onboarding.' },
  { name: 'npm & Composer', abbr: 'Np', cat: 'Git & workflow', note: 'Dependency management for JavaScript and PHP projects.' },
  { name: 'VS Code', abbr: 'Vs', cat: 'Git & workflow', note: 'Editor of choice, with shared lint and format settings for the team.' },

  { name: 'GitHub Actions', abbr: 'Ga', cat: 'Cloud & DevOps', note: 'Pipelines that test and deploy every merge, no manual server steps.' },
  { name: 'AWS EC2', abbr: 'Aw', cat: 'Cloud & DevOps', note: 'Production hosting for Laravel and front-end builds.' },
  { name: 'CI/CD', abbr: 'Ci', cat: 'Cloud & DevOps', note: 'Tests gate every deploy; releases are boring on purpose.' },
  { name: 'Linux servers', abbr: 'Lx', cat: 'Cloud & DevOps', note: 'Ubuntu, SSH, cron jobs and reading logs when something breaks.' },
  { name: 'Nginx', abbr: 'Ng', cat: 'Cloud & DevOps', note: 'Reverse proxy and static hosting in front of PHP and Node apps.' },
  { name: 'Docker', abbr: 'Dk', cat: 'Cloud & DevOps', note: 'Local environments that match production.' },
  { name: 'Heroku', abbr: 'He', cat: 'Cloud & DevOps', note: 'Quick staging environments for prototypes and client previews.' },
  { name: 'CDN & caching', abbr: 'Cd', cat: 'Cloud & DevOps', note: 'Edge caching and asset optimisation for high-traffic pages.' },

  { name: 'Team leadership', abbr: 'Tl', cat: 'Leadership', note: 'Led the development team at Kays Harbor for four years.' },
  { name: 'Sprint planning', abbr: 'Sp', cat: 'Leadership', note: 'Scoped and estimated work with product owners and UX designers.' },
  { name: 'Code standards', abbr: 'Cr', cat: 'Leadership', note: 'Set the review rules, conventions and shared components the team builds on.' },
  { name: 'Release management', abbr: 'Rm', cat: 'Leadership', note: 'Planned rollouts, checked service readiness and shipped with documented steps.' },
  { name: 'Risk & stakeholders', abbr: 'Rk', cat: 'Leadership', note: 'Raised risks and dependencies early with architects and stakeholders.' },
  { name: 'Docs & handover', abbr: 'Dc', cat: 'Leadership', note: 'Component docs and handover notes so support teams can own what we ship.' },
  { name: 'Agile / Scrum', abbr: 'Ag', cat: 'Leadership', note: 'Sprints, stand-ups and retros that keep delivery dates realistic.' },

  { name: 'WCAG accessibility', abbr: 'A11', cat: 'Practices', note: 'Keyboard, screen reader and contrast checks built into every release.' },
  { name: 'Web performance', abbr: 'Pf', cat: 'Practices', note: 'Code splitting, caching and CDN strategy for slow connections.' },
  { name: 'Unit testing', abbr: 'Ut', cat: 'Practices', note: 'Tests on components and APIs to stop regressions coming back.' },
  { name: 'Application security', abbr: 'Sc', cat: 'Practices', note: 'Token auth, role-based access and tenant isolation by default.' },
  { name: 'Responsive design', abbr: 'Rd', cat: 'Practices', note: 'Layouts that work from a 320px phone to a wide monitor.' },
]

export const experience = [
  {
    hash: 'a3f9c21',
    branch: 'HEAD → tags-for-hope',
    company: 'Tags for Hope',
    role: 'Senior Full-Stack Developer',
    place: 'St. Thomas, ON',
    dates: 'Aug 2025 – Present',
    current: true,
    summary: 'Building an accessible React portal and the component library every product team builds on.',
    points: [
      'Building a WCAG-minded React portal that works with screen readers, keyboard-only use and every major browser.',
      'Growing a React + Vue component library on Tailwind so teams pull from one set of building blocks.',
      'Connecting screens to REST APIs and a headless WordPress backend, so marketing publishes pages and promos alone.',
      'Keeping pages fast with code splitting, caching and a CDN strategy tuned for slow connections.',
      'Raising technical risks early and agreeing mitigation plans with architects, so delivery dates hold.',
    ],
    tags: ['React', 'Vue', 'Tailwind', 'WCAG', 'Headless WP'],
  },
  {
    hash: '7e21b0d',
    branch: 'kays-harbor',
    company: 'Kays Harbor Technologies',
    role: 'Team Lead · Full-Stack Developer',
    place: 'Vancouver, BC',
    dates: 'May 2021 – May 2025',
    lead: true,
    summary: 'Led the development team for four years while building the enterprise page systems and APIs alongside them.',
    points: [
      'Led the development team: sprint planning, estimates, pull request reviews and unblocking people day to day.',
      'Owned production releases: planned deployments, checked service readiness and rolled out with documented, repeatable steps.',
      'Set up GitHub Actions pipelines that test and deploy to AWS EC2 on every merge, so nobody deploys by hand.',
      'Designed editable page templates on WPGraphQL and Laravel, so editors build pages while the UI stays on-brand.',
      'Built REST APIs in Laravel and Node/Express for the React front-end.',
      'Modelled and indexed MySQL schemas so content and account services stayed fast as data grew.',
      'Implemented token auth and role-based access so every client’s data stays isolated.',
    ],
    tags: ['Team lead', 'React', 'Laravel', 'Node', 'MySQL', 'AWS', 'GitHub Actions'],
  },
  {
    hash: 'c0d4e88',
    branch: 'always-infotech',
    company: 'Always Infotech',
    role: 'Full-Stack Developer',
    place: 'India',
    dates: 'Oct 2018 – Dec 2020',
    summary: 'Rebuilt the marketing site in Vue on top of a headless WordPress content layer.',
    points: [
      'Rebuilt the marketing front-end in Vue, Tailwind and semantic HTML5.',
      'Wired Vue to headless WordPress through WPGraphQL, so content went live without a redeploy.',
      'Added caching, a CDN and image optimisation to speed up high-traffic landing pages.',
      'Fixed defects from Jira and wrote unit tests so they stayed fixed.',
      'Wrote component docs and handover notes for the support team.',
    ],
    tags: ['Vue', 'Tailwind', 'WPGraphQL', 'CDN'],
  },
  {
    hash: '52ab9f1',
    branch: 'qode-maker',
    company: 'Qode Maker Full Internet Services Bureau',
    role: 'Senior Web Developer',
    place: 'India',
    dates: 'Jul 2017 – Oct 2018',
    summary: 'Built and maintained client websites and web applications end to end.',
    points: [],
    tags: ['PHP', 'WordPress', 'JavaScript'],
  },
  {
    hash: '1f0e3a7',
    branch: 'logic-digger',
    company: 'Logic Digger Infotech',
    role: 'PHP Backend Developer',
    place: 'India',
    dates: 'Jul 2013 – Jun 2017',
    summary: 'Initial commit. PHP back-ends, MySQL and the fundamentals of shipping for the web.',
    points: [],
    tags: ['PHP', 'MySQL'],
    initial: true,
  },
]

export const education = [
  { school: 'Conestoga College', place: 'Kitchener, ON', program: 'Information Technology Business Analysis', dates: '2023 – 2024' },
  { school: 'Punjab University', place: 'Ludhiana, India', program: 'Bachelor of Computer Applications', dates: '2010 – 2013' },
]

export const kindLabel = {
  'Full-stack': 'Full-stack · front to database',
  Shipped: 'Shipped · from résumé',
  Lab: 'Lab · front-end build',
}
export const kindClass = (kind) => `kind-${kind.toLowerCase().replace(/[^a-z]/g, '')}`

export const aboutMe = {
  statement: 'I lead the team, and I still write the code it ships.',
  bio: 'I’m Lakhtar, a senior full-stack developer at Tags for Hope in Toronto. I shipped my first production PHP in 2013 and have built for agencies, product teams and enterprise clients ever since, including four years leading the development team at Kays Harbor. I studied computer applications at Punjab University and IT business analysis at Conestoga College, so I’m as comfortable in a requirements meeting as in a pull request.',
  facts: [
    ['Now', 'Senior Full-Stack Developer, Tags for Hope'],
    ['Based', 'Toronto, Canada'],
    ['Shipping since', '2013'],
    ['Studied', 'BCA · IT Business Analysis'],
    ['Open to', 'Full-stack and team lead roles'],
  ],
  sides: [
    {
      id: 'lead',
      title: 'Team lead',
      ghost: 'LEAD',
      value: 4,
      suffix: '',
      unit: 'years leading a development team',
      line: 'At Kays Harbor I ran the planning, reviews and releases, and kept the team shipping on time.',
      points: ['Sprint planning with product owners and UX', 'Pull request reviews and shared code standards', 'Releases that are planned, documented and repeatable', 'CI/CD so every merge deploys safely'],
    },
    {
      id: 'dev',
      title: 'Full-stack developer',
      ghost: 'BUILD',
      value: 12,
      suffix: '+',
      unit: 'years shipping production code',
      line: 'I build every layer myself, from the React screen down to the database index.',
      points: ['React and Vue interfaces that work for everyone', 'APIs in Node, Express and Laravel', 'WordPress themes, plugins and headless builds', 'MySQL and MongoDB tuned to stay fast'],
    },
  ],
}

export const projects = [
  {
    id: 'tenantdesk',
    title: 'TenantDesk',
    kind: 'Full-stack',
    tagline: 'A multi-client content portal with token auth, roles and isolated data per client.',
    about: 'Many clients share one platform, so every request has to prove who it is, which client it belongs to and what it may do. TenantDesk runs those checks in Laravel middleware before any query reaches MySQL.',
    built: ['Laravel REST API with Sanctum token auth', 'Role-based permissions per client', 'Tenant-scoped MySQL queries, so data never crosses clients', 'React admin UI on top of the API'],
    stack: ['React', 'Laravel', 'PHP', 'MySQL', 'Sanctum'],
    demo: 'tenant',
  },
  {
    id: 'stockroom',
    title: 'StockRoom',
    kind: 'Full-stack',
    tagline: 'A MERN inventory app. Watch each request travel from React to MongoDB and back.',
    about: 'Every stock change goes through a validated Express API and an atomic MongoDB update, so two people adjusting the same item never overwrite each other.',
    built: ['React UI with instant feedback', 'Express REST API with request validation', 'Mongoose models and atomic $inc updates', 'Low-stock alerts'],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    demo: 'stock',
  },
  {
    id: 'pressbook',
    title: 'PressBook',
    kind: 'Full-stack',
    tagline: 'A custom WordPress booking plugin with its own REST API and database table.',
    about: 'Appointment booking that lives inside WordPress instead of a paid SaaS: a Gutenberg block for visitors, a nonce-protected REST route and a custom table that refuses double bookings.',
    built: ['Gutenberg booking block in React', 'REST route under /wp-json with nonce checks', 'Custom wp_pb_bookings table through $wpdb', 'Double-booking protection'],
    stack: ['WordPress', 'PHP', 'MySQL', 'React', 'REST API'],
    demo: 'press',
  },
  {
    id: 'releasetrain',
    title: 'ReleaseTrain',
    kind: 'Full-stack',
    tagline: 'The CI/CD pattern I set up as team lead: every merge tested, then deployed to AWS.',
    about: 'Every merge to main runs lint and tests, builds the React and Laravel apps and deploys to EC2 only if everything passes. A failing test blocks the deploy and production stays untouched.',
    built: ['GitHub Actions workflow per repo', 'Tests gate every deploy', 'Deploy to AWS EC2 with a health check', 'Release history the whole team can see'],
    stack: ['Git', 'GitHub Actions', 'AWS EC2', 'Laravel', 'React'],
    demo: 'pipeline',
  },
  {
    id: 'shipdeck',
    title: 'ShipDeck',
    kind: 'Shipped',
    tagline: 'One screen for UPS, FedEx and Stallion Express rates, labels and tracking.',
    about: 'Warehouse staff were copying addresses between three carrier portals. ShipDeck compares rates, prints the label and tracks the parcel from one screen.',
    built: ['Rate comparison across UPS, FedEx and Stallion Express', 'One-click label creation', 'Tracking timeline driven by carrier updates'],
    stack: ['React', 'Node.js', 'Carrier APIs', 'MySQL'],
    demo: 'ship',
  },
  {
    id: 'inboxpilot',
    title: 'InboxPilot',
    kind: 'Shipped',
    tagline: 'A support inbox that sorts customer emails and drafts replies with AI.',
    about: 'Most support emails asked the same five questions. InboxPilot tags each email by intent, drafts a reply for the routine ones and sends the hard ones to a person.',
    built: ['Intent detection with a confidence score', 'AI-drafted replies an agent reviews before sending', 'Escalation path when confidence is low'],
    stack: ['React', 'Node.js', 'LLM API', 'IMAP'],
    demo: 'inbox',
  },
  {
    id: 'sortline',
    title: 'SortLine',
    kind: 'Shipped',
    tagline: 'An Arduino sorting station that scans parcels and routes them into bins.',
    about: 'Picking was slow because parcels landed in one pile. A colour sensor and servo diverters on an Arduino now sort each parcel into its bin, and a web view shows the counts live.',
    built: ['Colour sensor scan at the belt entrance', 'Servo diverters that push parcels into bins', 'Live serial log and bin counters'],
    stack: ['Arduino', 'C++', 'Web Serial', 'React'],
    demo: 'sort',
  },
  {
    id: 'pulseboard',
    title: 'Pulseboard',
    kind: 'Lab',
    tagline: 'A real-time operations dashboard that streams metrics without jank.',
    about: 'A study in rendering live data smoothly: streamed points, animated counters and an event feed that never blocks the main thread.',
    built: ['Streaming SVG area chart', 'Spring-animated KPI counters', 'Live event feed with enter and exit motion'],
    stack: ['React', 'SVG', 'WebSockets', 'Framer Motion'],
    demo: 'pulse',
  },
  {
    id: 'atlas',
    title: 'Atlas UI',
    kind: 'Lab',
    tagline: 'A themeable component library you can restyle with three sliders.',
    about: 'The idea behind the libraries I built at work: components read design tokens, so one change to hue, radius or density restyles everything.',
    built: ['Token-driven buttons, inputs, switches and cards', 'Live token export', 'Light and dark previews'],
    stack: ['React', 'CSS variables', 'Design tokens'],
    demo: 'atlas',
  },
  {
    id: 'contrast',
    title: 'Contrast Lab',
    kind: 'Lab',
    tagline: 'A WCAG contrast checker that fixes failing colours for you.',
    about: 'Accessibility checks should be quick enough to run every time. Pick two colours, see the WCAG ratio, and let it nudge the text colour until it passes.',
    built: ['WCAG 2.2 contrast maths', 'AA and AAA checks for normal and large text', 'One-click fix that keeps the hue'],
    stack: ['React', 'WCAG 2.2', 'Colour science'],
    demo: 'contrast',
  },
  {
    id: 'headless',
    title: 'Headless Publisher',
    kind: 'Lab',
    tagline: 'Edit in WordPress, go live in React. No redeploy.',
    about: 'The pattern I have shipped at three companies: editors work in WordPress, WPGraphQL serves the content, and the React site revalidates the moment they press Publish.',
    built: ['Draft and live states side by side', 'Publish pipeline from CMS to edge cache', 'Instant preview of editor changes'],
    stack: ['React', 'WordPress', 'WPGraphQL', 'CDN'],
    demo: 'headless',
  },
]

/** Headings shared by both designs, so they always say the same thing. */
export const sectionCopy = {
  skills: {
    label: 'Stack',
    title: 'The full stack, layer by layer.',
    accent: [1, 2],
    intro: `${skills.length} skills across seven areas, from leading the team down to the habits under everything. Pick an area, then a skill to see where I used it.`,
  },
  projects: {
    label: 'Work',
    title: 'Eleven projects you can actually run.',
    accent: [4, 5],
    intro: 'Four full-stack builds that go from React down to the database, three shipped projects from my résumé and four front-end labs. Each one opens a working demo.',
  },
  experience: {
    label: 'Career',
    title: 'Twelve years, five companies, one team led.',
    accent: [5, 6],
    intro: 'Newest first. Open a role to see what I owned there.',
  },
  about: { label: 'About me', accent: [1, 9] },
  contact: {
    label: 'Contact',
    title: 'Let’s build something people enjoy using.',
    accent: [3, 4, 5],
    intro: 'Hiring for a full-stack or team lead role, or planning a project? Send a note. I usually reply within a day.',
  },
}

/** Section ids, in page order. Both designs use the same ids. */
export const sectionOrder = ['skills', 'projects', 'experience', 'about', 'contact']
