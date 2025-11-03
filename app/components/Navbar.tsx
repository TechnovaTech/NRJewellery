'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Jewelry', href: '/jewelry' },
  { name: 'About Us', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, isLoggedIn, logout } = useAuth()
  const isCategoryPage = pathname.startsWith('/category/')
  const isWishlistOrCartPage = pathname === '/wishlist' || pathname === '/cart'
  const isProductPage = pathname.startsWith('/product/')
  const isJewelryPage = pathname === '/jewelry'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-main/95 backdrop-blur-md shadow-lg border-b border-border-light transition-all duration-300"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={50} 
                  height={50} 
                  className="h-12 w-12 object-contain" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide leading-tight">
                  FIRST NIGHT
                </span>
                <span className="text-xs sm:text-sm font-semibold text-yellow-600 uppercase tracking-[0.2em] leading-tight">
                  JEWELLERY
                </span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`text-base font-medium tracking-wide transition-all duration-200 ${
                    pathname === item.href
                      ? 'text-gold border-b-2 border-gold pb-1'
                      : 'text-text-primary hover:text-gold'
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>
          
          {/* Icons & Menu */}
          <div className="flex items-center space-x-2">
            <div className="hidden lg:block relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border bg-bg-main/80 border-border-light hover:border-gold transition-all duration-300"
              >
                <Search className="h-4 w-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-32 text-text-primary placeholder:text-text-secondary"
                />
              </motion.div>
            </div>
            
            <Link href="/wishlist">
              <motion.button suppressHydrationWarning className="relative p-2 rounded-full hover:bg-hover-beige">
                <Heart className="h-5 w-5 text-text-secondary hover:text-red-500" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </motion.button>
            </Link>
            
            <Link href="/cart">
              <motion.button suppressHydrationWarning className="relative p-2 rounded-full hover:bg-hover-beige">
                <ShoppingCart className="h-5 w-5 text-text-secondary hover:text-gold" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {items.length}
                  </span>
                )}
              </motion.button>
            </Link>
            
            {isLoggedIn ? (
              <div className="relative group">
                <motion.button className="p-2 rounded-full hover:bg-hover-beige flex items-center space-x-2">
                  <User className="h-5 w-5 text-text-secondary hover:text-gold" />
                  <span className="hidden lg:block text-sm text-text-secondary">{user?.name}</span>
                </motion.button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border-light opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-text-primary border-b border-border-light">
                      {user?.email}
                    </div>
                    <Link href="/profile" className="block px-3 py-2 text-sm text-text-secondary hover:text-gold hover:bg-hover-beige rounded">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-3 py-2 text-sm text-text-secondary hover:text-gold hover:bg-hover-beige rounded">
                      Orders
                    </Link>
                    <Link href="/track" className="block px-3 py-2 text-sm text-text-secondary hover:text-gold hover:bg-hover-beige rounded">
                      Track Order
                    </Link>
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-gold hover:bg-hover-beige rounded">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <motion.button className="p-2 rounded-full hover:bg-hover-beige">
                  <User className="h-5 w-5 text-text-secondary hover:text-gold" />
                </motion.button>
              </Link>
            )}
            
            <button
              suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-hover-beige ml-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-text-secondary" /> : <Menu className="h-6 w-6 text-text-secondary" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-bg-main border-t border-border-light py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className={`px-4 py-2 text-base font-medium ${
                    pathname === item.href ? 'text-gold' : 'text-text-primary'
                  }`}>
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}