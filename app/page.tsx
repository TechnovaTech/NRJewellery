'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Facebook, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import TrustSection from './components/TrustSection'
import NewArrival from './components/NewArrival'

const categories = [
  {
    id: 1,
    name: 'COMBO SETS',
    image: '/ring1.webp'
  },
  {
    id: 2,
    name: 'NECKLACES',
    image: '/nacklace1.webp'
  },
  {
    id: 3,
    name: 'EARRINGS',
    image: '/earring1.jpeg'
  },
  {
    id: 4,
    name: 'BANGLES',
    image: '/bracelet3.webp'
  },
  
  
]

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  
  // Duplicate categories for infinite loop
  const infiniteCategories = [...categories, ...categories]

  const scrollLeft = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth / 3
      const newPosition = Math.max(0, scrollPosition - itemWidth)
      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth / 3
      const maxPosition = itemWidth * categories.length
      let newPosition = scrollPosition + itemWidth
      
      if (newPosition >= maxPosition) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        setScrollPosition(0)
      } else {
        scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
        setScrollPosition(newPosition)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.clientWidth / 3 // Show 3 items at once
        
        setScrollPosition(prev => {
          const newPosition = prev + itemWidth
          const maxPosition = itemWidth * categories.length
          
          // Reset to beginning when we've scrolled through original set
          if (newPosition >= maxPosition) {
            scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' })
            return 0
          }
          
          scrollRef.current?.scrollTo({ left: newPosition, behavior: 'smooth' })
          return newPosition
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
          src="/hero.jpg"
            //src="https://assets.bounceexchange.com/assets/uploads/clients/4821/creatives/6fd81332b04cace4b6bf8ae8e2810b18.jpg"
            alt="Jewelry Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        {/* <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://media.davidyurman.com/video/Content/2025/7-14-Amulets/Mens-Amulets/2025_Summer4_MenAmulets_Hero_Desktop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div> */}
        
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-left max-w-2xl mx-8 mt-32"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            {/*<Sparkles className="text-yellow-400" size={60} /> */}
          </motion.div>
          
           <h1 className="text-3xl sm:text-4xl lg:text-5xl pt-6 font-space font-black text-white mb-6 leading-tight text-start">
            YOUR STORY, OUR CRAFT.
            <br />
            {/* <span className="text-yellow-400">JEWELRY</span> */}
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 font-light">
            Custom jewellery designed to reflect you—today, tomorrow, forever.
          </p> 

          <div className="flex space-x-4">
            <Link href="/jewelry">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4  font-bold text-lg transition-all duration-300"
              >
                Shop Now
                {/* <ArrowRight className="ml-2" size={20} /> */}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="mx-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space font-bold text-gray-800 mb-4">
             Shop By Category
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover the perfect piece for every moment
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <Link 
                  href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="relative aspect-square cursor-pointer group rounded-lg overflow-hidden block"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <h3 className="text-lg font-medium text-gray-800 mt-3">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Design Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
                  Unique by Design ✨
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                At NR Crafted Jewellery,
                <span className="block text-gray-600 text-2xl sm:text-3xl mt-2">what kind of life will this belong to?</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Our designs are more than settings and stones — they're moments made tangible. 
                  Minimal yet timeless, each creation is sketched with intention, crafted with precision, 
                  and finished to feel like it's always been yours.
                </p>
                
                <p>
                  From the curve of a ring to the polish of a clasp, subtle details set our pieces apart — 
                  elegant enough for milestone celebrations, effortless enough for golden-hour dinners, 
                  unforgettable enough for every day in between.
                </p>
                
                <p className="text-gray-800 font-medium">
                  Because true luxury isn't loud. It's lasting. And it's uniquely yours.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link href="/jewelry">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explore Collection
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Home2.png"
                  alt="Artisan crafting jewelry"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/30 to-transparent"></div>
              </div>
              
              
              
            </motion.div>
          </div>
        </div>
      </section>

      <NewArrival />
      <TrustSection />



      {/* Customer Reviews Section */}
      <section className="py-17 pb-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/30 via-white to-gray-100/30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space font-bold text-gray-800 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from our jewelry lovers around the world 
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex space-x-6"
            >
              {[
                {
                  name: "Sarah Johnson",
                  location: "New York, NY",
                  rating: 5,
                  review: "Absolutely stunning custom engagement ring! The team brought my vision to life perfectly. The quality is exceptional and the service was outstanding. 💍",
                  product: "Custom Engagement Ring",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                  verified: true
                },
                {
                  name: "Michael Chen",
                  location: "Los Angeles, CA",
                  rating: 5,
                  review: "Best jewelry shopping experience ever! The staff was knowledgeable and patient. My wife absolutely loves her anniversary necklace. ✨",
                  product: "Diamond Necklace",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                  verified: true
                },
                {
                  name: "Emma Rodriguez",
                  location: "Chicago, IL",
                  rating: 5,
                  review: "The custom design process was amazing! They listened to every detail and created the perfect piece. I get compliments every day! 🌟",
                  product: "Custom Bracelet",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
                  verified: true
                },
                {
                  name: "David Wilson",
                  location: "Miami, FL",
                  rating: 5,
                  review: "Top-notch quality and service. The watch I purchased is absolutely gorgeous and arrived exactly as described. Highly recommend! ⌚",
                  product: "Luxury Watch",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                  verified: true
                },
                {
                  name: "Lisa Park",
                  location: "Seattle, WA",
                  rating: 5,
                  review: "Incredible craftsmanship and attention to detail. The earrings are absolutely gorgeous and the customer service was exceptional throughout. 👂",
                  product: "Diamond Earrings",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
                  verified: true
                }
              ].concat([
                {
                  name: "Sarah Johnson",
                  location: "New York, NY",
                  rating: 5,
                  review: "Absolutely stunning custom engagement ring! The team brought my vision to life perfectly. The quality is exceptional and the service was outstanding. 💍",
                  product: "Custom Engagement Ring",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                  verified: true
                },
                {
                  name: "Michael Chen",
                  location: "Los Angeles, CA",
                  rating: 5,
                  review: "Best jewelry shopping experience ever! The staff was knowledgeable and patient. My wife absolutely loves her anniversary necklace. ✨",
                  product: "Diamond Necklace",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                  verified: true
                }
              ]).map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
                  className="bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-8 min-w-[380px] max-w-[380px] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-gray-200/20 to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex text-yellow-400 text-xl">
                        {[...Array(review.rating)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 + (index % 5) * 0.2 }}
                          >
                            ⭐
                          </motion.span>
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs text-gray-800 font-bold bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                          ✓ VERIFIED
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                      "{review.review}"
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover border-3 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                        <p className="text-gray-500 text-sm">{review.location}</p>
                        <p className="text-gray-800 text-sm font-medium mt-1">{review.product}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </section>
      <Footer />      
    </div>
  )
}