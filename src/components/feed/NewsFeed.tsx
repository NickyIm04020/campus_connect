import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Plus,
  Image as ImageIcon,
  Smile,
  Send,
  MoreHorizontal,
  Bookmark,
  TrendingUp
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    year: string;
    department: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
}

interface NewsFeedProps {
  userEmail: string;
}

export function NewsFeed({ userEmail }: NewsFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = ["all", "trending", "events", "marketplace", "academic", "social"];

  // Mock posts data
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: "1",
        author: {
          name: "Sarah Chen",
          avatar: "/api/placeholder/40/40",
          year: "3rd Year",
          department: "Computer Science"
        },
        content: "Just finished my machine learning project! 🎉 Anyone interested in collaborative coding sessions? Let's build something amazing together! #MachineLearning #Coding #Collaboration",
        image: "/api/placeholder/600/300",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        isSaved: false,
        tags: ["academic", "technology"]
      },
      {
        id: "2",
        author: {
          name: "Alex Rodriguez",
          avatar: "/api/placeholder/40/40",
          year: "2nd Year",
          department: "Business Administration"
        },
        content: "Organizing a study group for Economics 201! We meet every Tuesday at 7 PM in the library. Join us for collaborative learning and exam prep. DM me for details! 📚✨",
        timestamp: "4 hours ago",
        likes: 16,
        comments: 12,
        shares: 7,
        isLiked: true,
        isSaved: true,
        tags: ["academic", "study-group"]
      },
      {
        id: "3",
        author: {
          name: "Maya Patel",
          avatar: "/api/placeholder/40/40",
          year: "4th Year",
          department: "Art & Design"
        },
        content: "Selling my Design Fundamentals textbooks! Perfect condition, barely used. Great for first and second-year students. Reasonable prices! 💰📖 #TextbookSale #DesignStudents",
        timestamp: "6 hours ago",
        likes: 9,
        comments: 5,
        shares: 2,
        isLiked: false,
        isSaved: false,
        tags: ["marketplace", "textbooks"]
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/api/placeholder/40/40",
        year: "Current User",
        department: "Your Department"
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      tags: ["personal"]
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setShowNewPostForm(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || post.tags.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border p-4 -mx-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">News Feed</h1>
          <Button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="btn-primary-3d"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, people, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 card-3d"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={`whitespace-nowrap capitalize ${
                selectedFilter === filter ? 'btn-primary-3d' : 'btn-3d'
              }`}
            >
              {filter === "all" && <TrendingUp className="h-3 w-3 mr-1" />}
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="card-3d animate-scale-in">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Share something with your community</p>
                <p className="text-sm text-muted-foreground">What's on your mind?</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts, questions, or announcements..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="outline" size="sm">
                  <Smile className="h-4 w-4 mr-2" />
                  Emoji
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewPost} className="btn-primary-3d">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <Card key={post.id} className={`card-3d post-enter`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.author.year} • {post.author.department}
                    </p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{post.content}</p>
              
              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`hover:text-red-500 ${post.isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="hover:text-green-500">
                    <Share2 className="h-4 w-4 mr-2" />
                    {post.shares}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={`hover:text-yellow-500 ${post.isSaved ? 'text-yellow-500' : ''}`}
                >
                  <Bookmark className={`h-4 w-4 ${post.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="card-3d text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}