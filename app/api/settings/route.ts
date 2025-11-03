import { NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Settings from '../../../models/Settings'

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