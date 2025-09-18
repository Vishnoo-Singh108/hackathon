import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shield, Mail, Lock, Eye, EyeOff, AlertTriangle, School, Users, User, GraduationCap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userData: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFetched, setEmailFetched] = useState(false);

  // Simulate automatic email fetching for login mode
  useEffect(() => {
    if (!isOpen) return;

    if (isLogin) {
      const fetchUserEmail = async () => {
        setIsLoading(true);
        try {
          // Simulate API call delay (reduced for better UX)
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Simulate fetching email from browser/session storage or OAuth provider
          const storedEmail = localStorage.getItem('userEmail') || 'student@university.edu';
          setEmail(storedEmail);
          setEmailFetched(true);
        } catch (error) {
          console.error('Error fetching email:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserEmail();
    } else {
      // Reset form when switching to signup
      setEmail('');
      setEmailFetched(false);
      setIsLoading(false);
    }
  }, [isOpen, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate authentication process (reduced timeout)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        email,
        fullName: isLogin ? 'Student User' : fullName,
        role: isLogin ? 'student' : role,
        institution: isLogin ? 'University' : institution,
        studentId: isLogin ? 'STU001' : studentId,
      };

      // Store user data for future sessions
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', isLogin ? userData.fullName : fullName);
      
      onAuthSuccess(userData);
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setStudentId('');
    setInstitution('');
    setRole('');
    setEmailFetched(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const features = [
    { icon: AlertTriangle, text: "Emergency Response Training" },
    { icon: School, text: "Educational Learning Modules" },
    { icon: Users, text: "Interactive Group Drills" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {isLogin ? 'Sign In to Suraksha' : 'Create Suraksha Account'}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Sign in to access your disaster preparedness dashboard and learning modules'
              : 'Create your account to start learning emergency preparedness and participate in interactive drills'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Branding and Features */}
          <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold">Suraksha</h1>
              </motion.div>
              
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold">
                  Prepare, Learn, Stay Safe
                </h2>
                <p className="text-blue-100 text-lg">
                  Comprehensive disaster management training platform for educational institutions
                </p>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex flex-col justify-center p-8 bg-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close authentication modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-md mx-auto w-full space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-2"
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" aria-live="polite">
                    {isLogin ? 'Welcome Back' : 'Join SafeEdu'}
                  </h3>
                  <p className="text-gray-600" aria-live="polite">
                    {isLogin 
                      ? 'Sign in to access your disaster preparedness dashboard'
                      : 'Create your account to start learning emergency preparedness'
                    }
                  </p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? 'login-form' : 'signup-form'}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Sign Up Additional Fields */}
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="pl-10 h-11"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID</Label>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="studentId"
                              type="text"
                              value={studentId}
                              onChange={(e) => setStudentId(e.target.value)}
                              className="pl-10 h-11"
                              placeholder="Student ID"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={role} onValueChange={setRole} required>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="administrator">Administrator</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <div className="relative">
                          <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="institution"
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="pl-10 h-11"
                            placeholder="Enter your institution name"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11"
                        placeholder="Enter your email"
                        required
                        disabled={isLogin && isLoading && !emailFetched}
                      />
                      {isLogin && isLoading && !emailFetched && (
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                        </motion.div>
                      )}
                    </div>
                    {isLogin && emailFetched && (
                      <motion.p
                        className="text-sm text-green-600 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        ✓ Email automatically detected
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-11"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field (Sign Up Only) */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10 h-11"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {password && confirmPassword && password !== confirmPassword && (
                        <p className="text-sm text-red-600">Passwords do not match</p>
                      )}
                    </div>
                  )}

                  {/* Remember Me and Forgot Password (Login Only) */}
                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Terms and Conditions (Sign Up Only) */}
                  {!isLogin && (
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </button>
                        {' '}and{' '}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </button>
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </motion.div>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </Button>

                  {/* Toggle Mode */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        disabled={isLoading}
                      >
                        {isLogin ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}