import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Products } from '@/db/schema'
import { db } from '@/db'
import Link from 'next/link'

export default async function Home() {
  const products = await db.select().from(Products)

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Product reviews</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <Image
                src={product.image ?? ''}
                alt={product.name}
                width={200}
                height={200}
                className="h-48 w-full rounded-t-lg object-cover"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">{product.name}</CardTitle>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary text-white">
                <Link href={`/products/${product.id}`}>See reviews</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
