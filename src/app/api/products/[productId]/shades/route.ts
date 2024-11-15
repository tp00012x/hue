import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { Shades } from '@/db/schema'
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

  const shades = await db
    .select()
    .from(Shades)
    .where(eq(Shades.productId, productIdNumber))

  return NextResponse.json(shades)
}
