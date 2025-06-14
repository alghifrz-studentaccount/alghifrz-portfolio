import React, { useState } from 'react';
import techStack from '@/data/content.json';
import { BsGrid, BsListUl } from 'react-icons/bs';
import Image from 'next/image';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma, FaJava, FaPhp, FaGithub } from 'react-icons/fa';
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiDart,
  SiNextdotjs,
  SiLaravel,
  SiFlutter,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiFirebase,
  SiPostman,
  SiTableau,
  SiAdobephotoshop,
  SiAdobepremierepro
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export default function Activities() {
  const [isGridView, setIsGridView] = useState(true);
  
  const iconComponents: Record<string, IconType> = {
    FaPython,
    FaJava,
    FaPhp,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaFigma,
    FaGithub,
    SiJavascript,
    SiTypescript,
    SiTailwindcss,
    SiDart,
    SiNextdotjs,
    SiLaravel,
    SiFlutter,
    SiMysql,
    SiSqlite,
    SiMongodb,
    SiFirebase,
    SiPostman,
    SiTableau,
    SiAdobephotoshop,
    SiAdobepremierepro,
    SiCplusplus
  };

  const technicalSkills: Skill[] = techStack.skills.detail
    .map(skill => {
      const Icon = iconComponents[skill.logo as keyof typeof iconComponents];
      if (!Icon) {
        console.warn(`Icon not found for ${skill.logo}`);
        return null;
      }
      return {
        name: skill.name,
        icon: Icon,
        color: skill.color
      };
    })
    .filter((skill): skill is Skill => skill !== null);

  return (
    <section id="activities" className="px-4 md:px-8 mt-24 pt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8 md:mb-12"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          {techStack.activitiessession.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white mb-4 md:mb-6 text-center text-xs md:text-lg"
        >
          {techStack.activitiessession.subtitle}
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row gap-4 h-full md:max-w-[1217px] mx-auto px-2 md:px-6"
      >
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 h-full md:w-1/2 h-full space-y-4 md:space-y-4"
        >
          {/* Activities & Organizations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-6
                      [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                      transition-all duration-300"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-md md:text-2xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              {techStack.activities.title}
            </motion.h2>
            <div className="space-y-6 md:space-y-8">
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {techStack.activities.detail.map((exp, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="border-l-2 border-blue-500 pl-4 my-[32px]">
                      <h3 className="font-semibold text-[9px] md:text-base">{exp.name}</h3>
                      <p className="text-[8px] md:text-sm text-gray-400 mb-1">{exp.role}</p>
                      <p className="text-[8px] md:text-sm text-white">{exp.date}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-6
                      [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                      transition-all duration-300"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-md md:text-2xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              {techStack.education.title}
            </motion.h2>
            <div className="space-y-6 md:space-y-8">
              {techStack.education.detail.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-l-2 border-blue-500 pl-4 my-7 relative"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                    >
                      <Image
                        src={edu.logo}
                        alt={edu.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain group-hover:opacity-100 transition-all duration-300"
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-[9px] md:text-base">{edu.name}</h3>
                      <p className="text-[8px] md:text-sm text-gray-400">{edu.degree}</p>
                      <p className="text-[8px] md:text-sm mt-1">{edu.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Skills */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 h-full space-y-4 md:space-y-4"
        >
          {/* Technical Skills Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-6
                      [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                      transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-md md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              >
                {techStack.skills.title}
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsGridView(!isGridView)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-100
                         border border-blue-500/30 hover:border-blue-500/50"
                title={isGridView ? "Switch to List View" : "Switch to Grid View"}
              >
                {isGridView ? 
                  <BsListUl className="w-4 h-4 text-blue-400" /> : 
                  <BsGrid className="w-4 h-4 text-blue-400" />
                }
              </motion.button>
            </div>
            <div className='py-2 pt-0'>
              <div className={`grid md:h-[210px] h-[364px] transition-all duration-300 ${
                isGridView 
                ? "grid-cols-4 md:grid-cols-8 gap-1 md:gap-1 place-items-center content-center" 
                : "grid-cols-1 gap-0 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gradient-to-r [&::-webkit-scrollbar-thumb]:from-blue-400 [&::-webkit-scrollbar-thumb]:to-purple-600 [&::-webkit-scrollbar-thumb]:rounded-full"
              }`}>
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1 }}
                    className={`group flex transition-all duration-300
                              items-center bg-gradient-to-br from-gray-800/50 to-gray-900/50
                              rounded-lg ${
                                isGridView 
                                ? 'flex-col justify-center p-1 md:w-[62px] md:h-[70px] w-[55px] h-[60px] hover:scale-105 hover:translate-y-[-5px]' 
                                : 'flex-row p-2 h-[35px] hover:translate-x-2'
                              }`}
                    style={{
                      boxShadow: `0 0 0 1px ${skill.color}40 inset, 0 0 20px 1px ${skill.color}20`
                    }}
                  >
                    <skill.icon 
                      className={`transition-all duration-300 group-hover:scale-110 ${
                        isGridView ? 'text-lg mb-1' : 'text-lg mr-2'
                      }`}
                      style={{ color: skill.color }}
                    />
                    <span className={`font-medium text-gray-300 group-hover:text-white transition-colors duration-300 ${
                      isGridView ? 'text-[8px] text-center w-full' : 'text-[9px] md:text-sm'
                    }`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1 }}
            className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 md:p-6
                      [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                      transition-all duration-300"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-md md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              {techStack.certifications.title}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {techStack.certifications.detail.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group flex flex-col items-center p-3 
                            bg-gradient-to-br from-gray-800/50 to-gray-900/50
                            rounded-lg transition-all duration-300
                            [box-shadow:0_0_0_1px_#60a5fa40_inset]
                            hover:[box-shadow:0_0_0_1px_#60a5fa_inset]
                            cursor-pointer h-[125px] md:h-[160px] w-full"
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 md:w-10 md:h-10 mb-1 flex items-center justify-center"
                  >
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain transition-all duration-300"
                    />
                  </motion.div>
                  <div className="text-center w-full">
                    <h3 className="text-[9px] md:text-[10px] font-medium text-gray-300 group-hover:text-white mb-0.5 px-1">
                      {cert.name}
                    </h3>
                    <p className="text-[8px] md:text-[9px] text-gray-400 px-1">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}