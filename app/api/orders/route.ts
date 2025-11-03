import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Order from '../../../models/Order'
import User from '../../../models/User'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const orderNumber = searchParams.get('orderNumber')
    
    let query = {}
    if (userId) {
      query = { userId }
    } else if (orderNumber) {
      query = { orderNumber }
    } else {
      return NextResponse.json(
        { message: 'User ID or Order Number is required' },
        { status: 400 }
      )
    }
    
    const orders = await (Order as any).find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
    
    return NextResponse.json({ orders })
    
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const orderData = await request.json()
    const { userId, items, totalAmount, shippingAddress, paymentMethod, notes } = orderData
    
    if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Verify user exists
    const user = await (User as any).findById(userId)
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check stock availability and update stock
    const Product = (await import('../../../models/Product')).default
    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.name} not found` },
          { status: 404 }
        )
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${item.name}. Available: ${product.stock}` },
          { status: 400 }
        )
      }
      
      // Update stock
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
        inStock: product.stock - item.quantity > 0
      })
    }
    
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes
    })
    
    await order.save()
    
    return NextResponse.json({
      message: 'Order created successfully',
      order: {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}