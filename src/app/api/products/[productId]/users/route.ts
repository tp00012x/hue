import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { Users, Reviews } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> },
) {
  const { productId } = await context.params
  const productIdNumber = parseInt(productId, 10)

  if (isNaN(productIdNumber)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
  }

  const users = await db
    .select({
      id: Users.id,
      name: Users.name,
      skinTone: Users.skinTone,
      eyeColor: Users.eyeColor,
      undertone: Users.undertone,
    })
    .from(Users)
    .innerJoin(Reviews, eq(Users.id, Reviews.userId))
    .where(eq(Reviews.productId, productIdNumber))

  return NextResponse.json(users)
}
