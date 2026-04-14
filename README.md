# Developer Portfolio

A modern, premium developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- **Next.js 16** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** with dark theme (black background, white text)
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Inter font** via next/font
- Fully responsive design
- Smooth scrolling enabled
- SEO optimized

## Project Structure

```
app/
├── globals.css           # Global styles & Tailwind config
├── layout.tsx            # Root layout with Navigation & Footer
├── page.tsx              # Main landing page
└── sections/
    ├── hero.tsx          # Hero section with animated background
    ├── about.tsx         # About & stats section
    ├── projects.tsx      # Featured projects grid
    └── contact.tsx       # Contact information

components/
├── navigation.tsx        # Fixed header navigation
├── footer.tsx            # Site footer
└── ui/                   # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    ├── container.tsx
    ├── fade-in.tsx
    └── text.tsx

lib/
└── utils.ts              # Utility functions (cn helper)
```

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

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

## Deployment on Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI`
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
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Customization

### Content

Edit these files to personalize your portfolio:

- `app/sections/hero.tsx` - Hero headline and CTA
- `app/sections/about.tsx` - About text and stats
- `app/sections/projects.tsx` - Your projects
- `app/sections/contact.tsx` - Contact information
- `components/navigation.tsx` - Nav links and social URLs

### Styling

- Colors: Edit CSS variables in `app/globals.css`
- Fonts: Already configured with Inter via `next/font`
- Spacing: Uses Tailwind's default scale

## Environment Variables

Create a `.env.local` file for local environment variables:

```env
# Example
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
