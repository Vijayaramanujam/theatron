import { overallContacts } from '../data/events';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#1f1f1f] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-space tracking-wider text-red-600">
              THEATRON
            </h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Cinematic Arts Festival
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-space mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#events" className="text-gray-400 hover:text-red-500 transition-colors text-sm">Events</a></li>
              <li><a href="#workshops" className="text-gray-400 hover:text-red-500 transition-colors text-sm">Workshops</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-red-500 transition-colors text-sm">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold font-space mb-6 text-white">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              {overallContacts.map((contact, idx) => (
                <li key={idx} className="flex justify-between items-center max-w-[240px]">
                  <span className="text-gray-400">{contact.name}</span>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-white hover:text-red-500 transition-colors ml-4">
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1f1f1f] pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Theatron. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
