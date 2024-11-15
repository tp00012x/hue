import { db } from '@/db'
import { Events, eventTypeSchema, Reviews } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const eventDataSchema = z.object({
  reviewId: z.number(),
  productId: z.number(),
  eventType: eventTypeSchema,
  metadata: z.any().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const eventData = eventDataSchema.parse(await request.json())

    const { reviewId, productId, eventType, metadata } = eventData

    console.log(eventData, 'eventData')

    const [review] = await db
      .select()
      .from(Reviews)
      .where(eq(Reviews.id, reviewId))

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    const eventToInsert = {
      reviewId: review.id,
      productId,
      eventType,
      metadata,
    }

    const [insertedEvent] = await db
      .insert(Events)
      .values(eventToInsert)
      .returning({
        id: Events.id,
        reviewId: Events.reviewId,
        productId: Events.productId,
        eventType: Events.eventType,
        metadata: Events.metadata,
        timestamp: Events.timestamp,
      })

    return NextResponse.json({ success: true, event: insertedEvent })
  } catch (error) {
    console.error('Error storing event:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid event data', details: error.errors },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { error: 'Failed to store event' },
      { status: 500 },
    )
  }
}
