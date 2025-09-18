import { motion } from 'motion/react';
import { Button } from "./ui/button";
import { Shield, Menu, User, AlertTriangle, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  isAuthenticated: boolean;
  userData?: any;
  onLoginClick: () => void;
  onLogout: () => void;
  onEmergency: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ isAuthenticated, userData, onLoginClick, onLogout, onEmergency, currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { name: "Home", page: "home" },
    { name: "Learning", page: "learning" },
    { name: "Quizzes", page: "quizzes" },
    { name: "Drills", page: "drills" },
    { name: "Progress", page: "progress" },
    { name: "Certificates", page: "certificates" },
    { name: "Leaderboard", page: "leaderboard" }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Suraksha
            </motion.h1>
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Disaster Preparedness
            </motion.p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              className={`text-sm font-medium transition-colors hover:text-primary relative group text-foreground ${
                currentPage === item.page ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
              whileHover={{ y: -2 }}
              onClick={() => handleNavClick(item.page)}
            >
              {item.name}
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                  currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                initial={false}
              />
            </motion.button>
          ))}
        </motion.nav>

        {/* Desktop Actions */}
        <motion.div 
          className="hidden md:flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Theme Toggle */}
          <ThemeToggle />

          {!isAuthenticated ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={onLoginClick}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </motion.div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {userData?.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden lg:block">
                    <div className="text-sm font-medium">{userData?.fullName || 'User'}</div>
                    <div className="text-xs text-muted-foreground">{userData?.role || 'Student'}</div>
                  </div>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{userData?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{userData?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg relative overflow-hidden group"
              onClick={onEmergency}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={false}
              />
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="relative z-10">Emergency</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left text-foreground ${
                    currentPage === item.page ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}
                  onClick={() => handleNavClick(item.page)}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                {!isAuthenticated ? (
                  <Button variant="outline" onClick={onLoginClick}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-accent rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {userData?.fullName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{userData?.fullName || 'User'}</div>
                        <div className="text-xs text-muted-foreground">{userData?.role || 'Student'}</div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={onLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
                <Button className="bg-red-600 hover:bg-red-700" onClick={onEmergency}>
                  Emergency
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}