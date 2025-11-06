# Next.js Migration Guide

This document outlines the conversion from React to Next.js for the DEMA Kabinet Cakrawala landing page.

## ✅ What Was Changed

### 1. File Structure
- ✨ **Created** `/app/layout.tsx` - Root layout with metadata
- ✨ **Created** `/app/page.tsx` - Main page component
- ✨ **Created** `/next.config.js` - Next.js configuration
- ✨ **Created** `/package.json` - Project dependencies

### 2. Components Updated

#### Navbar.tsx
```diff
+ "use client";
+ import Link from "next/link";
- import { useState } from "react";
+ import { useState } from "react";
```
- Added `"use client"` directive (uses React hooks)
- Imported Next.js Link component

#### Hero.tsx
```diff
+ import Image from "next/image";
```
- Added Next.js Image import (background can use it if needed)

#### Events.tsx
```diff
+ import Image from "next/image";
- import { ImageWithFallback } from "./figma/ImageWithFallback";

- <ImageWithFallback src={...} alt={...} className={...} />
+ <Image src={...} alt={...} fill className={...} />
```
- Replaced ImageWithFallback with Next.js Image
- Used `fill` prop for responsive images in containers

#### News.tsx
```diff
+ import Image from "next/image";
- import { ImageWithFallback } from "./figma/ImageWithFallback";

- <ImageWithFallback src={...} alt={...} className={...} />
+ <Image src={...} alt={...} fill className={...} />
```
- Same Image component changes as Events

#### Gallery.tsx
```diff
+ import Image from "next/image";
- import { ImageWithFallback } from "./figma/ImageWithFallback";

- <ImageWithFallback src={...} alt={...} className={...} />
+ <Image src={...} alt={...} fill className={...} />
```
- Same Image component changes

#### Footer.tsx
```diff
+ import Link from "next/link";

- <a href="#" ...>
+ <Link href="#" ...>
```
- Replaced anchor tags with Next.js Link component

#### Divisions.tsx
```diff
+ "use client";
```
- Added `"use client"` directive (uses mouse event handlers)

### 3. Configuration Files

#### next.config.js
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
```
- Configured external image domains for Next.js Image optimization

#### app/layout.tsx
```typescript
export const metadata: Metadata = {
  title: "DEMA Kabinet Cakrawala",
  description: "Menerangi Ufuk Baru dengan Inovasi...",
};
```
- Added SEO metadata
- Wrapped app with HTML and body tags

## 🎯 Next.js Benefits

### Performance
- ✅ **Automatic Image Optimization** - Next.js optimizes images on-demand
- ✅ **Code Splitting** - Automatic code splitting per route
- ✅ **Server Components** - Reduced JavaScript sent to client
- ✅ **Built-in Font Optimization** - Google Fonts are optimized automatically

### Developer Experience
- ✅ **File-based Routing** - No need for routing configuration
- ✅ **Fast Refresh** - Instant feedback during development
- ✅ **TypeScript Support** - First-class TypeScript support
- ✅ **API Routes** - Can add backend endpoints easily (if needed later)

### SEO & Production
- ✅ **Metadata API** - Better SEO with built-in metadata
- ✅ **Static Generation** - Can pre-render pages for better performance
- ✅ **Incremental Static Regeneration** - Update static content without rebuilding
- ✅ **Built-in Analytics** - Easy integration with Vercel Analytics

## 🚀 Running the Next.js App

### Development
```bash
npm run dev
```
Visit `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📋 Checklist for Future Development

- [ ] Add dynamic routing for news articles (`/app/news/[slug]/page.tsx`)
- [ ] Add dynamic routing for events (`/app/events/[id]/page.tsx`)
- [ ] Implement API routes if backend is needed (`/app/api/`)
- [ ] Add form handling for "Aspirasi Mahasiswa"
- [ ] Integrate CMS (e.g., Sanity, Contentful) for content management
- [ ] Add loading states (`loading.tsx`)
- [ ] Add error handling (`error.tsx`)
- [ ] Implement search functionality
- [ ] Add blog or news section with pagination
- [ ] Optimize images (convert to WebP/AVIF)
- [ ] Add Google Analytics or Vercel Analytics
- [ ] Implement newsletter subscription
- [ ] Add contact form with email integration

## 🔍 Key Differences: React vs Next.js

| Feature | React (Old) | Next.js (New) |
|---------|-------------|---------------|
| Routing | React Router needed | File-based routing |
| Images | img tag or custom component | Next.js Image component |
| Links | `<a>` tags | `<Link>` component |
| SEO | Manual meta tags | Metadata API |
| Rendering | Client-side only | Server + Client components |
| Deployment | Build + static hosting | Optimized for Vercel/Netlify |

## ⚠️ Important Notes

### Client Components
Components need `"use client"` directive if they:
- Use React hooks (`useState`, `useEffect`, etc.)
- Use browser APIs (`window`, `localStorage`, etc.)
- Have event handlers (`onClick`, `onSubmit`, etc.)

### Server Components (Default)
All components are Server Components by default in Next.js 14 App Router:
- Better performance (less JavaScript to client)
- Can fetch data directly
- Cannot use hooks or browser APIs

### Image Optimization
- Always use Next.js `Image` component for images
- Configure `remotePatterns` in `next.config.js` for external images
- Use `fill` prop for images that should fill their container
- Specify `width` and `height` for fixed-size images

## 🛠️ Troubleshooting

### Images not loading
- Check `next.config.js` has correct domain in `remotePatterns`
- Ensure parent container has `position: relative` when using `fill`

### "use client" errors
- Add `"use client"` at top of file if component uses hooks or events
- Don't add to components that don't need it (performance)

### Styling issues
- Ensure `globals.css` is imported in `layout.tsx`
- Tailwind classes work the same as before

### Build errors
- Run `npm run build` to check for errors before deploying
- Check TypeScript types are correct

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

---

**Migration completed successfully! 🎉**
