const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/nrjewelry'

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

const Category = mongoose.model('Category', CategorySchema)

const categories = [
  {
    name: 'NECKLACES',
    image: '/nacklace1.webp',
    slug: 'necklaces'
  },
  {
    name: 'RINGS',
    image: '/ring1.webp',
    slug: 'rings'
  },
  {
    name: 'EARRINGS',
    image: '/earring1.jpeg',
    slug: 'earrings'
  },
  {
    name: 'BANGLES',
    image: '/bracelet3.webp',
    slug: 'bangles'
  },
  {
    name: 'BRACELETS',
    image: '/bracelet3.webp',
    slug: 'bracelets'
  }
]

async function seedCategories() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    await Category.deleteMany({})
    console.log('Cleared existing categories')
    
    await Category.insertMany(categories)
    console.log('Categories seeded successfully')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding categories:', error)
    process.exit(1)
  }
}

seedCategories()