'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    if (email && password) {
      setUser({
        id: '1',
        name: email.split('@')[0],
        email: email
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const requireAuth = (): boolean => {
    return user !== null
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: user !== null,
      login,
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