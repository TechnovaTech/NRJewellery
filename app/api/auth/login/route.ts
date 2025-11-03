import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../../lib/mongodb'
import Admin from '../../../../models/Admin'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { email, password } = await request.json()
    
    console.log('Login attempt:', { email, password })
    
    const admin = await (Admin as any).findOne({ email })
    console.log('Admin found:', admin ? 'Yes' : 'No')
    
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 401 })
    }
    
    // Direct bcrypt comparison instead of model method
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    console.log('Password valid:', isPasswordValid)
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({ 
      message: 'Login successful',
      admin: { id: admin._id, email: admin.email, name: admin.name }
    })

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}