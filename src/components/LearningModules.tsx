import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Flame,
  Earth,
  CloudRain,
  Wind,
  Zap,
  Clock,
  Star,
  Award,
  Video,
  FileText,
  Headphones,
  Eye
} from 'lucide-react';
import { db } from '../utils/database';

interface LearningModulesProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  lessons: number;
  completed: boolean;
  progress: number; // 0-100
  category: string;
  color: string;
  gradient: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'interactive' | 'audio';
  duration: number;
  completed: boolean;
  content: string;
  keyPoints: string[];
}

const modules: Module[] = [
  {
    id: 'fire-basics',
    title: 'Fire Safety Fundamentals',
    description: 'Essential fire safety knowledge including prevention, detection, and basic response procedures.',
    icon: Flame,
    difficulty: 'Beginner',
    duration: 45,
    lessons: 6,
    completed: true,
    progress: 100,
    category: 'Fire Safety',
    color: 'text-red-600',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'fire-advanced',
    title: 'Advanced Fire Response',
    description: 'Advanced fire fighting techniques, emergency leadership, and complex evacuation scenarios.',
    icon: Flame,
    difficulty: 'Advanced',
    duration: 60,
    lessons: 8,
    completed: false,
    progress: 25,
    category: 'Fire Safety',
    color: 'text-red-600',
    gradient: 'from-red-600 to-red-800'
  },
  {
    id: 'earthquake-basics',
    title: 'Earthquake Preparedness',
    description: 'Earthquake science, early warning systems, and Drop-Cover-Hold techniques.',
    icon: Earth,
    difficulty: 'Beginner',
    duration: 40,
    lessons: 5,
    completed: false,
    progress: 60,
    category: 'Earthquake Safety',
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: 'flood-safety',
    title: 'Flood Response & Water Safety',
    description: 'Understanding flood risks, evacuation procedures, and water rescue basics.',
    icon: CloudRain,
    difficulty: 'Intermediate',
    duration: 35,
    lessons: 5,
    completed: false,
    progress: 0,
    category: 'Flood Safety',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'severe-weather',
    title: 'Severe Weather Preparedness',
    description: 'Tornado, hurricane, and storm safety including warning systems and shelter procedures.',
    icon: Wind,
    difficulty: 'Intermediate',
    duration: 50,
    lessons: 7,
    completed: false,
    progress: 14,
    category: 'Weather Safety',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Emergency Response',
    description: 'Electrical hazard identification, power outage procedures, and electrical fire safety.',
    icon: Zap,
    difficulty: 'Beginner',
    duration: 30,
    lessons: 4,
    completed: true,
    progress: 100,
    category: 'Electrical Safety',
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500'
  }
];

// Sample lessons for Fire Safety Fundamentals
const fireBasicsLessons: Lesson[] = [
  {
    id: '1',
    title: 'Understanding Fire Science',
    type: 'video',
    duration: 8,
    completed: true,
    content: `Fire is a chemical reaction that requires three elements to exist: fuel, oxygen, and heat. This is known as the fire triangle. Understanding this principle is crucial for both fire prevention and suppression.

When these three elements come together in the right proportions, combustion occurs. Removing any one of these elements will extinguish the fire. This is the foundation of all fire suppression techniques.`,
    keyPoints: [
      'Fire requires fuel, oxygen, and heat (fire triangle)',
      'Combustion is a chemical reaction',
      'Removing any element of the triangle stops the fire',
      'Different materials burn at different rates',
      'Fire produces heat, light, smoke, and toxic gases'
    ]
  },
  {
    id: '2',
    title: 'Fire Prevention Strategies',
    type: 'reading',
    duration: 10,
    completed: true,
    content: `Fire prevention is always better than fire fighting. Most fires are preventable through proper awareness, maintenance, and safety practices.

Key prevention strategies include proper storage of flammable materials, regular maintenance of electrical systems, and maintaining clear evacuation routes.`,
    keyPoints: [
      'Proper storage of flammable materials',
      'Regular electrical system maintenance',
      'Keep heat sources away from combustibles',
      'Maintain smoke detectors and fire alarms',
      'Ensure clear evacuation routes'
    ]
  },
  {
    id: '3',
    title: 'Fire Detection Systems',
    type: 'interactive',
    duration: 12,
    completed: true,
    content: `Modern buildings use various fire detection systems including smoke detectors, heat detectors, and flame detectors. Each type has specific applications and limitations.

Smoke detectors are the most common and effective for early detection. Heat detectors are used in areas where smoke detectors might give false alarms.`,
    keyPoints: [
      'Smoke detectors provide early warning',
      'Heat detectors work in challenging environments',
      'Flame detectors respond to fire signatures',
      'Integration with building alarm systems',
      'Regular testing and maintenance required'
    ]
  },
  {
    id: '4',
    title: 'Personal Evacuation Planning',
    type: 'video',
    duration: 7,
    completed: false,
    content: `Every person should have a personal evacuation plan. This includes knowing all exit routes, understanding alarm signals, and having a family meeting point.

Practice your evacuation plan regularly and adjust it based on changing circumstances like construction or new building layouts.`,
    keyPoints: [
      'Know at least two exit routes from every location',
      'Establish family meeting points',
      'Practice evacuation plans regularly',
      'Consider special needs family members',
      'Keep important documents accessible'
    ]
  },
  {
    id: '5',
    title: 'Using Fire Extinguishers',
    type: 'interactive',
    duration: 15,
    completed: false,
    content: `Fire extinguishers are classified by the types of fires they can handle. Class A for ordinary combustibles, Class B for flammable liquids, Class C for electrical fires, and so on.

Remember the PASS technique: Pull the pin, Aim at the base, Squeeze the handle, and Sweep side to side.`,
    keyPoints: [
      'Different classes for different fire types',
      'PASS technique for operation',
      'Aim at the base of the flames',
      'Only fight small fires',
      'Have an escape route planned'
    ]
  },
  {
    id: '6',
    title: 'Emergency Communication',
    type: 'audio',
    duration: 6,
    completed: false,
    content: `Effective communication during fire emergencies can save lives. This includes understanding alarm signals, emergency announcements, and how to communicate with emergency responders.

Know how to call for help and what information to provide to emergency services.`,
    keyPoints: [
      'Understand different alarm signals',
      'Know how to call emergency services',
      'Provide clear location information',
      'Follow instructions from authorities',
      'Help communicate with others who need assistance'
    ]
  }
];

