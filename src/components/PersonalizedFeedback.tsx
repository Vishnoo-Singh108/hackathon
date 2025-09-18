import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  BookOpen, 
  TrendingUp, 
  RefreshCw,
  Star,
  Zap,
  Award
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'success' | 'warning' | 'improvement';
  category: string;
  message: string;
  suggestion: string;
  moduleReference?: string;
  score: number;
  priority: 'high' | 'medium' | 'low';
}

interface PerformanceMetrics {
  overallScore: number;
  reactionTime: number;
  correctActions: number;
  totalActions: number;
  safetyViolations: number;
  improvementAreas: string[];
}

interface PersonalizedFeedbackProps {
  drillType: string;
  performanceData: PerformanceMetrics;
  onRetry?: () => void;
  onContinue?: () => void;
}

export function PersonalizedFeedback({ 
  drillType, 
  performanceData, 
  onRetry, 
  onContinue 
}: PersonalizedFeedbackProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // AI-powered feedback generation based on performance
  useEffect(() => {
    const generateFeedback = async () => {
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const feedback: FeedbackItem[] = [];
      
      // Analyze reaction time
      if (performanceData.reactionTime > 8) {
        feedback.push({
          id: '1',
          type: 'improvement',
          category: 'Response Speed',
          message: `You reacted too slowly during the ${drillType.toLowerCase()} drill – took ${performanceData.reactionTime}s`,
          suggestion: 'Practice walking calmly but quickly. Ideal response time is under 5 seconds.',
          moduleReference: `${drillType} Safety Module 1`,
          score: 60,
          priority: 'high'
        });
      } else if (performanceData.reactionTime < 3) {
        feedback.push({
          id: '2',
          type: 'success',
          category: 'Response Speed',
          message: `Excellent reaction time of ${performanceData.reactionTime}s!`,
          suggestion: 'Your quick response shows great preparedness. Keep it up!',
          score: 95,
          priority: 'low'
        });
      }

      // Analyze safety violations
      if (performanceData.safetyViolations > 0) {
        if (drillType === 'Fire' && performanceData.improvementAreas.includes('elevator_use')) {
          feedback.push({
            id: '3',
            type: 'warning',
            category: 'Safety Protocol',
            message: 'You forgot to avoid elevators during evacuation',
            suggestion: 'Never use elevators during a fire emergency. Always use stairs.',
            moduleReference: 'Fire Safety Module 2',
            score: 40,
            priority: 'high'
          });
        }
        
        if (performanceData.improvementAreas.includes('exit_route')) {
          feedback.push({
            id: '4',
            type: 'improvement',
            category: 'Evacuation Route',
            message: 'You took a suboptimal evacuation route',
            suggestion: 'Always use the nearest safe exit. Review your building\'s evacuation map.',
            moduleReference: `${drillType} Safety Module 3`,
            score: 70,
            priority: 'medium'
          });
        }
      }

      // Analyze correct actions
      const actionPercentage = (performanceData.correctActions / performanceData.totalActions) * 100;
      if (actionPercentage >= 90) {
        feedback.push({
          id: '5',
          type: 'success',
          category: 'Protocol Adherence',
          message: `Outstanding! You completed ${actionPercentage.toFixed(0)}% of actions correctly`,
          suggestion: 'Your knowledge of safety protocols is excellent. Consider helping train others!',
          score: 95,
          priority: 'low'
        });
      } else if (actionPercentage < 70) {
        feedback.push({
          id: '6',
          type: 'improvement',
          category: 'Protocol Knowledge',
          message: `You completed ${actionPercentage.toFixed(0)}% of actions correctly`,
          suggestion: 'Review the fundamental safety procedures and practice more drills.',
          moduleReference: `${drillType} Safety Fundamentals`,
          score: 65,
          priority: 'high'
        });
      }

      // Overall performance feedback
      if (performanceData.overallScore >= 90) {
        feedback.push({
          id: '7',
          type: 'success',
          category: 'Overall Performance',
          message: 'Exceptional performance! You\'re well-prepared for emergencies.',
          suggestion: 'Share your knowledge with peers and consider advanced emergency response training.',
          score: performanceData.overallScore,
          priority: 'low'
        });
      } else if (performanceData.overallScore < 60) {
        feedback.push({
          id: '8',
          type: 'improvement',
          category: 'Overall Performance',
          message: 'There\'s significant room for improvement in your emergency response.',
          suggestion: 'Focus on the highlighted areas and retake this drill after reviewing the modules.',
          moduleReference: `${drillType} Safety Complete Course`,
          score: performanceData.overallScore,
          priority: 'high'
        });
      }

      setFeedbackItems(feedback);
      setIsAnalyzing(false);
    };

    generateFeedback();
  }, [drillType, performanceData]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'improvement':
        return <TrendingUp className="w-5 h-5 text-yellow-600" />;
      default:
        return <Target className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-red-50 border-red-200';
      case 'improvement':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const highPriorityItems = feedbackItems.filter(item => item.priority === 'high');
  const otherItems = feedbackItems.filter(item => item.priority !== 'high');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Feedback
            </h1>
            <p className="text-gray-600">Personalized insights from your {drillType} drill</p>
          </div>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Overall Performance</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${getScoreColor(performanceData.overallScore)}`}>
                    {performanceData.overallScore}%
                  </span>
                  <Badge variant={performanceData.overallScore >= 80 ? 'default' : 'secondary'}>
                    {performanceData.overallScore >= 90 ? 'Excellent' : 
                     performanceData.overallScore >= 80 ? 'Good' :
                     performanceData.overallScore >= 60 ? 'Needs Work' : 'Poor'}
                  </Badge>
                </div>
                <Progress value={performanceData.overallScore} className="w-64" />
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Response: {performanceData.reactionTime}s
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Actions: {performanceData.correctActions}/{performanceData.totalActions}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Analysis Loading */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Brain className="w-12 h-12 text-blue-500" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">AI Analyzing Your Performance...</h3>
            <p className="text-gray-600">Generating personalized feedback and recommendations</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High Priority Feedback */}
      <AnimatePresence>
        {!isAnalyzing && highPriorityItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold">Priority Improvements</h2>
            </div>
            
            {highPriorityItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className={`${getTypeColor(item.type)} border-l-4 border-l-red-500`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(item.type)}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                            {item.score}/100
                          </span>
                        </div>
                        <p className="font-medium">{item.message}</p>
                        <p className="text-sm text-gray-600">{item.suggestion}</p>
                        {item.moduleReference && (
                          <div className="flex items-center gap-2 pt-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                              Review: {item.moduleReference}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other Feedback */}
      <AnimatePresence>
        {!isAnalyzing && otherItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Additional Insights</h2>
            </div>
            
            {otherItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className={getTypeColor(item.type)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(item.type)}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                            {item.score}/100
                          </span>
                        </div>
                        <p className="font-medium">{item.message}</p>
                        <p className="text-sm text-gray-600">{item.suggestion}</p>
                        {item.moduleReference && (
                          <div className="flex items-center gap-2 pt-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                              Review: {item.moduleReference}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {!isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 pt-6"
          >
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Drill
              </Button>
            )}
            {onContinue && (
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Continue Learning
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}