

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import {
  BookOpen, HeartHandshake, Sparkles, ShieldCheck,
  ArrowRight, CheckCircle, CheckCircle2, Users
} from "lucide-react";
import CertificationsShowcase from "@/components/home/CertificationsShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import AboutImg from "@/assets/AboutImg.jpeg";
import LOGO from "@/assets/logo by yash.png";


const values = [
  {
    icon: Sparkles,
    title: "Accuracy",
    description: "We pride ourselves on precise predictions backed by deep knowledge and years of practice.",
  },
  {
    icon: HeartHandshake,
    title: "Compassion",
    description: "Every consultation is handled with empathy, understanding, and genuine care for your well-being.",
  },
  {
    icon: BookOpen,
    title: "Authenticity",
    description: "We follow traditional Vedic methods while adapting to modern needs, never compromising on authenticity.",
  },
  {
    icon: ShieldCheck,
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

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight">
                  Guiding Lives Through{" "}
                  <span className="text-gradient-gold block">
                    Ancient Wisdom &amp; Modern Understanding
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                  Personalized guidance through Vedic Astrology, Akashik Record Reading, Numerology, Vastu, and Palmistry to help individuals gain clarity, confidence, and positivity in life.
                </p>
              </motion.div>

              {/* Right: Client Photo — rounded rectangular card matching screenshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex justify-center items-center"
              >
                <div className="relative">
                  {/* Outer animated glow */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/35 via-yellow-500/20 to-purple-900/30 blur-3xl animate-pulse pointer-events-none" />

                  {/* ── Card Image frame matching live screenshot ── */}
                  <div
                    className="relative rounded-3xl overflow-hidden w-72 sm:w-80 lg:w-[350px] xl:w-[380px] aspect-[3/4] border-2 border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.3)] bg-card"
                  >
                    <img
                      src={AboutImg}
                      alt="Astro Santosh Pandey"
                      className="relative z-10 w-full h-full object-cover object-top block"
                    />

                    {/* Gold top subtle gradient glow */}
                    <div
                      className="absolute top-0 left-0 right-0 z-20 h-28 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(251,191,36,0.15) 0%, transparent 100%)",
                      }}
                    />
                  </div>
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
                  About <span className="text-gradient-gold">Astro Santosh Pandey</span> | Best Vedic Astrologer for Astrology Consultation, Akashik Record Reading, Vastu Shastra, Numerology & Palmistry
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
                    Welcome to <span className="font-semibold text-primary">Astro Santosh Pandey</span>, your best trusted destination for Vedic Astrology Consultation, Online Astrology Services, Kundali Analysis, Horoscope Reading, Vastu Shastra Guidance, Akashik Record Reading, Palmistry, Numerology, Spiritual Guidance, and Personalized Astrology Solutions.
                  </p>

                  <p>
                    I am <span className="font-semibold text-primary">
                      Santosh Radheshyam Pandey
                    </span>, a passionate Vedic Astrologer, Astrology Consultant, Akashik Record Reader and
                    Spiritual Guide, committed to helping people understand the deeper connection between
                    planets, karma, destiny, cosmic energies and life events.
                  </p>

                  <p>
                    After a successful professional journey in the corporate world, I discovered my deeper
                    purpose — to explore and share the timeless wisdom of Vedic Astrology (Jyotish Shastra).
                    What started as curiosity gradually transformed into a spiritual mission of guiding people
                    toward clarity, confidence, and positive transformation.
                  </p>

                  <p>
                    With continuous learning, research, and practical experience in Vedic Astrology, Kundali
                    Analysis, Horoscope Prediction, Birth Chart Reading, Akashik Record Reading (Spiritual
                    Energy Reading), Palmistry (Hasta Rekha Shastra), Numerology, and Vastu Shastra, I help
                    individuals understand planetary influences and discover practical solutions for their
                    life's challenges.
                  </p>

                  <div className="space-y-4">
                    <p className="font-medium text-primary">
                      At Astro Santosh Pandey Astrology Consultation, every guidance session is based on a combination of:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Vedic Astrology & Ancient Jyotish Principles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Detailed Janam Kundali / Birth Chart Analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Planetary Position & Dasha Interpretation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Soul Blueprint & Karmic Wisdom Reading</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Palmistry & Hand Reading Insights</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Vastu Shastra Guidance for Home & Business</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Spiritual Remedies & Positive Energy Practices</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Personalized Life Guidance Based on Individual Needs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium text-primary">
                      Through astrology, I provide guidance and insights for important areas of life including:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Career Astrology & Professional Growth</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Business Success & Financial Decisions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Marriage Astrology & Kundali Matching</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Love & Relationship Compatibility</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Family Harmony & Personal Relationships</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Health & Emotional Well-being Guidance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Education & Future Planning</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5.5 h-5.5 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] mt-0.5 shrink-0" strokeWidth={2.2} />
                        <span>Spiritual Growth & Self-Discovery</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    My approach is simple — astrology should empower and guide, not create fear.
                  </p>

                  <p className="italic text-primary/90 text-center text-lg">
                    ✨ "True astrology is not only about predicting the future; it is about understanding
                    yourself, your karma, and making better choices with awareness."
                  </p>

                  <p>
                    My vision through Astro Santosh Pandey is to bring the ancient wisdom of Vedic Astrology
                    and Spiritual Science into modern life by providing meaningful, ethical, and practical
                    guidance.
                  </p>

                  <p>
                    Whether you are searching for answers about your career, marriage, relationships, finance,
                    business, family, or spiritual journey, astrology can help you discover clarity and move
                    forward with confidence.
                  </p>

                  <p>
                    Let us walk together on a journey toward positivity, awareness, growth, and transformation.
                  </p>

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
                  className="cosmic-card p-6 text-center group hover:scale-105 hover:glow-gold transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/25 via-yellow-400/20 to-amber-900/40 border border-amber-400/35 shadow-[0_0_16px_rgba(251,191,36,0.2)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-amber-400/60 transition-all duration-300">
                    <value.icon className="w-8 h-8 text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-foreground group-hover:text-amber-300 transition-colors">{value.title}</h3>
                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <CertificationsShowcase />
        </section>

        {/* Testimonials Review Section from Home */}
        <TestimonialsSection />

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
