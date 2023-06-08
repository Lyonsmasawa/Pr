import AuthWrapper from '@/components/AuthWrapper'
import Companies from '@/components/Landing/Companies'
import Everything from '@/components/landing/Everything'
import FiverrBusiness from '@/components/landing/FiverrBusiness'
import HeroBanner from '@/components/landing/HeroBanner'
import JoinFiverr from '@/components/landing/JoinFiverr'
import PopularServices from '@/components/landing/PopularServices'
import Services from '@/components/landing/Services'
import { useStateProvider } from '@/context/StateContext'
import React from 'react'

const index = () => {
  const [{ showLoginModal, showSignupModal }] = useStateProvider()
  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      <JoinFiverr />
      {(showLoginModal || showSignupModal) &&(
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
        )}
      {/* <AuthWrapper type={showLoginModal ? "login" : "signup"} /> */}
    </div>
  )
}

export default index
