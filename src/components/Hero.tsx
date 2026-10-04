import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Gradients & Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#dc2626]/20 blur-[120px] pointer-events-none" />

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* Floating Shapes */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 5, 0] 
          }} 
          transition={{ duration: 6, repeat: Infinity, delay: 0 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#dc2626]/20 rounded-full opacity-50"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0], 
            rotate: [0, -10, 0] 
          }} 
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-[#dc2626]/10 rounded-full opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#dc2626]" />
            <span className="text-[#dc2626] font-semibold tracking-[0.3em] text-sm uppercase">
              Cinematic Arts Festival
            </span>
            <div className="h-px w-8 bg-[#dc2626]" />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tighter leading-none"
          >
            THEA<span className="text-[#dc2626]">TRON</span>
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium text-gray-200 mb-6"
          >
            Create. Compete. Experience.
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Where cinema, creativity, and performance converge. Explore competitions, workshops, and experiences that ignite your artistic journey.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a 
              href="#events"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#ef4444] text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
            >
              EXPLORE EVENTS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626]/10 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
            >
              REGISTER NOW
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
