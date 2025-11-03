'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: { name: string; _id: string }
  images: string[]
  inStock: boolean
  featured: boolean
}

interface Category {
  _id: string
  name: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: ['', '', '', ''],
    inStock: true,
    featured: false
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          images: newProduct.images.filter(img => img.trim() !== '')
        })
      })
      
      if (res.ok) {
        fetchProducts()
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          images: ['', '', '', ''],
          inStock: true,
          featured: false
        })
        setShowAddForm(false)
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category._id,
      images: [...product.images, '', '', '', ''].slice(0, 4),
      inStock: product.inStock,
      featured: product.featured
    })
    setShowAddForm(true)
  }

  const handleImageUpload = async (file: File | undefined, index: number) => {
    if (!file) return
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (res.ok) {
        const data = await res.json()
        const updatedImages = [...newProduct.images]
        updatedImages[index] = data.filename
        setNewProduct({...newProduct, images: updatedImages})
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
        if (res.ok) fetchProducts()
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{color: '#000000'}}>Products</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
          style={{backgroundColor: '#C6A664'}}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4"
            style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold" style={{color: '#111111'}}>{product.name}</h3>
              <p style={{color: '#555555'}}>{product.category.name}</p>
              <p className="font-bold" style={{color: '#C6A664'}}>${product.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" style={{color: '#C6A664'}} />
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6" style={{color: '#111111'}}>
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#555555'}}>Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{borderColor: '#E0E0E0', focusRingColor: '#C6A664'}}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#555555'}}>Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    style={{borderColor: '#E0E0E0'}}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#555555'}}>Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{borderColor: '#E0E0E0'}}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#555555'}}>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{borderColor: '#E0E0E0'}}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium" style={{color: '#555555'}}>Product Images (Max 4)</label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="space-y-3">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{borderColor: '#E0E0E0'}}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files?.[0], index)}
                          className="hidden"
                          id={`image-${index}`}
                        />
                        <label
                          htmlFor={`image-${index}`}
                          className="cursor-pointer block"
                        >
                          {newProduct.images[index] ? (
                            <img
                              src={newProduct.images[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          ) : (
                            <div className="h-24 flex items-center justify-center">
                              <span className="text-sm" style={{color: '#555555'}}>Choose Image {index + 1}</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 text-white py-3 rounded-lg font-medium transition-all"
                  style={{backgroundColor: '#C6A664'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#B8965A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#C6A664'}
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                    setNewProduct({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      images: ['', '', '', ''],
                      inStock: true,
                      featured: false
                    })
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all"
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