import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Target, 
  TrendingUp,
  Users,
  Award,
  Zap,
  ArrowLeft,
  Calendar,
  MapPin,
  BookOpen,
  Activity
} from 'lucide-react';
import { db, LeaderboardEntry } from '../utils/database';

interface LeaderboardProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

export function Leaderboard({ userData, isAuthenticated, onNavigate }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [globalStats, setGlobalStats] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState('overall');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLeaderboardData();
  }, [userData]);

  const loadLeaderboardData = async () => {
    setRefreshing(true);
    
    // Get leaderboard data
    const leaderboardData = db.getLeaderboard(50);
    setLeaderboard(leaderboardData);

    // Get user rank if authenticated
    if (isAuthenticated && userData) {
      const rank = db.getUserRank(userData.userId);
      setUserRank(rank);
    }

    // Get global stats
    const stats = db.getGlobalStats();
    setGlobalStats(stats);

    setTimeout(() => setRefreshing(false), 500);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-amber-500';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Advanced': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'High Achiever': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Certified': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Achievement Hunter': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUserPosition = () => {
    if (!isAuthenticated || !userData) return null;
    return leaderboard.find(entry => entry.userId === userData.userId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div 
            className="p-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Suraksha Leaderboard
            </h1>
            <p className="text-muted-foreground">Compete with learners nationwide</p>
          </div>
        </div>
      </motion.div>

      {/* Global Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Users className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
            <div className="text-2xl font-bold text-foreground">{globalStats.totalUsers || 0}</div>
            <div className="text-sm text-muted-foreground">Total Learners</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-green-600 dark:text-green-400" />
            <div className="text-2xl font-bold text-foreground">{globalStats.totalQuizzes || 0}</div>
            <div className="text-sm text-muted-foreground">Quizzes Completed</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Target className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400" />
            <div className="text-2xl font-bold text-foreground">{globalStats.totalDrills || 0}</div>
            <div className="text-sm text-muted-foreground">Drills Practiced</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <Activity className="w-8 h-8 mx-auto text-red-600 dark:text-red-400" />
            <div className="text-2xl font-bold text-foreground">{leaderboard.length}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Position (if authenticated) */}
      {isAuthenticated && userData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Star className="w-5 h-5 text-yellow-500" />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getUserPosition() ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(userRank)}
                      <span className="text-lg font-bold text-foreground">Rank #{userRank}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {userData.totalPoints || 0} points • Level {userData.level || 1}
                    </div>
                  </div>
                  <Button 
                    onClick={() => onNavigate('progress')} 
                    variant="outline"
                    className="bg-background"
                  >
                    View Details
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Complete quizzes and drills to appear on the leaderboard!</p>
                  <Button 
                    onClick={() => onNavigate('quizzes')} 
                    className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Start Learning
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          onClick={loadLeaderboardData}
          disabled={refreshing}
          variant="outline"
          className="flex items-center gap-2"
        >
          <TrendingUp className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Rankings'}
        </Button>
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Rankings based on total points earned across all activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {leaderboard.slice(0, 20).map((entry, index) => (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      userData?.userId === entry.userId 
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700' 
                        : 'bg-card hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                        </div>

                        {/* Avatar */}
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={entry.avatar} />
                          <AvatarFallback className={`bg-gradient-to-r ${getRankColor(entry.rank)} text-white`}>
                            {entry.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{entry.name}</h3>
                            {entry.rank <= 3 && (
                              <Badge className={`${getBadgeColor('Expert')} text-xs`}>
                                Top {entry.rank}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {entry.institution}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Active {formatDate(entry.recentActivity)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-foreground">{entry.points.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">pts</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Level {entry.level}</span>
                          <span>{entry.totalQuizzes + entry.totalDrills} activities</span>
                          <span>{entry.averageScore}% avg</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    {entry.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
                        {entry.badges.map((badge, badgeIndex) => (
                          <Badge 
                            key={badgeIndex} 
                            variant="secondary" 
                            className={`text-xs ${getBadgeColor(badge)}`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {leaderboard.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Rankings Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to complete activities and claim the top spot!
                </p>
                <Button 
                  onClick={() => onNavigate('quizzes')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Start Learning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
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