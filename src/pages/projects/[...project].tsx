import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import Link from "next/link";
import content from "@/data/content.json";
import { useState, useEffect } from "react";
import Image from "next/image";

const ProjectDetail = () => {
  const router = useRouter();
  const { project } = router.query;
  const { meta, projects } = content;
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectSlug = Array.isArray(project) ? project.join("/") : project;
  const currentProject = projects.featured.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === projectSlug
  );

  const projectIndex = currentProject
    ? projects.featured.findIndex((p) => p.title === currentProject.title)
    : -1;
  const prevProject =
    projectIndex > 0 ? projects.featured[projectIndex - 1] : projects.featured[projects.featured.length - 1];
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.featured.length - 1
      ? projects.featured[projectIndex + 1]
      : projects.featured[0];

  useEffect(() => {
    const fetchPreviewFiles = async () => {
      if (!currentProject?.preview) {
        setPreviewFiles([]);
        return;
      }
      try {
        const response = await fetch(`/api/preview-images?project=${currentProject.preview}`);
        if (response.ok) {
          const data = await response.json();
          setPreviewFiles(data.files ?? []);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching preview files:", error);
      }
    };

    fetchPreviewFiles();
  }, [currentProject]);

  const nextSlide = () => {
    if (!previewFiles.length) return;
    setCurrentIndex((prev) => (prev + 1) % previewFiles.length);
  };

  const prevSlide = () => {
    if (!previewFiles.length) return;
    setCurrentIndex((prev) => (prev - 1 + previewFiles.length) % previewFiles.length);
  };

  const slugify = (title: string) => encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));

  if (!currentProject) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="max-w-lg text-center">
          <p className="nf-eyebrow mb-4">Error</p>
          <h1 className="mb-4 font-display text-7xl md:text-9xl">404</h1>
          <p className="mb-3 text-xl text-zinc-400">Project not found</p>
          <p className="mb-8 text-sm text-[var(--muted)]">
            The project you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <Link href="/projects" className="nf-btn-primary">
              <FaHome /> Back to Projects
            </Link>
            <button onClick={() => window.history.back()} className="nf-btn-secondary">
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {currentProject.title} | {meta.title}
        </title>
        <meta name="description" content={currentProject.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative px-4 pb-24 pt-28 text-white md:px-6 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
            >
              <FaArrowLeft className="text-xs" />
              Back to Projects
            </Link>

            <div className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111]">
              <div className="relative aspect-[16/11] md:aspect-[21/9]">
                <Image
                  src={`/${currentProject.image}`}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(0,85,212,0.25),transparent_42%)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="nf-badge">{currentProject.cat}</span>
                  {projectIndex >= 0 && (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      Project {String(projectIndex + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 max-w-4xl font-display text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
                  {currentProject.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
                  {currentProject.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nf-btn-primary"
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live demo
                    </a>
                  )}
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nf-btn-secondary"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#111] p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Stack</p>
                <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">Technology used</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-[#111] p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Overview</p>
                <h2 className="mt-2 font-display text-2xl text-white md:text-3xl">Quick facts</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-3">
                    <dt className="text-zinc-500">Category</dt>
                    <dd className="text-white">{currentProject.cat}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-3">
                    <dt className="text-zinc-500">Live</dt>
                    <dd className="text-white">{currentProject.demo ? "Available" : "Private"}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-zinc-500">Source</dt>
                    <dd className="text-white">{currentProject.github ? "Public" : "Closed"}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {previewFiles.length > 0 && (
              <div className="mb-10 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#111] p-5 md:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">Gallery</p>
                    <h2 className="mt-1 font-display text-2xl text-white md:text-3xl">Project preview</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">
                      {currentIndex + 1} / {previewFiles.length}
                    </span>
                    <button
                      onClick={prevSlide}
                      className="rounded-full border border-white/10 p-2.5 text-white transition hover:bg-white/5"
                      aria-label="Previous preview"
                    >
                      <FaArrowLeft className="text-xs" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="rounded-full border border-white/10 p-2.5 text-white transition hover:bg-white/5"
                      aria-label="Next preview"
                    >
                      <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`/previews/${currentProject.preview}/${encodeURIComponent(previewFiles[currentIndex])}`}
                        alt={`Preview ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {previewFiles.map((file, index) => (
                    <button
                      key={file}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition md:h-20 md:w-32 ${
                        index === currentIndex
                          ? "border-white/60"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Preview ${index + 1}`}
                    >
                      <Image
                        src={`/previews/${currentProject.preview}/${encodeURIComponent(file)}`}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href={`/projects/${slugify(prevProject.title)}`}
                className="group rounded-[1.4rem] border border-white/10 bg-[#111] p-5 transition hover:border-white/20"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Previous</p>
                <p className="mt-2 font-display text-xl text-white transition group-hover:text-[var(--accent)] md:text-2xl">
                  {prevProject.title}
                </p>
              </Link>
              <Link
                href={`/projects/${slugify(nextProject.title)}`}
                className="group rounded-[1.4rem] border border-white/10 bg-[#111] p-5 text-right transition hover:border-white/20"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Next</p>
                <p className="mt-2 font-display text-xl text-white transition group-hover:text-[var(--accent)] md:text-2xl">
                  {nextProject.title}
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
