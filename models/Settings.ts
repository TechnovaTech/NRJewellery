import mongoose from 'mongoose'

const SettingsSchema = new mongoose.Schema({
  taxRate: {
    type: Number,
    default: 0.08,
    min: 0,
    max: 1
  },
  shippingCost: {
    type: Number,
    default: 15,
    min: 0
  },
  discountCode: {
    type: String,
    default: ''
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  discountActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)