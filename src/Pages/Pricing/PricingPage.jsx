import React from 'react'
// import Pricing from '../Home/Pricing/Pricing'
import PricingSection from './PricingSection/PricingSection'
import PricingHero from './PricingHero/PricingHero'
import FAQ from '../Home/Faqs/FAQ'


const PricingPage = () => {
  return (
    <>
<PricingHero/>
  
  <PricingSection/>
  <FAQ bgColor="white" />
    </>
  )
}

export default PricingPage