import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import content from "@/data/content.json";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  FaCode,
  FaDatabase,
  FaRobot,
  FaBrain,
  FaMobile,
  FaGamepad,
  FaTools,
  FaLayerGroup,
  FaAllergies,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { useEffect, useState, useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const Projects = () => {
  const { meta, projects } = content;
  const allProjects = projects.featured;
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { category } = router.query;

  const categories = useMemo(() => {
    return ["All", ...new Set(allProjects.map((project) => project.cat))];
  }, [allProjects]);

  const [selectedCategory, setSelectedCategory] = useState(
    typeof category === "string" ? category : "All"
  );

  useEffect(() => {
    if (typeof category === "string" && category !== "All" && !categories.includes(category)) {
      router.push("/404");
    }
  }, [category, categories, router]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: newCategory },
      },
      undefined,
      { shallow: true }
    );
  };

  const categoryIcons: Record<string, IconType> = {
    All: FaAllergies,
    "Web Development": FaCode,
    "Data Science": FaDatabase,
    "Machine Learning": FaBrain,
    "Mobile Development": FaMobile,
    "Game Development": FaGamepad,
    DevOps: FaTools,
    "UI/UX Design": FaLayerGroup,
    "Artificial Intelligence": FaRobot,
  };

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.cat === selectedCategory);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof category === "string" && category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [category, selectedCategory]);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Projects | {meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="px-4 pb-24 pt-28 text-white md:px-8 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Projects"
            title="A comprehensive showcase of systems I’ve shipped"
            description="Filter by category and explore AI, web, data, and mobile work."
          />

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] || FaAllergies;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-white/20 bg-white text-black"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="text-sm" />
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="nf-card overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex min-h-[18rem] flex-col justify-between p-5">
                  <div>
                    <span className="nf-badge mb-3">{project.cat}</span>
                    <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 line-clamp-4 text-sm text-[var(--muted)]">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 p-2 text-white">
                          <FaGithub />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 p-2 text-white">
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, "-"))}`}
                      className="text-sm font-medium text-white hover:text-[var(--accent)]"
                    >
                      See more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
