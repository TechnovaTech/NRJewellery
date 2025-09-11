# Modern Jewelry Website

A Gen-Z styled animated jewelry website built with Next.js, TailwindCSS, and Framer Motion.

## Features

- **Modern Design**: Gen-Z aesthetic with glassmorphism effects and neon color palette
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Two Main Pages**:
  - **Jewelry** (Default): Interactive gallery with filters and product modals
  - **About Us**: Company story and craftsmanship details

## Tech Stack

- Next.js 14 (App Router)
- TailwindCSS
- Framer Motion
- TypeScript
- React DatePicker
- Lucide React Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation with animations
│   └── ChatWidget.tsx  # Floating chat widget
├── jewelry/            # Jewelry gallery page
├── about/              # About us page
├── api/                # API routes
└── globals.css         # Global styles and fonts
```

## Design Features

- **Colors**: Neon purple, teal, pink with pastel accents
- **Fonts**: Poppins, Inter, Space Grotesk
- **Effects**: Glassmorphism, gradients, glow animations
- **Animations**: Page transitions, hover effects, loading states

## Customization

- Update colors in `tailwind.config.js`
- Modify animations in component files
- Add new jewelry items in `app/jewelry/page.tsx`
- Customize about content in `app/about/page.tsx`