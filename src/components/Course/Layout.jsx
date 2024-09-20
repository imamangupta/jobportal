"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Code, Map, MessageSquare, FileText, ChevronRight } from 'lucide-react'

const navItems = [
  { href: '/courses', icon: BookOpen, label: 'Courses' },
  { href: '/courses/code-editor', icon: Code, label: 'Code Editor' },
  { href: '/courses/roadmap', icon: Map, label: 'Roadmap' },
  { href: '/courses/doubt-solver', icon: MessageSquare, label: 'Doubt Solver' },
  { href: '/courses/tests', icon: FileText, label: 'Tests' },
]

const Layout = ({ children }) => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen">
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="mt-5">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              href={href}
              key={href}
              className={`flex items-center px-5 py-3 text-gray-600 transition-colors duration-200 hover:bg-purple-50 hover:text-purple-600 ${
                pathname === href ? 'bg-purple-50 text-purple-600' : ''
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <button 
        onClick={toggleSidebar}
        className={`fixed top-1/2 -translate-y-1/2 z-50 bg-white rounded-r-full p-2 shadow-md transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-64' : 'left-0'
        }`}
        aria-label="Toggle sidebar"
      >
        <ChevronRight 
          className={`h-6 w-6 text-purple-600 transition-transform duration-300 ${
            isSidebarOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}

export default Layout