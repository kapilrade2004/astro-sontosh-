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
  Smartphone, PenTool, Calculator, Dice1, Users,
  ArrowRight, CheckCircle, Hash, TrendingUp, Heart
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Numerology",
    description: "Your mobile number carries powerful vibrations that affect your daily life. Decode the energy of your phone number and understand how it influences your luck, relationships, and opportunities.",
    features: ["Number energy analysis", "Luck factor assessment", "Recommendation for changes", "Business number evaluation", "Compatibility with birth date"],
  },
  {
    icon: PenTool,
    title: "Name Correction",
    description: "Your name creates vibrations that impact your success and well-being. Get personalized name spellings aligned with your birth numbers for enhanced prosperity and growth.",
    features: ["Vibrational alignment", "Spelling modifications", "Business name analysis", "Brand name creation", "Signature enhancement"],
  },
  {
    icon: Calculator,
    title: "Numerology Predictions",
    description: "Comprehensive life predictions based on your date of birth and name. Understand your life path, expression number, and soul urge for complete self-awareness.",
    features: ["Life path analysis", "Career predictions", "Finance outlook", "Health insights", "Relationship guidance"],
  },
  {
    icon: Dice1,
    title: "Lucky & Unlucky Numbers",
    description: "Discover which numbers bring you fortune and which ones to avoid. Use this knowledge for important decisions, vehicle numbers, house numbers, and more.",
    features: ["Personal lucky numbers", "Date selection guidance", "Vehicle number analysis", "House number assessment", "Business number optimization"],
  },
  {
    icon: Users,
    title: "Compatibility Match",
    description: "Check numerical compatibility with your partner, business associate, or team members. Understand the dynamics of your relationships through numbers.",
    features: ["Partner compatibility", "Business partner analysis", "Team alignment", "Family harmony", "Relationship improvement tips"],
  },
];

const highlights = [
  { icon: Hash, title: "Pythagorean System", description: "Ancient wisdom combined with modern application" },
  { icon: TrendingUp, title: "Life Path Mapping", description: "Complete journey analysis from birth to destiny" },
  { icon: Heart, title: "Relationship Insights", description: "Deep understanding of interpersonal dynamics" },
  { icon: Calculator, title: "Personal Year Forecast", description: "Year-by-year predictions for planning ahead" },
];

const faqs = [
  {
    question: "How does numerology work?",
    answer: "Numerology is based on the principle that numbers carry specific vibrations that influence our lives. Your birth date and name convert into numbers that reveal your personality, strengths, challenges, and life path.",
  },
  {
    question: "Can changing my name really improve my life?",
    answer: "Yes, when done correctly. A name change aligns your personal vibration with your life goals. Many successful people have benefited from strategic name modifications based on numerology.",
  },
  {
    question: "How important is my mobile number?",
    answer: "Your mobile number is in constant contact with you and others contact you through it. Its vibration affects your daily communication, opportunities, and relationships. An aligned mobile number can enhance your luck.",
  },
  {
    question: "What's the difference between lucky and favorable numbers?",
    answer: "Lucky numbers bring general good fortune, while favorable numbers are specifically aligned with certain activities or goals. We analyze both to give you comprehensive guidance for different areas of life.",
  },
  {
    question: "How accurate are numerology predictions?",
    answer: "Numerology predictions have shown remarkable accuracy when calculated correctly. Combined with your efforts and the right remedies, they can significantly improve your chances of success in any endeavor.",
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

const Numerology = () => {
  return (
    <>
      <Helmet>
        <title>Numerology Services - Name Correction, Mobile Numerology | Astro Santosh Pandey</title>
        <meta name="description" content="Expert numerology services including mobile number analysis, name correction, lucky numbers, compatibility matching, and life predictions based on birth date." />
        <link rel="canonical" href="https://astrosantoshpandey.com/numerology" />
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Numerology –  The Science of Numbers
</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Discover the <span className="text-gradient-gold">Power of Numbers</span> in Your Life
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                Numerology is a precise, data-driven occult science that uncovers personality traits, karmic strengths, and life cycles — using only your date of birth.

              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">
                  Check My Numbers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </motion.div>
              ))}
            </div>
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
                Our <span className="text-gradient-gold">Numerology Services</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive number analysis to align your life with positive vibrations.
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
                Ready to Decode <span className="text-gradient-gold">Your Numbers</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Discover what your numbers reveal about your destiny and learn how to 
                align them for success, prosperity, and happiness.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">Check My Numbers</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Numerology;
