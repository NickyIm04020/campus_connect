import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, Shield } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate Google Sign-in process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock college email validation
      const mockEmail = "student@college.edu"; // In real app, this would come from Google OAuth
      
      if (!isCollegeEmail(mockEmail)) {
        setError("Please use your college email address (@college.edu) to sign in.");
        return;
      }
      
      onLogin(mockEmail);
    } catch (err) {
      setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isCollegeEmail = (email: string): boolean => {
    return email.endsWith(".edu") || email.includes("college");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 px-4 haori-pattern relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 flame-glow rounded-full flame-dance"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 water-glow rounded-full water-breathing"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/30 rounded-full float-animation"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Demon Slayer Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 flame-glow rounded-2xl mb-4 float-animation relative">
            <Shield className="w-10 h-10 text-primary-foreground flame-dance" />
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 flame-dance">CampusConnect</h1>
          <p className="text-muted-foreground text-lg">Enter the Demon Slayer Academy</p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Demon Slayer Login Card */}
        <Card className="demon-slayer-card border-primary/20 backdrop-blur-sm relative overflow-hidden">
          {/* Flame border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-lg"></div>
          
          <CardHeader className="text-center space-y-3 relative z-10">
            <CardTitle className="text-2xl font-semibold text-foreground">Welcome, Slayer</CardTitle>
            <CardDescription className="text-base">
              Use your academy credentials to join the corps
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 relative z-10">
            {error && (
              <Alert variant="destructive" className="animate-fade-in border-destructive/50 bg-destructive/10">
                <Mail className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            {/* Nichirin Blade Google Sign-in Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 nichirin-blade-btn font-semibold text-lg relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="spinner-3d w-6 h-6 border-primary-foreground border-t-transparent" />
                  <span>Entering Academy...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                  <div className="absolute right-3 opacity-50">⚔️</div>
                </div>
              )}
            </Button>

            {/* Demon Slayer Security Notice */}
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50 water-breathing">
              <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 flame-dance" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                  🛡️ Demon Slayer Corps Security
                </p>
                <p>Only academy students with valid .edu credentials can join the corps. Your mission data is protected by Total Concentration breathing techniques.</p>
              </div>
            </div>

            {/* Character Elements */}
            <div className="flex justify-center space-x-6 pt-2">
              <div className="text-2xl animate-bounce">🔥</div>
              <div className="text-2xl animate-pulse">💧</div>
              <div className="text-2xl animate-bounce delay-150">⚡</div>
            </div>
          </CardContent>
        </Card>

        {/* Footer with Demon Slayer Theme */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className="mb-2">🎓 Not enrolled in the academy yet?</p>
          <p>Contact your institution's administration to get your corps credentials.</p>
        </div>
      </div>
    </div>
  );
}