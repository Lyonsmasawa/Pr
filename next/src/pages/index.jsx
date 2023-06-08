import Companies from '@/components/Landing/Companies'
import Everything from '@/components/landing/Everything'
import FiverrBusiness from '@/components/landing/FiverrBusiness'
import HeroBanner from '@/components/landing/HeroBanner'
import JoinFiverr from '@/components/landing/JoinFiverr'
import PopularServices from '@/components/landing/PopularServices'
import Services from '@/components/landing/Services'
import React from 'react'

const index = () => {
  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      <JoinFiverr />
    </div>
  )
}

export default index
