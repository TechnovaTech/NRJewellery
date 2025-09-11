'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

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
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Image src="/logo.png" alt="Logo" width={45} height={46} className="h-10 w-16" />
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-lg font-bold text-gray-800 tracking-wide">
                  NR CRAFTED
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-widest">
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
                      ? 'text-gray-800 border-b-2 border-gray-800 pb-1'
                      : 'text-gray-600 hover:text-gray-800'
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
                className="flex items-center space-x-2 px-4 py-2 rounded-full border bg-white/50 border-gray-300 hover:border-gray-800 transition-all duration-300"
              >
                <Search className="h-4 w-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-32 text-gray-600 placeholder:text-gray-400"
                />
              </motion.div>
            </div>
            
            <Link href="/wishlist">
              <motion.button className="relative p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </motion.button>
            </Link>
            
            <Link href="/cart">
              <motion.button className="relative p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {items.length}
                  </span>
                )}
              </motion.button>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 ml-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-t border-gray-300 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className={`px-4 py-2 text-base font-medium ${
                    pathname === item.href ? 'text-gray-800' : 'text-gray-600'
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