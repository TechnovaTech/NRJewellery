'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Trash2, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const moveToCart = (item: any) => {
    addToCart(item)
    removeFromWishlist(item.id)
  }

  return (
    <div className="min-h-screen pt-20 bg-white relative">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 mt-6 sm:mb-8 space-y-4 sm:space-y-0">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-gray-800">My Wishlist</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Heart size={20} />
            <span className="text-sm sm:text-base">{items.length} items</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white backdrop-blur-sm rounded-2xl border border-gray-300">
            <Heart className="mx-auto text-gray-800 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Add some beautiful jewelry to your wishlist!</p>
            <Link href="/jewelry">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{item.category}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-800">{item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start space-x-3 w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => moveToCart(item)}
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 text-white"
                      >
                        <ShoppingCart size={16} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {items.length > 0 && (
              <div className="mt-8 text-center space-y-4">
                <Link href="/jewelry">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium mr-4"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearWishlist}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Clear Wishlist
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}