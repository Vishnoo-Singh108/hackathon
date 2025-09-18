import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  Flame,
  Earth,
  CloudRain,
  Wind,
  Zap,
  BookOpen,
  Award,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';
import { db } from '../utils/database';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface ProgressTrackingProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

const performanceData = [
  { week: 'Week 1', quizScore: 65, drillScore: 70, overallScore: 67 },
  { week: 'Week 2', quizScore: 72, drillScore: 78, overallScore: 75 },
  { week: 'Week 3', quizScore: 85, drillScore: 82, overallScore: 83 },
  { week: 'Week 4', quizScore: 88, drillScore: 85, overallScore: 86 },
  { week: 'Week 5', quizScore: 92, drillScore: 88, overallScore: 90 },
];

const categoryData = [
  { category: 'Fire Safety', completed: 8, total: 10, score: 88 },
  { category: 'Earthquake', completed: 6, total: 8, score: 75 },
  { category: 'Flood Safety', completed: 4, total: 6, score: 82 },
  { category: 'Severe Weather', completed: 3, total: 5, score: 70 },
  { category: 'Electrical Safety', completed: 5, total: 7, score: 92 },
];

const pieData = [
  { name: 'Completed', value: 26, color: '#10b981' },
  { name: 'In Progress', value: 8, color: '#f59e0b' },
  { name: 'Not Started', value: 2, color: '#ef4444' },
];

const achievements = [
  {
    id: '1',
    title: 'Fire Safety Expert',
    description: 'Completed all fire safety modules with 85%+ score',
    icon: Flame,
    earned: true,
    date: '2024-01-15',
    points: 500,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: '2',
    title: 'Quiz Master',
    description: 'Completed 10 quizzes with perfect scores',
    icon: Trophy,
    earned: true,
    date: '2024-01-20',
    points: 750,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: '3',
    title: 'Drill Sergeant',
    description: 'Completed 5 emergency drills successfully',
    icon: Target,
    earned: false,
    date: null,
    points: 600,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '4',
    title: 'Safety Ambassador',
    description: 'Helped 10 fellow students in emergency scenarios',
    icon: Award,
    earned: false,
    date: null,
    points: 1000,
    color: 'from-purple-500 to-indigo-500'
  }
];

const recentActivity = [
  {
    id: '1',
    type: 'quiz',
    title: 'Fire Safety Quiz',
    score: 92,
    date: '2024-01-22',
    icon: Flame,
    color: 'text-red-600'
  },
  {
    id: '2',
    type: 'drill',
    title: 'Earthquake Response Drill',
    score: 85,
    date: '2024-01-21',
    icon: Earth,
    color: 'text-amber-600'
  },
  {
    id: '3',
    type: 'module',
    title: 'Flood Evacuation Module',
    score: 88,
    date: '2024-01-20',
    icon: BookOpen,
    color: 'text-blue-600'
  },
  {
    id: '4',
    type: 'quiz',
    title: 'Electrical Safety Quiz',
    score: 95,
    date: '2024-01-19',
    icon: Zap,
    color: 'text-yellow-600'
  },
  {
    id: '5',
    type: 'drill',
    title: 'Fire Evacuation Drill',
    score: 90,
    date: '2024-01-18',
    icon: Flame,
    color: 'text-red-600'
  }
];

export function ProgressTracking({ userData, isAuthenticated, onNavigate }: ProgressTrackingProps) {

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const overallProgress = Math.round((26 / 36) * 100); // 26 completed out of 36 total

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Progress Tracking
            </h1>
            <p className="text-gray-600">Monitor your learning journey and achievements</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
            <Progress value={overallProgress} className="mt-3" />
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
            <div className="flex justify-center mt-3">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">26</div>
            <div className="text-sm text-gray-600">Modules Completed</div>
            <Badge className="mt-3" variant="outline">of 36 total</Badge>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">87%</div>
            <div className="text-sm text-gray-600">Average Score</div>
            <div className="flex justify-center mt-3">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Category Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress by Category</CardTitle>
                  <CardDescription>Your progress across different safety categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryData.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{category.score}%</Badge>
                          <span className="text-sm text-gray-600">
                            {category.completed}/{category.total}
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={(category.completed / category.total) * 100} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Completion Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Status</CardTitle>
                  <CardDescription>Overview of your learning module status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {pieData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div 
                          className="w-4 h-4 rounded mx-auto"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div className="text-sm font-medium">{item.value}</div>
                        <div className="text-xs text-gray-600">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Your learning performance over the past 5 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="quizScore" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Quiz Scores"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="drillScore" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        name="Drill Scores"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="overallScore" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Overall Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Your average scores by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Areas</CardTitle>
                  <CardDescription>Categories that need more attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryData
                    .filter(cat => cat.score < 80)
                    .map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <div className="font-medium">{category.category}</div>
                          <div className="text-sm text-gray-600">Current: {category.score}%</div>
                        </div>
                        <Button size="sm" variant="outline">
                          Study More
                        </Button>
                      </div>
                    ))}
                  {categoryData.filter(cat => cat.score < 80).length === 0 && (
                    <div className="text-center text-gray-600 py-8">
                      <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                      <p>Great job! All categories are performing well.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`relative overflow-hidden ${achievement.earned ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${achievement.color} opacity-20`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} ${achievement.earned ? '' : 'opacity-50'}`}>
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            {achievement.earned && (
                              <Badge className="bg-green-100 text-green-800">Earned</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{achievement.points} points</span>
                            </div>
                            {achievement.earned && achievement.date && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                {achievement.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities and scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activity.color.includes('red') ? 'bg-red-100' : 
                                                      activity.color.includes('amber') ? 'bg-amber-100' :
                                                      activity.color.includes('blue') ? 'bg-blue-100' :
                                                      activity.color.includes('yellow') ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-600 capitalize">{activity.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{activity.score}%</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}