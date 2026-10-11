# Developer Portfolio

A modern, premium developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

> The full project handbook is [`project_context.md`](project_context.md). Where this README and the handbook disagree, the handbook is right.

## Features

- **Next.js 16** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** with a dark/light theme toggle (dark by default)
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Inter font** via next/font
- Fully responsive design
- Smooth scrolling enabled
- Basic SEO metadata (page title and description)

## Project Structure

```
app/
├── globals.css           # Global styles & Tailwind config
├── layout.tsx            # Root layout with ThemeProvider, Navigation & Footer
├── page.tsx              # Main landing page
└── sections/
    ├── hero.tsx          # Hero section with animated background
    ├── experience.tsx    # Work experience
    ├── projects.tsx      # Projects in three groups
    ├── contact.tsx       # Contact information
    └── about.tsx         # About & stats section (not mounted on the page)

components/
├── navigation.tsx        # Fixed header navigation and theme toggle
├── footer.tsx            # Site footer
├── theme-separator.tsx   # Themed divider between sections
└── ui/                   # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    ├── container.tsx
    ├── fade-in.tsx
    └── text.tsx

contexts/
└── theme-context.tsx     # Dark/light theme state (useTheme)

lib/
└── utils.ts              # Utility functions (cn helper)
```

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- npm (the repository ships a `package-lock.json`)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Lint and type-check

`npm run lint` does not work: it calls `next lint`, which Next.js 16 removed. Run the tools directly:

```bash
npx eslint app components contexts lib
npx tsc --noEmit
```

## Deployment on Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure build settings
4. Click **Deploy**

### Option 3: Manual Configuration

If needed, these settings are pre-configured in `vercel.json`:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

## Customization

### Content

Edit these files to personalize your portfolio:

- `app/sections/hero.tsx` - Hero headline, bio and social links
- `app/sections/experience.tsx` - Work experience
- `app/sections/projects.tsx` - Your projects
- `app/sections/contact.tsx` - Contact information (the email and profile links are repeated in `hero.tsx`; change both)
- `components/navigation.tsx` - Nav links and theme toggle
- `app/sections/about.tsx` - About text and stats (not mounted; add it to `app/page.tsx` to show it)

### Styling

- Colors: components pick Tailwind classes per theme with `useTheme()` (see `THEME_GUIDE.md`). The CSS variables in `app/globals.css` only set the page background, focus ring and selection colours
- Fonts: Already configured with Inter via `next/font`
- Spacing: Uses Tailwind's default scale

## Environment Variables

None. The code reads no environment variables, so no `.env` file is needed.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
