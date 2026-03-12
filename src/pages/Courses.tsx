import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Star, TrendingUp, User, ChevronRight,
  CheckCircle2, Sparkles, GraduationCap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const whyLearnItems = [
  {
    icon: BookOpen,
    title: "Authentic Vedic Knowledge",
    desc: "Learn astrology based on traditional Vedic principles and time-tested methodologies."
  },
  {
    icon: TrendingUp,
    title: "Structured Learning Path",
    desc: "Courses are divided into Foundation, Intermediate, and Advanced levels to ensure progressive understanding."
  },
  {
    icon: Star,
    title: "Practical Horoscope Reading",
    desc: "Understand how to interpret birth charts, yogas, planetary positions, and predictive combinations."
  },
  {
    icon: User,
    title: "Career & Personal Growth",
    desc: "Use astrology for personal guidance, professional practice, or deeper spiritual understanding."
  },
];

const foundationTopics = [
  "Introduction to Astrology",
  "Understanding Lagna (Ascendant)",
  "The 12 Houses in Astrology",
  "Significations of Houses",
  "Purushaarth: Dharma, Artha, Kama, Moksha",
  "Types of Houses (Kendra, Trikona, Trishday etc.)",
  "Introduction to Birth Chart",
  "Introduction to 9 Planets and their Nature",
  "Planetary Motion, Aspects & Avasthas",
  "Planetary Friendship & Enmity",
  "Exaltation, Debilitation & Mooltrikon",
  "Introduction to 12 Zodiac Signs",
  "Characteristics of Signs",
  "Elements (Tatva) and Sign Nature",
  "Body Parts & Zodiac Associations",
  "Important Yogas in Astrology",
];

const specialYogas = [
  "Vesi Yoga", "Vasi Yoga", "Ubhayachari Yoga", "Budhaditya Yoga",
  "Sunfa / Anfa / Durudhara Yoga", "Kemdrum Yoga", "Gajkesari Yoga",
  "Chandradhi Yoga", "Amala Yoga", "Chandra Mangal Yoga",
];

const panchMahapurushYogas = ["Ruchak", "Bhadra", "Hansa", "Malavya", "Shasha"];

const crashCourseTopics = [
  "In-Depth Kundali Analysis", "Vimshottari Dasha System", "Ashtakvarg Analysis",
  "Planetary Conjunction", "Career Prediction", "Medical Astrology",
  "Child & Progeny Analysis", "Retrograde Planets", "Astrology Remedies",
  "Gemstones & Crystals", "Rudraksha Significance",
];

const learningSteps = [
  { num: "1", title: "Choose Your Course", desc: "Select the course that matches your learning level." },
  { num: "2", title: "Enroll Online", desc: "Complete your registration and secure your seat." },
  { num: "3", title: "Get Login Access", desc: "Receive your course login credentials." },
  { num: "4", title: "Start Learning", desc: "Access course material, sessions, and practical learning modules." },
];

