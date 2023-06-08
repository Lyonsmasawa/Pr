import Companies from '@/components/Companies'
import Everything from '@/components/Everything'
import FiverrBusiness from '@/components/FiverrBusiness'
import HeroBanner from '@/components/HeroBanner'
import JoinFiverr from '@/components/JoinFiverr'
import PopularServices from '@/components/PopularServices'
import Services from '@/components/Services'
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
