import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Flame, 
  Earth, 
  CloudRain, 
  Zap, 
  Wind, 
  Trophy, 
  Clock, 
  Star,
  Play,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Timer,
  Lock,
  Medal,
  Target,
  Zap as Lightning
} from 'lucide-react';
import { db } from '../utils/database';

interface QuizHubProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
  duration: number;
  questions: number;
  completed: boolean;
  score?: number;
  color: string;
  gradient: string;
  level: number;
  requiredLevel: number;
  minScoreToUnlock: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: string;
  difficulty: string;
}

const quizzes: Quiz[] = [
  // Fire Safety Levels
  {
    id: 'fire-1',
    title: 'Fire Safety Basics',
    description: 'Learn fundamental fire safety principles and basic prevention techniques.',
    icon: Flame,
    difficulty: 'Beginner',
    duration: 10,
    questions: 10,
    completed: false,
    color: 'text-red-600',
    gradient: 'from-red-400 to-orange-400',
    level: 1,
    requiredLevel: 0,
    minScoreToUnlock: 0
  },
  {
    id: 'fire-2',
    title: 'Fire Detection & Alarms',
    description: 'Master fire detection systems, alarm types, and emergency procedures.',
    icon: Flame,
    difficulty: 'Intermediate',
    duration: 12,
    questions: 12,
    completed: false,
    color: 'text-red-600',
    gradient: 'from-red-500 to-orange-500',
    level: 2,
    requiredLevel: 1,
    minScoreToUnlock: 70
  },
  {
    id: 'fire-3',
    title: 'Fire Suppression Systems',
    description: 'Advanced knowledge of fire extinguishers, sprinklers, and suppression methods.',
    icon: Flame,
    difficulty: 'Advanced',
    duration: 15,
    questions: 15,
    completed: false,
    color: 'text-red-600',
    gradient: 'from-red-600 to-orange-600',
    level: 3,
    requiredLevel: 2,
    minScoreToUnlock: 75
  },
  {
    id: 'fire-4',
    title: 'Emergency Evacuation Leadership',
    description: 'Expert-level emergency response coordination and evacuation leadership.',
    icon: Flame,
    difficulty: 'Expert',
    duration: 18,
    questions: 18,
    completed: false,
    color: 'text-red-600',
    gradient: 'from-red-700 to-orange-700',
    level: 4,
    requiredLevel: 3,
    minScoreToUnlock: 80
  },
  {
    id: 'fire-5',
    title: 'Fire Safety Master',
    description: 'Master-level comprehensive fire safety knowledge and emergency management.',
    icon: Flame,
    difficulty: 'Master',
    duration: 25,
    questions: 25,
    completed: false,
    color: 'text-red-600',
    gradient: 'from-red-800 to-orange-800',
    level: 5,
    requiredLevel: 4,
    minScoreToUnlock: 85
  },

  // Earthquake Safety Levels
  {
    id: 'earthquake-1',
    title: 'Earthquake Basics',
    description: 'Understanding earthquakes, causes, and basic safety measures.',
    icon: Earth,
    difficulty: 'Beginner',
    duration: 10,
    questions: 10,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-400 to-yellow-400',
    level: 1,
    requiredLevel: 0,
    minScoreToUnlock: 0
  },
  {
    id: 'earthquake-2',
    title: 'Drop, Cover & Hold',
    description: 'Master the Drop, Cover, and Hold technique and protective actions.',
    icon: Earth,
    difficulty: 'Intermediate',
    duration: 12,
    questions: 12,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-yellow-500',
    level: 2,
    requiredLevel: 1,
    minScoreToUnlock: 70
  },
  {
    id: 'earthquake-3',
    title: 'Building Safety & Hazards',
    description: 'Advanced earthquake safety, building codes, and hazard identification.',
    icon: Earth,
    difficulty: 'Advanced',
    duration: 15,
    questions: 15,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-600 to-yellow-600',
    level: 3,
    requiredLevel: 2,
    minScoreToUnlock: 75
  },
  {
    id: 'earthquake-4',
    title: 'Post-Earthquake Response',
    description: 'Expert knowledge of post-earthquake procedures and recovery protocols.',
    icon: Earth,
    difficulty: 'Expert',
    duration: 18,
    questions: 18,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-700 to-yellow-700',
    level: 4,
    requiredLevel: 3,
    minScoreToUnlock: 80
  },
  {
    id: 'earthquake-5',
    title: 'Seismic Safety Master',
    description: 'Master-level seismic safety expertise and community preparedness.',
    icon: Earth,
    difficulty: 'Master',
    duration: 25,
    questions: 25,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-800 to-yellow-800',
    level: 5,
    requiredLevel: 4,
    minScoreToUnlock: 85
  },

  // Flood Safety Levels
  {
    id: 'flood-1',
    title: 'Flood Basics',
    description: 'Understanding flood types, causes, and basic water safety.',
    icon: CloudRain,
    difficulty: 'Beginner',
    duration: 10,
    questions: 10,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-400 to-cyan-400',
    level: 1,
    requiredLevel: 0,
    minScoreToUnlock: 0
  },
  {
    id: 'flood-2',
    title: 'Flood Warning Systems',
    description: 'Learn flood warning systems, alerts, and emergency communication.',
    icon: CloudRain,
    difficulty: 'Intermediate',
    duration: 12,
    questions: 12,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    level: 2,
    requiredLevel: 1,
    minScoreToUnlock: 70
  },
  {
    id: 'flood-3',
    title: 'Water Rescue & Safety',
    description: 'Advanced water safety techniques and rescue procedures.',
    icon: CloudRain,
    difficulty: 'Advanced',
    duration: 15,
    questions: 15,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-600 to-cyan-600',
    level: 3,
    requiredLevel: 2,
    minScoreToUnlock: 75
  },
  {
    id: 'flood-4',
    title: 'Flood Emergency Management',
    description: 'Expert flood emergency planning and community response coordination.',
    icon: CloudRain,
    difficulty: 'Expert',
    duration: 18,
    questions: 18,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-700 to-cyan-700',
    level: 4,
    requiredLevel: 3,
    minScoreToUnlock: 80
  },
  {
    id: 'flood-5',
    title: 'Flood Safety Master',
    description: 'Master-level flood safety expertise and disaster response leadership.',
    icon: CloudRain,
    difficulty: 'Master',
    duration: 25,
    questions: 25,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-800 to-cyan-800',
    level: 5,
    requiredLevel: 4,
    minScoreToUnlock: 85
  },

  // Severe Weather Levels
  {
    id: 'weather-1',
    title: 'Weather Safety Basics',
    description: 'Understanding severe weather patterns and basic safety measures.',
    icon: Wind,
    difficulty: 'Beginner',
    duration: 10,
    questions: 10,
    completed: false,
    color: 'text-purple-600',
    gradient: 'from-purple-400 to-indigo-400',
    level: 1,
    requiredLevel: 0,
    minScoreToUnlock: 0
  },
  {
    id: 'weather-2',
    title: 'Storm Warning Systems',
    description: 'Learn weather alert systems, warnings, and safety protocols.',
    icon: Wind,
    difficulty: 'Intermediate',
    duration: 12,
    questions: 12,
    completed: false,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500',
    level: 2,
    requiredLevel: 1,
    minScoreToUnlock: 70
  },
  {
    id: 'weather-3',
    title: 'Tornado & Hurricane Safety',
    description: 'Advanced severe weather safety and shelter procedures.',
    icon: Wind,
    difficulty: 'Advanced',
    duration: 15,
    questions: 15,
    completed: false,
    color: 'text-purple-600',
    gradient: 'from-purple-600 to-indigo-600',
    level: 3,
    requiredLevel: 2,
    minScoreToUnlock: 75
  },
  {
    id: 'weather-4',
    title: 'Weather Emergency Response',
    description: 'Expert weather emergency planning and community preparedness.',
    icon: Wind,
    difficulty: 'Expert',
    duration: 18,
    questions: 18,
    completed: false,
    color: 'text-purple-600',
    gradient: 'from-purple-700 to-indigo-700',
    level: 4,
    requiredLevel: 3,
    minScoreToUnlock: 80
  },
  {
    id: 'weather-5',
    title: 'Severe Weather Master',
    description: 'Master-level severe weather expertise and meteorological safety.',
    icon: Wind,
    difficulty: 'Master',
    duration: 25,
    questions: 25,
    completed: false,
    color: 'text-purple-600',
    gradient: 'from-purple-800 to-indigo-800',
    level: 5,
    requiredLevel: 4,
    minScoreToUnlock: 85
  },

  // Electrical Safety Levels
  {
    id: 'electrical-1',
    title: 'Electrical Safety Basics',
    description: 'Basic electrical hazards and fundamental safety practices.',
    icon: Zap,
    difficulty: 'Beginner',
    duration: 10,
    questions: 10,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-400 to-amber-400',
    level: 1,
    requiredLevel: 0,
    minScoreToUnlock: 0
  },
  {
    id: 'electrical-2',
    title: 'Power System Safety',
    description: 'Understanding power systems, outages, and electrical emergencies.',
    icon: Zap,
    difficulty: 'Intermediate',
    duration: 12,
    questions: 12,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500',
    level: 2,
    requiredLevel: 1,
    minScoreToUnlock: 70
  },
  {
    id: 'electrical-3',
    title: 'Electrical Fire Prevention',
    description: 'Advanced electrical fire prevention and safety protocols.',
    icon: Zap,
    difficulty: 'Advanced',
    duration: 15,
    questions: 15,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-600 to-amber-600',
    level: 3,
    requiredLevel: 2,
    minScoreToUnlock: 75
  },
  {
    id: 'electrical-4',
    title: 'Electrical Emergency Response',
    description: 'Expert electrical emergency management and safety coordination.',
    icon: Zap,
    difficulty: 'Expert',
    duration: 18,
    questions: 18,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-700 to-amber-700',
    level: 4,
    requiredLevel: 3,
    minScoreToUnlock: 80
  },
  {
    id: 'electrical-5',
    title: 'Electrical Safety Master',
    description: 'Master-level electrical safety expertise and system management.',
    icon: Zap,
    difficulty: 'Master',
    duration: 25,
    questions: 25,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-800 to-amber-800',
    level: 5,
    requiredLevel: 4,
    minScoreToUnlock: 85
  }
];

