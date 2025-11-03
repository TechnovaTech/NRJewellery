'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Package, Truck, Calendar, CreditCard } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: string
  items: {
    name: string
    price: number
    quantity: number
    image: string
  }[]
  shippingAddress: {
    name: string
    address: string
    city: string
    zipCode: string
  }
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push('/')
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (response.ok) {
          const data = await response.json()
          const orderData = data.order
          setOrder({
            id: orderData._id,
            orderNumber: orderData.orderNumber,
            status: orderData.status,
            totalAmount: orderData.totalAmount,
            createdAt: orderData.createdAt,
            items: orderData.items.map((item: any) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            })),
            shippingAddress: {
              name: orderData.shippingAddress.name,
              address: orderData.shippingAddress.address,
              city: orderData.shippingAddress.city,
              zipCode: orderData.shippingAddress.zipCode
            }
          })
        } else {
          router.push('/orders')
        }
      } catch (error) {
        console.error('Failed to fetch order:', error)
        router.push('/orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Order not found</h1>
          <Link href="/" className="text-gold hover:underline">Return to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-main pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Order Confirmed!</h1>
          <p className="text-text-secondary">Thank you for your purchase. Your order has been received.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-gold to-yellow-500 px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white">
              <div>
                <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                <p className="opacity-90">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-2xl font-bold">${order.totalAmount.toFixed(2)}</p>
                <p className="opacity-90 capitalize">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
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
                        <p className="font-semibold text-text-primary">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-text-primary">{order.shippingAddress.name}</p>
                  <p className="text-text-secondary">{order.shippingAddress.address}</p>
                  <p className="text-text-secondary">
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-4 mt-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Estimated Delivery
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-text-primary">
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {' '}
                    {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-text-secondary text-sm">Standard shipping (7-10 business days)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4"
        >
          <p className="text-text-secondary">
            We'll send you shipping confirmation and tracking information via email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              View All Orders
            </Link>
            <Link
              href="/jewelry"
              className="px-6 py-3 border border-gold text-gold rounded-lg hover:bg-gold hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}