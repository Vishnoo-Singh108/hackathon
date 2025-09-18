// Enhanced database simulation using localStorage with proper user management
export interface UserProgress {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  institution: string;
  studentId: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  totalPoints: number;
  level: number;
  rank: number;
  completedQuizzes: {
    [disasterType: string]: {
      [level: string]: {
        score: number;
        completedAt: string;
        attempts: number;
        timeSpent: number;
        percentage: number;
      }
    }
  };
  completedDrills: {
    [disasterType: string]: {
      [drillId: string]: {
        score: number;
        completedAt: string;
        timeToComplete: number;
        mistakes: number;
        perfectExecution: boolean;
      }
    }
  };
  completedModules: {
    [disasterType: string]: {
      [moduleId: string]: {
        completedAt: string;
        timeSpent: number;
        progress: number;
      }
    }
  };
  certificates: {
    id: string;
    type: string;
    disasterType: string;
    level: string;
    issuedAt: string;
    score: number;
    validUntil: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    earnedAt: string;
    category: string;
  }[];
  createdAt: string;
  lastLoginAt: string;
  profilePicture?: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  institution: string;
  points: number;
  level: number;
  rank: number;
  avatar?: string;
  recentActivity: string;
  badges: string[];
  totalQuizzes: number;
  totalDrills: number;
  averageScore: number;
}

export class DatabaseManager {
  private static instance: DatabaseManager;
  private readonly USERS_KEY = 'suraksha_users';
  private readonly CURRENT_USER_KEY = 'suraksha_current_user';
  private readonly LEADERBOARD_KEY = 'suraksha_leaderboard';
  private readonly GLOBAL_STATS_KEY = 'suraksha_global_stats';

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  // User Management
  createUser(userData: any): UserProgress {
    const users = this.getAllUsers();
    
    // Check if user already exists
    const existingUser = Object.values(users).find(u => u.email === userData.email);
    if (existingUser) {
      this.setCurrentUser(existingUser);
      return existingUser;
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newUser: UserProgress = {
      userId,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role || 'student',
      institution: userData.institution || 'Educational Institution',
      studentId: userData.studentId || `SURK${Date.now().toString().slice(-6)}`,
      phone: userData.phone || '',
      dateOfBirth: userData.dateOfBirth || '',
      address: userData.address || '',
      emergencyContact: userData.emergencyContact || '',
      totalPoints: 0,
      level: 1,
      rank: this.getTotalUserCount() + 1,
      completedQuizzes: {},
      completedDrills: {},
      completedModules: {},
      certificates: [],
      achievements: [],
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      profilePicture: userData.profilePicture || ''
    };

    users[userId] = newUser;
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    this.updateGlobalStats();
    return newUser;
  }

  loginUser(email: string): UserProgress | null {
    const users = this.getAllUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (user) {
      user.lastLoginAt = new Date().toISOString();
      users[user.userId] = user;
      this.saveUsers(users);
      this.setCurrentUser(user);
      this.updateLeaderboard();
      return user;
    }
    return null;
  }

  getUserByEmail(email: string): UserProgress | null {
    const users = this.getAllUsers();
    return Object.values(users).find(u => u.email === email) || null;
  }

  getCurrentUser(): UserProgress | null {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userData) {
      const user = JSON.parse(userData);
      // Ensure the user still exists in the database
      const users = this.getAllUsers();
      if (users[user.userId]) {
        return users[user.userId];
      }
    }
    return null;
  }

  setCurrentUser(user: UserProgress): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  updateUserProfile(userId: string, profileData: Partial<UserProgress>): UserProgress | null {
    const users = this.getAllUsers();
    if (users[userId]) {
      users[userId] = { ...users[userId], ...profileData };
      this.saveUsers(users);
      this.setCurrentUser(users[userId]);
      return users[userId];
    }
    return null;
  }

  // Quiz Progress with enhanced tracking
  saveQuizResult(userId: string, disasterType: string, level: string, score: number, attempts: number = 1, timeSpent: number = 0): void {
    const users = this.getAllUsers();
    const user = users[userId];
    
    if (user) {
      if (!user.completedQuizzes[disasterType]) {
        user.completedQuizzes[disasterType] = {};
      }
      
      const percentage = Math.round(score);
      const previousScore = user.completedQuizzes[disasterType][level]?.score || 0;
      
      user.completedQuizzes[disasterType][level] = {
        score: Math.max(score, previousScore), // Keep best score
        completedAt: new Date().toISOString(),
        attempts,
        timeSpent,
        percentage
      };

      // Award points based on score and improvement
      const basePoints = Math.floor(percentage * 10);
      const difficultyMultiplier = this.getDifficultyMultiplier(level);
      const improvementBonus = score > previousScore ? 50 : 0;
      const points = Math.floor(basePoints * difficultyMultiplier) + improvementBonus;
      
      user.totalPoints += points;
      
      // Update level based on total points
      this.updateUserLevel(user);

      // Issue certificate if score is high enough
      if (percentage >= 80) {
        this.issueCertificate(userId, 'quiz', disasterType, level, percentage);
      }

      // Check for achievements
      this.checkAndAwardAchievements(userId, 'quiz', { disasterType, level, score: percentage });

      this.saveUsers(users);
      this.setCurrentUser(user);
      this.updateLeaderboard();
    }
  }

