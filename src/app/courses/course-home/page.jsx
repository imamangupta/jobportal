import CourseHome from '@/components/Course/CourseHome'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
        <NavBar/>
        <CourseHome/>
        <Footer/>
    </div>
  )
}

export default page