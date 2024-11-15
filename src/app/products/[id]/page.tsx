import Image from 'next/image'
import VideoReviews from './VideoReviews'

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params

  return (
    <div className="font-body text-textColor flex h-screen flex-col py-4 md:py-14">
      <h1 className="text-main-header font-main-header flex items-center justify-center font-cheltenham md:container">
        Select It On Skin Like Yours
      </h1>
      <div className="pt-6" />
      <VideoReviews productId={id} />
      <div className="pt-6" />
      <div className="container flex items-center justify-center">
        <Image src="/HueLogoBig.png" alt="hue logo" width={166} height={46} />
      </div>
    </div>
  )
}
