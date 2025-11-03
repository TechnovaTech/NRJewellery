const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb://localhost:27017/nrjewelry'

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema)

async function createCustomAdmin() {
  const email = process.argv[2]
  const password = process.argv[3]
  const name = process.argv[4] || 'Admin'

  if (!email || !password) {
    console.log('Usage: node customAdmin.js <email> <password> [name]')
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI)
    
    // Remove existing admin
    await Admin.deleteMany({})
    
    const hashedPassword = await bcrypt.hash(password, 12)
    const admin = new Admin({ email, password: hashedPassword, name })
    
    await admin.save()
    console.log(`Admin created: ${email} / ${password}`)
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createCustomAdmin()