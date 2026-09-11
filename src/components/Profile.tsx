import content from "@/data/content.json";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const photos = Array.from({ length: 18 }, (_, i) => `/me${i + 1}.jpg`);

const highlights = [
  { label: "GPA", value: "3.92", hint: "/ 4.00" },
  { label: "Projects", value: `${content.projects.featured.length}+`, hint: "" },
  { label: "Focus", value: "AI & SE", hint: "" },
];

const Profile = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + photos.length) % photos.length);
  }, []);

  const nextPhoto = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prevPhoto = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    const interval = setInterval(nextPhoto, 5000);
    return () => clearInterval(interval);
  }, [nextPhoto]);

  return (
    <section id="profile" className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -left-6 top-10 hidden h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl md:block" />
          <div className="pointer-events-none absolute -right-4 bottom-16 hidden h-28 w-28 rounded-full bg-white/10 blur-2xl md:block" />

          <div className="relative">
            <div className="absolute -left-3 top-8 hidden h-[70%] w-full rotate-[-4deg] rounded-[1.6rem] border border-white/10 bg-white/5 md:block" />
            <div className="absolute -right-2 top-4 hidden h-[75%] w-full rotate-[3deg] rounded-[1.6rem] border border-white/8 bg-[#151515] md:block" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#111] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] md:aspect-[5/6]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, scale: 1.04, x: direction * 36 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: direction * -36 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photos[current]}
                      alt={`Profile photo ${current + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,85,212,0.18),transparent_45%)]" />

                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-md">
                  Portrait
                </div>

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={prevPhoto}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65"
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65"
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </div>
                  <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-md">
                    {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              key={current}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-[var(--accent)]"
            />
          </div>

          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.slice(0, 8).map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => goTo(index, index > current ? 1 : -1)}
                className={`relative h-12 w-10 shrink-0 overflow-hidden rounded-lg border transition ${
                  current === index ? "border-[var(--accent)] opacity-100" : "border-white/10 opacity-50 hover:opacity-80"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              >
                <Image src={photo} alt="" fill className="object-cover" sizes="40px" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="nf-eyebrow mb-3">Profile</p>
          <h2 className="font-display text-3xl leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Built to ship AI that holds up in production
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
            {content.about.detail}
          </p>

          <div className="mt-10 flex flex-wrap gap-8 border-y border-white/10 py-6">
            {highlights.map((item, index) => (
              <div key={item.label} className="min-w-[6.5rem]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</p>
                <p className="mt-2 font-display text-4xl text-white md:text-5xl">
                  {item.value}
                  <span className="ml-1 text-lg text-zinc-500 md:text-xl">{item.hint}</span>
                </p>
                {index < highlights.length - 1 && (
                  <span className="sr-only">,</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#experience" className="nf-btn-primary">
              See experience
            </Link>
            <Link href="/#projects" className="nf-btn-secondary">
              Browse work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
