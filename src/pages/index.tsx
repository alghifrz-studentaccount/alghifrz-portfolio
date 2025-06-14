import Head from "next/head";
import Hero from "@/components/Hero";
import content from '@/data/content.json';
import Marquee from "@/components/Marquee";
import Content from "@/components/Content";
import Contact from '@/components/Contact';

export default function Home() {
  const { meta } = content;
  
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-white overflow-hidden">
        {/* Bulat besar */}
        <div className="fixed z-0 top-10 left-10 w-72 h-72 bg-blue-300 opacity-40 rounded-full blur-3xl animate-float-wild" />

        {/* Lonjong horizontal */}
        <div className="fixed z-0 top-40 right-20 w-120 h-120 bg-blue-300 opacity-40 rounded-full blur-3xl animate-float-wild2" />

        {/* Bulat besar */}
        <div className="fixed z-0 bottom-10 right-10 w-72 h-72 bg-blue-300 opacity-40 rounded-full blur-3xl animate-float-wild3" />

        {/* Lonjong horizontal */}
        <div className="fixed z-0 bottom-40 left-20 w-96 h-96 bg-blue-300 opacity-40 rounded-full blur-3xl animate-float-wild4" />

        <Hero />
        <Marquee />
        <Content />
        <Marquee />
        <Contact />
      </div>
    </>
  );
}

