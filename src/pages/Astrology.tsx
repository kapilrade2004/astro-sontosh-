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
  ArrowRight, CheckCircle,
  PenTool, TrendingUp, Users, Building, Award
} from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Career Counselling",
    description: "Detailed analysis to understand:",
    features: [
      "Career growth, obstacles, and achievements",
      "Power, authority, and leadership potential",
      "Job vs Business suitability",
      "Best profession or industry",
      "Stability, name, and recognition"
    ],
    bottomText: "Includes predictions and remedial measures for different career phases."
  },
  {
    icon: Heart,
    title: "Marriage & Matchmaking",
    description: "In-depth marital analysis covering:",
    features: [
      "Partner characteristics",
      "Compatibility matching",
      "Timing of marriage",
      "Delay, denial, separation, or divorce factors",
      "Remedies for harmony and well-being"
    ],
    bottomText: ""
  },
  {
    icon: Baby,
    title: "Child Astrology",
    description: "Guidance on:",
    features: [
      "Promise of childbirth",
      "Timing of childbirth",
      "Reasons for delay or denial",
      "Corrective and spiritual remedies"
    ],
    bottomText: ""
  },
  {
    icon: Stethoscope,
    title: "Medical Astrology",
    description: "Understanding celestial influence on health:",
    features: [
      "Planetary and house impact on body and mind",
      "Disease timing via Dashas and Transits",
      "Ayurvedic Dosha balance",
      "Preventive remedies"
    ],
    note: "Not a substitute for medical treatment",
    bottomText: ""
  },
  {
    icon: PenTool,
    title: "Tattoo Guidance",
    description: "Astrologically aligned tattoo guidance based on birth chart to attract positivity and divine blessings.",
    features: [
      "Auspicious timing for tattooing",
      "Placement considerations based on chart",
      "Symbol and design alignment",
      "Spiritual and energetic considerations"
    ],
    bottomText: ""
  },
  {
    icon: Calendar,
    title: "Prediction of Key Life Events",
    description: "Timing and promise analysis for: Marriage, career change, property, Shani Sade Sati, health challenges, favourable and difficult phases.",
    features: [
      "Marriage timing prediction",
      "Career change and transitions",
      "Property purchase timing",
      "Shani Sade Sati guidance",
      "Health challenges prediction",
      "Favourable and difficult phase identification"
    ],
    bottomText: ""
  },
  
];

const remedies = [
  { icon: Gem, title: "Gemstones", description: "Planetary gemstones for protection and prosperity" },
  { icon: Circle, title: "Rudraksha", description: "Sacred beads for spiritual growth and peace" },
  { icon: Sparkles, title: "Crystals", description: "Healing crystals for energy balance" },
  { icon: Flame, title: "Pooja & Havan", description: "Sacred rituals for planetary appeasement" },
  { icon: BookOpen, title: "Mantra Jaap", description: "Powerful mantras for specific benefits" },
  { icon: Sun, title: "Daily Routine", description: "Personalized daily practices and lifestyle" },
  { icon: Shield, title: "Preventive Measures", description: "Protection from negative influences" },
  { icon: Clock, title: "Muhurta Selection", description: "Auspicious timing for important events" },
];

const faqs = [
  {
    question: "How accurate are astrological predictions?",
    answer: "With over  years of experience , our predictions have maintained a 95% accuracy rate. We use authentic Vedic astrology methods including divisional charts, Dasha systems, and Nakshatra analysis combined with intuitive guidance.",
  },
  {
    question: "What information do I need for a consultation?",
    answer: "For an accurate reading, we need your date of birth, exact time of birth, and place of birth. If you don't know your exact birth time, we can use alternative methods like palmistry or Prashna Kundali for analysis.",
  },
  {
    question: "How long does a consultation take?",
    answer: "A comprehensive consultation typically takes 45-60 minutes, covering all aspects of your query including predictions and remedies. Follow-up consultations are usually 30 minutes.",
  },
  {
    question: "Are remedies mandatory after consultation?",
    answer: "Remedies are suggestions to enhance positive outcomes and minimize challenges. They are never mandatory, and we always explain why specific remedies are recommended based on your unique birth chart and current planetary periods.",
  },
  {
    question: "Can you predict exact dates of events?",
    answer: "Yes, Vedic astrology allows us to narrow down event timing to specific periods using Dasha systems and transits. For major events like marriage or job changes, we can often predict within a month or provide specific muhurta (auspicious timing).",
  },
  {
    question: "What is the difference between Vedic and Western astrology?",
    answer: "Vedic astrology (Jyotish) uses the sidereal zodiac and focuses on karma, dharma, and life purpose. It incorporates divisional charts, Nakshatra system, and Dasha periods for precise timing, making it more predictive and remedy-oriented than Western astrology.",
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
        <title>Astrology Services – Jyotish Vidya | Cosmic Guidance</title>
        <meta name="description" content="Expert Vedic astrology services including career counselling, marriage matchmaking, child astrology, medical astrology, tattoo guidance, and customized remedial recommendations." />
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Astrology Services – Jyotish Vidya</span>
              <div className="text-sm md:text-base text-muted-foreground italic mt-2 mb-4">
             
              ज्योतिषं सर्वार्थ साधकं 

              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Unlock Your <span className="text-gradient-gold">Destiny</span> Through the Stars
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                Astrology is the science of light that helps decode karma, destiny, and free will. Using divisional charts, planetary Dashas, Nakshatra analysis, and transits, each consultation offers clarity, timing, and actionable guidance.
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
                Detailed analysis and guidance for every important area of your life using authentic Vedic astrology.
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
                      <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                      {service.note && (
                        <p className="text-xs text-muted-foreground italic">*{service.note}</p>
                      )}
                    </div>
                    <div className="lg:w-2/3">
                      {service.purpose && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-sm text-primary mb-3">Purpose:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.purpose.map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm text-foreground/80">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {service.bottomText && (
                        <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border/50">
                          {service.bottomText}
                        </p>
                      )}
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
                Personalized solutions based on your unique birth chart, right Tithi, and suitable Nakshatra for maximum effectiveness.
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
                with powerful customized remedies aligned to your birth chart.
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