import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const featuredProjects = projects.slice(0, 3);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 my-24 pt-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Featured Projects
          </h2>
          <p className="text-white mb-4 md:mb-6 text-center text-xs md:text-lg">
            A showcase of my best work and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300
                        [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`/${project.image}`}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.github && project.github !== '' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-blue-500/30 hover:border-blue-500/50"
                      >
                        <FaGithub className="text-blue-400 text-xl" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-blue-500/30 hover:border-blue-500/50"
                      >
                        <FaExternalLinkAlt className="text-blue-400 text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between min-h-[20rem] md:min-h-[24rem] p-6">
                <div className="">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-[10px] md:text-[12px] font-medium rounded-full mb-3">
                    {project.cat}
                  </span>
                  <h3 className="text-md md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 md:text-sm line-clamp-4 text-xs">{project.description}</p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-gray-300 rounded-full text-[10px] md:text-sm
                                [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                            hover:from-blue-500 hover:to-purple-700 transition-all duration-300 text-[12px] md:text-sm
                            [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                            hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
                  >
                    See More
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                     hover:from-blue-500 hover:to-purple-700 transition-all duration-300
                     [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                     hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 