import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-gray-600"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></div>
        <div className="w-6 h-px bg-gray-600"></div>
      </div>
      
      <span className="text-[#dc2626] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
        {eyebrow}
      </span>
      
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        {title}
      </h2>
      
      {description && (
        <p className="text-[#a1a1a1] max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
