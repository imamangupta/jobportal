"use client";
import React, { useState, useCallback } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

const NavItem = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
  >
    {children}
    <ChevronDown className="ml-1 h-4 w-4" />
  </Link>
);

const Button = ({ variant = "solid", children, className = "" }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
      variant === "outline"
        ? "border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
        : "bg-purple-500 text-white hover:bg-purple-600"
    } ${className}`}
  >
    {children}
  </button>
);

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="relative z-10">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-purple-800">CodePathshala</div>
        <nav className="hidden md:flex space-x-8 lg:space-x-16">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/courses">Course</NavItem>
          <NavItem href="/job">Job</NavItem>
          <NavItem href="/dashboard">Dashboard</NavItem>
        </nav>
        <div className="hidden md:flex space-x-2">
          <Link href={"/signup"}>
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href={"/login"}>
            <Button>Log In</Button>
          </Link>
        </div>
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-white shadow-md p-4 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/courses">Course</NavItem>
            <NavItem href="/jobs">Job</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
          </nav>
          <div className="mt-4 space-y-2">
            <Link href={"/signup"}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button className="w-full">Log In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
