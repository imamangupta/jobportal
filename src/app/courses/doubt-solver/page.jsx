import DoubtSolverPage from '@/components/Course/DoubtSolverPage'

import Layout from '@/components/Course/Layout'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
<NavBar/>
<Layout>
      <div className="space-y-6">
      <DoubtSolverPage/>
      </div>
    </Layout>


    </div>
  )
}

export default page