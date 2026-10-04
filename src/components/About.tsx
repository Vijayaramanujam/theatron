import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Film, GraduationCap, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';

const features = [
  {
    icon: Film,
    title: 'Cinematic Competitions',
    description: 'Push your creative boundaries through competitions spanning cinema, photography, theatre, dance, and more.'
  },
  {
    icon: GraduationCap,
    title: 'Hands-On Workshops',
    description: 'Learn from industry practices in photography, VFX, dance, scriptwriting, and storyboarding.'
  },
  {
    icon: Sparkles,
    title: 'Creative Community',
    description: 'Connect with fellow artists, filmmakers, performers, and creators who share your passion.'
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="THE EXPERIENCE" title="Where Creativity Comes Alive" />
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-8 hover:border-red-600/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-space">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-3xl md:text-5xl font-space font-bold text-white/5 tracking-widest uppercase pointer-events-none">
            8 Competitions · 5 Workshops
          </p>
        </motion.div>
      </div>
    </section>
  );
}
