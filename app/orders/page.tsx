'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { Package, Calendar, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react'

interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  items: {
    id: number
    name: string
    price: string
    quantity: number
    image: string
  }[]
}

export default function OrdersPage() {
  const { user, isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login')
    }
    
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/orders?userId=${user.id}`)
          if (response.ok) {
            const data = await response.json()
            setOrders(data.orders.map((order: any) => ({
              id: order.orderNumber,
              date: order.createdAt.split('T')[0],
              total: order.totalAmount,
              status: order.status,
              items: order.items.map((item: any) => ({
                id: item.productId,
                name: item.name,
                price: `$${item.price.toFixed(2)}`,
                quantity: item.quantity,
                image: item.image
              }))
            })))
          }
        } catch (error) {
          console.error('Failed to fetch orders:', error)
        }
      }
    }
    
    fetchOrders()
  }, [user, isLoggedIn, loading, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
    <div className="min-h-screen bg-bg-main pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">My Orders</h1>
          <p className="text-text-secondary">Track and manage your jewelry orders</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No orders yet</h3>
            <p className="text-text-secondary mb-6">Start shopping to see your orders here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push('/jewelry')}
              className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Browse Jewelry
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-border-light">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Order #{order.id}</h3>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-1" />
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 border border-gold text-gold rounded-lg hover:bg-gold hover:text-white transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">{item.name}</h4>
                          <p className="text-text-secondary">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-text-primary">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}