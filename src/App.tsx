import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { AuthModal } from "./components/AuthModal";
import { Router, PageType } from "./components/Router";
import { db } from "./utils/database";
import { themeManager } from "./utils/theme";

// Animation variants for scroll-triggered animations
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Check for existing authentication on app load
  useEffect(() => {
    // Initialize theme
    themeManager.setTheme(themeManager.getTheme());
    
    const user = db.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUserData(user);
    }
  }, []);

  const handleAuthSuccess = (authData: any) => {
    // Check if user exists or create new user
    let user = db.getUserByEmail(authData.email);
    if (!user) {
      user = db.createUser(authData);
    } else {
      // User exists, log them in
      user = db.loginUser(authData.email);
    }
    
    setIsAuthenticated(true);
    setUserData(user);
  };

  const handleUserUpdate = (updatedUserData: any) => {
    setUserData(updatedUserData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    db.logout();
    setCurrentPage('home');
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmergency = () => {
    setCurrentPage('emergency');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header 
          isAuthenticated={isAuthenticated}
          userData={userData}
          onLoginClick={handleLoginClick}
          onLogout={handleLogout}
          onEmergency={handleEmergency}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        <Router 
          currentPage={currentPage}
          userData={userData}
          isAuthenticated={isAuthenticated}
          onNavigate={handleNavigate}
          onUserUpdate={handleUserUpdate}
        />

        {currentPage === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Footer />
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onEmergency={handleEmergency} />

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}