import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { themeManager, Theme } from '../utils/theme';

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themeManager.getTheme());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setCurrentTheme(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  const themes = [
    { value: 'light' as Theme, label: 'Light', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon },
    { value: 'system' as Theme, label: 'System', icon: Monitor }
  ];

  const getCurrentIcon = () => {
    const theme = themes.find(t => t.value === currentTheme);
    return theme?.icon || Monitor;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 p-0 border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200"
        >
          <motion.div
            key={currentTheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon className="h-4 w-4" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <AnimatePresence mode="wait">
        {isOpen && (
          <DropdownMenuContent 
            align="end" 
            className="w-48"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div className="space-y-1 p-1">
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  const isSelected = currentTheme === theme.value;
                  
                  return (
                    <DropdownMenuItem
                      key={theme.value}
                      onClick={() => themeManager.setTheme(theme.value)}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <motion.div
                        className="flex items-center gap-3 w-full"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.1 }}
                      >
                        <motion.div
                          animate={isSelected ? { 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0]
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className={`h-4 w-4 ${
                            isSelected ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </motion.div>
                        <span className="flex-1">{theme.label}</span>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="w-2 h-2 bg-primary rounded-full"
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              
              <div className="border-t border-border/50 mt-1 pt-1 p-1">
                <div className="px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
                  <Palette className="h-3 w-3" />
                  Appearance Settings
                </div>
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}