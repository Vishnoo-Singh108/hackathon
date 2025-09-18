import React, { useState } from 'react';
import { PersonalizedFeedback } from './PersonalizedFeedback';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RefreshCw, Play } from 'lucide-react';

// Sample performance scenarios
const performanceScenarios = {
  excellent: {
    overallScore: 95,
    reactionTime: 2.3,
    correctActions: 9,
    totalActions: 10,
    safetyViolations: 0,
    improvementAreas: []
  },
  good: {
    overallScore: 82,
    reactionTime: 4.1,
    correctActions: 8,
    totalActions: 10,
    safetyViolations: 1,
    improvementAreas: ['exit_route']
  },
  needsWork: {
    overallScore: 65,
    reactionTime: 6.8,
    correctActions: 6,
    totalActions: 10,
    safetyViolations: 2,
    improvementAreas: ['elevator_use', 'exit_route']
  },
  poor: {
    overallScore: 42,
    reactionTime: 12.5,
    correctActions: 4,
    totalActions: 10,
    safetyViolations: 4,
    improvementAreas: ['elevator_use', 'exit_route', 'panic_response', 'protocol_knowledge']
  }
};

const drillTypes = ['Fire', 'Earthquake', 'Tornado', 'Flood', 'Lockdown'];

export function FeedbackDemo() {
  const [selectedDrill, setSelectedDrill] = useState('Fire');
  const [selectedScenario, setSelectedScenario] = useState('needsWork');
  const [showFeedback, setShowFeedback] = useState(false);
  const [key, setKey] = useState(0);

  const handleStartDemo = () => {
    setShowFeedback(true);
    setKey(prev => prev + 1); // Force re-render of feedback component
  };

  const handleRetry = () => {
    setShowFeedback(false);
    // In a real app, this would restart the drill
    setTimeout(() => {
      setShowFeedback(true);
      setKey(prev => prev + 1);
    }, 500);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    // In a real app, this would navigate to learning modules
    alert('Navigating to learning modules...');
  };

  const currentPerformance = performanceScenarios[selectedScenario as keyof typeof performanceScenarios];

  if (showFeedback) {
    return (
      <PersonalizedFeedback
        key={key}
        drillType={selectedDrill}
        performanceData={currentPerformance}
        onRetry={handleRetry}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Demo Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            AI Feedback System Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Drill Type Selection */}
            <div className="space-y-3">
              <label className="block font-medium">Select Drill Type</label>
              <Select value={selectedDrill} onValueChange={setSelectedDrill}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {drillTypes.map(drill => (
                    <SelectItem key={drill} value={drill}>
                      {drill} Drill
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Performance Scenario */}
            <div className="space-y-3">
              <label className="block font-medium">Performance Scenario</label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">
                    Excellent Performance (95%)
                  </SelectItem>
                  <SelectItem value="good">
                    Good Performance (82%)
                  </SelectItem>
                  <SelectItem value="needsWork">
                    Needs Work (65%)
                  </SelectItem>
                  <SelectItem value="poor">
                    Poor Performance (42%)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Preview of Selected Scenario */}
          <div className="space-y-4">
            <h3 className="font-semibold">Scenario Preview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentPerformance.overallScore}%
                </div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {currentPerformance.reactionTime}s
                </div>
                <div className="text-sm text-gray-600">Reaction Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentPerformance.correctActions}/{currentPerformance.totalActions}
                </div>
                <div className="text-sm text-gray-600">Correct Actions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {currentPerformance.safetyViolations}
                </div>
                <div className="text-sm text-gray-600">Safety Violations</div>
              </div>
            </div>
            
            {currentPerformance.improvementAreas.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Improvement Areas:</label>
                <div className="flex flex-wrap gap-2">
                  {currentPerformance.improvementAreas.map(area => (
                    <Badge key={area} variant="outline" className="text-xs">
                      {area.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={handleStartDemo}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Generate AI Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Feature Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">AI Feedback Features</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Real-time performance analysis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Personalized improvement suggestions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Module-specific recommendations
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Priority-based feedback delivery
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Actionable next steps
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Learning path optimization
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}