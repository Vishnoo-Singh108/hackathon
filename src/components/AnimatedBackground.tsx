import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-10"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full opacity-10"
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 0.8, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full opacity-10"
        style={{
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />
    </div>
  );
}