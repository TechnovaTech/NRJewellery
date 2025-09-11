'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, MessageSquare, Gem, Star, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Footer from '../components/Footer'

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BoutiquePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: new Date(),
    time: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Booking request submitted! We\'ll contact you soon.')
    setIsSubmitting(false)
    setFormData({
      name: '',
      email: '',
      date: new Date(),
      time: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen flex flex-col pt-19 bg-white mb-8">
      <div className="flex-1">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-96 flex items-center relative mb-16"
        >
          <div className="absolute inset-0 rounded-3xl mx-6 overflow-hidden shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 via-gray-100/70 to-gray-800/80" />
          </div>
          
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-6 w-full flex items-center justify-center"
          >
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent w-20" />
                <span className="mx-4 text-3xl">💎</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent w-20" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Personal Styling Sessions
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Book your appointment for expert jewelry consultation
              </p>
              
              <div className="flex items-center justify-center mt-6">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent w-32" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 max-w-6xl px-4 sm:px-6 mx-auto gap-6 lg:gap-12 mb-6">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-300"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="mr-3 text-gray-800" />
              Book Your Session
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 mb-2 flex items-center font-medium">
                  <User className="mr-2 text-gray-800" size={16} />
                  Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-800 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2 flex items-center font-medium">
                  <Mail className="mr-2 text-gray-800" size={16} />
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-800 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2 flex items-center font-medium">
                  <Calendar className="mr-2 text-gray-800" size={16} />
                  Preferred Date
                </label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({...formData, date: date || new Date()})}
                    minDate={new Date()}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-800 focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2 flex items-center font-medium">
                  <Clock className="mr-2 text-gray-800" size={16} />
                  Preferred Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({...formData, time})}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        formData.time === time
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2 flex items-center font-medium">
                  <MessageSquare className="mr-2 text-gray-800" size={16} />
                  Special Requests
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-gray-800 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your style preferences, occasion, or any specific pieces you're interested in..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-6 h-6 border-2 border-[#FFFAF3] border-t-transparent rounded-full"
                  />
                ) : (
                  'Book My Session ✨'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="mr-3 text-gray-800" />
                What to Expect
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: '👥',
                    title: 'Personal Consultation',
                    desc: 'One-on-one session with our expert stylist'
                  },
                  {
                    icon: '💎',
                    title: 'Curated Selection',
                    desc: 'Handpicked pieces based on your style and preferences'
                  },
                  {
                    icon: '✨',
                    title: 'Styling Tips',
                    desc: 'Professional advice on how to wear and care for your jewelry'
                  },
                  {
                    icon: '🎁',
                    title: 'Exclusive Access',
                    desc: 'First look at new collections and limited editions'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg border border-gray-300"
            >
              <div className="text-4xl mb-4">🥂</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Premium Experience
              </h3>
              <p className="text-gray-600">
                Complimentary champagne and personalized gift wrapping included
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}