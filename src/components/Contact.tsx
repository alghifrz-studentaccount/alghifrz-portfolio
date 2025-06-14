import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import content from '@/data/content.json';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

export default function Contact() {
  const { hero } = content;
  const { email, socialMedia, whatsapp } = hero;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Sending email with data:', {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Alghif',
      to_email: email.address,
    });

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Alghif',
          to_email: email.address,
          reply_to: formData.email,
        }
      );

      console.log('Email sent successfully:', result);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="px-2 md:px-8 my-24 md:my-48 min-h-screen flex items-center relative overflow-hidden bg-transparant">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Let&rsquo;s Connect
          </h2>
          <p className="text-gray-700 text-xs md:text-sm max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I&rsquo;d love to hear from you!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
          {/* Email Card */}
          <motion.a
            href={`mailto:${email.address}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-1/3 group bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="text-sm md:text-2xl text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                  Email
                </h3>
                <p className="text-gray-700 text-[10px] md:text-sm leading-tight">
                  {email.address}
                </p>
              </div>
            </div>
          </motion.a>

          {/* Bottom Row for Mobile */}
          <div className="flex flex-row gap-4 md:hidden">
            {/* WhatsApp Card */}
            <motion.a
              href={`https://wa.me/${whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="w-1/2 group bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-blue-200/20
                        [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                        hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center
                              group-hover:scale-110 transition-transform duration-300">
                  <FaWhatsapp className="text-sm md:text-lg text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                    WhatsApp
                  </h3>
                  <p className="text-gray-700 text-[10px] leading-tight">
                    +{whatsapp.number}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-1/2 group bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-blue-200/20
                        [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                        hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center
                              group-hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="text-sm md:text-lg text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                    Social Media
                  </h3>
                  <div className="flex gap-2 justify-center">
                    {socialMedia.map((social) => (
                      <a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-blue-200/20"
                      >
                        {social.platform === 'Github' && <FaGithub className="text-sm text-blue-400" />}
                        {social.platform === 'LinkedIn' && <FaLinkedin className="text-sm text-blue-400" />}
                        {social.platform === 'Instagram' && <FaInstagram className="text-sm text-blue-400" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop WhatsApp Card */}
          <motion.a
            href={`https://wa.me/${whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="hidden md:block w-1/3 group bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300">
                <FaWhatsapp className="text-2xl text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                  WhatsApp
                </h3>
                <p className="text-gray-700 text-sm leading-tight">
                  +{whatsapp.number}
                </p>
              </div>
            </div>
          </motion.a>

          {/* Desktop Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden md:block w-1/3 group bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300">
                <FaLinkedin className="text-2xl text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                  Social Media
                </h3>
                <div className="flex gap-3 justify-center">
                  {socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-blue-200/20"
                    >
                      {social.platform === 'Github' && <FaGithub className="text-lg text-blue-400" />}
                      {social.platform === 'LinkedIn' && <FaLinkedin className="text-lg text-blue-400" />}
                      {social.platform === 'Instagram' && <FaInstagram className="text-lg text-blue-400" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="text-sm md:text-base w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                            [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                            focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                            text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="text-sm md:text-base w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                            [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                            focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                            text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="text-sm md:text-base w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                          [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                          focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                          text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`text-sm md:text-base px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                        hover:from-blue-500 hover:to-purple-700 transition-all duration-300 text-lg font-medium
                        [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]
                        disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 