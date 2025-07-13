import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Plus,
  MapPin,
  Users,
  Clock,
  Ticket,
  Share2,
  Heart,
  Filter,
  Search
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: string;
  capacity: number;
  registered: number;
  price: number;
  image: string;
  tags: string[];
  isRegistered: boolean;
  isFavorite: boolean;
}

export function HostEvents() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Events" },
    { id: "academic", label: "Academic" },
    { id: "social", label: "Social" },
    { id: "sports", label: "Sports" },
    { id: "cultural", label: "Cultural" },
    { id: "workshop", label: "Workshops" }
  ];

  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Web Development Workshop",
      description: "Learn React, Node.js, and full-stack development with hands-on projects.",
      date: "2024-01-20",
      time: "2:00 PM - 5:00 PM",
      venue: "Computer Lab B",
      organizer: "Tech Society",
      category: "workshop",
      capacity: 50,
      registered: 23,
      price: 0,
      image: "/api/placeholder/400/250",
      tags: ["programming", "react", "web-dev"],
      isRegistered: false,
      isFavorite: false
    },
    {
      id: "2",
      title: "Annual Cultural Festival",
      description: "Celebrate diversity with music, dance, food, and art from around the world.",
      date: "2024-01-25",
      time: "6:00 PM - 11:00 PM",
      venue: "Main Auditorium",
      organizer: "Cultural Committee",
      category: "cultural",
      capacity: 500,
      registered: 387,
      price: 15,
      image: "/api/placeholder/400/250",
      tags: ["festival", "cultural", "music", "dance"],
      isRegistered: true,
      isFavorite: true
    },
    {
      id: "3",
      title: "Entrepreneurship Pitch Competition",
      description: "Present your startup ideas to industry experts and win funding opportunities.",
      date: "2024-01-22",
      time: "10:00 AM - 4:00 PM",
      venue: "Business Center",
      organizer: "Entrepreneur Club",
      category: "academic",
      capacity: 100,
      registered: 67,
      price: 5,
      image: "/api/placeholder/400/250",
      tags: ["entrepreneurship", "startup", "competition"],
      isRegistered: false,
      isFavorite: false
    }
  ];

  const filteredEvents = mockEvents.filter(event => 
    selectedCategory === "all" || event.category === selectedCategory
  );

  const handleRegister = (eventId: string) => {
    // Handle event registration
    console.log("Registering for event:", eventId);
  };

  const handleFavorite = (eventId: string) => {
    // Handle adding to favorites
    console.log("Adding to favorites:", eventId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Events</h1>
          <p className="text-muted-foreground">Discover and host events in your college community</p>
        </div>
        <Button className="btn-primary-3d">
          <Plus className="h-4 w-4 mr-2" />
          Host Event
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse" className="data-[state=active]:btn-primary-3d">
            <Calendar className="h-4 w-4 mr-2" />
            Browse Events
          </TabsTrigger>
          <TabsTrigger value="my-events" className="data-[state=active]:btn-primary-3d">
            <Users className="h-4 w-4 mr-2" />
            My Events
          </TabsTrigger>
          <TabsTrigger value="hosting" className="data-[state=active]:btn-primary-3d">
            <Ticket className="h-4 w-4 mr-2" />
            Hosting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id ? 'btn-primary-3d' : 'btn-3d'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <Card key={event.id} className={`card-3d post-enter overflow-hidden`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {event.category}
                        </Badge>
                        {event.price === 0 ? (
                          <Badge variant="outline" className="text-xs text-green-600">Free</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">${event.price}</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(event.id)}
                      className={`p-2 ${event.isFavorite ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`h-4 w-4 ${event.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{event.registered}/{event.capacity} registered</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium mb-1">Organized by {event.organizer}</p>
                    
                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {event.isRegistered ? (
                        <Button size="sm" variant="outline" className="flex-1" disabled>
                          <Ticket className="h-3 w-3 mr-1" />
                          Registered
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 btn-primary-3d"
                          onClick={() => handleRegister(event.id)}
                        >
                          <Ticket className="h-3 w-3 mr-1" />
                          {event.price === 0 ? 'Register' : `Register $${event.price}`}
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-6">
          <Card className="card-3d text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Events Yet</h3>
                <p className="mb-4">Your registered events will appear here.</p>
                <Button variant="outline" onClick={() => setActiveTab("browse")}>
                  Browse Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hosting" className="space-y-6">
          <Card className="card-3d text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start Hosting</h3>
                <p className="mb-4">Create and manage your own events for the college community.</p>
                <Button className="btn-primary-3d">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}