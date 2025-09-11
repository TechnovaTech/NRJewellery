'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'

export default function AboutPage() {
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
            src="/aboutbackground.jpg"
            alt="About Us Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          >
            Proudly AAPI Female Founded & Led
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-light text-white fw-700 mb-6 sm:mb-8 leading-tight tracking-wide"
          >
            We are <span className="italic">NR Crafted Jewellery</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto px-4"
          >
            Crafting a legacy of modern luxury.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Company Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-600 mb-4 sm:mb-6 tracking-wide">Our Heritage</h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gray-800 mx-auto"></div>
          </motion.div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
              At NR Crafted Jewellery, heritage is more than the past—it is the quiet confidence we inherit, the timeless beauty we choose, and the elegance we carry forward.
              Our story begins with a reverence for craftsmanship. Every diamond, every gold setting, every clasp is a testament to artistry refined through generations of jewelers who knew that true luxury is not loud—it is enduring.
              We draw inspiration from timeless elegance and modern sophistication—where beauty is lived, not displayed, and every moment is savored.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              This spirit shapes every collection we create: classic, refined, and graceful, with a touch of contemporary allure.
              Heritage also means responsibility. Each piece is thoughtfully sourced and ethically crafted, designed to last as long as the memories it celebrates. Jewellery that begins with one generation and becomes the treasure of the next.
              At NR Crafted Jewellery, we don’t just create ornaments for today—we craft heirlooms that carry your story into tomorrow.
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-64 sm:h-80 md:h-screen"
          >
            <Image
              src="/about1.jpg"
              alt="Jewelry design sketch"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-64 sm:h-80 md:h-screen"
          >
            <Image
              src="/about2.jpg"
              alt="Jewelry craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50">
        {/* Top Text */}
        <div className="py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 leading-relaxed">
"Your story, our craft—jewellery designed to be lived in today and remembered forever."            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Image */}
        <div className="bg-gray-50 relative order-2 lg:order-1">
          <div className="relative h-96 sm:h-[500px] lg:h-full w-full">
            <Image
              src="/about3.webp"
              alt="Jewelry craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Right - Text content */}
        <div className="bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12 lg:py-0 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-xl w-full"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 italic mb-4 sm:mb-6 leading-tight">
              Timeless Craft, Ethical Care
            </h3>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-5">
                  In a world where fine jewellery is often hidden behind inflated markups and opaque practices, NR Crafted Jewellery chooses a 
                  different path. We believe true luxury should be effortless and honest—rooted in integrity as much as in beauty.     
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-5">
                  Every piece we create is crafted with care, using ethically sourced diamonds and responsibly refined metals. Designed to 
                  embody both sophistication and conscience, our jewellery reflects a standard of excellence that goes beyond aesthetics.     
            </p>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                 At NR Crafted Jewellery, we honor not just the trust of those who wear our creations today, but also the generations who 
                 will inherit them tomorrow. Because jewellery is more than adornment—it is a legacy of values, memories, and timeless craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 via-white/30 to-gray-100/20 animate-pulse" style={{animationDuration: '8s'}} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-600 mb-4 sm:mb-6 tracking-wide">How It Works</h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gray-800 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {[
              {
                step: "1",
                title: "Discover",
                description: "Explore our collection of timeless diamond and gold essentials, crafted to embody effortless luxury."
              },
              {
                step: "2",
                title: "Select",
                description: "Choose the piece that speaks to you—whether for a milestone, a gift, or simply a moment of self-celebration."
              },
              {
                step: "3",
                title: "Craft",
                description: "Your jewelry is ethically sourced and meticulously crafted with uncompromising quality and care."
              },
              {
                step: "4",
                title: "Deliver",
                description: "Each order arrives in signature packaging that feels like a gift—because it is."
              },
              {
                step: "5",
                title: "Treasure",
                description: "Wear it daily, live with it fully, and let it become part of your story for generations to come."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center p-4 sm:p-6 border border-gray-300 rounded-lg hover:border-gray-800 transition-colors bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-600 mb-3 sm:mb-4 tracking-wide">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed opacity-80">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-200 shadow-xl relative z-10"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-gray-600 mb-4 sm:mb-6 tracking-wide">Start Your Custom Journey</h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 lg:mb-10 opacity-90">
              A custom piece from NR Crafted Jewellery isn't just a design—it's a legacy in the making.<br className="hidden sm:block"/>
              Let's begin something unforgettable.
            </p>
            <Link href="/jewelry">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 sm:gap-3"
              >
                Explore Our Collection
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-lg sm:text-xl"
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/30 via-white/20 to-gray-200/30 animate-pulse" style={{animationDuration: '10s'}} />
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gray-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/50 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-600 mb-4 sm:mb-6 tracking-wide">What Drives Us </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gray-800 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                title: "Quality",
                description: "We believe true luxury is built to last. That's why we use only the finest diamonds and precious metals, crafted with meticulous care to meet the highest standards."
              },
              {
                title: "Authenticity",
                description: "Every piece carries intention—an honest reflection of artistry, integrity, and timeless design. Nothing superfluous, only the essential made beautiful."
              },
              {
                title: "Legacy",
                description: "Our jewelry is created not just for today, but for tomorrow. Made to be lived in, loved, and passed down, each piece becomes part of a story greater than itself."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200"
              >
                <h3 className="text-xl sm:text-2xl font-light text-gray-800 mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}