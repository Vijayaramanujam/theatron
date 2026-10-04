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
    <div className="text-center mb-16 font-sans">
      <p className="text-red-600 text-xs tracking-widest mb-4 uppercase">{eyebrow}</p>
      <h1 className="text-6xl font-bold mb-4 text-white uppercase">{title}</h1>
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-12 bg-red-600"></div>
        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
        <div className="h-px w-12 bg-red-600"></div>
      </div>
      <p className="text-gray-400 text-sm tracking-wider mb-8 uppercase">
        {description}
      </p>
    </div>
  );
}
