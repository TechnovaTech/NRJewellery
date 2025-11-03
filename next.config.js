/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['images.unsplash.com', 'tejaani.com', 'd25g9z9s77rn4i.cloudfront.net', 'www.miabytanishq.com', 'i.etsystatic.com', 'www.blossomandshine.com', 'shop.globein.com', 'www.diamondnet.ca', 'glizzglam.com', 'nemichandjewels.com', 'assets.myntassets.com', 'cdn.faire.com', 'm.media-amazon.com', 'i.ebayimg.com', 'i.pinimg.com', 'www.tanishq.co.in', 'rubans.in', 'images-static.nykaa.com', 'img.tatacliq.com', 'www.elyta.in', 'priyaasi.com', 'capecodjewelers.com', 'junerings.com', 'sepvergara.com', 'adn-static1.nykaa.com', 'image3.nihaojewelry.com', 'www.houseofpraniv.com', 'shop.kenanddanadesign.com', 'shop.southindiajewels.com', 'vrikshamindia.com', 'www.jcrew.com', 'i.dailymail.co.uk', 'cdn.webshopapp.com', 'assets.ajio.com', 'www.allthingsaboutwedding.com', 'www.nobbier.com', 'images.utopia.org', 'watchandwares.com', 'akm-img-a-in.tosshub.com', 'assets.bounceexchange.com', 'www.davidyurman.com', 'encrypted-tbn0.gstatic.com', 'jokerandwitch.com', '5.imimg.com', 'media.istockphoto.com', 'www.shutterstock.com'],
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  reactStrictMode: false,
}

module.exports = nextConfig