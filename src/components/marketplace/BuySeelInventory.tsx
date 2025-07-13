import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  ShoppingBag,
  BookOpen,
  Coffee,
  Laptop,
  Star,
  MapPin,
  DollarSign,
  MessageCircle
} from "lucide-react";

interface Item {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  seller: string;
  location: string;
  rating: number;
  image: string;
  postedTime: string;
  tags: string[];
}

export function BuySeelInventory() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items", icon: ShoppingBag },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "food", label: "Food Coupons", icon: Coffee },
    { id: "electronics", label: "Electronics", icon: Laptop },
  ];

  const mockItems: Item[] = [
    {
      id: "1",
      title: "Data Structures & Algorithms Textbook",
      price: 45,
      category: "books",
      condition: "Like New",
      description: "Comprehensive DSA textbook with practice problems. Perfect for CS students!",
      seller: "Sarah Chen",
      location: "Dorm Block A",
      rating: 4.9,
      image: "/api/placeholder/300/200",
      postedTime: "2 hours ago",
      tags: ["computer-science", "textbook", "algorithms"]
    },
    {
      id: "2",
      title: "Campus Cafeteria Food Coupons (5x)",
      price: 25,
      category: "food",
      condition: "Unused",
      description: "5 meal coupons for main cafeteria. Valid for 2 months. Great value!",
      seller: "Alex Rodriguez",
      location: "Student Center",
      rating: 4.7,
      image: "/api/placeholder/300/200",
      postedTime: "4 hours ago",
      tags: ["food", "cafeteria", "meal-plan"]
    },
    {
      id: "3",
      title: "MacBook Pro 13\" (2021)",
      price: 800,
      category: "electronics",
      condition: "Excellent",
      description: "Barely used MacBook Pro with M1 chip. Perfect for coding and design work.",
      seller: "Maya Patel",
      location: "Engineering Building",
      rating: 5.0,
      image: "/api/placeholder/300/200",
      postedTime: "1 day ago",
      tags: ["laptop", "apple", "programming"]
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell items within your college community</p>
        </div>
        <Button className="btn-primary-3d">
          <Plus className="h-4 w-4 mr-2" />
          List Item
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="data-[state=active]:btn-primary-3d">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Buy Items
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:btn-primary-3d">
            <DollarSign className="h-4 w-4 mr-2" />
            Your Listings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 card-3d"
              />
            </div>
            <Button variant="outline" className="btn-3d">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
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

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Card key={item.id} className={`card-3d post-enter`} style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl font-bold text-primary">${item.price}</span>
                        <Badge variant="secondary" className="text-xs">{item.condition}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.seller}</p>
                      <p className="text-xs text-muted-foreground">{item.postedTime}</p>
                    </div>
                    <Button size="sm" className="btn-primary-3d">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="card-3d text-center py-12">
              <CardContent>
                <div className="text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No items found</h3>
                  <p>Try adjusting your search or browse different categories.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sell" className="space-y-6">
          <Card className="card-3d text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start Selling</h3>
                <p className="mb-4">List your items to reach students in your college community.</p>
                <Button className="btn-primary-3d">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}