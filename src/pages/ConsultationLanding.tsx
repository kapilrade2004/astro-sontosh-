import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Calendar, MessageCircle, Star, CheckCircle2, Grid3x3, Heart,
  Briefcase, TrendingUp, Compass, BookOpen, Hand, Hash, Users, Shield,
  UserCheck, Sparkles, Award, Headphones, Smartphone, CreditCard, Wallet,
  Landmark, Lock, ChevronLeft, ChevronRight, Zap, Mail, MapPin, Clock,
  User, ArrowRight,
} from "lucide-react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout/Layout";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

/* ─────────────────────────────────────────────────────────────────────────
   NOTE ON STRUCTURE
   This page now uses the site's standard <Layout> (Header + Footer +
   WhatsApp button), same as every other page. It also keeps its own promo
   strip (Call Now / Book / WhatsApp) directly below the fixed Header — that
   strip is NOT sticky, so it scrolls away normally instead of competing
   with the Header for the fixed top-0 slot. It still relies entirely on
   the site's existing design tokens (cosmic-card, text-gradient-gold, glow-gold, bg-gradient-hero,
   bg-gradient-cosmic, primary/muted colors) from index.css, so it will look
   fully on-brand. If you'd rather it use the standard site Header/Footer,
   let me know and I'll adjust.

   BACKEND / PAYMENT: The booking form now runs a full Cashfree payment flow,
   mirroring the existing Quick Service checkout: validate → POST /payment
   (amount is looked up from PLAN_AMOUNTS, never entered by hand) → Cashfree
   checkout modal → POST /verify (with retry) → only once payment is confirmed
   does it POST /consultation-booking, which saves the lead and sends the
   admin + customer emails. The callback form has no payment step and calls
   POST /callback-request directly. See the backend files for route handlers,
   the DB migration, and email templates.
───────────────────────────────────────────────────────────────────────── */

// ── Data ────────────────────────────────────────────────────────────────
const heroServices = [
  { icon: Grid3x3, label: "Kundli Analysis" },
  { icon: Heart, label: "Love & Marriage" },
  { icon: Briefcase, label: "Career & Business" },
  { icon: TrendingUp, label: "Finance Stability" },
  { icon: Compass, label: "Vastu Guidance" },
  { icon: BookOpen, label: "Akashik Record Reading" },
  { icon: Hand, label: "Palmistry Reading" },
  { icon: Hash, label: "Numerology Guidance" },
];

const trustBadges = [
  "Personalized Analysis",
  "Confidential Consultation",
  "Affordable Pricing",
  "Direct Expert Guidance",
];

const services = [
  {
    icon: Heart,
    title: "Love & Relationship Consultation",
    features: ["Relationship Guidance", "Family Issue Insight", "Love Situation Guidance", "Compatibility Check"],
  },
  {
    icon: Users,
    title: "Marriage Consultation",
    features: ["Marriage Timing", "Delayed Marriage", "Kundli Matching", "Marital Issues", "Domestic Harmony & Well-being"],
  },
  {
    icon: Briefcase,
    title: "Career Consultation",
    features: ["Job Change", "Opportunity Check", "Career Growth & Obstacle Removal"],
  },
  {
    icon: TrendingUp,
    title: "Finance Consultation",
    features: ["Financial Obstacles", "Shubh Muhurat Check", "Investment Timing", "Business Suitability Check"],
  },
  {
    icon: Grid3x3,
    title: "Detailed Kundli Analysis",
    features: ["Birth Chart Reading", "Planetary Prediction", "Dasha & Transit Prediction", "Dosha & Shani Sade Sati Check", "Premium Kundli Report"],
  },
  {
    icon: Compass,
    title: "Vastu Guidance",
    features: ["Home Vastu Analysis", "Property Selection Guidance", "Vastu Remedies", "Direction & Energy Balance"],
  },
  {
    icon: BookOpen,
    title: "Akashik Record Reading",
    features: ["Past Life Insights", "Life Purpose Guidance", "Karmic Blockages", "Spiritual Guidance"],
  },
  {
    icon: Hand,
    title: "Palmistry Reading",
    features: ["Palm Reading Analysis", "Life Line Insights", "Career & Wealth Indicators", "Marriage & Relationship Insights"],
  },
  {
    icon: Hash,
    title: "Numerology Guidance",
    features: ["Life Path Analysis", "Name Correction", "Lucky Numbers Prediction", "Lucky Day & Year Prediction"],
  },
];

