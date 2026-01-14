import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Award, Users, Globe, BookOpen, Heart, Star,
  ArrowRight, CheckCircle, Sparkles
} from "lucide-react";
import CertificationsShowcase from "@/components/home/CertificationsShowcase";

const achievements = [
  { value: "25+", label: "Years of Experience" },
  { value: "10,000+", label: "Happy Clients" },
  { value: "50+", label: "Countries Served" },
  { value: "95%", label: "Accuracy Rate" },
];

const values = [
  {
    icon: Star,
    title: "Accuracy",
    description: "We pride ourselves on precise predictions backed by deep knowledge and years of practice.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Every consultation is handled with empathy, understanding, and genuine care for your well-being.",
  },
  {
    icon: BookOpen,
    title: "Authenticity",
    description: "We follow traditional Vedic methods while adapting to modern needs, never compromising on authenticity.",
  },
  {
    icon: Users,
    title: "Confidentiality",
    description: "Your personal information and consultations are kept strictly private and secure.",
  },
];

const milestones = [
  { year: "1998", title: "Journey Began", description: "Started learning Vedic astrology from renowned Gurus" },
  { year: "2003", title: "First Consultation", description: "Began professional consultations after 5 years of rigorous study" },
  { year: "2010", title: "Expanded Services", description: "Added Numerology and Palmistry to our offerings" },
  { year: "2015", title: "Global Reach", description: "Started serving international clients across 30+ countries" },
  { year: "2020", title: "Online Platform", description: "Launched comprehensive online consultation services" },
  { year: "2024", title: "10,000 Clients", description: "Reached milestone of 10,000 satisfied clients worldwide" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Our Story, Mission & Values | Cosmic Guidance</title>
        <meta name="description" content="Learn about Cosmic Guidance's 25+ years journey in providing expert astrology, numerology, vastu, and palmistry services. Our mission, values, and commitment to accuracy." />
        <link rel="canonical" href="https://cosmicguidance.com/about" />
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Guiding Lives Through <span className="text-gradient-gold">Ancient Wisdom</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                For over 25 years, we've been dedicated to helping people navigate life's challenges
                through the profound sciences of Astrology, Numerology, Vastu, and Palmistry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif text-3xl md:text-4xl font-bold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
                  Our <span className="text-gradient-gold">Story</span>
                </h2>

                <div className="cosmic-card p-8 md:p-12 space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    ज्योतिषं ज्ञानम्, भविष्यं प्रकाशः
                    ज्योतिषः विद्या प्रदाति मार्गम्
                    ज्योतिषं सर्वार्थ साधकं

                  </p>
                  <p>
                  Hari Om,

                  </p>
                  <p>
                    I am Santosh Radheshyam Pandey, a former corporate professional with decades of experience in Customer Service, Quality Control, Project & Program Management, ORM, Social Media Management, and Financial Operations across Payment Gateway and FinTech organizations.


                  </p>
                  <p>
                 Despite a successful corporate career, Astrology emerged as my true calling. Through years of study and self-realization, I understood how planetary movements shaped key life events and aligned my journey with dharma.


                  </p>
                  <p>
                    Today, with a Master’s in Astrology, Palmistry, and Vastu, I serve this sacred knowledge full-time — guiding individuals through ethical, responsible, and deeply researched consultations.

                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient-gold">Mission</span>
              </h2>
              <p className="text-xl text-foreground/90 leading-relaxed mb-8">
                "To empower individuals with the wisdom of cosmic sciences, providing accurate guidance
                and effective remedies that transform challenges into opportunities and help people
                live their highest potential."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Accurate Predictions</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Ethical Practice</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Empowering Guidance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Our Core <span className="text-gradient-gold">Values</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient-gold">Journey</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                      <div className="cosmic-card p-6">
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-serif text-xl font-semibold mt-1 mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 md:-translate-x-1/2 ring-4 ring-background" />

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <CertificationsShowcase />
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
                Ready to Begin <span className="text-gradient-gold">Your Journey</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let us guide you towards clarity, success, and peace.
                Book your consultation today.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