export function LearningModules({ userData, isAuthenticated, onNavigate }: LearningModulesProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isLessonActive, setIsLessonActive] = useState(false);

  const startModule = (module: Module) => {
    setSelectedModule(module);
    setCurrentLesson(0);
    setIsLessonActive(true);
  };

  const nextLesson = () => {
    if (currentLesson < fireBasicsLessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    } else {
      // Module completed
      setIsLessonActive(false);
      setSelectedModule(null);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
    }
  };

  const completeLesson = () => {
    // Mark lesson as completed and save to database
    if (isAuthenticated && userData && selectedModule) {
      const lesson = fireBasicsLessons[currentLesson];
      db.saveModuleCompletion(
        userData.userId || 'temp_user',
        selectedModule.category.toLowerCase(),
        lesson.id,
        lesson.duration
      );
    }
    nextLesson();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return FileText;
      case 'interactive': return Play;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  if (isLessonActive && selectedModule) {
    const lesson = fireBasicsLessons[currentLesson];
    const progress = ((currentLesson + 1) / fireBasicsLessons.length) * 100;
    const TypeIcon = getTypeIcon(lesson.type);

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsLessonActive(false);
              setSelectedModule(null);
            }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Button>
          
          <Badge variant="outline">
            Lesson {currentLesson + 1} of {fireBasicsLessons.length}
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{selectedModule.title}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Lesson Content */}
        <Card className="min-h-[500px]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedModule.gradient}`}>
                <TypeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{lesson.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration} minutes
                  </span>
                  <span className="capitalize">{lesson.type} content</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Content Area */}
            <div className="space-y-4">
              {lesson.type === 'video' && (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Play className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Video Content: {lesson.title}</p>
                    <Button size="sm">Play Video</Button>
                  </div>
                </div>
              )}
              
              {lesson.type === 'interactive' && (
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
                  <div className="text-center space-y-3">
                    <Eye className="w-16 h-16 text-blue-500 mx-auto" />
                    <p className="text-blue-700 font-medium">Interactive Simulation</p>
                    <p className="text-blue-600">{lesson.title}</p>
                    <Button size="sm" className="bg-blue-600">Start Simulation</Button>
                  </div>
                </div>
              )}
              
              {lesson.type === 'audio' && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Audio Content: {lesson.title}</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button size="sm">Play Audio</Button>
                    <span className="text-sm text-gray-500">{lesson.duration} minutes</span>
                  </div>
                </div>
              )}
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {lesson.content}
                </p>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Key Learning Points
              </h4>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                onClick={prevLesson}
                disabled={currentLesson === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button 
                onClick={completeLesson}
                className={`bg-gradient-to-r ${selectedModule.gradient} text-white flex items-center gap-2`}
              >
                {currentLesson === fireBasicsLessons.length - 1 ? (
                  <>
                    <Award className="w-4 h-4" />
                    Complete Module
                  </>
                ) : (
                  <>
                    Complete Lesson
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Interactive Learning Modules
            </h1>
            <p className="text-gray-600">Comprehensive disaster preparedness education with hands-on learning</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Total Modules</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">33%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-yellow-600">🏆 350</div>
            <div className="text-sm text-gray-600">Learning Points</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="fire">Fire Safety</TabsTrigger>
            <TabsTrigger value="earthquake">Earthquake</TabsTrigger>
            <TabsTrigger value="flood">Flood</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="electrical">Electrical</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient}`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        {module.completed && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {module.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration} min
                        </Badge>
                        <Badge variant="outline">
                          {module.lessons} lessons
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                      
                      <Button 
                        onClick={() => startModule(module)}
                        className={`w-full bg-gradient-to-r ${module.gradient} hover:opacity-90`}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {module.progress === 0 ? 'Start Module' : 
                         module.completed ? 'Review Module' : 'Continue Learning'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>

          {/* Category-specific tabs would filter modules by category */}
          {['fire', 'earthquake', 'flood', 'weather', 'electrical'].map(category => (
            <TabsContent key={category} value={category} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter(module => module.category.toLowerCase().includes(category))
                .map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient}`}>
                            <module.icon className="w-6 h-6 text-white" />
                          </div>
                          {module.completed && (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                        
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {module.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.duration} min
                          </Badge>
                          <Badge variant="outline">
                            {module.lessons} lessons
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        
                        <Button 
                          onClick={() => startModule(module)}
                          className={`w-full bg-gradient-to-r ${module.gradient} hover:opacity-90`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {module.progress === 0 ? 'Start Module' : 
                           module.completed ? 'Review Module' : 'Continue Learning'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pt-8"
      >
        <Button 
          variant="outline" 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}