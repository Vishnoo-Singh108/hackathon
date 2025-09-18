import React from 'react';

export type PageType = 
  | 'home' 
  | 'quizzes' 
  | 'drills' 
  | 'learning' 
  | 'progress' 
  | 'emergency';

export interface NavigationContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  userData: any;
  isAuthenticated: boolean;
}

export const NavigationContext = React.createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};