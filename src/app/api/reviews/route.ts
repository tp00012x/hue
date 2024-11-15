import { db } from '@/db'
import {
  Reviews,
  Shades,
  Users,
  skinToneSchema,
  undertoneSchema,
} from '@/db/schema'
import { NextResponse } from 'next/server'
import { inArray, eq, and } from 'drizzle-orm'
import { z } from 'zod'

export async function GET(request: Request) {
  const url = new URL(request.url)

  const queryParamsSchema = z.object({
    shades: z.array(z.string()).optional(),
    skinTone: skinToneSchema.optional(),
    undertone: undertoneSchema.optional(),
  })

  const shades = url.searchParams.getAll('shades')
  const skinToneParam = url.searchParams.get('skinTone')
  const undertoneParam = url.searchParams.get('undertone')

  const dataToValidate = {
    shades: shades.length > 0 ? shades : undefined,
    skinTone: skinToneParam || undefined,
    undertone: undertoneParam || undefined,
  }

  try {
    const parsedQueryParams = queryParamsSchema.parse(dataToValidate)

    const { shades: validatedShades, skinTone, undertone } = parsedQueryParams

    const baseQuery = db
      .select({ review: Reviews })
      .from(Reviews)
      .innerJoin(Shades, eq(Reviews.shadeId, Shades.id))
      .innerJoin(Users, eq(Reviews.userId, Users.id))

    const whereConditions = []

    if (validatedShades && validatedShades.length > 0) {
      whereConditions.push(inArray(Shades.name, validatedShades))
    }

    if (skinTone) {
      whereConditions.push(eq(Users.skinTone, skinTone))
    }

    if (undertone) {
      whereConditions.push(eq(Users.undertone, undertone))
    }

    const query =
      whereConditions.length > 0
        ? baseQuery.where(and(...whereConditions))
        : baseQuery

    const results = await query

    const formattedReviews = results.map((row) => row.review)

    return NextResponse.json(formattedReviews)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
