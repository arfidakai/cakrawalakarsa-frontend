# DEMA Kabinet Cakrawala - Landing Page

Modern and responsive landing page for DEMA Kabinet Cakrawala, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans (Google Fonts)

## 🎨 Design System

### Color Palette
- `#5F5E5E` - Neutrals and text
- `#2F563B` - Section highlights (green)
- `#166CB2` - Buttons and links (blue)
- `#EE8A34` - Accents and hover states (orange)
- `#FDD100` - Highlights and badges (yellow)

### Features
- ✨ Clean, minimalist design
- 🌅 Sunrise/horizon theme
- 📱 Fully responsive (mobile-first)
- 🎭 Smooth animations and transitions
- ♿ Accessible components
- 🎯 SEO optimized

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main landing page
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section with CTA
│   ├── About.tsx           # About section with value cards
│   ├── Events.tsx          # Featured events grid
│   ├── Leadership.tsx      # Leadership structure
│   ├── Divisions.tsx       # Division cards with hover effects
│   ├── News.tsx            # News articles
│   ├── Gallery.tsx         # Photo gallery
│   ├── Footer.tsx          # Footer with contact info
│   └── ui/                 # shadcn/ui components
├── styles/
│   └── globals.css         # Global styles and CSS variables
└── next.config.js          # Next.js configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📄 Page Sections

1. **Hero Section** - Main banner with call-to-action buttons
2. **About Section** - Organization overview with core values (Inovatif, Kolaboratif, Progresif)
3. **Events Section** - Featured activities and programs
4. **Leadership Section** - Executive board members
5. **Divisions Section** - Organizational divisions with interactive hover effects
6. **News Section** - Latest news and publications
7. **Gallery Section** - Photo documentation
8. **Footer** - Contact information and social media links

## 🔧 Customization

### Update Colors
Edit the CSS variables in `/styles/globals.css`:
```css
--dema-neutral: #5F5E5E;
--dema-green: #2F563B;
--dema-blue: #166CB2;
--dema-orange: #EE8A34;
--dema-yellow: #FDD100;
```

### Update Content
- **Events**: Edit the `events` array in `/components/Events.tsx`
- **News**: Edit the `articles` array in `/components/News.tsx`
- **Leadership**: Edit the `leaders` array in `/components/Leadership.tsx`
- **Divisions**: Edit the `divisions` array in `/components/Divisions.tsx`

### Add New Images
Images are loaded from Unsplash. To use custom images:
1. Place images in `/public/images/`
2. Update image paths in components
3. Update `next.config.js` if using external domains

## 🌐 Deployment

This Next.js application can be deployed to:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Docker**: Use the included Dockerfile
- **Traditional hosting**: Build and serve the `.next` folder

## 📝 Key Next.js Features Used

- ✅ App Router (Next.js 14)
- ✅ Server Components (default)
- ✅ Client Components (marked with `"use client"`)
- ✅ Next.js Image component for optimization
- ✅ Next.js Link for client-side navigation
- ✅ Metadata API for SEO
- ✅ TypeScript for type safety

## 🔄 Migration from React

This project was converted from React to Next.js. Key changes:
- Replaced `ImageWithFallback` with Next.js `Image` component
- Added `"use client"` directive to components using hooks
- Replaced `<a>` tags with Next.js `Link` component
- Created `app/layout.tsx` and `app/page.tsx`
- Added `next.config.js` for image domains

## 📞 Contact

For questions about DEMA Kabinet Cakrawala:
- **Email**: dema@cakrawala.ac.id
- **Phone**: +62 123 456 789
- **Address**: Jl. Kampus Raya No. 123, Jakarta Selatan

---

Built with ❤️ by arfidakaiiii
