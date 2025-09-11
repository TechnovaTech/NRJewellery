export default function NewArrival() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">The Latest Spark</h2>
          <p className="text-lg sm:text-xl text-gray-600">Discover our latest collections</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-end justify-center">
          {/* Evil Eye Collection - Small */}
          <div className="relative w-full max-w-64 h-80 lg:w-64 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-500/20">
            <img
              src="/ring1.webp"
              alt="Ring"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#A89F91]/80 via-[#A89F91]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#FFFAF3]">
              <h2 className="text-3xl font-serif italic mb-1">Ring</h2>
              <p className="text-sm opacity-90">For the Queen in You</p>
            </div>
          </div>

          {/* Honey Bee Collection - Large */}
          <div className="relative w-full max-w-80 h-96 lg:w-80 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-800/30">
            <img
              src="/bracelet2.avif"
              alt="bracelet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#CBAE8E]/80 via-[#CBAE8E]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#FFFAF3]">
              <h2 className="text-3xl sm:text-4xl font-serif italic mb-1">Bracelet</h2>
              <p className="text-sm opacity-90">Your Style, Your Vibe </p>
            </div>
          </div>

          {/* Glo Collection - Biggest (Center) */}
          <div className="relative w-full max-w-96 h-[28rem] lg:w-96 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-800/40">
            <img
              src="/pendent2.jpg"
              alt="pendent"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#A89F91]/40 via-[#A89F91]/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-[#FFFAF3]">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light italic mb-2">Necklace</h2>
              <p className="text-base opacity-90 tracking-wider">Dancing Diamond</p>
            </div>
          </div>

          {/* Peacock Collection - Large */}
          <div className="relative w-full max-w-80 h-96 lg:w-80 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-600/30">
            <img
              src="/earring2.webp"
              alt="earring"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#A89F91]/40 via-[#A89F91]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#FFFAF3]">
              <h2 className="text-3xl sm:text-4xl font-serif mb-1">Earrings</h2>
              <p className="text-sm opacity-90">A Timeless Heritage</p>
            </div>
          </div>

          {/* Aruna Collection - Small */}
          <div className="relative w-full max-w-64 h-80 lg:w-64 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-gray-500/20">
            <img
              src="/nacklace2.jpg"
              alt="nacklace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#CBAE8E]/40 via-[#CBAE8E]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#FFFAF3]">
              <h2 className="text-2xl sm:text-3xl font-serif mb-1">Pendant</h2>
              <p className="text-sm opacity-90 tracking-wide">Heritage Sets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}