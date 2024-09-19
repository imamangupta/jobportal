import CodeEditorPage from '@/components/Course/code-editor'
import Layout from '@/components/Course/Layout'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <div>
      <NavBar/>
      <Layout>
      <div className="space-y-6">
        <CodeEditorPage/>
      </div>
      </Layout>
    </div>
  )
}

export default page