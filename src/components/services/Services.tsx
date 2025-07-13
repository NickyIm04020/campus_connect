import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  BookOpen,
  Palette,
  Camera,
  Code,
  Music,
  Languages,
  Star,
  MessageCircle,
  DollarSign,
  Clock,
  Award
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  provider: string;
  category: string;
  rate: number;
  rateType: "hour" | "project" | "session";
  rating: number;
  reviewCount: number;
  experience: string;
  skills: string[];
  availability: string;
  image: string;
  verified: boolean;
  responseTime: string;
}

export function Services() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Services", icon: Award },
    { id: "tutoring", label: "Tutoring", icon: BookOpen },
    { id: "design", label: "Design", icon: Palette },
    { id: "programming", label: "Programming", icon: Code },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "music", label: "Music Lessons", icon: Music },
    { id: "language", label: "Language", icon: Languages },
  ];

  const mockServices: Service[] = [
    {
      id: "1",
      title: "Calculus & Linear Algebra Tutoring",
      description: "Experienced math tutor offering personalized sessions for calculus and linear algebra. Proven track record of helping students improve grades.",
      provider: "Sarah Chen",
      category: "tutoring",
      rate: 25,
      rateType: "hour",
      rating: 4.9,
      reviewCount: 34,
      experience: "3 years",
      skills: ["Calculus", "Linear Algebra", "Statistics", "Differential Equations"],
      availability: "Mon-Fri 2-8 PM",
      image: "/api/placeholder/300/200",
      verified: true,
      responseTime: "< 2 hours"
    },
    {
      id: "2",
      title: "Logo & Brand Design Services",
      description: "Professional graphic designer specializing in logos, branding, and marketing materials for student projects and startups.",
      provider: "Alex Rodriguez",
      category: "design",
      rate: 150,
      rateType: "project",
      rating: 4.8,
      reviewCount: 28,
      experience: "2 years",
      skills: ["Adobe Creative Suite", "Figma", "Branding", "UI/UX"],
      availability: "Flexible",
      image: "/api/placeholder/300/200",
      verified: true,
      responseTime: "< 4 hours"
    },
    {
      id: "3",
      title: "Web Development & React Training",
      description: "Full-stack developer offering coding lessons and project assistance. From basics to advanced React concepts.",
      provider: "Maya Patel",
      category: "programming",
      rate: 30,
      rateType: "hour",
      rating: 5.0,
      reviewCount: 22,
      experience: "4 years",
      skills: ["React", "Node.js", "JavaScript", "Python", "MongoDB"],
      availability: "Weekends & Evenings",
      image: "/api/placeholder/300/200",
      verified: true,
      responseTime: "< 1 hour"
    },
    {
      id: "4",
      title: "Event Photography & Portraits",
      description: "Professional photographer for campus events, graduation photos, and portfolio shoots. High-quality images at student-friendly rates.",
      provider: "David Kim",
      category: "photography",
      rate: 75,
      rateType: "session",
      rating: 4.7,
      reviewCount: 41,
      experience: "3 years",
      skills: ["Portrait Photography", "Event Photography", "Photo Editing", "Adobe Lightroom"],
      availability: "Weekends",
      image: "/api/placeholder/300/200",
      verified: false,
      responseTime: "< 6 hours"
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Services</h1>
          <p className="text-muted-foreground">Find or offer services within your college community</p>
        </div>
        <Button className="btn-primary-3d">
          <Plus className="h-4 w-4 mr-2" />
          Offer Service
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse" className="data-[state=active]:btn-primary-3d">
            <Search className="h-4 w-4 mr-2" />
            Browse Services
          </TabsTrigger>
          <TabsTrigger value="my-bookings" className="data-[state=active]:btn-primary-3d">
            <BookOpen className="h-4 w-4 mr-2" />
            My Bookings
          </TabsTrigger>
          <TabsTrigger value="offering" className="data-[state=active]:btn-primary-3d">
            <DollarSign className="h-4 w-4 mr-2" />
            My Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services, skills, or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 card-3d"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category.id ? 'btn-primary-3d' : 'btn-3d'
                  }`}
                >
                  <Icon className="h-3 w-3 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Card key={service.id} className={`card-3d post-enter`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl font-bold text-primary">
                          ${service.rate}
                          <span className="text-sm text-muted-foreground">/{service.rateType}</span>
                        </span>
                        {service.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{service.responseTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-foreground">{service.provider}</span>
                      <span className="text-muted-foreground ml-2">• {service.experience} experience</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">Available:</span> {service.availability}
                    </div>
                  </div>

                  {service.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {service.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 btn-primary-3d">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <Card className="card-3d text-center py-12">
              <CardContent>
                <div className="text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No services found</h3>
                  <p>Try adjusting your search or browse different categories.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-bookings" className="space-y-6">
          <Card className="card-3d text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                <p className="mb-4">Your service bookings will appear here.</p>
                <Button variant="outline" onClick={() => setActiveTab("browse")}>
                  Browse Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offering" className="space-y-6">
          <Card className="card-3d text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start Offering Services</h3>
                <p className="mb-4">Share your skills and earn money helping fellow students.</p>
                <Button className="btn-primary-3d">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Service Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}