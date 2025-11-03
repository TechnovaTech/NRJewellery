'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface WishlistItem {
  id: string | number
  name: string
  price: string
  image: string
  category: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string | number) => void
  isInWishlist: (id: string | number) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { user, loading } = useAuth()

  // Load wishlist data from backend
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/wishlist?userId=${user.id}`)
          if (response.ok) {
            const data = await response.json()
            setItems(data.items.map((item: any) => ({
              id: parseInt(item.productId) || item.productId,
              name: item.name,
              price: `₹${item.price.toFixed(2)}`,
              image: item.image,
              category: item.category
            })))
          }
        } catch (error) {
          console.error('Failed to load wishlist:', error)
        }
      } else if (!loading) {
        const guestWishlist = localStorage.getItem('wishlist_guest')
        setItems(guestWishlist ? JSON.parse(guestWishlist) : [])
      }
    }
    
    loadWishlist()
  }, [user, loading])

  // Save guest wishlist to localStorage
  useEffect(() => {
    if (!user && !loading) {
      localStorage.setItem('wishlist_guest', JSON.stringify(items))
    }
  }, [items, user, loading])

  const addToWishlist = async (item: WishlistItem) => {
    if (user) {
      try {
        const response = await fetch('/api/wishlist', {
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
            category: item.category
          })))
        }
      } catch (error) {
        console.error('Failed to add to wishlist:', error)
      }
    } else {
      setItems(prev => {
        const existing = prev.find(i => i.id === item.id)
        if (existing) return prev
        return [...prev, item]
      })
    }
  }

  const removeFromWishlist = async (id: string | number) => {
    if (user) {
      try {
        const response = await fetch(`/api/wishlist?userId=${user.id}&productId=${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          const data = await response.json()
          setItems(data.items.map((item: any) => ({
            id: parseInt(item.productId) || item.productId,
            name: item.name,
            price: `₹${item.price.toFixed(2)}`,
            image: item.image,
            category: item.category
          })))
        }
      } catch (error) {
        console.error('Failed to remove from wishlist:', error)
      }
    } else {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const isInWishlist = (id: string | number) => {
    return items.some(item => item.id === id)
  }

  const clearWishlist = async () => {
    if (user) {
      try {
        await fetch(`/api/wishlist?userId=${user.id}`, { method: 'DELETE' })
      } catch (error) {
        console.error('Failed to clear wishlist:', error)
      }
    }
    setItems([])
  }

  const getTotalItems = () => {
    return items.length
  }

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      getTotalItems
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}