'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Settings {
  taxRate: number
  shippingCost: number
  discountCode: string
  discountPercent: number
  discountActive: boolean
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    taxRate: 0.08,
    shippingCost: 15,
    discountCode: '',
    discountPercent: 0,
    discountActive: false
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      setSettings(data.settings)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading settings...</div>

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8" style={{color: '#000000'}}>Settings</h1>
      
      <div className="grid gap-8">
        {/* Tax Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <h2 className="text-xl font-semibold mb-4" style={{color: '#111111'}}>Tax & Shipping</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.taxRate * 100}
                onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value) / 100})}
                className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Shipping Cost ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={settings.shippingCost}
                onChange={(e) => setSettings({...settings, shippingCost: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20"
              />
            </div>
          </div>
        </motion.div>

        {/* Discount Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
          style={{borderColor: '#E0E0E0', borderWidth: '1px'}}
        >
          <h2 className="text-xl font-semibold mb-4" style={{color: '#111111'}}>Discount Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.discountActive}
                onChange={(e) => setSettings({...settings, discountActive: e.target.checked})}
                className="w-4 h-4"
              />
              <label className="text-white">Enable Discount</label>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Discount Code</label>
                <input
                  type="text"
                  value={settings.discountCode}
                  onChange={(e) => setSettings({...settings, discountCode: e.target.value})}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20"
                  placeholder="SAVE10"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Discount Percent (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.discountPercent}
                  onChange={(e) => setSettings({...settings, discountPercent: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}