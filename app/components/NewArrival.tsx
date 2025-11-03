'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewArrival() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const products = await response.json()
          // Get featured products or first 5 products
          const featured = products.filter(p => p.featured).slice(0, 5)
          if (featured.length < 5) {
            const additional = products.filter(p => !p.featured).slice(0, 5 - featured.length)
            setFeaturedProducts([...featured, ...additional])
          } else {
            setFeaturedProducts(featured)
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading featured products...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">The Latest Spark</h2>
          <p className="text-lg sm:text-xl text-gray-600">Discover our latest collections</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-end justify-center">
          {featuredProducts.map((product, index) => {
            const sizes = ['max-w-64 h-80 lg:w-64', 'max-w-80 h-96 lg:w-80', 'max-w-96 h-[28rem] lg:w-96', 'max-w-80 h-96 lg:w-80', 'max-w-64 h-80 lg:w-64']
            const textSizes = ['text-3xl', 'text-3xl sm:text-4xl', 'text-4xl sm:text-5xl lg:text-6xl', 'text-3xl sm:text-4xl', 'text-2xl sm:text-3xl']
            
            return (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className={`relative w-full ${sizes[index]} rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-500/20 hover:shadow-gray-800/40 transition-all duration-300`}>
                  <Image
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#A89F91]/80 via-[#A89F91]/20 to-transparent" />
                  <div className={`absolute ${index === 2 ? 'bottom-8 left-8' : 'bottom-6 left-6'} text-[#FFFAF3]`}>
                    <h2 className={`${textSizes[index]} font-serif italic mb-1`}>{product.name}</h2>
                    <p className="text-sm opacity-90">₹{product.price.toLocaleString()}</p>
                    {product.featured && (
                      <span className="inline-block mt-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}