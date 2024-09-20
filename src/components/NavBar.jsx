'use client'
import React, { useState, useCallback, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { checkToken } from "@/utils/checkToken"


const NavItem = ({ href, children, subItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
      >
        {children}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="ml-1 h-4 w-4" />
        </motion.div>
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1">
              {subItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Button = ({ variant = "solid", children, className = "" }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${variant === "outline"
        ? "border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
        : "bg-purple-500 text-white hover:bg-purple-600"
      } ${className}`}
  >
    {children}
  </button>
)

const MobileNavItem = ({ item, isOpen, toggleOpen }) => {
  return (
    <div className="py-2">
      <button
        className="w-full text-left text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center justify-between"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        {item.label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="ml-1 h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 mt-2 space-y-2"
          >
            {item.subItems.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                className="block text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {subItem.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openItems, setOpenItems] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
    setOpenItems({})
  }, [])

  const toggleItem = useCallback((index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }, [])

  useEffect(() => {
    const verifyToken = async () => {
      const tokenValid = await checkToken()
      setIsAuthenticated(tokenValid)
    }
    verifyToken()
  }, [])

  const navItems = [
    {
      label: "Home",
      href: "/",
      subItems: [
        { label: "About Us", href: "#about-us" },
        { label: "Services", href: "#why-choose-us" },
        { label: "FAQ", href: "#FAQ" },
      ],
    },
    {
      label: "Course",
      href: "/courses",
      subItems: [
        { label: "Roadmap", href: "/courses/roadmap" },
        { label: "Code Editor", href: "/courses/code-editor" },
        { label: "Mock Test", href: "/courses/tests" },
        { label: "Doubt Solver", href: "/courses/doubt-solver" },
      ],
    },
    {
      label: "Job",
      href: "/job",
      subItems: [
        { label: "Jobs", href: "/job" },
        { label: "Internship", href: "/job?jobtype=internship" },
        { label: "Contract", href: "/job?jobtype=contract" },
      ],
    },
    ...(isAuthenticated
      ? [
        {
          label: "Dashboard",
          href: "/dashboard",
          subItems: [
            { label: "My Courses", href: "/dashboard/courses" },
            { label: "My Applications", href: "/dashboard/applications" },
            { label: "Settings", href: "/dashboard/settings" },
          ],
        },
      ]
      : []),
  ]

  return (
    <header className="relative z-10">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-purple-800">CodePathshala</div>
        <nav className="hidden md:flex space-x-8 lg:space-x-16">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} subItems={item.subItems}>
              {item.label}
            </NavItem>
          ))}
        </nav>
        <div className="hidden md:flex space-x-2">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                exit={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item, index) => (
                <MobileNavItem
                  key={index}
                  item={item}
                  isOpen={openItems[index]}
                  toggleOpen={() => toggleItem(index)}
                />
              ))}
            </nav>
            <div className="flex flex-col space-y-2 p-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
