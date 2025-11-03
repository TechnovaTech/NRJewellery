'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Star, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Footer from '../../components/Footer'

// Static data for filters
const materials = ['all', 'gold', 'silver', 'platinum', 'diamond', 'pearl']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: Infinity }
]

export default function CategoryPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const slug = params.slug as string
  
  // State for API data
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filter states
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['all'])
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('newest')

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ])
        
        const categoriesData = await categoriesRes.json()
        const productsData = await productsRes.json()
        
        setCategories(categoriesData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Find current category
  const currentCategory = categories.find(cat => cat.slug === slug)
  
  // Filter and sort products
  const filteredItems = products.filter(product => {
    if (!currentCategory) return false
    
    const categoryMatch = product.category._id === currentCategory._id
    const materialMatch = selectedMaterials.includes('all') // For now, just show all materials
    const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    
    return categoryMatch && materialMatch && priceMatch
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'popular':
        return 0 // No popularity data yet
      case 'rating':
        return 0 // No rating data yet
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <Link href="/" className="text-gray-800 hover:underline">Return to Home</Link>
        </div>
      </div>
    )
  }

  const handleWishlistToggle = (item: any) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category
      })
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-white ">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">FOR EVERY YOU</h1>
        <p className="text-base sm:text-lg text-gray-600">Discover jewelry that matches your style</p>
      </div>

      {/* Category Filters - Horizontal */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link href='/jewelry'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            >
              All Jewelry
            </motion.button>
          </Link>
          {categories.map((category) => (
            <Link key={category._id} href={`/category/${category.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all ${
                  category.slug === slug
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </motion.button>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 flex-shrink-0"
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-300 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
            
            {/* Material */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Material</h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <label key={material} className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={(e) => {
                        if (material === 'all') {
                          setSelectedMaterials(['all'])
                        } else {
                          if (e.target.checked) {
                            setSelectedMaterials(prev => prev.filter(m => m !== 'all').concat(material))
                          } else {
                            const newMaterials = selectedMaterials.filter(m => m !== material)
                            setSelectedMaterials(newMaterials.length === 0 ? ['all'] : newMaterials)
                          }
                        }
                      }}
                      className="w-4 h-4 text-gray-800 bg-white border-gray-300 rounded focus:ring-gray-800 focus:ring-2"
                    />
                    <span className="text-sm text-gray-600">
                      {material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>

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
                setSelectedMaterials(['all'])
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
                <option value="popular">Popular</option>
                <option value="rating">Best Seller</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-300 max-w-md mx-auto">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Items Found</h3>
                <p className="text-gray-600 mb-6">No items match your current selection. Try adjusting your filters.</p>
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
            >
            {filteredItems.map((item, index) => (
            <Link href={`/product/${item._id}`} key={item._id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-200 hover:border-gray-400"
              >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                <Image
                  src={item.images[0] || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all shadow-lg backdrop-blur-sm ${
                    isInWishlist(item._id) 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Heart className={isInWishlist(item._id) ? 'fill-current' : ''} size={18} />
                </motion.button>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg backdrop-blur-sm">
                    {item.category.name}
                  </span>
                </div>
                
                {/* Stock Status */}
                {item.inStock && (
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    In Stock
                  </div>
                )}
                {item.featured && (
                  <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {!item.inStock && (
                    <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                  )}
                </div>
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