const trustStrip = [
  { icon: Shield, label: "100% Confidential" },
  { icon: UserCheck, label: "Personalized Guidance" },
  { icon: Sparkles, label: "Effective Remedies" },
  { icon: Award, label: "Years of Experience" },
  { icon: Users, label: "Thousands of Happy Clients" },
  { icon: Headphones, label: "Expert Astrologer Support" },
];

const pricingPlans = [
  {
    id: "basic",
    name: "Basic Consultation",
    price: "₹1,100",
    features: ["15 Minutes Consultation", "One Major Question", "Personalized Guidance"],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium Consultation",
    price: "₹2,100",
    features: ["30 Minutes Consultation", "Multiple Questions", "Detailed Analysis", "Remedies Guidance"],
    popular: true,
  },
  {
    id: "complete",
    name: "Complete Life Analysis",
    price: "₹11,000",
    features: ["60 Minutes Consultation", "Detailed Kundli Analysis", "Career + Marriage + Finance Review", "Priority Support"],
    popular: false,
  },
];

const paymentMethods = [
  { icon: Smartphone, label: "UPI" },
  { icon: CreditCard, label: "Card Payment" },
  { icon: Wallet, label: "Wallets" },
  { icon: Landmark, label: "Net Banking" },
];

// Plain type names per client spec — also used as the Select's value and as the
// key Cashfree order amount is looked up by, so the PG never needs a manual amount.
const consultationTypeOptions = [
  "Basic Consultation",
  "Premium Consultation",
  "Complete Life Analysis",
];

const PLAN_AMOUNTS: Record<string, number> = {
  "Basic Consultation": 1100,
  "Premium Consultation": 2100,
  "Complete Life Analysis": 11000,
};

const testimonials = [
  {
    name: "Priya Sharma",
    quote: "My marriage-related concerns were addressed with remarkable clarity. The consultation was detailed and practical.",
  },
  {
    name: "Rahul Verma",
    quote: "The career guidance helped me make an important professional decision. Truly life-changing!",
  },
  {
    name: "Neha Iyer",
    quote: "Very accurate birth chart analysis and excellent consultation experience. Highly recommended!",
  },
];

const enrollSteps = [
  { num: "1", title: "Choose Consultation Package" },
  { num: "2", title: "Complete Payment" },
  { num: "3", title: "Get Confirmation & Consultation Details" },
];

// ── Validation helpers (same conventions as Pricing.tsx) ──────────────────
const validateName = (value: string): string => {
  if (!value.trim()) return "Full name is required.";
  if (value.trim().length < 3) return "Name must be at least 3 characters.";
  if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Name can only contain letters and spaces.";
  return "";
};

const validatePhone = (value: string): string => {
  if (!value.trim()) return "Phone number is required.";
  if (!/^\d{10}$/.test(value.trim())) return "Enter a valid 10-digit phone number.";
  return "";
};

const validateEmail = (value: string): string => {
  if (!value.trim()) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
  return "";
};

const validateRequired = (value: string, label: string): string =>
  value.trim() ? "" : `${label} is required.`;

// ── Shared avatar (initials, no stock photos) ──────────────────────────────
const InitialsAvatar = ({ name }: { name: string }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center shrink-0">
      <span className="font-serif font-bold text-primary">{initials}</span>
    </div>
  );
};

const StarRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const ConsultationLanding = () => {
  const { toast } = useToast();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";

  // ── Cashfree Payment Gateway ─────────────────────────────────────────
  const [cashfree, setCashfree] = useState<any>(null);
  useEffect(() => {
    const init = async () => {
      try {
        setCashfree(await load({ mode: "production" }));
      } catch (e) {
        console.error("Cashfree init failed", e);
      }
    };
    init();
  }, []);

  // ── Booking form state ──────────────────────────────────────────────
  const [bookingData, setBookingData] = useState({
    fullName: "", phone: "", whatsapp: "", email: "", dob: "",
    timeOfBirth: "", placeOfBirth: "", consultationType: "", message: "",
  });
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // ── Callback form state ─────────────────────────────────────────────
  const [callbackData, setCallbackData] = useState({ fullName: "", mobile: "", whatsapp: "" });
  const [callbackErrors, setCallbackErrors] = useState<Record<string, string>>({});
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [isCallbackSuccess, setIsCallbackSuccess] = useState(false);

  // ── Testimonial carousel ────────────────────────────────────────────
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const showPrev = () => setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const showNext = () => setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const scrollToBooking = () =>
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── Booking handlers ─────────────────────────────────────────────────
  const handleBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const sanitised = name === "phone" || name === "whatsapp" ? value.replace(/\D/g, "") : value;
    setBookingData((prev) => ({ ...prev, [name]: sanitised }));

    let error = "";
    if (name === "fullName") error = validateName(sanitised);
    if (name === "phone") error = validatePhone(sanitised);
    if (name === "whatsapp") error = validatePhone(sanitised);
    if (name === "email") error = validateEmail(sanitised);
    if (name === "dob") error = validateRequired(sanitised, "Date of birth");
    if (name === "timeOfBirth") error = validateRequired(sanitised, "Time of birth");
    if (name === "placeOfBirth") error = validateRequired(sanitised, "Place of birth");
    if (name === "consultationType") error = validateRequired(sanitised, "Consultation type");
    if (name === "message") error = validateRequired(sanitised, "Message / problem description");

    setBookingErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleConsultationTypeChange = (value: string) => {
    setBookingData((prev) => ({ ...prev, consultationType: value }));
    setBookingErrors((prev) => ({ ...prev, consultationType: validateRequired(value, "Consultation type") }));
  };

  const validateBookingAll = (): boolean => {
    const errors = {
      fullName: validateName(bookingData.fullName),
      phone: validatePhone(bookingData.phone),
      whatsapp: validatePhone(bookingData.whatsapp),
      email: validateEmail(bookingData.email),
      dob: validateRequired(bookingData.dob, "Date of birth"),
      timeOfBirth: validateRequired(bookingData.timeOfBirth, "Time of birth"),
      placeOfBirth: validateRequired(bookingData.placeOfBirth, "Place of birth"),
      consultationType: validateRequired(bookingData.consultationType, "Consultation type"),
      message: validateRequired(bookingData.message, "Message / problem description"),
    };
    setBookingErrors(errors);
    return Object.values(errors).every((e) => !e);
  };

  // Polls /verify a few times since Cashfree's webhook/status can lag slightly
  // behind the checkout modal closing — same pattern as the Quick Service flow.
  const verifyPaymentWithRetry = async (orderId: string, retries = 5, delay = 2500) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await axios.post(`${apiBaseUrl}/verify`, { orderId });
        if (res.data?.success) return res;
      } catch (err) {
        console.error(`Verify attempt ${i + 1} failed`, err);
      }
      if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
    }
    return null;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBookingAll()) return;

    if (!cashfree) {
      toast({
        variant: "destructive",
        title: "Payment System Not Ready",
        description: "Please refresh the page and try again.",
      });
      return;
    }

    setIsSubmittingBooking(true);
    try {
      const amount = PLAN_AMOUNTS[bookingData.consultationType];

      // 1. Create the Cashfree order — amount comes from the selected plan,
      //    the customer never enters or edits it.
      const orderRes = await axios.post(`${apiBaseUrl}/payment`, {
        amount,
        customer_name: bookingData.fullName,
        customer_phone: bookingData.phone,
        customer_email: bookingData.email,
      });

      if (!orderRes.data?.payment_session_id) {
        toast({
          variant: "destructive",
          title: "Payment Error",
          description: "Failed to create payment session. Please try again.",
        });
        return;
      }

      // 2. Open Cashfree's checkout modal
      const checkoutResult: any = await cashfree.checkout({
        paymentSessionId: orderRes.data.payment_session_id,
        redirectTarget: "_modal",
      });

      if (checkoutResult?.error) {
        toast({
          variant: "destructive",
          title: "Payment Not Completed",
          description: checkoutResult.error.message || "The payment was not completed.",
        });
        return;
      }

      // 3. Confirm the payment actually succeeded before saving anything
      const verifyRes = await verifyPaymentWithRetry(orderRes.data.order_id);
      if (!verifyRes?.data?.success) {
        toast({
          variant: "destructive",
          title: "Payment Verification Failed",
          description: `Couldn't confirm your payment. Contact us with Order ID: ${orderRes.data.order_id}`,
        });
        return;
      }

      // 4. Payment confirmed — now save the lead + trigger admin/customer notifications
      await fetch(`${apiBaseUrl}/consultation-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          orderId: orderRes.data.order_id,
          paymentSessionId: orderRes.data.payment_session_id,
          amount,
          source: "Book Your Consultation",
          landingPageUrl: window.location.href,
        }),
      });

      setIsBookingSuccess(true);
      // Auto-redirect back to the top of the landing page after showing the confirmation
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 3500);
    } catch (err) {
      console.error("Consultation booking/payment error:", err);
      toast({
        variant: "destructive",
        title: "Something Went Wrong",
        description: "Please try again or contact us on WhatsApp.",
      });
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // ── Callback handlers ────────────────────────────────────────────────
  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitised = value.replace(/\D/g, "");
    setCallbackData((prev) => ({ ...prev, [name]: sanitised }));
    setCallbackErrors((prev) => ({ ...prev, [name]: name === "fullName" ? "" : validatePhone(sanitised) }));
  };

  const handleCallbackNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCallbackData((prev) => ({ ...prev, fullName: value }));
    setCallbackErrors((prev) => ({ ...prev, fullName: validateName(value) }));
  };

  const validateCallbackAll = (): boolean => {
    const errors = {
      fullName: validateName(callbackData.fullName),
      mobile: validatePhone(callbackData.mobile),
      whatsapp: validatePhone(callbackData.whatsapp),
    };
    setCallbackErrors(errors);
    return Object.values(errors).every((e) => !e);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCallbackAll()) return;
    setIsSubmittingCallback(true);
    try {
      const response = await fetch(`${apiBaseUrl}/callback-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...callbackData,
          source: "Free Callback Request",
          landingPageUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("Server error");
      setIsCallbackSuccess(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 3500);
    } catch {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us on WhatsApp.",
      });
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  const inputCls = (hasError?: string) =>
    `w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border transition-colors text-sm placeholder:text-muted-foreground/50 outline-none ${
      hasError ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary/50"
    }`;

  return (
    <>
      <Helmet>
        <title>Astrology Guidance Consultation – Book Now | Astro Santosh Pandey</title>
        <meta
          name="description"
          content="Get accurate, personalized astrology guidance from Astro Santosh Pandey. Kundli analysis, love & marriage, career, finance, Vastu, palmistry and numerology consultations."
        />
      </Helmet>

      <Layout>
        {/* ── Hero ── */}
        <section className="pt-32 pb-12 md:pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Zodiac visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1 flex justify-center"
              >
                <div className="cosmic-card w-full max-w-sm aspect-square flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
                  <motion.img
                    src="/src/assets/Astrology.jpeg"
                    alt="Vedic Astrology Zodiac Wheel"
                    className="w-4/5 h-4/5 object-cover rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <p className="text-foreground/90 text-lg mb-1">Get Accurate</p>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-2">
                  <span className="text-gradient-gold">ASTROLOGY GUIDANCE</span>
                </h1>
                <p className="text-2xl sm:text-3xl font-serif font-semibold mb-2">For Your Life Problems</p>
                <p className="text-muted-foreground mb-6">
                  Personalized Consultation by <span className="text-primary font-medium">Astro Santosh Pandey</span>
                </p>

                {/* 8 service badges */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {heroServices.map((s) => (
                    <div key={s.label} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <StarRow />
                  <span className="text-sm text-muted-foreground">Trusted by Clients Across India</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" onClick={scrollToBooking}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10" asChild>
                    <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>

                <a
                  href="tel:+918879731174"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  Or call us directly: +91 88797 31174
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust badges strip ── */}
        <div className="bg-cosmic-navy border-y border-primary/20 py-3">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm">
            {trustBadges.map((b, i) => (
              <span key={b} className="flex items-center gap-1.5 text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl md:text-3xl font-bold mb-12"
            >
              OUR ASTROLOGY <span className="text-gradient-gold">CONSULTATION SERVICES</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.08 }}
                  className="cosmic-card p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Trust strip row */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {trustStrip.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <t.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-16 md:py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl md:text-3xl font-bold mb-12"
            >
              CHOOSE YOUR <span className="text-gradient-gold">CONSULTATION</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`cosmic-card p-8 flex flex-col relative ${plan.popular ? "border-primary/60 ring-2 ring-primary/30 md:-translate-y-3" : ""}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> MOST POPULAR
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-bold text-center mb-3 mt-2">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gradient-gold">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={plan.popular ? "glow-gold w-full" : "w-full"}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => {
                      setBookingData((prev) => ({ ...prev, consultationType: plan.name }));
                      setBookingErrors((prev) => ({ ...prev, consultationType: "" }));
                      scrollToBooking();
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Secure Your Slot ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl md:text-3xl font-bold mb-12"
            >
              SECURE YOUR <span className="text-gradient-gold">CONSULTATION SLOT</span>
            </motion.h2>

            <div className="grid lg:grid-cols-3 gap-10 items-center max-w-6xl mx-auto">
              {/* Steps */}
              <div className="flex flex-col gap-6">
                {enrollSteps.map((step) => (
                  <div key={step.num} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-primary font-bold shrink-0">
                      {step.num}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </div>

              {/* Payment methods */}
              <div className="cosmic-card p-6">
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Payment Options
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((m) => (
                    <div key={m.label} className="flex flex-col items-center gap-2 py-4 rounded-lg bg-muted/20 border border-primary/10">
                      <m.icon className="w-6 h-6 text-primary" />
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pay & book */}
              <div className="text-center">
                <Button size="lg" className="w-full glow-gold mb-3" onClick={scrollToBooking}>
                  <Lock className="w-4 h-4 mr-2" />
                  Pay &amp; Book Consultation
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-primary font-medium mb-1">
                  <Shield className="w-3.5 h-3.5" /> Secure Payment
                </p>
                <p className="text-xs text-muted-foreground">100% Secure &amp; Encrypted</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking Form ── */}
        <section id="booking-form" className="py-16 md:py-20 bg-gradient-cosmic scroll-mt-4">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl md:text-3xl font-bold mb-10"
            >
              BOOK YOUR <span className="text-gradient-gold">CONSULTATION</span>
            </motion.h2>

            <div className="cosmic-card p-6 md:p-10 max-w-4xl mx-auto">
              {isBookingSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold">Thank you!</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      Your consultation request has been received successfully. Our team will contact you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-3 gap-x-6 gap-y-5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="fullName" value={bookingData.fullName} onChange={handleBookingChange} placeholder="Enter your full name" className={inputCls(bookingErrors.fullName)} />
                    </div>
                    {bookingErrors.fullName && <p className="text-red-500 text-[11px]">{bookingErrors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="phone" value={bookingData.phone} onChange={handleBookingChange} maxLength={10} placeholder="10-digit phone number" className={inputCls(bookingErrors.phone)} />
                    </div>
                    {bookingErrors.phone && <p className="text-red-500 text-[11px]">{bookingErrors.phone}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      WhatsApp Number <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="whatsapp" value={bookingData.whatsapp} onChange={handleBookingChange} maxLength={10} placeholder="10-digit WhatsApp number" className={inputCls(bookingErrors.whatsapp)} />
                    </div>
                    {bookingErrors.whatsapp && <p className="text-red-500 text-[11px]">{bookingErrors.whatsapp}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="email" type="email" value={bookingData.email} onChange={handleBookingChange} placeholder="Enter email address" className={inputCls(bookingErrors.email)} />
                    </div>
                    {bookingErrors.email && <p className="text-red-500 text-[11px]">{bookingErrors.email}</p>}
                  </div>

                  {/* DOB */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date of Birth <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none z-10" />
                      <input
                        name="dob" type="date" value={bookingData.dob} onChange={handleBookingChange}
                        style={{ colorScheme: "dark" }}
                        className={inputCls(bookingErrors.dob)}
                      />
                    </div>
                    {bookingErrors.dob && <p className="text-red-500 text-[11px]">{bookingErrors.dob}</p>}
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Time of Birth <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none z-10" />
                      <input
                        name="timeOfBirth" type="time" value={bookingData.timeOfBirth} onChange={handleBookingChange}
                        style={{ colorScheme: "dark" }}
                        className={inputCls(bookingErrors.timeOfBirth)}
                      />
                    </div>
                    {bookingErrors.timeOfBirth && <p className="text-red-500 text-[11px]">{bookingErrors.timeOfBirth}</p>}
                  </div>

                  {/* Place of Birth */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Place of Birth <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="placeOfBirth" value={bookingData.placeOfBirth} onChange={handleBookingChange} placeholder="City, State" className={inputCls(bookingErrors.placeOfBirth)} />
                    </div>
                    {bookingErrors.placeOfBirth && <p className="text-red-500 text-[11px]">{bookingErrors.placeOfBirth}</p>}
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Consultation Type <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={bookingData.consultationType}
                      onValueChange={handleConsultationTypeChange}
                    >
                      <SelectTrigger
                        className={`w-full px-4 py-2.5 h-auto rounded-xl bg-muted/30 border text-sm ${
                          bookingErrors.consultationType ? "border-red-500" : "border-primary/20 focus:border-primary/50"
                        }`}
                      >
                        <SelectValue placeholder="Select Consultation Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypeOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {bookingErrors.consultationType && <p className="text-red-500 text-[11px]">{bookingErrors.consultationType}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1 md:col-span-3">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Message / Problem Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={bookingData.message}
                      onChange={handleBookingChange}
                      placeholder="Briefly describe your question or concern"
                      className={`w-full px-4 py-2.5 rounded-xl bg-muted/30 border transition-colors text-sm placeholder:text-muted-foreground/50 outline-none resize-none ${
                        bookingErrors.message ? "border-red-500" : "border-primary/20 focus:border-primary/50"
                      }`}
                    />
                    {bookingErrors.message && <p className="text-red-500 text-[11px]">{bookingErrors.message}</p>}
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-3 flex flex-col items-center gap-3 pt-2">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-12 glow-gold" disabled={isSubmittingBooking}>
                      {isSubmittingBooking ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Book Now"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Our team will contact you soon! · Your information is safe with us.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Stories of <span className="text-gradient-gold">Transformation</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Hear from clients who experienced real changes in their lives through our guidance and remedies.
              </p>
            </motion.div>

            <div className="flex items-center justify-center gap-4 max-w-5xl mx-auto">
              <button
                onClick={showPrev}
                aria-label="Previous testimonial"
                className="hidden sm:flex w-10 h-10 rounded-full border border-primary/30 items-center justify-center text-primary hover:bg-primary/10 transition-colors shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="grid sm:grid-cols-3 gap-6 flex-1">
                <AnimatePresence mode="wait">
                  {[0, 1, 2].map((offset) => {
                    const t = testimonials[(testimonialIndex + offset) % testimonials.length];
                    return (
                      <motion.div
                        key={`${t.name}-${offset}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: offset * 0.08 }}
                        className="cosmic-card p-6"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <InitialsAvatar name={t.name} />
                          <div>
                            <StarRow />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-4">"{t.quote}"</p>
                        <p className="font-serif font-semibold text-sm">— {t.name}</p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <button
                onClick={showNext}
                aria-label="Next testimonial"
                className="hidden sm:flex w-10 h-10 rounded-full border border-primary/30 items-center justify-center text-primary hover:bg-primary/10 transition-colors shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ── Callback + Limited Slots ── */}
        <section className="py-16 md:py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-2xl md:text-3xl font-bold mb-8"
            >
              STILL HAVE QUESTIONS? <span className="text-gradient-gold">GET A FREE CALLBACK</span>
            </motion.h2>

            <div className="cosmic-card p-6 md:p-8 max-w-4xl mx-auto">
              {isCallbackSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <p className="font-serif text-lg font-bold">Thank you!</p>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Your callback request has been received successfully. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="grid sm:grid-cols-4 gap-4 items-start">
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="fullName" value={callbackData.fullName} onChange={handleCallbackNameChange} placeholder="Full Name *" className={inputCls(callbackErrors.fullName)} />
                    </div>
                    {callbackErrors.fullName && <p className="text-red-500 text-[11px]">{callbackErrors.fullName}</p>}
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="mobile" value={callbackData.mobile} onChange={handleCallbackChange} maxLength={10} placeholder="Mobile Number *" className={inputCls(callbackErrors.mobile)} />
                    </div>
                    {callbackErrors.mobile && <p className="text-red-500 text-[11px]">{callbackErrors.mobile}</p>}
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input name="whatsapp" value={callbackData.whatsapp} onChange={handleCallbackChange} maxLength={10} placeholder="WhatsApp Number *" className={inputCls(callbackErrors.whatsapp)} />
                    </div>
                    {callbackErrors.whatsapp && <p className="text-red-500 text-[11px]">{callbackErrors.whatsapp}</p>}
                  </div>
                  <Button type="submit" className="w-full glow-gold" disabled={isSubmittingCallback}>
                    {isSubmittingCallback ? "Sending..." : (
                      <>
                        <Phone className="w-4 h-4 mr-2" /> REQUEST CALLBACK
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Limited slots banner */}
            <div className="max-w-4xl mx-auto mt-8 rounded-full bg-primary/10 border border-primary/30 px-6 py-3 flex items-center justify-center gap-2 text-center">
              <Zap className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-semibold text-primary">
                Limited Daily Consultation Slots Available —{" "}
                <button onClick={scrollToBooking} className="underline underline-offset-2">Book Now!</button>
              </span>
            </div>

            <p className="text-center text-sm text-muted-foreground italic mt-8 max-w-2xl mx-auto">
              "True astrology is not only about predicting the future; it is about understanding yourself,
              your karma, and making better choices with awareness."
            </p>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-14 bg-cosmic-navy border-t border-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">GET ANSWERS TO YOUR LIFE QUESTIONS TODAY</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Book Your Personal Consultation With <span className="text-primary">Astro Santosh Pandey</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white" asChild>
                <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WHATSAPP NOW
                </a>
              </Button>
              <Button size="lg" className="glow-gold" onClick={scrollToBooking}>
                <Calendar className="w-4 h-4 mr-2" /> BOOK CONSULTATION
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ConsultationLanding;