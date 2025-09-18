import React from 'react';
import { motion } from 'motion/react';

// Page components
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { DisasterCategories } from './DisasterCategories';
import { EmergencyQuickActions } from './EmergencyQuickActions';
import { StatsSection } from './StatsSection';
import { FeedbackDemo } from './FeedbackDemo';
import { QuizHub } from './QuizHub';
import { DrillHub } from './DrillHub';
import { LearningModules } from './LearningModules';
import { ProgressTracking } from './ProgressTracking';
import { EmergencyResponse } from './EmergencyResponse';
import { CertificatesPage } from './CertificatesPage';
import { Leaderboard } from './Leaderboard';
import { ProfilePage } from './ProfilePage';

export type PageType = 'home' | 'quizzes' | 'drills' | 'learning' | 'progress' | 'emergency' | 'certificates' | 'leaderboard' | 'profile';

interface RouterProps {
  currentPage: PageType;
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: PageType) => void;
  onUserUpdate?: (userData: any) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

export function Router({ currentPage, userData, isAuthenticated, onNavigate, onUserUpdate }: RouterProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.main
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} id="home">
              <HeroSection onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              id="learn"
            >
              <FeaturesSection onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              id="practice"
            >
              <DisasterCategories onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              id="drills"
            >
              <EmergencyQuickActions onNavigate={onNavigate} />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              id="resources"
            >
              <StatsSection />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              id="feedback"
            >
              <FeedbackDemo />
            </motion.div>
          </motion.main>
        );

      case 'quizzes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <QuizHub 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'drills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DrillHub 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'learning':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LearningModules 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'progress':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProgressTracking 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'emergency':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <EmergencyResponse onNavigate={onNavigate} />
          </motion.div>
        );

      case 'certificates':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CertificatesPage 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'leaderboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaderboard 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
            />
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProfilePage 
              userData={userData} 
              isAuthenticated={isAuthenticated}
              onNavigate={onNavigate}
              onUserUpdate={onUserUpdate || (() => {})}
            />
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}