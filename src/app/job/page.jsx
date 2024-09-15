import Footer from '@/components/Footer'
import JobListingPage from '@/components/Job/JobListingPage'
import JobMain from '@/components/Job/JobMain'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
        <NavBar/>
        <JobMain/>
        <Footer/>
    </div>
  )
}

export default page