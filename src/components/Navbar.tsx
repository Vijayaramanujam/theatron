import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'EVENTS', href: '#events' },
  { name: 'WORKSHOPS', href: '#workshops' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'events', 'workshops', 'about', 'contact'];
      let current = '#home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 120) {
          current = `#${section}`;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveLink(href);
  };

  return (
    <>
      {/* Floating Instagram Icon on Left Edge (Matching Reference Screenshot 1 & 5) */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform hidden sm:flex border border-white/20"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-[#1f1f1f] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group" onClick={() => handleLinkClick('#home')}>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white font-['Space_Grotesk'] uppercase italic">
              THEA<span className="text-[#dc2626]">TRON</span>
            </span>
          </a>

          {/* Partner Branding Badge (Matching Reference) */}
          <div className="hidden lg:flex items-center gap-3 bg-[#111] border border-[#222] px-4 py-1.5 rounded-sm">
            <span className="text-red-500 font-extrabold text-xs tracking-wider">IMMERSE</span>
            <span className="text-gray-500 text-xs">×</span>
            <span className="text-white font-bold text-xs tracking-wider">TEAM RESOLUTION</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-xs font-bold tracking-widest transition-all ${
                    isActive
                      ? 'bg-[#dc2626] text-white px-5 py-2 rounded-full shadow-md'
                      : 'text-gray-300 hover:text-[#dc2626] px-3 py-2'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#register"
              onClick={() => handleLinkClick('#register')}
              className="bg-[#dc2626] hover:bg-[#ef4444] text-white px-6 py-2 rounded-full text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/30"
            >
              REGISTER <ChevronRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-[#dc2626] p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#050505] border-b border-[#1f1f1f] shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-base font-bold tracking-wider p-3 rounded-sm ${
                      activeLink === link.href
                        ? 'text-white bg-[#dc2626]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#register"
                  onClick={() => handleLinkClick('#register')}
                  className="mt-4 bg-[#dc2626] text-white p-3.5 rounded-sm font-extrabold text-sm tracking-widest text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  REGISTER NOW <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
