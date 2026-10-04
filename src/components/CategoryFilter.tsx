interface Props {
  activeCategory: 'Competitions' | 'Workshops';
  onCategoryChange: (category: 'Competitions' | 'Workshops') => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="flex justify-center gap-4 sm:gap-6 mb-14">
      <button
        onClick={() => onCategoryChange('Competitions')}
        className={`px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 ${
          activeCategory === 'Competitions'
            ? 'btn-metallic text-white scale-105 shadow-[0_0_20px_rgba(225,29,72,0.5)]'
            : 'border-2 border-[#e11d48]/50 text-[#f43f5e] hover:bg-[#e11d48]/10 hover:border-[#e11d48]'
        }`}
      >
        Competitions
      </button>

      <button
        onClick={() => onCategoryChange('Workshops')}
        className={`px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-300 ${
          activeCategory === 'Workshops'
            ? 'btn-metallic text-white scale-105 shadow-[0_0_20px_rgba(225,29,72,0.5)]'
            : 'border-2 border-[#e11d48]/50 text-[#f43f5e] hover:bg-[#e11d48]/10 hover:border-[#e11d48]'
        }`}
      >
        Workshops
      </button>
    </div>
  );
}
