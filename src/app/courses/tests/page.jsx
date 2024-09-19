"use client"
import Layout from '@/components/Course/Layout'
import TestPage from '@/components/Course/TestPage'
import NavBar from '@/components/NavBar'
import React from 'react'

function page() {
  return (
    <>
    <NavBar/>
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>
        <TestPage/>
      </div>
    </Layout>
    </>
  )
}

export default page