import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Category from '../../../models/Category'
export async function GET() {
  try {
    await dbConnect()
    const categories = await (Category as any).find({})
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    const category = await (Category as any).create(body)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}