import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { NewsFeed } from "@/components/feed/NewsFeed";
import { BuySeelInventory } from "@/components/marketplace/BuySeelInventory";
import { HostEvents } from "@/components/events/HostEvents";
import { Services } from "@/components/services/Services";
import { Queries } from "@/components/queries/Queries";
import { Profile } from "@/components/profile/Profile";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState("feed");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "feed":
        return <NewsFeed userEmail={userEmail} />;
      case "inventory":
        return <BuySeelInventory />;
      case "events":
        return <HostEvents />;
      case "services":
        return <Services />;
      case "queries":
        return <Queries />;
      case "profile":
        return <Profile userEmail={userEmail} />;
      default:
        return <NewsFeed userEmail={userEmail} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'mr-16' : 'mr-80'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="page-transition loaded">
            {renderCurrentPage()}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={onLogout}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
    </div>
  );
}