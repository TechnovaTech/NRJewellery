'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistItem {
  id: number
  name: string
  price: string
  image: string
  category: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id)
  }

  const clearWishlist = () => {
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