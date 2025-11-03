import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import Settings from '../../../../models/Settings'

export async function GET() {
  try {
    await connectDB()
    let settings = await (Settings as any).findOne()
    
    if (!settings) {
      settings = new Settings()
      await settings.save()
    }
    
    return NextResponse.json({ settings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    
    let settings = await (Settings as any).findOne()
    if (!settings) {
      settings = new Settings(data)
    } else {
      Object.assign(settings, data)
    }
    
    await settings.save()
    return NextResponse.json({ settings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}