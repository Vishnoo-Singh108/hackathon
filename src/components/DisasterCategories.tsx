import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Flame, Waves, Wind, Mountain, Zap, Users } from "lucide-react";

interface DisasterCategoriesProps {
  onNavigate: (page: string) => void;
}

export function DisasterCategories({ onNavigate }: DisasterCategoriesProps) {
  const categories = [
    {
      icon: Flame,
      title: "Fire Safety",
      description: "Learn fire prevention, evacuation procedures, and emergency response protocols for schools and colleges.",
      image: "https://images.unsplash.com/photo-1651368615152-0f793d44e32e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwc2FmZXR5JTIwZHJpbGwlMjBzY2hvb2x8ZW58MXx8fHwxNzU3ODc1MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      modules: 8,
      difficulty: "Beginner",
      color: "text-red-600"
    },
    {
      icon: Mountain,
      title: "Earthquake Preparedness",
      description: "Master drop, cover, and hold techniques along with building safety and post-earthquake protocols.",
      image: "https://images.unsplash.com/photo-1661520754901-bb5d6b374fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwcHJlcGFyZWRuZXNzJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1Nzg3NTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      modules: 6,
      difficulty: "Intermediate",
      color: "text-orange-600"
    },
    {
      icon: Waves,
      title: "Flood Management",
      description: "Understand flood risks, evacuation routes, and water safety measures for educational institutions.",
      image: "https://images.unsplash.com/photo-1651183096610-fd4fbeae3487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGVtZXJnZW5jeSUyMGF3YXJlbmVzc3xlbnwxfHx8fDE3NTc4NzUyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      modules: 5,
      difficulty: "Beginner",
      color: "text-blue-600"
    },
    {
      icon: Wind,
      title: "Severe Weather",
      description: "Prepare for storms, hurricanes, tornadoes, and other extreme weather events with comprehensive training.",
      image: "https://images.unsplash.com/photo-1689307181986-8b2c2afb58c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBkaXNhc3RlciUyMHByZXBhcmVkbmVzcyUyMHNjaG9vbHxlbnwxfHx8fDE3NTc4NzUyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      modules: 4,
      difficulty: "Intermediate",
      color: "text-gray-600"
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="w-fit mx-auto">
            🎓 Learning Categories
          </Badge>
          <h2 className="text-3xl lg:text-5xl tracking-tight">
            Master Every Type of
            <span className="text-red-600"> Emergency</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Comprehensive training modules covering all major disaster types 
            with specialized content for educational environments.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" 
                    whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg border border-white/30`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  >
                    <div>
                      <h3 className="text-xl text-white drop-shadow-lg">{category.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-white/90 text-gray-800 hover:bg-white transition-colors"
                        >
                          {category.modules} Modules
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        >
                          {category.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <CardHeader>
                  <CardDescription className="text-base leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full group/btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => onNavigate('learning')}
                    >
                      Start Learning
                      <motion.div
                        className="ml-2"
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}