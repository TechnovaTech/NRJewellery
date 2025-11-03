'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok && data.user) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        return { success: true }
      }
      
      return { success: false, message: data.message || 'Login failed' }
    } catch (error) {
      return { success: false, message: 'Network error' }
    }
  }

  const register = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      })
      
      const data = await response.json()
      
      if (response.ok && data.user) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        return { success: true }
      }
      
      return { success: false, message: data.message || 'Registration failed' }
    } catch (error) {
      return { success: false, message: 'Network error' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    localStorage.removeItem('wishlist')
  }

  const requireAuth = (): boolean => {
    return user !== null
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: user !== null,
      loading,
      login,
      register,
      logout,
      requireAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}