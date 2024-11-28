import {
  Calendar,
  CheckSquare,
  Home,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const navitems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Tasks", href: "/", icon: CheckSquare },
  { name: "Calendar", href: "/", icon: Calendar },
  { name: "Setting", href: "/", icon: Settings },
];
export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav
      className={` top-0 left-0 right-0  bg-white dark:bg-gray-900 transition-colors duration-200 ease-in-out ${
        isDarkMode ? "dark:" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="px-3 py-2 text-sm font-medium">
              <span className="text-2xl font-bold text-green-900 dark:text-green-200">
                Tracker
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navitems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  <item.icon className="inline-block w-5 h-5 mr-1" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <motion.div
        className={`md:hidden  ${isMobileMenuOpen ? "block " : "hidden"}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -50,
        }}
        transition={{ duration: 0.3 }}
      >
        <div>
          {navitems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.href
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900"
              }`}
            >
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
