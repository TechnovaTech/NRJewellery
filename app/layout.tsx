'use client'

import './globals.css'
import { Lato } from 'next/font/google'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import { usePathname } from 'next/navigation'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  
  if (isAdminRoute) {
    return (
      <html lang="en">
        <head>
          <title>NR Jewelry Admin</title>
        </head>
        <body className={lato.className}>
          {children}
        </body>
      </html>
    )
  }
  
  return (
    <html lang="en">
      <head>
        <title>NR Crafted Jewellery - Modern Luxury</title>
        <meta name="description" content="Discover our exclusive collection of modern jewelry pieces at NR Crafted Jewellery" />
      </head>
      <body className={lato.className}>
        <div className="min-h-screen relative overflow-hidden bg-bg-main">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-3"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-bg-main/98 via-hover-beige/95 to-bg-main/98" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/3 via-gold/5 to-gold/3 animate-pulse" style={{animationDuration: '8s'}} />
          
          {/* Dynamic Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-5 w-32 h-32 bg-gradient-to-br from-hover-beige/40 to-gold/20 rounded-full animate-spin blur-lg" style={{animationDuration: '20s'}} />
            <div className="absolute top-32 right-12 w-24 h-24 bg-gradient-to-tr from-gold/30 to-hover-beige/40 rounded-full animate-bounce blur-md" style={{animationDuration: '3s'}} />
            <div className="absolute top-64 left-1/3 w-40 h-40 bg-gradient-to-bl from-gold/15 to-hover-beige/25 rounded-full morph-animation blur-xl" style={{animationDelay: '2s'}} />
            <div className="absolute top-96 right-1/4 w-20 h-20 bg-gradient-to-r from-hover-beige/30 to-gold/15 rounded-full animate-pulse blur-sm" />
            <div className="absolute bottom-40 left-8 w-36 h-36 bg-gradient-to-tl from-gold/20 to-hover-beige/30 rounded-full float-animation blur-lg" style={{animationDelay: '1s'}} />
            <div className="absolute bottom-80 right-16 w-28 h-28 bg-gradient-to-br from-hover-beige/35 to-gold/20 rounded-full animate-pulse blur-md" style={{animationDuration: '4s'}} />
            <div className="absolute top-1/2 left-1/5 w-24 h-24 bg-gradient-to-tr from-gold/25 to-hover-beige/20 rounded-full morph-animation blur-lg" style={{animationDelay: '3s'}} />
            <div className="absolute bottom-1/3 right-1/3 w-44 h-20 bg-gradient-to-r from-gold/15 to-hover-beige/20 rounded-full float-animation blur-xl" style={{animationDelay: '0.5s'}} />
            <div className="absolute top-3/4 left-2/3 w-26 h-26 bg-gradient-to-bl from-hover-beige/40 to-gold/15 rounded-full animate-pulse blur-md" style={{animationDuration: '5s'}} />
            <div className="absolute bottom-16 left-1/2 w-32 h-32 bg-gradient-to-tr from-gold/25 to-hover-beige/30 rounded-full morph-animation blur-lg" style={{animationDelay: '1.5s'}} />
            <div className="absolute top-20 right-1/3 w-18 h-18 bg-gradient-to-br from-gold/50 to-hover-beige/30 rounded-full animate-bounce blur-sm" style={{animationDelay: '2.5s', animationDuration: '2s'}} />
            <div className="absolute bottom-32 left-1/4 w-22 h-22 bg-gradient-to-tl from-hover-beige/35 to-gold/20 rounded-full float-animation blur-md" style={{animationDelay: '4s'}} />
            <div className="absolute top-40 left-3/4 w-16 h-16 bg-gradient-to-r from-gold/40 to-hover-beige/25 rounded-full animate-spin blur-sm" style={{animationDuration: '15s', animationDelay: '1s'}} />
            <div className="absolute bottom-60 right-1/5 w-30 h-30 bg-gradient-to-bl from-hover-beige/30 to-gold/25 rounded-full animate-pulse blur-lg" style={{animationDuration: '6s'}} />
            <div className="absolute top-1/3 right-1/2 w-12 h-12 bg-gradient-to-tr from-gold/45 to-hover-beige/25 rounded-full animate-bounce blur-xs" style={{animationDelay: '3.5s'}} />
          </div>
          
          {/* Dynamic Mesh Grid & Particles */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-hover-beige/8 animate-pulse" style={{animationDuration: '6s'}} />
            <div className="absolute inset-0 bg-gradient-to-tl from-hover-beige/6 via-transparent to-gold/6 animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}} />
            <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-border-light/40 to-transparent animate-pulse" style={{animationDelay: '1s'}} />
            <div className="absolute top-0 right-1/5 w-px h-full bg-gradient-to-b from-transparent via-border-light/40 to-transparent animate-pulse" style={{animationDelay: '2s'}} />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent animate-pulse" style={{animationDelay: '3s'}} />
            <div className="absolute top-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-light/30 to-transparent animate-pulse" style={{animationDelay: '0.5s'}} />
            <div className="absolute top-2/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-light/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}} />
            <div className="absolute bottom-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse" style={{animationDelay: '2.5s'}} />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold/70 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-hover-beige/80 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '3s'}} />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gold/90 rounded-full animate-ping" style={{animationDelay: '2s'}} />
            <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-hover-beige/70 rounded-full animate-ping" style={{animationDelay: '4s'}} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gold/80 rounded-full animate-ping" style={{animationDelay: '1s'}} />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-hover-beige/60 rounded-full animate-ping" style={{animationDelay: '5s'}} />
          </div>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Preloader />
                <Navbar />
                <main className="pt-19 relative z-10">
                  {children}
                </main>

              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}