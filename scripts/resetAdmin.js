const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb://localhost:27017/nrjewelry'

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema)

async function resetAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Delete existing admin
    await Admin.deleteMany({ email: 'admin@nrjewelry.com' })
    console.log('Deleted existing admin')
    
    // Create new admin with direct password hash
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = new Admin({
      email: 'admin@nrjewelry.com',
      password: hashedPassword,
      name: 'Admin'
    })
    
    await admin.save()
    console.log('New admin created successfully')
    console.log('Email: admin@nrjewelry.com')
    console.log('Password: admin123')
    
    // Test the password immediately
    const testAdmin = await Admin.findOne({ email: 'admin@nrjewelry.com' })
    const isValid = await bcrypt.compare('admin123', testAdmin.password)
    console.log('Password verification test:', isValid)
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

resetAdmin()