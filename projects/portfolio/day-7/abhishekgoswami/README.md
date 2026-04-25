# Portfolio — Day 7: Phase 7 - Deployment & Final Polish

## Submission by: Abhishek Goswami

### What was done
- Optimized images and assets for production
- Fixed responsive layout bugs across all breakpoints
- Added `ScrollToTop` button for better UX
- Added accessible contact form with validation
- Added "Built by Me" footer
- Production build configured with code splitting via Vite

### Sections
- **Hero** — Name, tagline, CTA buttons
- **About** — Bio + tech stack skills
- **Projects** — Project cards with tags and links
- **Contact** — Accessible contact form
- **Footer** — "Built by Me — Abhishek Goswami"

### Deploy
```bash
npm install
npm run build
# Deploy the dist/ folder to Vercel or Netlify
```

### Tech Stack
- React 19
- Vite 8 (with esbuild minification + code splitting)
- Tailwind CSS v4
- Prettier
