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
  Hand, Heart, Activity, TrendingUp, Brain, Fingerprint,
  ArrowRight, CheckCircle, Shield, Sparkles, HeartPulse, Wallet
} from "lucide-react";

const palmLines = [
  {
    icon: Heart,
    title: "Heart Line",
    description: "Reveals your emotional nature, love life, and relationship patterns. Understand your capacity for love and how you express affection.",
    features: ["Emotional depth analysis", "Love relationship patterns", "Romantic compatibility", "Emotional challenges", "Heart health indicators"],
  },
  {
    icon: Activity,
    title: "Life Line",
    description: "Shows your vitality, life energy, and major life changes. Often misunderstood, it reveals quality of life rather than length.",
    features: ["Vitality assessment", "Major life transitions", "Energy levels", "Life quality indicators", "Recovery potential"],
  },
  {
    icon: HeartPulse,
    title: "Health Line",
    description: "Indicates physical constitution, potential health concerns, and periods requiring attention. Helps in preventive health planning.",
    features: ["Constitution analysis", "Health vulnerability periods", "Organ sensitivity", "Stress indicators", "Wellness guidance"],
  },
  {
    icon: TrendingUp,
    title: "Fate Line",
    description: "Represents your career path, life direction, and worldly success. Shows how destiny and personal effort shape your journey.",
    features: ["Career trajectory", "Success periods", "Life direction", "Opportunity timing", "Achievement potential"],
  },
  {
    icon: Brain,
    title: "Head Line",
    description: "Reveals your intellectual capacity, thinking style, and mental approach to life. Indicates creativity vs analytical abilities.",
    features: ["Intellectual assessment", "Thinking patterns", "Learning style", "Decision-making ability", "Creative potential"],
  },
];

const additionalServices = [
  {
    icon: Fingerprint,
    title: "Palm Structure Analysis",
    description: "Complete analysis of hand shape, finger lengths, phalanges, and mounts for comprehensive personality insights.",
  },
  {
    icon: Shield,
    title: "Protective Remedies",
    description: "Customized remedies to overcome challenges revealed in your palm and enhance positive aspects.",
  },
  {
    icon: Sparkles,
    title: "Future Timing",
    description: "Precise timing of major life events using specialized palmistry techniques and markers.",
  },
  {
    icon: Wallet,
    title: "Wealth Indicators",
    description: "Analysis of prosperity signs, money lines, and financial potential visible in your palms.",
  },
];

const remedyCategories = [
  { title: "Relationship Healing", description: "Remedies to attract love and strengthen existing bonds" },
  { title: "Career Block Removal", description: "Solutions to overcome professional obstacles and stagnation" },
  { title: "Health Remedies", description: "Preventive measures and healing for health vulnerabilities" },
  { title: "Wealth Activation", description: "Techniques to unlock financial potential and attract prosperity" },
];

const faqs = [
  {
    question: "Can palmistry predict exact future events?",
    answer: "Palmistry reveals tendencies, potential, and probable timings rather than fixed events. Your palm shows the path, but your choices shape the journey. We provide guidance to maximize positive outcomes and minimize challenges.",
  },
  {
    question: "Do palm lines change over time?",
    answer: "Yes, palm lines can change, especially the finer lines. Major lines remain relatively stable, but their depth and clarity can shift. This reflects how our actions and choices influence our destiny.",
  },
  {
    question: "Which hand do you read for palmistry?",
    answer: "We read both hands. The non-dominant hand shows inherited traits and potential, while the dominant hand reveals how you've developed and your current path. Together, they provide a complete picture.",
  },
  {
    question: "Can you do palm reading through photos?",
    answer: "Yes, with high-quality photos of both palms in proper lighting, we can provide accurate readings. Clear images showing all lines and mounts are essential for comprehensive analysis.",
  },
  {
    question: "How accurate is palm reading?",
    answer: "When performed by an experienced palmist, readings are remarkably accurate for personality assessment, potential revelation, and tendency prediction. Combined with remedies, palmistry becomes a powerful tool for life improvement.",
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

const Palmistry = () => {
  return (
    <>
      <Helmet>
        <title>Palmistry Services - Palm Reading, Life Line Analysis | Cosmic Guidance</title>
        <meta name="description" content="Expert palmistry services including heart line, life line, fate line reading, palm structure analysis, and personalized remedies for life improvement." />
        <link rel="canonical" href="https://cosmicguidance.com/palmistry" />
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Palmistry</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Your Palms Hold the <span className="text-gradient-gold">Map of Your Destiny</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                Discover the secrets written in your hands. Get detailed readings of your life lines, 
                personality traits, and future potential with powerful remedies.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">
                  Get Palm Reading Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Major Lines Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Major <span className="text-gradient-gold">Palm Lines</span> Reading
              </h2>
              <p className="text-muted-foreground text-lg">
                Each line in your palm tells a unique story about different aspects of your life.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {palmLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="cosmic-card p-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <line.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold">{line.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{line.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {line.features.map((feature, i) => (
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

        {/* Additional Services */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Additional <span className="text-gradient-gold">Palm Analysis</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Remedies Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Remedies for <span className="text-gradient-gold">Critical Events</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Personalized solutions to overcome challenges and enhance positive potential revealed in your palms.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {remedyCategories.map((remedy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{remedy.title}</h3>
                    <p className="text-muted-foreground text-sm">{remedy.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-cosmic">
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Ready to Read <span className="text-gradient-gold">Your Destiny</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get your comprehensive palm reading today and discover what your hands 
                reveal about your past, present, and future.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">Get Palm Reading Now</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Palmistry;
