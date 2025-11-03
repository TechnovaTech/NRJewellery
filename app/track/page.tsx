'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'

interface Order {
  _id: string
  orderNumber: string
  status: string
  paymentStatus: string
  totalAmount: number
  createdAt: string
  items: Array<{
    name: string
    quantity: number
    price: number
    image: string
  }>
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const trackOrder = async () => {
    if (!orderNumber.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`/api/orders?orderNumber=${orderNumber}`)
      const data = await res.json()
      
      if (res.ok && data.orders.length > 0) {
        setOrder(data.orders[0])
      } else {
        setError('Order not found')
        setOrder(null)
      }
    } catch (error) {
      setError('Failed to track order')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-6 h-6" />
      case 'processing': return <Package className="w-6 h-6" />
      case 'shipped': return <Truck className="w-6 h-6" />
      case 'delivered': return <CheckCircle className="w-6 h-6" />
      default: return <Clock className="w-6 h-6" />
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-400',
      processing: 'text-blue-400',
      shipped: 'text-purple-400',
      delivered: 'text-green-400',
      cancelled: 'text-red-400'
    }
    return colors[status as keyof typeof colors] || 'text-gray-400'
  }

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered']

  return (
    <div className="min-h-screen p-8" style={{backgroundColor: '#F9F9F9'}}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4" style={{color: '#000000'}}>Track Your Order</h1>
          <p style={{color: '#555555'}}>Enter your order number to track your jewelry</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-8 shadow-lg mb-8"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter order number (e.g., ORD-000001)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{borderColor: '#E0E0E0', color: '#111111'}}
            />
            <button
              onClick={trackOrder}
              disabled={loading}
              className="px-8 py-3 text-white rounded-lg font-medium transition-all disabled:opacity-50"
              style={{backgroundColor: '#C6A664'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#B8965A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#C6A664'}
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </div>
          {error && (
            <p className="text-red-600 mt-4 text-center">{error}</p>
          )}
        </motion.div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Order Status Timeline */}
            <div className="bg-white rounded-xl p-8 shadow-lg" style={{borderColor: '#E0E0E0', borderWidth: '1px'}}>
              <h2 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Order Status</h2>
              <div className="flex justify-between items-center mb-8">
                {statusSteps.map((step, index) => {
                  const isActive = statusSteps.indexOf(order.status) >= index
                  const isCurrent = order.status === step
                  
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400'
                      } ${isCurrent ? 'ring-4' : ''}`}
                      style={{
                        backgroundColor: isActive ? '#C6A664' : 'transparent',
                        borderColor: isActive ? '#C6A664' : '#E0E0E0',
                        ringColor: isCurrent ? '#C6A664' : 'transparent'
                      }}>
                        {getStatusIcon(step)}
                      </div>
                      <p className={`mt-2 text-sm font-medium`}
                      style={{color: isActive ? '#111111' : '#555555'}}>
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </p>
                      {index < statusSteps.length - 1 && (
                        <div className={`absolute w-24 h-0.5 mt-6 ml-12`}
                        style={{
                          backgroundColor: statusSteps.indexOf(order.status) > index ? '#C6A664' : '#E0E0E0'
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl p-8 shadow-lg" style={{borderColor: '#E0E0E0', borderWidth: '1px'}}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold" style={{color: '#000000'}}>{order.orderNumber}</h2>
                  <p style={{color: '#555555'}}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{color: '#C6A664'}}>${order.totalAmount}</p>
                  <p className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Payment {order.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{color: '#111111'}}>Items Ordered</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg" style={{backgroundColor: '#F9F9F9'}}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium" style={{color: '#111111'}}>{item.name}</h4>
                          <p style={{color: '#555555'}}>Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium" style={{color: '#C6A664'}}>${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{color: '#111111'}}>Shipping Address</h3>
                  <div className="p-4 rounded-lg" style={{backgroundColor: '#F9F9F9'}}>
                    <p className="font-medium" style={{color: '#111111'}}>{order.shippingAddress.name}</p>
                    <p style={{color: '#555555'}}>{order.shippingAddress.address}</p>
                    <p style={{color: '#555555'}}>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}