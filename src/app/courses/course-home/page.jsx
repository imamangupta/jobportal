import CourseHome from '@/components/Course/CourseHome'
import Layout from '@/components/Course/Layout'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
        <NavBar/>
        <Layout>
      <div className="space-y-6">
      <CourseHome/>
      </div>
    </Layout>
        <Footer/>
    </div>
  )
}

export default page
