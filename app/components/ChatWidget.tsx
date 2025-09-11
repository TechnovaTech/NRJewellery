'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Gem, User, Phone } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [formData, setFormData] = useState({ name: '', mobile: '' })
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to Luxe Jewelry! 💎', sender: 'bot', time: '12:30' },
    { id: 2, text: 'How can I help you find the perfect piece today?', sender: 'bot', time: '12:30' }
  ])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.mobile.trim()) {
      setShowForm(false)
      const welcomeMessage = {
        id: messages.length + 1,
        text: `Hello ${formData.name}! Thank you for contacting us. How can we help you today?`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, welcomeMessage])
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')
      
      // Auto reply
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: 'Thank you for your message! Our jewelry expert will assist you shortly. ✨',
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, reply])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 h-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-yellow-200/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-amber-600 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Gem className="text-white" size={20} />
                <h3 className="text-white font-semibold">{showForm ? 'Contact Us' : 'Luxe Support'}</h3>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setShowForm(true)
                  setFormData({ name: '', mobile: '' })
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {showForm ? (
              /* Contact Form */
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Get in Touch</h4>
                  <p className="text-sm text-gray-600">Please fill in your details to start chatting</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="Mobile Number"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Start Chat
                  </motion.button>
                </form>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask about our jewelry..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition-colors"
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-yellow-600 to-amber-600 p-4 rounded-full shadow-2xl border-2 border-white/20 glow-pulse"
      >
        <MessageCircle className="text-white" size={24} />
      </motion.button>
    </div>
  )
}