import { motion } from 'motion/react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, Users, Trophy, BookOpen, Shield, AlertTriangle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 text-blue-200 opacity-30"
          animate={{
            x: [0, 100, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Shield className="h-8 w-8" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-20 text-red-200 opacity-30"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <AlertTriangle className="h-10 w-10" />
        </motion.div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge variant="outline" className="w-fit border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100">
                  🏫 For Schools & Colleges
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Be Prepared, Stay
                <motion.span 
                  className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent ml-2"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >Surakshit</motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-[500px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Interactive disaster management training that gamifies emergency preparedness 
                for students with real-world scenarios, quizzes, and mock drills.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">10,000+ Students Trained</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">500+ Schools Enrolled</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BookOpen className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">25+ Learning Modules</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => onNavigate('learning')}
                >
                  Start Learning
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689307181986-8b2c2afb58c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBkaXNhc3RlciUyMHByZXBhcmVkbmVzcyUyMHNjaG9vbHxlbnwxfHx8fDE3NTc4NzUyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students practicing emergency preparedness"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay Badge */}
              <motion.div 
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-green-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-green-700">Live Mock Drill in Progress</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, rotate: 0, scale: 0 }}
              animate={{ opacity: 1, rotate: 12, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 20 }}
            >
              🏆 Level 5 Achieved!
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, rotate: 0, scale: 0 }}
              animate={{ opacity: 1, rotate: -12, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: -20 }}
            >
              📚 25 Modules Complete
            </motion.div>
            
            {/* Additional floating animation elements */}
            <motion.div
              className="absolute top-1/4 -left-8 w-4 h-4 bg-blue-400 rounded-full opacity-60"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute bottom-1/4 -right-8 w-3 h-3 bg-red-400 rounded-full opacity-60"
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}