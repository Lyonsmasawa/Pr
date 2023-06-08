import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const HeroBanner = () => {
  const router  = useRouter()
  const [image, setImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => setImage(image > 3 ? 1 : image + 1), 10000)
    return () => clearInterval(interval)
  }, [image])

  return (
    <div className='h-[600px] relative bg-cover'>
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image alt='hero' src="/bg-hero1.webp" fill className={`${image === 1 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
        <Image alt='hero' src="/bg-hero2.webp" fill className={`${image === 2 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
        <Image alt='hero' src="/bg-hero3.webp" fill className={`${image === 3 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
        <Image alt='hero' src="/bg-hero4.webp" fill className={`${image === 4 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
        <Image alt='hero' src="/bg-hero5.webp" fill className={`${image === 5 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
        <Image alt='hero' src="/bg-hero6.webp" fill className={`${image === 6 ? "opacity-100" : "opacity-0"} transition-all duration-100`}/>
      </div>
      Hero Banner
    </div>
  )
}

export default HeroBanner
