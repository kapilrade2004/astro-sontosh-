import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Stethoscope, Wallet, Baby, Building, Calendar, Shield } from "lucide-react";

const predictions = [
  {
    icon: Briefcase,
    title: "Career & Business",
    description: "Get clarity on job changes, promotions, business ventures, and the best timing for career moves.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Heart,
    title: "Marriage & Relationships",
    description: "Find your ideal match, know the best marriage dates, and strengthen relationship bonds.",
    color: "from-rose-500/20 to-rose-600/10",
  },
  {
    icon: Stethoscope,
    title: "Health & Wellness",
    description: "Identify sensitive health periods and get preventive remedies for chronic conditions.",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    icon: Wallet,
    title: "Finance & Wealth",
    description: "Optimize your financial decisions, know investment timings, and attract prosperity.",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: Baby,
    title: "Child & Education",
    description: "Understand your child's potential, guide their education, and nurture their talents.",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: Building,
    title: "Property & Assets",
    description: "Best times to buy or sell property, real estate investments, and inheritance matters.",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    icon: Calendar,
    title: "Tiiming of Key Events",
    description: "Navigate challenging planetary periods with powerful remedies and protective measures.",
    color: "from-indigo-500/20 to-indigo-600/10",
  },
  {
    icon: Shield,
    title: "Protection & Remedies",
    description: "Remove obstacles, ward off negative energies, and invite positive transformations.",
    color: "from-orange-500/20 to-orange-600/10",
  },
];

export const FeaturedPredictions = () => {
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
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Life Predictions</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Insights for <span className="text-gradient-gold">Every Aspect</span> of Life
          </h2>
          <p className="text-muted-foreground text-lg">
            From career decisions to family matters, get precise guidance on all
            the important areas that shape your destiny.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {predictions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="cosmic-card p-6 text-center group hover:scale-[1.03] transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
            <Link to="/contact#booking">Get Your Personalised Prediction</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