// Sample questions with various difficulty levels
const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the first thing you should do when you discover a fire?',
    options: [
      'Try to extinguish it yourself',
      'Sound the alarm and alert others',
      'Gather your belongings',
      'Take photos for insurance'
    ],
    correctAnswer: 1,
    explanation: 'The first priority is always to alert others and sound the alarm. Personal safety and warning others comes before attempting to fight the fire.',
    points: 10,
    category: 'fire',
    difficulty: 'beginner'
  },
  {
    id: '2',
    question: 'During an earthquake, if you are indoors, what should you do first?',
    options: [
      'Run outside immediately',
      'Stand in a doorway',
      'Drop, Cover, and Hold On',
      'Get under a desk and stay there'
    ],
    correctAnswer: 2,
    explanation: 'Drop, Cover, and Hold On is the recommended action. Drop to hands and knees, take cover under a sturdy desk or table, and hold on until shaking stops.',
    points: 10,
    category: 'earthquake',
    difficulty: 'beginner'
  },
  {
    id: '3',
    question: 'What does a flood watch mean?',
    options: [
      'Flooding is currently occurring',
      'Flooding is possible in your area',
      'Flooding is imminent or occurring',
      'All flooding has ended'
    ],
    correctAnswer: 1,
    explanation: 'A flood watch means that conditions are favorable for flooding. It means you should be prepared and stay informed about the weather situation.',
    points: 10,
    category: 'flood',
    difficulty: 'beginner'
  }
];

