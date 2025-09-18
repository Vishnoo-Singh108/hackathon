import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Phone, MapPin, AlertTriangle, Shield, Clock, Users } from "lucide-react";

interface EmergencyQuickActionsProps {
  onNavigate: (page: string) => void;
}

export function EmergencyQuickActions({ onNavigate }: EmergencyQuickActionsProps) {
  const emergencyContacts = [
    { service: "Fire Department", number: "911", icon: "🚒" },
    { service: "Police", number: "911", icon: "👮" },
    { service: "Medical Emergency", number: "911", icon: "🚑" },
    { service: "Campus Security", number: "555-0123", icon: "🛡️" }
  ];

  const quickActions = [
    {
      icon: AlertTriangle,
      title: "Report Emergency",
      description: "Immediately report any ongoing emergency",
      action: "Report Now",
      urgent: true
    },
    {
      icon: MapPin,
      title: "Find Safe Zone",
      description: "Locate nearest emergency assembly point",
      action: "Show Map",
      urgent: false
    },
    {
      icon: Users,
      title: "Check Attendance",
      description: "Account for all students during evacuation",
      action: "Take Roll",
      urgent: false
    },
    {
      icon: Clock,
      title: "Emergency Timeline",
      description: "View real-time emergency response progress",
      action: "View Status",
      urgent: false
    }
  ];

  return (
    <section className="py-20 bg-red-50 dark:bg-red-950/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl lg:text-5xl tracking-tight">
              Emergency
              <span className="text-red-600"> Quick Actions</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Immediate access to emergency contacts and critical actions when every second counts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span>Emergency Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{contact.icon}</span>
                    <span className="font-medium">{contact.service}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                  >
                    {contact.number}
                  </Button>
                </div>
              ))}
              
              <Alert className="mt-4 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-sm">
                  For life-threatening emergencies, always call 911 first, then notify campus security.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={action.urgent ? "default" : "outline"} 
                    size="sm"
                    className={action.urgent ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    {action.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Status Banner */}
        <div className="mt-8">
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>Current Status: ALL CLEAR</strong> - No active emergencies. Last drill completed: March 15, 2024
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
}