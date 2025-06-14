import { useRouter } from 'next/router';
import Head from "next/head";
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import content from '@/data/content.json';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const ProjectDetail = () => {
  const router = useRouter();
  const { project } = router.query;
  const { meta, projects } = content;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the project based on the slug
  const projectSlug = Array.isArray(project) ? project.join('/') : project;
  const currentProject = projects.featured.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === projectSlug
  );

  useEffect(() => {
    if (currentProject?.preview) {
      // Load all images from the preview directory
      const loadPreviewImages = async () => {
        try {
          const response = await fetch(`/api/preview-images?project=${currentProject.preview}`);
          await response.json(); // Just check if the response is valid
        } catch (error) {
          console.error('Error loading preview images:', error);
        }
      };
      loadPreviewImages();
    }
  }, [currentProject?.preview]);

  useEffect(() => {
    const fetchPreviewFiles = async () => {
      if (currentProject?.preview) {
        try {
          const response = await fetch(`/api/preview-images?project=${currentProject.preview}`);
          if (response.ok) {
            const data = await response.json();
            setPreviewFiles(data.files);
          }
        } catch (error) {
          console.error('Error fetching preview files:', error);
        }
      }
    };

    fetchPreviewFiles();
  }, [currentProject]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % previewFiles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + previewFiles.length) % previewFiles.length);
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl animate-float-wild"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-wild2"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild3"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild4"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              404
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-8"
            >
              Project Not Found
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base text-gray-500 max-w-md mx-auto mb-8"
            >
              The project you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                       hover:from-blue-500 hover:to-purple-700 transition-all duration-300
                       [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                       hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
            >
              <FaHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Back to Projects
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full 
                       hover:bg-white/20 transition-all duration-300
                       border border-blue-500/30 hover:border-blue-500/50"
            >
              <FaArrowLeft className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Go Back
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentProject.title} | {meta.title}</title>
        <meta name="description" content={currentProject.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative py-10 px-4 md:px-6 bg-black backdrop-blur-3xl text-white overflow-hidden">
        {/* Background Elements */}
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

        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
        <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>

        <div className="container mx-auto px-8 md:px-20 pb-40 py-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1217px] mx-auto"
          >
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center px-2.5 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full 
                       hover:bg-white/20 transition-all duration-300 text-[10px] md:text-sm text-gray-300
                       border border-blue-500/30 hover:border-blue-500/50 mb-4 md:mb-8"
            >
              <FaArrowLeft className="mr-1.5 md:mr-2 text-[10px] md:text-sm" />
              Back to Projects
            </Link>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden mb-4 md:mb-8
                        [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                        transition-all duration-300"
            >
              <div className="relative h-32 md:h-96 w-full">
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  src={`/${currentProject.image}`}
                  alt={currentProject.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-3 md:p-6 flex flex-col justify-between md:min-h-[180px] bg-black/60 backdrop-blur-md"
              >
                <div>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-[8px] md:text-[12px] font-medium rounded-full mb-1.5 md:mb-3"
                  >
                    {currentProject.cat}
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-sm md:text-3xl font-bold text-white mb-1 md:mb-2"
                  >
                    {currentProject.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-[10px] md:text-base text-gray-200 line-clamp-2 md:line-clamp-none"
                  >
                    {currentProject.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Project Content */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 mb-4 md:mb-8">
              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3 md:space-y-8 w-full"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-3 md:p-6 h-full
                            [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]"
                >
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-sm md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2 md:mb-4"
                  >
                    Technology Used
                  </motion.h2>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-2 py-0.5 md:px-3 md:py-1 bg-white/10 rounded-full text-[8px] md:text-sm text-gray-300
                                 border border-blue-500/30 hover:border-blue-500/50
                                 transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3 md:space-y-8 md:w-1/3 w-full"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-3 md:p-6 h-full
                            [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]"
                >
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-sm md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2 md:mb-4"
                  >
                    Links
                  </motion.h2>
                  <div className="space-y-2 md:space-y-4">
                    {currentProject.github && (
                      <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-2.5 py-1 md:px-4 md:py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors
                                 border border-blue-500/30 hover:border-blue-500/50 text-gray-300 text-[8px] md:text-sm"
                      >
                        <FaGithub className="text-blue-400 mr-1.5 md:mr-2 text-[10px] md:text-sm" />
                        View on GitHub
                      </motion.a>
                    )}
                    {currentProject.demo && (
                      <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-2.5 py-1 md:px-4 md:py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors
                                 border border-blue-500/30 hover:border-blue-500/50 text-gray-300 text-[8px] md:text-sm"
                      >
                        <FaExternalLinkAlt className="text-blue-400 mr-1.5 md:mr-2 text-[10px] md:text-sm" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Project Preview Section */}
            {previewFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-3 md:p-6
                            [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-6">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="text-sm md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                      Project Preview
                    </motion.h2>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-2 md:gap-4"
                    >
                      <span className="text-[8px] md:text-sm text-gray-400">
                        {currentIndex + 1} / {previewFiles.length}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevSlide}
                          className="p-1 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors
                                  [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                        >
                          <FaArrowLeft className="text-white text-[10px] md:text-sm" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextSlide}
                          className="p-1 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors
                                  [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                        >
                          <FaArrowRight className="text-white text-[10px] md:text-sm" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Main Preview */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative aspect-video rounded-xl overflow-hidden
                              [box-shadow:0_0_0_1px_#60a5fa40_inset] bg-white/5 backdrop-blur-sm"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Preview Info */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 p-2 md:p-6"
                    >
                      <div className="flex items-center justify-between mb-0.5 md:mb-2">
                        <span className="text-[8px] md:text-sm font-medium text-white">
                          Screenshot {currentIndex + 1}
                        </span>
                        <span className="text-[6px] md:text-xs text-gray-300">
                          {previewFiles[currentIndex].split(' ').slice(1, 3).join(' ')}
                        </span>
                      </div>
                      <p className="text-[8px] md:text-sm text-gray-300 line-clamp-2">
                        {previewFiles[currentIndex].replace(/Screenshot \d{8} \d{6}\.png$/, '')}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Thumbnail Navigation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-3 md:mt-6 flex gap-1.5 md:gap-4 overflow-x-auto pb-1.5 md:pb-4 
                              [&::-webkit-scrollbar]:h-1 md:[&::-webkit-scrollbar]:h-1.5
                              [&::-webkit-scrollbar-track]:bg-gray-800/50 
                              [&::-webkit-scrollbar-thumb]:bg-gradient-to-r 
                              [&::-webkit-scrollbar-thumb]:from-blue-400 
                              [&::-webkit-scrollbar-thumb]:to-purple-600 
                              [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    {previewFiles.map((file, index) => (
                      <motion.button
                        key={file}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-shrink-0 w-12 md:w-24 aspect-video rounded-lg overflow-hidden
                                  transition-all duration-300 ${
                                    index === currentIndex
                                      ? '[box-shadow:0_0_0_2px_#60a5fa_inset] scale-105'
                                      : '[box-shadow:0_0_0_1px_#60a5fa40_inset] hover:scale-105'
                                  }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={`/previews/${currentProject.preview}/${encodeURIComponent(file)}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          index === currentIndex ? 'bg-blue-500/20' : 'bg-black/40'
                        }`} />
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

          </motion.div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden
                            [box-shadow:0_0_0_1px_#60a5fa40_inset]">
                <Image
                  src={`/previews/${currentProject.preview}/${encodeURIComponent(selectedImage)}`}
                  alt="Selected Preview"
                  className="w-full h-auto"
                  width={1920}
                  height={1080}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Modal Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors
                             [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                    onClick={() => setSelectedImage(null)}
                  >
                    <FaArrowLeft className="text-white text-xl" />
                  </button>
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {selectedImage.replace(/Screenshot \d{8} \d{6}\.png$/, '')}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {selectedImage.split(' ').slice(1, 3).join(' ')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ProjectDetail; 