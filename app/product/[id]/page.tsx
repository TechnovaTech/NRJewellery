'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Minus, Plus, Share2, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Footer from '../../components/Footer'


export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState('7')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('care')
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const productId = params.id as string
  
  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const productData = await response.json()
          setProduct(productData)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (productId) {
      fetchProduct()
    }
  }, [productId])
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/" className="text-gray-800 hover:underline">Return to Home</Link>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.svg']
  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
  
  const originalPrice = product.price * 1.2
  const savings = originalPrice - product.price
  
  const getMetalWeight = () => {
    const categoryName = product.category?.name?.toLowerCase() || ''
    switch(categoryName) {
      case 'necklaces': return '8.5g'
      case 'earrings': return '2.1g'
      case 'bracelets': return '12.3g'
      case 'rings': return '3.2g'
      default: return '5.0g'
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-white mt-6">
      <div className="max-w-7xl mx-auto px-4">
 
        <Link href="/jewelry">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium mb-6"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 lg:gap-12 bg-white backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-300">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-gray-800' : 'border-gray-300'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide">{product.category?.name}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mt-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mt-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(5.0 rating)</span>
                <button className="text-gray-800 hover:underline ml-4">Write a review</button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">₹{originalPrice.toFixed(0)}</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save ₹{savings.toFixed(0)}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Ring Size */}
            {product.category?.name?.toLowerCase() === 'rings' && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Ring Size</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded-lg border text-center ${
                        selectedSize === size
                          ? 'border-gray-800 bg-gray-100 text-gray-800'
                          : 'border-gray-300 hover:border-gray-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="text-gray-800 hover:underline text-sm">Size Guide</button>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className={`font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (product.inStock) {
                    for (let i = 0; i < quantity; i++) {
                      addToCart({
                        id: product._id,
                        name: product.name,
                        price: `₹${product.price}`,
                        image: product.images[0],
                        category: product.category.name,
                        size: selectedSize
                      })
                    }
                  }
                }}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  product.inStock 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (isInWishlist(product._id)) {
                    removeFromWishlist(product._id)
                  } else {
                    addToWishlist({
                      id: product._id,
                      name: product.name,
                      price: `₹${product.price}`,
                      image: product.images[0],
                      category: product.category.name
                    })
                  }
                }}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  size={24} 
                  className={isInWishlist(product._id) ? "text-gray-800 fill-gray-800" : "text-gray-600"} 
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Share2 size={24} className="text-gray-600" />
              </motion.button>
            </div>

            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}