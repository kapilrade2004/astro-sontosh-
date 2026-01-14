import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-removebg-preview (1).png";
import nameLogoImage from "@/assets/namelogo-removebg-preview.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Astrology", path: "/astrology" },
  { name: "Numerology", path: "/numerology" },
  { name: "Vastu", path: "/vastu" },
  { name: "Palmistry", path: "/palmistry" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <img 
                src={logoImage}
                alt="Astro Santosh Pandey Logo" 
                className="h-36 w-48 object-contain"
              />
            </motion.div> */}
            <div className="flex flex-col">
              <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <img 
                src={nameLogoImage}
                alt="Astro Santosh Pandey" 
                className="h-20 w-48 md:w-56 object-contain object-left"
              />
              <span className="text-xs text-primary/70 italic mt-1">
                ज्योतिषं ज्ञानम्, भविष्यं प्रकाशः
              </span>
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary" asChild>
              <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`block py-2 text-lg font-medium ${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button className="w-full bg-primary text-primary-foreground" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary" asChild>
                  <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                    WhatsApp Now
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};