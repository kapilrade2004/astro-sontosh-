import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Orbit, Compass, Layers, Eye } from "lucide-react";

const services = [
  {
    icon: Orbit,
    title: "Astrology",
    description: "Decode destiny, karma, and life timing through precise chart analysis, Dashas, and Transits.",
    path: "/astrology",
    features: ["Career Guidance", "Marriage Timing", "Health Analysis", "Life Events"],
  },
  {
    icon: Compass,
    title: "Numerology",
    description: "Unlock strengths, challenges, and life cycles using numbers derived from your date of birth.",
    path: "/numerology",
    features: ["Mobile Numerology", "Name Correction", "Lucky Numbers", "Compatibility"],
  },
  {
    icon: Layers,
    title: "Vastu Shastra",
    description: "Balance the five elements of nature to enhance prosperity, health, and harmony in spaces.",
    path: "/vastu",
    features: ["Property Analysis", "Element Balancing", "Direction Correction", "Modern Remedies"],
  },
  {
    icon: Eye,
    title: "Palmistry",
    description: "Reveal life patterns and future possibilities through palm lines and hand structure analysis.",
    path: "/palmistry",
    features: ["Line Reading", "Structure Analysis", "Future Insights", "Life Remedies"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export const ServicesPreview = () => {
  return (
    <section className="py-24 bg-gradient-cosmic relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-amber-300 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Ancient Wisdom for <span className="text-gradient-gold">Modern Life</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed">
            Comprehensive spiritual guidance combining four powerful sciences 
            to illuminate every aspect of your life journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="cosmic-card p-8 group hover:glow-gold transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-500/25 via-yellow-400/20 to-amber-900/40 border border-amber-400/35 shadow-[0_0_20px_rgba(251,191,36,0.25)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-amber-400/60 transition-all duration-300">
                  <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-amber-300 transition-colors">{service.title}</h3>
                  <p className="text-foreground/80 text-base leading-relaxed mb-5">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-200 border border-amber-400/20 shadow-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button variant="ghost" className="group/btn text-amber-300 hover:text-amber-200 hover:bg-amber-400/10 p-0 font-semibold text-base" asChild>
                    <Link to={service.path}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform" strokeWidth={2.5} />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

