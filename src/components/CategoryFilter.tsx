interface Props {
  activeCategory: 'Competitions' | 'Workshops';
  onCategoryChange: (category: 'Competitions' | 'Workshops') => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="w-full flex justify-center items-center gap-4 sm:gap-6 my-4 sm:my-6 text-center mx-auto">
      <button
        onClick={() => onCategoryChange('Competitions')}
        className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
          activeCategory === 'Competitions'
            ? 'bg-red-600 border-red-600 text-white shadow-red-950/50'
            : 'border-red-600/80 text-red-500 hover:bg-red-600 hover:text-white bg-black/50'
        }`}
      >
        Competitions
      </button>

      <span className="w-2 h-2 rounded-full bg-red-600/60 hidden sm:inline-block shrink-0" />

      <button
        onClick={() => onCategoryChange('Workshops')}
        className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
          activeCategory === 'Workshops'
            ? 'bg-red-600 border-red-600 text-white shadow-red-950/50'
            : 'border-red-600/80 text-red-500 hover:bg-red-600 hover:text-white bg-black/50'
        }`}
      >
        Workshops
      </button>
    </div>
  );
}
