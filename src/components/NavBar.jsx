import React from "react";
import { ChevronDown } from "lucide-react";

function NavBar() {
  return (
    <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-purple-800">CodePathshala </div>
      <nav className="hidden md:flex space-x-16">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Home <ChevronDown className="inline h-4 w-4" />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Course <ChevronDown className="inline h-4 w-4" />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Job <ChevronDown className="inline h-4 w-4" />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Dashboard
        </a>
      </nav>
      <div className="space-x-2">
        <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded font-semibold hover:bg-purple-500 hover:text-white transition">
          Sign In
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded font-semibold hover:bg-purple-600 transition">
          Free Trial
        </button>
      </div>
    </header>
  );
}

export default NavBar;
