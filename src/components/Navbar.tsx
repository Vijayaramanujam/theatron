import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Instagram Icon matching reference */}
      <div className="fixed left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="relative group">
          <a
            href="https://www.instagram.com/immerse_cit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Immerse Instagram"
            className="bg-red-600 p-2 sm:p-2.5 md:p-3 text-white hover:bg-red-700 transition rounded-full flex justify-center items-center shadow-lg"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </a>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 md:ml-3 hidden md:group-hover:flex bg-black/90 p-2 rounded border border-gray-800">
            <img src="/Immerse_logo.svg" alt="Immerse Instagram" className="w-16 md:w-20 h-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Main Reference Navbar */}
      <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-10 py-2 md:py-3">
          <a className="flex items-center h-[40px] md:h-[50px]" href="#">
            <img
              alt="Theatron Logo"
              src="/Theatron_Logo.svg"
              className="object-contain hover:opacity-90 transition-all duration-300 w-[120px] md:w-[150px] md:h-[50px]"
            />
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-4 xl:gap-6 h-[50px]">
            <div className="w-[120px] xl:w-[150px]">
              <img
                alt="Immerse Logo"
                src="/Immerse_logo.svg"
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-gray-400 text-base xl:text-lg font-bold">×</span>
            <div className="w-[110px] xl:w-[140px]">
              <img
                alt="Resolution Logo"
                src="/Resolution_logo.svg"
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <a className="text-xs sm:text-sm tracking-wider font-medium transition text-gray-400 hover:text-white" href="#events">
              HOME
            </a>
            <a className="text-xs sm:text-sm tracking-wider font-medium transition bg-red-600 px-3 py-1.5 md:px-4 md:py-2 text-white rounded-md shadow-md" href="#events">
              EVENTS
            </a>
            <a className="text-xs sm:text-sm tracking-wider font-medium transition text-gray-400 hover:text-white" href="#events">
              GALLERY
            </a>
            <a className="text-xs sm:text-sm tracking-wider font-medium transition text-gray-400 hover:text-white" href="#events">
              CONTACT
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-b border-gray-800 px-6 py-4 flex flex-col space-y-3"
            >
              <a onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wider text-gray-300 hover:text-white" href="#events">
                HOME
              </a>
              <a onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wider text-white bg-red-600 px-3 py-2 rounded-md" href="#events">
                EVENTS
              </a>
              <a onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wider text-gray-300 hover:text-white" href="#events">
                GALLERY
              </a>
              <a onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium tracking-wider text-gray-300 hover:text-white" href="#events">
                CONTACT
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
