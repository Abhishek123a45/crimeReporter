import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors } from './theme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`${colors.background} shadow-lg fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex">
          <div className="flex w-full justify-between space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <span className={`font-semibold ${colors.text} text-lg`}>Logo</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} mr-4 transition duration-300 ease-in-out transform hover:scale-105 z-20`}
                onClick={() => setIsOpen(false)}
              >
                Crime Data
              </Link>
              <Link
                to="/report"
                className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} mr-4 transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setIsOpen(false)}
              >
                Report
              </Link>
              <Link
                to="/trends"
                className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} transition duration-300 ease-in-out transform hover:scale-105`}
                onClick={() => setIsOpen(false)}
              >
                Crime Trends
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              {isOpen ? (
                <svg className={`w-6 h-6 ${colors.text}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className={`w-6 h-6 ${colors.text}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`md:hidden fixed inset-0 ${colors.overlay} z-40`} onClick={toggleMenu}></div>
      )}
      <div className={`md:hidden fixed right-0 top-0 h-full w-64 ${colors.background} z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} mr-4 transition duration-300 ease-in-out transform hover:scale-105 z-20`}
            onClick={() => setIsOpen(false)}
          >
            Crime Data
          </Link>
          <Link
            to="/report"
            className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} mr-4 transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={() => setIsOpen(false)}
          >
            Report
          </Link>
          <Link
            to="/trends"
            className={`block mt-4 lg:inline-block lg:mt-0 ${colors.primary} hover:${colors.primaryHover} transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={() => setIsOpen(false)}
          >
            Crime Trends
          </Link>
        </div>
      </div>
    </nav>
  );
}