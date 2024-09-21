"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellIcon, SearchIcon, MenuIcon, } from "lucide-react";
import Dashboard from "./Dashboard";
import ResumeBuilder from "./ResumeBuilder";
import Tracking from "./Tracking";
import Interview from "./Interview";
import Message from "./Message";
import NewsFeed from "./NewsFeed";
import MyProfile from "./MyProfile";
import Setting from "./Setting";
import { useSearchParams ,useRouter } from "next/navigation";
import Link from "next/link";
import JobPostingManager from "./JobPostingManager";
import MyApplication from "./MyApplication";



const routeItem = [
  { name: "Home", icon: "🏠", path: "/" },
  { name: "Course", icon: "📚", path: "/courses" },
  { name: "Job", icon: "🏢", path: "/job" },
];

export default function Layout({ data }) {

  // console.log(data);
 
  const searchParams = useSearchParams();
const nav = searchParams.get('nav');



  

  const sidebarItems = [
    { name: "Dashboard", icon: "📊", component: Dashboard },

    ...(data.role === 'student'
      ? [
        { name: "Resume Builder", icon: "📝", component: ResumeBuilder },
        { name: "My Application", icon: "📝", component: MyApplication },
        { name: "Message", icon: "💬", component: Message },
        { name: "Interview", icon: "🎙️", component: Interview },
        { name: "My Profile", icon: "👤", component: MyProfile },
        { name: "Setting", icon: "⚙️", component: Setting },
      ]
      : []),
    ...(data.role === 'company'
      ? [
        { name: "Post New Job", icon: "🔍", component: JobPostingManager },
        { name: "Interview", icon: "🎙️", component: Interview },
        { name: "Message", icon: "💬", component: Message },
        { name: "My Profile", icon: "👤", component: MyProfile },
        { name: "Setting", icon: "⚙️", component: Setting },
      ]
      : []),

  ];






  const [activeItem, setActiveItem] = useState(nav||"Dashboard");
  const [activeHomeItem, setActiveHomeItem] = useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const ActiveComponent = sidebarItems.find((item) => item.name === activeItem)?.component || Dashboard;

  useEffect(() => {
    const results = sidebarItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    // Simulated notification fetching
    const fetchNotifications = () => {
      const newNotifications = [
        { id: 1, message: "New job matching your profile!", isRead: false },
        { id: 2, message: "Interview scheduled for tomorrow", isRead: false },
      ];
      setNotifications(newNotifications);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setActiveItem("My Profile");
  };


  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push("/");
  }

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchSelect = (item) => {
    setActiveItem(item.name);
    setSearchQuery("");
    setIsSearchFocused(false);
  };
  const router = useRouter();
  const handleRoute = (e) => {
    router.push("/");
  };
  // home nav
  const NavItem = ({ href, children }) => <Link href={href}>{children}</Link>;

  const [isClient, setIsClient] = useState(false); // Flag to check if we are in the browser

  // Set flag to true only after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 h-screen overflow-auto bg-purple-900 text-white p-6"
          >
            <button onClick={handleRoute} className="text-3xl font-bold mb-8">
              CodePathshala
            </button>

            <nav>
              {routeItem.map((item) => (
                <Link key={item.name} href={item.path} passHref>
                  <motion.div // Use div instead of <a> to avoid <a> nesting
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block py-2 px-4 my-2 rounded transition-colors duration-200 ${isClient && window.location.pathname === item.path
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                      }`}
                    onClick={() => setActiveHomeItem(item.path)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              {sidebarItems.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`block py-2 px-4 my-2 rounded transition-colors duration-200  ${activeItem === item.name
                    ? "bg-indigo-700"
                    : "hover:bg-indigo-800"
                    }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full bg-indigo-700 hover:bg-indigo-600 py-2 rounded"
              onClick={handleLogout}
            >
              Log Out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm m-2 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <MenuIcon size={24} />
            </motion.button>
            <h2 className="text-2xl font-semibold">{activeItem}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
              <SearchIcon
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <AnimatePresence>
                {isSearchFocused && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10"
                  >
                    {searchResults.map((result) => (
                      <div
                        key={result.name}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchSelect(result)}
                      >
                        {result.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative" ref={notificationRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-gray-900 relative"
                onClick={handleNotificationClick}
              >
                <BellIcon size={24} />
                {notifications.some((n) => !n.isRead) && (
                  <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
                )}
              </motion.button>
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-64 bg-white border rounded-md shadow-lg z-10 right-0"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-2 hover:bg-gray-100"
                        >
                          {notification.message}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleProfileClick}
            >
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-semibold">{data.userName}</p>
                {/* <p className="text-sm text-gray-500">New Delhi, India</p> */}
              </div>
            </motion.div>
          </div>
        </header>








        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent data={data} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
