import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Briefcase, Heart, Baby, Stethoscope, Calendar, 
  Gem, Circle, Sparkles, Flame, BookOpen, Sun, Shield, Clock,
  ArrowRight, CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Career Counselling",
    description: "Get comprehensive guidance on your career path, job changes, promotions, and business ventures. Understand the best timing for major career decisions based on your planetary positions.",
    features: ["Career direction analysis", "Job change timing", "Promotion insights", "Business venture guidance", "Entrepreneurship timing"],
  },
  {
    icon: Heart,
    title: "Marriage & Matchmaking",
    description: "Find your perfect match with detailed compatibility analysis. Know the ideal timing for marriage and strengthen your relationship through understanding planetary influences.",
    features: ["Kundli matching", "Compatibility analysis", "Marriage timing prediction", "Relationship stability guidance", "Manglik dosha analysis"],
  },
  {
    icon: Baby,
    title: "Child Astrology",
    description: "Understand your child's potential from birth. Get insights on their education, health, talents, and future prospects through detailed birth chart analysis.",
    features: ["Birth chart reading", "Education guidance", "Talent identification", "Health predictions", "Career potential analysis"],
  },
  {
    icon: Stethoscope,
    title: "Medical Astrology",
    description: "Identify sensitive health periods and understand planetary effects on your physical well-being. Get preventive guidance for chronic conditions.",
    features: ["Health period predictions", "Chronic condition analysis", "Planetary health effects", "Preventive measures", "Recovery timing"],
  },
  {
    icon: Calendar,
    title: "Life Events Prediction",
    description: "Know the timing of major life events including marriage, job changes, property purchases, childbirth, and more with remarkable accuracy.",
    features: ["Marriage timing", "Career transitions", "Property purchase timing", "Childbirth predictions", "Shani Sade Sati & Dhaiya guidance"],
  },
];

const remedies = [
  { icon: Gem, title: "Gemstones", description: "Planetary gemstones for protection and prosperity" },
  { icon: Circle, title: "Rudraksha", description: "Sacred beads for spiritual growth and peace" },
  { icon: Sparkles, title: "Crystals", description: "Healing crystals for energy balance" },
  { icon: Flame, title: "Pooja & Havan", description: "Sacred rituals for planetary appeasement" },
  { icon: BookOpen, title: "Mantra Jaap", description: "Powerful mantras for specific benefits" },
  { icon: Sun, title: "Daily Routine", description: "Personalized daily practices" },
  { icon: Shield, title: "Preventive Measures", description: "Protection from negative influences" },
  { icon: Clock, title: "Muhurta Selection", description: "Auspicious timing for important events" },
];

const faqs = [
  {
    question: "How accurate are astrological predictions?",
    answer: "With over 25 years of experience and thousands of successful consultations, our predictions have maintained a 95% accuracy rate. We use authentic Vedic astrology methods combined with intuitive analysis.",
  },
  {
    question: "What information do I need for a consultation?",
    answer: "For an accurate reading, we need your date of birth, exact time of birth, and place of birth. If you don't know your exact birth time, we can use alternative methods for analysis.",
  },
  {
    question: "How long does a consultation take?",
    answer: "A comprehensive consultation typically takes 45-60 minutes, covering all aspects of your query including predictions and remedies. Follow-up consultations are usually 30 minutes.",
  },
  {
    question: "Are remedies mandatory after consultation?",
    answer: "Remedies are suggestions to enhance positive outcomes and minimize challenges. They are never mandatory, and we always explain why specific remedies are recommended for your situation.",
  },
  {
    question: "Can you predict exact dates of events?",
    answer: "Yes, Vedic astrology allows us to narrow down event timing to specific periods. For major events like marriage or job changes, we can often predict within a month or specific muhurta.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Astrology = () => {
  return (
    <>
      <Helmet>
        <title>Astrology Services - Career, Marriage, Health Predictions | Cosmic Guidance</title>
        <meta name="description" content="Expert astrology services including career counselling, marriage matchmaking, child astrology, medical astrology, and life events prediction with personalized remedies." />
        <link rel="canonical" href="https://cosmicguidance.com/astrology" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Vedic Astrology</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Unlock Your <span className="text-gradient-gold">Destiny</span> Through the Stars
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                Comprehensive astrological analysis covering career, relationships, health, and life events 
                with accurate predictions and powerful remedies.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">
                  Get Your Personalised Prediction
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient-gold">Astrology Services</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Detailed analysis and guidance for every important area of your life.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="cosmic-card p-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Remedies Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Customised <span className="text-gradient-gold">Remedies</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Personalized solutions based on your unique birth chart for maximum effectiveness.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {remedies.map((remedy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="cosmic-card p-5 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <remedy.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{remedy.title}</h3>
                  <p className="text-muted-foreground text-xs">{remedy.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient-gold">Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="cosmic-card px-6">
                    <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Ready to Discover Your <span className="text-gradient-gold">Cosmic Path</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Book your personalized astrology consultation today and get accurate predictions 
                with powerful remedies.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">Get Your Personalised Prediction</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Astrology;
