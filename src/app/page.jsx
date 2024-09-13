import Home from '../components/Home'
import SearchCourses from '@/components/SearchCourses'
import PopularCourses from '@/components/PopularCourses'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import React from 'react'
import AboutUsDashboard from '@/components/AboutDashboard'

function page() {
  return (

    <div className="bg-[#f8f3ff]">

      <Home />
      <SearchCourses />
      <PopularCourses />
      <AboutUsDashboard/>
      <FAQ />
      <Footer />

    </div>
  )

}
export default page
