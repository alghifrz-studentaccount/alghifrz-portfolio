import Image from 'next/image'
import content from '@/data/content.json'
import { motion } from 'framer-motion'

const Hero = () => {
    const { hero } = content;
    
    return (
        <>
            {/* <section className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white min-h-screen flex items-center"> */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-transparant">
                <div className="max-w-[1217px] mx-auto px-4 md:px-8 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
                    
                    {/* Text Content */}
                    <motion.div 
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1 
                            className="text-xl md:text-2xl font-medium text-black"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {hero.title.welcome}
                            <motion.p 
                                className="text-3xl md:text-4xl font-bold text-blue-400 mb-1 md:mb-2 mt-1 md:mt-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {hero.title.name}
                            </motion.p>
                            <motion.p 
                                className="text-2xl md:text-3xl text-black font-bold mt-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                {hero.title.highlight}
                            </motion.p>
                        </motion.h1>
                                                
                        {/* Email */}
                        <motion.div 
                            className="mt-6 flex items-center gap-2 text-black"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <i className={`${hero.email.icon} text-lg`}></i>
                            <a 
                                href={`mailto:${hero.email.address}`}
                                className="hover:text-blue-400 transition text-xs md:text-sm"
                            >
                                {hero.email.address}
                            </a>
                        </motion.div>

                        <motion.p 
                            className="mt-4 text-sm md:text-base text-black"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            {hero.description}
                        </motion.p>

                        <motion.div 
                            className="mt-6 flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <a href={hero.buttons.cv.link} target='_blank' rel="noopener noreferrer">
                                <motion.button 
                                    className="cursor-pointer px-5 py-2.5 border-2 font-semibold border-blue-400 bg-blue-400 rounded-full text-white hover:bg-blue-500 transition shadow-lg hover:shadow-xl text-xs md:text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {hero.buttons.cv.text}
                                </motion.button>
                            </a>
                            <a href={hero.buttons.portfolio.link} target='_blank' rel="noopener noreferrer">
                                <motion.button 
                                    className="cursor-pointer px-5 py-2.5 bg-transparant border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl text-xs md:text-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {hero.buttons.portfolio.text}
                                </motion.button>
                            </a>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div 
                            className="mt-8 flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            {hero.socialMedia.map((social, index) => (
                                <motion.a 
                                    key={social.platform}
                                    href={social.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="cursort-pointer w-8 h-8 flex items-center justify-center text-black text-lg hover:text-blue-400 transition rounded-full border border-black hover:border-blue-400 shadow-md hover:shadow-lg bg-tranparant"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    custom={index}
                                >
                                    <i className={social.icon}></i>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div 
                        className="md:w-1/2 relative flex justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Image
                                src="/foto.png"
                                alt="Hero Image"
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-[150px] shadow-md md:hover:shadow-2xl transition-shadow duration-300 w-[280px] h-[350px] md:w-[400px] md:h-[500px] object-cover"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default Hero