const Courses = () => {
  return (
    <Layout>
      <Helmet>
        <title>Vedic Astrology Courses – Learn Astrology Online | Cosmic Guidance</title>
        <meta name="description" content="Learn Vedic Astrology with structured courses from Foundation to Advanced. Practical horoscope reading, Nakshatra astrology, transit analysis and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <CosmicBackground />
        <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
          <Breadcrumbs />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Learn the <span className="text-gradient-gold">Sacred Science</span> of Vedic Astrology
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Discover the timeless wisdom of astrology and learn how planetary movements influence human life. Our structured courses are designed to help beginners, enthusiasts, and aspiring astrologers understand horoscope analysis, planetary energies, and predictive techniques.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Learn directly from traditional Vedic concepts and build the ability to interpret charts with clarity and confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="glow-gold" asChild>
                  <a href="#courses"><BookOpen className="mr-2 h-5 w-5" />Explore Courses</a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                  <Link to="/pricing"><GraduationCap className="mr-2 h-5 w-5" />Enroll Now</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="hidden lg:flex justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-cosmic border border-primary/20 flex items-center justify-center relative">
                <Sparkles className="h-24 w-24 text-primary animate-float" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-twinkle"><Star className="h-6 w-6 text-primary" /></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center animate-twinkle" style={{ animationDelay: "1s" }}><BookOpen className="h-5 w-5 text-accent" /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Learn Astrology */}
      <section className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Learn <span className="text-gradient-gold">Astrology</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Unlock the ancient wisdom that has guided civilizations for millennia.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyLearnItems.map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="cosmic-card p-6 text-center space-y-4 hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Astrology <span className="text-gradient-gold">Courses</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From foundational knowledge to advanced mastery — choose the path that matches your learning journey.</p>
          </motion.div>

          {/* Foundation Course */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="cosmic-card p-8 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">Foundation</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Basic / Foundation Course</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-gradient-gold">₹15,000</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Perfect for beginners who want to understand the fundamentals of Vedic astrology, horoscope structure, planetary influences, and zodiac signs. This course builds a strong foundation that helps students start reading and understanding birth charts.
            </p>
            <h4 className="font-serif text-lg font-semibold mb-4">What You Will Learn</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {foundationTopics.map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                </div>
              ))}
            </div>
            <h4 className="font-serif text-lg font-semibold mb-3">Special Yogas Covered</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {specialYogas.map((y) => (
                <div key={y} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary shrink-0 mt-0.5" />{y}
                </div>
              ))}
            </div>
            <h4 className="font-serif text-lg font-semibold mb-3">Panch Mahapurush Yogas</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {panchMahapurushYogas.map((y) => (
                <span key={y} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{y}</span>
              ))}
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing</Link>
            </Button>
          </motion.div>

          {/* Intermediate Courses */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="cosmic-card p-8 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">Intermediate</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Intermediate Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-gradient-gold">₹25,000 <span className="text-base text-muted-foreground font-normal">/ course</span></p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Designed for students who already understand basic astrology and want to develop predictive skills and chart interpretation techniques.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Course 1 — Transit Analysis</h4>
                <p className="text-muted-foreground text-sm">Learn how planetary movements influence life events and how astrologers use transits to predict important periods.</p>
                <ul className="space-y-2">{["Understanding planetary transits", "Transit impact on houses and planets", "Timing of events", "Practical prediction techniques", "Combining transit with birth chart analysis"].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}</li>
                ))}</ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Course 2 — Blank Chart Prediction</h4>
                <p className="text-muted-foreground text-sm">A powerful method used by astrologers to analyze life possibilities without relying on birth time accuracy.</p>
                <ul className="space-y-2">{["Blank chart analysis techniques", "Understanding planetary placements", "Event possibility analysis", "Interpreting planetary relationships", "Practical case studies"].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}</li>
                ))}</ul>
              </div>
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />See Pricing & Enroll</Link>
            </Button>
          </motion.div>

          {/* Advanced Courses */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="cosmic-card p-8 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground px-3 py-1 rounded-full mb-3">Advanced</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Advanced / Expert Level Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-gradient-gold">₹40,000 <span className="text-base text-muted-foreground font-normal">/ course</span></p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Advanced training for serious astrology practitioners who want to master deep analytical and predictive techniques.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Nakshatra Astrology</h4>
                <p className="text-muted-foreground text-sm">Understand the deeper layer of astrology through the 27 Nakshatras and their influence on destiny, personality, and karmic patterns.</p>
                <ul className="space-y-2">{["Introduction to Nakshatra system", "Characteristics of 27 Nakshatras", "Nakshatra based predictions", "Nakshatra and planetary relationships", "Practical horoscope analysis"].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}</li>
                ))}</ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Divisional Chart Analysis</h4>
                <p className="text-muted-foreground text-sm">Learn advanced horoscope interpretation through divisional charts used by professional astrologers.</p>
                <ul className="space-y-2">{["Importance of divisional charts", "D9 (Navamsa) analysis", "D10 (Career analysis)", "Relationship & marriage indicators", "Spiritual and karmic charts"].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}</li>
                ))}</ul>
              </div>
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing</Link>
            </Button>
          </motion.div>

          {/* Crash Courses */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="cosmic-card p-8 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full mb-3">Crash Course</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Astrology Crash Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold text-gradient-gold">₹7,000 <span className="text-base text-muted-foreground font-normal">/ course</span></p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Short and focused courses designed for students who want to master specific astrology topics quickly. These courses provide deep insights into specialized areas of horoscope interpretation.
            </p>
            <h4 className="font-serif text-lg font-semibold mb-4">Available Topics</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
              {crashCourseTopics.map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                </div>
              ))}
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />Explore Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Learning Format */}
      <section className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">How the Course <span className="text-gradient-gold">Works</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningSteps.map((step, i) => (
              <motion.div key={step.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                  {step.num}
                </div>
                <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="space-y-6">
            <Sparkles className="h-10 w-10 text-primary mx-auto" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Start Your Journey into <span className="text-gradient-gold">Astrology</span></h2>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a beginner or an experienced learner, our courses help you understand the deep science of astrology and its practical applications in life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button size="lg" className="glow-gold" asChild>
                <Link to="/pricing"><GraduationCap className="mr-2 h-5 w-5" />Enroll Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Courses;
