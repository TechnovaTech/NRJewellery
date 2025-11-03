import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Order from '../../../../models/Order'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    await connectDB()
    
    const order = await (Order as any).findById(params.orderId)
      .populate('userId', 'name email')
      .populate('items.productId', 'name')
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // Get settings for calculations
    const Settings = (await import('../../../../models/Settings')).default
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings()
      await settings.save()
    }
    
    const subtotal = order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * settings.taxRate
    const shipping = settings.shippingCost
    const total = subtotal + tax + shipping
    
    const invoice = {
      orderNumber: order.orderNumber,
      date: order.createdAt,
      customer: {
        name: order.userId.name,
        email: order.userId.email,
        address: order.shippingAddress
      },
      items: order.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal,
      tax,
      shipping,
      total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod
    }
    
    return NextResponse.json({ invoice })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 })
  }
}