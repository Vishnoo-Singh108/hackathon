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
  Wind, 
  Zap,
  Play,
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  AlertTriangle,
  MapPin,
  Shield
} from 'lucide-react';
import { db } from '../utils/database';

interface DrillHubProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

interface Drill {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  steps: number;
  completed: boolean;
  lastScore?: number;
  color: string;
  gradient: string;
  category: string;
}

interface DrillStep {
  id: string;
  title: string;
  instruction: string;
  action: string;
  timeLimit: number; // in seconds
  points: number;
  tips: string[];
}

const drills: Drill[] = [
  {
    id: 'fire-evacuation',
    title: 'Fire Emergency Evacuation',
    description: 'Practice fire evacuation procedures, alarm response, and safe exit strategies.',
    icon: Flame,
    difficulty: 'Basic',
    duration: 8,
    steps: 7,
    completed: true,
    lastScore: 85,
    color: 'text-red-600',
    gradient: 'from-red-500 to-orange-500',
    category: 'Fire Safety'
  },
  {
    id: 'earthquake-response',
    title: 'Earthquake Drop-Cover-Hold',
    description: 'Master the Drop, Cover, and Hold On technique for earthquake safety.',
    icon: Earth,
    difficulty: 'Intermediate',
    duration: 6,
    steps: 5,
    completed: false,
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-yellow-500',
    category: 'Earthquake Safety'
  },
  {
    id: 'flood-evacuation',
    title: 'Flood Emergency Response',
    description: 'Learn flood evacuation routes, water safety, and emergency communication.',
    icon: CloudRain,
    difficulty: 'Intermediate',
    duration: 10,
    steps: 6,
    completed: false,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    category: 'Flood Safety'
  },
  {
    id: 'tornado-shelter',
    title: 'Tornado Shelter Procedures',
    description: 'Practice tornado warning response and safe shelter positioning.',
    icon: Wind,
    difficulty: 'Advanced',
    duration: 5,
    steps: 4,
    completed: true,
    lastScore: 92,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500',
    category: 'Severe Weather'
  },
  {
    id: 'power-outage',
    title: 'Power Outage Emergency',
    description: 'Handle electrical emergencies and power outage safety protocols.',
    icon: Zap,
    difficulty: 'Basic',
    duration: 7,
    steps: 5,
    completed: false,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500',
    category: 'Electrical Safety'
  }
];

// Sample drill steps for Fire Evacuation
const fireEvacuationSteps: DrillStep[] = [
  {
    id: '1',
    title: 'Alarm Recognition',
    instruction: 'You hear the fire alarm. Recognize the sound and understand it\'s an emergency.',
    action: 'Stop what you\'re doing immediately and listen to the alarm',
    timeLimit: 5,
    points: 10,
    tips: [
      'Fire alarms are designed to be loud and attention-grabbing',
      'Never ignore an alarm, even if you think it\'s a drill',
      'Alert others around you who might not have heard'
    ]
  },
  {
    id: '2',
    title: 'Assess Immediate Area',
    instruction: 'Quickly assess your immediate surroundings for immediate dangers.',
    action: 'Look around for fire, smoke, or blocked exits',
    timeLimit: 10,
    points: 15,
    tips: [
      'Check door handles for heat before opening',
      'Look for smoke coming under doors',
      'Identify the nearest exit route'
    ]
  },
  {
    id: '3',
    title: 'Alert Others',
    instruction: 'Alert people in your immediate area about the emergency.',
    action: 'Shout "Fire! Everyone out!" and help alert others',
    timeLimit: 15,
    points: 20,
    tips: [
      'Knock on doors if in a building',
      'Help those who might need assistance',
      'Don\'t assume everyone heard the alarm'
    ]
  },
  {
    id: '4',
    title: 'Choose Exit Route',
    instruction: 'Select the safest and nearest exit route.',
    action: 'Head toward the nearest marked emergency exit',
    timeLimit: 8,
    points: 15,
    tips: [
      'Use stairs, never elevators',
      'If main route is blocked, use alternate route',
      'Stay low if there\'s smoke'
    ]
  },
  {
    id: '5',
    title: 'Evacuate Building',
    instruction: 'Move quickly but calmly toward the exit.',
    action: 'Walk quickly to exit, staying low if there\'s smoke',
    timeLimit: 30,
    points: 25,
    tips: [
      'Don\'t run unless necessary',
      'Stay calm and help others stay calm',
      'Close doors behind you to slow fire spread'
    ]
  },
  {
    id: '6',
    title: 'Reach Assembly Point',
    instruction: 'Move to the designated assembly point outside.',
    action: 'Go to the designated meeting area away from the building',
    timeLimit: 60,
    points: 10,
    tips: [
      'Stay at least 50 feet from the building',
      'Don\'t block emergency vehicle access',
      'Wait for further instructions'
    ]
  },
  {
    id: '7',
    title: 'Report and Wait',
    instruction: 'Report to authorities and wait for all-clear.',
    action: 'Report to emergency personnel and wait for instructions',
    timeLimit: 0,
    points: 5,
    tips: [
      'Report any missing people to firefighters',
      'Don\'t re-enter until given all-clear',
      'Stay with your group'
    ]
  }
];

