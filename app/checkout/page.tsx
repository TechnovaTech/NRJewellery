'use client'

import { motion } from 'framer-motion'
import { CreditCard, Lock, ArrowLeft, Smartphone, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user, isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [settings, setSettings] = useState({ taxRate: 0.08, shippingCost: 50 })

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login')
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        phone: user.phone || ''
      }))
    }
  }, [user, isLoggedIn, loading, router])

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
    fetchSettings()
  }, [items, router])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(data.settings)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const applyDiscount = async () => {
    try {
      const res = await fetch('/api/discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode })
      })
      const data = await res.json()
      
      if (data.valid) {
        setDiscount(data.discount)
        alert(data.message)
      } else {
        alert(data.message)
        setDiscount(0)
      }
    } catch (error) {
      alert('Failed to apply discount')
    }
  }

  const subtotal = getTotalPrice()
  const discountAmount = (subtotal * discount) / 100
  const discountedSubtotal = subtotal - discountAmount
  const shipping = discountedSubtotal > 1000 ? 0 : settings.shippingCost
  const tax = discountedSubtotal * settings.taxRate
  const total = discountedSubtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setIsProcessing(true)
    
    try {
      const orderData = {
        userId: user.id,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: parseFloat(item.price.replace('₹', '').replace('$', '').replace(',', '')),
          quantity: item.quantity,
          image: item.image,
          size: item.size,
          length: item.length
        })),
        totalAmount: total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: 'USA'
        },
        paymentMethod: paymentMethod === 'paypal' ? 'cod' : paymentMethod
      }
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })
      
      if (response.ok) {
        const result = await response.json()
        await clearCart() // Clear cart from database
        router.push(`/order-confirmation?orderId=${result.order.id}`)
      } else {
        throw new Error('Order creation failed')
      }
    } catch (error) {
      alert('Order processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 mb-6 mt-6">
        <div className="flex items-center mb-8">
          <Link href="/cart" className="flex items-center text-gray-800 hover:underline">
            <ArrowLeft size={20} className="mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Payment Form */}
          <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Lock size={24} className="mr-2" />
              Secure Checkout
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none mt-4"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none mt-4"
                  required
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center space-x-2 ${paymentMethod === 'card' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'}`}
                  >
                    <CreditCard size={20} />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center space-x-2 ${paymentMethod === 'paypal' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'}`}
                  >
                    <Wallet size={20} />
                    <span>Cash On Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center space-x-2 ${paymentMethod === 'apple' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'}`}
                  >
                    <Smartphone size={20} />
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center space-x-2 ${paymentMethod === 'google' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'}`}
                  >
                    <Wallet size={20} />
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Payment Information */}
              {paymentMethod === 'card' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <CreditCard size={20} className="mr-2" />
                    Card Information
                  </h3>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none mt-4"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                  <div className="flex justify-center mb-2">
                    <Wallet size={48} className="text-gray-800" />
                  </div>
                  <p className="text-sm text-gray-500">Secure PayPal checkout</p>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                  <div className="flex justify-center mb-2">
                    <Smartphone size={48} className="text-gray-800" />
                  </div>
                  <p className="text-sm text-gray-500">Quick and secure payment</p>
                </div>
              )}

              {paymentMethod === 'google' && (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 mb-4">Pay quickly with your Google account</p>
                  <div className="flex justify-center mb-2">
                    <Wallet size={48} className="text-gray-800" />
                  </div>
                  <p className="text-sm text-gray-500">Fast Google Pay checkout</p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg mt-6 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 
                 paymentMethod === 'card' ? 'Complete Payment' : 
                 paymentMethod === 'paypal' ? 'Place Order (COD)' :
                 paymentMethod === 'apple' ? 'Pay with Apple Pay' :
                 'Pay with Google Pay'}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-300 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={applyDiscount}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({(settings.taxRate * 100).toFixed(1)}%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-gray-800">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}