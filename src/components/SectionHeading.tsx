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
    <div className="w-full flex flex-col items-center justify-center text-center font-sans space-y-4 sm:space-y-6 mx-auto px-4">
      <p className="text-red-500 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase text-center w-full">
        {eyebrow}
      </p>
      
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase text-center w-full leading-tight drop-shadow-md">
        {title}
      </h1>

      {/* Decorative Red Dot Line Divider - Centered */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 py-2 w-full mx-auto">
        <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-red-600"></div>
        <div className="w-3 h-3 bg-red-600 rounded-full shadow-lg shadow-red-600/50 shrink-0"></div>
        <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-red-600"></div>
      </div>

      <p className="text-zinc-300 text-xs sm:text-sm md:text-base tracking-[0.15em] font-medium uppercase max-w-3xl text-center w-full leading-relaxed mx-auto pt-1">
        {description}
      </p>
    </div>
  );
}
