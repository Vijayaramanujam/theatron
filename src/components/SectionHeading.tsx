interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow = "CHOOSE YOUR CATEGORY",
  title = "EVENTS",
  description = "EXPLORE OUR CINEMATIC COMPETITIONS AND HANDS-ON CREATIVE WORKSHOPS"
}: Props) {
  return (
    <div className="text-center mb-12 sm:mb-16 font-sans space-y-6">
      <p className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.3em] uppercase">
        {eyebrow}
      </p>
      
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase py-2">
        {title}
      </h1>

      {/* Decorative Red Dot Line Divider with Generous Spacing */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 py-3">
        <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-red-600"></div>
        <div className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-lg shadow-red-600/50"></div>
        <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-red-600"></div>
      </div>

      <p className="text-zinc-300 text-xs sm:text-sm md:text-base tracking-[0.15em] font-medium uppercase max-w-3xl mx-auto leading-relaxed pt-2">
        {description}
      </p>
    </div>
  );
}
