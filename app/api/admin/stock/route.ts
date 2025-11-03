import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Product from '../../../../models/Product'

export async function GET() {
  try {
    await connectDB()
    
    const products = await (Product as any).find({})
      .populate('category', 'name')
      .sort({ stock: 1 })
    
    const lowStock = products.filter((p: any) => p.stock <= p.lowStockThreshold)
    
    return NextResponse.json({ products, lowStock })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const { productId, stock, lowStockThreshold } = await request.json()
    
    const product = await (Product as any).findByIdAndUpdate(
      productId,
      { 
        stock: Number(stock),
        ...(lowStockThreshold && { lowStockThreshold: Number(lowStockThreshold) }),
        inStock: Number(stock) > 0
      },
      { new: true }
    ).populate('category', 'name')
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ product, message: 'Stock updated successfully' })
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 })
  }
}