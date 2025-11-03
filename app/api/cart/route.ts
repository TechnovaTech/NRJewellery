import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Cart from '../../../models/Cart'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ message: 'User ID required' }, { status: 400 })
    }
    
    const cart = await (Cart as any).findOne({ userId })
    return NextResponse.json({ items: cart?.items || [] })
    
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
    
    let cart = await (Cart as any).findOne({ userId })
    
    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }
    
    const existingItem = cart.items.find((i: any) => i.productId.toString() === item.id.toString())
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({
        productId: item.id,
        name: item.name,
        price: parseFloat(item.price.replace('₹', '').replace('$', '').replace(',', '')),
        image: item.image,
        quantity: 1,
        category: item.category,
        size: item.size,
        length: item.length
      })
    }
    
    await cart.save()
    return NextResponse.json({ message: 'Item added', items: cart.items })
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId, productId, quantity } = await request.json()
    
    const cart = await (Cart as any).findOne({ userId })
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 })
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId.toString())
    } else {
      const item = cart.items.find((i: any) => i.productId.toString() === productId.toString())
      if (item) {
        item.quantity = quantity
      }
    }
    
    await cart.save()
    return NextResponse.json({ items: cart.items })
    
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
    
    if (productId) {
      const cart = await (Cart as any).findOne({ userId })
      if (cart) {
        cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId.toString())
        await cart.save()
      }
      return NextResponse.json({ items: cart?.items || [] })
    } else {
      await (Cart as any).findOneAndUpdate({ userId }, { items: [] })
      return NextResponse.json({ items: [] })
    }
    
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}