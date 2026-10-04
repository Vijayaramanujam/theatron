interface Props {
  activeCategory: 'Competitions' | 'Workshops';
  onCategoryChange: (category: 'Competitions' | 'Workshops') => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="flex justify-center gap-4 sm:gap-6 mb-12">
      <button
        onClick={() => onCategoryChange('Competitions')}
        className={`px-6 py-2 rounded-full border-2 text-sm font-bold tracking-wide transition-all duration-300 ${
          activeCategory === 'Competitions'
            ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30'
            : 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
        }`}
      >
        Competitions
      </button>

      <button
        onClick={() => onCategoryChange('Workshops')}
        className={`px-6 py-2 rounded-full border-2 text-sm font-bold tracking-wide transition-all duration-300 ${
          activeCategory === 'Workshops'
            ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30'
            : 'border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
        }`}
      >
        Workshops
      </button>
    </div>
  );
}