export function DrillHub({ userData, isAuthenticated, onNavigate }: DrillHubProps) {
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [isDrillActive, setIsDrillActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [drillCompleted, setDrillCompleted] = useState(false);
  const [stepScores, setStepScores] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  React.useEffect(() => {
    if (isDrillActive && !drillCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleStepTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isDrillActive, drillCompleted, timeLeft, currentStep]);

  const startDrill = (drill: Drill) => {
    setSelectedDrill(drill);
    setIsDrillActive(true);
    setCurrentStep(0);
    setStepScores([]);
    setTotalScore(0);
    setDrillCompleted(false);
    setTimeLeft(fireEvacuationSteps[0].timeLimit);
  };

  const handleStepTimeout = () => {
    // Partial points for timeout
    const currentStepData = fireEvacuationSteps[currentStep];
    const timeoutScore = Math.floor(currentStepData.points * 0.3);
    handleStepComplete(timeoutScore);
  };

  const handleStepComplete = (score: number) => {
    const newScores = [...stepScores, score];
    setStepScores(newScores);
    setTotalScore(prev => prev + score);

    if (currentStep + 1 < fireEvacuationSteps.length) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(fireEvacuationSteps[currentStep + 1].timeLimit);
    } else {
      // Drill completed - save to database
      if (isAuthenticated && userData && selectedDrill) {
        const timeToComplete = selectedDrill.duration * 60 - timeLeft; // Approximate
        const mistakes = stepScores.filter((score, index) => 
          score < fireEvacuationSteps[index].points * 0.8
        ).length;
        
        db.saveDrillResult(
          userData.userId || 'temp_user',
          selectedDrill.category.toLowerCase(),
          selectedDrill.id,
          Math.round((totalScore / fireEvacuationSteps.reduce((sum, step) => sum + step.points, 0)) * 100),
          timeToComplete,
          mistakes
        );
      }
      setDrillCompleted(true);
    }
  };

  const handleActionComplete = () => {
    const currentStepData = fireEvacuationSteps[currentStep];
    const timeBonus = Math.floor((timeLeft / currentStepData.timeLimit) * currentStepData.points * 0.2);
    const finalScore = currentStepData.points + timeBonus;
    handleStepComplete(Math.min(finalScore, currentStepData.points * 1.2));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (drillCompleted && selectedDrill) {
    const maxScore = fireEvacuationSteps.reduce((sum, step) => sum + step.points, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

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
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-2">Drill Completed!</h2>
            <p className="text-gray-600 mb-6">Excellent work on the {selectedDrill.title}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Performance Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {totalScore}/{maxScore}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Step Performance:</h3>
              {fireEvacuationSteps.map((step, index) => (
                <div key={step.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-sm">{step.title}</span>
                  <Badge variant={stepScores[index] >= step.points * 0.8 ? 'default' : 'secondary'}>
                    {stepScores[index]}/{step.points} pts
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={() => {
                  setIsDrillActive(false);
                  setSelectedDrill(null);
                  setDrillCompleted(false);
                }}
                variant="outline"
              >
                Back to Drills
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

  if (isDrillActive && selectedDrill) {
    const currentStepData = fireEvacuationSteps[currentStep];
    const progress = ((currentStep + 1) / fireEvacuationSteps.length) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Drill Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsDrillActive(false);
              setSelectedDrill(null);
            }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Drill
          </Button>
          
          <div className="flex items-center gap-4">
            {currentStepData.timeLimit > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-lg">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="font-mono text-red-600">{formatTime(timeLeft)}</span>
              </div>
            )}
            <Badge variant="outline">
              Step {currentStep + 1} of {fireEvacuationSteps.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Drill Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Current Step */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedDrill.gradient}`}>
                <selectedDrill.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span>⏱️ {currentStepData.timeLimit > 0 ? `${currentStepData.timeLimit}s` : 'No time limit'}</span>
                  <span>🏆 {currentStepData.points} points</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Situation:</h4>
                <p className="text-gray-700">{currentStepData.instruction}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Your Action:</h4>
                <p className="text-blue-700 font-medium">{currentStepData.action}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">💡 Safety Tips:</h4>
              <ul className="space-y-2">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              className="flex justify-center pt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleActionComplete}
                size="lg"
                className={`bg-gradient-to-r ${selectedDrill.gradient} text-white px-8 py-3`}
              >
                ✅ Action Completed
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center p-4">
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
              <div className="text-sm text-gray-600">Current Score</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stepScores.length}</div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </CardContent>
          </Card>
        </div>
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
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Interactive Emergency Drills
            </h1>
            <p className="text-gray-600">Practice life-saving procedures through hands-on simulations</p>
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
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Available Drills</div>
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
            <div className="text-2xl font-bold text-purple-600">88%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-yellow-600">⚡ 450</div>
            <div className="text-sm text-gray-600">Drill Points</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Drill Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {drills.map((drill, index) => (
            <motion.div
              key={drill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${drill.gradient} opacity-10`}></div>
                
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${drill.gradient}`}>
                      <drill.icon className="w-6 h-6 text-white" />
                    </div>
                    {drill.completed && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          {drill.lastScore}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg">{drill.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {drill.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(drill.difficulty)}>
                      {drill.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {drill.duration} min
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {drill.steps} steps
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {drill.category}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startDrill(drill)}
                    className={`w-full bg-gradient-to-r ${drill.gradient} hover:opacity-90`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {drill.completed ? 'Practice Again' : 'Start Drill'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Safety Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800">Safety Notice</h4>
            <p className="text-sm text-amber-700 mt-1">
              These are educational simulations. In a real emergency, always follow your institution's official emergency procedures and listen to authorities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-4"
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