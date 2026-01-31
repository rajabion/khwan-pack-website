import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function RibbonBackground() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Brand Colors
  const blue = '#546A91';
  const yellow = '#EBC028';
  const red = '#D63363';

  // Parallax for the bands
  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '40%']);
  const y2 = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const rotateSlower = useTransform(smoothProgress, [0, 1], [-15, -10]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {/* Band 1 - Hero/Blue */}
      <motion.div
        className="absolute top-[-20%] end-[-10%] w-[100%] h-[120%] opacity-[0.08]"
        style={{
          background: `linear-gradient(135deg, ${blue} 0%, transparent 80%)`,
          transform: 'rotate(-15deg)',
          rotate: rotateSlower,
          y: y1,
        }}
      />

      {/* Band 2 - Mid/Yellow */}
      <motion.div
        className="absolute top-[20%] start-[-30%] w-[120%] h-[150%] opacity-[0.05]"
        style={{
          background: `linear-gradient(225deg, ${yellow} 0%, transparent 70%)`,
          rotate: 35,
          y: y2,
        }}
      />

      {/* Sharp Accent Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.1]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M100,0 L0,100"
          stroke={blue}
          strokeWidth="0.05"
          style={{ pathLength: smoothProgress }}
        />
        <motion.path
          d="M0,0 L100,100"
          stroke={red}
          strokeWidth="0.03"
          style={{ pathLength: smoothProgress }}
        />
      </svg>

      {/* Texture & Vignette */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.03)]" />
    </div>
  );
}
