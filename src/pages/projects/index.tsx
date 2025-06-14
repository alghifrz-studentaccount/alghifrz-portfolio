import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import content from '@/data/content.json';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { 
  FaCode, 
  FaDatabase, 
  FaRobot, 
  FaMobile, 
  FaGamepad, 
  FaTools,
  FaLayerGroup,
  FaAllergies
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useEffect, useState, useMemo } from 'react';

const Projects = () => {
  const { meta, projects } = content;
  const allProjects = projects.featured;
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { category } = router.query;
  
  // Get unique categories with useMemo
  const categories = useMemo(() => {
    return ['All', ...new Set(allProjects.map(project => project.cat))];
  }, [allProjects]);

  // Initialize selectedCategory from URL query parameter or default to 'All'
  const [selectedCategory, setSelectedCategory] = useState(
    typeof category === 'string' ? category : 'All'
  );

  // Check if category exists and redirect to 404 if not
  useEffect(() => {
    if (typeof category === 'string' && category !== 'All' && !categories.includes(category)) {
      router.push('/404');
    }
  }, [category, categories, router]);

  // Update URL when category changes
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: newCategory }
    }, undefined, { shallow: true });
  };
  
  // Category icons mapping with type safety
  const categoryIcons: Record<string, IconType> = {
    'All': FaAllergies,
    'Web Development': FaCode,
    'Data Science': FaDatabase,
    'Machine Learning': FaRobot,
    'Mobile Development': FaMobile,
    'Game Development': FaGamepad,
    'DevOps': FaTools,
    'UI/UX Design': FaLayerGroup,
  };

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.cat === selectedCategory);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update selectedCategory when URL query changes
  useEffect(() => {
    if (typeof category === 'string' && category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [category, selectedCategory]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Projects | {meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="relative md:py-20 py-2 px-4 md:px-8 bg-black backdrop-blur-3xl text-white overflow-hidden">
        <div className="z-0 absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild"></div>
        <div className="z-0 absolute bottom-12 right-24 w-72 h-72 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute top-20 left-32 w-52 h-52 bg-blue-300 opacity-35 rounded-full blur-3xl animate-float-wild3"></div>
        <div className="z-0 absolute bottom-20 right-10 w-64 h-64 bg-blue-500 opacity-40 rounded-full blur-3xl animate-float-wild4"></div>
        <div className="z-0 absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute bottom-1/4 left-1/5 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-wild6"></div>
        <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
        <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>
        <div className="z-0 absolute bottom-[40%] right-[40%] w-44 h-44 bg-rose-400 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="container mx-auto px-8 md:px-20 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1217px] mx-auto text-center mb-8 md:mb-12"
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              All Projects
            </h1>
            <p className="text-white mb-4 md:mb-6 text-center text-xs md:text-lg">
              A comprehensive showcase of my work and technical expertise
            </p>

            {/* Enhanced 3D Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 md:mt-12 perspective-1000">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || FaAllergies;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 10,
                      rotateY: 10,
                      transition: { duration: 0.1 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotateX: 0,
                      rotateY: 0,
                      transition: { duration: 0.1 }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center -50px"
                    }}
                    className={`cursor-pointer group relative px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
                      ${selectedCategory === category 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }
                      [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]`}
                  >
                    <div className="flex items-center gap-2 md:gap-3 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`text-lg md:text-xl transition-transform duration-300
                          ${selectedCategory === category ? 'text-white' : 'text-blue-400'}`} 
                        />
                      </motion.div>
                      <span className="relative z-10">{category}</span>
                    </div>
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-600/20 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-600/10 
                      blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    className="object-cover"
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        </div>
      </section>
    </>
  );
};

export default Projects; 