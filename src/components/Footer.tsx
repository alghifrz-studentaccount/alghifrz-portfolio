import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import content from '@/data/content.json';

export default function Footer() {
  const { hero } = content;
  const { socialMedia, email, whatsapp } = hero;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-xl text-white pt-24 pb-16 border-t-[1px] border-white/10 overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="mb-6">
              {/* Text Layer */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                  {hero.title.name}
                </h3>
                <p className="text-xl md:text-2xl font-medium text-blue-400 tracking-wide">
                  {hero.title.highlight}
                </p>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col items-center md:items-start space-y-4 mt-8">
              <motion.a
                href={`mailto:${email.address}`}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm tracking-wide"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="mr-3 text-blue-400/80" />
                {email.address}
              </motion.a>
              <motion.a
                href={`https://wa.me/${whatsapp.number}`}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm tracking-wide"
                whileHover={{ x: 5 }}
              >
                <FaWhatsapp className="mr-3 text-blue-400/80" />
                {whatsapp.number}
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-xl font-semibold mb-8 tracking-wide bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {['Home', 'Profile', 'Experience', 'Activities', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={`/#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors inline-block text-sm tracking-wide uppercase"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-xl font-semibold mb-8 tracking-wide bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Connect With Me
            </h4>
            <div className="flex justify-center gap-5">
              {socialMedia.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 border border-blue-200/10
                            hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:scale-110"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.platform === 'Github' && <FaGithub className="text-xl text-blue-400/90" />}
                  {social.platform === 'LinkedIn' && <FaLinkedin className="text-xl text-blue-400/90" />}
                  {social.platform === 'Instagram' && <FaInstagram className="text-xl text-blue-400/90" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400 text-sm tracking-wide">
            © {currentYear} {hero.title.name}. All rights reserved.
          </p>
          <p className="mt-3 italic text-gray-500 text-sm tracking-wide">
          &quot;Just start, you&rsquo;ll get used to it.&quot;
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 