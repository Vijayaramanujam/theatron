import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Events', href: '#events' },
  { name: 'Workshops', href: '#workshops' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '#home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1f1f1f] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group" onClick={() => handleLinkClick('#home')}>
          <span className="text-3xl font-bold tracking-tighter text-white">
            THEA<span className="text-[#dc2626]">TRON</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={`text-sm font-medium transition-colors hover:text-[#dc2626] ${
                activeLink === link.href ? 'text-[#dc2626]' : 'text-gray-300'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => handleLinkClick('#register')}
            className="bg-[#dc2626] hover:bg-[#ef4444] text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2"
          >
            Register <ChevronRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-[#dc2626] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-[#1f1f1f] shadow-xl md:hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-lg font-medium p-2 rounded-md ${
                    activeLink === link.href
                      ? 'text-[#dc2626] bg-[#dc2626]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => handleLinkClick('#register')}
                className="mt-4 bg-[#dc2626] text-white p-3 rounded-md font-medium text-center flex items-center justify-center gap-2"
              >
                Register Now <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
