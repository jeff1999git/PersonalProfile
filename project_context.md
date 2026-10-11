# Project handbook: Personal Portfolio

> **Last updated:** 2026-10-11 · branch `dev` · commit `44b9686`, plus uncommitted work: the three email links in `app/sections/hero.tsx` and `app/sections/contact.tsx` changed from `mailto:` to Gmail's web compose page, with this handbook updated to match (see the first entry in section 18).
>
> **Secrets policy:** This file holds no secret values and no personal contact data, and it must stay that way. The project currently has no secrets at all (section 6.6). If it ever gets any, they live only in the hosting dashboard and in untracked `.env*` files; this file names the config key and where it lives, never the value. Email addresses, phone numbers and profile links are cited by file and line, never copied. Do not open or paste `.env` files, keystores, private keys, service-account files, or anything under `.next/`.
>
> **How to read a claim:** "verified in code" means read at the commit above. "verified in browser" means headless Chrome on a Windows desktop on 2026-10-11, including emulated phone sizes, against both the dev server and a production build. **unverified** means not tested on a real device or in another browser, or not checkable from the repository.

## Contents

0. [How to use and maintain this file](#0-how-to-use-and-maintain-this-file)
1. [Snapshot](#1-snapshot)
2. [Golden rules](#2-golden-rules)
3. [Product overview](#3-product-overview)
4. [Tech stack and key libraries](#4-tech-stack-and-key-libraries)
5. [Repository layout](#5-repository-layout)
6. [Architecture](#6-architecture)
7. [API and backend reference](#7-api-and-backend-reference)
8. [Feature guide](#8-feature-guide)
9. [UI foundation and coding conventions](#9-ui-foundation-and-coding-conventions)
10. [Hosting and deployment](#10-hosting-and-deployment)
11. [Patches and tooling](#11-patches-and-tooling)
12. [Build, run and release](#12-build-run-and-release)
13. [Third-party services and accounts](#13-third-party-services-and-accounts)
14. [Deployment and console decisions already made](#14-deployment-and-console-decisions-already-made)
15. [Known issues and open items](#15-known-issues-and-open-items)
16. [Testing, quality baselines and debugging recipes](#16-testing-quality-baselines-and-debugging-recipes)
17. [History, branches and versioning](#17-history-branches-and-versioning)
18. [Changelog](#18-changelog)
19. [Glossary](#19-glossary)

## 0. How to use and maintain this file

This file is the single source of truth for the repository. It is written so that a developer or an AI coding agent with no prior context can understand, build, release and safely change the project from this file alone, including after the project moves to another machine or coding tool.

### 0.1 Reading order

| You want to | Read |
|---|---|
| Start work for the first time | Sections 0 to 4, then 5 and 6 |
| Change a feature | Its subsection in section 8, the conventions in section 9, then the open items for that area in section 15 |
| Set up a new machine, build or release | Section 12 |
| Find out why something looks broken | Section 16.5 (debugging recipes), then section 15 |
| Understand a past decision | Sections 2, 14 and 17.5 |
| Look up a term | Section 19 |

### 0.2 Mandatory update steps

Do these after every change to the repository, in the same working session, before reporting the work as done.

1. Add a changelog entry at the top of section 18, using the template in 0.3.
2. Fix every section the change made stale. The usual ones are the snapshot (section 1), the feature's subsection (section 8), the conventions (section 9) and the baselines table (section 16.2).
3. Update section 15: move what you fixed to "Recently resolved" with the date and commit, and add what you found under the right group with the next free ID.
4. Re-check the line numbers you cite in the files you touched. An edit near the top of a file shifts every citation below it.
5. Bump the "Last updated" line at the top: date, branch, commit.
6. Scan the file for secrets and personal data before finishing (0.4).

### 0.3 Changelog entry template

```markdown
### YYYY-MM-DD · branch · Title
- **What:** what changed, with the files.
- **Why:** the reason, or who asked. Write "not recorded" if unknown.
- **Verified:** how it was checked (type-check, lint, build, browser, real device), or "not verified".
- **Follow-ups:** what is left, with open-item IDs.
```

### 0.4 Rules for writing in this file

| Rule | Why |
|---|---|
| The code wins. If this file and the code disagree, fix this file and say so in the changelog. | A handbook that is trusted over the code hides bugs. |
| Cite real paths with line numbers, such as `app/sections/contact.tsx:69`. | A reader must be able to check a claim in seconds. |
| Mark anything not tested on a real device as **unverified**. | So far every check ran on a desktop; see section 16.6. |
| Never write a secret value, an email address, a phone number, an IP address or a personal profile link. Cite file and line. | The file is committed to a repository hosted on GitHub. |
| Open-item IDs (BLK, SEC, BUG, CNT, TD, UNV, RES) are permanent. Never renumber or reuse one. | Other notes, commits and conversations refer to them. |
| Before finishing, search this file for `AKIA`, `AIza`, `sk_live`, `BEGIN PRIVATE KEY`, long opaque strings, `@` addresses and digit runs of ten or more, and remove any hit. | A last check against pasting something by accident. |
| Keep class names and commands in backticks. | Readability; and see the next row. |
| Do not remove `@source not "../*.md"` from `app/globals.css:3`. | Without it, every class name written in this file is compiled into the production CSS (section 9.7). |

### 0.5 Companion files

| File | Role |
|---|---|
| `AGENTS.md` | Short standing instructions for AI coding agents: read sections 0 to 4, follow section 2, apply 0.2 after every change. |
| `CLAUDE.md` | Contains only `@AGENTS.md`, so that tool loads the same instructions. |
| `README.md` | Quick start for humans. Corrected on 2026-10-11; points here. |
| `THEME_GUIDE.md` | Older guide to the theme system. Corrected on 2026-10-11; points here. Section 9 of this file is the reference. |

## 1. Snapshot

| Item | Value |
|---|---|
| Product | A single-page personal portfolio website for a full-stack developer |
| Site title | "Jeffin Jose V \| Full-Stack Developer" (`app/layout.tsx:14`) |
| Package name and version | `personal-portfolio` `0.1.0` (`package.json:2-3`); the version has never been bumped and there are no git tags |
| Repository | `https://github.com/jeff1999git/PersonalProfile` (remote `origin`); public or private is **unverified** |
| Branches | `dev` is the working branch. `main` receives pull requests from `dev` (three merged so far). `origin/main` is at `8a44ca7`; `dev` is ten commits ahead of it (see BLK-3) |
| Framework | Next.js 16.2.3, App Router, Turbopack for dev and build |
| UI | React 19.2.4, TypeScript 5.9.3 (strict), Tailwind CSS 4.2.2 configured in CSS (there is no `tailwind.config` file) |
| Libraries | framer-motion 12.38.0 (animation), lucide-react 0.487.0 (icons), clsx 2.1.1 and tailwind-merge 3.5.0 (class names) |
| Platforms | Web only, responsive. No native apps |
| Toolchain | Node.js 20.9 or newer (the `engines` field says 20.0.0, which is too low: TD-5), npm with `package-lock.json`, ESLint 9.39.4 flat config |
| Routes | `/` and the built-in not-found page, both prerendered as static HTML |
| Backend, database, authentication | None (section 7.1) |
| Environment variables | None are read by the code (section 6.6) |
| Client storage | One `localStorage` key, `theme`, holding `dark` or `light` (section 6.7) |
| Environments | Local dev (`npm run dev`, port 3000); local production (`npm run build` then `npx next start`); hosted on Vercel according to `vercel.json`. The live URL, domain and deployed branch are **unverified** (UNV-1) |
| External services | Vercel (hosting), an image CDN for the portrait (`next.config.ts:8-13`), Google Fonts for Inter (downloaded at build time and then self-hosted), GitHub (source) |
| Tests and CI | None |
| Quality on 2026-10-11 | Type-check 0 errors; source lint 0 errors; production build passes; `npm run lint` is broken (BLK-1). Details in section 16.2 |
| Page weight | About 211 KB of JavaScript transferred, 7 KB of CSS, 49 KB of font (section 16.2) |

## 2. Golden rules

Each rule has a reason. If a request conflicts with a rule in 2.1 or 2.2, stop and ask the owner.

### 2.1 Owner decisions

| ID | Rule | Reason and source |
|---|---|---|
| GR-1 | The product name is **SOLDDD**, with three D's, in capitals. Its link is `https://solddd.com/`. Never change it back to SOOLDD and never "correct" the spelling. | The product was rebranded. The owner said so on 2026-10-11 and asked for the change everywhere on the profile. The product's own site writes the name in capitals. |
| GR-2 | Sendbird video calling stays named on the SOLDDD work: the experience bullet (`app/sections/experience.tsx:17`) and the card tag (`app/sections/projects.tsx:15`). | Asked for by the owner on 2026-10-11; the owner set the tag text themselves in `50ac264`. |
| GR-3 | Keep the site light: no new heavy dependencies without asking. | An earlier working note records that the owner wants "ultra-light, fast, optimised code with no bloat". It is a stated preference, not a measured budget. |
| GR-4 | The text on the page is the owner's CV. Do not reword it, change a stack, a date or a name, or "improve" a description unless asked. Report inconsistencies instead (section 15.4). | Only the owner knows what is true about their work. On 2026-10-11 the owner dictated the rebrand wording and edited the project tags personally. This rule is inferred from that practice. |

### 2.2 Working agreements

| ID | Rule | Reason and source |
|---|---|---|
| GR-5 | The owner reviews and commits. Do not commit, push or open a pull request unless asked. | Stated by the owner on 2026-10-11. |
| GR-6 | Update this file after every change (section 0.2). | Stated by the owner on 2026-10-11. |
| GR-7 | Never handle secrets. Do not open or print `.env` files, keystores, key files or anything under `.next/`. Never write a secret or personal contact detail into a doc. | Stated by the owner on 2026-10-11. `.next/` holds build-generated key material (SEC-9). |
| GR-8 | Do not delete tracked files or rewrite git history without the owner's explicit go-ahead. This covers removing `personal-portfolio/` and `dev.log` (SEC-1, SEC-2). | It cannot be undone for other clones, and a history rewrite needs a force-push of every branch. The removal was proposed on 2026-10-11 and is waiting for an answer. |
| GR-9 | Check whether a dev server is already running on port 3000 before starting one. Use the running server. Never stop a server you did not start. | The owner usually has `npm run dev` running from their editor. Next 16 refuses a second dev server in the same checkout (section 12.3). |

### 2.3 Engineering guardrails

These come from the code, not from the owner. Each one exists because breaking it has a known result.

| ID | Rule | What happens otherwise |
|---|---|---|
| GR-10 | Do not add element rules to `app/globals.css` outside a cascade layer. Put new base rules inside `@layer base`. | Tailwind 4 puts utility classes in a layer, and any rule outside the layers beats them. The existing rules for `body`, `h1`-`h6`, `p`, `a` and `button` already do this (BUG-3, BUG-9). A universal reset added in `80aa662` had to be rolled back 34 minutes later in `a89d2a3`. |
| GR-11 | Make a component theme-aware the way the others do: a client component that calls `useTheme()` and chooses between two complete class strings. Do not use `dark:` utilities. Do not build class names by joining fragments. | `dark:` follows the operating system setting here, not the toggle, because no custom variant is defined. Tailwind only finds class names written out in full (sections 9.1 and 9.7). |
| GR-12 | Do not reorder, merge or add conditions to the two effects in `contexts/theme-context.tsx:17-36` without testing a first visit and a visit with a stored light theme. | The stored theme survives only because of the order in which the two effects run (section 6.2). The provider was rewritten in four commits. |
| GR-13 | Do not put colour classes on `<body>` in `app/layout.tsx:35`. | The theme provider adds and removes them at run time; hard-coded ones were removed in `92a8c18`. |
| GR-14 | In project data, a missing link is the exact string `"#"`. Never use an empty string. | The buttons are hidden only for `"#"` (`app/sections/projects.tsx:164` and `:170`). An empty string renders a dead button. |
| GR-15 | Section anchors are wired by hand in three places: the section `id`, the nav list (`components/navigation.tsx:8-12`) and the hero scroll arrow (`app/sections/hero.tsx:180`). Change them together. | The arrow pointed at a section that no longer existed from `07b2309` until `3520172`. |
| GR-16 | Contact details are repeated as literals in `app/sections/hero.tsx` and `app/sections/contact.tsx`. Change every copy (section 8.11 lists them). | A partial update shipped once: `5f4ec86` changed some and the rest were fixed in `3520172`. |
| GR-17 | Upgrade in pairs: `next` with `eslint-config-next`; `react` with `react-dom`; `tailwindcss` with `@tailwindcss/postcss`. Do not move `lucide-react` to 1.x before replacing the brand icons in `app/sections/contact.tsx:8`. | Version coupling and removed exports (section 4.3, TD-7). |
| GR-18 | Lint with `npx eslint app components contexts lib`, not `npm run lint` and not `eslint .`. | The script is broken (BLK-1) and whole-repo lint fails on stale tracked files (BLK-2). |
| GR-19 | Run `git status` before staging. Never use `git add -A` blindly and never commit `.next/`. | Only the root-level `.next/` and `node_modules/` are ignored. Nested ones are not, which is how about 20.7 MB of build output was committed (SEC-2, SEC-6). |
| GR-20 | Base work on `dev`. Do not rebase `dev`. Pull `main` before using it. | Local `main` is 22 commits behind `origin/main`, and `dev` is already pushed (section 17.1). |
| GR-21 | Open the dev site as `http://localhost:3000`, not by IP address. | Next 16 blocks its own dev resources for other origins unless they are allow-listed, so hot reload stops (TD-17). |
| GR-22 | Nothing under `app/sections/` may be named `page`, `layout`, `route`, `error`, `loading`, `not-found`, `template` or `default`. | Those names turn the folder into a real route. |
| GR-23 | Keep `@source not "../*.md"` in `app/globals.css:3`. | Class names written in Markdown would be compiled into the production CSS (section 9.7). |

### 2.4 Past incidents

| When | What happened | Lesson |
|---|---|---|
| 2026-04-14, `df63611` | The first commit included a nested copy's build output, two Windows native binaries and a dev-server log: about 20.8 MB that is still tracked and is in pushed history. | GR-19. Fixing it needs the owner's go-ahead (GR-8). |
| 2026-04-14, `80aa662` then `a89d2a3` | A universal margin and padding reset and a universal transition were added to `app/globals.css` and removed 34 minutes later. | GR-10. |
| April 2026, recorded in `dev.log` | The dev server returned HTTP 500 because brand icons could not be imported from the icon library in the nested copy. The errors do not apply to the current source. | Brand icons are fragile across icon-library versions (TD-7). |
| 2026-04-14 to 2026-06-22 | After the About section was unmounted (`07b2309`), the hero scroll arrow kept pointing at `#about` until `3520172`. | GR-15. |
| 2026-05-02 to 2026-06-22 | `5f4ec86` updated the contact cards but left placeholder links elsewhere; `3520172` fixed them. | GR-16. |
| Since the move to Next 16 | `npm run lint` fails because the `next lint` command no longer exists. | GR-18, BLK-1. |
| 2026-10-11 | An agent tried to start a second dev server while the owner's was running; Next refused and exited. | GR-9. |

## 3. Product overview

### 3.1 What it is

A one-page portfolio that presents the owner as a full-stack developer: who they are, where they have worked, what they have built and how to reach them. It is a static page. Nothing on it is fetched, submitted or stored on a server.

### 3.2 The page, top to bottom

| Part | What the visitor sees | Reference |
|---|---|---|
| Header | Fixed bar with the brand link "Jeff.", three section links (Experience, Projects, Connect) from 768 px wide, and the theme toggle | Section 8.1, 8.2 |
| Hero | Portrait, name, title, tagline, three contact links (two profiles and email), a headline and a two-paragraph bio | Section 8.3 |
| Experience | Two roles, each a card with dated bullets | Section 8.5 |
| Projects | Fifteen project cards in three groups: "Professional Work" (4), "Independent Works" (4), "Small Projects" (7) | Section 8.6 |
| Contact | A "Send Message" button and four cards showing contact channels | Section 8.7 |
| Footer | Copyright line with the current year | Section 8.8 |

An About section exists in the source but is not shown (section 8.9).

### 3.3 User roles

| Role | What they can do |
|---|---|
| Visitor | Read the page, jump between sections, switch between dark and light theme, follow outbound links, start an email from the "Send Message" button |
| Owner | Changes content by editing the source files and deploying. There is no admin screen and no content system |

### 3.4 Permissions and gating

None. There are no accounts, no login, no roles enforced in code and no restricted content. Every visitor sees the same page.

### 3.5 Plans and pricing

None. The site sells nothing and has no paid features.

### 3.6 What the product does not have

No backend, no database, no contact form, no analytics, no cookies, no service worker, no internationalisation, no blog or second page. A reader who expects any of these should not look for them; section 7 shows the searches that confirm their absence.

## 4. Tech stack and key libraries

Next.js on the App Router (Next's routing system: each route is a folder under `app/`), TypeScript, React, Tailwind CSS and framer-motion. Verified in code at `50ac264` against the installed `node_modules`. Line numbers for `app/globals.css` include the two lines added after line 1 in commit `d1fd46b` (RES-3), so they are two higher than at `50ac264`. In citations, `version-16.md` means `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`, the upgrade guide inside the installed Next package. Codes such as `BLK-1`, `TD-6` or `RES-3` are open-item IDs listed in section 15.

### 4.1 Dependencies

Range: as written in `package.json`, with its line. Installed: the version in `node_modules`, equal to `package-lock.json` for all 15 packages. Pin: "exact" admits one version, "caret" any later version of the same major, "major" any version of that major.

| Package | Range (line) | Installed | Pin | Used for (one import) |
|---|---|---|---|---|
| `next` | `16.2.3` (:19) | 16.2.3 | exact | Framework, CLI, bundler, fonts, images; `app/layout.tsx:2` |
| `react` | `19.2.4` (:20) | 19.2.4 | exact | Hooks and context; `contexts/theme-context.tsx:3` |
| `react-dom` | `19.2.4` (:21) | 19.2.4 | exact | No import; peer dependency of `next`, optional peer of `framer-motion` |
| `framer-motion` | `^12.38.0` (:17) | 12.38.0 | caret | Animation; `components/ui/fade-in.tsx:3` (6 files) |
| `lucide-react` | `^0.487.0` (:18) | 0.487.0 | caret, see note | Icons; `components/navigation.tsx:5` (5 files) |
| `clsx` | `^2.1.1` (:16) | 2.1.1 | caret | Builds class strings; `lib/utils.ts:1` |
| `tailwind-merge` | `^3.5.0` (:22) | 3.5.0 | caret | Drops conflicting Tailwind classes; `lib/utils.ts:2` |
| `tailwindcss` | `^4` (:31) | 4.2.2 | major | CSS framework; `app/globals.css:1` |
| `@tailwindcss/postcss` | `^4` (:25) | 4.2.2 | major | Runs Tailwind in the build; `postcss.config.mjs:3` |
| `typescript` | `^5` (:32) | 5.9.3 | major | Type-check, also run by `next build`; `tsconfig.json` |
| `@types/node` | `^20` (:26) | 20.19.39 | major | Node typings; no import |
| `@types/react` | `^19` (:27) | 19.2.14 | major | React typings; `React.ReactNode` at `app/layout.tsx:27` |
| `@types/react-dom` | `^19` (:28) | 19.2.3 | major | React DOM typings; no import |
| `eslint` | `^9` (:29) | 9.39.4 | major | Linter; `eslint.config.mjs:1` |
| `eslint-config-next` | `16.2.3` (:30) | 16.2.3 | exact | Lint rule sets; `eslint.config.mjs:2-3` |

- Note: npm reads a caret on a `0.x` version as "same minor", so `^0.487.0` admits only 0.487.x. `lucide-react` is pinned in effect.
- The first seven rows are `dependencies` (`package.json:15-23`), the rest `devDependencies` (`:24-33`). No test runner, formatter, analytics, state or data-fetching library is installed.

### 4.2 Pins and packages that move together

- Exact pins: `next`, `react`, `react-dom`, `eslint-config-next`. `package.json` has one commit in its history (root commit `df63611`, 2026-04-14, message "updates"), so these pins and the `lucide-react` range date from the first commit: **reason not recorded**.
- `package-lock.json` (lockfile version 3, `:4`) fixes every transitive version. Its only later change (`0c03886`) added twelve `"peer": true` flags and no version change.
- Bump together, in one change (a peer dependency is a version range that a package requires the installing project to supply):
  - `next` and `eslint-config-next`, which depends on exactly `@next/eslint-plugin-next` 16.2.3 (`node_modules/eslint-config-next/package.json:15`).
  - `react` and `react-dom`, whose peer is `react ^19.2.4` (`node_modules/react-dom/package.json:23`); on a React major also both `@types/react*` packages (`node_modules/@types/react-dom/package.json:124`).
  - `tailwindcss` and `@tailwindcss/postcss`; `tailwind-merge` on a Tailwind minor; `eslint` and its plugins. Proof is in section 4.3.

### 4.3 Upgrade constraints

| Package | What breaks or blocks | Do first | Proof |
|---|---|---|---|
| `next` 16 (already in effect) | `next lint` was removed; the script at `package.json:9` fails (BLK-1) | Call ESLint directly; codemod at `version-16.md:1104` | `version-16.md:1093-1095`; `node_modules/next/dist/lib/get-project-dir.js:45` |
| `next`, a later major | `priority` on `next/image` (`app/sections/hero.tsx:56`) is deprecated in 16 (TD-6); the release that removes it is **unverified** | Rename to `preload`; setting both throws | `node_modules/next/dist/shared/lib/get-img-props.d.ts:24-28`; `get-img-props.js:404-405` |
| Node | Next exits below 20.9.0; `package.json:12-14` allows `>=20.0.0` (TD-5) | Raise `engines.node`; check the Node version on the hosting platform, which is **unverified** (UNV-1) | `node_modules/next/package.json:376`; `node_modules/next/dist/bin/next:24-29` |
| `lucide-react` to 1.x | Brand icons go; `Github` and `Linkedin` at `app/sections/contact.tsx:8` break (TD-7) | Use inline SVGs as `app/sections/hero.tsx:102` and `:114` do | Deprecation notices at `node_modules/lucide-react/dist/lucide-react.d.ts:9180`, `:10909` |
| `tailwindcss`, `@tailwindcss/postcss` | The plugin depends on exactly `tailwindcss` 4.2.2 | Bump both to one version | `node_modules/@tailwindcss/postcss/package.json:32` |
| `tailwind-merge` | 3.5.0 supports Tailwind 4.0 to 4.2; the `^4` range on `tailwindcss` admits 4.3 or later when the lockfile is regenerated | Bump it with any Tailwind minor above 4.2 | `node_modules/tailwind-merge/README.md:21` |
| `eslint` to 10 | Blocked: `eslint-plugin-react`, `-react-hooks`, `-import`, `-jsx-a11y` accept ESLint 9 at most | Wait for an `eslint-config-next` whose plugins accept 10 | `node_modules/<plugin>/package.json` at `:92`, `:39`, `:115`, `:95`, in that order |
| `framer-motion` | None found on 12.x; the package is renamed `motion`, import path `motion/react` | To migrate, change the import line in `hero.tsx`, `navigation.tsx`, `footer.tsx`, `button.tsx`, `card.tsx`, `fade-in.tsx` | `node_modules/framer-motion/README.md:50` |

- `clsx`, `typescript` and the `@types/*` packages: no blocking constraint found. Next needs TypeScript 5.1.0 or later (`version-16.md:111`); the installed `typescript-eslint` accepts versions below 6.1.0 (`node_modules/typescript-eslint/package.json:52`).

### 4.4 Version-specific behaviour that differs from earlier majors

Each bullet gives the behaviour in bold; "Here:" marks what it means for this project.

Next 16.2.3 (bare line numbers refer to `version-16.md`):

- **No `next lint`; `next build` does not lint** (`:1093-1095`). Here: ESLint runs only by hand (BLK-1).
- **Turbopack, Next's bundler, is the default for `dev` and `build`** (`:114-116`); a `webpack` config key fails the build (`:142`). Here: none exists; do not add one.
- **`next dev` writes to `.next/dev` and locks it** (`:918-922`). Here: a build may run beside the owner's dev server, a second dev server may not (section 12).
- **The dev server answers 403 to cross-origin requests for its internal resources, hot reload included, unless the origin is `localhost`, `*.localhost`, the `--hostname` it was started with, or a host listed in `allowedDevOrigins`** (`node_modules/next/dist/server/lib/router-utils/block-cross-site-dev.js:50`, `:77-85`). Here: not set (TD-17).
- **`params`, `searchParams`, `cookies()` and `headers()` are async only** (`:298-304`); the request-interception file is `proxy.ts`, and `middleware.ts` is deprecated (`:625-629`). Here: unused so far.
- **`next/image`**: `quality` values other than 75 are coerced (`:788-790`, `:817`); optimized images are cached at least four hours (`:722-724`). Here: replace the portrait by changing its URL (`app/sections/hero.tsx:51`).
- **Runtime React is the build bundled inside Next** (a 19.3.0 canary under `node_modules/next/dist/compiled/react/`; `:400`), not the pinned 19.2.4. Here: bumping `react` alone changes nothing in the browser.

Tailwind CSS 4.2.2 (`lib.js` is the minified `node_modules/tailwindcss/dist/lib.js`):

- **No `tailwind.config.*`, no `content` list.** Configuration is CSS (`app/globals.css:1`, `:15-24`).
- **Every non-ignored text file under the working directory is scanned for class names** (`node_modules/@tailwindcss/postcss/dist/index.d.ts:4-9`). Here: `app/globals.css:3` excludes the Markdown files in the repo root (pattern `../*.md`; whether it also covers sub-folders is **unverified**); a class must be a complete literal, as at `contexts/theme-context.tsx:29-34`.
- **`dark:` follows the operating system unless `@custom-variant dark` is declared** (`lib.js:16`). Here: not declared, so the `dark` class set at `contexts/theme-context.tsx:28` styles nothing (TD-9).
- **Utilities sit in a cascade layer (CSS `@layer`)** (`node_modules/tailwindcss/index.css:1`, `:942-943`); any rule written outside a layer beats them whatever its specificity. Here: BUG-3 and BUG-9.
- **`hover:` applies only under `@media (hover: hover)`** (`lib.js:16`). Here: hover styles are skipped on touch-only devices; real phones are **unverified** (UNV-3).
- **Preflight (Tailwind's reset) sets no pointer cursor on buttons and makes the default border colour `currentColor`** (`node_modules/tailwindcss/preflight.css:15`). Here: pair `border` with a colour class.

## 5. Repository layout

### 5.1 Annotated tree

The repository as it ships with this handbook. At `50ac264` git tracks 61 files; 25 of them are the two entries marked "tracked by mistake".

```text
project_context.md     this handbook
AGENTS.md              rules for coding agents, including handbook upkeep
CLAUDE.md              one line, @AGENTS.md
README.md              short setup guide; corrected 2026-10-11, points here
THEME_GUIDE.md         theme notes; corrected 2026-10-11, points here
package.json           scripts, dependency ranges, Node engines
package-lock.json      npm lockfile, the only lockfile
next.config.ts         strict mode, image formats, allowed image host
tsconfig.json          TypeScript options; alias @/* is the repo root
eslint.config.mjs      ESLint flat config: two Next rule sets
postcss.config.mjs     registers the Tailwind PostCSS plugin
vercel.json            host-only: commands, region, response headers
.gitignore             ignore rules (gaps: SEC-6)
.claude/settings.json  tracked; three shell patterns an agent may run
.vscode/settings.json  tracked; one editor setting
app/                   App Router root; the only route is /
  layout.tsx           root layout: font, metadata, provider, header, footer
  page.tsx             the page: five components in order
  globals.css          Tailwind import, scan exclusion, global rules
  favicon.ico          site icon
  sections/            plain folder, not a route (no page file)
    hero.tsx           portrait, name, headline, bio, social links
    experience.tsx     experiences array and its cards
    projects.tsx       three project arrays, ProjectCard, three grids
    contact.tsx        contactInfo array, mail button, four link cards
    about.tsx          NOT RENDERED: dead code (TD-1)
components/
  navigation.tsx       fixed header: brand, three links, theme toggle
  footer.tsx           copyright line
  theme-separator.tsx  one themed horizontal rule
  ui/button.tsx        Button: a link when href is set, else a button
  ui/card.tsx          Card and its four parts
  ui/container.tsx     Container: centred max-width wrapper
  ui/fade-in.tsx       FadeIn, StaggerContainer, StaggerItem
  ui/text.tsx          Heading and Text
contexts/theme-context.tsx  ThemeProvider, useTheme(): the only state
lib/utils.ts           cn(): clsx plus tailwind-merge
public/                five unused template SVGs, publicly served (TD-4)
dev.log                TRACKED BY MISTAKE: old dev-server log (SEC-1)
personal-portfolio/    TRACKED BY MISTAKE: 24 stale build files and binaries, 20.7 MB (SEC-2)
.next/                 GENERATED, ignored: build and dev output (SEC-9)
node_modules/          ignored: installed packages
next-env.d.ts          GENERATED, ignored: Next type references; never edit
tsconfig.tsbuildinfo   GENERATED, ignored: TypeScript incremental cache
```

- Ignore rules for the last four entries: `.gitignore:17`, `:4`, `:41`, `:40`.
- Not present: `src/`, `pages/`, `tailwind.config.*`, `.env*`, `.github/`, any test folder, and any `error`, `not-found`, `loading` or `proxy` file.

### 5.2 Where do I change X

| I want to change | File and lines |
|---|---|
| Page title, description; viewport, browser-chrome colour | `app/layout.tsx:13-16`; `:18-22` |
| Font | `app/layout.tsx:8-11`, consumed at `app/globals.css:23` and `:41` |
| Order of sections | `app/page.tsx:10-14` |
| Header links; brand text; theme toggle | `components/navigation.tsx:8-12`; `:38`; `:59-75` |
| Theme logic and storage | `contexts/theme-context.tsx:14-47` |
| Hero name, role, tagline | `app/sections/hero.tsx:64-70`, `:77`, `:85` |
| Hero headline, bio, social links | `app/sections/hero.tsx:141-155`, `:162-171`, `:93-128` |
| Portrait; its allowed host | `app/sections/hero.tsx:50-57`; `next.config.ts:8-13` |
| Jobs and bullets | `app/sections/experience.tsx:8-42` |
| Projects under "Professional Work" | `app/sections/projects.tsx:11-44` (array `professionalProjects`) |
| Projects under "Independent Works" | `app/sections/projects.tsx:46-75` (array `coreProducts`, TD-3) |
| Projects under "Small Projects" | `app/sections/projects.tsx:77-127` (array `otherProjects`, TD-3) |
| Group headings; card layout | `app/sections/projects.tsx:203`, `:219`, `:235`; `:129-180` |
| Contact details | `app/sections/contact.tsx:11-36`, `:61`; email also at `app/sections/hero.tsx:118` (TD-2) |
| Footer text | `components/footer.tsx:23-25` |
| Button variants, sizes; card look | `components/ui/button.tsx:33-56`; `components/ui/card.tsx:18-25` |
| Heading sizes, text variants; page width | `components/ui/text.tsx:14-19`, `:61-71`; `components/ui/container.tsx:10` |
| Entrance animations | `components/ui/fade-in.tsx:23-53`, `:61-83`, `:85-104` |
| Global element rules; keyframes | `app/globals.css:26-73`; `:75-91` |
| CSS variables, Tailwind tokens | `app/globals.css:5-13`, `:15-24` (unused by components, TD-9) |
| Response headers on the host | `vercel.json:7-40` |
| npm scripts; Node range | `package.json:5-11`; `:12-14` |
| Lint rules; import alias | `eslint.config.mjs:5-16`; `tsconfig.json:21-23` |

- Colours are not in one place: each component picks classes with a `theme === 'dark'` test. Read section 9 before restyling.
- Step-by-step edits (add a project, add a job, change contact details) are in section 8.

### 5.3 Server components, client components and files with no directive

A Server Component renders only on the server (in production here: once, at build time) and ships no JavaScript of its own. A client component also runs in the browser and may use state, effects, context and event handlers.

Rule (`node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md:11`, `:174-176`): layouts and pages are Server Components by default; a file whose first line is `"use client"` starts the client bundle, and everything it imports joins it.

| Kind | Files | Why |
|---|---|---|
| Server Component, no directive | `app/layout.tsx`, `app/page.tsx` | They only compose components and export metadata |
| Client component, `"use client"` on line 1 | 13 files: all of `app/sections/`, all of `components/` except `ui/container.tsx`, and `contexts/theme-context.tsx` | `theme-context.tsx` uses state, effects and context; `fade-in.tsx` renders framer-motion elements; the other eleven call `useTheme()` |
| No directive, client by import | `components/ui/container.tsx`, `lib/utils.ts` | No hooks; only client files import them, so they ship in the client bundle |

- Project rule: a component that calls `useTheme()` or renders a framer-motion `motion.*` element must start with `"use client"`, because hooks and context do not run in Server Components. In practice that covers every component except `Container`.
- The production build registers eight project files as client entry modules (the client-reference manifest for `/` under `.next/server/app/`): those imported at `app/layout.tsx:4-6` and `app/page.tsx:1-5`. `about.tsx` is absent because nothing imports it (TD-1).
- Never add `"use client"` to `app/layout.tsx`: its `metadata` and `viewport` exports (`:13-22`) are allowed only in a Server Component (`generate-metadata.md:110` and `generate-viewport.md:17`, both in `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/`).

## 6. Architecture

Every search quoted in sections 6 and 7 was run from the repository root at commit `50ac264` in a POSIX shell (Git Bash on Windows); "no match" means it printed nothing.

### 6.1 Shape of the app in five lines

1. **One route.** `/` is the only page: `app/page.tsx:7-17` inside the root layout `app/layout.tsx:24-48`.
2. **Static.** `next build` prerenders `/`: it renders the page to an HTML file once, at build time. Nothing is rendered per request in production.
3. **Client-hydrated.** Only those two files are Server Components (code that runs only on the server; here, only during the build). Every other rendered component is a Client Component: its file starts with `"use client"`, or, for `components/ui/container.tsx`, it is imported only by such files. A Client Component is prerendered and then runs again in the browser, where React attaches to the existing HTML ("hydration").
4. **No backend.** No API calls, authentication, database, environment variables, forms or cookies.
5. **Almost no state.** One React state value, `theme`, mirrored in one `localStorage` key. All content is hard-coded in the section files.

### 6.2 Startup sequence

1. **Build.** `next build` writes the HTML for `/`. Effects (functions passed to `useEffect`; React runs them only in the browser, after a render) do not run, so the HTML is always the dark variant (the state starts as `'dark'`, `contexts/theme-context.tsx:15`). The footer year is computed during this render, so the HTML holds the build year (`components/footer.tsx:9`, see BUG-13).
2. **HTML arrives** with the title and description (`app/layout.tsx:13-16`), viewport and `theme-color` (`:18-22`), one stylesheet, preloads for the Latin Inter font file (`:8-11`) and the portrait (`app/sections/hero.tsx:56`), and 8 async scripts (counted in the built HTML).
3. **First paint, before JavaScript.** Black background and white text come from `app/globals.css:38-44`. All 35 animated elements arrive with inline `opacity:0` (framer-motion `initial` values: `components/ui/fade-in.tsx:33-36,94-97`, `components/navigation.tsx:19`, `components/footer.tsx:17`), so the page looks almost empty until step 5 (see BUG-1).
4. **Hydration.** React hydrates with `theme` equal to `'dark'`, matching the HTML, then runs the theme provider effects (below).
5. **Entrance animations.** The header slides in (`components/navigation.tsx:19-21`); everything else fades in once, as soon as it is inside the viewport (`components/ui/fade-in.tsx:37-42,68-70`).
6. **Interactive.** The only stateful control is the theme toggle (`components/navigation.tsx:59-75`).

#### The two effects in the theme provider

- **Restore effect** (`contexts/theme-context.tsx:17-23`) runs once, after the first render. It reads the `localStorage` key `theme` and, if a value exists and differs from the state, calls `setTheme`.
- **Sync effect** (`contexts/theme-context.tsx:25-36`) runs after the first render and after every change of `theme`. It writes `theme` to `localStorage`, adds or removes `dark` on `<html>`, and swaps colour classes on `<body>`.

React runs a component's effects in the order they are declared, so on load:

1. Restore reads the stored value (say `light`) and queues a state change; the state is still `dark`.
2. Sync runs with `dark` and writes `dark` over the stored `light`.
3. React re-renders with `light`, every `useTheme()` caller switches classes, and sync writes `light` back.

- **Why the order must not change:** the read must happen before the first write. If sync were declared first, or the read were delayed or skipped (a timeout, a promise, an early return), step 2 would destroy the stored value before anything read it, and a light preference would be lost on every load. After any edit here, set light, reload, and check it is still light.
- Defects in this sequence: BUG-5, BUG-6, BUG-8, and BUG-3 with TD-9 (the classes written to the DOM style nothing).

### 6.3 Navigation and routing

| URL | Source | Served as | Status |
|---|---|---|---|
| `/` | `app/page.tsx` in `app/layout.tsx` | static HTML from the build | 200 |
| `/favicon.ico` | `app/favicon.ico` | static | 200 |
| `/_next/static/...` | build output | hashed JS, CSS, fonts | 200 |
| `/_next/image` | framework image optimizer | on demand (section 7.2) | 200 or 400 |
| five `.svg` files | `public/` | static, unused (see TD-4) | 200 |
| path with a trailing slash | framework | redirect to the path without it | 308 |
| anything else | framework default not-found page | static, inside the root layout | 404 |

The 200 on `/` and the 404 are verified in browser; the 308 is read from the build's route manifest. Project code does no client-side routing (`grep -rnE "next/link|next/navigation|useRouter|redirect\(" app components contexts lib` has no match) and there is no middleware file (`middleware.ts`, renamed `proxy.ts` in Next 16). Every link is a plain `<a>`.

**In-page anchors.** Navigation is by URL hash only, hand-wired in three places that must change together:

1. The header link list, `components/navigation.tsx:8-12`: `#experience`, `#projects`, `#contact` (the brand link at `:31` is `#`).
2. The section `id` attributes: `app/sections/experience.tsx:49`, `app/sections/projects.tsx:187`, `app/sections/contact.tsx:42`.
3. The hero scroll arrow, `app/sections/hero.tsx:180`: `#experience`.

Scrolling is smoothed by CSS only (`app/globals.css:33`). No scroll margin is set, so a section's top edge lands under the fixed header (a 64 px row plus a 1 px border, `components/navigation.tsx:22,29`); the section's own 96 px top padding keeps its heading visible. Below 768 px the header links are hidden (see BUG-7).

**Unknown URLs** show the framework default page ("404", "This page could not be found.") with status 404, inside the site header and footer. The header's hash links resolve against the 404 URL, so nothing there leads back to `/` (see BUG-10).

**Reserved file names under `app/sections`.** Inside `app/`, Next.js reads meaning from file names, and a folder becomes a public URL once it holds a `page` or `route` file. `app/sections/` is a plain folder only because no file in it has such a name. Never add a file there named `page`, `route`, `layout`, `template`, `default`, `loading`, `error`, `not-found`, `icon`, `apple-icon`, `opengraph-image`, `twitter-image` or `sitemap`: `page` or `route` would publish `/sections`, the last five would publish metadata URLs under `/sections` (matched in any folder, `node_modules/next/dist/lib/metadata/is-metadata-route.js:168-174`), and the others are names the framework reserves for wrappers around a route. The full list of reserved names is in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/`.

### 6.4 State management

There is very little: no store library, no reducer, no data cache. `grep -rnE "useState|useReducer|useRef|createContext" app components contexts lib` matches only `contexts/theme-context.tsx`.

Line numbers in this table are in `contexts/theme-context.tsx`.

| State | Lives in | Written by | Read by |
|---|---|---|---|
| `theme` | `useState` (`:15`); typed `'dark'` or `'light'` (`:5`), any stored string at runtime (see BUG-8) | restore effect (`:20`); `toggleTheme` (`:38-40`), called only by the header button (`components/navigation.tsx:60`) | every `useTheme()` caller |
| `localStorage` key `theme` | the browser | sync effect (`:26`) | restore effect (`:18`) |
| `dark` on `<html>`, colour classes on `<body>` | the DOM | sync effect (`:27-35`) | nothing (see TD-9) |

- `useTheme()` is called by every `"use client"` file except `components/ui/fade-in.tsx` and the provider itself, so a toggle re-renders nearly the whole page. It throws outside the provider (`contexts/theme-context.tsx:51-53`), which is mounted once at `app/layout.tsx:36-44`.
- Not state: animation progress (held inside framer-motion) and content (hard-coded in each section file: constant arrays, or literal JSX in the hero).

### 6.5 API layer, authentication and token lifecycle

None of these exist: no API client, no login, no session, no token, so no token lifecycle. Proof: `grep -rniE "token|session|jwt|cookie|bearer|password|login|signin" app components contexts lib next.config.ts` has no match, and the seven runtime dependencies (`package.json:15-23`) include no data, authentication or state library. Section 7.1 has the search for network calls.

### 6.6 Configuration and environments

**`next.config.ts`**

| Key | Line | Value | Differs from default | Effect |
|---|---|---|---|---|
| `reactStrictMode` | 4 | `true` | no (already on in the App Router) | dev only: React runs renders and effects twice to expose bugs |
| `images.formats` | 7 | AVIF, then WebP | yes (WebP only) | AVIF is served when the browser accepts it |
| `images.remotePatterns` | 8-13 | `https`, host `res.cloudinary.com` | yes (empty) | lets the optimizer fetch the portrait (see SEC-4) |
| `compress` | 16 | `true` | no | Next's own server gzips responses (`next dev`, `next start`) |
| `poweredByHeader` | 17 | `false` | yes (`true`) | removes the `X-Powered-By` header |

- Defaults read from `node_modules/next/dist/server/config-shared.js:101-102,118` and `node_modules/next/dist/shared/lib/image-config.js:58-60,69` (TD-10 covers the two keys that restate defaults). The `reactStrictMode` default there is `null`; the bundled Next.js documentation says the App Router treats that as on. Whether the host uses `compress` is **unverified**. Nothing else is set: no `output`, `basePath`, `headers()`, `redirects()` or `allowedDevOrigins`.

**Environment variables.** The code reads none: `grep -rnE "process\.env|NEXT_PUBLIC_|import\.meta\.env" app components contexts lib *.ts *.mjs` has no match, and no `.env*` file exists.

- New machine: clone, `npm install`, `npm run dev`. There is no `.env` file to create or copy.
- Host: nothing has to be defined in the hosting dashboard. Whether anything is defined there is **unverified**.
- If a variable is ever added: `.env*` is git-ignored (`.gitignore:34`), so it must also be set on the host, and a `NEXT_PUBLIC_` value ends up in public JavaScript.

**Environments**

| Aspect | `next dev` | `next build` then `next start` | Hosted deploy |
|---|---|---|---|
| Output folder | `.next/dev` | `.next` | built by the host with the commands at `vercel.json:2,4` |
| Rendering of `/` | on each request | static file | static; **unverified** |
| Type check | none | in the build; errors fail it | same |
| Headers in `vercel.json:7-40` | not sent | not sent | sent; **unverified** (see SEC-5) |
| Font download fails | a fallback font is used | build fails (see TD-16) | build fails |
| Opened by IP address instead of `localhost` | the hot-reload socket is refused; hot reload is lost (see TD-17) | works | works |

- Lint runs in none of the three (see BLK-1). Section 12 has the commands.
- The IP-address row was read from `node_modules/next/dist/server/lib/router-utils/block-cross-site-dev.js:77-107`, not run: in dev, a framework request is refused when its `Origin` header names a host that is neither `localhost` nor listed in `allowedDevOrigins`, and a browser sends that header on every WebSocket.

**TypeScript (`tsconfig.json`)**

- `strict` (`:7`): type errors fail `next build`.
- `isolatedModules` (`:13`): each file is compiled on its own, so a re-exported type must use `export type`. Type-only imports are marked `import type` by convention (`app/layout.tsx:1`).
- `jsx` is `react-jsx` (`:14`): no `import React` is needed. Do not change it: Next.js requires this value and writes it back (`node_modules/next/dist/lib/typescript/writeConfigurationDefaults.js:178-182`).
- `paths` (`:21-23`) maps `@/*` to `./*`: the alias `@/` is the repository root, not `src/`. Write `@/app/...`, `@/components/...`, `@/contexts/...`, `@/lib/...`. The only relative import in tracked source is `./globals.css` (`app/layout.tsx:3`).

### 6.7 Local storage and cookies

Cookies, session storage, IndexedDB, service workers: none. `grep -rnE "localStorage|sessionStorage|indexedDB|document\.cookie" app components contexts lib` matches only the two lines below.

| Key | Values | Read | Written |
|---|---|---|---|
| `theme` (`localStorage`) | `dark` or `light` | once, after hydration (`contexts/theme-context.tsx:18`) | after hydration and after every toggle (`:26`) |

- It is written on every page load, even a first visit (value `dark`). It holds no personal data and is never sent anywhere.
- Storage blocked or throwing: the whole page is replaced by the framework error screen (verified in browser; see BUG-6).
- Any other stored string, for example `system`: the site renders its light branch and keeps the bad value until the next toggle (verified in browser; see BUG-8).
- Two open tabs do not sync. A first visit is always dark, whatever the operating system prefers.

### 6.8 Forms and validation

None: `grep -rnE "<form|<input|<textarea|<select|onSubmit" app components contexts lib` has no match, and no validation library is installed. "Send Message" is a link to Gmail's web compose page, styled as a button (`app/sections/contact.tsx:61`). The four contact cards are links too (`:71-109`).

### 6.9 Metadata and SEO

- **Set**, all in `app/layout.tsx`: `title` and `description` (`:13-16`); `viewport` with `width`, `initialScale` and `themeColor` `#000000` (`:18-22`, see BUG-16); `lang="en"` (`:31`). The only icon is `app/favicon.ico`.
- **Absent** (see TD-12): `metadataBase`, Open Graph and Twitter tags, canonical URL, `robots`, `sitemap`, web manifest, touch icon, structured data. `/robots.txt` and `/sitemap.xml` are unknown URLs (404), and shared links carry no preview image.

### 6.10 Error handling

The app has none of its own: no `app/error.tsx`, `app/global-error.tsx` or `app/not-found.tsx` (so unknown URLs get the default page, section 6.3), no error boundary, and no `try`/`catch` (`grep -rnE "try \{|catch \(" app components contexts lib` has no match).

| Failure | What the visitor sees |
|---|---|
| An effect or render throws in the browser | the whole document is replaced by the framework screen "This page couldn't load" with Reload and Back buttons; header, footer and styling are gone (verified in browser for blocked storage) |
| JavaScript disabled or fails to load | a black page with only the hero divider line (verified in browser; see BUG-1) |

- Code that can throw today: the two `localStorage` calls (`contexts/theme-context.tsx:18,26`) and `useTheme()` outside the provider (`:51-53`).
- An `app/error.tsx` would not catch a theme provider failure: it does not wrap the layout of its own folder. Only `app/global-error.tsx` does.

## 7. API and backend reference

### 7.1 Backend endpoints called by the code

None. The code makes no network call of any kind: `grep -rnE "fetch\(|axios|XMLHttpRequest|WebSocket|EventSource|sendBeacon|use server|next/script" app components contexts lib next.config.ts` has no match.

### 7.2 Framework endpoints that exist at runtime

These come from Next.js, not from project code. Section 6.3 lists every URL; these three matter. The caching column was read from the framework source and the build output, not measured; caching on the host is **unverified**.

| Endpoint | What it is | Caching under `next start` |
|---|---|---|
| `GET /_next/image?url=&w=&q=` | image optimizer: fetches, resizes and re-encodes the portrait | at least 4 hours, `must-revalidate` |
| `GET /_next/static/...` | JS, CSS and fonts with a hash in each file name | one year, `immutable` |
| `GET /favicon.ico` | route generated from `app/favicon.ico` | `max-age=0, must-revalidate` |

Image optimizer parameters. Each broken rule returns HTTP 400 with the message as the body (rules at `node_modules/next/dist/server/image-optimizer.js:530-662`).

| Parameter | Rule | Message when broken |
|---|---|---|
| `url` | required; at most 3,072 characters; an absolute URL must match `images.remotePatterns` | `"url" parameter is not allowed` (host not allow-listed) |
| `w` | one of 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840 | `"w" parameter (width) of N is not allowed` |
| `q` | integer from 1 to 100 that is also in `images.qualities`, which is `[75]` | `"q" parameter (quality) of N is not allowed` |

- The width and quality lists are framework defaults (`node_modules/next/dist/shared/lib/image-config.js:31-49,70-72`). The `Accept` request header picks AVIF, else WebP, else the original format.
- A new image host needs a matching `images.remotePatterns` entry in `next.config.ts`. `next dev` throws on an unlisted host, but a production build does not (the check at `node_modules/next/dist/shared/lib/image-loader.js:57-104` is skipped in production): the browser gets HTTP 400 and shows a broken image. Load the page after touching `app/sections/hero.tsx:50-57` or the `images` config.
- A `quality` prop that is not in `images.qualities` causes no error: it is replaced by the nearest listed value, which is 75 (`node_modules/next/dist/shared/lib/find-closest-quality.js:11-17`). To use another quality, add it to `images.qualities` first.
- To replace the portrait, change the `src` URL instead of overwriting the remote file: optimized images stay cached for at least 4 hours.

### 7.3 External hosts

| Host or scheme | Purpose | Referenced at | Browser contacts it |
|---|---|---|---|
| `res.cloudinary.com` | image CDN holding the portrait | URL literal `app/sections/hero.tsx:51`; allow-list `next.config.ts:8-13` | never; the site's server fetches it |
| `fonts.googleapis.com`, `fonts.gstatic.com` | source of the Inter font | implied by `app/layout.tsx:2,8-11` | never; fetched by `next build` and `next dev` (section 7.6) |
| GitHub profile URL | social link | `app/sections/hero.tsx:94`; contact card `href` at `app/sections/contact.tsx:34` | on click |
| LinkedIn profile URL | social link | `app/sections/hero.tsx:106`; contact card `href` at `app/sections/contact.tsx:28` | on click |
| `mail.google.com` (compose URL that carries the email literal) | opens Gmail's web compose page in a new tab | `app/sections/hero.tsx:118`; `app/sections/contact.tsx:61`; contact card `href` at `:16` | on click |
| `tel:` (phone literal) | dials, on a device that can | contact card `href` at `app/sections/contact.tsx:22` | on click; no request |
| 13 project sites, 7 repositories | "Live URL" and "Code" buttons | listed below | on click |

The contact cards render the four `href` fields of the `contactInfo` array (`app/sections/contact.tsx:11-36`, `:72`). The browser contacts no external host on page load. Project links, with their line in `app/sections/projects.tsx`:

- Live sites: `https://solddd.com/` (17), `https://easyvacayplanner.com/` (25), `https://www.auntie-app.com/` (33), `https://pinnote-demo.vercel.app` (51), `https://www.ulsaaham.com/` (58), `https://royalkingadmin-web.vercel.app/` (65), `https://excelcabs.vercel.app/` (72), `https://jv-swatersupply-web.vercel.app/` (82), `https://testing-repo-tan-ten.vercel.app/` (89), `https://bookngo-one.vercel.app/` (96), `https://dd-aminni.vercel.app/` (110), `https://flavory-nu.vercel.app/` (117), `https://seffer-exports.vercel.app/` (124).
- Repositories, all in the GitHub account that hosts this repository (the account URL is the literal at `app/sections/hero.tsx:94`): `JVSwatersupply` (83), `testing-repo` (90), `Bookngo` (97), `NoWaitr` (104), `DDAminni` (111), `Flavory` (118), `SefferExports` (125).
- In the data, `"#"` means "no link" and hides the button (`:164,170`).

### 7.4 What a visitor's browser requests on first load

Production build, measured 2026-10-11 (verified in browser). Every request goes to the site's own origin.

| Type | Count | Bytes transferred |
|---|---|---|
| HTML document | 1 | 11,341 |
| Stylesheet | 1 | 7,388 |
| JavaScript (async) | 8 | 211,965 (see TD-15) |
| Font: Inter, Latin subset, preloaded | 1 | 48,732 |
| Portrait through `/_next/image` | 1 | 13,921 on desktop; 24,853 on a phone at 2x |
| Favicon | 1 | not measured |

- **Fonts:** self-hosted. Six more Inter subset files exist and download only if the page shows a character from their range.
- **Analytics:** none. **Cookies:** none. **Third-party scripts:** none. Whether the host injects analytics from its dashboard is **unverified**.
- Evidence in the build output (verified in code): the HTML has no absolute `src`, `<iframe>` or `preconnect`; the stylesheet's font URLs are all relative; the built JavaScript has no match for analytics hosts, `document.cookie` or `sendBeacon`.

### 7.5 Sockets, webhooks, server actions, route handlers

None. `find app -name "route.*"` returns nothing, and the search in section 7.1 covers `WebSocket`, `EventSource` and `"use server"`. The build output lists no middleware and no functions, and with no `"use server"` in the source there are no server actions. The hot-reload socket seen under `next dev` belongs to the framework.

### 7.6 Build-time network needs

| Host | Needed by | When | If unreachable |
|---|---|---|---|
| `registry.npmjs.org` | `npm install` | install | install fails |
| `fonts.googleapis.com`, `fonts.gstatic.com` | `next/font/google` (`app/layout.tsx:2,8-11`) | `next build`, `next dev` | build fails; dev uses a fallback font |
| `telemetry.nextjs.org` | Next.js anonymous usage telemetry | `next dev`, `next build` | no effect |

- **Font download.** The failure handling was read at `node_modules/next/dist/compiled/@next/font/dist/google/loader.js:148-171`. That file is the webpack path. `next dev` and `next build` use Turbopack's compiled font code by default, and neither was tried offline, so both outcomes are **unverified** (see TD-16).
- **Telemetry** is on by default and the repository does not turn it off. To turn it off, set `NEXT_TELEMETRY_DISABLED=1` in the shell or build environment, or run `npx next telemetry disable` (a per-user setting kept outside the repository).

## 8. Feature guide

The site is one page: header, Hero, Theme separator, Experience, Projects, Contact and Footer, in that order (`app/page.tsx:10-14`, `app/layout.tsx:38-42`). All text is hard-coded in the files below. In this section:

- Breakpoints are Tailwind's: `sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px.
- "Themed" means the element picks its classes with `theme === 'dark' ? ... : ...` through the `useTheme()` hook (section 9).
- A bare `:NN` is a line in the first file named under **Files**. A short name such as `hero.tsx:30` repeats a full path given earlier in the same subsection.
- Statements are verified in code unless marked "verified in browser" or **unverified**.

### 8.1 Navigation header

**Files**: `components/navigation.tsx:1-81`; links in `navLinks` (`:8-12`); mounted at `app/layout.tsx:38`, so it is on every route, the 404 page included.

**Behaviour**
- A translucent, blurred bar fixed to the top of the viewport, 64 px tall (`h-16`, `:29`), above all content (`:22`).
- It holds the brand text "Jeff." (a link to `#`, the top of the page, `:31`), three section links and the theme toggle (section 8.2).
- The section links are "Experience" to `#experience`, "Projects" to `#projects` and "Connect" to `#contact` (`:9-11`). They are plain anchors, not `next/link`; `scroll-behavior: smooth` (`app/globals.css:33`) animates the jump.
- Verified in browser: each link lands with the section's top edge at the top of the viewport.
- Breakpoints: below 768 px the section links are hidden (`hidden md:flex`, `:41`); the brand and toggle remain.
- Themes: the bar, brand and links are themed (`:23-25`, `:33`, `:47-49`).

**Rules**
- Each `href` is the React key (the identifier React uses to tell list items apart, `:44`), so it must be unique. It must also match a `<section id>`; nothing checks the match.
- The hero assumes the 64 px height (`app/sections/hero.tsx:30`). Change both together.
- No section sets `scroll-margin-top`. Headings clear the bar only because every section has `py-24 lg:py-32` top padding; keep it on any anchored section.

**Gotchas**: there is no menu below 768 px (BUG-7), and on the 404 page the hash links go nowhere (BUG-10).

### 8.2 Theme toggle

**Files**: button `components/navigation.tsx:59-75`; state `contexts/theme-context.tsx:14-47`; provider mounted at `app/layout.tsx:36-44`.

**Behaviour**
- A round icon button in the header, at every width. A click flips the theme between `'dark'` and `'light'` (`theme-context.tsx:38-40`).
- The icon shows the current theme, not the one a click gives: `Moon` in dark, `Sun` in light (`navigation.tsx:70-74`).
- The choice is written to the `localStorage` key `theme` on mount and on every change (`theme-context.tsx:25-36`) and read once after mount (`theme-context.tsx:17-23`). A first visit and the server HTML are always dark (`theme-context.tsx:15`). The operating-system preference is not read.
- Verified in browser: the toggle switches the page and the choice survives a reload.

**Rules**
- Tailwind `dark:` variants do not follow the toggle; only components that call `useTheme()` do (section 9).
- Keep the storage key and its two values: returning visitors have them stored.

**Gotchas**
- BUG-5 (dark first paint for returning light-theme visitors), BUG-6 (blocked storage breaks the page), BUG-8 (stored value not validated), BUG-3 and BUG-4 (`body`, focus ring and selection stay dark-styled), BUG-16 (fixed browser chrome colour).
- The `dark` class on `<html>` and the colour classes on `<body>` (`theme-context.tsx:27-35`) change nothing visible (TD-9, BUG-3).

### 8.3 Hero

**Files**: `app/sections/hero.tsx:1-192`; mounted at `app/page.tsx:10`; image host allow-list at `next.config.ts:8-13`.

**Behaviour**
- A section at least one viewport tall (`:14`) over a gradient and a faint pulsing circle (`:16-27`).
- Left column (`:32-131`): the portrait (`next/image`; URL at `:51`, alt text at `:52`) in front of a slanted block; the `h1` with the owner's name on two lines (`:64-70`); "FULL-STACK DEVELOPER" (`:77`); "Design. Code. Ship." (`:85`); three links (`:92-129`): GitHub, LinkedIn and a Gmail web-compose link labelled "Gmail", each in a new tab.
- Right column (`:139-174`): the `h2` "I build systems, products, and ideas that turn complexity into clarity." (`:141-155`) and two bio paragraphs (`:162-171`).
- Scroll arrow (`:178-188`): a bouncing link to `#experience`.

| Width | Layout |
|---|---|
| below 1024 px | one column, right under left; left column centred (`:32`), right column left-aligned (`:139`); portrait box 160 x 210 px, or 200 x 260 px from 640 px (`:46`) |
| from 1024 px | three-track grid (`:30`): left column, 1 px divider (`:134`), right column; scroll arrow shown (`:178`); larger type |
| from 1280 px | larger `h2` (`:141`), the only `xl:` class on the site |

- Themes: everything is themed except the scroll arrow (`:181`).

**Rules**
- `min-h-[calc(100vh-4rem)]` (`:30`) subtracts the header height (section 8.1).
- `next/image` refuses a remote host that is missing from `next.config.ts:8-13`. One host is listed.

**Gotchas**
- BUG-12 (scroll arrow colour), BUG-1 (portrait and text invisible until the page's JavaScript runs, despite `priority`), TD-6 (`priority`, `:56`, is deprecated), SEC-4 (the allow-list covers the whole host), CNT-1 (the name in the bio, `:163`), BUG-9 (`font-bold` on the `h1` and `h2` does nothing).
- Heights use `100vh`. Behaviour with collapsing mobile browser toolbars is **unverified** (UNV-3).

### 8.4 Theme separator

**Files**: `components/theme-separator.tsx:1-13` (no props); mounted once at `app/page.tsx:11`.

**Behaviour**: an empty full-width `div` with a themed 1 px top border (`:9-11`). It is the same at every width and is not animated.

**Rules**: it carries no spacing and no logic. Keep it directly under the hero, or remove it.

**Gotchas**: Experience, directly below, has its own `border-t` (`app/sections/experience.tsx:50`), so two 1 px lines of different colours stack. Decide which to keep before inserting a section after the hero.

### 8.5 Experience

**Files**: `app/sections/experience.tsx:1-111`: data array `experiences` (`:8-42`), component (`:44-111`); mounted at `app/page.tsx:12`.

**Behaviour**
- `<section id="experience">` (`:49`): a small label "Career" (`:57`), the `h2` "Work Experience" (`:59`), then one bordered card per array entry, in array order.
- A card (`:65-104`) has an `h3` role, a company and location line, a pill with the dates and a bullet list. Nothing is clickable.
- Breakpoints: the pill sits under the role below 640 px and at the right of the same row from 640 px (`:72`).
- Themes: section, card, role and pill are themed. The label, company line and bullets are fixed greys (`:56`, `:81`, `:98-99`).

| # | Role | Company | Location | Dates | Bullets | Lines |
|---|---|---|---|---|---|---|
| 1 | Software Engineer | NewagesysIT | Kochi, India | May 2024 – Present | 9 | `:9-25` |
| 2 | Flutter Full-Stack Developer Intern | Logix Space Technologies Pvt Ltd | Kochi, India | Feb 2024 – May 2024 | 8 | `:26-41` |

- Entry 1 names three products in its bullets: SOLDDD with "Sendbird video calling" (`:17`), EASY VACAY (`:20`) and AUNTIE (`:22`). Entry 2 states its stack at `:32`.

**Rules**
- `role` is the React key (`:64`) and must be unique.
- Dates are free text, `Mon YYYY – Mon YYYY` with an en dash. "Present" is typed, not computed.
- Company names must match `app/sections/projects.tsx:16,24,32,40` exactly, because a visitor sees both and nothing links the two files.
- Do not correct brand spellings (section 8.6).

**Gotchas**
- CNT-2, CNT-3 and CNT-8: the stacks stated here disagree with the project tags. Only the owner can say which is right.
- The fixed grey text measures 4.10:1 on dark cards, below the 4.5:1 WCAG AA minimum for small text (BUG-15, TD-18). `font-bold` on the `h3` (`:75`) does nothing (BUG-9).

### 8.6 Projects

**Files**: `app/sections/projects.tsx:1-250`: three data arrays (`:11-127`); the file-private component `ProjectCard` (`:129-180`); the exported `Projects` (`:182-250`); mounted at `app/page.tsx:13`.

**Behaviour**
- `<section id="projects">` (`:187`): a small label "Portfolio" (`:196`), the `h2` "Work & Projects" (`:198`), then three groups, each an `h3`, a caption and a grid of cards.
- `ProjectCard` draws the title, a company label when the entry has a `company` (`:142`), the description, tag pills (`:149-162`) and a button row (`:163-176`). "Live URL" opens `liveUrl` and "Code" opens `repoUrl`, both in a new tab.
- Breakpoints: one column below 768 px, two columns from 768 px (`:208`, `:224`, `:240`).
- Themes: themed, except the label, captions and company label, which are fixed `text-zinc-500` (`:195`, `:205`, `:221`, `:237`, `:143`).

The three groups. Choose an array by its visible heading: the variable names lag the headings (TD-3), and the code comments at `:216` and `:232` still read "Core Products" and "Other Projects".

| Variable (lines) | Visible heading | Caption | `showRepo` |
|---|---|---|---|
| `professionalProjects` (`:11-44`) | Professional Work (`:203`) | Client & company projects (`:205`) | `false` (`:211`) |
| `coreProducts` (`:46-75`) | Independent Works (`:219`) | Independent products & apps (`:221`) | default `true` (`:227`) |
| `otherProjects` (`:77-127`) | Small Projects (`:235`) | Dashboards & landing Pages (`:237`) | default `true` (`:243`) |

The `"#"` sentinel (a placeholder value with a special meaning) and the `showRepo` flag:

- The one-character string `"#"` in `liveUrl` or `repoUrl` means "no such link".
- It is filtered in exactly two places, both in `ProjectCard`: `:164` (`project.liveUrl !== "#"`) hides "Live URL", and `:170` (`showRepo && project.repoUrl !== "#"`) hides "Code".
- `showRepo` is a `ProjectCard` prop, default `true` (`:131`). Only the Professional Work grid passes `false` (`:211`), so "Code" never shows there, whatever `repoUrl` holds.

Project inventory on the working tree of 2026-10-11, after the changes recorded in the newest entry of section 18: 15 cards, 13 "Live URL" buttons, 7 "Code" buttons. Every URL in the table returned HTTP 200 when requested on 2026-10-11.

| Group | Title (line) | Company | Tags | Live URL | Repository URL |
|---|---|---|---|---|---|
| Professional Work | SOLDDD (`:13`) | NewagesysIT | Next.js, Sendbird video call, In-App Subscription | `https://solddd.com/` | `"#"` |
| Professional Work | EASY VACAY (`:21`) | NewagesysIT | React.js, Stripe, Social Auth | `https://easyvacayplanner.com/` | `"#"` |
| Professional Work | AUNTIE (`:29`) | NewagesysIT | React Native, Socket.io, Postman API | `https://www.auntie-app.com/` | `"#"` |
| Professional Work | EVENT APP (`:37`) | Logix Space Technologies Pvt Ltd | Flutter, Node.js, SQL, Express | `"#"` | `"#"` |
| Independent Works | PinNote (`:48`) | none | Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Drizzle ORM, Auth.js, Nodemailer, Vitest, Playwright, Vercel | `https://pinnote-demo.vercel.app` | `"#"` |
| Independent Works | Ulsaham Entertainments (`:55`) | none | Astro, React, Next.js, TypeScript, MongoDB, Razorpay, Vercel | `https://www.ulsaaham.com/` | `"#"` |
| Independent Works | Royal King Water Supply (`:62`) | none | Next.js, React, TypeScript, MongoDB, NextAuth, TanStack Query, Cloudinary, PWA, Turborepo | `https://royalkingadmin-web.vercel.app/` | `"#"` |
| Independent Works | Bus Booking Platform (`:69`) | none | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Playwright, Turborepo | `https://excelcabs.vercel.app/` | `"#"` |
| Small Projects | JVS Water Supply (`:79`) | none | TailwindCSS, Turborepo, MongoDB | `https://jv-swatersupply-web.vercel.app/` | `https://github.com/jeff1999git/JVSwatersupply` |
| Small Projects | Scroll Animation Website (`:86`) | none | Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Canvas | `https://testing-repo-tan-ten.vercel.app/` | `https://github.com/jeff1999git/testing-repo` |
| Small Projects | BookNGo (`:93`) | none | React, Node.js, PostgreSQL | `https://bookngo-one.vercel.app/` | `https://github.com/jeff1999git/Bookngo` |
| Small Projects | NoWaitr (`:100`) | none | ImageKit, QRCode.react, Resend API | `"#"` | `https://github.com/jeff1999git/NoWaitr` |
| Small Projects | DD Ammini (`:107`) | none | Next.js, Node.js, Vercel | `https://dd-aminni.vercel.app/` | `https://github.com/jeff1999git/DDAminni` |
| Small Projects | Flavory (`:114`) | none | React Native, Firebase | `https://flavory-nu.vercel.app/` | `https://github.com/jeff1999git/Flavory` |
| Small Projects | Seffer Exports (`:121`) | none | Next.js, Tailwind CSS | `https://seffer-exports.vercel.app/` | `https://github.com/jeff1999git/SefferExports` |

- Spellings are recorded as written and must not be "corrected". SOLDDD has three D's on the owner's instruction of 2026-10-11 (it read SOOLDD before commit `a8e9168`). Some titles differ from their own URLs (DD Ammini, BookNGo, JVS Water Supply, Scroll Animation Website, Bus Booking Platform), and tag spellings vary between cards (`React.js` and `React`, `TailwindCSS` and `Tailwind CSS`).
- The owner set the tags of the first three cards in commit `50ac264`.
- The Ulsaham Entertainments card was written on 2026-10-11 from text the owner supplied: the title, the seven tags and a description condensed from the owner's own. It took the place of NoWaitr at the top of "Independent Works", and NoWaitr moved, unchanged, to the top of the third group (then headed "Company Dashboards"). The title has one "a" after the "s"; the domain is spelled `ulsaaham` (section 9.9). Later the same day the owner moved the card to second place and set its `repoUrl` to `"#"`, so it shows no "Code" button.
- The PinNote card was added on 2026-10-11 from text the owner supplied, in the place DD Ammini held; DD Ammini moved, unchanged, to the end of the third group (then headed "Company Dashboards"). The description is condensed from the owner's text and the tags are the owner's stack list without version numbers. No link came with the text. Later the same day the owner added the live URL and moved the card to first place; `repoUrl` stays `"#"` (CNT-13, resolved).
- The Royal King Water Supply card was added on 2026-10-11 from text the owner supplied, in the place JVS Water Supply held; JVS Water Supply moved, unchanged, to the end of the third group. The owner renamed that group "Small Projects" (`:235`) in the same request; the caption under the heading still reads "Dashboards & landing Pages" (`:237`, CNT-5). The description is condensed from the owner's text, the tags are the owner's stack list without version numbers, and no link came with the text. Later the same day the owner added the live URL; `repoUrl` stays `"#"` (CNT-14, resolved).
- The Scroll Animation Website card was added by the owner on 2026-10-11 with its two links and with placeholder text copied from the Seffer Exports card; the owner then asked for its details to be fetched from the repository. The description and the six tags were written from the repository's source, read on 2026-10-11: Next.js 16, React 19, TypeScript, Tailwind CSS 4 and framer-motion, with a hero that draws a 240-frame image sequence on a canvas in step with scrolling. The owner typed the title as "Webstite"; it was corrected to "Website", and the `.git` suffix was dropped from the repository link, and both changes were reported to the owner.
- The Bus Booking Platform card was added by the owner in commit `ef1bf4a`, in the fourth place of "Independent Works", with its live link and with text copied from BookNGo; BookNGo moved, unchanged, to third place in "Small Projects". The owner then asked for the card's details to be fetched from the repository. The description and the ten tags were written from the repository's README and source, read on 2026-10-11: a Turborepo and pnpm monorepo holding a Next.js 16 app with React 19, TypeScript, Tailwind CSS 4, shadcn/ui components, TanStack Query, React Hook Form, Zod and Playwright tests. The README calls it a frontend-only clickable prototype whose services run on mock data kept in the browser, and the description says so. The product names itself Excel Cabs; the card title is the owner's. `repoUrl` is `"#"`, as the owner set it.
- The order of the cards in both lower groups is the owner's, set by hand on 2026-10-11 in the same edit. Do not re-sort them.

**Rules**
- Both URL fields are required strings (`:133`). Write exactly `"#"` for "none": an empty string is not filtered and yields a `<button>` that goes nowhere, because `Button` picks `<a>` or `<button>` by whether `href` is truthy (`components/ui/button.tsx:58`).
- `title` is the React key within its group (`:210`, `:226`, `:242`) and each tag is the key within its card (`:152`). No duplicates.
- Keep `rel="noopener noreferrer"` beside `target="_blank"` (`:165`, `:171`); `Button` does not add it (SEC-7).

**Gotchas**
- EVENT APP shows no buttons and NoWaitr shows only "Code" (CNT-6). The four cards of "Independent Works" show only "Live URL", because their `repoUrl` is `"#"`.
- Card text is searched for class names like any other text (section 9.7). On 2026-10-11 a draft description contained the word `sticky`, and the production CSS grew from 35,132 to 35,156 bytes with an unused `.sticky` rule; the description was reworded and the size went back. Compare the CSS size after editing card text.
- At 320 px wide the EVENT APP company label sticks 11 px out of its card, because it is `shrink-0` (`:143`); at 360 px it fits (BUG-11, verified in browser).
- CNT-2, CNT-3 and CNT-8 (tags against the Experience text), CNT-4 (the DD Ammini spelling), CNT-5 (the caption under "Small Projects").

### 8.7 Contact

**Files**: `app/sections/contact.tsx:1-117`: data array `contactInfo` (`:11-36`), component (`:38-117`); mounted at `app/page.tsx:14`.

**Behaviour**
- `<section id="contact">` (`:42`), fully themed; two columns from 1024 px and one column below (`:48`).
- Left: the `h2` "Let's work together" (`:51`), a paragraph, and a "Send Message" button that opens Gmail's web compose page in a new tab (`:61`).
- Right: four stacked cards (`:68-112`). Each is a link (`:71-109`) wrapped around a `Card`, with an icon, a label, the value and an up-right arrow. They grow 2% on hover (`:77`). The email card and the two profile cards open in a new tab; the phone card opens in place.

The channels, by type only. The values are personal data and are not reproduced in this handbook; section 8.11 lists the lines that hold them.

| Channel type | Card entry | Where it is clickable |
|---|---|---|
| Email | `:12-17` | its card; "Send Message" (`:61`); hero link (`app/sections/hero.tsx:117-128`) |
| Phone | `:18-23` | its card, the only `tel:` link on the page |
| LinkedIn | `:24-29` | its card; hero link (`hero.tsx:105-116`) |
| GitHub | `:30-35` | its card; hero link (`hero.tsx:93-104`) |

How the cards are links:

- Each card is wrapped in an `<a>` (`:71-76`) that takes the entry's `href` (`:16`, `:22`, `:28`, `:34`). An `href` that starts with `http` gets `target="_blank"` and `rel="noopener noreferrer"` (`:73-74`); the `tel:` link opens in place.
- The anchor is `block rounded-xl` (`:75`), so it fills the row and the keyboard focus ring follows the card's corners.
- The shared `Card` still always renders a `div` and has no `href` prop (`components/ui/card.tsx:7-11`, `card.tsx:17`), which is why the anchor wraps it (TD-13).
- Verified in browser on 2026-10-11: the section holds five anchors and the page one `tel:` link; each card's anchor covers the whole card; all five take keyboard focus in order; a click on a profile card opens a new tab with no `window.opener` and leaves the page where it was. That the phone card starts a phone program was not exercised: **unverified**.
- The three email links are the Email card, "Send Message" (`:61`) and the hero link (`app/sections/hero.tsx:118`). Each points at Gmail's web compose page with the address in the `to` parameter. They were `mailto:` links until 2026-10-11, when the owner reported that the mail link did not lead to a mail page. Verified in browser: each opens a new tab on Google's host. The test browser was not signed in and landed on the sign-in page, so the compose window itself is **unverified** (UNV-12). A visitor who does not use Gmail gets no mail program from these links; the address stays readable on the Email card.

**Rules**
- Cite the email address, phone number and profile URLs by line. They are personal data: never copy them into documentation, commit messages or logs.
- The same literals are repeated in the hero. Change every copy together (section 8.11, TD-2).
- Keep `rel="noopener noreferrer"` beside `target="_blank"` on the card anchor (`:73-74`).

**Gotchas**
- The start of an `href` decides how its card opens: `http` opens a new tab, anything else opens in place (`:73-74`). The phone card does nothing visible on a machine with no phone program.
- SEC-8: the email address and phone number are in the shipped HTML and JavaScript and in git history.
- TD-7: the `Linkedin` and `Github` icons imported at `:8` are deprecated in the installed lucide-react.

### 8.8 Footer

**Files**: `components/footer.tsx:1-30`; mounted at `app/layout.tsx:42`, after `<main>`, on every route.

**Behaviour**
- It sits in normal page flow; it is not fixed. It holds one line (`:23-25`): the copyright sign, the year, the owner's name and "All rights reserved." There are no links.
- The year is `new Date().getFullYear()`, evaluated when the component renders (`:9`).
- Breakpoints: centred below 640 px, left-aligned from 640 px (`:21`).
- Themes: only the top border is themed (`:13`). The text is fixed `text-zinc-600` (`:23`) and there is no background class, so the `body` background shows through.

**Rules**: if the footer is restyled, give it its own themed background; do not rely on `body`.

**Gotchas**: BUG-3 (a black band in light theme, verified in browser), BUG-13 (wrong year after a year boundary until the next build), BUG-15 (text contrast 2.72:1).

### 8.9 About

**Files**: `app/sections/about.tsx:1-126` (`About`, exported at `:40`). **It is not mounted.**

**Behaviour**
- It renders nothing on the site, because no file imports it. Proof: a search of `app/`, `components/`, `contexts/` and `lib/` for the word `About` finds only `about.tsx:40` and `:53`, and the imports at `app/page.tsx:1-5` do not include it.
- If mounted it would render a themed `<section id="about">` (`:44`) with:
  - the `h2` "About Me" and two generic paragraphs (`:53-68`);
  - a statistics grid from `stats` (`:10-15`): "5+ Years Experience", "50+ Projects Completed", "20+ Happy Clients", "100% Satisfaction Rate";
  - a services grid from `services` (`:17-38`): Development, Design, Performance, SEO.

**Rules**: editing this file changes nothing a visitor sees. Do not describe it as a live section, and do not mount it with its current text (section 8.11).

**Gotchas**
- TD-1: dead code. CNT-7: the statistics are template text and contradict the Experience dates (earliest start Feb 2024, `app/sections/experience.tsx:30`).
- It is still type-checked (`tsconfig.json:25-32`) and scanned by Tailwind, so it can fail a build and adds unused CSS.

### 8.10 Entrance animations as the visitor experiences them

**Files**: `components/ui/fade-in.tsx` (`FadeIn` `:23-53`, `StaggerContainer` `:61-83`, `StaggerItem` `:85-104`); header `components/navigation.tsx:19-21`; footer `components/footer.tsx:16-20`; CSS loops `app/globals.css:75-91`.

**Behaviour**
- A `FadeIn` block starts invisible and 30 px low, then fades in and rises over 0.5 s, after an optional `delay`. A `StaggerContainer` reveals its `StaggerItem` children one every 0.1 s; each starts 20 px low and takes 0.5 s (`:95-98`).
- A `FadeIn` or `StaggerContainer` starts when its first pixel enters the viewport and runs once. Nothing replays on scrolling back or on a theme change.
- Times below count from hydration (the moment the page's JavaScript takes over the server-rendered HTML), not from the start of loading.

| When | What appears | Line |
|---|---|---|
| 0 s | header slides down | `navigation.tsx:19-21` |
| 0.2 s | portrait | `app/sections/hero.tsx:33` |
| 0.3 s | name; headline | `hero.tsx:63`, `hero.tsx:140` |
| 0.4 s | role line; bio | `hero.tsx:73`, `hero.tsx:158` |
| 0.5 s | tagline | `hero.tsx:81` |
| 0.7 s | hero links | `hero.tsx:91` |
| 1.0 s | scroll arrow (from 1024 px) | `hero.tsx:178` |
| on scroll | a section's heading block, then its cards one by one | `app/sections/experience.tsx:55`, `experience.tsx:62`; same pattern in Projects (per group) and Contact |
| on scroll | Contact paragraph and button, 0.2 s and 0.4 s after its heading | `app/sections/contact.tsx:53`, `contact.tsx:60` |
| on scroll | footer line | `footer.tsx:16-20` |
| always | circle pulses on a 12 s loop; scroll arrow bounces on a 2 s loop | `globals.css:75-91` |

- Below 1024 px the hero's right column is under the left one, so any part of it below the first screen animates when scrolled to.
- Measured start of the hero heading, counted from the start of loading (verified in browser): 629 to 1,147 ms on desktop, 3,383 to 4,790 ms on an emulated slow phone (section 16).

**Rules**
- Each wrapper adds a real `div`; section 9 says where layout classes then go.
- Keep stagger containers short. The trigger belongs to the container (threshold 0, the framer-motion default, `node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs:4-7` and `:17-21`), so in a tall one the lower items finish animating before the visitor reaches them.

**Gotchas**
- BUG-1: all 35 animated elements (the header, 16 `FadeIn`, 17 `StaggerItem`, the footer line) are server-rendered with inline `opacity:0`, so content is invisible until JavaScript runs.
- BUG-14: reduced-motion settings are ignored. The source has no `MotionConfig` (framer-motion's default, `reducedMotion: "never"`, ignores the setting: `node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs:10`) and the CSS has no `prefers-reduced-motion` query.

### 8.11 How to make the common edits safely

After any edit below, check both themes at 320, 768 and 1440 px wide, and update this handbook (the tables in this section and the changelog in section 18). Section 12 explains how to run the site.

#### Add a project

1. In `app/sections/projects.tsx:11-127`, pick the array by visible heading and append `{ title, description, tags: [...], liveUrl, repoUrl }`, with `company` only in `professionalProjects`. Follow the Rules in section 8.6.
2. In Professional Work a repository link never shows (`projects.tsx:211`), and a long `company` label can overflow at 320 px (BUG-11).
3. If an Experience bullet names the project (`app/sections/experience.tsx:17,20,22`), keep the name and stack consistent.
4. A new group needs a new array and a copy of a heading block and grid (`projects.tsx:217-230`). Every grid but the last keeps `mb-20`.

There are no images, shared types or tests to update.

#### Add an experience entry

1. Insert an object into `experiences` (`app/sections/experience.tsx:8-42`), newest first, following the Rules in section 8.5.
2. If two jobs share a title, change the key at `experience.tsx:64` to combine company and role.
3. When a job ends, replace "Present" by hand (`experience.tsx:13`).
4. Check that the hero role line (`app/sections/hero.tsx:77`) and the page title and description (`app/layout.tsx:14-15`) still fit.

#### Change contact details

There is no shared constants file (TD-2). A search of `app/`, `components/`, `contexts/` and `lib/` for the email address, `tel:` and the two profile hosts finds only the lines below.

| Detail | Every place it is written |
|---|---|
| Email address | `app/sections/hero.tsx:118`; `app/sections/contact.tsx:15` (display), `contact.tsx:16`, `contact.tsx:61` |
| Phone number | `contact.tsx:21` (display, spaced), `contact.tsx:22` (`tel:` form, no spaces) |
| LinkedIn profile | `hero.tsx:106`; `contact.tsx:27` (display handle, shorter than the one in the URL), `contact.tsx:28` |
| GitHub profile | `hero.tsx:94`; `contact.tsx:33` (display handle), `contact.tsx:34` |
| GitHub account name inside repository URLs | `app/sections/projects.tsx:83,90,97,104,111,118,125` |
| Owner name | `hero.tsx:52` (alt text), `hero.tsx:67-69`, `hero.tsx:163`; `components/navigation.tsx:38`; `components/footer.tsx:24`; `app/layout.tsx:14-15` |

Old values stay in git history (SEC-8). The `href` values at `contact.tsx:16,22,28,34` are what the contact cards open: keep each in step with the value displayed on the line above it.

#### Add a nav link and its section

The anchor is wired in four places:

1. `components/navigation.tsx:8-12`: add `{ href: "#new-id", label: "..." }`.
2. A new `app/sections/<name>.tsx`: start with `"use client";`, call `useTheme()`, and render `<section id="new-id">` with the shell at `app/sections/experience.tsx:48-53`.
3. `app/page.tsx`: import it beside lines 1-5 and place it among lines 10-14.
4. `app/sections/hero.tsx:180`: the scroll arrow targets `#experience`. Repoint it if another section becomes the first after the hero.

Ids in use are `experience`, `projects`, `contact`, and `about` in the unmounted file. The link shows only from 768 px (BUG-7). Renaming an id touches the same places.

#### Re-mount About

1. Rewrite the placeholder content first: `stats` (`app/sections/about.tsx:10-15`), `services` (`about.tsx:17-38`) and the paragraphs (`about.tsx:56-68`). See CNT-7.
2. In `app/page.tsx`, add `import { About } from "@/app/sections/about";` and place `<About />` inside the wrapper at lines 9-15.
3. Add `{ href: "#about", label: "About" }` to `navLinks` (`components/navigation.tsx:8-12`). The section already has that id (`about.tsx:44`).
4. Decide whether the hero bio (`app/sections/hero.tsx:162-171`) still belongs. If About becomes the first section after the hero, repoint the scroll arrow and settle the double line (section 8.4).
5. Update section 8.9, TD-1 and CNT-7 here, and `README.md` and `THEME_GUIDE.md`.

#### Replace the portrait

1. Change `src` at `app/sections/hero.tsx:51`, and the alt text at `hero.tsx:52` if needed.
2. For a different remote host, add it to `remotePatterns` (`next.config.ts:8-13`), or `next/image` rejects it. A file in `public/` with a root-relative `src` needs no entry (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:63-71`); this has not been tried in this repository.
3. The image is fitted inside a 160 x 210 px box, 200 x 260 px from 640 px (`hero.tsx:46`), aligned to the bottom (`hero.tsx:55`). A transparent cut-out keeps the current look, because the slanted block sits behind it.
4. Leave `fill`, `sizes` (`hero.tsx:54`) and `priority` (`hero.tsx:56`) unless the box size changes (TD-6).

## 9. UI foundation and coding conventions

Verified in code at commit `50ac264` unless stated. `app/globals.css` line numbers are the working tree's, two higher than at `50ac264` from line 2 on (section 9.7).

Path shorthand, this section only: `hero.tsx`, `experience.tsx`, `projects.tsx`, `contact.tsx`, `about.tsx` are in `app/sections/`; `button.tsx`, `card.tsx`, `container.tsx`, `text.tsx`, `fade-in.tsx` in `components/ui/`; `navigation.tsx`, `footer.tsx`, `theme-separator.tsx` in `components/`; `theme-context.tsx` in `contexts/`; `globals.css`, `layout.tsx` in `app/`. A bare `:NN` continues the file named before it. A *utility* is a Tailwind class such as `bg-black`. A *Client Component* is a component in a file starting with `"use client"`, or imported by one; only those may use state, effects, context or browser APIs.

### 9.1 Theming model

| Aspect | Fact | Where |
|---|---|---|
| State | React context holding `'dark' \| 'light'`; starts as `'dark'`, so server HTML and first client render are always dark | `theme-context.tsx:5,15` |
| Restore | An effect that runs once, after the first browser render, reads `localStorage` key `theme`; no validation (BUG-8), no `try`/`catch` (BUG-6) | `:17-23` |
| Persist | On mount and on each change: writes the key, toggles `dark` on `<html>`, swaps `bg-black text-white` and `bg-white text-black` on `<body>` | `:25-36` |
| Toggle | `toggleTheme()`, called only by the header button | `:38-40`, `navigation.tsx:59-75` |
| Consume | `useTheme()` returns `{ theme, toggleTheme }`; throws outside `ThemeProvider`, which wraps the whole page | `theme-context.tsx:49-55`, `layout.tsx:36-44` |

The theme reaches the screen only through a React re-render. No CSS rule switches on it and nothing reads the operating-system preference. Each themed element picks literal classes with a ternary (`theme-separator.tsx:6-12`):

```tsx
const { theme } = useTheme();
return (
  <div className={`w-full border-t ${
    theme === 'dark' ? 'border-white/20' : 'border-black/20'
  }`} />
);
```

- So every theme-aware component is a Client Component under `ThemeProvider`.
- The prerendered HTML (generated once, at build time) is always dark. A stored light preference applies only after hydration, when React attaches to that HTML in the browser (BUG-5).
- `dark` on `<html>` does nothing: no `.dark` selector in the built CSS, no `dark:` variant in the source, no `@custom-variant dark` in `globals.css` (TD-9).
- `dark:` utilities would follow the operating system, not the toggle: Tailwind 4's built-in `dark` variant is `@media (prefers-color-scheme: dark)` (confirmed by compiling `dark:bg-black` in memory with the installed 4.2.2). Do not add them without redesigning theming.
- The colour classes on `<body>` change nothing: they lose to the `body` rule of section 9.2, so in light theme the computed background stays `rgb(0, 0, 0)` (verified in browser, BUG-3). Light theme looks light only because each section paints its own background; the footer has none and shows black. The static classes, `min-h-screen transition-colors duration-300` (`layout.tsx:35`), set a minimum height; their transition never has a colour change to animate.

### 9.2 The cascade-layer rule

Tailwind 4 puts every utility in `utilities`, the last of its cascade layers (`@layer theme, base, components, utilities;` at `node_modules/tailwindcss/index.css:1`; the build adds a `properties` layer in front). CSS outside any layer ("unlayered") beats all layered CSS, whatever the specificity or order; only `!important` reverses that. Every style rule in `globals.css` is unlayered (confirmed in the built CSS), so each silently beats any utility that sets the same property on the same element.

| `globals.css` lines | Unlayered rule | Utilities that lose, and the effect today |
|---|---|---|
| 26-30 | `*, *::before, *::after { box-sizing }` | `box-content` (unused) |
| 32-36 | `html { scroll-behavior: smooth }`, font smoothing | `scroll-auto`; smooth scrolling is always on |
| 38-44 | `body { background; color; font-family; font-feature-settings; line-height }` | Background, text-colour, font-family and `leading-*` utilities on `<body>` (BUG-3) |
| 46-49 | `::selection { background-color; color }` | `selection:*` (BUG-4) |
| 52-56 | `h1`-`h6 { font-weight: 600; line-height: 1.2; letter-spacing: -0.025em }` | Font-weight, `leading-*`, `tracking-*` on headings (BUG-9): `font-bold` renders at 600, `leading-[1.1]` is ignored (`hero.tsx:64`, `text.tsx:33`) |
| 58-60 | `p { line-height: 1.7 }` | `leading-*` on `<p>`, for example `leading-relaxed` at `text.tsx:74` |
| 63-66 | `*:focus-visible { outline; outline-offset }` | Any outline utility on a keyboard-focused element, such as `focus-visible:outline-none` (BUG-4) |
| 69-73 | `a, button, [role="button"] { transition-property; transition-duration; ... }` | `transition-*`, `duration-*`, `ease-*` on links and buttons, for example `transition-all duration-200` at `button.tsx:31` |
| 85-91 | `.animate-orb-pulse`, `.animate-scroll-bounce` | `animate-none`, `motion-reduce:animate-none` (BUG-14) |

Lines 5-13 (`:root` variables) and 75-83 (two `@keyframes`) are unlayered too but override nothing.

Rule for global CSS from now on:

1. Never add a new unlayered rule. Put element defaults in `@layer base { ... }` and shared classes in `@layer components { ... }`, so utilities keep winning.
2. Before putting a utility on `<body>`, a heading, a `<p>`, a link or a button, check the table.
3. Do not move or delete the existing rules as a side effect: layering them restyles the whole site at once (`font-bold` headings go from 600 to 700, line-heights change, `<body>` follows the theme). That is the real fix for BUG-3 and BUG-9 and needs the owner's decision.
4. To win on one element, use the important modifier (`font-bold!`), which the installed Tailwind compiles to `!important` (checked in memory). Unused today; keep it rare.

### 9.3 How to add a new themed component correctly today

1. Place it: a primitive (a small reusable building block such as `Button`) in `components/ui/`, site chrome (header, footer) in `components/`, a page section in `app/sections/`. Kebab-case file name, named export.
2. Line 1 is `"use client";`. Call `useTheme()` from `@/contexts/theme-context`.
3. Choose classes with `theme === 'dark' ? '<dark>' : '<light>'`: complete names in both branches (section 9.7), pairs from section 9.4, and an explicit background and text colour in both, because inherited values are always white on black (BUG-3).
4. A primitive accepts `className?: string` and composes `cn(base, themed, className)`, caller last. A section uses a template literal.
5. No `dark:` variants and no token utilities such as `bg-background` (sections 9.1, 9.4). On a heading, `<p>`, link or button, check section 9.2.
6. For entrance motion wrap it in `FadeIn` or `StaggerItem` (section 9.6). Check both themes with the header toggle, then run the checks in section 16.

Illustrative example (`Badge` is not in the repository), modelled on `card.tsx:13-30` with the tag-pill colours of `projects.tsx:155-156`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  const { theme } = useTheme();
  return (
    <span className={cn(
      "px-3 py-1 text-xs rounded-full",
      theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700',
      className
    )}>{children}</span>
  );
}
```

### 9.4 Design tokens

The palette is black, white and Tailwind's `zinc` greys; there is no brand hue. Colours are raw utilities chosen per theme inside each component, not named tokens.

| Role | Dark | Light | Set at |
|---|---|---|---|
| Page background (`<body>`) | `#000000` via `--background` | same; never switches (BUG-3) | `globals.css:6,39` |
| Section background | `bg-black` | `bg-white` | `experience.tsx:51` |
| Card background | `bg-zinc-900/40` | `bg-zinc-50/80` | `card.tsx:21-22` |
| Border | `border-zinc-800`; section divider `border-zinc-800/50` | `border-zinc-200`; divider `border-zinc-200/50` | `card.tsx:21-22`, `experience.tsx:51` |
| Heading | `text-white` | `text-black` | `text.tsx:34` |
| Body text | `text-zinc-300` | `text-zinc-700` | `text.tsx:62` |
| Muted text | `text-zinc-400` | `text-zinc-600` | `text.tsx:63` |
| Muted text, not themed | `text-zinc-500` | same (TD-18, BUG-15) | `experience.tsx:98`, `projects.tsx:143` |
| Primary button | `bg-white text-black` | `bg-black text-white` | `button.tsx:36-37` |
| Focus ring | 2px solid `#ffffff` | same (BUG-4) | `globals.css:11,63-66` |
| Selection | white on `rgba(255, 255, 255, 0.15)` | same (BUG-4) | `globals.css:46-49` |

- CSS custom properties (`globals.css:5-13`) are set once and never overridden, so none follows the theme (TD-9). `--background` feeds the `body` background (`:39`); `--foreground` the `body` and selection text (`:40,48`); `--accent` the focus outline (`:64`); `--font-inter`, which `next/font` sets on `<html>`, the `body` font (`:41`). `--muted`, `--muted-foreground`, `--border` and `--accent-foreground` are read by no rule.
- `@theme inline` (`globals.css:15-24`) exposes them as utilities such as `bg-background`. No component uses one and none is in the built CSS. The one token with an effect is `--font-sans` (`:23`): Tailwind's base layer reads it as the `<html>` font family, so that is Inter too. Editing a colour variable changes only the consumers above, not the site's colours.
- Typography: Inter variable font through `next/font/google` (`layout.tsx:8-11`). Because of section 9.2, every heading has weight 600 and line-height 1.2, and every `<p>` line-height 1.7.
- Type scale: hero `h1` `text-4xl lg:text-5xl` (`hero.tsx:64`); section `Heading` `text-3xl sm:text-4xl md:text-5xl` (`text.tsx:16`); group `h3` `text-xl`; card title `text-lg`; body `text-base` or `text-sm`; eyebrow (the small label above a heading) `text-xs uppercase tracking-widest font-semibold` (`experience.tsx:56`).
- Container: `mx-auto max-w-6xl px-6 sm:px-8 lg:px-12` (`container.tsx:10`), at most 72rem wide with gutters of 24, 32 and 48 px.
- Section shell: `py-24 lg:py-32 border-t` (`experience.tsx:50`). That top padding is also what clears the fixed `h-16` header (`navigation.tsx:29`) after an anchor jump; there is no `scroll-margin`.

Breakpoints actually used are Tailwind's defaults (`node_modules/tailwindcss/index.css:330-333`); `2xl`, `max-*` variants and container queries are unused.

| Breakpoint | What changes |
|---|---|
| `sm` 640 px | Gutter 32 px; portrait 160x210 to 200x260 (`hero.tsx:46`); experience card header becomes a row (`experience.tsx:72`); headings step up |
| `md` 768 px | Nav links appear (`navigation.tsx:41`; none below, BUG-7); project grids go to two columns (`projects.tsx:208`); section headings step up again (`text.tsx:16`) |
| `lg` 1024 px | Gutter 48 px; sections `py-32`; hero becomes three columns with its vertical rule and scroll arrow (`hero.tsx:30,134,178`); hero headings step up (`hero.tsx:64,141`); contact goes to two columns (`contact.tsx:48`) |
| `xl` 1280 px | Only the hero `h2` grows (`hero.tsx:141`) |

### 9.5 Reusable components

Unless stated, each takes `children: React.ReactNode` and `className?: string` (only other props are listed), is a named export and is a Client Component. Uses inside `about.tsx`, a section file that no page imports (TD-1), are not listed.

| `Button` | `button.tsx` |
|---|---|
| Props | `variant?: "primary" \| "secondary" \| "outline" \| "ghost"` = `"primary"`; `size?: "sm" \| "md" \| "lg"` = `"md"`; `href?`, `target?`, `rel?: string`; `onClick?: () => void` |
| Renders | `motion.a` if `href` is truthy, else `motion.button` (`:58`), themed per variant (`:33-50`) |
| Used at | `projects.tsx:165,171`, `contact.tsx:61`; always a link |
| Limits | Forwards no other prop, so no `type`, `disabled` or `aria-*` (TD-13); `rel` is not enforced (SEC-7); never `next/link` |

| `Card` and its parts | `card.tsx` |
|---|---|
| Props | `Card`: `hover?: boolean` = `true`. The parts add none |
| Renders | `Card`: themed `motion.div`, `rounded-xl border p-6` (`:19-22`). `CardHeader`: `div`. `CardTitle`: `h3`. `CardDescription`: muted `p`. `CardContent`: `div`, no padding |
| Used at | `projects.tsx:138-178` (all five exports), `contact.tsx:77-108` (`Card` and `CardContent`) |
| Limits | Always a `div`; cannot be a link (TD-13). `hover={false}` removes the scale only, not the CSS hover colours |

| `Container` | `container.tsx` |
|---|---|
| Props | none extra |
| Renders | `div` with the classes given in section 9.4 (`:10`) |
| Used at | Header, footer and every section |
| Limits | One width. It has no `"use client"`, so it also works in a Server Component |

| `Heading` | `text.tsx` |
|---|---|
| Props | `as?: "h1"`-`"h6"` = `"h2"`; `size?: "xl" \| "lg" \| "md" \| "sm"` = `"lg"`; `gradient?: boolean` = `false` |
| Renders | Chosen tag with `font-bold tracking-tight`, the heading colour and `sizeMap[size]` (`:14-19`) |
| Used at | `experience.tsx:59`, `projects.tsx:198`, `contact.tsx:51`, defaults only; the hero uses raw `h1` and `h2` |
| Limits | `font-bold` is ignored (section 9.2); `as`, the other sizes and `gradient` were never exercised |

| `Text` | `text.tsx` |
|---|---|
| Props | `variant?: "default" \| "muted" \| "accent"` = `"default"`; `size?: "sm" \| "md" \| "lg"` = `"md"` |
| Renders | `p` with the variant colour, the size and `leading-relaxed` (`:61-74`) |
| Used at | `contact.tsx:54` |
| Limits | Always a `p`; `leading-relaxed` is ignored (section 9.2) |

| `FadeIn` | `fade-in.tsx` |
|---|---|
| Props | `delay?: number` = `0`; `duration?: number` = `0.5` (seconds); `direction?: "up" \| "down" \| "left" \| "right" \| "none"` = `"up"`; `once?: boolean` = `true` |
| Renders | `motion.div` starting at `opacity: 0` with a 30 px offset, visible once it enters the viewport (`:33-47`) |
| Used at | 16 places in the four sections; only `delay` and `className` are passed |
| Limits | See section 9.6 |

| `StaggerContainer` | `fade-in.tsx` |
|---|---|
| Props | `staggerDelay?: number` = `0.1` (seconds) |
| Renders | `motion.div` with `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true }}` (`:68-70`) |
| Used at | `experience.tsx:62`, `projects.tsx:208,224,240`, `contact.tsx:68` |
| Limits | Fires as a whole when its first pixel is visible, so items low in a tall list animate unseen |

| `StaggerItem` | `fade-in.tsx` |
|---|---|
| Props | none extra |
| Renders | `motion.div` with variants `hidden` (`opacity: 0, y: 20`) and `visible` (`:94-98`) |
| Used at | Child of every `StaggerContainer`; 17 on the page |
| Limits | Animates only inside a `StaggerContainer` |

| `ThemeSeparator` | `theme-separator.tsx` |
|---|---|
| Props | none at all |
| Renders | Empty `div` with `w-full border-t` and a themed border colour (`:9-11`) |
| Used at | `app/page.tsx:11` |
| Limits | Experience's own `border-t` (`experience.tsx:50`) draws a second line under it |

| `cn` | `lib/utils.ts:4-6`, a plain function |
|---|---|
| Props | `...inputs: ClassValue[]` |
| Renders | Nothing. Returns `twMerge(clsx(inputs))`: joins conditional classes; a later Tailwind class replaces a conflicting earlier one |
| Used at | Only in `components/ui/` |
| Limits | The caller's `className` must come last to win; it cannot beat the unlayered CSS of section 9.2 |

### 9.6 Animation conventions

- Library: `framer-motion` ("Framer"), imported as `motion` in six Client Components. `AnimatePresence`, `MotionConfig` and `useReducedMotion` are not used.
- Entrance: `FadeIn` for one block; `StaggerContainer` with `StaggerItem` children for a list or grid. A section is a `FadeIn className="mb-16"` intro, then a stagger group (`experience.tsx:55-64`).
- Trigger: `whileInView`, once, at Framer's default threshold of zero. Motion starts when the first pixel of the wrapper is visible and never reverses.
- Timing: 0.5 s; `FadeIn` rises 30 px, `StaggerItem` 20 px at 0.1 s intervals. The hero orders its blocks with `delay` 0.2 to 1.
- Elsewhere: `whileHover` and `whileTap` scales on buttons, cards and header controls; a header slide-in (`navigation.tsx:19-21`); an inline copy of the fade in the footer (`footer.tsx:16-20`); two hand-written keyframe classes for the hero orb and scroll arrow (`globals.css:75-91`).

**What the server renders.** The page is prerendered with all its content, and Framer writes each `initial` state as an inline style. The HTML therefore carries 35 elements with `opacity:0`: 16 `FadeIn` wrappers, 17 `StaggerItem` wrappers, the footer block and the header (counted in the prerendered HTML; verified in browser). The text is there but invisible until JavaScript hydrates; there is no `<noscript>` fallback (BUG-1).

**The wrapper-div consequence.** `FadeIn`, `StaggerContainer` and `StaggerItem` each render a real `div` around their children.

- Layout classes (margin, grid, absolute positioning) go on the wrapper through `className`, not on the child (`experience.tsx:55`, `hero.tsx:178`).
- The wrapper, not your element, is the flex or grid child. Content that must fill its cell needs `h-full` (`projects.tsx:138`).
- Tailwind's `translate` and `scale` utilities are safe on a wrapper: Tailwind 4 emits separate `translate` and `scale` properties, while Framer writes an inline `transform` (`hero.tsx:178`).
- A `StaggerItem` outside a `StaggerContainer` does not animate; it has no `initial` of its own.

### 9.7 How Tailwind finds class names here

- There is no `tailwind.config.*`. `postcss.config.mjs:3` loads `@tailwindcss/postcss` and `globals.css:1` imports Tailwind.
- The scanner reads files as plain text and emits CSS for each complete class name it sees; it never runs the code. **Write class names as complete literal strings, in both branches of every theme ternary.** A name built from pieces (`bg-zinc-${n}`, `"text-" + size`) produces no CSS and no error. A lookup object of full literals is fine (`text.tsx:14-19`).
- Classes added by DOM code obey the same rule and must appear as complete literals, as the four `<body>` colour classes do at `theme-context.tsx:29-34` (other components happen to use the same four).
- Every non-ignored text file under the repository root is scanned, not just source. In the built CSS, `.start` exists because of the script name at `package.json:8`, and `sm:grid-cols-4` exists although only `about.tsx:71`, which no page imports, uses it. Git-ignored paths, `node_modules`, `.next`, lock files, `.log` files and binaries are skipped (skip lists read from the installed scanner).
- **Markdown at the repository root is excluded** by `globals.css:2-3`: a comment and `@source not "../*.md";`, a path relative to the CSS file. Added 2026-10-11 in commit `d1fd46b` (RES-3). Production CSS was 35,184 bytes before, including `.border-zinc-900`, a class written only in `THEME_GUIDE.md`; it is 35,132 bytes after, without it.
- **Why that line must stay.** This handbook and `THEME_GUIDE.md` are full of class names, including examples of what not to write; `README.md`, `AGENTS.md` and `CLAUDE.md` sit beside them. Without the exclusion every class name in those files would be compiled into the CSS sent to visitors, and any documentation edit could change the production stylesheet.
- The pattern covers `*.md` at the repository root only. A document in a subfolder or with another extension needs its own `@source not` line. This follows from the glob and was not tested: **unverified**.

### 9.8 Coding conventions actually followed

| Topic | Convention | Example |
|---|---|---|
| File naming | kebab-case `.tsx` or `.ts`; a file may export related components | `components/theme-separator.tsx` |
| Folders | `app/` route files; `app/sections/` page sections (not routes); `components/` site chrome; `components/ui/` primitives; `contexts/`; `lib/` | `app/page.tsx:1-5` |
| Exports | Named `export function X`; default exports only where Next.js or a tool requires one | `button.tsx:18`; default at `app/page.tsx:7` |
| `"use client"` | Line 1, double quotes, semicolon, in the 13 files that use a hook or `motion`; absent from `layout.tsx`, `app/page.tsx`, `container.tsx`, `lib/utils.ts` | `footer.tsx:1` |
| Import alias | `@/` is the repository root (`tsconfig.json:21-23`); the only relative import is the stylesheet (`layout.tsx:3`) | `contact.tsx:3-9` |
| `className` | Primitives: `cn(base, theme, size, className)`. Sections and chrome: template literal with a ternary | `button.tsx:66`; `navigation.tsx:22-26` |
| Content data | Untyped module-level `const` arrays at the top of the section file; hero copy is inline JSX; no CMS, JSON or environment variable | `experience.tsx:8-42`, `projects.tsx:11-127` |
| Icons | Named imports from `lucide-react`, kept as component references in data, rendered as `<item.icon />`, sized `h-5 w-5` (`h-4 w-4` in card buttons); hero brand icons are inline `<svg>`, Contact imports lucide's deprecated ones (TD-7) | `contact.tsx:8,13,89`; `hero.tsx:102` |
| Quoting | Double quotes, semicolons, two-space indent; the theme literal is single-quoted in most files, double-quoted in two; no formatter (TD-14) | `card.tsx:20` against `experience.tsx:51` |
| Comments | Sparse: 11 JSX region labels, 4 CSS comments, one `eslint-disable`; no JSDoc | `hero.tsx:15`, `globals.css:51` |

### 9.9 Misspelled-but-real and surprising names

Every row carries the same rule: do not "fix" it without the owner. The last column says why.

| Name | Where | What looks wrong | Why it must not be "fixed" without the owner |
|---|---|---|---|
| `SOLDDD` | `projects.tsx:13`, `experience.tsx:17` | Three D's | Brand spelling given by the owner; matches `https://solddd.com/` |
| `NewagesysIT` | `experience.tsx:11`, `projects.tsx:16,24,32` | One word, capital `IT` | Employer name as the owner writes it |
| `DD Ammini` | `projects.tsx:107` | Live URL has `dd-aminni` (`:110`), repository `DDAminni` (`:111`) | Both links work; the right spelling is CNT-4 |
| `JVS Water Supply` | `projects.tsx:79` | Live URL `jv-swatersupply-web` (`:82`), repository `JVSwatersupply` (`:83`) | Real deployment and repository names; editing them breaks the links |
| `BookNGo`, `NoWaitr`, `Flavory` | `projects.tsx:93,100,114` | Unusual capitals and spellings; repository `Bookngo` (`:97`) | Product names |
| `Ulsaham Entertainments` | `projects.tsx:55` | The title has one "a" after the "s", while its domain is spelled `ulsaaham` (`:58`) | Both spellings are the owner's, given together on 2026-10-11; the title read "Ulsaaham" before that. The repository link, spelled like the domain, was taken off the card by the owner on 2026-10-11 |
| `Scroll Animation Website` | `projects.tsx:86` | Its deployment and its repository are both named `testing-repo` (`:89-90`) | Real deployment and repository names; editing them breaks the links. The title was first typed "Webstite" (CNT-15) |
| `Bus Booking Platform` | `projects.tsx:69` | The product names itself Excel Cabs, as in its live URL (`:72`); its repository has a third name and is not linked | The title is the owner's wording |
| Bio name and header brand text | `hero.tsx:163`, `navigation.tsx:38` | Short forms that differ from the site title (`layout.tsx:14`) | Owner's wording; CNT-1 |
| `coreProducts` | `projects.tsx:46,225` | Renders under "Independent Works" (`:219`); its comment says "Core Products" (`:216`) | TD-3. Choose an array by its visible heading |
| `otherProjects` | `projects.tsx:77,241` | Renders under "Small Projects" (`:235`) | TD-3; its caption is CNT-5 |
| Nav label "Connect" | `navigation.tsx:11` | Its target id is `contact` (`contact.tsx:42`) | Owner's wording; the `href` and the `id` must stay equal |
| Link text "Gmail" | `hero.tsx:127` | A Gmail web-compose link; the Contact card says "Email" (`contact.tsx:14`) | Owner's wording |
| `bg-gradient-to-br`, `bg-gradient-to-r` | `hero.tsx:16`, `text.tsx:36-37` | Tailwind 3 names; version 4 prefers `bg-linear-to-*` | Legacy aliases that 4.2.2 still compiles; a rename is cosmetic and needs a check in both themes |
| `animate-orb-pulse`, `animate-scroll-bounce` | `globals.css:85,89`; `hero.tsx:24,181` | Look like Tailwind utilities | Hand-written classes; renaming one side silently stops the animation |
| `About`, `id="about"` | `about.tsx:40,44` | A complete section that nothing imports | TD-1, CNT-7 |

### 9.10 Accessibility conventions and gaps

Conventions followed:

- Structure: `<html lang="en">` (`layout.tsx:31`); landmarks `header` with `nav`, `main` and `footer` (`navigation.tsx:18,29`, `layout.tsx:39`, `footer.tsx:12`); one `h1` (`hero.tsx:64`), an `h2` per section, `h3` for group and card titles.
- Names: the icon-only button has `aria-label="Toggle theme"` (`navigation.tsx:68`) and the icon-only link has screen-reader text (`hero.tsx:183`). Decorative inline SVGs beside visible text carry `aria-hidden="true"` (`hero.tsx:102,114`); the portrait has `alt` (`hero.tsx:52`).
- Links that open a new tab carry `rel="noopener noreferrer"` (`hero.tsx:95-96`, `projects.tsx:165,171`). One global `:focus-visible` outline covers every control (`globals.css:63-66`); no component removes it.

Gaps, by open-item ID (details in section 15):

| ID | Gap |
|---|---|
| BUG-1 | Content is invisible until JavaScript runs, and stays so without it |
| TD-13 | `Card` cannot be a link, so the contact cards wrap it in an anchor (`contact.tsx:71-109`) |
| BUG-4 | Focus ring and selection are white in both themes, so invisible in light theme |
| BUG-7 | No section navigation below 768 px |
| BUG-12 | The hero scroll arrow is not themed |
| BUG-14 | Reduced motion is ignored: Framer defaults to `reducedMotion: "never"`; smooth scrolling and the keyframe loops are unconditional |
| BUG-15, TD-18 | Dark-theme muted text and footer text are below the WCAG AA contrast threshold of 4.5:1 |
| BUG-16 | Mobile browser chrome stays black in light theme |
| SEC-7 | `Button` passes `target` through without enforcing `rel` |

Smaller gaps with no open item of their own: the toggle's label is static and it has no `aria-pressed` (`navigation.tsx:59-68`); the `nav` has no `aria-label`; there is no skip link; lucide icons render without `aria-hidden`; new-tab links are not announced as such.

Nothing has been tested with a screen reader, on a touch device, or in a browser other than Chrome: **unverified**.

## 10. Hosting and deployment

The site is one prerendered page (its HTML is generated at build time), served by the Next.js server. `vercel.json` is the only evidence that the host is Vercel; the hosting dashboard, live domain and deployed branch are **unverified** (UNV-1, UNV-2). Below, a path starting `next/dist/` is inside `node_modules/`, and `version-16.md` means `next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

### 10.1 What does not exist

Verified in code; each search was run at the repo root.

- **No native projects.** None of the 64 tracked files is under `android/` or `ios/`. The two `.node` files under `personal-portfolio/` are stray build-tool binaries (SEC-2).
- **No backend code** (route handlers, middleware, server actions). `git ls-files | grep -E "(^|/)(route|middleware|proxy)\.[a-z]+$"` prints nothing, `grep -rnE "fetch\(|axios|use server|next/server" app components contexts lib` finds nothing, and there is no `Dockerfile`.
- **No database.** `grep -nEi "prisma|mongo|sql|supabase|firebase|redis" package.json` finds nothing.
- **No CI** (an automated build or test pipeline). No `.github/` directory is tracked, and `package.json:5-11` has no `test` script.
- **No environment variables.** `grep -rnE "process\.env|NEXT_PUBLIC" app components contexts lib next.config.ts` finds nothing, and no `.env*` file exists.

### 10.2 What `vercel.json` does

Only the Vercel platform reads this file. Next.js never does, so nothing in it applies to `next dev`, `next start` or another host. It has not changed since the first commit, `df63611`. The "Effect on Vercel" column is the expected platform behaviour; none of it was observed on the host (**unverified**, UNV-2).

| Key (line) | Value | Effect on Vercel |
|---|---|---|
| `buildCommand` (`:2`) | `npm run build` | Runs `next build` |
| `devCommand` (`:3`) | `npm run dev` | Only for the Vercel command-line tool's local mode |
| `installCommand` (`:4`) | `npm install` | Installs packages; it is not `npm ci` |
| `framework` (`:5`) | `nextjs` | Selects the Next.js preset |
| `regions` (`:6`) | `["iad1"]` | Region for server functions; the app defines none |
| `headers[0]` (`:8-24`): every path | `X-Content-Type-Options: nosniff` | The browser must not guess another content type |
| | `X-Frame-Options: DENY` | The site cannot be framed anywhere; embedded previews stay blank |
| | `X-XSS-Protection: 1; mode=block` | Obsolete; current browsers ignore it (SEC-5) |
| `headers[1]` (`:25-39`): any URL with an `amp` query key | `Cache-Control: public, max-age=31536000, immutable` | The response, HTML included, is declared unchanging for one year (SEC-3) |

- Restated defaults: lines 2 to 6 are believed to repeat what the platform does anyway for a Next.js project with an npm lockfile, and `vercel-build` (`package.json:10`) is a copy of `build`. Nothing in the repo can confirm the platform's behaviour, so this is **unverified** (TD-10).
- `headers[1]` is a leftover. AMP is a format for fast mobile pages; the app has no such pages, and Next 16 removed AMP support (`version-16.md:1063-1068`).
- Not configured in any tracked file: domain, output directory, environment variables, redirects, which branch deploys, analytics, and the headers `Content-Security-Policy`, `Strict-Transport-Security`, `Referrer-Policy` and `Permissions-Policy` (SEC-5). There is no `.vercel/` directory in the working tree, and `.gitignore:37` would keep one out of git, so the repo stores no hosting project identifier.

### 10.3 The same build under `next start` or on another host

- None of the `vercel.json` headers is sent, because `next.config.ts` has no `headers()` function. Move them there to make them portable (SEC-5). Until then no local server sends them, so they cannot be checked locally.
- What travels with the app: no `X-Powered-By` header (`next.config.ts:17`), gzip (`:16`, restates the default) and the image settings (`:6-14`).
- The Next server optimizes images itself with `sharp`, an optional dependency of `next` (0.34.5 is installed; loaded at `next/dist/server/image-optimizer.js:202`). On Vercel a platform service is expected to do it (**unverified**).
- A build served by `next start` works: see section 12.2 (verified in browser).

### 10.4 What a host must provide

- **Node.js 20.9.0 or newer.** `next/dist/bin/next:24-29` exits 1 below it; `package.json:12-14` says `>=20.0.0`, which is too loose (TD-5).
- **npm.** `package-lock.json` is the only lockfile, and it includes Linux builds of the native tools.
- **A running Next server, not a static export.** The portrait uses the default `next/image` loader with a remote URL (`app/sections/hero.tsx:50-57`). That needs the image optimizer: the server's `/_next/image` endpoint, which fetches the remote image, re-encodes it (AVIF, then WebP, `next.config.ts:7`) and caches it. A static export does not support the default loader (`next/dist/docs/01-app/02-guides/static-exports.md:289`).
- **Outbound HTTPS at install and build**: the npm registry for the install, and Google Fonts because `next build` downloads the Inter font and bundles it (`app/layout.tsx:2`, `:8-11`). The installed font loader rethrows a failed download in a production build and falls back to a local font only in dev (`next/dist/compiled/@next/font/dist/google/loader.js:148-173`). An offline build was not run, so the exact failure is **unverified** (TD-16).
- **Outbound HTTPS at run time** from the server to the image host (`next.config.ts:8-13`), when the optimizer has no cached copy.
- **No environment variables or secrets.**

## 11. Patches and tooling

### 11.1 Dependency patches

There are none; every dependency runs as published. `grep -nE "overrides|resolutions|patch-package|postinstall" package.json` finds nothing, `patch-package` is not in `package-lock.json`, and there is no `patches/` directory or `.npmrc`. Record any future patch here with its reason, because a patch silently changes behaviour for the next person.

### 11.2 ESLint

- `eslint.config.mjs:1-18` is a flat config (the single-file format of ESLint 9). It extends two `eslint-config-next` presets: `core-web-vitals` (`:6`; React, hooks, import, accessibility and Next.js rules) and `typescript` (`:7`; the typescript-eslint recommended rules).
- It ignores `.next/**`, `out/**`, `build/**` and `next-env.d.ts` (`:9-15`); the presets already ignore the same four.
- Whole-repo lint (`./node_modules/.bin/eslint .`) fails (BLK-2) because an ignore pattern is relative to the config file: `.next/**` covers only the root `.next/`. The 12 stale `.js` build chunks tracked under `personal-portfolio/.next/` (SEC-2) are linted as source and produce all 209 errors and 3,057 warnings; the 20 real source and config files produce none. The fix, once the owner approves, is to remove that directory from git or add `personal-portfolio/**` to `globalIgnores`.
- Nothing lints automatically: `next build` does not lint (`version-16.md:1095`), `npm run lint` is broken (BLK-1), and there is no CI or git hook.

### 11.3 TypeScript

`tsconfig.json` settings that matter:

- `strict` (`:7`) and `noEmit` (`:8`): type errors fail `next build`; `tsc` only checks types and writes no JavaScript, because the bundler does the compiling.
- `isolatedModules` (`:13`): each file is compiled on its own, so re-export a type with `export type` and prefer `import type` for type-only imports.
- `incremental` (`:15`): `tsc` writes `tsconfig.tsbuildinfo` in the repo root.
- `paths` (`:21-23`): the `@/*` alias is the repo root; there is no `src/`.
- `include` (`:25-32`): `.ts`, `.tsx`, `.mts` and the generated route types under `.next/`. No `.js`, so the stale chunks are not checked.
- There is no `typecheck` script. The check runs inside `next build`, or alone with the command in section 12.2.

### 11.4 PostCSS and Tailwind wiring

- `postcss.config.mjs:3` registers the only plugin, `@tailwindcss/postcss`; Turbopack, the default bundler in Next 16, loads that config by itself (`next/dist/docs/01-app/03-api-reference/08-turbopack.md:99`). `app/globals.css:1` is `@import "tailwindcss";`, imported once at `app/layout.tsx:3`. There is no `tailwind.config.*` file: Tailwind 4 is configured in CSS (`@theme inline`, `app/globals.css:15-24`, section 9).
- Tailwind finds class names by scanning every non-ignored text file under the repo root as plain text. Write class names as complete literal strings; a name assembled at run time gets no CSS.
- Keep `@source not "../*.md";` (`app/globals.css:3`, comment on line 2; added 2026-10-11 in commit `d1fd46b`). It keeps class names quoted in root-level Markdown, this handbook included, out of the shipped CSS: 35,184 bytes before, with a class found only in `THEME_GUIDE.md`; 35,132 bytes after. Other root files are still scanned: the built CSS has an unused `.start` rule, and the only bare `start` token in the tracked source and config files is the script name at `package.json:8`.

### 11.5 Editor and agent settings tracked in git

- `.claude/settings.json:1-9`: an allow-list for the Claude Code agent. Three shell patterns run without a prompt: the local ESLint binary with `app` as its first path (`:4`) and two `grep -E` file-extension filters (`:5-6`). The repo pre-approves nothing else: install, build, commit and push still ask the user.
- `.vscode/settings.json:1-3`: `claudeCode.useTerminal: true`. Going by its name, it makes the Claude Code extension run in the editor's terminal (**unverified**). No effect on the build.
- `AGENTS.md` holds the rules for AI coding agents, including the handbook-upkeep rule (section 0). `CLAUDE.md` is one line, `@AGENTS.md`, so that Claude Code loads it. Both were added on 2026-10-11 in commit `d1fd46b`.
- Not present: `.editorconfig`, a formatter config (TD-14), git hooks, `.gitattributes`, `.nvmrc`.

### 11.6 Generated files: do not edit, do not commit

| Path | Written by | In `.gitignore`? |
|---|---|---|
| `node_modules/` | `npm ci` | Yes (`:4`), root only |
| `.next/`, with dev output in `.next/dev/` | `next build`, `next dev` | Yes (`:17`), root only |
| `next-env.d.ts` | `next dev`, `next build` | Yes (`:41`) |
| `tsconfig.tsbuildinfo` | `tsc` | Yes (`:40`) |
| A new `*.log`; a nested `.next/` or `node_modules/` | Any tool | No (SEC-6) |

- `.next/` holds build-generated key material and absolute local paths: never commit, upload or paste it (SEC-9).
- `personal-portfolio/` and `dev.log` are tracked leftovers that nothing current generates. Never stage changes to them; removal waits for the owner (SEC-1, SEC-2). Read `git status` before staging.

## 12. Build, run and release

### 12.1 First-time setup on a new machine

Needed: Git, Node.js 20.9.0 or newer with npm (checked on Node v20.11.0 and npm 10.8.1), and network access. No account, secret or `.env` file is needed.

```bash
git clone https://github.com/jeff1999git/PersonalProfile.git
cd PersonalProfile
git switch dev          # all work happens on dev
node -v                 # must print v20.9.0 or newer
npm ci                  # exact versions from package-lock.json
npm run dev             # dev server at http://localhost:3000; leave it running
# in a second terminal:
npm run build           # production build into .next/
npx next start -p 3100  # production server at http://localhost:3100
npx tsc --noEmit -p tsconfig.json                        # type check; run it after dev or build
./node_modules/.bin/eslint app components contexts lib   # lint
```

- In PowerShell, lint with `npx eslint app components contexts lib`; it runs the same local binary.
- `npm ci` was not run for this handbook. The lockfile's root block matches `package.json`, so it is expected to work.
- Network access: GitHub (clone), the npm registry (install), Google Fonts and the Next.js telemetry endpoint (dev and build), and the image host (from the server, at run time).

Pitfalls:

- **Stale local `main`.** In the owner's checkout, local `main` is 22 commits behind `origin/main` and still holds the site as it was at the first commit, `df63611` (TD-11). A fresh clone does not inherit this; a copied folder does. Which branch a fresh clone checks out is **unverified**, hence `git switch dev`.
- **Port in use.** With no `-p` flag and no `PORT`, `next dev` tries up to 10 higher ports and prints the one it took (`next/dist/server/lib/start-server.js:261-288`; the retry is switched on only for the default port, `next/dist/cli/next-dev.js:193`). With an explicit port it stops with "Failed to start server". `next start` never retries.
- **A second dev server is refused**, whatever the port. The first holds `.next/dev/lock`; the second prints "Another next dev server is already running." with a suggested kill command and exits 1 (`next/dist/build/lockfile.js:174-210`). See section 12.3.
- **Use `localhost`, not the loopback IP address or a LAN address.** The dev server refuses its internal `/_next` requests when their `Origin` header names any other host, and the hot-reload socket is one of them, so the page loads but stops reloading. Only `localhost`, a host passed with `-H` and hosts listed in `allowedDevOrigins` are accepted (`next/dist/server/lib/router-utils/block-cross-site-dev.js:77-108`), and that key is not set (TD-17). The guard exists only in dev, so use the production server to try the site from another device.
- **Telemetry.** `next dev` and `next build` send anonymous usage data unless `NEXT_TELEMETRY_DISABLED=1` is set or `npx next telemetry disable` has been run. Nothing in the repo switches it off; the state on each machine is **unverified**.
- **Type check on a fresh clone.** `next-env.d.ts` and the route types do not exist until `next dev` or `next build` has run. Whether `tsc` passes before that is **unverified**.

### 12.2 Command reference

| Command | What really happens | Expected result today |
|---|---|---|
| `npm run dev` | `next dev` (`package.json:6`): dev server on port 3000 or `PORT`, output in `.next/dev/` | 200 on `/`, 0 console errors (verified in browser) |
| `npm run build` | `next build` (`:7`): production build with type check and prerender; no lint | Exit 0; routes `/` and `/_not-found`, both static |
| `npm run start` | `next start` (`:8`): serves `.next/` on port 3000; needs a build | Works after a build; fails while port 3000 is taken (use the next row) |
| `npx next start -p 3100` | The same server on a free port | 200 on `/`, 404 on unknown paths (verified in browser) |
| `npm run lint` | `next lint` (`:9`): Next 16 has no `lint` command and takes the word as a project directory | Fails: "Invalid project directory provided, no such directory" (BLK-1) |
| `./node_modules/.bin/eslint app components contexts lib` | The working lint command | Exit 0, 0 errors, 0 warnings |
| `npx tsc --noEmit -p tsconfig.json` | Type check only | Exit 0, 0 errors |
| `npm run vercel-build` | `next build` (`:10`), a copy of `build` | Same as `npm run build` (TD-10) |

There is no `test` script and there are no automated tests (section 16). To pass a flag through npm, put `--` first: `npm run start -- -p 3100`.

### 12.3 Running alongside the owner's dev server

The owner usually has `npm run dev` running on port 3000 from their editor's terminal (working practice, recorded on 2026-10-11). Next 16 refuses a second dev server in the same checkout, and stopping the owner's server loses their session.

1. Check first. A listener on port 3000 (on Windows, `netstat -ano | findstr :3000`) usually means the owner's dev server is running; a `.next/dev/lock` file is a further sign.
2. Use the running server at `http://localhost:3000` for dev checks. It reloads saved files by itself.
3. Never stop, restart or kill a server you did not start. Ignore the kill command Next prints when it refuses a second dev server.
4. Safe alongside it: `npm run build` and `npx next start -p 3100`. Dev writes to `.next/dev/` and the build to `.next/`, each with its own lock (`version-16.md:918-922`). Stop the production server you started when you are done.
5. A second dev server needs a second clone in another folder.

### 12.4 Release checklist

A release is a pull request from `dev` to `main`, merged on GitHub (section 14.2). The commands are in section 12.2.

1. [ ] The change is on `dev`. `git status` shows only intended files: nothing under `personal-portfolio/`, no `dev.log`, no `.next/`.
2. [ ] The type check exits 0.
3. [ ] The working lint command exits 0 with 0 warnings. Do not use `npm run lint` (BLK-1).
4. [ ] `npm run build` exits 0 and lists `/` and `/_not-found` as static.
5. [ ] Browser check of that build (`npx next start -p 3100`) in dark theme and light theme, at a desktop width (1440) and a phone width (390). Scroll the whole page, because content below the fold stays invisible until it is scrolled into view. Expect 0 console errors, no horizontal overflow and a loaded portrait. Open any link that changed. The known defects are in section 15 (BUG-3 and BUG-4 affect light theme); do not report them as new.
6. [ ] Update this handbook as section 0 requires: changelog entry (section 18), stale sections, open items (section 15), "Last updated".
7. [ ] The owner reviews and commits. Agents do not commit, push or open pull requests unless asked (stated by the owner on 2026-10-11).
8. [ ] Push `dev`, open a pull request from `dev` to `main` and merge it with a merge commit, as pull requests 1 to 3 were. No automated check runs on it; steps 2 to 5 are the only gate.
9. [ ] Deployment: **unverified**. Whether a merge to `main` deploys production is not known (UNV-1). Confirm in the hosting dashboard that a deployment was built from the merge commit.
10. [ ] After deploy, on the live URL (**unverified**; ask the owner): the page answers 200, the change is visible in both themes and at a phone width, the portrait loads, and `curl -sI https://<live-domain>/` shows the three headers from section 10.2 (UNV-2).
11. [ ] Record the merge commit hash and pull request number in the changelog (section 18). The version is never bumped and there are no tags (TD-8), so nothing else identifies what is live.

### 12.5 Rollback

What the git history shows:

- Each release is one merge commit on `origin/main`: `a7aa55f` (pull request 1), `1b00cb3` (2) and `8a44ca7` (3, the current tip). The merge hash is the only release identifier.
- No rollback has been done before: no commit on any branch mentions a revert.
- A rollback is code only. There is no database, migration or environment variable to undo.
- The route that fits the practice: revert the merge commit through a pull request into `main` (the Revert button on the merged pull request, or `git revert -m 1 <merge-hash>` on a branch cut from `origin/main`). Never force-push `main`, and never push the stale local `main`: either would replace the release history on `origin/main`.
- A code rollback does not restore the portrait, which lives on the image host, or a response that a browser cached under the `amp` rule (SEC-3).

Two things are **unverified**: whether the host keeps earlier deployments and can promote one again from its dashboard, and whether a revert on `main` triggers a new deployment (UNV-1).

## 13. Third-party services and accounts

No service needs a secret. The repo holds no API key, token or environment variable, and a secret scan of every tracked file and of all git history, run for this handbook on 2026-10-11, found no real secret.

| Service | Used for | Configured in the repo | To set up again on a new account | Still **unverified** |
|---|---|---|---|---|
| Hosting: Vercel | Builds and serves the site | `vercel.json:2-40`; `package.json:10`, `:12-14` | Import the GitHub repository as a Next.js project; set no environment variable | Whether it is used at all; project, branch, domain, owner (UNV-1, UNV-5) |
| Image CDN: Cloudinary | Stores the hero portrait; public URL, no signing | URL literal at `app/sections/hero.tsx:51`; host allow-list at `next.config.ts:8-13` | Upload the portrait as a public image; replace the URL at `hero.tsx:51` | Owner, plan (UNV-5) |
| Font source: Google Fonts | Inter, downloaded at build and bundled | `app/layout.tsx:2`, `:8-11` | Nothing; no account | Offline build (TD-16) |
| Source hosting: GitHub | Remote `origin`, branches `dev` and `main`, pull requests | Not in tracked files; the remote is `https://github.com/jeff1999git/PersonalProfile` | Create a repository, push both branches, reconnect the host | Visibility (UNV-6); default branch, protection |
| npm registry | Dependencies | `package-lock.json` | Nothing; no account | |

- Apart from the host that serves the site, visitors' browsers contact none of these. The font is bundled, and the portrait is fetched by the server and delivered from the site's own origin. The portrait loaded in the browser checks of 2026-10-11 (verified in browser).
- An image from any other host fails at run time until that host is added to `images.remotePatterns`: the optimizer rejects the request (`next/dist/server/image-optimizer.js:597-599`). The host check in the image component runs only in dev, so the build does not catch it. Load the page after changing `hero.tsx:51` or the `images` block.
- The allow-list has no path restriction (SEC-4), so it needs no change while the image host stays the same. The account identifier in the URL at `hero.tsx:51` is not a secret, and is deliberately not reproduced here.

## 14. Deployment and console decisions already made

There are no app stores for this project. It is a website, with no store listing, signing key, bundle identifier or review process. The only "console" is the hosting dashboard, and nothing about it can be read from the repo.

### 14.1 Decided, with evidence in tracked config

- Host config written for Vercel with the Next.js preset, npm commands and region `iad1` (`vercel.json:2-6`).
- Three security headers on every path and one cache rule for `amp` URLs (`vercel.json:7-40`, section 10.2).
- Remote images from one HTTPS host only (`next.config.ts:8-13`), narrowed from any host in commit `3520172`; AVIF first, then WebP (`:7`); no `X-Powered-By` header (`:17`).
- No environment variables, analytics or server code (section 10.1).

### 14.2 Decided, with evidence in git practice

- All work is committed on `dev`. Since the first commit, `origin/main` has received only pull-request merges from `dev`: three so far, each a merge commit whose content is identical to the `dev` tip it merged.
- There are no tags, no version bumps (`package.json:3` has been `0.1.0` since the first commit) and no automated gate.
- Ten commits on `dev`, `a8e9168` to `44b9686`, are not yet on `origin/main` (BLK-3).

### 14.3 Decided by the owner (not in the code)

Sources: the owner's statements and the working session of 2026-10-11.

- The owner reviews and commits. Agents do not commit, push or open pull requests unless asked (stated by the owner).
- This handbook is updated after every change; `AGENTS.md` carries the rule (stated by the owner).
- A dev server usually runs on port 3000 and nobody else stops it (working practice, section 12.3).
- The live URL shown for SOLDDD is the production site `https://solddd.com/`, given by the owner; the earlier staging URL was replaced in commit `a8e9168`.
- Standing preference from an earlier working note, about 110 days old: "ultra-light, fast, optimised code with no bloat". Avoid new heavy dependencies. It is a recorded preference, not a measured budget (TD-15).
- Considered in that session and not done: the defects in section 15 were reported, not fixed; removing `personal-portfolio/` and `dev.log` from git waits for the owner's go-ahead because it deletes tracked files; no history rewrite has been done.

### 14.4 Unknown about the hosting console

All **unverified**; none of it can be read from the repo.

- Whether a hosting project exists, who owns it, the live URL and the domain (UNV-1, UNV-5).
- Which branch deploys production, and whether `dev` gets preview deployments.
- The Node version, build overrides, environment variables and analytics switches set in the dashboard.
- Which headers production really sends, and the effect of the `amp` rule (UNV-2). Settle with `curl -sI https://<live-domain>/`, then the same with `?amp=1`.
- Whether a pull request for the ten unreleased commits is open (BLK-3); the GitHub default branch and branch protection; the repository's visibility (UNV-6).

## 15. Known issues and open items

- IDs are stable, because other sections refer to them: never renumbered, never reused. Prefixes: `BLK` blocker, `SEC` security and privacy, `BUG` defect, `CNT` content, `TD` tech debt, `UNV` unverified, `RES` resolved. A fixed item is retired by a new `RES` row in section 15.7 that names it.
- Priority: P1 = before or with the next release, P2 = soon, P3 = when convenient.
- Evidence: "verified in browser" = seen in headless Chrome on a Windows desktop, emulated phone widths included, on 2026-10-11; "verified in code" = read at commit `50ac264`; **unverified** = not tested, or not checkable from the repository. "Phone profile" = a 390x844 viewport throttled to "Slow 4G" with a 4x CPU slowdown.
- **On 2026-10-11 only the rows in section 15.7 were fixed.** The rest were found and reported, and wait for the owner, who reviews and commits.

Most urgent, in order:

1. BLK-3: ten commits are unreleased, so `origin/main` still shows the old product name and a staging link.
2. BUG-1: the page is blank until JavaScript runs: 3.4 to 4.8 seconds on the phone profile, permanently with JavaScript off.
3. BUG-6: a browser that blocks storage gets an error screen. It is a one-file fix.
4. BLK-1, BLK-2, SEC-1, SEC-2, SEC-6: one clean-up change repairs linting and takes `personal-portfolio/` (20.7 MB) and `dev.log` out of git. It deletes tracked files, so it waits for the owner's go-ahead.
5. BUG-3, BUG-4, BUG-5: the light theme is half-applied (black footer band, invisible focus ring, dark flash on every load).

Secret scan (2026-10-11): no real secret in the tracked files or in git history. Searched every tracked text file at `50ac264` and every blob reachable from any ref (25 commits), with a `git log -S` cross-check, for cloud and payment key prefixes, private-key headers, GitHub and Slack token prefixes, the words password, secret, token, API key, authorization and bearer, and long hexadecimal or base64-like runs. The only hits were ordinary words and framework code in the tracked build chunks (SEC-2). No `.env`, key or credential file was ever tracked. Commit `d1fd46b` came after that scan; it added only documentation and two CSS lines, and the documentation was scanned for the same patterns before it was committed.

### 15.1 Blockers and release-critical

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| BLK-3 | P1 | Unreleased work: `dev` is 10 commits ahead of `origin/main` (`a8e9168` to `44b9686`; section 17.1 lists them), which still has the old SOOLDD name and staging URL and none of the docs | `app/sections/projects.tsx:13-17`; `app/sections/experience.tsx:17` | verified in code: `git rev-list --left-right --count origin/main...dev` prints `3 10` (the first 3 are pull-request merge commits that add no content). Deployed branch **unverified** (UNV-1) | Merge a pull request from `dev` to `main` (section 12) |
| BLK-1 | P1 | `npm run lint` fails: `next lint` was removed in Next 16. The build does not lint either | `package.json:9` | verified in code; output "Invalid project directory provided, no such directory: ...\lint" | Set the script to `eslint app components contexts lib` |
| BLK-2 | P1 | Whole-repo lint fails: `eslint .` lints 12 stale build chunks, because `.next/**` ignores the root folder only | `eslint.config.mjs:11` | verified in code; output 209 errors and 3,057 warnings, all in those chunks; the 20 real source and config files have none | Fix SEC-2, or ignore `"**/.next/**"` |

### 15.2 Security and privacy

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| SEC-2 | P1 | `personal-portfolio/` is tracked: 24 files, about 20.7 MB (stale dev chunks, source maps with absolute local paths, 2 Windows native binaries) | `personal-portfolio/` | verified in code (`git ls-files personal-portfolio`) | With the owner's go-ahead: `git rm -r --cached personal-portfolio`, then delete the folder |
| SEC-1 | P1 | `dev.log` is tracked and in pushed history; it holds a private network address and local filesystem paths | `dev.log:7`, `dev.log:1021`, `dev.log:16` | verified in code (the file is UTF-16: decode it before searching, or `grep` finds nothing) | With go-ahead: `git rm --cached dev.log`. A history rewrite is a separate decision; not done |
| SEC-6 | P1 | `.gitignore` gaps behind SEC-1 and SEC-2: `/node_modules` and `/.next/` are root-anchored; there is no `*.log` rule | `.gitignore:4`, `.gitignore:17` | verified in code | Use `node_modules/`, `.next/`, `*.log` |
| SEC-3 | P2 | Any URL carrying an `amp` query key is marked immutable for one year, HTML included | `vercel.json:25-39` | verified in code; effect on the host **unverified** (UNV-2) | Delete the rule |
| SEC-4 | P2 | `images.remotePatterns` allows every path on the image CDN host, so the site's image optimizer will proxy any account's images from it | `next.config.ts:8-13` | verified in code | Add a `pathname` for the owner's account folder |
| SEC-5 | P2 | No Content-Security-Policy, Referrer-Policy or Permissions-Policy. The three existing headers are set only in `vercel.json` (absent under `next start` and on any other host); `X-XSS-Protection` is obsolete | `vercel.json:8-24` | verified in code | Move them to `headers()` in `next.config.ts` and add the missing ones; test in a browser, because a policy that blocks scripts blanks the page (BUG-1) |
| SEC-7 | P3 | `Button` forwards `target` without enforcing `rel` (latent: all current call sites pass `rel`) | `components/ui/button.tsx:64-65` | verified in code | Add `rel` when `target` is `_blank` |
| SEC-8 | P3 | Contact email and phone number are literals in client source, shipped in the HTML and JavaScript, and in git history. Intentional content; removal from HEAD is not removal from history | `app/sections/contact.tsx:15`, `:21`, `:61`; `app/sections/hero.tsx:118` | verified in code | None; awareness only |
| SEC-9 | P3 | `.next/` holds build-generated key material and absolute local paths: never commit, upload or paste it. Nested `.next/` folders are not ignored (SEC-6) | `.gitignore:17` | from the secret scan (field names only; values never read) | Keep it ignored |
| SEC-10 | P3 | Next.js command-line telemetry is on by default in `next dev` and `next build`; the repo does not disable it | `node_modules/next/dist/telemetry/post-telemetry-payload.js:21` | verified in code; actual state on this machine and on the host **unverified** | Set `NEXT_TELEMETRY_DISABLED=1` if unwanted |
| SEC-11 | P3 | `next dev` and `next start` listen on all network interfaces by default, so the site is reachable from the local network | `node_modules/next/dist/bin/next:130`, `:152` | verified in code | Add `-H localhost` on an untrusted network |

### 15.3 Bugs

"Unlayered" below means a CSS rule written outside any cascade layer. Such a rule outranks Tailwind's utilities, which sit inside a layer, however specific the utility's selector is.

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| BUG-1 | P1 | All content is server-rendered at `opacity:0` and appears only after JavaScript hydrates (takes over the server HTML) | `components/ui/fade-in.tsx:33-36`, `:95`; `components/navigation.tsx:19` | verified in browser: 35 elements with inline `opacity:0`; hero heading at 3,383-4,790 ms on the phone profile; black screen with JavaScript off | Render visible by default; add motion as an enhancement |
| BUG-6 | P1 | Unguarded `localStorage` access takes the whole page down when storage is blocked | `contexts/theme-context.tsx:18`, `:26` | verified in browser: page replaced by "This page couldn't load" | `try`/`catch` around both calls |
| BUG-3 | P2 | Light theme: `body` stays black because the unlayered `body` rule beats the utility classes the theme provider adds; the footer shows as a black band | `app/globals.css:38-44`; `contexts/theme-context.tsx:33`; `components/footer.tsx:12-14` | verified in browser: computed background `rgb(0,0,0)` despite `bg-white text-black` | Drive the two CSS variables from the theme |
| BUG-4 | P2 | Light theme: keyboard focus ring and selected text are invisible | `app/globals.css:46-49`, `:63-66` | verified in browser: white 2 px outline on white; white text on a 15%-white highlight | As BUG-3 |
| BUG-5 | P2 | Returning light-theme visitors see the dark theme first on every load | `contexts/theme-context.tsx:15`, `:17-23` | verified in browser: 123-474 ms on localhost, longer on slow devices | CSS-driven theme plus a script that runs before hydration |
| BUG-7 | P2 | No section navigation below 768 px | `components/navigation.tsx:41` | verified in browser: only the brand and the toggle remain | Add a compact menu |
| BUG-9 | P2 | Unlayered `h1`-`h6`, `p` and `a, button` rules override Tailwind utilities on those elements (`font-bold` on a heading renders at weight 600) | `app/globals.css:52-56`, `:58-60`, `:69-73` | verified in code (same mechanism as BUG-3) | Wrap them in `@layer base`; re-check typography |
| BUG-14 | P2 | `prefers-reduced-motion` is ignored everywhere | `components/ui/fade-in.tsx:32-51`; `app/globals.css:33`, `:85-91` | verified in code: no `MotionConfig`, and the library default is "never" | `MotionConfig` with `reducedMotion="user"`, plus a CSS media query |
| BUG-15 | P2 | Contrast below WCAG AA (4.5:1) for muted text and footer text in dark theme | `app/sections/experience.tsx:56`, `:98`; `app/sections/projects.tsx:143`; `components/footer.tsx:23` | verified in browser: 4.10:1 on cards, 4.35:1 on black, footer 2.72:1 | `text-zinc-400` in dark theme (TD-18) |
| BUG-8 | P3 | The stored theme value is not validated | `contexts/theme-context.tsx:18-20` | verified in browser: a stored `system` renders light and is kept | Accept only `dark` or `light` |
| BUG-10 | P3 | The 404 page is the framework default; the header's hash links (such as `#projects`) go nowhere on it | no `app/not-found.tsx`; `components/navigation.tsx:9-11` | verified in browser: links resolve to `/nope#projects`. With the operating system in light mode the default page is white while the header keeps the dark theme, so the header turns grey and its links are barely visible | Add `app/not-found.tsx` linking to `/` |
| BUG-11 | P3 | At 320 px the EVENT APP company label overflows its card | `app/sections/projects.tsx:143` | verified in browser: 11 px out at 320 px, fits at 360 px | Let the label wrap |
| BUG-12 | P3 | The hero scroll arrow is not themed and turns white on hover in light theme | `app/sections/hero.tsx:181` | verified in code | Theme it like the hero links |
| BUG-13 | P3 | The footer year is computed at render in a client component whose HTML is fixed at build time: hydration mismatch after a year boundary until the next build | `components/footer.tsx:9` | verified in code; visible effect **unverified** | Rebuild each January, or set the year in an effect |
| BUG-16 | P3 | `themeColor` is fixed to black, so mobile browser chrome ignores the light theme | `app/layout.tsx:21` | verified in code | Accept, or update it from the theme effect |
| BUG-17 | P3 | Accessibility gaps: no skip link; `nav` unlabelled; theme toggle state not exposed; group titles and card titles are both `h3` | `components/navigation.tsx:29`, `:68`; `components/ui/card.tsx:50` | verified in code | Skip link, `aria-label`, `aria-pressed` |
| BUG-18 | P3 | A stagger group (cards that fade in one after another) animates when its first pixel shows, so later cards in a tall group finish before they are seen | `components/ui/fade-in.tsx:67-70` | verified in code; visual effect **unverified** | Trigger per item, or accept |

### 15.4 Content to confirm with the owner

Do not change these without being asked: the code cannot say which side is right.

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| CNT-2 | P2 | SOLDDD is built "using React Native" in Experience but tagged "Next.js" and described as a fullstack platform in Projects (after `50ac264`) | `app/sections/experience.tsx:17`; `app/sections/projects.tsx:14-15` | verified in code | Owner picks one wording |
| CNT-1 | P2 | The bio says "Jeff Joe" beside the headline name | `app/sections/hero.tsx:163` | verified in code | Owner confirms it is intended |
| CNT-3 | P2 | EVENT APP is tagged SQL while the same internship lists MongoDB | `app/sections/projects.tsx:39`; `app/sections/experience.tsx:32` | verified in code | Owner confirms the database |
| CNT-5 | P2 | The third group was renamed "Small Projects" on 2026-10-11, but its caption still reads "Dashboards & landing Pages", and none of its seven projects is a dashboard | `app/sections/projects.tsx:237`, `:77-127` | verified in browser | Owner rewords the caption |
| CNT-6 | P3 | NoWaitr says "Built and deployed" but has no live link; EVENT APP renders with no buttons at all | `app/sections/projects.tsx:101-103`, `:41-42` | verified in code | Owner adds links or rewords |
| CNT-4 | P3 | The title "DD Ammini" versus "Aminni" in its live URL and repository name | `app/sections/projects.tsx:107`, `:110-111` | verified in code; both links returned 200 | Owner confirms the title |
| CNT-7 | P3 | The unmounted About section holds template statistics that contradict the Experience timeline | `app/sections/about.tsx:10-15` | verified in code | Rewrite before any re-mount (TD-1) |
| CNT-9 | P3 | AUNTIE: Experience says chat and video; the card says chat and booking | `app/sections/experience.tsx:23`; `app/sections/projects.tsx:30` | verified in code | Owner confirms |
| CNT-10 | P3 | Flavory is tagged React Native and Firebase, but its live link is a web deployment | `app/sections/projects.tsx:116-117` | verified in code | Owner confirms |
| CNT-11 | P3 | Site title and hero say "Full-Stack Developer"; the current job title is "Software Engineer" | `app/layout.tsx:14`; `app/sections/experience.tsx:10` | verified in code | Owner confirms |
| CNT-12 | P3 | The favicon looks like the framework's template icon | `app/favicon.ico` | **unverified** (judged from its file size; not viewed) | Owner supplies an icon if wanted |
| CNT-15 | P3 | The "Code" button of the Scroll Animation Website card opens a repository named `testing-repo`, which has no description and still has the framework's template README; the site it deploys is a Formula 1 themed demo | `app/sections/projects.tsx:86-90` | verified in code (the repository's default branch, read on 2026-10-11) | Owner renames the repository and writes a README, or accepts |

### 15.5 Tech debt

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| TD-5 | P2 | `engines.node` is `>=20.0.0` but the installed Next and ESLint require `>=20.9.0` | `package.json:13` | verified in code (`engines` in `node_modules/next/package.json`) | Set `>=20.9.0` |
| TD-11 | P2 | Local `main` is 22 commits behind `origin/main` (still the template site); merge commits are never pulled back into `dev` | git refs | verified in code: `git rev-list --left-right --count main...origin/main` prints `0 22` | `git pull --ff-only` on `main`; never force-push it |
| TD-8 | P2 | Version never bumped, no tags, no CI (continuous integration), no automated tests; nothing identifies the deployed commit | `package.json:3` | verified in code | Tag releases; add a CI job for the section 16.2 checks |
| TD-15 | P2 | JavaScript payload is about 211 KB transferred for one static page, against the owner's "ultra-light" preference | client bundle | verified in browser: 8 files, 211,965 bytes transferred | Fix BUG-1 in CSS, then reconsider the animation library |
| TD-2 | P2 | Contact details and profile URLs are duplicated literals across `hero.tsx` and `contact.tsx`; no shared constants file | `app/sections/hero.tsx:94`, `:106`, `:118`; `app/sections/contact.tsx:15-34`, `:61` | verified in code | One constants module |
| TD-7 | P2 | lucide brand icons `Github` and `Linkedin` are deprecated and removed in lucide 1.0 | `app/sections/contact.tsx:8` | verified in code (`node_modules/lucide-react/dist/lucide-react.d.ts:9180`) | Inline SVGs, as `app/sections/hero.tsx:102` does, before any lucide upgrade |
| TD-12 | P2 | No `metadataBase`, Open Graph, Twitter card, robots, sitemap or manifest | `app/layout.tsx:13-16` | verified in code; look of link previews **unverified** | Add once the live URL is known (UNV-1) |
| TD-1 | P3 | `app/sections/about.tsx` is dead code: imported nowhere, yet type-checked and linted | `app/sections/about.tsx:40`; `app/page.tsx:1-5` | verified in code | Delete, or rewrite and mount (CNT-7) |
| TD-3 | P3 | Identifiers lag the UI: `coreProducts` renders as "Independent Works", `otherProjects` as "Small Projects" | `app/sections/projects.tsx:46`, `:219`; `:77`, `:235` | verified in code | Rename with CNT-5 |
| TD-4 | P3 | Five unused template SVGs in `public/` are publicly served | `public/next.svg` and four more | verified in code (no reference in source) | Delete |
| TD-6 | P3 | `priority` on `next/image` is deprecated in Next 16 in favour of `preload` | `app/sections/hero.tsx:56` | verified in code | Rename the prop; never pass both |
| TD-9 | P3 | The CSS variables and `@theme` tokens are dark-only and unused by components; the `dark` class on `<html>` is inert | `app/globals.css:5-13`, `:15-24`; `contexts/theme-context.tsx:28` | verified in code | Decide with BUG-3: make theme-aware or delete |
| TD-10 | P3 | Redundant config: `vercel-build` duplicates `build`; several `vercel.json` keys and two `next.config.ts` keys restate defaults | `package.json:10`; `vercel.json:2-6`; `next.config.ts:4`, `:16` | verified in code for Next; host defaults **unverified** | Remove after checking the host |
| TD-13 | P3 | `Button` passes through no extra props (no `aria-*`, `type`, `disabled`); `Card` cannot be a link | `components/ui/button.tsx:7-16`; `components/ui/card.tsx:7-11` | verified in code | Extend when first needed. The contact cards work around it with a wrapping anchor (BUG-2, resolved) |
| TD-14 | P3 | No formatter configured; quote style of the theme literal differs between files | `app/sections/experience.tsx:51`; `components/ui/card.tsx:20` | verified in code | Add a formatter, or leave |
| TD-16 | P3 | The production build needs outbound HTTPS to Google Fonts; an offline or firewalled build fails | `app/layout.tsx:2`, `:8-11` | verified in code (font loader); not run offline (UNV-11) | `next/font/local` if builds must work offline |
| TD-17 | P3 | `allowedDevOrigins` is not set, so opening the dev server by loopback IP or LAN address loses hot reload (live updates on save) | `next.config.ts:3-18` | verified in code; warnings at `dev.log:220`, `:231`. Whether hydration also breaks: **unverified** | Browse `localhost`, or add the key |
| TD-18 | P3 | Theme-blind colours remain: muted `text-zinc-500` in Experience and Projects, footer text | `app/sections/experience.tsx:56`, `:81`, `:98`; `app/sections/projects.tsx:143`, `:195`, `:205`, `:221`, `:237`; `components/footer.tsx:23` | verified in code | Theme them with the usual ternary |
| TD-19 | P3 | `framer-motion` is the legacy package name; the library is now `motion`, imported from `motion/react` | `package.json:17`; six import sites | verified in code (`node_modules/framer-motion/README.md:50`) | Migrate only with BUG-1 work |
| TD-20 | P3 | The "no link" marker is the exact string `"#"`; an empty string is not filtered and renders a dead button | `app/sections/projects.tsx:164`, `:170` | verified in code (latent) | Filter empty strings too |
| TD-21 | P3 | React keys are content strings (role, title, tag, label, href); a duplicate makes React warn and can duplicate or drop list items | `app/sections/experience.tsx:64`; `app/sections/projects.tsx:152`, `:210` | verified in code (latent) | Keep the values unique |
| TD-22 | P3 | No `scroll-margin`: anchors clear the fixed header only through each section's top padding; the hero height hard-codes the header height | `components/navigation.tsx:29`; `app/sections/hero.tsx:30` | verified in code; current anchors verified in browser | `scroll-mt-16` on new sections |

### 15.6 Unverified

Open questions. The last column says how to settle each.

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| UNV-1 | P1 | Live URL, domain, hosting project settings, production branch | `vercel.json` is the only sign that the host is Vercel | **unverified** | Owner reads the hosting dashboard; record in sections 10 and 14 |
| UNV-6 | P2 | Whether the GitHub repository is public or private (decides who can read SEC-1 and SEC-2) | GitHub settings | **unverified** | Owner checks |
| UNV-3 | P2 | Behaviour on real phones and tablets (layout, tap targets, performance) | whole site; `100vh` hero at `app/sections/hero.tsx:14`, `:30` | **unverified** (emulated widths only) | Run section 16.3 on a phone |
| UNV-4 | P2 | Behaviour in Safari and Firefox | whole site | **unverified** | Run section 16.3 in both |
| UNV-2 | P2 | Whether the `vercel.json` headers are applied as written and what the `amp` rule does on the host | `vercel.json:8-39` | **unverified** | Read the live response headers, with and without `?amp=1` |
| UNV-5 | P2 | Ownership and settings of the hosting and image-CDN accounts | `app/sections/hero.tsx:51` | **unverified** | Owner records them in section 13 |
| UNV-7 | P2 | Accuracy of the CV content (stacks, dates, claims) | `app/sections/experience.tsx:8-42`; `app/sections/projects.tsx:11-127` | **unverified** | Only the owner can confirm |
| UNV-8 | P3 | Whether a pull request from `dev` to `main` is open; the default branch; branch protection | GitHub | **unverified** | Look on GitHub |
| UNV-9 | P3 | How the host serves `/_next/image` (optimizer, caching, quota); whether analytics or environment variables are set in its dashboard | hosting dashboard | **unverified** | Owner checks |
| UNV-10 | P3 | Whether `npx tsc --noEmit` passes on a fresh clone, before `next-env.d.ts` exists | `.gitignore:41` | **unverified** | Try a clean clone; if it fails, run `npx next typegen` first |
| UNV-11 | P3 | That a production build really fails offline (read from the font loader, never tried) | `app/layout.tsx:2` | **unverified** | Build once with the network blocked |
| UNV-12 | P3 | That the three email links give a signed-in visitor a Gmail compose window with the address filled in, and what they do on a phone with the Gmail app | `app/sections/contact.tsx:16`, `:61`; `app/sections/hero.tsx:118` | **unverified**: the test browser was not signed in and landed on Google's sign-in page | Click each link once in a signed-in browser and once on a phone |

### 15.7 Recently resolved

The last column says what was done and what follows.

| ID | Priority | Issue | Where | Evidence | Suggested fix |
|---|---|---|---|---|---|
| RES-1 | P1 | SOOLDD renamed to SOLDDD in Experience and Projects; live URL changed from the staging host to `https://solddd.com/`. Also closes the finding that a staging URL was labelled "Live URL" | `app/sections/experience.tsx:17`; `app/sections/projects.tsx:13`, `:17` | verified in code; the new URL returned 200 | Done in `a8e9168` (2026-10-11). Release it: BLK-3 |
| RES-2 | P2 | Sendbird video calling named in the SOLDDD experience bullet and card tag; SOLDDD, EASY VACAY and AUNTIE tags and the SOLDDD description updated by the owner | `app/sections/experience.tsx:17`; `app/sections/projects.tsx:14-15`, `:23`, `:31` | verified in code | Done in `50ac264` (2026-10-11). Opened CNT-2 and CNT-8 |
| RES-3 | P2 | Class names written in Markdown no longer leak into the production CSS | `app/globals.css:2-3` | production build: CSS 35,184 bytes before, 35,132 after; `.border-zinc-900` gone. With this handbook present and the line removed: 36,555 bytes | Done 2026-10-11 in `d1fd46b` |
| RES-4 | P3 | Stale statements in `README.md` and `THEME_GUIDE.md` corrected; both now point to this handbook | `README.md`; `THEME_GUIDE.md` | verified in code | Done 2026-10-11 in `d1fd46b` |
| CNT-13 | P3 | The PinNote card had no live URL and no repository link, so it showed no buttons | `app/sections/projects.tsx:51-52` | verified in browser: the card shows "Live URL"; the URL returned 200 | The owner added the live URL on 2026-10-11, in `ef35352`. `repoUrl` stays `"#"` |
| CNT-14 | P3 | The Royal King Water Supply card had no live URL and no repository link, so it showed no buttons | `app/sections/projects.tsx:65-66` | verified in browser: the card shows "Live URL"; the URL returned 200 | The owner added the live URL on 2026-10-11, in `ef35352`. `repoUrl` stays `"#"` |
| CNT-8 | P2 | EASY VACAY is tagged "React.js" in Projects but was listed under a role titled "React Native Mobile App Developer" | `app/sections/projects.tsx:23`; `app/sections/experience.tsx:10`, `:15`, `:20` | verified in code | The owner renamed the role "Software Engineer" in `06789df` and reworded the first bullet to cover mobile and web in `e2d7e99` (2026-10-11) |
| BUG-2 | P1 | Contact cards were not links although they showed an arrow; the phone number was not tappable anywhere | `app/sections/contact.tsx:71-109` | verified in browser: five anchors in the section, one `tel:` link on the page, a profile card opens a new tab | Done 2026-10-11 in `44b9686`: each card is wrapped in an anchor with the entry's `href` |

## 16. Testing, quality baselines and debugging recipes

### 16.1 Test status

- No automated tests and no CI: no test script (`package.json:5-11`), test dependency, test file or `.github/` folder. Proof: `git ls-files` filtered for `test`, `spec`, `.github`, `jest`, `vitest`, `playwright` and `cypress` (ignoring case) returns nothing.
- The only automatic gate is the type-check inside `npm run build`. The build does not lint, and `npm run lint` is broken (BLK-1).
- Before a release: run the type-check, source lint and build rows of section 16.2 by hand, then the smoke test (section 16.3) on a production build. A green build proves types only; BUG-1 passes every static check.

### 16.2 Baselines

Measured on 2026-10-11 at `50ac264` unless a row says otherwise (Windows 11, Node v20.11.0, headless Chrome). A change that moves a number must update this table in the same change, or the next comparison is made against a stale baseline.

| Check | Command or method | Result |
|---|---|---|
| Type-check | `npx tsc --noEmit -p tsconfig.json` | exit 0, 0 errors |
| Source lint | `./node_modules/.bin/eslint app components contexts lib` | exit 0, 0 errors, 0 warnings |
| Whole-repo lint | `./node_modules/.bin/eslint .` | 209 errors, 3,057 warnings, all in 12 stale chunks under `personal-portfolio/.next/` (BLK-2); the 20 real source and config files have none |
| Lint script | `npm run lint` | fails: "Invalid project directory provided, no such directory: ...\lint" (BLK-1) |
| Build | `npm run build` | exit 0; Turbopack; routes `/` and `/_not-found`, both static; type-check runs, lint does not |
| Runtime health | load `/` and an unknown path, dev and production | 200 and 404; 0 console errors, 0 page errors, 0 failed requests; ids `experience`, `projects`, `contact`; 25 headings; 33 links; no sideways overflow at 1440, 390, 360, 320 px |
| Outbound links | request all 24 URLs | 23 returned 200 (the Gmail compose link after a redirect to Google's sign-in page); the social profile host returned its bot-block code 999 (not a dead link) |
| Page weight | production build, bytes transferred | HTML 11,341 (67,848 raw); JavaScript 8 files, 211,965 (709,890 uncompressed); CSS 1 file, 7,388; font 1 file, 48,732; portrait 13,921 on desktop, 24,853 at 2x on a phone viewport. Re-measured after the email links were changed on 2026-10-11; at `50ac264` the figures were HTML 9,948 (57,077 raw), JavaScript 210,915 (707,089) and CSS 7,394 |
| Time to visible content, desktop | production, no throttling, 16 runs | HTML parsed 34-202 ms; hero heading starts to appear 629-1,147 ms; LCP 1,092-1,564 ms |
| Time to visible content, phone profile | production, "Slow 4G", 4x CPU slowdown, 390x844, 9 runs | HTML parsed 506-577 ms; hero heading starts to appear 3,383-4,790 ms; LCP 3,972-5,400 ms. Seven more runs on the evening of 2026-10-11, while other programs kept the machine at about 30% CPU, gave 5,495-7,702 ms and 6,092-8,320 ms for a page that differs by one project card and the contact links; they are not counted in the ranges. That the machine's load is the whole cause is **unverified** |
| CSS size | production build, uncompressed | 35,184 bytes before the docs exclusion (RES-3), 35,132 after. Without the exclusion and with this handbook present it would be 36,555 |

- LCP (Largest Contentful Paint) is the moment the largest visible element is painted. The gap between "HTML parsed" and "hero heading" is the wait for JavaScript (BUG-1). The machine was busy, hence the ranges.
- The outbound-link run predates `a8e9168` and used the old staging link; `https://solddd.com/` was requested afterwards and returned 200.
- `tsc` writes `tsconfig.tsbuildinfo` into the repo root; git ignores it (`.gitignore:40`).

### 16.3 Manual smoke test

About ten minutes. Use the dev server already running at `http://localhost:3000` (never start a second one, section 16.5), or better a production build: `npm run build`, then `npx next start -p 3100`. Keep the console open. Known failures are named so nobody reports them again.

1. Load `/` at desktop width. Expect the header to slide in and the portrait, name and headline to fade in within a second or two; 0 console errors.
2. Click "Experience", "Projects", "Connect", then the brand. Expect each section top at the top of the window with its heading visible below the header; the brand returns to the top.
3. Scroll slowly to the footer. Expect every block to fade in once, and 15 project cards with 13 "Live URL" and 7 "Code" buttons. Known: EVENT APP has no buttons and NoWaitr only "Code" (CNT-6); the four "Independent Works" cards have only "Live URL".
4. Click one "Live URL", one "Code", and the hero "GitHub" and "LinkedIn": each opens a new tab. "Gmail" and "Send Message" open Gmail's compose page in a new tab. Click the four contact cards: "Email", "LinkedIn" and "GitHub" open a new tab and "Phone" opens the dialler.
5. Click the theme toggle, top right (moon while dark, sun while light). Expect every section to turn light; reload and expect light again. Known failures: black footer band (BUG-3); dark flash on reload (BUG-5); hero scroll arrow white on hover (BUG-12).
6. Press Tab from the top. Expect focus on brand, header links, toggle, hero links, with a white outline in dark theme. Known failure: in light theme the outline and selected text are invisible (BUG-4).
7. In the DevTools device toolbar choose 390 px wide, then 320 px. Expect one column and no sideways scroll. Known failures: header shows only brand and toggle (BUG-7); at 320 px the EVENT APP company label sticks 11 px out (BUG-11).
8. Open `/nope`. Expect status 404 and "This page could not be found." between the site header and footer. Known failure: the header links go nowhere (BUG-10).
9. Optional: throttle to "Slow 4G" with 4x CPU slowdown and reload. Known failure: empty hero for about 3.5 to 5 seconds (BUG-1).

Any other difference is a new finding: add it to section 15 under the next free ID.

### 16.4 Browser automation recipe

No browser driver is installed in the project (`package.json:15-33`) and none should be added: it is needed only for occasional checks, and the owner wants no extra dependencies. The 2026-10-11 checks ran like this:

1. In a temporary folder OUTSIDE the repository: `npm init -y`, then `npm install playwright-core`. This headless-browser library ships without a browser; it drove the Chrome already installed on the machine.
2. Targets: the running dev server on port 3000, and a production server from `npm run build` then `npx next start -p 3100` (safe beside the dev server). Stop only the server you started.
3. A Node script in that folder, in outline:

```js
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100", { waitUntil: "load" });
// scroll down in 500 px steps so every block fades in, then measure or capture
await browser.close();
```

| Purpose | Setting used |
|---|---|
| Desktop | viewport 1440x900, device scale factor 1 |
| Phone | viewport 390x844, device scale factor 2, `isMobile` and `hasTouch` on; also widths 360 and 320 |
| Phone performance profile | Chrome DevTools Protocol session: 1.6 Mbit/s down, 750 kbit/s up, 150 ms latency, CPU throttling rate 4 |
| Returning light-theme visitor | init script that sets `localStorage.theme` to `light` before load |
| Storage blocked | init script that redefines `window.localStorage` with a getter that throws |
| JavaScript off | context option `javaScriptEnabled: false` |

Screenshot gotchas:

- Scroll through the whole page before a full-page screenshot: content below the fold stays at `opacity:0` until scrolled into view. Scroll with `behavior: "instant"`, because the page sets smooth scrolling (`app/globals.css:33`).
- A full-page capture taller than 16,384 device pixels repeats the top of the page. Use device scale factor 1, or one screenshot per section.
- Keep scripts, screenshots and reports outside the repository, so that they are neither committed nor read by Tailwind's class scan. The 2026-10-11 scripts were temporary and are not kept; rebuild them from this recipe.

### 16.5 Debugging recipes

| Symptom | Cause | How to confirm, and what to do |
|---|---|---|
| Page is blank or content never appears (dark background, one thin line) | Every block is rendered at `opacity:0` and revealed by JavaScript (BUG-1). A script error, a blocked chunk, JavaScript off or a slow device leaves it blank | View source: the text is there. Look for a console error or a failed `/_next/static/chunks/` request. In a screenshot, the cause is not having scrolled (section 16.4) |
| "Another next dev server is already running" | Next 16 allows one dev server per checkout (lock file `.next/dev/lock`), whatever the port. The owner's is usually on port 3000 | The message gives the address and process id. Use that server; never stop one you did not start. For a second server: `npm run build` and `npx next start -p 3100`, or a second clone |
| `npm run lint` fails with "Invalid project directory" | `next lint` no longer exists; the word `lint` is read as a folder name (BLK-1) | `package.json:9`. Run `./node_modules/.bin/eslint app components contexts lib` |
| ESLint reports hundreds of errors | It ran on the whole repo and linted the stale chunks (BLK-2) | Every reported path is under `personal-portfolio/`. Lint the four source folders |
| Hot reload is dead when the dev site is opened by IP address | The dev server answers 403 to its internal requests from any origin except `localhost`, unless `allowedDevOrigins` lists it (TD-17) | The dev terminal prints "Blocked cross-origin request". Browse `http://localhost:3000` |
| Light theme looks half-applied (black footer band, invisible focus ring) | `body` and the CSS variables are dark-only; the classes added to `body` lose to the unlayered `body` rule (BUG-3, BUG-4) | DevTools: computed background of `body` is `rgb(0, 0, 0)` in light theme. Give new elements their own background and text colour for both themes |
| A utility class on a heading or paragraph does nothing | Unlayered element rules (`app/globals.css:52-73`) beat Tailwind's layered utilities whatever the specificity (BUG-9): weight, line height and letter spacing on headings; line height on paragraphs; transitions on links and buttons | DevTools shows the utility struck through under the `globals.css` rule. Change `globals.css`, or use the important form, for example `font-bold!` |
| A new class name has no effect | Tailwind generates only classes it finds as complete literal strings in scanned files. A name assembled at run time is never found; a `dark:` variant follows the operating system, not the toggle; root-level Markdown files are excluded (`app/globals.css:3`) | Search the built CSS under `.next/static/` for the class. Write both theme branches as full literals |
| Image returns HTTP 400 | The image optimizer (`/_next/image`) rejects a host missing from `images.remotePatterns` (`next.config.ts:8-13`), a quality other than 75, or a width outside its list. The build does not catch this | Open the image URL: the body names the parameter that "is not allowed". Add the host, then reload a real page |
| Build fails offline | `next/font/google` downloads the Inter font at build time (TD-16); the dev server falls back to a system font instead | The error names Google Fonts. Build with network access |
| `next-env.d.ts` changes by itself | It is generated; its import path switches between `.next/types` and `.next/dev/types` depending on whether a build or the dev server wrote it last | git ignores it (`.gitignore:41`). Never edit it; regenerate with `npx next typegen` |
| The page is replaced by "This page couldn't load" | A client-side error with no error boundary of the app's own. Known trigger: blocked storage (BUG-6). `useTheme()` outside `ThemeProvider` also throws (`contexts/theme-context.tsx:52`); its on-screen result is **unverified** | The console shows the error. Retry with site data allowed to confirm BUG-6 |
| git shows a 20 MB repository | 24 tracked files under `personal-portfolio/` (20.7 MB) plus `dev.log` (SEC-1, SEC-2). Everything else, lockfile included, is about 0.3 MB | `git ls-files personal-portfolio` lists them. Do not delete without the owner's go-ahead |

### 16.6 What has NOT been tested

- Real devices: no phone or tablet. Phone results are emulated viewports and throttling in desktop Chrome on localhost (UNV-3).
- Other browsers: nothing in Safari or Firefox (UNV-4).
- The hosted site: its URL is unknown, so headers, caching, the host's image optimizer and what production currently shows are **unverified** (UNV-1, UNV-2, UNV-9).
- Also untested: screen readers, real touch input, an offline build (UNV-11), a fresh clone on another machine (UNV-10).

## 17. History, branches and versioning

- Source: git at `44b9686`, read on 2026-10-11 (`git log --all`, `git show --stat` and every diff). There are 33 commits across all refs (a ref is a named pointer to a commit, such as a branch or `origin/main`), no tags and no stashes.
- 30 ordinary commits form one straight line, the history of `dev`. The other 3 are merge commits (two parents each) found only on `origin/main`.
- Only the merges have a message body. Elsewhere the diff is the only record of what changed, and nothing records why.
- IDs such as GR-5 are the golden rules of section 2. IDs such as BLK-3, SEC-1 or TD-8 are the open items of section 15.

### 17.1 Branch model as practised

| Ref | At | Role |
|---|---|---|
| `dev`, `origin/dev` | `44b9686` | Working branch: every ordinary commit is made here. No unpushed commits |
| `origin/main` | `8a44ca7` | Release branch; only pull-request merges from `dev` |
| `main` (local) | `df63611` | Stale: still the first commit |

There are no feature or release branches.

#### How work reaches `main`

`df63611` went to `main` directly. Everything since came through three pull requests from `dev`, each merged on GitHub with a merge commit (no squash, no rebase):

| Pull request | Merge commit | Merged | Brought to `main` | Delay after its newest commit |
|---|---|---|---|---|
| 1 | `a7aa55f` | 2026-05-02 | 17 commits, `80aa662` to `f5417f4` | about 20 hours |
| 2 | `1b00cb3` | 2026-05-02 | `5f4ec86` | 36 seconds |
| 3 | `8a44ca7` | 2026-06-22 | `3520172` | 3 minutes 35 seconds |

- Each merge holds exactly the files of the `dev` commit it merged (equal `git rev-parse <commit>^{tree}` values), so no merge changed content.
- There is no gate: no CI and no tests, and pull requests 2 and 3 were merged within four minutes of their commit, which leaves no room for review. Section 12.4 is the only checklist. The branch the host deploys is **unverified** (UNV-1).

#### What "ahead" and "behind" mean here

`git rev-list --left-right --count origin/main...dev` prints `3 10`: `dev` is 10 commits ahead of `origin/main` and 3 behind. That GitHub displays the same two numbers is **unverified**.

- The 10 ahead are unreleased work: `a8e9168`, `50ac264`, `d1fd46b`, `17149a3`, `f9422c8`, `ef35352`, `06789df`, `ef1bf4a`, `e2d7e99` and `44b9686` (BLK-3).
- The 3 behind are the merge commits. They hold nothing `dev` lacks (the common ancestor `3520172` has the same files as `8a44ca7`); they count only because `main` is never merged back into `dev`.
- Do not rebase `dev` to clear the count. A rebase gives commits new hashes and `dev` is already pushed, so it would need a force-push, all to change a number that has no effect.

#### The stale local `main`

- In this clone `main` is at `df63611`, 22 commits behind `origin/main` (TD-11). Checking it out gives the template site with placeholder content.
- It is a direct ancestor of `origin/main`, so `git switch main` then `git pull --ff-only` updates it without a new commit. Do that before branching, building or comparing from it. Never force-push it: that would delete every release from `origin/main`.
- `refs/remotes/origin/HEAD` is not set in this clone, so GitHub's default branch is **unverified** (UNV-8).

### 17.2 Versioning

- The version is `0.1.0` at `package.json:3`, repeated at `package-lock.json:3` and `:9`. It has never been bumped: `package.json` has one commit in all history, `df63611`.
- There are no tags, and no release notes other than section 18.
- Nothing reads the version (no match for `0.1.0` in `app/`, `components/`, `contexts/` or `lib/`), so the site does not show it.
- Consequence: a release is known only by its pull-request number and merge hash (section 12.5), and nothing tells which commit is live (TD-8).
- Dependencies have never changed either. The lockfile changed once (`0c03886`: 12 added `"peer": true` lines, no version change); such a diff after `npm install` is not a dependency change.

If the owner starts versioning, these are the places:

| Step | Where |
|---|---|
| Bump | `package.json:3`, with `npm version patch --no-git-tag-version` |
| Tag | The merge commit on `main`, after the pull request merges, for example `v0.1.1`. Done by the owner |
| Record | Package row in section 1 and an entry in section 18; then narrow TD-8, which also covers CI and tests |

- Keep the flag: the command also updates the lockfile, and without the flag npm makes a commit and a tag by itself, against GR-5.

### 17.3 Timeline

All 33 commits, oldest first.

- Times are as recorded: rows 14 to 18 and 20 are in UTC, the rest at +05:30. 07:54 UTC is 13:24 at +05:30, so row 20 follows row 19.
- `<account>` stands for the GitHub account name in the repository URL.
- "Placeholder" means a sample or generic value, not the owner's real one. "Unmounted" means no longer rendered, with the file kept. The "orb" is the blurred circle behind the hero.

| # | Hash | Date and time | Subject as written | What actually changed |
|---|---|---|---|---|
| 1 | `df63611` | 2026-04-14 14:48 | updates | 57 files: the template site with placeholder content (32) and the accidental files of section 17.6 (25) |
| 2 | `80aa662` | 2026-04-14 15:01 | updates | Template `AGENTS.md` and `CLAUDE.md` deleted; global CSS rules added, a universal reset among them; layout gains a `<main>` wrapper |
| 3 | `a89d2a3` | 2026-04-14 15:35 | photo updates | Owner's name in title, header, footer; hero rebuilt around a remote portrait; universal reset rolled back |
| 4 | `352595b` | 2026-04-14 15:43 | photo behind designs | "Available for work" badge removed from the hero |
| 5 | `c91d02a` | 2026-04-14 16:13 | updates | Hero re-laid out with "About Me" copy and placeholder stat cards |
| 6 | `9f05431` | 2026-04-14 16:15 | updates | Two `lg:mt-0` classes in the hero; no visible change |
| 7 | `180cfb4` | 2026-04-14 16:26 | dark theme | **Misleading:** the site was already dark. Adds the light theme: theme provider, header toggle, per-theme classes in every section |
| 8 | `6e1d976` | 2026-04-14 16:38 | updates | Hero gets profile and email links with placeholder targets |
| 9 | `92a8c18` | 2026-04-14 16:45 | updates | `THEME_GUIDE.md` added; `Button`, `Card`, `Heading`, `Text` made theme-aware; colour classes removed from `<body>` |
| 10 | `4af0167` | 2026-04-14 16:49 | theme change | About, Projects and Contact get a background per theme |
| 11 | `df21d9b` | 2026-04-14 16:56 | theme change | `Card` hover gains a scale; three sections opt out |
| 12 | `51e945f` | 2026-04-14 19:24 | updates | Theme provider: a `mounted` flag guards a second, added storage write; the original unguarded write stays |
| 13 | `07b2309` | 2026-04-14 19:32 | updates | About unmounted |
| 14 | `0c03886` | 2026-05-01 05:11 UTC | updates | Clean-up: doubled `<main>` and unused imports removed, hero brand icons inlined as SVG, theme read lazily from storage, `turbopack.root` made absolute |
| 15 | `1d8facc` | 2026-05-01 05:18 UTC | updated | Hero template copy and stat cards replaced by the headline and bio |
| 16 | `dbf8125` | 2026-05-01 07:28 UTC | enhance project and card components with improved theming and additional project details | Projects rewritten as three groups of real projects, links still `"#"`. Not in the subject: Projects background dropped |
| 17 | `c04e29d` | 2026-05-01 11:52 UTC | projects | Real project URLs; buttons hidden for `"#"`; "Live Demo" renamed "Live URL"; two group headings renamed |
| 18 | `f5417f4` | 2026-05-01 11:57 UTC | fdd | Footer credit line removed; nav label "Contact" renamed "Connect" |
| 19 | `a7aa55f` | 2026-05-02 13:07 | Merge pull request #1 from `<account>`/dev | Merge only: rows 2 to 18 |
| 20 | `5f4ec86` | 2026-05-02 07:54 UTC | add experience section and update contact information; enhance theming in projects | Experience section added; real email and phone in the contact cards. **Incomplete:** "Send Message" and the hero links stayed placeholders. Not in the subject: theme provider back to reading storage in an effect |
| 21 | `1b00cb3` | 2026-05-02 13:24 | Merge pull request #2 from `<account>`/dev | Merge only: row 20 |
| 22 | `3520172` | 2026-06-22 22:29 | enhance animations and update contact information; improve viewport settings and clean up config | Orb and scroll arrow moved from framer-motion loops to CSS keyframes; arrow retargeted to `#experience`; row 20's placeholders fixed; image hosts narrowed from any to one. Not in the subject: a tracked stale build file changed |
| 23 | `8a44ca7` | 2026-06-22 22:32 | Merge pull request #3 from `<account>`/dev | Merge only: row 22 |
| 24 | `a8e9168` | 2026-10-11 13:13 | fix: correct spelling of "SOLDDD" in experience and projects sections; update live URL accordingly | SOOLDD renamed SOLDDD; live URL moved from a staging host to `https://solddd.com/`. **Misleading:** a rebrand, not a typo fix (GR-1) |
| 25 | `50ac264` | 2026-10-11 13:22 | fix: update project descriptions and tags for SOLDDD and EASY VACAY; enhance clarity and accuracy | SOLDDD description, tags and experience bullet; EASY VACAY tag. Not in the subject: AUNTIE tag changed |
| 26 | `d1fd46b` | 2026-10-11 15:19 | Refactor code structure for improved readability and maintainability | Adds `project_context.md`, `AGENTS.md` and `CLAUDE.md`; corrects `README.md` and `THEME_GUIDE.md`; adds the docs exclusion at `app/globals.css:2-3`. **Misleading:** no code was refactored |
| 27 | `17149a3` | 2026-10-11 15:37 | Refactor code structure for improved readability and maintainability | Ulsaham Entertainments and NoWaitr cards swapped; PinNote card added and DD Ammini moved; handbook updated to match. **Misleading:** the same subject as row 26, and again nothing was refactored |
| 28 | `f9422c8` | 2026-10-11 15:41 | Refactor code structure for improved readability and maintainability | Royal King Water Supply card added and JVS Water Supply moved; third group renamed "Small Projects"; handbook updated to match. **Misleading:** the same subject as rows 26 and 27, and again nothing was refactored |
| 29 | `ef35352` | 2026-10-11 16:52 | Refactor code structure for improved readability and maintainability | The owner's reordering of the project cards and three new links; Scroll Animation Website card; handbook updated to match. **Misleading:** the same subject as rows 26 to 28, and again nothing was refactored |
| 30 | `06789df` | 2026-10-11 18:13 | fix: update job title from React Native Mobile App Developer to Software Engineer for accuracy | The role of the current job (`app/sections/experience.tsx:10`); two handbook rows updated to match |
| 31 | `ef1bf4a` | 2026-10-11 18:16 | fix: update project title and URLs for Bus Booking Platform and add duplicate entry for BookNGo | Bus Booking Platform takes BookNGo's place in "Independent Works", still with BookNGo's text; BookNGo moves to "Small Projects". **Misleading:** nothing is duplicated; there is one BookNGo card. The handbook was not updated in this commit |
| 32 | `e2d7e99` | 2026-10-11 18:27 | Refactor code structure for improved readability and maintainability | Bus Booking Platform description and tags; first bullet of the current job reworded by the owner to cover mobile and web (`app/sections/experience.tsx:15`); handbook updated to match. **Misleading:** the same subject as rows 26 to 29, and again nothing was refactored |
| 33 | `44b9686` | 2026-10-11 18:37 | Refactor code structure for improved readability and maintainability | Contact cards made into links; handbook updated to match. **Misleading:** the same subject as rows 26 to 29 and 32, and again nothing was refactored |

- Nine subjects are "updates", one is "updated" and one is "fdd". Read the diff, not the subject.
- Only `a8e9168`, `50ac264`, `06789df` and `ef1bf4a` use a `fix:` prefix. Nothing enforces a convention.

### 17.4 Phases

| Phase | Dates | Commits | Summary |
|---|---|---|---|
| 0. Before git | before the first commit | none | The app ran from a nested `personal-portfolio/` folder (`dev.log` names it 196 times); git did not record the move |
| 1. Template | 2026-04-14 | `df63611` | Template site plus the accidental files |
| 2. Polish and hero | 2026-04-14 | `80aa662` to `9f05431` | CSS pass, owner's name, portrait |
| 3. Theme system | 2026-04-14 | `180cfb4` to `07b2309` | Light theme and toggle; About unmounted |
| 4. Clean-up and bio | 2026-05-01, after a 17-day gap | `0c03886`, `1d8facc` | Lint-style fixes, real hero copy |
| 5. Real projects | 2026-05-01 to 2026-05-02 | `dbf8125` to `f5417f4`, pull request 1 | Real project data; `main` leaves the template |
| 6. Experience | 2026-05-02 | `5f4ec86`, pull request 2 | Work history; real contact details |
| 7. Animation and config | 2026-06-22, after a 51-day gap | `3520172`, pull request 3 | CSS keyframes, links fixed, config trimmed |
| 8. Rebrand | 2026-10-11, after a 111-day gap | `a8e9168`, `50ac264` | SOLDDD, production URL, tags; unreleased (BLK-3) |
| 9. Handbook | 2026-10-11 | `d1fd46b` | Handbook, agent instructions, docs corrections, docs exclusion; unreleased (BLK-3) |
| 10. Project cards | 2026-10-11 | `17149a3`, `f9422c8`, `ef35352`, `06789df`, `ef1bf4a`, `e2d7e99` | The entries of section 18 from the card swap to the Bus Booking Platform card, the job title among them; unreleased (BLK-3) |
| 11. Contact links | 2026-10-11 | `44b9686`, then uncommitted | The two newest entries of section 18; unreleased (BLK-3) |

### 17.5 Things tried and then removed or reverted

No commit message mentions a revert. Every reversal below was a new forward edit, so only the diffs show it.

| What | Added in | Removed in | Why | Lesson before trying again |
|---|---|---|---|---|
| Template `AGENTS.md` and `CLAUDE.md` (a stub: read the docs bundled with Next before coding) | `df63611` | `80aa662`, 12 minutes later | not recorded | The files of those names added on 2026-10-11 are new and unrelated. The stub's advice still holds (section 4.4) |
| Universal reset (zero margin and padding on `*`) and a transition on every element | `80aa662` | `a89d2a3`, 34 minutes later | not recorded | A rule outside the cascade layers overrides every spacing utility (section 9.2, GR-10) |
| Hero extras: "Available for work" badge, two buttons, a "CONNECT" link | badge and buttons `df63611`; link `a89d2a3` | badge `352595b`; buttons `a89d2a3`; link `6e1d976` | not recorded | The hero has a link row only (section 8.3). A status claim is CV content: ask first (GR-4) |
| "About Me" copy and placeholder stat cards in the hero | `c91d02a` | `1d8facc` | not recorded | The same numbers survive in the unmounted About file (CNT-7); do not bring them back |
| About section on the page | `df63611` | `07b2309`, file kept | not recorded | Re-mounting needs real content and updated anchors (section 8.9, TD-1) |
| lucide brand icons in the header, then in the hero | `df63611`, `6e1d976` | `180cfb4`, `0c03886` | not recorded | Draw brand marks as inline SVG. `5f4ec86` brought them back in Contact (TD-7) |
| Colour classes hard-coded on `<body>` | `df63611` | `92a8c18` | not recorded; the provider had toggled the same classes since `180cfb4` | GR-13 |
| Theme provider variants: a `mounted` flag, then storage read during the first render | `51e945f`, `0c03886` | `0c03886`, `5f4ec86` | not recorded | By the code, the second made the first browser render differ from the server HTML for a stored light theme. Test a first visit and a stored light theme before changing the provider (GR-12) |
| `turbopack.root` in `next.config.ts` | `df63611` as `"."`; absolute in `0c03886` | `3520172` | not recorded | Next asks for it when it warns about more than one lockfile (`node_modules/next/dist/lib/find-root.js:119`); the bundled docs ask for an absolute path |
| Image allow-list open to any host | `df63611` | `3520172`, one host | not recorded | Add hosts one at a time (`next.config.ts:8-13`, SEC-4) |
| framer-motion infinite loops for the orb and scroll arrow | `df63611` | `3520172`, CSS keyframes | not recorded | Keep always-running decoration in CSS (`app/globals.css:75-91`, GR-3) |
| Background classes on the Projects section | `4af0167` | `dbf8125`; restored in `5f4ec86` | not recorded | Every section must paint its own background (BUG-3) |
| Name SOOLDD and a staging live URL | `dbf8125`, `c04e29d` | `a8e9168` | Rebrand; stated by the owner on 2026-10-11 | GR-1 |
| Nested `personal-portfolio/` project folder | before the first commit | moved before `df63611`; leftovers tracked | not recorded | Section 17.6 |

- Never tried: `allowedDevOrigins` appears in no commit (`git log --all -S allowedDevOrigins` finds nothing). See TD-17.

### 17.6 Accidental commits and their status on each branch

Everything accidental arrived in the first commit, `df63611`. Nothing was added later and nothing has been removed.

| Item | Files | Bytes at `50ac264` | Open item |
|---|---|---|---|
| `dev.log`, a dev-server log | 1 | 116,012 | SEC-1 |
| `personal-portfolio/.next/dev/static/chunks/`, stale dev build output | 22 (12 `.js`, 10 `.js.map`) | 7,963,164 | SEC-2, BLK-2 |
| `personal-portfolio/node_modules/`, two Windows native binaries | 2 | 12,728,832 | SEC-2 |

- Together: 25 files and 20,808,008 bytes, 98.5% of the 21,129,240 bytes tracked at `50ac264` (`git ls-tree -r -l`).
- Status: all 25 paths are tracked on every ref: `dev`, `origin/dev`, `origin/main` and local `main`.
- Cause: `.gitignore:4` and `:17` ignore `node_modules` and `.next` at the repo root only, and no rule covers `*.log` (SEC-6).
- On disk, `personal-portfolio/` holds only those tracked files: no source and no `package.json`.
- One stale build file changed again in `3520172`, so run `git status` before staging (GR-19).
- The build errors in `dev.log` about missing icon exports came from the nested copy and do not apply to the current source (section 2.4).
- Not done as of 2026-10-11: removal was proposed and waits for the owner (GR-8). `git rm --cached` only stops future commits from carrying the files. They are in the first commit, so removing them from history means rewriting every commit (33 as of `44b9686`) and force-pushing both branches.
- No secret was ever committed: see the secret scan at the top of section 15.

## 18. Changelog

Newest first, in the shape of the template in section 0.3. Entries dated before 2026-10-11 were reconstructed from git on 2026-10-11 and point to rows of section 17.3 instead of repeating them. "Not recorded" means that neither the commit message nor the diff states it.

### 2026-10-11 · dev · Email links open Gmail's compose page instead of `mailto:` (uncommitted)
- **What:** The three email links now point at Gmail's web compose page, with the address in the `to` parameter, and open in a new tab with `rel="noopener noreferrer"`: the hero "Gmail" link (`app/sections/hero.tsx:118-120`), the "Send Message" button (`app/sections/contact.tsx:61`) and the Email contact card (`contact.tsx:16`, opened by the card's anchor). No `mailto:` link is left on the page. `hero.tsx` grew from 190 to 192 lines, so citations to it from line 119 on were shifted by 2 throughout this handbook. Sections 1, 6, 7.3, 7.4, 8.3, 8.7, 8.11, 9.9, 14, 15, 16.2, 16.3 and 17 were updated, UNV-12 was opened, and commit `44b9686` was recorded.
- **Why:** The owner reported on 2026-10-11 that the mail link did not lead to a mail page. A `mailto:` link works only on a machine with a mail program set up; without one, a click does nothing visible.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server and on a production build, at 1440 px in both themes and at 390 and 320 px: there are three Gmail links, each carrying the address that the Email card displays, and no `mailto:` link; a click on each opens a new tab on Google's host with no `window.opener` and leaves the page where it was; there are 0 console errors. The test browser was not signed in, so each tab landed on Google's sign-in page: the compose window itself is **unverified** (UNV-12).
- **Follow-ups:** Owner to review and commit. A visitor who does not use Gmail no longer gets their own mail program from these links; the address stays readable on the Email card. UNV-12. Unreleased (BLK-3).

### 2026-10-11 · dev · Contact cards made into links (`44b9686`)
- **What:** In `app/sections/contact.tsx`, each of the four cards of the Connect section is now wrapped in an anchor (`:71-109`) that opens the entry's `href`: the mail program, the dialler, and the two profile pages in a new tab with `rel="noopener noreferrer"`. The card markup is unchanged apart from its indentation. The file grew from 110 to 117 lines, so citations to it were shifted throughout this handbook. BUG-2 moved to section 15.7, and so did CNT-8, which the owner's commits `06789df` and `e2d7e99` had resolved. Sections 1, 5.1, 6, 7.3, 7.4, 8.7, 8.11, 9, 14, 15, 16.2, 16.3 and 17 were updated, and commit `e2d7e99` was recorded.
- **Why:** The owner reported on 2026-10-11 that the links in the Connect section did not work. The cards showed an arrow and a hover effect but were plain `div`s, and the `href` values in the data were never rendered (BUG-2).
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server and on a production build, at 1440 px in both themes and at 390 and 320 px: the section holds five anchors and the page one `tel:` link; each card's anchor covers its whole card; all five take keyboard focus in order; a click on a profile card opens a new tab with no `window.opener`; the layout is unchanged; there are 0 console errors. That the email and phone cards start the mail and phone programs was not exercised: **unverified**. The production CSS grew from 35,132 to 35,153 bytes because the `block` class is new to the site.
- **Follow-ups:** Committed by the owner in `44b9686`. The email card became a Gmail link afterwards (the entry above). `Card` still cannot be a link itself (TD-13). In the light theme the keyboard focus ring on the cards is invisible, as everywhere else (BUG-4). Unreleased (BLK-3).

### 2026-10-11 · dev · Bus Booking Platform card written; BookNGo moved to "Small Projects" (`e2d7e99`)
- **What:** In commit `ef1bf4a` the owner put a Bus Booking Platform card (`app/sections/projects.tsx:68-74`) in BookNGo's place in "Independent Works", with its live link and BookNGo's text, and moved BookNGo, unchanged, to third place in "Small Projects" (`:92-98`). The agent then wrote the new card's description (`:70`) and tags (`:71`) from its repository; that edit is the uncommitted part. There are now 15 cards (4, 4 and 7), with 13 "Live URL" and 7 "Code" buttons. The file grew from 243 to 250 lines, so citations to it were remapped throughout this handbook. Sections 1, 3.2, 7.3, 7.4, 8.6, 8.11, 9.9, 14.2, 14.4, 15, 16.2, 16.3 and 17 were updated, and commits `ef35352`, `06789df` and `ef1bf4a` were recorded.
- **Why:** The owner asked on 2026-10-11 for the new card's details to be fetched from GitHub.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server and on a production build, at 1440 px in both themes and at 390 and 320 px: the groups list their cards in the new order, there are 13 "Live URL" and 7 "Code" buttons, the new card does not overflow, and there are 0 console errors. The new live URL returned 200. The repository facts are verified in code from a copy of its default branch taken on 2026-10-11; the env files in it were not opened. Page weight was re-measured (section 16.2) and the production CSS is unchanged at 35,132 bytes.
- **Follow-ups:** Committed by the owner in `e2d7e99`, together with the owner's rewording of the first bullet of the current job (`app/sections/experience.tsx:15`), which closes CNT-8. The description calls the project a front-end prototype, as its README does; the owner confirms that wording. The caption under "Small Projects" still reads "Dashboards & landing Pages" (CNT-5). Unreleased (BLK-3).

### 2026-10-11 · dev · Current job title changed to "Software Engineer" (`06789df`)
- **What:** The owner changed the role of the current job at `app/sections/experience.tsx:10` from "React Native Mobile App Developer" to "Software Engineer", and updated the table in section 8.5 and the CNT-11 row in the same commit. This entry was added afterwards.
- **Why:** The commit subject says "for accuracy". Nothing else is recorded.
- **Verified:** Verified in code at `06789df`.
- **Follow-ups:** CNT-11 stays open: the site title and the hero still say "Full-Stack Developer". Unreleased (BLK-3).

### 2026-10-11 · dev · Scroll Animation Website card added; owner reordered the cards and added links (`ef35352`)
- **What:** In `app/sections/projects.tsx`, the owner reordered the two lower groups, added live links to PinNote (`:51`) and Royal King Water Supply (`:65`), set the Ulsaham Entertainments repository link to `"#"` (`:59`), and added a sixth card to "Small Projects", Scroll Animation Website (`:85-91`), with its two links and placeholder text. The agent then wrote that card's description (`:87`) and tags (`:88`) from its repository, corrected "Webstite" to "Website" in the title (`:86`), dropped the `.git` suffix from the repository link (`:90`) and fixed the card's indentation. There are now 14 cards (4, 4 and 6), with 12 "Live URL" and 7 "Code" buttons. The file grew from 236 to 243 lines and whole cards moved, so every citation to it was remapped card by card throughout this handbook. Sections 1, 3.2, 7.3, 7.4, 8.6, 8.11, 9.9, 14.2, 14.4, 15, 16.2, 16.3, 17 and 19 were updated; CNT-13 and CNT-14 moved to section 15.7; CNT-15 was opened; commit `f9422c8` was recorded. Two stale citations found on the way were corrected (the `"#"` filter lines in section 7.3 and the repository-link lines in section 8.11).
- **Why:** The owner made the reordering and link edits by hand, added the new card with text copied from the Seffer Exports card, and on 2026-10-11 asked for the card's details to be fetched from GitHub.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server and on a production build, at 1440 px in both themes and at 390 and 320 px: the groups list their cards in the new order, there are 12 "Live URL" and 7 "Code" buttons, the new card does not overflow, and there are 0 console errors. All 22 outbound URLs were requested: 21 returned 200 and the social profile host returned its bot-block code. The repository facts are verified in code from a copy of its default branch taken on 2026-10-11. Page weight was re-measured (section 16.2). A draft of the description added an unused rule to the production CSS and was reworded (section 8.6, Gotchas).
- **Follow-ups:** Committed by the owner in `ef35352`. The "Code" button opens a repository named `testing-repo` with a template README (CNT-15). The caption under "Small Projects" still reads "Dashboards & landing Pages" (CNT-5). Unreleased (BLK-3).

### 2026-10-11 · dev · Royal King Water Supply card added; JVS Water Supply moved; third group renamed "Small Projects" (`f9422c8`)
- **What:** In `app/sections/projects.tsx`, a new Royal King Water Supply card (`:61-67`) takes the third place in "Independent Works"; JVS Water Supply moves, text unchanged, to the end of the third group (`:106-112`); and that group's heading changes from "Company Dashboards" to "Small Projects" (`:221`). There are now 13 cards: 4, 4 and 5. The file grew from 229 to 236 lines, so every citation to it from line 106 on was shifted by 7 throughout this handbook. Sections 1, 3.2, 5.2, 7.3, 7.4, 8.6, 8.10, 9.9, 15, 16.2, 16.3, 17 and 19 were updated, CNT-14 was opened, CNT-5 was reworded, and commit `17149a3` was recorded.
- **Why:** The owner asked for all three changes on 2026-10-11 and supplied the Royal King description and stack. The card description is condensed from the owner's text; the tags are the owner's stack list without version numbers. The year in the supplied title line was not used, because cards carry no dates.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server at 1440 px in both themes and at 390 and 320 px: the groups list their cards in the new order under the new heading, there are 9 "Live URL" and 7 "Code" buttons, the new card does not overflow, and there are 0 console errors. Page weight was re-measured on a production build (section 16.2).
- **Follow-ups:** Committed by the owner in `f9422c8`. Royal King Water Supply had no link (CNT-14; the owner added one afterwards). The caption under "Small Projects" still reads "Dashboards & landing Pages" (CNT-5). Unreleased (BLK-3).

### 2026-10-11 · dev · PinNote card added; DD Ammini moved to "Company Dashboards" (`17149a3`)
- **What:** In `app/sections/projects.tsx`, a new PinNote card (`:68-74`) takes the fourth place in "Independent Works", and DD Ammini moves, text unchanged, to the end of "Company Dashboards" (`:99-105`). There are now 12 cards, four per group. The file grew from 222 to 229 lines, so every citation to it from line 99 on was shifted by 7 throughout this handbook. Sections 3.2, 7.3, 7.4, 8.6, 8.10, 9.9, 15.4, 16.2, 16.3 and 17.4 were updated, and CNT-13 was opened.
- **Why:** The owner asked for both moves on 2026-10-11 and supplied PinNote's description and stack. The card description is condensed from the owner's text; the tags are the owner's stack list without version numbers. The role and date placeholders in the supplied text were not used, because cards carry neither.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the running dev server at 1440 px in both themes and at 390 and 320 px: the groups list their cards in the new order, there are 9 "Live URL" and 7 "Code" buttons, the PinNote card does not overflow, and there are 0 console errors. Page weight was re-measured on a production build (section 16.2).
- **Follow-ups:** Committed by the owner in `17149a3`. PinNote has no link (CNT-13). Unreleased (BLK-3). "Company Dashboards" now sits over four projects that are not dashboards (CNT-5).

### 2026-10-11 · dev · Ulsaham Entertainments and NoWaitr cards swapped; Ulsaham card rewritten (`17149a3`)
- **What:** In `app/sections/projects.tsx`, the first card of "Independent Works" is now Ulsaham Entertainments (`:47-53`) and the first card of "Company Dashboards" is NoWaitr (`:78-84`, text unchanged). The Ulsaham card has a new title (it read "Ulsaaham"), a new description, seven tags in place of two, and the `www` form of its live URL. This handbook was updated to match in sections 1, 7.3, 7.4, 8.6, 8.10, 9.9, 15, 16.2 and 17, and the statements that called commit `d1fd46b` uncommitted were corrected.
- **Why:** The owner asked for the swap on 2026-10-11 and supplied the project's name, stack and a long description. The card description is a condensed version of the owner's text; the tags are the owner's stack list in full.
- **Verified:** Type-check, source lint and production build pass. Verified in browser on the production build at 1440 px in both themes and at 390 and 320 px: both groups list their cards in the new order, there are still 9 "Live URL" and 7 "Code" buttons, the new card does not overflow, and there are 0 console errors. `https://www.ulsaaham.com/` returned HTTP 200. Page weight was re-measured (section 16.2).
- **Follow-ups:** Committed by the owner in `17149a3`. Unreleased (BLK-3). "Company Dashboards" still sits over projects that are not dashboards (CNT-5).

### 2026-10-11 · dev · Project handbook, agent instructions and docs exclusion (`d1fd46b`)
- **What:** Added `project_context.md` (this handbook), `AGENTS.md` and `CLAUDE.md`. Added `@source not "../*.md"` with a comment to `app/globals.css` (lines 2-3). Corrected stale statements in `README.md` and `THEME_GUIDE.md`.
- **Why:** The owner asked for a single source of truth that survives a move to another machine or coding tool. The CSS line is needed because Tailwind 4 scans Markdown at the repo root and would compile class names from the docs into production CSS.
- **Verified:** Type-check, source lint and production build pass on the working tree. CSS went from 35,184 to 35,132 bytes and the one class that had leaked from `THEME_GUIDE.md` is gone. With this handbook in place and the exclusion removed, the same build produces 36,555 bytes (32 extra rules), which is what the line prevents. Handbook claims were fact-checked against the code at `50ac264`, and every cited file and line was checked to exist.
- **Follow-ups:** Committed by the owner as `d1fd46b`, under a subject that does not describe it (row 26 of section 17.3). Unreleased (BLK-3). Open items in section 15 are untouched.

### 2026-10-11 · dev · Project tags and descriptions corrected (`50ac264`)
- **What:** In `app/sections/projects.tsx`: SOLDDD is now a "fullstack" platform (`:14`) tagged "Next.js" and "Sendbird video call" (`:15`); EASY VACAY is tagged "React.js" (`:23`); AUNTIE is tagged "Postman API" (`:31`, not in the subject). `app/sections/experience.tsx:17` now says "Sendbird video calling".
- **Why:** The owner asked for Sendbird video calling to be named on the SOLDDD work and made these edits themselves (GR-2).
- **Verified:** The baselines of 2026-10-11 are recorded at this commit: type-check, source lint and build pass; HTTP 200 and 0 console errors on the dev and production servers (section 16.2). The sweep of outbound links ran earlier (next entry).
- **Follow-ups:** Unreleased (BLK-3). Experience and Projects now disagree on two stacks (CNT-2, CNT-8). Logged as RES-2.

### 2026-10-11 · dev · SOOLDD rebranded SOLDDD; live URL moved to production (`a8e9168`)
- **What:** The new name is in the card title (`app/sections/projects.tsx:13`) and the experience bullet (`app/sections/experience.tsx:17`). The card's `liveUrl` moves from a staging host to `https://solddd.com/` (`app/sections/projects.tsx:17`).
- **Why:** The product was rebranded; the owner said to change the name everywhere and gave the URL (GR-1). It is not the spelling fix the subject claims.
- **Verified:** `https://solddd.com/` returned HTTP 200 on 2026-10-11, requested separately because the sweep of outbound links ran while the card still held the staging link. The old spelling is gone from `app/`, `components/`, `contexts/` and `lib/`.
- **Follow-ups:** Unreleased: `origin/main` still shows the old name and link (BLK-3). Logged as RES-1.

### 2026-06-22 · dev · Animations moved to CSS, placeholder links fixed, config trimmed (`3520172`)
- **What:** Row 22 of section 17.3; the keyframes are at `app/globals.css:75-91`. Released 3 minutes 35 seconds later by pull request 3 (`8a44ca7`).
- **Why:** not recorded beyond the subject. The link changes repair what `5f4ec86` missed.
- **Verified:** not recorded.
- **Follow-ups:** `themeColor` is fixed to black (BUG-16). A tracked stale build file was swept into the commit (SEC-2).

### 2026-05-02 · dev · Experience section and real contact details (`5f4ec86`)
- **What:** Row 20 of section 17.3; the new file is `app/sections/experience.tsx`. Released 36 seconds later by pull request 2 (`1b00cb3`).
- **Why:** not recorded.
- **Verified:** not recorded. History shows a miss: the "Send Message" address and the hero links stayed placeholders until `3520172`, 51 days later.
- **Follow-ups:** lucide brand icons return at `app/sections/contact.tsx:8` (TD-7). Contact values are duplicated literals (TD-2).

### 2026-05-02 · main · First release: clean-up, real bio, real projects (`0c03886` to `f5417f4`, pull request 1)
- **What:** Rows 14 to 18 of section 17.3, committed on 2026-05-01. Pull request 1 (`a7aa55f`) then took all 17 commits made since the template to `main`.
- **Why:** not recorded. The merge body is the single word "Dev".
- **Verified:** not recorded. `0c03886` adds a permission rule for running ESLint on `app` (`.claude/settings.json:4`) and its edits are typical lint fixes, but no output is recorded.
- **Follow-ups:** Contact details were still placeholders in this release. The bio adds a second form of the owner's name (CNT-1).

### 2026-04-14 · dev · Light and dark theme system; About unmounted (`180cfb4` to `07b2309`)
- **What:** Rows 7 to 13 of section 17.3.
- **Why:** not recorded. The subject "dark theme" is misleading: the commit adds the light theme.
- **Verified:** not recorded. Four follow-up commits in the next three hours adjust it.
- **Follow-ups:** `app/sections/about.tsx` was never deleted (TD-1). The light theme is still incomplete (BUG-3, BUG-4, BUG-5).

### 2026-04-14 · dev · Template, polish and portrait hero (`df63611` to `9f05431`)
- **What:** Rows 1 to 6 of section 17.3. `df63611` went to `main` directly.
- **Why:** not recorded.
- **Verified:** not recorded. `a89d2a3` rolls back the universal reset added 34 minutes earlier.
- **Follow-ups:** The accidental files are still tracked (SEC-1, SEC-2). The typography rules added here still override utilities (BUG-9).

## 19. Glossary

What each term means in this repository. Names in quotes are text a visitor sees on the page. `projects.tsx` and `experience.tsx` are in `app/sections/`. The last column gives the section number or item ID that covers the term.

| Term | Meaning here | See |
|---|---|---|
| `"#"` sentinel | The exact string for "no link" in project data; buttons hide only for it (`projects.tsx:164`, `:170`) | 8.6, GR-14 |
| App Router | Next's routing, in which folders under `app/` are routes. Here: one page, `/` (`app/layout.tsx`, `app/page.tsx`), plus the built-in not-found route | 6.3 |
| AUNTIE | Nanny-booking app from the owner's current job (`projects.tsx:29`) | 8.6 |
| Cascade layer | A CSS `@layer`. Tailwind 4 puts utility classes in the last of its four (`node_modules/tailwindcss/index.css:1`) | 9.2 |
| Client component | A file starting with `"use client"`: rendered on the server for the HTML and again in the browser. 13 files here | 5.3 |
| `cn` helper | `lib/utils.ts:4-6`: joins class names; a later conflicting class wins | 9.5 |
| "Code" | Button to a project's repository (`projects.tsx:173`); never shown in "Professional Work" (`:211`) | 8.6 |
| EASY VACAY | Travel-booking platform from the owner's current job (`projects.tsx:21`) | 8.6, CNT-8 |
| EVENT APP | Internship project card (`projects.tsx:37`); no links, so no buttons | 8.6, CNT-6 |
| Flat config | ESLint 9's single-file config (`eslint.config.mjs`); its ignore patterns are relative to that file's folder, so `.next/**` (`:11`) does not cover a nested `.next/` | 11.2, BLK-2 |
| FOUC, or theme flash | "Flash of unstyled content". Here: a visitor with a stored light theme sees the dark page first | 9.1, BUG-5 |
| Hydration | React attaching to the server-made HTML in the browser. Until then the content is invisible and the stored theme is not applied | 6.2, BUG-1 |
| Image optimizer | Next's endpoint `/_next/image`, which fetches and resizes the portrait (`app/sections/hero.tsx:50-57`); it needs a running Next server or a host that provides the same endpoint | 7.2, 10.4 |
| "Independent Works" | Second project group (`projects.tsx:219`); array `coreProducts` | 8.6, TD-3 |
| LCP | Largest Contentful Paint, when the largest visible element is painted: 1.1 to 1.6 s on desktop, 4.0 to 5.4 s on an emulated slow phone | 16.2 |
| "Live URL" | Button to a project's public site (`projects.tsx:167`), from the `liveUrl` field | 8.6 |
| Logix Space Technologies Pvt Ltd | Employer during the owner's internship; no punctuation (`experience.tsx:28`) | 8.5 |
| NewagesysIT | The owner's current employer; one word, capital "IT" (`experience.tsx:11`) | 8.5 |
| Prerender | Rendering a route to static HTML at build time. Both routes are prerendered, so a value computed while rendering is frozen until the next build | 6.1, BUG-13 |
| "Professional Work" | First project group (`projects.tsx:203`); array `professionalProjects` | 8.6 |
| `remotePatterns` | The hosts the image optimizer may fetch from (`next.config.ts:8-13`); one is listed | 6.6, SEC-4 |
| Server component | A file without `"use client"` that no client component imports; rendered at build time only (`app/layout.tsx`, `app/page.tsx`) | 5.3 |
| "Small Projects" | Third project group (`projects.tsx:235`); array `otherProjects`. Headed "Company Dashboards" until 2026-10-11 | 8.6, TD-3, CNT-5 |
| SOLDDD | Real-estate product from the owner's current job; three D's, capitals (`projects.tsx:13`). Formerly SOOLDD | GR-1 |
| Source exclusion | `@source not "../*.md";` at `app/globals.css:3`: keeps root Markdown out of Tailwind's search for class names | 9.7 |
| Stagger | Children appearing 0.1 s apart when their `StaggerContainer` scrolls into view (`components/ui/fade-in.tsx:61-83`) | 9.6, 8.10 |
| Theme provider | `ThemeProvider` (`contexts/theme-context.tsx:14-47`), mounted at `app/layout.tsx:36`; holds `dark` or `light`, read with `useTheme()` | 9.1, 6.4 |
| Turbopack | Next's bundler, the default for dev and build in Next 16 | 4.4 |
| Unlayered rule | A CSS rule outside every `@layer`; it beats layered rules whatever its specificity (`app/globals.css:38-44`, `:52-60`, `:69-73`) | 9.2, BUG-3, BUG-9 |
| Utility class | A single-purpose Tailwind class such as `bg-black`; CSS is emitted only for names written in full in a scanned file | 9.7 |
| `whileInView` | framer-motion prop that animates an element entering the viewport (`components/ui/fade-in.tsx:37`, `:69`); the hidden start state is in the server HTML | 9.6, BUG-1 |
