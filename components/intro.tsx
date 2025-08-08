"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare, FaCode, FaServer, FaMobile, FaDatabase, FaRobot, FaCloud } from "react-icons/fa";
import { SiOpenai, SiAzuredevops } from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const controls = useAnimation();
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Calculate years of experience (from 2024 to current year)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
  const startYear = 2020;
  const startMonth = 1; // January
  
  let yearsExperience = currentYear - startYear;
  // If we haven't reached the anniversary month yet in the current year, subtract 1
  if (currentMonth < startMonth) {
    yearsExperience -= 3;
  }
  
  // For display purposes - show "X+ years" or "X+ months" based on actual experience
  const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  const yearsofExperience = Math.floor(totalMonths / 12);
  
  const experienceText = yearsExperience >= 1
    ? `${yearsofExperience}+ years`
    : `${totalMonths}+ months`;
  

  // Rotating skills showcase - updated with expanded expertise
  const skills = [
    { text: "React + NextJs Development", icon: <FaCode className="text-blue-500" /> },
    { text: "Backend Development", icon: <FaServer className="text-green-500" /> },
    { text: " Cloud Dev", icon: <FaCloud className="text-orange-500" /> },
    { text: "LLM Integration", icon: <SiOpenai className="text-purple-500" /> },
    { text: "AI Solutions", icon: <FaRobot className="text-red-500" /> },
    { text: "Full Stack Development", icon: <FaDatabase className="text-indigo-500" /> }
  ];

  // Rotate through skills every 3 seconds
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isHovering, skills.length]);

  // Animate on page load
  useEffect(() => {
    controls.start({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    });
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[80vh] flex flex-col items-center justify-center max-w-6xl mx-auto text-center px-4 sm:px-6 mb-16 sm:mb-0 scroll-mt-[100rem]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-pink-100 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Profile image with animated container */}
        <motion.div 
          className="relative mb-8"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            >
              <div className="p-2 rounded-full bg-white dark:bg-gray-900">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <video>
                    <source src="/images/profile.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-white dark:border-gray-700"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 0.5,
                duration: 0.7 
              }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  duration: 1,
                }}
              >
                👋
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Name and headline */}
        <motion.div 
          className="max-w-3xl"
          variants={itemVariants}
        >
          <motion.h1
            className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I'm{" "}
            <span className="inline-block relative">
              <span className="relative z-10">Zain Rafique</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 dark:bg-blue-800/50 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              ></motion.span>
            </span>
          </motion.h1>
          
          <motion.div
            className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>A results-driven  specialist with</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {experienceText} of experience
              </span>
            </div>
            
            {/* Animated skills showcase */}
            <div 
              className="h-12 mt-3 flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="mr-2">Demonstrated expertise in</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkillIndex}
                  className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mr-2">{skills[currentSkillIndex].icon}</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {skills[currentSkillIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonHoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="#contact"
              className="group relative overflow-hidden px-8 py-4 flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Contact me
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <BsArrowRight />
                </motion.span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={buttonHoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <a
              className="group relative overflow-hidden px-8 py-4 flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
              href="/#"
              download
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Download CV
                <motion.span
                  className="inline-block ml-2"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <HiDownload />
                </motion.span>
              </span>
            </a>
          </motion.div>

          {/* Social links */}
          <div className="flex gap-3 mt-2 sm:mt-0">
            <motion.div
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <a
                className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full shadow-md border border-blue-200 dark:border-blue-800"
                href="https://www.linkedin.com/in/zayn-rconnect/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <BsLinkedin className="text-xl" />
              </a>
            </motion.div>

            <motion.div
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <a
                className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full shadow-md border border-gray-200 dark:border-gray-700"
                href="https://github.com/ZainRafiqueDev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <FaGithubSquare className="text-xl" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2"
              animate={{ 
                y: [0, 14, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
