import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Sparkles, MessageCircle, Stars } from "lucide-react";
import LOGO from "@/assets/logo-removebg-preview (1).png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      <CosmicBackground />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-primary/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Stars className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered top badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm">
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ Clients Worldwide
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transform Your Life With Expert{" "}
              <span className="text-gradient-gold">Astrology, Numerology, Vastu & Palmistry</span>{" "}
              Guidance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-6"
            >
              Accurate predictions, personalised remedies, and life-changing solutions 
              for career, marriage, finance, health & peace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6" asChild>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: "25+", label: "Years Experience" },
                { value: "10K+", label: "Happy Clients" },
                { value: "95%", label: "Accuracy Rate" },
                { value: "50+", label: "Countries Served" },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image with Sanskrit text below */}
          <div className="relative hidden lg:flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.img
                src={LOGO}
                alt="Astrology Logo"
                className="w-full h-auto object-contain max-w-lg"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-2xl md:text-3xl text-primary/80 italic font-medium text-center">
                ॥ धर्मो रक्षति रक्षितः ॥
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};