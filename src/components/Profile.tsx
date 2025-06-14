import content from '@/data/content.json';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const photos = Array.from({ length: 11 }, (_, i) => `/me${i + 1}.jpg`);
  const [current, setCurrent] = useState(0);

  const nextPhoto = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Auto scroll setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextPhoto]);

  return (
    <section id="profile" className="relative py-4 md:py-24 z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start items-center gap-0 md:gap-16 md:py-28">
      {/* Decorative blurred circles */}
      <div className="relative py-4 z-10 max-w-7xl md:mx-auto flex flex-col md:flex-row md:items-start items-center gap-0 md:gap-16">
        {/* Foto Slider */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1 w-full md:w-1/2 flex flex-col items-center"
        >
          <div className="flex gap-2 md:gap-4 items-center justify-center w-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPhoto}
              className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-lg md:text-xl rounded-full p-1 md:p-1.5 transition-all"
            >
              &lt;
            </motion.button>

            <div className="relative w-[300px] h-[190px] md:w-[500px] md:h-[350px] flex flex-col items-center justify-center mt-8 md:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={photos[current]}
                    alt={`Photo ${current + 1}`}
                    fill
                    className="shadow-xl object-cover rounded-lg md:rounded-xl transition-all duration-300"
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 500px, 33vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPhoto}
              className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-lg md:text-xl rounded-full p-1 md:p-1.5 transition-all"
            >
              &gt;
            </motion.button>
          </div>
        </motion.div>
        {/* Teks */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2 w-full md:w-1/2 text-center md:text-left md:items-start mt-3 md:mt-0 px-3 md:px-0"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold mb-2 md:mb-3 pb-2 md:pb-4 border-b border-white"
          >
            {content.about.about}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs md:text-base leading-relaxed"
          >
            {content.about.detail}
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative wave transition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
      >
        <svg
          className="relative block w-full h-[40px] md:h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-black"
          ></path>
        </svg>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute bottom-0 left-0 w-full h-[40px] md:h-[80px] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile; 