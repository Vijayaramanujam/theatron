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
    <div className="text-center mb-10 font-['Space_Grotesk',sans-serif]">
      <p className="text-[#f43f5e] text-xs font-extrabold tracking-[0.3em] mb-3 uppercase drop-shadow-md">
        {eyebrow}
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 uppercase tracking-tight font-['Syne',sans-serif] text-metallic-red">
        {title}
      </h1>

      {/* Metallic Red Dot Line Divider */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#e11d48] to-[#be123c]" />
        <div className="w-3.5 h-3.5 bg-[#e11d48] rounded-full shadow-[0_0_15px_#e11d48]" />
        <div className="h-[2px] w-16 bg-gradient-to-l from-transparent via-[#e11d48] to-[#be123c]" />
      </div>

      <p className="text-gray-400 text-xs sm:text-sm tracking-widest max-w-2xl mx-auto uppercase font-semibold leading-relaxed">
        {description}
      </p>
    </div>
  );
}
