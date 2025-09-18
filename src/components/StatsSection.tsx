import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, Users, BookOpen, Target, Clock, Star } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      title: "Active Students",
      value: "12,847",
      description: "Currently enrolled",
      change: "+23% this month",
      color: "text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Modules Completed",
      value: "89,432",
      description: "Total completions",
      change: "+15% this week",
      color: "text-green-600"
    },
    {
      icon: Trophy,
      title: "Certificates Earned",
      value: "5,234",
      description: "Fully certified students",
      change: "+8% this month",
      color: "text-yellow-600"
    },
    {
      icon: Target,
      title: "Average Score",
      value: "94.2%",
      description: "Quiz performance",
      change: "+2.1% improvement",
      color: "text-purple-600"
    }
  ];

  const leaderboard = [
    { name: "Madan Mohan Malviya University Of Technology Gorakhpur", score: 2840, level: "Expert", badge: "🥇" },
    { name: "IIT Delhi", score: 2730, level: "Expert", badge: "🥈" },
    { name: "DDU University", score: 2650, level: "Advanced", badge: "🥉" },
    { name: "KNIT Sultanpur", score: 2580, level: "Advanced", badge: "🏆" },
    { name: "IET Lucknow", score: 2490, level: "Intermediate", badge: "⭐" }
  ];

  const recentActivity = [
    { user: "Prakhar Shukla", action: "Completed Fire Safety Module", time: "2 mins ago", points: "+50" },
    { user: "Vishnoo Singh", action: "Finished Earthquake Drill", time: "5 mins ago", points: "+100" },
    { user: "Samaya", action: "Earned Flood Response Badge", time: "8 mins ago", points: "+75" },
    { user: "Krishna Bansal", action: "Perfect Quiz Score", time: "12 mins ago", points: "+25" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="w-fit mx-auto">
            📊 Live Statistics
          </Badge>
          <h2 className="text-3xl lg:text-5xl tracking-tight">
            Real-time Learning
            <span className="text-red-600"> Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Track progress, celebrate achievements, and see how our community 
            is building disaster preparedness skills together.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <div className={`mx-auto p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-3xl">{stat.value}</h3>
                <CardTitle className="text-base">{stat.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Top Performing Schools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.map((school, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{school.badge}</span>
                    <div>
                      <p className="font-medium">{school.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {school.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {school.score} points
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Progress value={(school.score / 3000) * 100} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.points}
                  </Badge>
                </div>
              ))}
              
              <div className="mt-4 p-3 rounded-lg border border-dashed text-center">
                <Star className="h-5 w-5 mx-auto text-yellow-500 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Join the activity! Complete a module to appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}