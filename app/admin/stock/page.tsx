'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Product {
  _id: string
  name: string
  stock: number
  lowStockThreshold: number
  price: number
  category: { name: string }
  images: string[]
}

export default function StockManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [lowStock, setLowStock] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStock()
  }, [])

  const fetchStock = async () => {
    try {
      const res = await fetch('/api/admin/stock')
      const data = await res.json()
      setProducts(data.products)
      setLowStock(data.lowStock)
    } catch (error) {
      console.error('Failed to fetch stock:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStock = async (productId: string, stock: number) => {
    try {
      const res = await fetch('/api/admin/stock', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, stock })
      })
      
      if (res.ok) {
        // Refresh data from server to ensure consistency
        await fetchStock()
      } else {
        fetchStock() // Refresh on error
      }
    } catch (error) {
      console.error('Failed to update stock:', error)
      fetchStock() // Refresh on error
    }
  }

  if (loading) return <div className="p-8">Loading stock...</div>

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8" style={{color: '#000000'}}>Stock Management</h1>
      
      {lowStock.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{color: '#C6A664'}}>Low Stock Alert</h2>
          <div className="grid gap-4">
            {lowStock.map((product) => (
              <div key={product._id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold" style={{color: '#111111'}}>{product.name}</h3>
                    <p className="text-red-600 text-sm">Only {product.stock} left in stock</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={product.stock}
                      className="w-20 px-3 py-2 rounded border"
                      style={{borderColor: '#E0E0E0'}}
                      onChange={(e) => {
                        const newStock = parseInt(e.target.value) || 0
                        setLowStock(prev => prev.map(p => p._id === product._id ? {...p, stock: newStock} : p))
                      }}
                      onBlur={(e) => updateStock(product._id, parseInt(e.target.value) || 0)}
                    />
                    <span style={{color: '#555555'}}>units</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white rounded-xl p-6 shadow-lg"
            style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{color: '#111111'}}>{product.name}</h3>
                <p className="text-sm" style={{color: '#555555'}}>{product.category.name}</p>
                <p className="font-bold text-lg" style={{color: '#C6A664'}}>${product.price}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium mb-2" style={{color: '#555555'}}>Current Stock</p>
                  <input
                    type="number"
                    min="0"
                    value={product.stock}
                    className="w-24 px-3 py-2 rounded border text-center font-medium"
                    style={{borderColor: '#E0E0E0', color: '#111111'}}
                    onChange={(e) => {
                      const newStock = parseInt(e.target.value) || 0
                      setProducts(prev => prev.map(p => p._id === product._id ? {...p, stock: newStock} : p))
                    }}
                    onBlur={(e) => updateStock(product._id, parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  product.stock <= product.lowStockThreshold
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : product.stock <= product.lowStockThreshold * 2
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {product.stock <= product.lowStockThreshold ? 'Low Stock' : 
                   product.stock <= product.lowStockThreshold * 2 ? 'Medium Stock' : 'Good Stock'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}