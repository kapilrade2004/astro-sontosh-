import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const pathNames: Record<string, string> = {
  "/": "Home",
  "/astrology": "Astrology",
  "/numerology": "Numerology",
  "/vastu": "Vastu",
  "/palmistry": "Palmistry",
  "/about": "About",
  "/contact": "Contact",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/") return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">
        {pathNames[currentPath] || currentPath.slice(1)}
      </span>
    </nav>
  );
};
