import Layout from '@/components/Course/Layout'
import RoadmapPage from '@/components/Course/RoadmapPage'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
<NavBar/>
<Layout>
      <div className="space-y-6">
      <RoadmapPage/>
      </div>
    </Layout>


    </div>
  )
}

export default page