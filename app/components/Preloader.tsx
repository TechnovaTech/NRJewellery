'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-white/30 to-gray-100/20 animate-pulse" style={{animationDuration: '3s'}} />
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <img src="/logo.png" alt="Logo" className="w-56 h-66 mx-auto" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <motion.h1
            className="text-4xl font-bold text-gray-800 uppercase tracking-wide"
          >
            {'NR CRAFTED'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-4xl text-gray-600 uppercase tracking-widest mt-2"
          >
            JEWELLERY
          </motion.p>
        </motion.div>
        
        {/* <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full mx-auto"
        />
        
        <motion.div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-gray-800 rounded-full"
            />
          ))}
        </motion.div>
        /> */}
      </div>
    </motion.div>
  )
}