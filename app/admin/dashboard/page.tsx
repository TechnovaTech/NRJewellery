'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Users, ShoppingCart, Settings, BarChart3, Plus, Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Category {
  _id: string
  name: string
  image: string
  slug: string
}

interface User {
  _id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: Category
  images: string[]
  inStock: boolean
  featured: boolean
  createdAt: string
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    inStock: true,
    featured: false
  })

  useEffect(() => {
    fetchCategories()
    fetchUsers()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          images: newProduct.images.filter(img => img.trim() !== '')
        })
      })
      
      if (response.ok) {
        fetchProducts()
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          images: [''],
          inStock: true,
          featured: false
        })
        setShowAddProduct(false)
      }
    } catch (error) {
      console.error('Failed to add product:', error)
    }
  }

  if (loading) return <div className="p-8 text-gray-800">Loading...</div>

  return (
    <div className="p-8 min-h-screen" style={{backgroundColor: '#F9F9F9'}}>
      <h1 className="text-3xl font-bold mb-8" style={{color: '#000000'}}>Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{color: '#555555'}}>Categories</p>
              <p className="text-2xl font-bold" style={{color: '#111111'}}>{categories.length}</p>
            </div>
            <Package className="w-8 h-8" style={{color: '#C6A664'}} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{color: '#555555'}}>Products</p>
              <p className="text-2xl font-bold" style={{color: '#111111'}}>{products.length}</p>
            </div>
            <ShoppingCart className="w-8 h-8" style={{color: '#C6A664'}} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{color: '#555555'}}>Users</p>
              <p className="text-2xl font-bold" style={{color: '#111111'}}>{users.length}</p>
            </div>
            <Users className="w-8 h-8" style={{color: '#C6A664'}} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{color: '#555555'}}>Orders</p>
              <p className="text-2xl font-bold" style={{color: '#111111'}}>0</p>
            </div>
            <BarChart3 className="w-8 h-8" style={{color: '#C6A664'}} />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg mb-8"
        style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{color: '#000000'}}>Quick Actions</h2>
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 text-white rounded-lg transition-all flex items-center gap-2"
            style={{backgroundColor: '#C6A664'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#B8965A'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#C6A664'}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </motion.div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="url"
                placeholder="Image URL"
                value={newProduct.images[0]}
                onChange={(e) => setNewProduct({...newProduct, images: [e.target.value]})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 text-white py-2 rounded-lg transition-all"
                  style={{backgroundColor: '#C6A664'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#B8965A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#C6A664'}
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}