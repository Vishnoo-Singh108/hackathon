import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  Users, 
  Shield,
  Flame,
  Earth,
  CloudRain,
  Wind,
  Zap,
  ArrowLeft,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface SafetySpot {
  id: string;
  name: string;
  type: 'evacuation' | 'shelter' | 'medical' | 'assembly';
  distance: string;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  coordinates: { lat: number; lng: number };
  address: string;
  contact: string;
}

interface EmergencyResponseProps {
  onNavigate: (page: string) => void;
}

const disasterTypes = [
  { id: 'fire', name: 'Fire Emergency', icon: Flame, color: 'text-red-600', bgColor: 'bg-red-50' },
  { id: 'earthquake', name: 'Earthquake', icon: Earth, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 'flood', name: 'Flood', icon: CloudRain, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'tornado', name: 'Tornado/Storm', icon: Wind, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { id: 'electrical', name: 'Power Emergency', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
];

const safetySpots: { [key: string]: SafetySpot[] } = {
  fire: [
    {
      id: 'fire-1',
      name: 'Main Campus Assembly Point A',
      type: 'assembly',
      distance: '0.2 km',
      capacity: 500,
      currentOccupancy: 23,
      facilities: ['First Aid', 'Water Supply', 'Emergency Phones'],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      address: 'Central Quad, Main Campus',
      contact: '+1 (555) 123-4567'
    },
    {
      id: 'fire-2',
      name: 'Emergency Shelter - Gymnasium',
      type: 'shelter',
      distance: '0.5 km',
      capacity: 200,
      currentOccupancy: 8,
      facilities: ['Medical Unit', 'Food Service', 'Rest Areas', 'Communication Center'],
      coordinates: { lat: 40.7130, lng: -74.0058 },
      address: 'Sports Complex, Building C',
      contact: '+1 (555) 123-4568'
    },
    {
      id: 'fire-3',
      name: 'Medical Emergency Station',
      type: 'medical',
      distance: '0.3 km',
      capacity: 50,
      currentOccupancy: 2,
      facilities: ['Medical Equipment', 'Trained Staff', 'Ambulance Access'],
      coordinates: { lat: 40.7125, lng: -74.0062 },
      address: 'Health Center, Building D',
      contact: '+1 (555) 123-4569'
    }
  ],
  earthquake: [
    {
      id: 'eq-1',
      name: 'Seismic Safe Zone - Open Field',
      type: 'assembly',
      distance: '0.1 km',
      capacity: 1000,
      currentOccupancy: 45,
      facilities: ['Open Space', 'Away from Buildings', 'Emergency Supplies'],
      coordinates: { lat: 40.7129, lng: -74.0059 },
      address: 'Athletic Field, Main Campus',
      contact: '+1 (555) 123-4570'
    },
    {
      id: 'eq-2',
      name: 'Reinforced Emergency Bunker',
      type: 'shelter',
      distance: '0.4 km',
      capacity: 300,
      currentOccupancy: 12,
      facilities: ['Structural Safety', 'Emergency Supplies', 'Communication'],
      coordinates: { lat: 40.7127, lng: -74.0061 },
      address: 'Emergency Services Building',
      contact: '+1 (555) 123-4571'
    }
  ],
  flood: [
    {
      id: 'flood-1',
      name: 'High Ground Assembly - Library',
      type: 'assembly',
      distance: '0.3 km',
      capacity: 400,
      currentOccupancy: 18,
      facilities: ['Elevated Location', 'Multiple Exits', 'Emergency Power'],
      coordinates: { lat: 40.7131, lng: -74.0057 },
      address: 'Central Library, 3rd Floor',
      contact: '+1 (555) 123-4572'
    },
    {
      id: 'flood-2',
      name: 'Elevated Emergency Shelter',
      type: 'shelter',
      distance: '0.6 km',
      capacity: 250,
      currentOccupancy: 6,
      facilities: ['Above Flood Level', 'Emergency Supplies', 'Boat Access'],
      coordinates: { lat: 40.7133, lng: -74.0055 },
      address: 'Tower Building, Upper Floors',
      contact: '+1 (555) 123-4573'
    }
  ],
  tornado: [
    {
      id: 'tornado-1',
      name: 'Underground Storm Shelter',
      type: 'shelter',
      distance: '0.2 km',
      capacity: 300,
      currentOccupancy: 15,
      facilities: ['Underground Protection', 'Reinforced Structure', 'Emergency Supplies'],
      coordinates: { lat: 40.7126, lng: -74.0063 },
      address: 'Basement Level, Administration Building',
      contact: '+1 (555) 123-4574'
    },
    {
      id: 'tornado-2',
      name: 'Interior Safe Room - Student Center',
      type: 'assembly',
      distance: '0.4 km',
      capacity: 150,
      currentOccupancy: 8,
      facilities: ['Interior Rooms', 'No Windows', 'Sturdy Construction'],
      coordinates: { lat: 40.7132, lng: -74.0056 },
      address: 'Student Center, Lower Level',
      contact: '+1 (555) 123-4575'
    }
  ],
  electrical: [
    {
      id: 'elec-1',
      name: 'Backup Power Facility',
      type: 'assembly',
      distance: '0.5 km',
      capacity: 200,
      currentOccupancy: 10,
      facilities: ['Emergency Power', 'Lighting', 'Communication Systems'],
      coordinates: { lat: 40.7124, lng: -74.0064 },
      address: 'Utilities Building',
      contact: '+1 (555) 123-4576'
    }
  ]
};

const emergencyContacts = [
  { name: 'Campus Emergency', number: '911', description: 'Immediate life-threatening emergencies' },
  { name: 'Campus Security', number: '(555) 123-4567', description: 'Non-emergency campus security' },
  { name: 'Emergency Coordinator', number: '(555) 123-4568', description: 'Disaster response coordination' },
  { name: 'Medical Emergency', number: '(555) 123-4569', description: 'Campus medical emergencies' }
];

export function EmergencyResponse({ onNavigate }: EmergencyResponseProps) {
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.warn('Geolocation not available or denied:', error.message || 'Unknown error');
          setIsGettingLocation(false);
          // Use default campus location
          setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  }, []);

  const handleEmergencyActivation = (disasterType: string) => {
    setSelectedDisaster(disasterType);
    setEmergencyActive(true);
    
    // In a real app, this would notify emergency services
    console.log(`Emergency activated for: ${disasterType}`);
  };

  const getDirections = (spot: SafetySpot) => {
    const baseUrl = 'https://www.google.com/maps/dir/';
    const origin = currentLocation ? `${currentLocation.lat},${currentLocation.lng}` : 'Current+Location';
    const destination = `${spot.coordinates.lat},${spot.coordinates.lng}`;
    window.open(`${baseUrl}${origin}/${destination}`, '_blank');
  };

  const getOccupancyColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage < 50) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assembly': return Users;
      case 'shelter': return Shield;
      case 'medical': return AlertTriangle;
      default: return MapPin;
    }
  };

  if (emergencyActive && selectedDisaster) {
    const disaster = disasterTypes.find(d => d.id === selectedDisaster);
    const spots = safetySpots[selectedDisaster] || [];

    return (
      <div className="min-h-screen bg-red-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Emergency Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full animate-pulse">
                  {disaster && <disaster.icon className="w-8 h-8" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">EMERGENCY ACTIVE</h1>
                  <p className="text-red-100">{disaster?.name} - Safety Locations Below</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {new Date().toLocaleTimeString()}
                </div>
                <div className="text-red-100">Emergency Time</div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="bg-white border-red-200">
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-red-600">{contact.name}</h3>
                  <div className="text-2xl font-mono font-bold my-2">{contact.number}</div>
                  <p className="text-xs text-gray-600">{contact.description}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-red-600 hover:bg-red-700"
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Safety Spots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearest Safety Locations
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spots.map((spot, index) => {
                const TypeIcon = getTypeIcon(spot.type);
                return (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="h-full bg-white border-red-200 hover:shadow-lg transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="w-5 h-5 text-red-600" />
                            <Badge variant={spot.type === 'medical' ? 'destructive' : 'outline'}>
                              {spot.type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{spot.distance}</div>
                            <div className="text-xs text-gray-500">away</div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{spot.name}</CardTitle>
                        <CardDescription>{spot.address}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-bold ${getOccupancyColor(spot.currentOccupancy, spot.capacity)}`}>
                              {spot.currentOccupancy}/{spot.capacity}
                            </div>
                            <div className="text-xs text-gray-500">Current/Capacity</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-sm">{spot.contact}</div>
                            <div className="text-xs text-gray-500">Contact</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium">Facilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {spot.facilities.map((facility) => (
                              <Badge key={facility} variant="secondary" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => getDirections(spot)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                          <Button 
                            onClick={() => window.open(`tel:${spot.contact}`, '_self')}
                            variant="outline"
                            size="sm"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 pt-6"
          >
            <Button 
              onClick={() => setEmergencyActive(false)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Emergency Types
            </Button>
            <Button 
              onClick={() => onNavigate('home')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-4 bg-red-600 rounded-full animate-pulse">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-red-600">Emergency Response</h1>
              <p className="text-gray-600">Select emergency type to find nearest safety locations</p>
            </div>
          </div>
        </motion.div>

        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Card className="inline-block bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                {isGettingLocation ? (
                  <span className="text-gray-600">Getting your location...</span>
                ) : currentLocation ? (
                  <span className="text-green-600">Location detected - Ready for emergency guidance</span>
                ) : (
                  <span className="text-yellow-600">Using default campus location</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-center">Select Emergency Type</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disasterTypes.map((disaster, index) => (
              <motion.div
                key={disaster.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${disaster.bgColor} border-2 border-transparent hover:border-red-300`}
                  onClick={() => handleEmergencyActivation(disaster.id)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`p-4 rounded-full ${disaster.bgColor} mx-auto w-fit`}>
                      <disaster.icon className={`w-8 h-8 ${disaster.color}`} />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg">{disaster.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Click to find nearest safety locations and emergency contacts
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {safetySpots[disaster.id]?.length || 0} safety locations available
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* General Emergency Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Emergency Preparedness Tips
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Stay calm and follow instructions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Know your evacuation routes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Keep emergency contacts handy
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Help others when safe to do so
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Report to designated assembly points
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Follow emergency coordinator instructions
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
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
    </div>
  );
}