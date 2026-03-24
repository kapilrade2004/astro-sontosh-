

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import {
  BookOpen, Heart, Star,
  ArrowRight, CheckCircle, Sparkles, Users
} from "lucide-react";
import CertificationsShowcase from "@/components/home/CertificationsShowcase";
import AboutImg from "@/assets/AboutImg.jpeg";

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

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Our Story, Mission & Values | Astro Santosh Pandey</title>
        <meta name="description" content="Learn about Astro Santosh Pandey's journey in providing expert astrology, numerology, vastu, and palmistry services. Our mission, values, and commitment to accuracy." />
        <link rel="canonical" href="https://astrosantoshpandey.com/about" />
      </Helmet>
      <Layout>

        {/* Hero Section */}
        <section className="pt-32 pb-8 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>

                {/* Sanskrit Shloka */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mt-3 mb-6"
                >
                  <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
                  <div
                    className="text-sm md:text-lg font-bold
                      tracking-normal leading-loose text-left relative
                      bg-[length:200%_auto]
                      bg-gradient-to-r
                      from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                      bg-clip-text text-transparent
                      animate-[shimmer_5s_linear_infinite]
                      drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                      drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                    style={{
                      textShadow: `
                        0 0 5px rgba(255,215,0,0.5),
                        0 0 12px rgba(251,191,36,0.4),
                        0 0 25px rgba(245,158,11,0.3),
                        0 3px 8px rgba(0,0,0,0.3)
                      `,
                    }}
                  >
                    <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                    सन्तोषः परमो लाभः सत्सङ्गः परमा गतिः।
                    <br />
                    विचारः परमं ज्ञानं शमो हि परमं सुखम्॥
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  From Corporate Leader to
                  <span className="text-gradient-gold"> Aspiring Astropreneur</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                  We provide trusted guidance through Astrology, Numerology, Vastu, and Palmistry to help people make confident life decisions.
                </p>
              </motion.div>

              {/* Right: Client Photo — white bg removed with screen blend */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex justify-center items-center"
              >
                <div className="relative">
                  {/* Outer animated glow */}
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-amber-400/35 via-yellow-500/20 to-purple-900/30 blur-3xl animate-pulse pointer-events-none" />

                  {/* ── Image frame ── */}
                  <div
                    className="relative rounded-2xl overflow-hidden w-72 lg:w-80 xl:w-96"
                    style={{
                      /* Pure black bg — screen blend makes black invisible,
                         so only the person shows through cleanly */
                      background: "#000000",
                    }}
                  >
                    {/* Photo with screen blend — white bg disappears,
                        person remains fully visible and bright */}
                    <img
                      src={AboutImg}
                      alt="Astro Santosh Pandey"
                      className="relative z-10 w-full h-auto object-cover object-top block"
                      style={{
                        mixBlendMode: "screen",
                        filter: "brightness(0.92) contrast(1.1) saturate(1.1)",
                      }}
                    />

                    {/* Gold top glow — adds warm theme colour at top */}
                    <div
                      className="absolute top-0 left-0 right-0 z-20 h-32 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.22) 0%, transparent 70%)",
                      }}
                    />

                    {/* Bottom fade into page */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-20 h-20 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                      }}
                    />

                    {/* Subtle purple tint overlay for theme cohesion */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 110%, rgba(100,50,180,0.18) 0%, transparent 65%)",
                      }}
                    />
                  </div>

                  {/* Gold border ring */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1.5px rgba(251,191,36,0.45), 0 0 30px rgba(251,191,36,0.25), 0 0 70px rgba(218,165,32,0.12)",
                    }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-8 bg-background">
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

                <div className="cosmic-card p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">

                  {/* Opening Shloka */}
                  <div className="text-center space-y-2 relative">
                    <div className="absolute inset-0 bg-gradient-radial from-amber-400/15 via-yellow-400/8 to-transparent blur-2xl animate-pulse pointer-events-none" />
                    <div
                      className="text-sm md:text-lg font-bold
                        tracking-normal leading-loose text-center relative
                        bg-[length:200%_auto]
                        bg-gradient-to-r
                        from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                        bg-clip-text text-transparent
                        animate-[shimmer_5s_linear_infinite]
                        drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                        drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                      style={{
                        textShadow: `
                          0 0 5px rgba(255,215,0,0.5),
                          0 0 12px rgba(251,191,36,0.4),
                          0 0 25px rgba(245,158,11,0.3),
                          0 3px 8px rgba(0,0,0,0.3)
                        `,
                      }}
                    >
                      <span className="inline-block mr-2 text-red-600 animate-pulse">॥</span>
                      हरि ॐ नमः शिवाय
                      <span className="inline-block ml-2 text-red-600 animate-pulse">॥</span>
                    </div>
                  </div>

                  <p>
                    I am <span className="font-semibold text-primary">
                      Santosh Radheshyam Pandey
                    </span>, a former corporate professional with decades of experience in
                    Customer Service, Quality Control, Project & Program Management, ORM,
                    Social Media Management, and Financial Operations across Payment Gateway
                    and FinTech organizations.
                  </p>

                  <p>
                    Despite a successful corporate career, Astrology emerged as my true calling.
                    Through years of study and self-realization, I understood how planetary
                    movements shaped key life events and aligned my journey with
                    <span> dharma</span>.
                  </p>

                  <p>
                    Today, with a Master's in Astrology, Palmistry, and Vastu, I serve this
                    sacred knowledge full-time — guiding individuals through ethical,
                    responsible, and deeply researched consultations.
                  </p>

                  <div className="space-y-4">
                    <p className="font-medium text-primary">
                      In my practice, I have always ensured that:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span>Focus is on solutions, not on problems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span>Wisdom-based astrology (not fear-based astrology)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span>100% integrity and respect, without any prejudice</span>
                      </li>
                    </ul>
                  </div>

                  {/* Closing Shloka */}
                  <div className="text-center space-y-2 relative pt-2">
                    <div className="absolute inset-0 bg-gradient-radial from-amber-400/15 via-yellow-400/8 to-transparent blur-2xl animate-pulse pointer-events-none" />
                    <div
                      className="text-sm md:text-lg font-bold
                        tracking-normal leading-loose text-center relative
                        bg-[length:200%_auto]
                        bg-gradient-to-r
                        from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                        bg-clip-text text-transparent
                        animate-[shimmer_5s_linear_infinite]
                        drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                        drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                      style={{
                        textShadow: `
                          0 0 5px rgba(255,215,0,0.5),
                          0 0 12px rgba(251,191,36,0.4),
                          0 0 25px rgba(245,158,11,0.3),
                          0 3px 8px rgba(0,0,0,0.3)
                        `,
                      }}
                    >
                      <span className="inline-block mr-2 text-red-600 animate-pulse">॥</span>
                      हरि हर महादेव
                      <span className="inline-block ml-2 text-red-600 animate-pulse">॥</span>
                    </div>
                  </div>

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
                <Link to="/contact#booking">
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