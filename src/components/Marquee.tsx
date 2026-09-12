import content from "@/data/content.json";
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  const items = [...content.marquee.content, ...content.skills.detail.slice(0, 8).map((skill) => skill.name)];

  return (
    <div className="w-full border-y border-white/10 py-4 md:py-5 md:mt-2 mt-12 my-4">
      <Marquee speed={38} gradient gradientColor="#0a0a0a" gradientWidth={80} pauseOnHover={false}>
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-8 text-sm font-medium text-white/80 md:text-base">
            {item}
            <span className="ml-8 text-[var(--accent)]">{content.marquee.gap}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
