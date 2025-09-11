'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Minus, Plus, Share2, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { jewelryItems } from '../../data/jewelryData'
import Footer from '../../components/Footer'


export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState('7')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('care')
  
  const productId = parseInt(params.id as string)
  const product = jewelryItems.find(item => item.id === productId)
  
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

  const images = [product.image, product.image, product.image, product.image]
  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
  
  const originalPrice = product.priceValue * 1.2
  const savings = originalPrice - product.priceValue
  
  const getMetalWeight = () => {
    switch(product.category) {
      case 'ring': return '3.2g'
      case 'necklace': return '8.5g'
      case 'earrings': return '2.1g'
      case 'bracelet': return '12.3g'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 bg-white backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-300">
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
              <p className="text-gray-600 text-sm uppercase tracking-wide">{product.category}s</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mt-2">{product.name}</h1>
              
              <div className="flex items-center space-x-2 mt-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < Math.floor(product.rating) ? "fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <button className="text-gray-800 hover:underline ml-4">Write a review</button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">${product.priceValue}</span>
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-400 line-through">${originalPrice.toFixed(0)}</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save ${savings.toFixed(0)}
              </span>
            </div>

            {/* Ring Size */}
            {product.category === 'ring' && (
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
                <span className="text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      size: selectedSize
                    })
                  }
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Add to Cart</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id)
                  } else {
                    addToWishlist(product)
                  }
                }}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  size={24} 
                  className={isInWishlist(product.id) ? "text-gray-800 fill-gray-800" : "text-gray-600"} 
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

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Material:</span>
                  <span className="ml-2 font-medium capitalize">{product.material}</span>
                </div>
                <div>
                  <span className="text-gray-500">Color:</span>
                  <span className="ml-2 font-medium capitalize">{product.color}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Style:</span>
                  <span className="ml-2 font-medium capitalize">{product.subcategory}</span>
                </div>
                <div>
                  <span className="text-gray-500">Metal Weight:</span>
                  <span className="ml-2 font-medium">{getMetalWeight()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Purity:</span>
                  <span className="ml-2 font-medium">18K (75% Pure)</span>
                </div>
                {product.category === 'ring' && (
                  <>
                    <div>
                      <span className="text-gray-500">Band Width:</span>
                      <span className="ml-2 font-medium">2.5mm</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Setting:</span>
                      <span className="ml-2 font-medium">Prong Setting</span>
                    </div>
                  </>
                )}
                {product.category === 'necklace' && (
                  <>
                    <div>
                      <span className="text-gray-500">Chain Length:</span>
                      <span className="ml-2 font-medium">18 inches</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Chain Type:</span>
                      <span className="ml-2 font-medium">Cable Chain</span>
                    </div>
                  </>
                )}
                {product.category === 'earrings' && (
                  <>
                    <div>
                      <span className="text-gray-500">Closure:</span>
                      <span className="ml-2 font-medium">Push Back</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Drop Length:</span>
                      <span className="ml-2 font-medium">12mm</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-gray-700">18K {product.material} Band</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-gray-700">Premium Quality {product.material}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-gray-700">Lifetime Warranty</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-gray-700">Free Shipping & Returns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button 
                onClick={() => setActiveTab('care')}
                className={`border-b-2 py-2 px-1 text-sm font-medium ${
                  activeTab === 'care' 
                    ? 'border-gray-800 text-gray-800' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Care Instructions
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`border-b-2 py-2 px-1 text-sm font-medium ${
                  activeTab === 'shipping' 
                    ? 'border-gray-800 text-gray-800' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Shipping & Returns
              </button>
              <button 
                onClick={() => setActiveTab('size')}
                className={`border-b-2 py-2 px-1 text-sm font-medium ${
                  activeTab === 'size' 
                    ? 'border-gray-800 text-gray-800' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Size Guide
              </button>
            </nav>
          </div>
          <div className="py-6">
            {activeTab === 'care' && (
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold mb-3">Care Instructions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Clean with a soft, lint-free cloth</li>
                  <li>• Store in a jewelry box or soft pouch</li>
                  <li>• Avoid contact with chemicals, perfumes, and lotions</li>
                  <li>• Remove before swimming, showering, or exercising</li>
                  <li>• Professional cleaning recommended every 6 months</li>
                </ul>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold mb-3">Shipping & Returns</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h5 className="font-medium mb-2">Free Shipping</h5>
                    <ul className="space-y-1">
                      <li>• Free standard shipping on orders over $500</li>
                      <li>• Express shipping available for $25</li>
                      <li>• International shipping rates vary by location</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Delivery Time</h5>
                    <ul className="space-y-1">
                      <li>• Standard: 5-7 business days</li>
                      <li>• Express: 2-3 business days</li>
                      <li>• International: 10-14 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Returns</h5>
                    <ul className="space-y-1">
                      <li>• 30-day return policy</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping on defective items</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'size' && (
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold mb-3">Size Guide</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h5 className="font-medium mb-2">Ring Sizing Tips</h5>
                    <ul className="space-y-1">
                      <li>• Measure your finger at the end of the day when it's largest</li>
                      <li>• The ring should fit snugly but slide over your knuckle easily</li>
                      <li>• Consider the width of the band - wider bands fit tighter</li>
                      <li>• Cold weather can make fingers smaller</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Size Chart</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Size 5: 15.7mm diameter</li>
                      <li>• Size 6: 16.5mm diameter</li>
                      <li>• Size 7: 17.3mm diameter</li>
                      <li>• Size 8: 18.2mm diameter</li>
                      <li>• Size 9: 19.0mm diameter</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}