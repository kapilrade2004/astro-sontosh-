

import { motion } from "framer-motion";
import { Gem, Sparkles, Flame, BookOpen, Sun, Shield, Leaf } from "lucide-react";
import RudrakshaImg from "@/assets/Rudraksha-icon-PNG.png";

const RudrakshaIcon = ({ className }: { className?: string }) => (
  <img src={RudrakshaImg} className={className} alt="Rudraksha" style={{ objectFit: "contain" }} />
);

const remedies = [
  {
    icon: Gem,
    title: "Gemstones",
    description: "Powerful planetary gemstones recommended based on your birth chart for protection and prosperity.",
  },
  {
    icon: "rudraksha",
    title: "Rudraksha",
    description: "Sacred beads with divine energy to enhance meditation, remove obstacles, and bring peace.",
  },
  {
    icon: Sparkles,
    title: "Crystals",
    description: "Healing crystals selected for your specific needs to balance energy and attract positivity.",
  },
  {
    icon: Flame,
    title: "Pooja & Havan",
    description: "Customized rituals and fire ceremonies to appease planets and invoke divine blessings.",
  },
  {
    icon: BookOpen,
    title: "Mantra Jaap",
    description: "Powerful mantras prescribed for your specific planetary combinations for maximum benefit.",
  },
  {
    icon: Sun,
    title: "Daily Routine",
    description: "Personalized daily practices aligned with your horoscope for optimal health and success.",
  },
  {
    icon: Shield,
    title: "Protective Measures",
    description: "Yantras, talismans, and protective methods to ward off negative energies.",
  },
  {
    icon: Leaf,
    title: "Natural Remedies",
    description: "Ayurvedic and natural solutions aligned with planetary influences for holistic healing.",
  },
];

export const RemediesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Remedies & Healing</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Powerful <span className="text-gradient-gold">Customised Remedies</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Every remedy is carefully selected and personalized based on your unique 
            birth chart and current planetary positions for maximum effectiveness.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {remedies.map((remedy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="cosmic-card p-6 text-center group hover:scale-[1.05] transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                {remedy.icon === "rudraksha" ? (
                  <RudrakshaIcon className="w-6 h-6 text-primary" />
                ) : (
                  <remedy.icon className="w-6 h-6 text-primary" />
                )}
              </div>
              <h3 className="font-serif text-base font-semibold mb-2">{remedy.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{remedy.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};