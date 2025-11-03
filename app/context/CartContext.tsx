'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface CartItem {
  id: string | number
  name: string
  price: string
  image: string
  quantity: number
  category: string
  size?: string
  length?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { user, loading } = useAuth()

  // Load cart data from backend
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          // Clear any existing cart data first
          setItems([])
          const response = await fetch(`/api/cart?userId=${user.id}`)
          if (response.ok) {
            const data = await response.json()
            console.log('Loading cart data:', data.items)
            setItems(data.items.map((item: any) => ({
              id: item.productId, // Keep as string
              name: item.name,
              price: `₹${item.price.toFixed(2)}`,
              image: item.image,
              quantity: item.quantity,
              category: item.category,
              size: item.size,
              length: item.length
            })))
          }
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      } else if (!loading) {
        const guestCart = localStorage.getItem('cart_guest')
        setItems(guestCart ? JSON.parse(guestCart) : [])
      }
    }
    
    loadCart()
  }, [user, loading])

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user && !loading) {
      localStorage.setItem('cart_guest', JSON.stringify(items))
    }
  }, [items, user, loading])

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    if (user) {
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, item })
        })
        if (response.ok) {
          const data = await response.json()
          setItems(data.items.map((item: any) => ({
            id: parseInt(item.productId) || item.productId,
            name: item.name,
            price: `₹${item.price.toFixed(2)}`,
            image: item.image,
            quantity: item.quantity,
            category: item.category,
            size: item.size,
            length: item.length
          })))
        }
      } catch (error) {
        console.error('Failed to add to cart:', error)
      }
    } else {
      setItems(prev => {
        const existing = prev.find(i => i.id === item.id)
        if (existing) {
          return prev.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    }
  }

  const removeFromCart = async (id: string | number) => {
    if (user) {
      try {
        const response = await fetch(`/api/cart?userId=${user.id}&productId=${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          const data = await response.json()
          setItems(data.items.map((item: any) => ({
            id: parseInt(item.productId) || item.productId,
            name: item.name,
            price: `₹${item.price.toFixed(2)}`,
            image: item.image,
            quantity: item.quantity,
            category: item.category,
            size: item.size,
            length: item.length
          })))
        }
      } catch (error) {
        console.error('Failed to remove from cart:', error)
      }
    } else {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const updateQuantity = async (id: string | number, quantity: number) => {
    console.log('Updating quantity:', { id, quantity, user: !!user })
    
    if (user) {
      try {
        const response = await fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: id, quantity })
        })
        
        console.log('API response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('API response data:', data)
          console.log('Mapping items:', data.items)
          const mappedItems = data.items.map((item: any) => {
            console.log('Mapping item:', item)
            return {
              id: item.productId, // Keep as string to match MongoDB ObjectId
              name: item.name,
              price: `₹${item.price.toFixed(2)}`,
              image: item.image,
              quantity: item.quantity,
              category: item.category,
              size: item.size,
              length: item.length
            }
          })
          console.log('Final mapped items:', mappedItems)
          setItems(mappedItems)
        } else {
          console.error('API error:', await response.text())
        }
      } catch (error) {
        console.error('Failed to update quantity:', error)
      }
    } else {
      if (quantity <= 0) {
        setItems(prev => prev.filter(item => item.id !== id))
      } else {
        setItems(prev => 
          prev.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        )
      }
    }
  }

  const clearCart = async () => {
    if (user) {
      try {
        await fetch(`/api/cart?userId=${user.id}`, { method: 'DELETE' })
      } catch (error) {
        console.error('Failed to clear cart:', error)
      }
    }
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace('$', '').replace(',', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}