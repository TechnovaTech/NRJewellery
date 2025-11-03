import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Product from '../../../models/Product'

export async function GET() {
  try {
    await dbConnect()
    const products = await (Product as any).find({}).populate('category').sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    const product = await (Product as any).create(body)
    const populatedProduct = await (Product as any).findById(product._id).populate('category')
    return NextResponse.json(populatedProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}