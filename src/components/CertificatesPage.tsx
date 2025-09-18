import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  Star,
  ArrowLeft,
  Trophy,
  Shield,
  Flame,
  Earth,
  CloudRain,
  Wind,
  Zap,
  Medal,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { db } from '../utils/database';

interface CertificatesPageProps {
  userData: any;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
}

interface Certificate {
  id: string;
  type: string;
  disasterType: string;
  level: string;
  issuedAt: string;
  score: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
}

const availableCertificates = [
  {
    type: 'quiz',
    disasterType: 'fire',
    title: 'Fire Safety Specialist',
    description: 'Demonstrates comprehensive knowledge of fire safety protocols and emergency response procedures',
    icon: Flame,
    color: 'text-red-600',
    gradient: 'from-red-500 to-orange-500',
    requirements: 'Complete Fire Safety Quiz with 80%+ score'
  },
  {
    type: 'drill',
    disasterType: 'fire',
    title: 'Fire Emergency Response Expert',
    description: 'Proven ability to execute fire evacuation procedures under pressure',
    icon: Shield,
    color: 'text-red-600',
    gradient: 'from-red-600 to-red-800',
    requirements: 'Complete Fire Drill with 85%+ score and ≤2 mistakes'
  },
  {
    type: 'quiz',
    disasterType: 'earthquake',
    title: 'Earthquake Preparedness Certified',
    description: 'Expert knowledge in earthquake safety measures and response techniques',
    icon: Earth,
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-yellow-500',
    requirements: 'Complete Earthquake Quiz with 80%+ score'
  },
  {
    type: 'quiz',
    disasterType: 'flood',
    title: 'Flood Safety Specialist',
    description: 'Comprehensive understanding of flood response and water safety protocols',
    icon: CloudRain,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    requirements: 'Complete Flood Safety Quiz with 80%+ score'
  },
  {
    type: 'quiz',
    disasterType: 'tornado',
    title: 'Severe Weather Response Expert',
    description: 'Advanced knowledge of tornado and severe weather safety procedures',
    icon: Wind,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500',
    requirements: 'Complete Tornado Quiz with 80%+ score'
  },
  {
    type: 'quiz',
    disasterType: 'electrical',
    title: 'Electrical Safety Certified',
    description: 'Expert understanding of electrical hazards and emergency procedures',
    icon: Zap,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500',
    requirements: 'Complete Electrical Safety Quiz with 80%+ score'
  }
];

export function CertificatesPage({ userData, isAuthenticated, onNavigate }: CertificatesPageProps) {
  const [userCertificates, setUserCertificates] = useState<Certificate[]>([]);
  const [filter, setFilter] = useState<'all' | 'earned' | 'available'>('all');

  useEffect(() => {
    if (isAuthenticated && userData) {
      // Get user certificates from database
      const user = db.getCurrentUser();
      if (user && user.certificates) {
        const certificates = user.certificates.map(cert => {
          const template = availableCertificates.find(
            ac => ac.type === cert.type && ac.disasterType === cert.disasterType
          );
          return {
            ...cert,
            title: template?.title || `${cert.disasterType} ${cert.type} Certificate`,
            description: template?.description || 'Certificate of completion',
            icon: template?.icon || Award,
            color: template?.color || 'text-blue-600',
            gradient: template?.gradient || 'from-blue-500 to-purple-500'
          };
        });
        setUserCertificates(certificates);
      }
    }
  }, [isAuthenticated, userData]);

  const downloadCertificate = (certificate: Certificate) => {
    // In a real app, this would generate and download a PDF certificate
    const certificateData = {
      recipientName: userData?.fullName || 'Student',
      certificateTitle: certificate.title,
      issuedDate: new Date(certificate.issuedAt).toLocaleDateString(),
      score: certificate.score,
      certificateId: certificate.id
    };
    
    console.log('Downloading certificate:', certificateData);
    alert(`Certificate "${certificate.title}" would be downloaded as PDF`);
  };

  const shareCertificate = (certificate: Certificate) => {
    const shareText = `I just earned the "${certificate.title}" certificate with a score of ${certificate.score}% on SafeEdu! 🏆`;
    
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Certificate info copied to clipboard!');
    }
  };

  const getFilteredCertificates = () => {
    const earnedCerts = userCertificates;
    const availableCerts = availableCertificates.filter(ac => 
      !earnedCerts.some(ec => ec.type === ac.type && ec.disasterType === ac.disasterType)
    );

    switch (filter) {
      case 'earned':
        return { earned: earnedCerts, available: [] };
      case 'available':
        return { earned: [], available: availableCerts };
      default:
        return { earned: earnedCerts, available: availableCerts };
    }
  };

  const { earned, available } = getFilteredCertificates();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to view your certificates and achievements.</p>
            <Button onClick={() => onNavigate('home')} className="w-full">
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
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Certificates & Achievements
            </h1>
            <p className="text-gray-600">Your earned certificates and available achievements</p>
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

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-green-600">{userCertificates.length}</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">{availableCertificates.length}</div>
            <div className="text-sm text-gray-600">Total Available</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((userCertificates.length / availableCertificates.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-yellow-600">
              {userCertificates.reduce((avg, cert) => avg + cert.score, 0) / Math.max(userCertificates.length, 1)}%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2"
      >
        {[
          { key: 'all', label: 'All Certificates' },
          { key: 'earned', label: 'Earned' },
          { key: 'available', label: 'Available' }
        ].map((filterOption) => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption.key as any)}
            size="sm"
          >
            {filterOption.label}
          </Button>
        ))}
      </motion.div>

      {/* Earned Certificates */}
      {(filter === 'all' || filter === 'earned') && earned.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Earned Certificates ({earned.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {earned.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${certificate.gradient}`}>
                          <certificate.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <Badge className="bg-green-100 text-green-800">Earned</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <CardTitle className="text-lg">{certificate.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {certificate.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-lg">{certificate.score}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(certificate.issuedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => downloadCertificate(certificate)}
                          className="flex-1"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          onClick={() => shareCertificate(certificate)}
                          variant="outline"
                          size="sm"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Available Certificates */}
      {(filter === 'all' || filter === 'available') && available.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Medal className="w-5 h-5 text-gray-600" />
            Available Certificates ({available.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {available.map((certificate, index) => (
                <motion.div
                  key={`${certificate.type}-${certificate.disasterType}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-gray-50 border-gray-200 hover:shadow-lg transition-all">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${certificate.gradient} opacity-70`}>
                          <certificate.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-gray-600">
                          Not Earned
                        </Badge>
                      </div>
                      
                      <div>
                        <CardTitle className="text-lg text-gray-700">{certificate.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {certificate.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Requirements:</div>
                        <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                          {certificate.requirements}
                        </div>
                      </div>

                      <Button 
                        onClick={() => {
                          if (certificate.type === 'quiz') {
                            onNavigate('quizzes');
                          } else if (certificate.type === 'drill') {
                            onNavigate('drills');
                          }
                        }}
                        className="w-full"
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Start Working Towards This
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {earned.length === 0 && available.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Certificates Found</h3>
          <p className="text-gray-600 mb-6">
            Start learning and taking quizzes to earn your first certificate!
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => onNavigate('learning')}>
              Start Learning
            </Button>
            <Button onClick={() => onNavigate('quizzes')} variant="outline">
              Take a Quiz
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}