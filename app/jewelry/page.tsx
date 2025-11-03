'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, Heart, ShoppingCart, Eye, Star, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: {
    _id: string
    name: string
  }
  images: string[]
  inStock: boolean
  featured: boolean
  stock: number
}

const priceRanges = [
  { label: 'All Prices', min: 0, max: 100000 },
  { label: 'Under ₹5000', min: 0, max: 5000 },
  { label: '₹5000 - ₹15000', min: 5000, max: 15000 },
  { label: '₹15000 - ₹30000', min: 15000, max: 30000 },
  { label: '₹30000 - ₹50000', min: 30000, max: 50000 },
  { label: 'Over ₹50000', min: 50000, max: 100000 }
]

export default function JewelryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('newest')
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { requireAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const filteredItems = products.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category.name.toLowerCase() === selectedCategory.toLowerCase()
    const priceMatch = item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max
    
    return categoryMatch && priceMatch
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'featured':
        return b.featured ? 1 : -1
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">FOR EVERY YOU</h1>
        <p className="text-gray-600 text-base sm:text-lg">Discover jewelry that matches your style</p>
      </div>

      {/* Category Filters - Horizontal */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all ${
              selectedCategory === 'all'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            All Jewelry
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all ${
                selectedCategory === category.name
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 flex-shrink-0"
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-300 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <motion.button
                    key={range.label}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedPriceRange.label === range.label
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedCategory('all')
                setSelectedPriceRange(priceRanges[0])
                setSortBy('newest')
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <span className="text-gray-800 font-medium text-lg">
              {filteredItems.length} items found
            </span>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Jewelry Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-300 max-w-md mx-auto">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Jewelry Found</h3>
                <p className="text-gray-600 mb-6">No jewelry matches your current selection. Try adjusting your filters.</p>
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8"
            >
            {filteredItems.map((item, index) => (
            <Link href={`/product/${item._id}`} key={item._id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.images[0] || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (isInWishlist(item._id)) {
                        removeFromWishlist(item._id)
                      } else {
                        addToWishlist({
                          id: item._id,
                          name: item.name,
                          price: `₹${item.price}`,
                          image: item.images[0],
                          category: item.category.name
                        })
                      }
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full ${
                      isInWishlist(item._id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                    } transition-colors`}
                  >
                    <Heart className={isInWishlist(item._id) ? 'fill-current' : ''} size={16} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{color: '#C6A664'}}>₹{item.price}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      (item.stock || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {(item.stock || 0) > 0 ? `${item.stock} in stock` : 'Out of Stock'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!requireAuth()) {
                        router.push('/login')
                        return
                      }
                      addToCart({
                        id: item._id,
                        name: item.name,
                        price: `₹${item.price}`,
                        image: item.images[0],
                        category: item.category.name
                      })
                    }}
                    className="w-full mt-3 py-2 text-white rounded-lg font-medium transition-colors"
                    style={{backgroundColor: '#C6A664'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#B8965A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#C6A664'}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </Link>
            ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}