  // Drill Progress
  saveDrillResult(userId: string, disasterType: string, drillId: string, score: number, timeToComplete: number, mistakes: number): void {
    const users = this.getAllUsers();
    const user = users[userId];
    
    if (user) {
      if (!user.completedDrills[disasterType]) {
        user.completedDrills[disasterType] = {};
      }
      
      const perfectExecution = mistakes === 0 && score >= 95;
      
      user.completedDrills[disasterType][drillId] = {
        score,
        completedAt: new Date().toISOString(),
        timeToComplete,
        mistakes,
        perfectExecution
      };

      // Award points based on performance
      const basePoints = score * 15;
      const timeBonus = Math.max(0, 200 - timeToComplete); // Time bonus
      const mistakePenalty = mistakes * 10;
      const perfectBonus = perfectExecution ? 100 : 0;
      const points = Math.max(0, basePoints + timeBonus - mistakePenalty + perfectBonus);
      
      user.totalPoints += points;
      this.updateUserLevel(user);

      // Issue certificate if performance is excellent
      if (score >= 85 && mistakes <= 2) {
        this.issueCertificate(userId, 'drill', disasterType, 'practical', score);
      }

      // Check for achievements
      this.checkAndAwardAchievements(userId, 'drill', { 
        disasterType, 
        drillId, 
        score, 
        perfectExecution,
        timeToComplete,
        mistakes 
      });

      this.saveUsers(users);
      this.setCurrentUser(user);
      this.updateLeaderboard();
    }
  }

  // Enhanced Leaderboard
  getLeaderboard(limit: number = 50, category: string = 'all'): LeaderboardEntry[] {
    const users = this.getAllUsers();
    const userArray = Object.values(users);

    return userArray
      .map(user => {
        const totalQuizzes = Object.values(user.completedQuizzes).reduce((acc, disaster) => 
          acc + Object.keys(disaster).length, 0
        );
        
        const totalDrills = Object.values(user.completedDrills).reduce((acc, disaster) => 
          acc + Object.keys(disaster).length, 0
        );

        // Calculate average score across all activities
        const allScores: number[] = [];
        Object.values(user.completedQuizzes).forEach(disaster => {
          Object.values(disaster).forEach(quiz => allScores.push(quiz.percentage));
        });
        Object.values(user.completedDrills).forEach(disaster => {
          Object.values(disaster).forEach(drill => allScores.push(drill.score));
        });

        const averageScore = allScores.length > 0 
          ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
          : 0;

        const badges = this.getUserBadges(user);

        return {
          userId: user.userId,
          name: user.fullName,
          institution: user.institution,
          points: user.totalPoints,
          level: user.level,
          rank: 0, // Will be set after sorting
          avatar: user.profilePicture || '',
          recentActivity: user.lastLoginAt,
          badges,
          totalQuizzes,
          totalDrills,
          averageScore
        };
      })
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
      .slice(0, limit);
  }

  // Get user rank in leaderboard
  getUserRank(userId: string): number {
    const leaderboard = this.getLeaderboard(1000);
    const userEntry = leaderboard.find(entry => entry.userId === userId);
    return userEntry ? userEntry.rank : 0;
  }

  // Achievement system
  private checkAndAwardAchievements(userId: string, activityType: string, data: any): void {
    const users = this.getAllUsers();
    const user = users[userId];
    if (!user) return;

    const achievements = this.getAvailableAchievements(user, activityType, data);
    
    achievements.forEach(achievement => {
      const hasAchievement = user.achievements.some(a => a.id === achievement.id);
      if (!hasAchievement) {
        user.achievements.push({
          ...achievement,
          earnedAt: new Date().toISOString()
        });
      }
    });
  }

  private getAvailableAchievements(user: UserProgress, activityType: string, data: any): any[] {
    const achievements: any[] = [];

    if (activityType === 'quiz') {
      // First Quiz Achievement
      const totalQuizzes = Object.values(user.completedQuizzes).reduce((acc, disaster) => 
        acc + Object.keys(disaster).length, 0
      );
      
      if (totalQuizzes === 1) {
        achievements.push({
          id: 'first_quiz',
          title: 'First Steps',
          description: 'Completed your first quiz',
          category: 'milestone'
        });
      }

      // Perfect Score Achievement
      if (data.score === 100) {
        achievements.push({
          id: 'perfect_quiz_' + data.disasterType,
          title: 'Perfect Knowledge',
          description: `Achieved 100% on ${data.disasterType} quiz`,
          category: 'excellence'
        });
      }
    }

    if (activityType === 'drill') {
      // Perfect Execution Achievement
      if (data.perfectExecution) {
        achievements.push({
          id: 'perfect_drill_' + data.disasterType,
          title: 'Flawless Execution',
          description: `Perfect drill performance in ${data.disasterType}`,
          category: 'excellence'
        });
      }

      // Speed Achievement
      if (data.timeToComplete < 60) {
        achievements.push({
          id: 'speed_demon',
          title: 'Speed Demon',
          description: 'Completed drill in under 60 seconds',
          category: 'speed'
        });
      }
    }

    return achievements;
  }

