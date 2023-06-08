import { categories } from '@/utils/categories'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Services = () => {
  const router = useRouter()
  return (
    <div className='mx-20 my-16'>
      <h2 className=" text-[#404145] text-4xl mb-10 font-bold">
        You need it, we&apos;ve got it
      </h2>
      <ul className='grid grid-cols-5 gap-10'>
        {categories.map(({ name, logo }) => (
          <li key={name} className='flex flex-col justify-center cursor-pointer hover:shadow-2xl hover:border-[#1dbf73] border-2 border-transparent p-5 transition-all duration-500'
            onClick={() => router.push(`/search?category=${name}`)}
          >
            <Image alt="category" src={logo} height={50} width={50} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Services
