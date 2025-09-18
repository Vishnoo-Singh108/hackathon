import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Mail, 
  School, 
  Phone, 
  Calendar, 
  MapPin, 
  Contact, 
  Edit3, 
  Save, 
  X,
  Trophy,
  Award,
  Target,
  BookOpen,
  Activity,
  TrendingUp,
  Star,
  ArrowLeft,
  Settings,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import { db } from '../utils/database';

interface ProfilePageProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
  onUserUpdate: (userData: any) => void;
}

export function ProfilePage({ userData, isAuthenticated, onNavigate, onUserUpdate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData || {});
  const [userStats, setUserStats] = useState<any>({});
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    if (userData && isAuthenticated) {
      setEditedData(userData);
      loadUserStats();
    }
  }, [userData, isAuthenticated]);

  const loadUserStats = () => {
    if (userData?.userId) {
      const stats = db.getUserStats(userData.userId);
      setUserStats(stats || {});
      setAchievements(userData.achievements || []);
    }
  };

  const handleSave = () => {
    if (userData?.userId) {
      const updatedUser = db.updateUserProfile(userData.userId, editedData);
      if (updatedUser) {
        onUserUpdate(updatedUser);
        setIsEditing(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCompletionRate = () => {
    const totalActivities = (userStats.totalQuizzes || 0) + (userStats.totalDrills || 0) + (userStats.totalModules || 0);
    return totalActivities > 0 ? Math.round((totalActivities / 50) * 100) : 0; // Assuming 50 total activities
  };

  const getLevelProgress = () => {
    const currentLevel = userData?.level || 1;
    const pointsForCurrentLevel = (currentLevel - 1) * 1000;
    const pointsForNextLevel = currentLevel * 1000;
    const currentPoints = userData?.totalPoints || 0;
    const progressInLevel = currentPoints - pointsForCurrentLevel;
    const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel;
    
    return Math.round((progressInLevel / pointsNeededForLevel) * 100);
  };

  if (!isAuthenticated || !userData) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <Card className="p-8">
          <CardContent>
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Required</h2>
            <p className="text-muted-foreground mb-4">Please log in to view your profile</p>
            <Button onClick={() => onNavigate('home')} className="bg-gradient-to-r from-blue-600 to-purple-600">
              Go to Home
            </Button>
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
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Profile Summary */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.profilePicture} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                      {userData.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl text-foreground">{userData.fullName}</CardTitle>
                <CardDescription>{userData.role} • {userData.institution}</CardDescription>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Level {userData.level || 1}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Rank #{userStats.rank || 'Unranked'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Level Progress</span>
                    <span className="text-foreground">{getLevelProgress()}%</span>
                  </div>
                  <Progress value={getLevelProgress()} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="text-lg font-bold text-foreground">{userData.totalPoints || 0}</div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                  <div className="p-3 bg-accent rounded-lg">
                    <div className="text-lg font-bold text-foreground">{userStats.totalCertificates || 0}</div>
                    <div className="text-xs text-muted-foreground">Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Activity className="w-5 h-5" />
                  Learning Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-foreground">{userStats.totalQuizzes || 0}</div>
                    <div className="text-sm text-muted-foreground">Quizzes Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                    <Target className="w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-foreground">{userStats.totalDrills || 0}</div>
                    <div className="text-sm text-muted-foreground">Drills Practiced</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-foreground">{userStats.totalAchievements || 0}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-lg">
                    <Star className="w-8 h-8 mx-auto text-yellow-600 dark:text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold text-foreground">{getCompletionRate()}%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Last Login</div>
                    <div className="text-xs text-muted-foreground">{formatDate(userData.lastLoginAt)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Account Created</div>
                    <div className="text-xs text-muted-foreground">{formatDate(userData.createdAt)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Personal Information</CardTitle>
              <CardDescription>Manage your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editedData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-foreground">Institution</Label>
                  <Input
                    id="institution"
                    value={editedData.institution || ''}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-foreground">Student ID</Label>
                  <Input
                    id="studentId"
                    value={editedData.studentId || ''}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-foreground">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editedData.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">Address</Label>
                <Textarea
                  id="address"
                  value={editedData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="bg-background"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-foreground">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={editedData.emergencyContact || ''}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                  className="bg-background"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Award className="w-5 h-5" />
                Achievements & Badges
              </CardTitle>
              <CardDescription>Your accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800"
                    >
                      <div className="flex items-start gap-3">
                        <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="text-xs text-muted-foreground">
                            Earned {formatDate(achievement.earnedAt)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Achievements Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete activities to earn achievements and badges!
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
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="w-5 h-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive updates about your progress</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Data Privacy</div>
                    <div className="text-sm text-muted-foreground">Manage your data and privacy settings</div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Account Security</div>
                    <div className="text-sm text-muted-foreground">Update password and security settings</div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}