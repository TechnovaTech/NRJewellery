'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, ShoppingCart, BarChart3, Users } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/stock', label: 'Stock', icon: Package },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/settings', label: 'Settings', icon: Package },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <button
              onClick={() => {
                fetch('/api/auth/logout', { method: 'POST' })
                window.location.href = '/login'
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}