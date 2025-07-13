// CampusConnect Platform - College Social Network

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CampusConnect
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Connect, collaborate, and thrive in your college community
          </p>
        </div>
        
        <div className="animate-pulse">
          <p className="text-sm text-muted-foreground">
            Loading your community platform...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
