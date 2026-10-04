import { overallContacts } from '../data/events';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 md:py-12 px-4 md:px-6 text-white font-['Space_Grotesk',sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8 items-center">
          {/* Created By */}
          <div className="flex items-center gap-4 group justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Created By</p>
              <img src="/Asymmetric_logo.svg" alt="Asymmetric Logo" className="w-24 h-auto mt-1 mb-1" />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Club Asymmetric</p>
            </div>
          </div>

          {/* Center Brand */}
          <div className="text-center">
            <p className="text-red-600 font-bold text-base md:text-lg mb-1 tracking-wider drop-shadow-md">
              RESOLUTION × IMMERSE
            </p>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wide">
              Chennai Institute of Technology
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs md:text-sm">© 2025 THEATRON</p>
          </div>
        </div>

        {/* Gradient Red Divider Bar */}
        <div className="h-0.5 md:h-1 rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-lg mb-6" />

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Overall Clarification:</span>
            <span className="text-white text-xs sm:text-sm">
              {overallContacts.map((c) => `${c.name}: ${c.phone}`).join(' | ')}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-1 md:gap-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Email:</span>
            <a href="mailto:immersecit@gmail.com" className="text-white hover:text-red-600 transition text-xs sm:text-sm">
              immersecit@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
