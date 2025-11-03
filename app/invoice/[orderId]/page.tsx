'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Print } from 'lucide-react'

interface Invoice {
  orderNumber: string
  date: string
  customer: {
    name: string
    email: string
    address: {
      name: string
      address: string
      city: string
      state: string
      zipCode: string
    }
  }
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  tax: number
  shipping: number
  total: number
  paymentStatus: string
  paymentMethod: string
}

export default function InvoicePage({ params }: { params: { orderId: string } }) {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoice()
  }, [])

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/billing/${params.orderId}`)
      const data = await res.json()
      setInvoice(data.invoice)
    } catch (error) {
      console.error('Failed to fetch invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <div className="p-8">Loading invoice...</div>
  if (!invoice) return <div className="p-8">Invoice not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                <p className="text-purple-100">NR Jewelry</p>
                <p className="text-purple-100 text-sm">Premium Jewelry Collection</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{invoice.orderNumber}</p>
                <p className="text-purple-100">
                  {new Date(invoice.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill To:</h3>
                <div className="text-gray-600">
                  <p className="font-medium text-gray-800">{invoice.customer.name}</p>
                  <p>{invoice.customer.email}</p>
                  <p>{invoice.customer.address.address}</p>
                  <p>
                    {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zipCode}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Info:</h3>
                <div className="text-gray-600">
                  <p>Method: <span className="font-medium">{invoice.paymentMethod.toUpperCase()}</span></p>
                  <p>Status: <span className={`font-medium ${
                    invoice.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>{invoice.paymentStatus.toUpperCase()}</span></p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 text-gray-800">Item</th>
                    <th className="text-center py-4 text-gray-800">Qty</th>
                    <th className="text-right py-4 text-gray-800">Price</th>
                    <th className="text-right py-4 text-gray-800">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 text-gray-800">{item.name}</td>
                      <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-4 text-right text-gray-600">${item.price.toFixed(2)}</td>
                      <td className="py-4 text-right text-gray-800 font-medium">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Shipping:</span>
                  <span>${invoice.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-4 text-xl font-bold text-gray-800 border-t-2 border-gray-200">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Print className="w-5 h-5" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}