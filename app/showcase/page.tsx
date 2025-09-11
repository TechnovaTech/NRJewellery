'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const jewelryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Diamond Solitaire Ring",
    price: "$2,499",
    priceValue: 2499,
    material: "18K White Gold",
    description: "Classic 1ct diamond solitaire with brilliant cut stone. Perfect for engagements.",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Gold Tennis Necklace",
    price: "$1,899",
    priceValue: 1899,
    material: "14K Yellow Gold",
    description: "Elegant tennis necklace with premium diamonds. Timeless luxury piece.",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Pearl Drop Earrings",
    price: "$899",
    priceValue: 899,
    material: "Sterling Silver",
    description: "Cultured pearls with diamond accents. Sophisticated and elegant.",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Silver Chain Bracelet",
    price: "$599",
    priceValue: 599,
    material: "925 Sterling Silver",
    description: "Handcrafted chain bracelet with unique links. Modern and stylish.",
    rating: 4.6,
    reviews: 203
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Custom Engagement Ring",
    price: "$4,999",
    priceValue: 4999,
    material: "Platinum",
    description: "Bespoke design with center stone of choice. Made to order perfection.",
    rating: 5.0,
    reviews: 67
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Vintage Collection Set",
    price: "$1,299",
    priceValue: 1299,
    material: "Rose Gold",
    description: "Vintage-inspired jewelry set with intricate details. Timeless elegance.",
    rating: 4.8,
    reviews: 98
  }
]

export default function ShowcasePage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sortBy, setSortBy] = useState('featured')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const sortedItems = [...jewelryItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.priceValue - b.priceValue
      case 'price-high':
        return b.priceValue - a.priceValue
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-space font-bold text-gray-800 mb-4">
            Jewelry Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewelry pieces
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              {sortedItems.length} items
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-gray-600 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Jewelry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    if (isInWishlist(item.id)) {
                      removeFromWishlist(item.id)
                    } else {
                      addToWishlist({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        image: item.src,
                        category: 'jewelry'
                      })
                    }
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                    isInWishlist(item.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={isInWishlist(item.id) ? 'fill-current' : ''} size={18} />
                </button>

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedItem(item)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-gray-800 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Eye size={18} />
                </button>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.material}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-yellow-600">{item.price}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="text-yellow-400 fill-current mr-1" size={14} />
                    <span>({item.reviews} reviews)</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      name: item.title,
                      price: item.price,
                      image: item.src,
                      category: 'jewelry'
                    })
                  }}
                  className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedItem.title}</h2>
                    <p className="text-xl text-yellow-600 font-bold mb-4">{selectedItem.price}</p>
                    <p className="text-gray-600 mb-4">{selectedItem.material}</p>
                    <p className="text-gray-700 mb-6">{selectedItem.description}</p>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${i < Math.floor(selectedItem.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({selectedItem.reviews} reviews)</span>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          addToCart({
                            id: selectedItem.id,
                            name: selectedItem.title,
                            price: selectedItem.price,
                            image: selectedItem.src,
                            category: 'jewelry'
                          })
                          setSelectedItem(null)
                        }}
                        className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          if (isInWishlist(selectedItem.id)) {
                            removeFromWishlist(selectedItem.id)
                          } else {
                            addToWishlist({
                              id: selectedItem.id,
                              name: selectedItem.title,
                              price: selectedItem.price,
                              image: selectedItem.src,
                              category: 'jewelry'
                            })
                          }
                        }}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          isInWishlist(selectedItem.id)
                            ? 'bg-red-500 text-white'
                            : 'border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={isInWishlist(selectedItem.id) ? 'fill-current' : ''} size={18} />
                        <span>{isInWishlist(selectedItem.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}