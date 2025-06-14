import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    if (path === '/404' && !path.endsWith('=404notfound')) {
      router.replace(`${path}=404notfound`);
    }
  }, [path, router]);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Head>

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
              Oops! Page not found
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base text-gray-500 max-w-md mx-auto mb-8"
            >
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                       hover:from-blue-500 hover:to-purple-700 transition-all duration-300
                       [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                       hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
            >
              <FaHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Back to Home
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
    </>
  );
};

export default NotFound; 