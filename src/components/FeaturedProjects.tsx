import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  cat: string;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

function slugify(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const [lead, ...rest] = featuredProjects;

  if (!lead) return null;

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="nf-eyebrow mb-3">Selected work</p>
          <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
            Systems that already ran in the wild
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            AI automation, dashboards, and full-stack products — a few highlights from the stack.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/projects" className="nf-btn-secondary">
            View all projects <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75 }}
        className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111]"
      >
        <div className="relative aspect-[16/11] md:aspect-[21/9]">
          <Image
            src={`/${lead.image}`}
            alt={lead.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 1152px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,85,212,0.22),transparent_45%)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="nf-badge">{lead.cat}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">Featured 01</span>
          </div>
          <h3 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-white md:text-5xl">
            {lead.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base line-clamp-3">
            {lead.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {lead.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-zinc-200 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/projects/${slugify(lead.title)}`} className="nf-btn-primary">
              See case <FaArrowRight className="text-xs" />
            </Link>
            {lead.github && (
              <a href={lead.github} target="_blank" rel="noopener noreferrer" className="nf-btn-secondary">
                <FaGithub /> GitHub
              </a>
            )}
            {lead.demo && (
              <a
                href={lead.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
              >
                <FaExternalLinkAlt className="text-xs" /> Live demo
              </a>
            )}
          </div>
        </div>
      </motion.article>

      {rest.length > 0 && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 nf-badge">{project.cat}</span>
                <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-sm">
                  0{index + 2}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl leading-tight text-white md:text-3xl">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <Link
                    href={`/projects/${slugify(project.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--accent)]"
                  >
                    See more <FaArrowRight className="text-[10px]" />
                  </Link>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-white/20 hover:text-white"
                        aria-label={`${project.title} GitHub`}
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-white/20 hover:text-white"
                        aria-label={`${project.title} live demo`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProjects;
