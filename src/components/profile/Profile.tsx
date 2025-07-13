import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit3,
  Save,
  X,
  User,
  Mail,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Activity,
  Heart,
  MessageCircle,
  ShoppingBag,
  Users
} from "lucide-react";

interface ProfileProps {
  userEmail: string;
}

interface UserProfile {
  name: string;
  email: string;
  year: string;
  department: string;
  bio: string;
  interests: string[];
  location: string;
  joinedDate: string;
  avatar: string;
}

interface ActivityItem {
  id: string;
  type: "post" | "event" | "service" | "query";
  title: string;
  timestamp: string;
  engagement: number;
}

export function Profile({ userEmail }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: userEmail,
    year: "3rd Year",
    department: "Computer Science",
    bio: "Passionate about web development and machine learning. Always excited to collaborate on innovative projects and help fellow students.",
    interests: ["Programming", "Machine Learning", "Photography", "Music", "Hiking"],
    location: "Campus Dormitory Block B",
    joinedDate: "September 2022",
    avatar: "/api/placeholder/120/120"
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "post",
      title: "Shared tips for effective studying during finals",
      timestamp: "2 hours ago",
      engagement: 24
    },
    {
      id: "2",
      type: "event",
      title: "Registered for Web Development Workshop",
      timestamp: "1 day ago",
      engagement: 0
    },
    {
      id: "3",
      type: "service",
      title: "Booked tutoring session for Calculus",
      timestamp: "3 days ago",
      engagement: 0
    },
    {
      id: "4",
      type: "query",
      title: "Asked about best study spots on campus",
      timestamp: "1 week ago",
      engagement: 8
    }
  ];

  const stats = [
    { label: "Posts", value: 12, icon: MessageCircle },
    { label: "Events Attended", value: 8, icon: Calendar },
    { label: "Items Sold", value: 3, icon: ShoppingBag },
    { label: "Connections", value: 45, icon: Users }
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const addInterest = (interest: string) => {
    if (interest && !editedProfile.interests.includes(interest)) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, interest]
      });
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(i => i !== interest)
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "service":
        return <Award className="h-4 w-4 text-purple-500" />;
      case "query":
        return <BookOpen className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="card-3d">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  <p className="text-lg text-muted-foreground">{profile.year} • {profile.department}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "btn-3d" : "btn-primary-3d"}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>

        {/* Stats */}
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-4 bg-muted/50 rounded-lg">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">About</h3>
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                  className="min-h-[100px]"
                  placeholder="Tell others about yourself..."
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="btn-primary-3d">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Interests */}
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-semibold text-foreground">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedProfile.interests : profile.interests).map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className={`text-sm ${isEditing ? 'pr-1' : ''}`}
                >
                  {interest}
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Input
                  placeholder="Add interest..."
                  className="w-32 h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addInterest(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Activity and Settings */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity" className="data-[state=active]:btn-primary-3d">
            <Activity className="h-4 w-4 mr-2" />
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:btn-primary-3d">
            <User className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          {recentActivity.map((activity, index) => (
            <Card key={activity.id} className={`card-3d post-enter`} style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getActivityIcon(activity.type)}
                    <div>
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                  {activity.engagement > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>{activity.engagement}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {recentActivity.length === 0 && (
            <Card className="card-3d text-center py-12">
              <CardContent>
                <div className="text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
                  <p>Start engaging with the community to see your activity here.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Year & Department</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={isEditing ? editedProfile.year : profile.year}
                    onChange={(e) => setEditedProfile({...editedProfile, year: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Year"
                  />
                  <Input
                    value={isEditing ? editedProfile.department : profile.department}
                    onChange={(e) => setEditedProfile({...editedProfile, department: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Department"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={isEditing ? editedProfile.location : profile.location}
                  onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={profile.email} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}