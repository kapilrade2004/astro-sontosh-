import { motion } from "framer-motion";
import { Target, Award, Clock, Heart, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Pinpoint Accuracy",
    description: "Over 95% prediction accuracy backed by years of research and practice in Vedic sciences.",
  },
  {
    icon: Award,
    title: "Years of Dedicated Astrological Practice",
    description: "Trusted by clients for reliable horoscope analysis and meaningful astrological guidance.",
  },
  {
    icon: Heart,
    title: "Personalized Solutions",
    description: "Every remedy and prediction is tailored specifically to your unique birth chart and circumstances.",
  },
  {
    icon: Clock,
    title: "Timely Predictions",
    description: "Precise timing of events including marriage, career changes, and major life transitions.",
  },
  {
    icon: Shield,
    title: "Confidential Service",
    description: "Your personal information and consultations are kept strictly private and secure.",
  },
  {
    icon: Zap,
    title: "Proven Results",
    description: "Multiple testimonials from clients who experienced real transformation in their lives.",
  },
  {
    icon: Target,
    title: "Solution-Focused Vedic Astrology",
    description: "Expert Vedic astrology consultations focused on practical solutions, effective remedies, and positive life outcomes — not problem amplification.",
  },
  {
    icon: Award,
    title: "Wisdom-Based & Ethical Astrology",
    description: "Authentic astrology guidance based on wisdom and logic, promoting clarity and confidence without fear-based predictions.",
  },
  {
    icon: Heart,
    title: "Trusted Astrologer with Integrity",
    description: "Astrology services delivered with complete integrity, respect, and transparency, ensuring unbiased and ethical guidance for every client.",
  },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Your Journey to <span className="text-gradient-gold">Clarity & Success</span> Starts Here
          </h2>
          <p className="text-muted-foreground text-lg">
            We combine ancient wisdom with modern understanding to provide you with
            the most accurate and actionable guidance for your life path.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="cosmic-card p-8 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