  private getUserBadges(user: UserProgress): string[] {
    const badges: string[] = [];
    
    if (user.level >= 10) badges.push('Expert');
    if (user.level >= 5) badges.push('Advanced');
    if (user.totalPoints >= 10000) badges.push('High Achiever');
    if (user.certificates.length >= 5) badges.push('Certified');
    if (user.achievements.length >= 10) badges.push('Achievement Hunter');

    return badges;
  }

  private updateUserLevel(user: UserProgress): void {
    const newLevel = Math.floor(user.totalPoints / 1000) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }
  }

  private getDifficultyMultiplier(level: string): number {
    const multipliers: { [key: string]: number } = {
      '1': 1.0,
      '2': 1.2,
      '3': 1.5,
      '4': 1.8,
      '5': 2.0
    };
    return multipliers[level] || 1.0;
  }

  private updateLeaderboard(): void {
    const leaderboard = this.getLeaderboard(100);
    localStorage.setItem(this.LEADERBOARD_KEY, JSON.stringify(leaderboard));
  }

  private updateGlobalStats(): void {
    const users = this.getAllUsers();
    const totalUsers = Object.keys(users).length;
    const totalQuizzes = Object.values(users).reduce((acc, user) => 
      acc + Object.values(user.completedQuizzes).reduce((qacc, disaster) => 
        qacc + Object.keys(disaster).length, 0
      ), 0
    );
    
    const stats = {
      totalUsers,
      totalQuizzes,
      totalDrills: Object.values(users).reduce((acc, user) => 
        acc + Object.values(user.completedDrills).reduce((dacc, disaster) => 
          dacc + Object.keys(disaster).length, 0
        ), 0
      ),
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(this.GLOBAL_STATS_KEY, JSON.stringify(stats));
  }

  getGlobalStats(): any {
    const data = localStorage.getItem(this.GLOBAL_STATS_KEY);
    return data ? JSON.parse(data) : { totalUsers: 0, totalQuizzes: 0, totalDrills: 0 };
  }

  private getTotalUserCount(): number {
    return Object.keys(this.getAllUsers()).length;
  }

  // Certificate Management
  issueCertificate(userId: string, type: string, disasterType: string, level: string, score: number): void {
    const users = this.getAllUsers();
    const user = users[userId];
    
    if (user) {
      // Check if certificate already exists
      const exists = user.certificates.some(cert => 
        cert.type === type && cert.disasterType === disasterType && cert.level === level
      );

      if (!exists) {
        const certificate = {
          id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type,
          disasterType,
          level,
          issuedAt: new Date().toISOString(),
          validUntil: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(), // Valid for 1 year
          score
        };

        user.certificates.push(certificate);
        this.saveUsers(users);
        this.setCurrentUser(user);
      }
    }
  }

  // Statistics
  getUserStats(userId: string): any {
    const users = this.getAllUsers();
    const user = users[userId];
    
    if (!user) return null;

    const totalQuizzes = Object.values(user.completedQuizzes).reduce((acc, disaster) => 
      acc + Object.keys(disaster).length, 0
    );
    
    const totalDrills = Object.values(user.completedDrills).reduce((acc, disaster) => 
      acc + Object.keys(disaster).length, 0
    );
    
    const totalModules = Object.values(user.completedModules).reduce((acc, disaster) => 
      acc + Object.keys(disaster).length, 0
    );

    const rank = this.getUserRank(userId);

    return {
      totalPoints: user.totalPoints,
      level: user.level,
      rank,
      totalQuizzes,
      totalDrills,
      totalModules,
      totalCertificates: user.certificates.length,
      totalAchievements: user.achievements.length,
      lastActivity: user.lastLoginAt,
      joinedDate: user.createdAt
    };
  }

  // Private helpers
  private getAllUsers(): {[key: string]: UserProgress} {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : {};
  }

  private saveUsers(users: {[key: string]: UserProgress}): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Utility methods
  searchUsers(query: string): UserProgress[] {
    const users = this.getAllUsers();
    return Object.values(users).filter(user => 
      user.fullName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.institution.toLowerCase().includes(query.toLowerCase())
    );
  }

  deleteUser(userId: string): boolean {
    const users = this.getAllUsers();
    if (users[userId]) {
      delete users[userId];
      this.saveUsers(users);
      this.updateLeaderboard();
      return true;
    }
    return false;
  }
}

export const db = DatabaseManager.getInstance();