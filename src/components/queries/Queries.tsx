import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  MessageCircle,
  ThumbsUp,
  Clock,
  Filter,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";

interface Query {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  category: string;
  status: "open" | "answered" | "closed";
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

export function Queries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);
  const [newQuery, setNewQuery] = useState({ title: "", description: "", category: "general" });

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "academic", label: "Academic" },
    { id: "events", label: "Events" },
    { id: "services", label: "Services" },
    { id: "technical", label: "Technical" },
    { id: "general", label: "General" },
    { id: "campus", label: "Campus Life" }
  ];

  const statusFilters = [
    { id: "all", label: "All Status", icon: HelpCircle },
    { id: "open", label: "Open", icon: AlertCircle },
    { id: "answered", label: "Answered", icon: CheckCircle },
    { id: "closed", label: "Closed", icon: CheckCircle }
  ];

  const mockQueries: Query[] = [
    {
      id: "1",
      title: "Where can I find study rooms for group projects?",
      description: "I'm looking for quiet study spaces that can accommodate 4-5 students for our semester project. Preferably with whiteboards and power outlets.",
      author: "Emma Wilson",
      authorAvatar: "/api/placeholder/40/40",
      category: "campus",
      status: "answered",
      timestamp: "2 hours ago",
      likes: 8,
      replies: 3,
      tags: ["study-rooms", "group-study", "campus"],
      isLiked: false
    },
    {
      id: "2",
      title: "Best places to get affordable textbooks?",
      description: "Need recommendations for buying used textbooks for Computer Science courses. Looking for both online and local options.",
      author: "James Chen",
      authorAvatar: "/api/placeholder/40/40",
      category: "academic",
      status: "open",
      timestamp: "4 hours ago",
      likes: 12,
      replies: 7,
      tags: ["textbooks", "computer-science", "budget"],
      isLiked: true
    },
    {
      id: "3",
      title: "How to connect laptop to campus WiFi?",
      description: "Having trouble connecting my new laptop to the campus network. The IT website instructions aren't working for me.",
      author: "Sofia Rodriguez",
      authorAvatar: "/api/placeholder/40/40",
      category: "technical",
      status: "answered",
      timestamp: "6 hours ago",
      likes: 5,
      replies: 2,
      tags: ["wifi", "technical-support", "laptop"],
      isLiked: false
    },
    {
      id: "4",
      title: "Anyone interested in forming a photography club?",
      description: "I'm passionate about photography and would love to start a club. Looking for fellow photography enthusiasts to join!",
      author: "Alex Thompson",
      authorAvatar: "/api/placeholder/40/40",
      category: "events",
      status: "open",
      timestamp: "1 day ago",
      likes: 15,
      replies: 9,
      tags: ["photography", "club", "hobby"],
      isLiked: false
    }
  ];

  const filteredQueries = mockQueries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || query.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || query.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmitQuery = () => {
    if (!newQuery.title.trim() || !newQuery.description.trim()) return;

    // Here you would normally submit to backend
    console.log("Submitting query:", newQuery);
    
    // Reset form
    setNewQuery({ title: "", description: "", category: "general" });
    setShowNewQueryForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "answered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "border-orange-200 bg-orange-50 text-orange-700";
      case "answered":
        return "border-green-200 bg-green-50 text-green-700";
      case "closed":
        return "border-gray-200 bg-gray-50 text-gray-700";
      default:
        return "border-blue-200 bg-blue-50 text-blue-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Queries</h1>
          <p className="text-muted-foreground">Ask questions and help fellow students</p>
        </div>
        <Button 
          onClick={() => setShowNewQueryForm(!showNewQueryForm)}
          className="btn-primary-3d"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 card-3d"
          />
        </div>

        <div className="flex flex-wrap gap-2">
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

          {/* Status Filters */}
          <div className="flex gap-2">
            {statusFilters.map((status) => {
              const Icon = status.icon;
              return (
                <Button
                  key={status.id}
                  variant={selectedStatus === status.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status.id)}
                  className={`whitespace-nowrap ${
                    selectedStatus === status.id ? 'btn-primary-3d' : 'btn-3d'
                  }`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {status.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* New Query Form */}
      {showNewQueryForm && (
        <Card className="card-3d animate-scale-in">
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What's your question?"
                value={newQuery.title}
                onChange={(e) => setNewQuery({...newQuery, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Provide more details about your question..."
                value={newQuery.description}
                onChange={(e) => setNewQuery({...newQuery, description: e.target.value})}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={newQuery.category}
                onChange={(e) => setNewQuery({...newQuery, category: e.target.value})}
                className="w-full p-2 border rounded-md bg-background"
              >
                {categories.slice(1).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowNewQueryForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitQuery}
                className="btn-primary-3d"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queries List */}
      <div className="space-y-4">
        {filteredQueries.map((query, index) => (
          <Card key={query.id} className={`card-3d post-enter`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={query.authorAvatar} />
                    <AvatarFallback>{query.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground line-clamp-1">{query.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{query.author}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{query.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="capitalize">
                    {query.category}
                  </Badge>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(query.status)}`}>
                    {getStatusIcon(query.status)}
                    <span className="capitalize">{query.status}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{query.description}</p>

              {query.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {query.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:text-blue-500 ${query.isLiked ? 'text-blue-500' : ''}`}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-2 ${query.isLiked ? 'fill-current' : ''}`} />
                    {query.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="hover:text-green-500">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {query.replies} replies
                  </Button>
                </div>

                <Button size="sm" className="btn-primary-3d">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQueries.length === 0 && (
        <Card className="card-3d text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No queries found</h3>
              <p>Try adjusting your search or ask a new question.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}