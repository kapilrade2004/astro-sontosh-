import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Sparkles, GraduationCap, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const plans = [
  {
    label: "Foundation",
    name: "Foundation Course",
    price: "₹15,000",
    popular: false,
    features: [
      "Complete Astrology Fundamentals",
      "Understanding Horoscope Structure",
      "12 Houses & Zodiac Signs",
      "Planetary Nature & Yogas",
      "Panch Mahapurush Yogas",
      "Ideal for Beginners",
    ],
  },
  {
    label: "Intermediate",
    name: "Intermediate Courses",
    price: "₹25,000",
    priceSuffix: "Each",
    popular: true,
    features: [
      "Transit Analysis Techniques",
      "Blank Chart Prediction",
      "Event Timing Methods",
      "Advanced Interpretation",
    ],
  },
  {
    label: "Advanced",
    name: "Advanced Courses",
    price: "₹40,000",
    priceSuffix: "Each",
    popular: false,
    features: [
      "Nakshatra Astrology",
      "Divisional Chart Analysis",
      "Professional Prediction Techniques",
      "Advanced Horoscope Interpretation",
    ],
  },
  {
    label: "Crash Course",
    name: "Crash Courses",
    price: "₹7,000",
    priceSuffix: "Each",
    popular: false,
    features: [
      "Specialized Astrology Topics",
      "Focused Learning Modules",
      "Practical Application",
      "Ideal for Skill Enhancement",
    ],
  },
];

const enrollSteps = [
  { num: "1", title: "Select Course" },
  { num: "2", title: "Complete Payment" },
  { num: "3", title: "Receive Login Details" },
  { num: "4", title: "Access Learning Portal" },
];

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEnrollClick = (courseName: string, coursePrice?: string) => {
    setSelectedCourse(courseName);
    setSelectedPrice(coursePrice || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";
      const response = await fetch(`${apiBaseUrl}/course-enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          course: selectedCourse,
          price: selectedPrice || "N/A"
        }),
      });

      if (!response.ok) throw new Error("Server responded with an error");

      toast({
        title: "Enrollment Request Sent",
        description: "We have received your request and will contact you shortly.",
      });

      handleCloseModal();
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Course Pricing & Enrollment – Vedic Astrology Courses | Cosmic Guidance</title>
        <meta name="description" content="View pricing for our Vedic Astrology courses — Foundation, Intermediate, Advanced & Crash Courses. Enroll today and start your astrological learning journey." />
      </Helmet>

      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <CosmicBackground />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Choose the Course That Fits Your <span className="text-gradient-gold">Learning Journey</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our astrology programs are designed for beginners, learners, and advanced practitioners who want to explore Vedic astrology in a structured and practical way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`cosmic-card p-8 flex flex-col relative ${plan.popular ? "border-primary/60 ring-2 ring-primary/30" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{plan.label}</span>
                <h3 className="font-serif text-xl font-bold mt-2 mb-1">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-gradient-gold">{plan.price}</span>
                  {plan.priceSuffix && <span className="text-muted-foreground text-sm ml-1">({plan.priceSuffix})</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={plan.popular ? "glow-gold w-full" : "w-full"} 
                  variant={plan.popular ? "default" : "outline"} 
                  onClick={() => handleEnrollClick(plan.name, plan.price)}
                >
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Enrollment <span className="text-gradient-gold">Process</span></h2>
          </motion.div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
            {enrollSteps.map((step, i) => (
              <motion.div key={step.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-center gap-3 sm:gap-0">
                <div className="flex flex-col items-center text-center sm:px-8">
                  <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-2">
                    {step.num}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {i < enrollSteps.length - 1 && (
                  <ArrowRight className="hidden sm:block h-5 w-5 text-primary/50 mx-2" />
                )}
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Begin Your Astrology Learning <span className="text-gradient-gold">Journey Today</span></h2>
            <p className="text-muted-foreground leading-relaxed">
              Unlock the ancient wisdom of astrology and learn how to interpret the language of the planets.
            </p>
            <Button size="lg" className="glow-gold" onClick={() => handleEnrollClick("Astrology Course (General)", "Variable")}>
              <GraduationCap className="mr-2 h-5 w-5" />Enroll Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pop Up Enrollment Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-background/90 cosmic-card p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-bold">Course Enrollment</h3>
                <p className="text-sm text-primary mt-1 font-medium">
                  {selectedCourse} {selectedPrice && <span className="text-muted-foreground ml-1">({selectedPrice})</span>}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-muted/30 border border-primary/20 focus:border-primary/60 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-muted/30 border border-primary/20 focus:border-primary/60 outline-none transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address (Optional)</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-muted/30 border border-primary/20 focus:border-primary/60 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full glow-gold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enrollment Request"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By submitting, you agree to our terms. We will contact you soon!
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Pricing;
