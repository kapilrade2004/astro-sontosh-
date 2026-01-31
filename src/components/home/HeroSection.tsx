
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Sparkles, MessageCircle, Stars } from "lucide-react";
import LOGO from "@/assets/logo by yash.png";

export const HeroSection = () => {
  return (
    // Changed pt-20 to pt-32 pb-16 to give more breathing room on mobile
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-32 pb-16 lg:pt-20 lg:pb-0">
      <CosmicBackground />

      {/* Decorative elements - Adjusted position for mobile */}
      <motion.div
        className="absolute top-10 right-1 lg:top-1/4 lg:right-2.5 text-primary/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Stars className="w-8 h-8 lg:w-12 lg:h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered top badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 lg:mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs lg:text-sm">
            <Sparkles className="w-3 h-3 lg:w-4 lg:h-4" />
            Trusted by Clients Worldwide
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          {/* Added flex-col items-center for mobile centering, lg:items-start for desktop */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              // Adjusted font sizes for mobile (text-3xl)
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6"
            >
              Transform Your Life With Expert{" "}
              <span className="text-gradient-gold block lg:inline">Astrology, Numerology, Vastu & Palmistry</span>{" "}
              Guidance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-2xl lg:max-w-none"
            >
              Accurate predictions, personalised remedies, and life-changing solutions
              for career, marriage, finance, health & peace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              // Added w-full to container for mobile stacking
              className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-12 w-full sm:w-auto"
            >
              <Button
                size="lg"
                // Added w-full sm:w-auto for full width buttons on mobile
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold text-base lg:text-lg px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <Link to="/contact">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-base lg:text-lg px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </a>
              </Button>
            </motion.div>

            {/* Stats
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
            >
              {[
                { value: "25+", label: "Years Experience" },
                { value: "10K+", label: "Happy Clients" },
                { value: "95%", label: "Accuracy Rate" },
                { value: "50+", label: "Countries Served" },
              ].map((stat, index) => (
                // Added text-center for mobile, lg:text-left handled implicitly via parent or added specifically
                <div key={index} className="text-center lg:text-left">
                  <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div> */}
          </div>

          {/* Right Image with Sanskrit text below */}
          {/* REMOVED 'hidden' class so it shows on mobile. Added mt-12 for spacing on mobile */}
          <div className="relative flex flex-col items-center gap-1 mt-0 lg:mt-0 -translate-y-8 lg:-translate-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-3/4 lg:w-full max-w-sm lg:max-w-lg flex items-center justify-center"
            >
              {/* Yellow Glow Background */}
              <div
                className="
   
  "
              />

              {/* Logo */}
              <motion.img
                src={LOGO}
                alt="Astrology Logo"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="
  text-3xl md:text-2xl lg:text-3xl
  font-bold
  italic
  text-center
  tracking-wider
  leading-relaxed
  py-1
  bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500
  bg-clip-text text-transparent
  drop-shadow-[0_0_12px_rgba(255,200,120,0.6)]
">
                ॥ धर्मो रक्षति रक्षितः ॥
              </p>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on very small screens to save space, visible on md+ */}
      <motion.div
        className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
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

