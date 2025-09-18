import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Gamepad2, Users, BarChart3, Clock, Award } from "lucide-react";

interface FeaturesSectionProps {
  onNavigate: (page: string) => void;
}

export function FeaturesSection({ onNavigate }: FeaturesSectionProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning Modules",
      description: "Comprehensive courses covering earthquakes, fires, floods, and more with multimedia content and real scenarios.",
      badge: "25+ Modules",
      color: "text-blue-600"
    },
    {
      icon: Gamepad2,
      title: "Gamified Quizzes",
      description: "Engaging assessments with points, badges, and leaderboards to make learning fun and competitive.",
      badge: "500+ Questions",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Mock Emergency Drills",
      description: "Virtual and real-world practice scenarios to prepare students for actual emergency situations.",
      badge: "10+ Scenarios",
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Detailed analytics for teachers and students to monitor learning progress and skill development.",
      badge: "Real-time",
      color: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Emergency Response Timer",
      description: "Practice quick decision-making with timed scenarios that simulate real emergency pressure.",
      badge: "Instant Results",
      color: "text-red-600"
    },
    {
      icon: Award,
      title: "Certification System",
      description: "Earn certificates and badges as you complete modules and demonstrate emergency preparedness skills.",
      badge: "Official Certs",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="outline" className="w-fit mx-auto border-blue-500 text-blue-600 bg-blue-50">
              🎯 Key Features
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-3xl lg:text-5xl tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Everything You Need for
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Emergency Preparedness</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our comprehensive platform combines education, gamification, and practical training 
            to create confident, prepared students.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-br ${
                        index % 6 === 0 ? 'from-blue-100 to-blue-200' :
                        index % 6 === 1 ? 'from-green-100 to-green-200' :
                        index % 6 === 2 ? 'from-purple-100 to-purple-200' :
                        index % 6 === 3 ? 'from-orange-100 to-orange-200' :
                        index % 6 === 4 ? 'from-red-100 to-red-200' :
                        'from-yellow-100 to-yellow-200'
                      } shadow-sm`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          index % 6 === 0 ? 'bg-blue-100 text-blue-700' :
                          index % 6 === 1 ? 'bg-green-100 text-green-700' :
                          index % 6 === 2 ? 'bg-purple-100 text-purple-700' :
                          index % 6 === 3 ? 'bg-orange-100 text-orange-700' :
                          index % 6 === 4 ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {feature.badge}
                      </Badge>
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-xl relative z-10">{feature.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}