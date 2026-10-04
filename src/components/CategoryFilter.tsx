import { motion } from 'framer-motion';

interface Props {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-3 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className="relative px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
        >
          {active === category ? (
            <>
              <span className="relative z-10 text-white">{category}</span>
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-[#dc2626] rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </>
          ) : (
            <>
              <span className="relative z-10 text-[#dc2626]">{category}</span>
              <div className="absolute inset-0 border border-[#dc2626] rounded-full" />
            </>
          )}
        </button>
      ))}
    </div>
  );
}