export function QuizHub({ userData, isAuthenticated, onNavigate }: QuizHubProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  React.useEffect(() => {
    if (isQuizActive && !quizCompleted && !showExplanation) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizActive, quizCompleted, showExplanation, currentQuestion]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1);
    }
    setShowExplanation(true);
  };

  const startQuiz = (quiz: Quiz) => {
    if (!isQuizUnlocked(quiz)) return;
    
    setSelectedQuiz(quiz);
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setTimeLeft(60); // 1 minute per question
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    const currentQ = sampleQuestions[currentQuestion % sampleQuestions.length];
    const newAnswers = [...answers, selectedAnswer || -1];
    setAnswers(newAnswers);

    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(prev => prev + currentQ.points);
    }

    if (currentQuestion + 1 < (selectedQuiz?.questions || 5)) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(60);
    } else {
      // Quiz completed - save to database
      if (isAuthenticated && userData && selectedQuiz) {
        const totalPoints = selectedQuiz.questions * 10; // 10 points per question
        const percentage = Math.round((score / totalPoints) * 100);
        const attempts = 1;
        
        db.saveQuizResult(
          userData.userId || 'temp_user',
          selectedQuiz.id.split('-')[0],
          selectedQuiz.level.toString(),
          percentage,
          attempts
        );
      }
      setQuizCompleted(true);
    }
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Master': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const isQuizUnlocked = (quiz: Quiz) => {
    // For demo purposes, assume all level 1 quizzes are unlocked
    if (quiz.level === 1) return true;
    
    // Check if previous level is completed with required score
    // This would be implemented with real data
    return false;
  };

  const getQuizzesByCategory = () => {
    if (selectedCategory === 'all') return quizzes;
    return quizzes.filter(quiz => quiz.id.startsWith(selectedCategory));
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: Target },
    { id: 'fire', name: 'Fire Safety', icon: Flame },
    { id: 'earthquake', name: 'Earthquake', icon: Earth },
    { id: 'flood', name: 'Flood Safety', icon: CloudRain },
    { id: 'weather', name: 'Severe Weather', icon: Wind },
    { id: 'electrical', name: 'Electrical Safety', icon: Zap }
  ];

  if (quizCompleted && selectedQuiz) {
    const totalPoints = selectedQuiz.questions * 10;
    const percentage = Math.round((score / totalPoints) * 100);
    const grade = getScoreGrade(percentage);

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">Excellent work on {selectedQuiz.title}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${grade.color}`}>
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${grade.color}`}>
                  {grade.grade}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  Level {selectedQuiz.level}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => {
                  setIsQuizActive(false);
                  setSelectedQuiz(null);
                  setQuizCompleted(false);
                }}
                variant="outline"
              >
                Back to Quizzes
              </Button>
              <Button 
                onClick={() => onNavigate('progress')}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                View Progress
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isQuizActive && selectedQuiz) {
    const currentQ = sampleQuestions[currentQuestion % sampleQuestions.length];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsQuizActive(false);
              setSelectedQuiz(null);
            }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Quiz
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
              <Timer className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {selectedQuiz.questions}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{selectedQuiz.title} - Level {selectedQuiz.level}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8">
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedQuiz.gradient}`}>
                  <selectedQuiz.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-600">
                  {selectedQuiz.title} • {currentQ.points} points
                </div>
              </div>
              
              <h3 className="text-xl font-semibold leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${
                    showExplanation && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : ''
                  }`}
                  disabled={showExplanation}
                  whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === currentQ.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    } ${
                      showExplanation && index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : ''
                    }`}>
                      {showExplanation && (
                        index === currentQ.correctAnswer ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-4 h-4 text-white" />
                        ) : null
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQ.explanation}</p>
              </motion.div>
            )}

            <div className="flex justify-end">
              {!showExplanation ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  {currentQuestion + 1 < selectedQuiz.questions ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Multi-Level Disaster Preparedness Quizzes
            </h1>
            <p className="text-gray-600">Progress through 5 levels of expertise in each disaster category</p>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">{quizzes.length}</div>
            <div className="text-sm text-gray-600">Total Quiz Levels</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Categories</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">25</div>
            <div className="text-sm text-gray-600">Levels Available</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-yellow-600">⭐ 0</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {getQuizzesByCategory().map((quiz, index) => {
            const isUnlocked = isQuizUnlocked(quiz);
            
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={isUnlocked ? { y: -8, scale: 1.02 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
              >
                <Card className={`h-full transition-all duration-300 ${
                  isUnlocked 
                    ? 'hover:shadow-lg cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                } ${quiz.completed ? 'border-green-300 bg-green-50' : ''}`}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${quiz.gradient} ${
                        !isUnlocked ? 'opacity-50' : ''
                      }`}>
                        {isUnlocked ? (
                          <quiz.icon className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Level {quiz.level}
                        </Badge>
                        {quiz.completed && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">{quiz.score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {quiz.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {quiz.duration} min
                      </Badge>
                      <Badge variant="outline">
                        {quiz.questions} questions
                      </Badge>
                    </div>

                    {!isUnlocked && quiz.requiredLevel > 0 && (
                      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                        Complete Level {quiz.requiredLevel} with {quiz.minScoreToUnlock}% to unlock
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => startQuiz(quiz)}
                      disabled={!isUnlocked}
                      className={`w-full ${
                        isUnlocked 
                          ? `bg-gradient-to-r ${quiz.gradient} hover:opacity-90` 
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
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