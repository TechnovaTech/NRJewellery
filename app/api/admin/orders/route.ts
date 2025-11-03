import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Order from '../../../../models/Order'

export async function GET() {
  try {
    await connectDB()
    
    const orders = await (Order as any).find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
    
    return NextResponse.json({ orders })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const { orderId, status, paymentStatus } = await request.json()
    
    const order = await (Order as any).findByIdAndUpdate(
      orderId,
      { 
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus })
      },
      { new: true }
    ).populate('userId', 'name email')
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    return NextResponse.json({ order })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}