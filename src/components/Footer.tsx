import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "Learning Modules", href: "#" },
      { name: "Interactive Quizzes", href: "#" },
      { name: "Mock Drills", href: "#" },
      { name: "Progress Tracking", href: "#" },
      { name: "Certification", href: "#" }
    ],
    resources: [
      { name: "Emergency Contacts", href: "#" },
      { name: "Safety Guidelines", href: "#" },
      { name: "Teacher Resources", href: "#" },
      { name: "Student Handbook", href: "#" },
      { name: "FAQ", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Support", href: "#" },
      { name: "Training Videos", href: "#" },
      { name: "System Status", href: "#" },
      { name: "API Documentation", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  return (
    <footer className="bg-background border-t">
      <div className="container py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl">Suraksha</h3>
                <p className="text-sm text-muted-foreground">Disaster Preparedness Platform</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Empowering educational institutions with comprehensive disaster management 
              training through interactive learning, gamification, and real-world preparation.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>1-800-Suraksha (1-800-723-3338)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>support@Suraksha.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Emergency Response Center, Safety Plaza</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="mb-2">Stay Updated on Emergency Preparedness</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest safety tips, training updates, and emergency alerts.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 md:w-64"
              />
              <Button className="bg-red-600 hover:bg-red-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-foreground transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <p>© 2024 Suraksha. All rights reserved. Keeping schools safe, one student at a time.</p>
        </div>
      </div>
    </footer>
  );
}