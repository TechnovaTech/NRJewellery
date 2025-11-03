const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb://localhost:27017/nrjewelry'

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Admin = mongoose.model('Admin', AdminSchema)

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = new Admin({
      email: 'admin@nrjewelry.com',
      password: hashedPassword,
      name: 'Admin'
    })
    
    await admin.save()
    console.log('Admin created successfully')
    console.log('Email: admin@nrjewelry.com')
    console.log('Password: admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()