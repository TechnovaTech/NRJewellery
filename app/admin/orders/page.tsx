'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Order {
  _id: string
  orderNumber: string
  userId: { name: string; email: string }
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.orders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      })
      
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  if (loading) return <div className="p-8">Loading orders...</div>

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8" style={{color: '#000000'}}>Order Management</h1>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="bg-white rounded-xl p-6 shadow-lg"
            style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold" style={{color: '#111111'}}>{order.orderNumber}</h3>
                <p style={{color: '#555555'}}>{order.userId.name} - {order.userId.email}</p>
                <p className="text-sm" style={{color: '#555555'}}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">${order.totalAmount}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs text-white ${order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Items:</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className="text-gray-300 text-sm">
                  {item.name} x{item.quantity} - ${item.price}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(order._id, status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    order.status === status
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}