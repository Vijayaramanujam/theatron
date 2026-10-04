import { motion } from 'framer-motion';

interface Props {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 my-8">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`relative px-8 py-3 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? 'bg-[#dc2626] text-white shadow-lg shadow-red-600/30 scale-105'
                : 'bg-transparent border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626]/10'
            }`}
          >
            {cat}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-[#dc2626] rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
