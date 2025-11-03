import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Settings from '../../../models/Settings'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { code } = await request.json()
    
    const settings = await (Settings as any).findOne()
    if (!settings || !settings.discountActive) {
      return NextResponse.json({ valid: false, message: 'No active discounts' })
    }
    
    if (code.toUpperCase() === settings.discountCode.toUpperCase()) {
      return NextResponse.json({ 
        valid: true, 
        discount: settings.discountPercent,
        message: `${settings.discountPercent}% discount applied!`
      })
    }
    
    return NextResponse.json({ valid: false, message: 'Invalid discount code' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to validate discount' }, { status: 500 })
  }
}