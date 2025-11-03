import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Wishlist from '../../../models/Wishlist'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ message: 'User ID required' }, { status: 400 })
    }
    
    const wishlist = await (Wishlist as any).findOne({ userId })
    return NextResponse.json({ items: wishlist?.items || [] })
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId, item } = await request.json()
    
    if (!userId || !item) {
      return NextResponse.json({ message: 'Missing data' }, { status: 400 })
    }
    
    let wishlist = await (Wishlist as any).findOne({ userId })
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] })
    }
    
    const existingItem = wishlist.items.find((i: any) => i.productId.toString() === item.id.toString())
    
    if (!existingItem) {
      wishlist.items.push({
        productId: item.id,
        name: item.name,
        price: parseFloat(item.price.replace('₹', '').replace('$', '').replace(',', '')),
        image: item.image,
        category: item.category
      })
      await wishlist.save()
    }
    
    return NextResponse.json({ message: 'Item added', items: wishlist.items })
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')
    
    const wishlist = await (Wishlist as any).findOne({ userId })
    if (wishlist) {
      wishlist.items = wishlist.items.filter((item: any) => item.productId.toString() !== productId.toString())
      await wishlist.save()
    }
    
    return NextResponse.json({ items: wishlist?.items || [] })
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}