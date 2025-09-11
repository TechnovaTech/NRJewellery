'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, Heart, ShoppingCart, Eye } from 'lucide-react'
import Image from 'next/image'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const jewelryItems = [
  // Daily Wear (8 items)
  { id: 1, name: 'SIMPLE GOLD RING', price: '$299', category: 'daily', type: 'ring', material: 'gold', color: 'gold', priceValue: 299, image: 'https://tejaani.com/wp-content/uploads/2021/03/BRCJ7-1.jpg', description: 'Elegant gold ring for everyday wear' },
  { id: 2, name: 'PEARL STUD EARRINGS', price: '$199', category: 'daily', type: 'earrings', material: 'pearl', color: 'white', priceValue: 199, image: 'https://www.miabytanishq.com/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw7b2c8259/images/hi-res/3023SCJ.jpg', description: 'Classic pearl studs for daily elegance' },
  { id: 3, name: 'DELICATE CHAIN NECKLACE', price: '$159', category: 'daily', type: 'necklace', material: 'gold', color: 'gold', priceValue: 159, image: 'https://i.etsystatic.com/10805627/r/il/7e9fb2/3530428993/il_570xN.3530428993_2clp.jpg', description: 'Simple chain perfect for layering' },
  { id: 4, name: 'SILVER BANGLE', price: '$129', category: 'daily', type: 'bracelet', material: 'silver', color: 'silver', priceValue: 129, image: 'https://shop.globein.com/cdn/shop/products/p415335_2c_1080x.jpg?v=1755645780', description: 'Minimalist silver bangle' },
  { id: 5, name: 'ROSE GOLD BAND', price: '$249', category: 'daily', type: 'ring', material: 'rose-gold', color: 'rose-gold', priceValue: 249, image: 'https://www.diamondnet.ca/wp-content/uploads/2019/10/men-rose-gold-wedding-band.jpg', description: 'Thin rose gold band ring' },
  { id: 6, name: 'SMALL HOOP EARRINGS', price: '$89', category: 'daily', type: 'earrings', material: 'gold', color: 'gold', priceValue: 89, image: 'https://glizzglam.com/cdn/shop/files/GG-E7-processed.webp?crop=center&height=600&v=1727949188&width=600', description: 'Dainty gold hoops' },
  { id: 7, name: 'PENDANT NECKLACE', price: '$179', category: 'daily', type: 'necklace', material: 'diamond', color: 'white', priceValue: 179, image: 'https://nemichandjewels.com/cdn/shop/files/8500413.jpg?v=1697199154&width=1946', description: 'Small diamond pendant' },
  { id: 8, name: 'STACKABLE RINGS SET', price: '$199', category: 'daily', type: 'ring', material: 'gold', color: 'gold', priceValue: 199, image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/22165718/2023/2/28/ac4da021-3ab9-4050-8782-055da00a81ee1677590732046Setof8GoldPlatedStackRings1.jpg', description: 'Set of 3 stackable rings' },
  
  // Office Wear (6 items)
  { id: 9, name: 'PROFESSIONAL PEARL NECKLACE', price: '$399', category: 'office', type: 'necklace', material: 'pearl', color: 'white', priceValue: 399, image: 'https://cdn.faire.com/fastly/0774eda7dd5238ae20edba2b029d00620beb2ac3891ef195f1518698e599d8e4.jpeg?bg-color=FFFFFF&canvas=720:720&dpr=1&fit=bounds&format=jpg&height=720&width=720', description: 'Classic pearl strand for office' },
  { id: 10, name: 'GOLD WATCH BRACELET', price: '$599', category: 'office', type: 'bracelet', material: 'gold', color: 'gold', priceValue: 599, image: 'https://m.media-amazon.com/images/I/41r6WL5UkFL._SY350_.jpg', description: 'Elegant watch-style bracelet' },
  { id: 11, name: 'DIAMOND STUD EARRINGS', price: '$799', category: 'office', type: 'earrings', material: 'diamond', color: 'white', priceValue: 799, image: 'https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw79b6e721/images/Mia/hi-res/3824SKN.jpg?sw=640&sh=640', description: 'Professional diamond studs' },
  { id: 12, name: 'SILVER CUFF BRACELET', price: '$299', category: 'office', type: 'bracelet', material: 'silver', color: 'silver', priceValue: 299, image: 'https://i.ebayimg.com/images/g/pvEAAOSwT-9kQqmC/s-l1200.jpg', description: 'Sleek silver cuff' },
  { id: 13, name: 'CLASSIC GOLD RING', price: '$449', category: 'office', type: 'ring', material: 'gold', color: 'gold', priceValue: 449, image: 'https://i.pinimg.com/736x/42/16/69/42166905badbfbdfe6a1b964e2489bdf.jpg', description: 'Timeless gold band' },
  { id: 14, name: 'BAR NECKLACE', price: '$229', category: 'office', type: 'necklace', material: 'gold', color: 'gold', priceValue: 229, image: 'https://i.etsystatic.com/5121484/r/il/8135fa/5664368383/il_fullxfull.5664368383_mvfh.jpg', description: 'Modern bar pendant necklace' },
  
  // Party Wear (10 items)
  { id: 15, name: 'STATEMENT DIAMOND RING', price: '$2,499', category: 'party', type: 'ring', material: 'diamond', color: 'white', priceValue: 2499, image: 'https://rubans.in/cdn/shop/files/rubans-rhodium-plated-white-cubic-zirconia-studded-swirl-design-adjustable-statement-ring-finger-rings-1143859883_1800x1800.jpg?v=1755714506', description: 'Bold diamond cocktail ring' },
  { id: 16, name: 'CHANDELIER EARRINGS', price: '$899', category: 'party', type: 'earrings', material: 'diamond', color: 'white', priceValue: 899, image: 'https://images-static.nykaa.com/media/catalog/product/a/5/a54b1b4skr56760_a1.jpg?tr=w-500', description: 'Glamorous chandelier earrings' },
  { id: 17, name: 'TENNIS BRACELET', price: '$1,299', category: 'party', type: 'bracelet', material: 'diamond', color: 'white', priceValue: 1299, image: 'https://i.ebayimg.com/images/g/W20AAOSwcy1kFEYn/s-l400.jpg', description: 'Sparkling tennis bracelet' },
  { id: 18, name: 'RUBY PENDANT NECKLACE', price: '$1,899', category: 'party', image: 'https://img.tatacliq.com/images/i22//437Wx649H/MP000000022302255_437Wx649H_202503121514441.jpeg', description: 'Stunning ruby statement piece' },
  { id: 19, name: 'EMERALD COCKTAIL RING', price: '$3,299', category: 'party', image: 'https://rubans.in/cdn/shop/files/rubans-rhodium-plated-emerald-green-white-cubiczirconia-studded-adjustable-cocktail-ring-finger-rings-1143859821_1800x1800.jpg?v=1755714500', description: 'Luxurious emerald ring' },
  { id: 20, name: 'GOLD CHAIN NECKLACE', price: '$799', category: 'party', image: 'https://www.elyta.in/cdn/shop/files/CH00763R16.jpg?v=1723274936', description: 'Bold gold chain statement' },
  { id: 21, name: 'CRYSTAL DROP EARRINGS', price: '$599', category: 'party', image: 'https://priyaasi.com/cdn/shop/files/EAR-PR-51402-1_grande.jpg?v=1705687557', description: 'Sparkling crystal drops' },
  { id: 22, name: 'SAPPHIRE RING', price: '$1,999', category: 'party', image: 'https://capecodjewelers.com/cdn/shop/products/VintageInspiredFlatSapphireDiamondRing.jpg?v=1661450621&width=1500', description: 'Blue sapphire statement ring' },
  { id: 23, name: 'PEARL DROP NECKLACE', price: '$1,199', category: 'party', image: 'https://i.etsystatic.com/25121843/r/il/a1b57b/4558955068/il_570xN.4558955068_mrxo.jpg', description: 'Elegant pearl drop necklace' },
  { id: 24, name: 'DIAMOND BRACELET', price: '$2,199', category: 'party', image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw881f0d1a/images/hi-res/50D4C1VYC1A02_1.jpg', description: 'Dazzling diamond bracelet' },
  
  // Bridal Wear (12 items)
  { id: 25, name: 'DIAMOND ENGAGEMENT RING', price: '$4,999', category: 'bridal', image: 'https://junerings.com/cdn/shop/articles/Thumbnail-28.png?v=1719500570', description: 'Classic solitaire engagement ring' },
  { id: 26, name: 'WEDDING BAND SET', price: '$1,599', category: 'bridal', image: 'https://sepvergara.com/wp-content/uploads/2020/09/s-l960.png', description: 'Matching his & hers wedding bands' },
  { id: 27, name: 'BRIDAL PEARL NECKLACE', price: '$2,299', category: 'bridal', image: 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/f/5f2a02d11015438_3.jpg?rnd=20200526195200&tr=w-512', description: 'Multi-strand pearl necklace' },
  { id: 28, name: 'DIAMOND TIARA', price: '$5,999', category: 'bridal', image: 'https://image3.nihaojewelry.com/fit-in/800x800/filters:quality(80)/filters:format(webp)/product/2025/8/15/1956185151566385152/Baroque-Bride-Headwear-Retro-Crystal-Large-Crown-Ball-Gown-Accessory-Diamond-Embedded-Wedding-Birthday-Party-1.jpg', description: 'Sparkling bridal tiara' },
  { id: 29, name: 'PEARL DROP EARRINGS', price: '$899', category: 'bridal', image: 'https://i.etsystatic.com/32042581/c/1504/1195/0/623/il/45e6f6/4281568428/il_340x270.4281568428_d45v.jpg', description: 'Elegant pearl drop earrings' },
  { id: 30, name: 'DIAMOND TENNIS BRACELET', price: '$3,499', category: 'bridal', image: 'https://i.pinimg.com/736x/bc/d4/b0/bcd4b018e11ff8c5ade357787510311b.jpg', description: 'Luxury diamond tennis bracelet' },
  { id: 31, name: 'VINTAGE ENGAGEMENT RING', price: '$3,799', category: 'bridal', image: 'https://junerings.com/cdn/shop/articles/Thumbnail_427e96e2-a015-4759-a964-8d3cfa45cea4.png?v=1730106585', description: 'Art deco style engagement ring' },
  { id: 32, name: 'BRIDAL JEWELRY SET', price: '$2,999', category: 'bridal', image: 'https://www.houseofpraniv.com/cdn/shop/files/72-2-Photoroom.jpg?v=1746720522&width=1445', description: 'Complete bridal jewelry set' },
  { id: 33, name: 'DIAMOND ETERNITY BAND', price: '$2,199', category: 'bridal', image: 'https://shop.kenanddanadesign.com/cdn/shop/files/Paralee-Main-WB-27083.jpg', description: 'Full eternity diamond band' },
  { id: 34, name: 'PEARL HAIR ACCESSORIES', price: '$399', category: 'bridal', image: 'https://i.etsystatic.com/12927499/r/il/2eb429/3957878018/il_570xN.3957878018_pohb.jpg', description: 'Pearl hair pins and combs' },
  { id: 35, name: 'BRIDAL CHOKER NECKLACE', price: '$1,799', category: 'bridal', image: 'https://shop.southindiajewels.com/wp-content/uploads/2020/05/Grand-AD-Stone-Bridal-Choker-01.jpg', description: 'Diamond choker necklace' },
  { id: 36, name: 'WEDDING ANKLET', price: '$599', category: 'bridal', image: 'https://vrikshamindia.com/cdn/shop/files/IMG_1297_9b019b8f-1575-4264-9b3d-8a0f0a36eec4.jpg?v=1744802702', description: 'Delicate bridal anklet' },
  
  // Casual Wear (5 items)
  { id: 37, name: 'LEATHER CORD NECKLACE', price: '$79', category: 'casual', image: 'https://www.jcrew.com/s7-img-facade/BG756_YL5433?hei=2000&crop=0,0,1600,0', description: 'Casual leather cord with pendant' },
  { id: 38, name: 'FRIENDSHIP BRACELET', price: '$49', category: 'casual', image: 'https://i.dailymail.co.uk/1s/2024/02/02/16/80773889-13037763-The_loved_up_couple_s_custom_made_tennis_bracelet_wee_designed_b-a-19_1706890460663.jpg', description: 'Colorful beaded bracelet' },
  { id: 39, name: 'BOHEMIAN EARRINGS', price: '$99', category: 'casual', image: 'https://cdn.webshopapp.com/shops/14911/files/361948514/1500x1500x2/how-to-make-bohemian-earrings-with-miyuki-beads-in.jpg', description: 'Boho style feather earrings' },
  { id: 40, name: 'CASUAL RING SET', price: '$129', category: 'casual', image: 'https://assets.ajio.com/medias/sys_master/root/20230227/osUT/63fced62f997dde6f4cbff55/-473Wx593H-465830474-gold-MODEL3.jpg', description: 'Set of casual rings' },
  { id: 41, name: 'CHARM NECKLACE', price: '$159', category: 'casual', image: 'https://www.allthingsaboutwedding.com/cdn/shop/files/DiamondandRoundCharmsRoseGoldMinimalChainNecklace-TheJewelbox-1.png?v=1729316490', description: 'Fun charm necklace' }
]

const categories = ['all', 'daily', 'office', 'party', 'bridal', 'casual']
const sortOptions = ['newest', 'price-low', 'price-high', 'popular']
const jewelryTypes = ['all', 'ring', 'necklace', 'earrings', 'bracelet']
const materials = ['all', 'gold', 'silver', 'diamond', 'pearl', 'rose-gold']
const colors = ['all', 'gold', 'silver', 'white', 'rose-gold']
const priceRanges = [
  { label: 'All Prices', min: 0, max: 10000 },
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: 'Over $2000', min: 2000, max: 10000 }
]

const heroImages = [
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
]

const jewelryCategories = [
  {
    id: 1,
    name: 'DAILY WEAR',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '8 items',
    category: 'daily'
  },
  {
    id: 2,
    name: 'OFFICE WEAR',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '6 items',
    category: 'office'
  },
  {
    id: 3,
    name: 'PARTY WEAR',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '10 items',
    category: 'party'
  },
  {
    id: 4,
    name: 'BRIDAL WEAR',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '12 items',
    category: 'bridal'
  },
  {
    id: 5,
    name: 'CASUAL WEAR',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '5 items',
    category: 'casual'
  }
]

export default function JewelryPage() {
  const [showCategories, setShowCategories] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { requireAuth } = useAuth()
  const router = useRouter()

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategories(false)
  }

  const filteredItems = jewelryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const typeMatch = selectedType === 'all' || (item.type && item.type === selectedType)
    const materialMatch = selectedMaterial === 'all' || (item.material && item.material === selectedMaterial)
    const colorMatch = selectedColor === 'all' || (item.color && item.color === selectedColor)
    const priceValue = item.priceValue || parseInt(item.price.replace(/[$,]/g, ''))
    const priceMatch = priceValue >= selectedPriceRange.min && priceValue <= selectedPriceRange.max
    
    return categoryMatch && typeMatch && materialMatch && colorMatch && priceMatch
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        const priceA = a.priceValue || parseInt(a.price.replace(/[$,]/g, ''))
        const priceB = b.priceValue || parseInt(b.price.replace(/[$,]/g, ''))
        return priceA - priceB
      case 'price-high':
        const priceA2 = a.priceValue || parseInt(a.price.replace(/[$,]/g, ''))
        const priceB2 = b.priceValue || parseInt(b.price.replace(/[$,]/g, ''))
        return priceB2 - priceA2
      case 'popular':
        return b.id - a.id
      default:
        return a.id - b.id
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (showCategories) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[400px] flex items-center relative mb-16"
        >
          <div className="absolute inset-0 rounded-3xl mx-6 overflow-hidden shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: `url(${heroImages[0]})`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-yellow-800/50 to-yellow-900/60" />
          </div>
          
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-6 w-full flex items-center justify-center"
          >
            <div>
              <h1 className="text-6xl font-space font-bold text-yellow-400 mb-4">
                Choose Category
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Select a category to explore our collection
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {jewelryCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                onClick={() => handleCategorySelect(category.category)}
                className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-yellow-400">{category.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect('all')}
              className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl"
            >
              View All Jewelry
            </motion.button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl ">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowCategories(true)}
          className=" bg-white/20 hover:bg-white/30 text-gray-800 px-6 py-3 rounded-full font-medium flex items-center space-x-2"
        >
          <span>← Back to Categories</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[400px] flex items-center relative mb-16"
      >
        <div className="absolute inset-0 rounded-3xl mx-6 overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url(${heroImages[0]})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-yellow-800/50 to-yellow-900/60" />
        </div>
        
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 w-full flex items-center justify-center"
        >
          <div>
            <h1 className="text-6xl font-space font-bold text-yellow-400 mb-4">
              {selectedCategory === 'all' ? 'All Jewelry' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Discover our exclusive pieces crafted with love and precision
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w mx-auto px-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-between items-center mb-8 glass rounded-2xl p-6"
        >
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all backdrop-blur-sm ${
                  selectedCategory === category
                    ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30'
                    : 'bg-white/40 text-gray-800 hover:bg-white/60 border border-white/30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              {filteredItems.length} items found
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white/30 hover:bg-white/50 text-gray-800 px-4 py-2 rounded-full"
            >
              <Filter size={16} />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSortBy(option)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            sortBy === option
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Type</h3>
                    <div className="space-y-2">
                      {jewelryTypes.map((type) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedType(type)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedType === type
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Material */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Material</h3>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <motion.button
                          key={material}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedMaterial(material)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedMaterial === material
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Color</h3>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedColor(color)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedColor === color
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {color.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <motion.button
                          key={range.label}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedPriceRange.label === range.label
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {range.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedType('all')
                      setSelectedMaterial('all')
                      setSelectedColor('all')
                      setSelectedPriceRange(priceRanges[0])
                      setSortBy('newest')
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jewelry Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-yellow-200/50 max-w-md mx-auto">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h3>
              <p className="text-gray-600 mb-6">No jewelry matches your current filters. Try adjusting your search criteria.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedType('all')
                  setSelectedMaterial('all')
                  setSelectedColor('all')
                  setSelectedPriceRange(priceRanges[0])
                  setSortBy('newest')
                }}
                className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Clear All Filters
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-80 shadow-2xl bg-white/80 backdrop-blur-sm border border-yellow-200/50 hover:border-yellow-400/70 transition-all duration-500 hover:glow-pulse"
            >
              {/* Simple Sparkle */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-yellow-400 text-xl animate-pulse">✨</div>
              </div>
              
              {/* Premium Badge */}
              {item.price.includes('2,') || item.price.includes('3,') ? (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✨ PREMIUM
                  </span>
                </div>
              ) : null}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 animate-pulse" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-amber-400/30 to-yellow-400/20 blur-sm animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Action Buttons */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedItem(item)
                    }}
                    className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Eye className="text-gray-800" size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!requireAuth()) {
                        router.push('/login')
                        return
                      }
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category
                      })
                    }}
                    className="bg-yellow-600/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                  >
                    <ShoppingCart className="text-white" size={24} />
                  </motion.button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                  {item.name}
                </h3>
                <motion.p 
                  className="text-neon-pink font-bold text-lg drop-shadow-lg"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(253,203,110,0.5)', 
                      '0 0 15px rgba(253,203,110,0.8)', 
                      '0 0 5px rgba(253,203,110,0.5)'
                    ] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.price}
                </motion.p>
              </div>
              

              
              {/* Heart Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isInWishlist(item.id)) {
                      removeFromWishlist(item.id)
                    } else {
                      addToWishlist({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        category: item.category
                      })
                    }
                  }}
                  className={`backdrop-blur-sm p-2 rounded-full transition-colors ${
                    isInWishlist(item.id) 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-red-500/50'
                  }`}
                >
                  <Heart className={isInWishlist(item.id) ? 'fill-current' : ''} size={18} />
                </motion.button>
              </div>
            </motion.div>
            ))}
          </motion.div>
        )}

        {/* Product Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 backdrop-blur-lg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-yellow-200/50"
              >
                <div className="flex flex-col md:grid md:grid-cols-2 min-h-full">
                  {/* Image Section */}
                  <div className="relative h-64 sm:h-80 md:h-full">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white shadow-lg"
                    >
                      <X size={20} />
                    </button>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Details Section */}
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 pr-2">
                          {selectedItem.name}
                        </h2>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (isInWishlist(selectedItem.id)) {
                              removeFromWishlist(selectedItem.id)
                            } else {
                              addToWishlist({
                                id: selectedItem.id,
                                name: selectedItem.name,
                                price: selectedItem.price,
                                image: selectedItem.image,
                                category: selectedItem.category
                              })
                            }
                          }}
                          className={`p-3 rounded-full transition-colors ${
                            isInWishlist(selectedItem.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                          }`}
                        >
                          <Heart className={isInWishlist(selectedItem.id) ? 'fill-current' : ''} size={20} />
                        </motion.button>
                      </div>
                      
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 mb-4 md:mb-6">
                        {selectedItem.price}
                      </p>
                      
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {selectedItem.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-6">
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Material</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Premium Gold</p>
                        </div>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Warranty</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Lifetime</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (!requireAuth()) {
                            router.push('/login')
                            return
                          }
                          addToCart({
                            id: selectedItem.id,
                            name: selectedItem.name,
                            price: selectedItem.price,
                            image: selectedItem.image,
                            category: selectedItem.category
                          })
                          setSelectedItem(null)
                        }}
                        className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </motion.button>
                      
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base"
                        >
                          Buy Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base"
                        >
                          Share
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}