import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Review, Shade, User } from '@/db/schema'

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import useFilterParams from '../_hooks/useFilterParams'

function VideoCard({
  user,
  review,
  shade,
}: {
  user: User
  review: Review
  shade: Shade
}) {
  const { shades, skinTone, undertone } = useFilterParams()

  const logEvent = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const metadata = {
      clientTimestamp: new Date().toISOString(),
      currentUrl: window.location.href,
      browserInfo: navigator.userAgent,
      screenResolution: {
        width: window.screen.width,
        height: window.screen.height,
      },
      clickCoordinates: {
        x: event.clientX,
        y: event.clientY,
      },
      activeFilters: {
        shades,
        skinTone,
        undertone,
      },
    }

    console.log('Card contents:', {
      review,
      metadata,
    })

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: review.id,
          productId: review.productId,
          eventType: 'card_click',
          metadata: metadata,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Event stored:', data)
    } catch (error) {
      console.error('Error storing event:', error)
    }
  }

  return (
    <Card
      className="z-0 h-full w-[190px] rounded-none border border-primary md:w-[264px]"
      onClick={logEvent}
    >
      <CardContent className="p-0">
        <div
          className="relative h-[230px] bg-cover bg-center bg-no-repeat md:h-[324px]"
          style={{
            backgroundImage: `url(${review.videoThumbnail})`,
          }}
        >
          <Image
            src="/Vector.svg"
            alt="play"
            width={36}
            height={46}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
          <div className="absolute bottom-1 left-1 inline-flex items-center gap-2 bg-white px-1 px-2 py-1">
            <div
              className="aspect-square w-6 rounded border border-gray-300"
              style={{ backgroundColor: shade.color }}
            />
            <div className="text-apercu">{shade.name}</div>
          </div>
        </div>
        <div className="p-3 md:p-4">
          <div className="text-person-name font-person-name mb-2 md:mb-3">
            {user.name}
          </div>
          <div className="mb-3 flex flex-wrap gap-2 text-[10px] md:mb-4 md:text-xs">
            <div className="border border-primary px-1 py-1 md:px-2">
              {user.skinTone}
            </div>
            <div className="border border-primary px-1 px-2 py-1">
              {user.undertone}
            </div>
            <div className="border border-primary px-1 px-2 py-1">
              {user.eyeColor}
            </div>
          </div>
          <div className="flex gap-x-1">
            {Array.from({ length: review.starRating }).map((_, index) => {
              return <Star key={index} className="h-4 w-4 text-error" />
            })}
          </div>
          <div className="pt-3" />
          <div className="text-review-text font-review-text">
            {review.reviewText}
          </div>
          <div className="pt-3" />
          {review.isVerified && (
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <Image src="/shield.svg" alt="shield" width={12} height={12} />
              {review.isVerified && 'Verified Review - '}
              {review.incentivized && 'Incentivized Review'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="text-apercu flex h-full w-full flex-col items-center justify-center">
      <div className="text-center font-medium uppercase">
        No matching reviews found
      </div>
      <div className="text-center text-sm font-medium">
        Please try a different set of filters
      </div>
    </div>
  )
}

export default function VideosCarousel({
  reviews,
  users,
  shades,
}: {
  reviews: Review[]
  users: User[]
  shades: Shade[]
}) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      {!reviews.length ? (
        <EmptyState />
      ) : (
        <CarouselContent className="py-6" id="sexy">
          {reviews.map((review, index) => {
            const user = users.find((user) => user.id === review.userId)
            const shade = shades.find((shade) => shade.id === review.shadeId)

            if (!user || !shade) {
              return null
            }

            return (
              <CarouselItem key={index} className="basis-1/2 basis-auto">
                <VideoCard review={review} user={user} shade={shade} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      )}
      <CarouselPrevious className="absolute -left-2 top-0 hidden border-none shadow-none sm:flex" />
      <CarouselNext className="absolute -right-2 top-0 hidden border-none shadow-none sm:flex" />
    </Carousel>
  )
}
