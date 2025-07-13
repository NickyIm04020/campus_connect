import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ui/theme-provider";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Calendar,
  Briefcase,
  HelpCircle,
  User,
  LogOut,
  Sun,
  Moon,
  Globe,
  Home,
  Bell,
  Settings
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ 
  currentPage, 
  onPageChange, 
  onLogout, 
  isCollapsed, 
  onToggleCollapse 
}: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("English");

  const languages = [
    "English", "Hindi", "Telugu", "Odia", "Malayalam", 
    "Kannada", "Marathi", "Urdu", "Bengali", "Tamil", 
    "Gujarati", "Punjabi"
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuItems = [
    { id: "feed", label: "News Feed", icon: Home, badge: null },
    { id: "inventory", label: "Buy/Sell Items", icon: ShoppingBag, badge: "12" },
    { id: "events", label: "Host Events", icon: Calendar, badge: "3" },
    { id: "services", label: "Services", icon: Briefcase, badge: null },
    { id: "queries", label: "Queries", icon: HelpCircle, badge: "5" },
    { id: "profile", label: "Profile", icon: User, badge: null },
  ];

  return (
    <Card className={`
      fixed right-0 top-0 h-full z-50 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-80'} 
      bg-sidebar/95 backdrop-blur-lg border-l border-sidebar-border
      shadow-3d
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-sidebar-foreground">Menu</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className={`
                w-full justify-start h-12 relative btn-3d
                ${currentPage === item.id 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }
                ${isCollapsed ? 'px-2' : 'px-4'}
              `}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon className={`sidebar-icon-3d ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>

        {/* Theme & Language Controls */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {/* Theme Toggle */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <span className="text-sm font-medium text-sidebar-foreground">Theme</span>
            )}
            <button
              onClick={toggleTheme}
              className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
              title="Toggle theme"
            >
              <div className="theme-toggle-slider flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="h-3 w-3" />
                ) : (
                  <Sun className="h-3 w-3" />
                )}
              </div>
            </button>
          </div>

          {/* Language Selector */}
          {!isCollapsed && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-selector bg-sidebar-accent text-sidebar-accent-foreground text-sm px-2 py-1 rounded border-0 focus:ring-2 focus:ring-sidebar-ring"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          )}

          {/* Language Icon for collapsed state */}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center hover:bg-sidebar-accent"
              title="Language"
            >
              <Globe className="h-4 w-4" />
            </Button>
          )}

          {/* Notifications & Settings */}
          <div className={`flex gap-2 ${isCollapsed ? 'flex-col' : 'justify-between'}`}>
            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-sidebar-accent ${isCollapsed ? 'w-full justify-center' : 'flex-1'}`}
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Notifications</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`hover:bg-sidebar-accent ${isCollapsed ? 'w-full justify-center' : 'flex-1'}`}
              title="Settings"
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Button>
          </div>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={onLogout}
            className={`w-full btn-3d ${isCollapsed ? 'px-2' : 'px-4'}`}
          >
            <LogOut className={`h-4 w-4 ${!isCollapsed ? 'mr-2' : ''}`} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </Card>
  );
}