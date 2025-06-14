import content from '@/data/content.json';
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
    return (
        <>
            <div className="w-full bg-[#111] py-2 md:py-5">
                <Marquee speed={50} gradient={false}>
                    {content.marquee.content.map((item, index) => (
                    <span key={index} className="text-white font-bold text-sm md:text-xl">
                        {item}
                        <span className="md:mx-40 mx-20 text-blue-400">{content.marquee.gap}</span>
                    </span>
                    ))}
                </Marquee>
            </div>
        </>
    );
};

export default MarqueeSection;
