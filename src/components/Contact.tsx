import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { overallContacts, events } from '../data/events';
import type { Contact as ContactType } from '../types/event';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allEvents = events.filter(e => e.contacts && e.contacts.length > 0);

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="GET IN TOUCH" title="Contact Us" />
        
        <div ref={ref} className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Overall Contacts */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-bold font-space mb-8 text-white">For Overall Clarification</h3>
            <div className="space-y-4">
              {overallContacts.map((contact, idx) => (
                <div key={idx} className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-6 flex items-center justify-between group hover:border-red-600/30 transition-all">
                  <div>
                    <p className="font-semibold text-lg text-white">{contact.name}</p>
                  </div>
                  <a 
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                    className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-red-500 group-hover:bg-red-600/10 transition-colors shrink-0 ml-4"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Event Specific Contacts */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-bold font-space mb-8 text-white">Event Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allEvents.map((event, idx) => (
                <div key={idx} className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#2a2a2a] transition-all">
                  <h4 className="font-bold text-red-500 mb-3 text-sm uppercase tracking-wider">{event.name}</h4>
                  <div className="space-y-3">
                    {event.contacts?.map((contact: ContactType, cIdx: number) => (
                      <div key={cIdx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{contact.name}</span>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
