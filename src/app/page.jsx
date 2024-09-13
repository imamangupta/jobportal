import Home from '../components/Home'
import SearchCourses from '@/components/SearchCourses'
import PopularCourses from '@/components/PopularCourses'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import React from 'react'

function page() {
  return (

    <div>

      <Home />
      <SearchCourses />
      <PopularCourses />
      <FAQ />
      <Footer />

    </div>
  )

}
export default page
