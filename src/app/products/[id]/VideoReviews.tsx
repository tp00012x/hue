'use client'

import { Review, Shade, User } from '@/db/schema'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ActiveFilters from './_components/ActiveFilters'
import FilterDropdown from './_components/FilterDropdown'
import ShadesDropdown from './_components/ShadesDropdown'
import VideosCarousel from './_components/VideosCarousel'
import useLoadCustomStyleConfig from './_hooks/useLoadCustomStyleConfig'

export default function VideoReviews({ productId }: { productId: string }) {
  const searchParams = useSearchParams()

  const [reviews, setReviews] = useState<Review[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [shades, setShades] = useState<Shade[]>([])

  useLoadCustomStyleConfig()

  useEffect(() => {
    if (!productId) return

    async function fetchUsers() {
      const response = await fetch(`/api/products/${productId}/users`)
      const users = await response.json()

      setUsers(users)
    }

    fetchUsers()
  }, [productId])

  useEffect(() => {
    if (!productId) return

    async function fetchShades() {
      const response = await fetch(`/api/products/${productId}/shades`)
      const shades = await response.json()

      setShades(shades)
    }

    fetchShades()
  }, [productId])

  useEffect(() => {
    if (!productId) return

    const fetchData = async () => {
      const shadesQuery = searchParams
        .getAll('shades')
        .map((shade) => `shades=${encodeURIComponent(shade)}`)
        .join('&')

      const skinTone = searchParams.get('skinTone')
      const undertone = searchParams.get('undertone')

      const queryParams = [
        shadesQuery,
        skinTone ? `skinTone=${encodeURIComponent(skinTone)}` : '',
        undertone ? `undertone=${encodeURIComponent(undertone)}` : '',
      ]
        .filter(Boolean)
        .join('&')

      const reviewsResponse = await fetch(`/api/reviews?${queryParams}`)
      const reviewsData = await reviewsResponse.json()

      setReviews(reviewsData)
    }

    fetchData()
  }, [productId, searchParams])

  const usersSkinTones = Array.from(new Set(users.map((user) => user.skinTone)))
  const usersUndertones = Array.from(
    new Set(users.map((user) => user.undertone)),
  )

  return (
    <>
      <div className="container flex w-full gap-4 md:justify-center">
        <ShadesDropdown shades={shades} />
        <FilterDropdown
          skinTones={usersSkinTones}
          undertones={usersUndertones}
        />
      </div>
      <div className="pt-4" />
      <div className="container flex flex-nowrap gap-2 overflow-x-auto md:overflow-visible">
        <ActiveFilters reviews={reviews} shades={shades} />
      </div>
      <div className="md:pt-8" />
      <div
        className={clsx('flex flex-1 justify-center pl-4 md:container', {
          'h-full': !reviews.length,
          'h-auto': reviews.length,
        })}
      >
        <VideosCarousel reviews={reviews} users={users} shades={shades} />
      </div>
    </>
  )
}
