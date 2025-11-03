const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb://localhost:27017/nrjewelry'

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema)

async function checkAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    const admin = await Admin.findOne({ email: 'admin@nrjewelry.com' })
    
    if (admin) {
      console.log('Admin found:', {
        email: admin.email,
        name: admin.name,
        hasPassword: !!admin.password
      })
      
      // Test password
      const isValid = await bcrypt.compare('admin123', admin.password)
      console.log('Password test result:', isValid)
    } else {
      console.log('Admin not found')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

checkAdmin()