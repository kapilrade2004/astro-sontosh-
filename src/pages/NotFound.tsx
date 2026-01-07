import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="text-center max-w-md">
        <div className="font-serif text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</div>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The cosmic path you're looking for doesn't exist. Let us guide you back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-primary text-primary-foreground" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" className="border-primary text-primary" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
