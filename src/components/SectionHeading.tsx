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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mb-12"
    >
      <span className="text-[#dc2626] text-xs font-extrabold uppercase tracking-[0.3em] mb-2">
        {eyebrow}
      </span>

      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-['Space_Grotesk',sans-serif] my-1">
        {title}
      </h2>

      {/* Red Dot Line Divider matching Reference Screenshot 5 */}
      <div className="flex items-center justify-center gap-3 my-4">
        <div className="w-12 h-[1.5px] bg-[#dc2626]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#dc2626] shadow-sm shadow-red-600" />
        <div className="w-12 h-[1.5px] bg-[#dc2626]" />
      </div>

      {description && (
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 max-w-3xl mx-auto leading-relaxed mt-1">
          {description}
        </p>
      )}
    </motion.div>
  );
}
