import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
import LOGO from "@/assets/logo by yash.png";

import {
  ChevronRight, ChevronLeft, CheckCircle2,
  Star, Phone, Calendar, Clock, MapPin, Ruler,
  ChevronDown, ChevronUp, IndianRupee,
  Moon, Compass, MessageCircle, Heart, TrendingUp,
  Brain, Hash, Home, Gem, Zap, Baby, Briefcase,
  DollarSign, Plane, Scroll, Sparkles, User, Repeat,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Service = "Astrology" | "Numerology" | "Vastu";

interface FormData {
  service: Service | "";
  name: string;
  mobile: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  tob_hour: string;
  tob_minute: string;
  tob_period: "AM" | "PM";
  pob: string;
  length: string;
  width: string;
  consultDate: string;
  consultTime: string;
  message: string;
}
type FieldErrors = Partial<Record<keyof FormData, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICES: { id: Service; emoji: string; label: string; desc: string }[] = [
  { id: "Astrology",  emoji: "🪐", label: "Astrology",  desc: "Birth chart, predictions & planetary guidance" },
  { id: "Numerology", emoji: "🔢", label: "Numerology", desc: "Life path, destiny & soul urge numbers" },
  { id: "Vastu",      emoji: "🏠", label: "Vastu",      desc: "Space harmonisation & energy alignment" },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];

const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 59 }, (_, i) => String(i + 1).padStart(2, "0"));

const DAYS   = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MONTHS = [
  { val: "01", label: "January" }, { val: "02", label: "February" }, { val: "03", label: "March" },
  { val: "04", label: "April" },   { val: "05", label: "May" },       { val: "06", label: "June" },
  { val: "07", label: "July" },    { val: "08", label: "August" },    { val: "09", label: "September" },
  { val: "10", label: "October" }, { val: "11", label: "November" },  { val: "12", label: "December" },
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

const todayStr = new Date().toISOString().split("T")[0];
const getMaxConsultDate = (): string => {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
};
const maxConsultDate = getMaxConsultDate();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";

const formatDisplayDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
};

const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && /^[a-zA-Z\s.'\-]+$/.test(trimmed);
};

const nameKeyDownGuard = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowed = /^[a-zA-Z\s.'\-]$/;
  const navKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
  if (!allowed.test(e.key) && !navKeys.includes(e.key)) e.preventDefault();
};

const EMPTY: FormData = {
  service: "", name: "", mobile: "",
  dob_day: "", dob_month: "", dob_year: "",
  tob_hour: "", tob_minute: "", tob_period: "AM",
  pob: "", length: "", width: "",
  consultDate: "", consultTime: "", message: "",
};



// ─── Per-service pricing datasets ────────────────────────────────────────────

// Quick / Micro services — all 25 services matching quickServices.ts exactly
// Sorted by price tier: ₹1,100 → ₹2,100 → ₹3,100
const quickServicesData = [
  // ── ₹1,100 tier ────────────────────────────────────────────────────────────
  { service: "Daily Ritual Suggestion (Simple Routine)",        price: "1,100", icon: Moon,          tier: "₹1,100" },
  { service: "Go Ahead or Wait Decision Guidance",              price: "1,100", icon: Compass,       tier: "₹1,100" },
  { service: "Right Time Check (Shubh Time for Any Decision)",  price: "1,100", icon: Clock,         tier: "₹1,100" },
  // ── ₹2,100 tier ────────────────────────────────────────────────────────────
  { service: "Ask 1 Question (Yes/No + Reason)",                price: "2,100", icon: MessageCircle, tier: "₹2,100" },
  { service: "Relationship Guidance",                           price: "2,100", icon: Heart,         tier: "₹2,100" },
  { service: "Family Issue Insight",                            price: "2,100", icon: Heart,         tier: "₹2,100" },
  { service: "Love Situation Guidance",                         price: "2,100", icon: Heart,         tier: "₹2,100" },
  { service: "Opportunity Check (Anything good coming soon?)",  price: "2,100", icon: TrendingUp,    tier: "₹2,100" },
  { service: "Sleep / Stress Related Insight",                  price: "2,100", icon: Moon,          tier: "₹2,100" },
  { service: "Strength Insight (Hidden Strengths)",             price: "2,100", icon: Brain,         tier: "₹2,100" },
  { service: "Name Initial Suggestion (for business/personal)", price: "2,100", icon: Hash,          tier: "₹2,100" },
  { service: "Property Buying Time Check",                      price: "2,100", icon: Home,          tier: "₹2,100" },
  { service: "Muhurat – Auspicious Timing",                     price: "2,100", icon: Star,          tier: "₹2,100" },
  { service: "Know Your Lucky Days & Colours",                  price: "2,100", icon: Star,          tier: "₹2,100" },
  { service: "Rudraksha / Crystal Recommendation",              price: "2,100", icon: Gem,           tier: "₹2,100" },
  { service: "Tattoo Recommendation",                           price: "2,100", icon: Zap,           tier: "₹2,100" },
  { service: "New Born Baby Name Recommendation",               price: "2,100", icon: Baby,          tier: "₹2,100" },
  // ── ₹3,100 tier ────────────────────────────────────────────────────────────
  { service: "Compatibility Check",                             price: "3,100", icon: Heart,         tier: "₹3,100" },
  { service: "Job Change Decision Guidance",                    price: "3,100", icon: Briefcase,     tier: "₹3,100" },
  { service: "Money Flow Guidance",                             price: "3,100", icon: DollarSign,    tier: "₹3,100" },
  { service: "Career Guidance",                                 price: "3,100", icon: Briefcase,     tier: "₹3,100" },
  { service: "Travel / Relocation Decision Check",              price: "3,100", icon: Plane,         tier: "₹3,100" },
  { service: "Gemstone Recommendation",                         price: "3,100", icon: Gem,           tier: "₹3,100" },
  { service: "Lifestyle & Behavioural Recommendation",          price: "3,100", icon: Heart,         tier: "₹3,100" },
  { service: "Premium Kundli",                                  price: "3,100", icon: Scroll,        tier: "₹3,100" },
];

// Astrology-specific pricing
const astrologyData = [
  { service: "New Consultation (Exact Birth Time Known)",       price: "21,000", duration: "30 min", icon: Sparkles },
  { service: "New Consultation (Exact Birth Time NOT Known)",   price: "31,000", duration: "60 min", icon: Sparkles },
  { service: "In-Person Consultation (Mumbai Only)",            price: "31,000", duration: "60 min", icon: Sparkles },
  { service: "Follow-up within 10 days",                        price: "3,100",  duration: "30 min", icon: Repeat   },
  { service: "Follow-up (11–30 days)",                          price: "5,100",  duration: "30 min", icon: Repeat   },
  { service: "Follow-up (post 30 days)",                        price: "11,000", duration: "30 min", icon: Repeat   },
  // { service: "Name Initial Suggestion (business/personal)",     price: "1,100",  icon: Hash         },
  // { service: "Property Buying Time Check",                      price: "1,100",  icon: Home         },
  // { service: "Gemstone Recommendation",                         price: "2,100",  icon: Gem          },
  // { service: "Premium Kundli",                                  price: "2,100",  icon: Scroll       },
];

// Numerology-specific pricing
const numerologyData = [
  { service: "New Consultation",                                price: "5,100",  duration: "30 min", icon: Hash     },
  { service: "Follow-up within 10 days",                        price: "1,100",  duration: "30 min", icon: Repeat   },
  { service: "Follow-up (11–30 days)",                          price: "2,100",  duration: "30 min", icon: Repeat   },
  { service: "Follow-up (post 30 days)",                        price: "3,100",  duration: "30 min", icon: Repeat   },
  // { service: "Name Initial Suggestion (business/personal)",     price: "1,100",  icon: Hash         },
  // { service: "Know Your Lucky Days & Colours",                  price: "1,100",  icon: Star         },
];

// Vastu-specific pricing
const vastuData = [
  { service: "Vastu Exploration Call (Online)",                 price: "11,000", duration: "30 min", icon: Home     },
  // { service: "Property Buying Time Check",                      price: "1,100",  icon: Home         },
];

// ─── Pricing Row ──────────────────────────────────────────────────────────────
type PricingItem = {
  service: string;
  price: string;
  icon: React.ElementType;
  duration?: string;
  tier?: string;
};

const PricingRow = ({ item }: { item: PricingItem }) => (
  <div className="flex items-center justify-between px-3 py-2.5 hover:bg-primary/5 transition-colors group">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <item.icon className="w-3 h-3 text-primary" />
      </div>
      <div className="min-w-0">
        <span className="font-medium text-foreground text-[11px] block leading-snug">{item.service}</span>
        {item.duration && (
          <p className="text-[9px] text-muted-foreground leading-none mt-0.5 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 inline" />{item.duration}
          </p>
        )}
      </div>
    </div>
    <div className="flex flex-col items-end shrink-0 pl-3">
      <span className="text-sm font-bold text-primary">₹{item.price}</span>
    </div>
  </div>
);

// ─── Single service accordion ─────────────────────────────────────────────────
interface ServiceAccordionProps {
  emoji: string;
  label: string;
  subtitle: string;
  items: PricingItem[];
  priceRange: string;         // e.g. "₹500 – ₹2,100"
  accentColor?: string;       // optional tint override
  defaultOpen?: boolean;
}

const ServiceAccordion = ({
  emoji, label, subtitle, items, priceRange, defaultOpen = false,
}: ServiceAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-primary/20 transition-all duration-200"
      style={{ background: "hsl(var(--card)/0.5)" }}
    >
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3 text-left min-w-0">
          {/* Emoji badge */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 shadow-sm"
            style={{ background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.25)" }}
          >
            {emoji}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-none" style={{ color: "hsl(var(--card-foreground))" }}>
              {label}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-none truncate">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Price range pill — hidden when open */}
          {!open && (
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{
                background: "hsl(var(--primary)/0.12)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary)/0.2)",
              }}
            >
              {priceRange}
            </span>
          )}
          {open
            ? <ChevronUp className="w-4 h-4 text-primary" />
            : <ChevronDown className="w-4 h-4 text-primary/60" />
          }
        </div>
      </button>

      {/* Collapsible rows */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="border-t border-primary/10 divide-y divide-primary/8 max-h-64 overflow-y-auto"
              style={{ background: "hsl(var(--background)/0.4)" }}
            >
              {items.map((item, i) => <PricingRow key={i} item={item} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Service-wise pricing panel ───────────────────────────────────────────────
const ServiceWisePricing = () => (
  <div className="space-y-2.5">
    <ServiceAccordion
      emoji="⚡"
      label="Quick Services"
      subtitle="Instant guidance, no appointment needed"
      priceRange="₹500 – ₹2,100"
      items={quickServicesData}
    />
    <ServiceAccordion
      emoji="🪐"
      label="Astrology"
      subtitle="Consultations, follow-ups & astrology add-ons"
      priceRange="₹1,100 – ₹15,000"
      items={astrologyData}
    />
    <ServiceAccordion
      emoji="🔢"
      label="Numerology"
      subtitle="Life path, destiny & soul urge numbers"
      priceRange="₹1,100 – ₹3,100"
      items={numerologyData}
    />
    <ServiceAccordion
      emoji="🏠"
      label="Vastu"
      subtitle="Space harmonisation & energy alignment"
      priceRange="₹1,100 – ₹5,100"
      items={vastuData}
    />
  </div>
);

// ─── Step Bar ─────────────────────────────────────────────────────────────────
const STEP_LABELS = ["Service", "Your Details", "Consultation", "Confirm"];

const StepBar = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-0 mb-8 select-none">
    {STEP_LABELS.map((label, i) => {
      const done   = i < current;
      const active = i === current;
      return (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{ scale: active ? 1.1 : 1 }}
              transition={{ duration: 0.25 }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300"
              style={{
                background: done || active
                  ? "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))"
                  : "hsl(var(--card))",
                borderColor: done || active ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
            >
              {done
                ? <CheckCircle2 className="w-4 h-4 text-white" />
                : <span className="text-xs md:text-sm font-bold" style={{ color: active ? "#fff" : "hsl(var(--muted-foreground))" }}>{i + 1}</span>
              }
            </motion.div>
            <span
              className="text-[9px] md:text-[10px] font-semibold tracking-wide whitespace-nowrap"
              style={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div
              className="w-8 md:w-14 h-[2px] mx-1 mb-5 rounded-full transition-all duration-500"
              style={{ background: done ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Shared Field Wrapper ─────────────────────────────────────────────────────
const Field = ({
  label, icon, error, required = false, hint, children,
}: {
  label: string; icon?: React.ReactNode; error?: string;
  required?: boolean; hint?: string; children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-xs md:text-sm font-semibold" style={{ color: "hsl(var(--card-foreground))" }}>
      {icon && <span className="opacity-55">{icon}</span>}
      {label}
      {required && <span style={{ color: "hsl(var(--primary))" }}>*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>{hint}</p>}
    {error && (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>
        ⚠️ {error}
      </motion.p>
    )}
  </div>
);

const iStyle = (err?: string): React.CSSProperties => ({
  background: "hsl(var(--card))",
  border: `1.5px solid ${err ? "hsl(0 72% 51%)" : "hsl(var(--border))"}`,
  color: "hsl(var(--card-foreground))",
});

const iCls = "w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-500/30";

// ─── STEP 1 — Service ─────────────────────────────────────────────────────────
const Step1 = ({
  form, setField, errors, clearedByServiceChange,
}: {
  form: FormData;
  setField: (k: keyof FormData, v: string) => void;
  errors: FieldErrors;
  clearedByServiceChange: boolean;
}) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
        Choose a Service
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground">Select the area you'd like guidance on</p>
    </div>

    <AnimatePresence>
      {clearedByServiceChange && (
        <motion.div
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs"
          style={{
            background: "hsl(35 80% 45%/0.1)",
            border: "1.5px solid hsl(35 80% 45%/0.35)",
            color: "hsl(35 80% 30%)",
          }}
        >
          <span className="shrink-0 text-sm">🔄</span>
          <span>You switched services — all previously entered details have been cleared so you start fresh.</span>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {SERVICES.map((s, i) => {
        const sel = form.service === s.id;
        return (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setField("service", s.id)}
            className="text-left p-4 rounded-2xl border-2 transition-all duration-250 flex flex-col gap-2 w-full h-full"
            style={{
              background:   sel ? "linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(35 80% 45%/0.07))" : "hsl(var(--card)/0.7)",
              borderColor:  sel ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow:    sel ? "0 0 0 3px hsl(var(--primary)/0.1)" : "none",
              minHeight: "100px",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl leading-none shrink-0">{s.emoji}</span>
              {sel && <CheckCircle2 className="shrink-0" style={{ color: "hsl(var(--primary))", width: 17, height: 17 }} />}
            </div>
            <p className="font-semibold text-sm leading-snug" style={{ color: sel ? "hsl(var(--primary))" : "hsl(var(--card-foreground))" }}>
              {s.label}
            </p>
            <p className="text-xs text-muted-foreground leading-snug line-clamp-3">{s.desc}</p>
          </motion.button>
        );
      })}
    </div>
    {errors.service && <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>⚠️ {errors.service}</p>}
  </div>
);

// ─── STEP 2 — Personal Details ────────────────────────────────────────────────
const Step2 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => {
  const isAstrology  = form.service === "Astrology";
  const isVastu      = form.service === "Vastu";
  const isNumerology = form.service === "Numerology";
  const DIMENSION_OPTIONS = Array.from({ length: 200 }, (_, i) => i + 1);
  const needsNameGuard = isAstrology || isNumerology || isVastu;
  const dobDisplay = form.dob_day && form.dob_month && form.dob_year
    ? `${form.dob_day}-${form.dob_month}-${form.dob_year}` : "";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
          Your Details
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">
          Information required for your{" "}
          <span style={{ color: "hsl(var(--primary))" }}>{form.service}</span> reading
        </p>
      </div>

      <Field label="Full Name" icon={<Star size={13} />} error={errors.name} required>
        <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)}
          placeholder="Enter your full name" className={iCls} style={iStyle(errors.name)}
          onKeyDown={needsNameGuard ? nameKeyDownGuard : undefined}
          onPaste={needsNameGuard ? (e) => e.preventDefault() : undefined} />
        {needsNameGuard && (
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            ℹ️ Only letters are accepted. Copy-paste is disabled for accuracy.
          </p>
        )}
      </Field>

      <Field label="Mobile Number" icon={<Phone size={13} />} error={errors.mobile} required
        hint="You'll receive a WhatsApp confirmation on this number">
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl text-sm font-medium shrink-0"
               style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            🇮🇳 +91
          </div>
          <input type="tel" value={form.mobile} maxLength={10}
            onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
            placeholder="Enter your 10-digit number" className={`${iCls} flex-1`} style={iStyle(errors.mobile)} />
        </div>
      </Field>

      {(isAstrology || isNumerology) && (
        <Field label="Date of Birth" icon={<Calendar size={13} />}
          error={errors.dob_day || errors.dob_month || errors.dob_year}
          required hint={dobDisplay ? `Selected: ${dobDisplay}` : "Select from dropdowns only"}>
          <div className="grid grid-cols-3 gap-2">
            <select value={form.dob_day} onChange={(e) => setField("dob_day", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.dob_day), colorScheme: "dark" }}>
              <option value="">Day</option>
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={form.dob_month} onChange={(e) => setField("dob_month", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.dob_month), colorScheme: "dark" }}>
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m.val} value={m.val}>{m.label}</option>)}
            </select>
            <select value={form.dob_year} onChange={(e) => setField("dob_year", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.dob_year), colorScheme: "dark" }}>
              <option value="">Year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            ℹ️ Manual entry disabled. Please select from dropdowns only.
          </p>
        </Field>
      )}

      {isAstrology && (
        <Field label="Time of Birth" icon={<Clock size={13} />}
          error={errors.tob_hour || errors.tob_minute} required
          hint={form.tob_hour && form.tob_minute ? `Selected: ${form.tob_hour}:${form.tob_minute} ${form.tob_period}` : "Select hour, minute and AM/PM"}>
          <div className="grid grid-cols-3 gap-2">
            <select value={form.tob_hour} onChange={(e) => setField("tob_hour", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.tob_hour), colorScheme: "dark" }}>
              <option value="">Hour</option>
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
            <select value={form.tob_minute} onChange={(e) => setField("tob_minute", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.tob_minute), colorScheme: "dark" }}>
              <option value="">Min</option>
              {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid hsl(var(--border))" }}>
              {(["AM", "PM"] as const).map((p) => (
                <button key={p} type="button" onClick={() => setField("tob_period", p)}
                  className="flex-1 text-sm font-bold transition-all duration-200"
                  style={{
                    background: form.tob_period === p ? "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" : "hsl(var(--card))",
                    color: form.tob_period === p ? "#fff" : "hsl(var(--muted-foreground))",
                  }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Field>
      )}

      {isAstrology && (
        <Field label="Place of Birth" icon={<MapPin size={13} />} error={errors.pob} required hint="City or town where you were born">
          <input type="text" value={form.pob} onChange={(e) => setField("pob", e.target.value)}
            placeholder="Enter your place of birth" className={iCls} style={iStyle(errors.pob)} />
        </Field>
      )}

      {isVastu && (
        <Field label="Property Dimensions" icon={<Ruler size={13} />} error={errors.length || errors.width} required
          hint="Select the Length and Width of your property in feet">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Length (ft)</span>
              <select value={form.length} onChange={(e) => setField("length", e.target.value)}
                className={iCls} style={{ ...iStyle(errors.length), colorScheme: "dark" }}>
                <option value="">Select Length</option>
                {Array.from({ length: 200 }, (_, i) => i + 1).map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Width (ft)</span>
              <select value={form.width} onChange={(e) => setField("width", e.target.value)}
                className={iCls} style={{ ...iStyle(errors.width), colorScheme: "dark" }}>
                <option value="">Select Width</option>
                {Array.from({ length: 200 }, (_, i) => i + 1).map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
              </select>
            </div>
          </div>
        </Field>
      )}
    </div>
  );
};

// ─── STEP 3 — Consultation Slot ───────────────────────────────────────────────
const Step3 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
        Preferred Consultation Slot
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground">Pick a date and time that works best for you</p>
    </div>

    <Field label="Preferred Date" icon={<Calendar size={13} />} error={errors.consultDate} required
      hint={form.consultDate
        ? `Selected: ${new Date(form.consultDate).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}`
        : "Available dates: today up to 3 months ahead"}>
      <input type="date" min={todayStr} max={maxConsultDate} value={form.consultDate}
        onChange={(e) => setField("consultDate", e.target.value)}
        className={iCls} style={{ ...iStyle(errors.consultDate), colorScheme: "dark" }} />
    </Field>

    <Field label="Preferred Time Slot" icon={<Clock size={13} />} error={errors.consultTime} required>
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((slot) => {
          const sel = form.consultTime === slot;
          return (
            <motion.button key={slot} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setField("consultTime", slot)}
              className="py-2.5 px-2 rounded-xl text-xs md:text-sm font-semibold border-2 transition-all duration-200"
              style={{
                background:  sel ? "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(35 80% 45%/0.1))" : "hsl(var(--card)/0.6)",
                borderColor: sel ? "hsl(var(--primary))" : "hsl(var(--border))",
                color:       sel ? "hsl(var(--primary))" : "hsl(var(--card-foreground))",
              }}>
              {slot}
            </motion.button>
          );
        })}
      </div>
    </Field>

    <Field label="Additional Message (Optional)" icon={<Star size={13} />}>
      <textarea value={form.message} onChange={(e) => setField("message", e.target.value)}
        placeholder="Any specific questions or concerns you'd like to discuss…" rows={3}
        className={`${iCls} resize-none`} style={iStyle()} />
    </Field>
  </div>
);

// ─── STEP 4 — Review ─────────────────────────────────────────────────────────
const Step4 = ({ form }: { form: FormData }) => {
  const svc = SERVICES.find((s) => s.id === form.service)!;
  const dobDisplay = form.dob_day && form.dob_month && form.dob_year
    ? `${form.dob_day}-${form.dob_month}-${form.dob_year}` : null;

  const rows = [
    { label: "Service", value: `${svc.emoji} ${svc.label}` },
    { label: "Name",    value: form.name },
    { label: "Mobile",  value: `+91 ${form.mobile}` },
    ...(dobDisplay ? [{ label: "Date of Birth", value: dobDisplay }] : []),
    ...(form.service === "Astrology" && form.tob_hour && form.tob_minute
      ? [{ label: "Time of Birth", value: `${form.tob_hour}:${form.tob_minute} ${form.tob_period}` }] : []),
    ...(form.service === "Astrology" && form.pob
      ? [{ label: "Place of Birth", value: form.pob }] : []),
    ...(form.service === "Vastu" && form.length && form.width
      ? [{ label: "Dimensions", value: `${form.length}ft (L) × ${form.width}ft (W)` }] : []),
    ...(form.consultDate
      ? [{ label: "Preferred Date", value: new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) }] : []),
    ...(form.consultTime ? [{ label: "Preferred Time", value: form.consultTime }] : []),
    ...(form.message ? [{ label: "Message", value: form.message }] : []),
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
          Review Your Inquiry
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground">Please verify your details before submitting</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid hsl(var(--border))" }}>
        {rows.map((row, i) => (
          <motion.div key={row.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
            style={{ background: i % 2 === 0 ? "hsl(var(--card)/0.5)" : "hsl(var(--card)/0.2)", borderColor: "hsl(var(--border))" }}>
            <span className="text-xs font-semibold w-28 shrink-0 pt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{row.label}</span>
            <span className="text-xs md:text-sm font-medium flex-1" style={{ color: "hsl(var(--card-foreground))" }}>{row.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 p-4 rounded-2xl text-xs text-muted-foreground"
        style={{ background: "hsl(var(--primary)/0.07)", border: "1.5px solid hsl(var(--primary)/0.2)" }}>
        <span className="text-base shrink-0">🔒</span>
        Your information is confidential and will only be used to provide personalised astrological guidance.
      </div>
    </div>
  );
};

// ─── Success ─────────────────────────────────────────────────────────────────
const SuccessScreen = ({ form, onReset }: { form: FormData; onReset: () => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
    className="text-center py-8 px-2 space-y-6">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
      className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}>
      🎉
    </motion.div>
    <div>
      <h3 className="font-serif text-xl md:text-2xl font-bold mb-2" style={{ color: "hsl(var(--card-foreground))" }}>
        Inquiry Submitted!
      </h3>
      <p className="text-sm text-muted-foreground">
        Thank you, <strong style={{ color: "hsl(var(--card-foreground))" }}>{form.name}</strong>.
        Your inquiry has been received successfully.
      </p>
    </div>
    <div className="rounded-2xl p-4 text-sm space-y-3 text-left"
      style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}>
      <div className="flex items-start gap-2">
        <span className="text-base shrink-0">💬</span>
        <p className="text-muted-foreground">
          A WhatsApp confirmation has been sent to{" "}
          <strong style={{ color: "hsl(var(--card-foreground))" }}>+91 {form.mobile}</strong>.
          Our team will reach out on the same number to confirm your appointment.
        </p>
      </div>
      {form.consultDate && (
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">🗓️</span>
          <p className="text-muted-foreground">
            Preferred slot:{" "}
            <strong style={{ color: "hsl(var(--primary))" }}>
              {new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
              {form.consultTime && ` at ${form.consultTime}`}
            </strong>
          </p>
        </div>
      )}
    </div>
    <a href="https://wa.me/918879731174" target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
      style={{ background: "#25D366", color: "#fff" }}>
      <span className="text-base">💬</span> Chat with us on WhatsApp
    </a>
    <div>
      <Button variant="outline" onClick={onReset} className="rounded-xl text-sm">Submit Another Inquiry</Button>
    </div>
  </motion.div>
);

// ─── Main Form Wrapper ────────────────────────────────────────────────────────
const InquiryForm = () => {
  const [step, setStep]                 = useState(0);
  const [submitted, setSubmit]          = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [form, setForm]                 = useState<FormData>(EMPTY);
  const [errors, setErrors]             = useState<FieldErrors>({});
  const [clearedByServiceChange, setClearedByServiceChange] = useState(false);

  const setField = (key: keyof FormData, value: string) => {
    setForm((f) => {
      if (key === "service" && value !== f.service && f.service !== "") {
        setClearedByServiceChange(true);
        setTimeout(() => setClearedByServiceChange(false), 4000);
        return { ...EMPTY, service: value as Service };
      }
      if (key === "service") return { ...f, service: value as Service };
      return { ...f, [key]: value };
    });
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (step === 0) {
      if (!form.service) e.service = "Please select a service to continue.";
    }
    if (step === 1) {
      if (!form.name.trim() || !isValidName(form.name))
        e.name = "Please enter a valid full name (min 2 letters only).";
      if (!form.mobile || !/^\d{10}$/.test(form.mobile))
        e.mobile = "Enter a valid 10-digit number.";
      if (form.service === "Astrology" || form.service === "Numerology") {
        if (!form.dob_day || !form.dob_month || !form.dob_year) {
          e.dob_day   = "Please select Day.";
          e.dob_month = "Please select Month.";
          e.dob_year  = "Please select Year.";
        }
      }
      if (form.service === "Astrology") {
        if (!form.tob_hour) e.tob_hour = "Select hour.";
        if (!form.tob_minute) e.tob_minute = "Select minute.";
        if (!form.pob.trim()) e.pob = "Please enter your place of birth.";
      }
      if (form.service === "Vastu") {
        if (!form.length) e.length = "Please select length.";
        if (!form.width) e.width = "Please select width.";
      }
    }
    if (step === 2) {
      if (!form.consultDate) e.consultDate = "Please select a date.";
      if (!form.consultTime) e.consultTime = "Please select a time slot.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (!validate()) return; setStep((s) => Math.min(s + 1, 3)); };
  const back = () => { setErrors({}); setStep((s) => Math.max(s - 1, 0)); };

  const submit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const tob = form.service === "Astrology" && form.tob_hour && form.tob_minute
        ? `${form.tob_hour}:${form.tob_minute} ${form.tob_period}` : undefined;
      const payload = {
        service: form.service, name: form.name, mobile: form.mobile,
        dob: (form.dob_day && form.dob_month && form.dob_year)
          ? `${form.dob_year}-${form.dob_month}-${form.dob_day}` : undefined,
        tob,
        pob: form.service === "Astrology" ? form.pob : undefined,
        length: form.service === "Vastu" ? form.length : undefined,
        width: form.service === "Vastu" ? form.width : undefined,
        consultDate: form.consultDate || undefined,
        consultTime: form.consultTime || undefined,
        message: form.message || undefined,
      };
      await axios.post(`${API_BASE_URL}/inquiry`, payload);
      await sendLeadToCRM({
        name: form.name, phone: form.mobile, email: "",
        source: "Website Inquiry Form",
        tags: ["Inquiry Form", form.service || "",
          form.consultDate ? `Preferred Date: ${form.consultDate}` : "",
          form.consultTime ? `Preferred Time: ${form.consultTime}` : "",
        ].filter(Boolean),
      });
      setSubmit(true);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setSubmitError("Something went wrong. Please try again or WhatsApp us directly at +91 88797 31174.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setForm(EMPTY); setErrors({}); setStep(0);
    setSubmit(false); setSubmitError(null); setClearedByServiceChange(false);
  };

  if (submitted) return <SuccessScreen form={form} onReset={reset} />;

  return (
    <div>
      <StepBar current={step} />
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}>
          {step === 0 && <Step1 form={form} setField={setField} errors={errors} clearedByServiceChange={clearedByServiceChange} />}
          {step === 1 && <Step2 form={form} setField={setField} errors={errors} />}
          {step === 2 && <Step3 form={form} setField={setField} errors={errors} />}
          {step === 3 && <Step4 form={form} />}
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl text-xs text-center"
          style={{ background: "hsl(0 72% 51%/0.1)", border: "1.5px solid hsl(0 72% 51%/0.4)", color: "hsl(0 72% 60%)" }}>
          ⚠️ {submitError}
        </motion.div>
      )}

      <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <Button variant="outline" onClick={back} disabled={isSubmitting}
            className="rounded-xl flex items-center gap-1.5 text-sm">
            <ChevronLeft size={15} /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={next} className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}>
            Continue <ChevronRight size={15} />
          </Button>
        ) : (
          <Button onClick={submit} disabled={isSubmitting}
            className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}>
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting…
              </>
            ) : (
              <>Submit Inquiry <CheckCircle2 size={15} /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Inquiry = () => (
  <>
    <Helmet>
      <title>Inquiry - Ask Your Question | Astro Santosh Pandey</title>
      <meta name="description" content="Send an inquiry to Astro Santosh Pandey. Get personalized guidance on astrology, numerology, vastu, and palmistry." />
      <link rel="canonical" href="https://astrosantoshpandey.com/inquiry" />
      <script>{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1619073566059521');
        fbq('track', 'PageView');
      `}</script>
      <noscript>{`
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1619073566059521&ev=PageView&noscript=1" />
      `}</noscript>
    </Helmet>

    <Layout>
      {/* ══════════════════════════════════════════════════════════════════════
          HERO — two-column: text (left) + lion logo (right)
          Mirrors the HeroSection layout from the home page exactly.
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-gradient-hero pt-20 md:pt-24 pb-2 md:pb-3">

        {/* ── subtle radial glow overlays (same as home) ── */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 50% 70% at -5% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)" }} />
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)" }} />

        {/* ── floating zodiac glyphs ── */}
        {["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"].map((g, i) => (
          <motion.span key={i}
            className="pointer-events-none absolute select-none font-serif"
            style={{
              top:      `${6  + ((i * 73) % 82)}%`,
              left:     `${2  + ((i * 61) % 95)}%`,
              fontSize: `${28 + ((i * 17) % 28)}px`,
              color:    `rgba(251,191,36,${0.03 + (i % 3) * 0.015})`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.03, 0.09, 0.03] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          >{g}</motion.span>
        ))}

        {/* ── top gold divider ── */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
            className="h-px origin-center"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(251,191,36,0.12) 15%,rgba(251,191,36,0.6) 50%,rgba(251,191,36,0.12) 85%,transparent 100%)" }}
          />
        </div>

        {/* ══════════════════ CONTENT ══════════════════ */}
        <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-10 py-3 lg:py-5" style={{ maxWidth: "90rem" }}>

          {/* ── MOBILE layout (< lg) ── */}
          <div className="flex flex-col items-center gap-3 lg:hidden">

            {/* Logo + shloka — mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-center gap-1 w-full"
            >
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute rounded-full blur-2xl"
                  style={{ width: 160, height: 160, background: "radial-gradient(circle,rgba(251,191,36,0.32) 0%,rgba(251,191,36,0.08) 55%,transparent 100%)" }} />
                <motion.img src={LOGO} alt="Astro Santosh Pandey"
                  className="relative z-10 h-auto object-contain"
                  style={{ width: 130, mixBlendMode: "screen", filter: "brightness(1.1) contrast(1.05) saturate(1.1)" }}
                  animate={{ y: [-5, 0, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              {/* Shloka */}
              <div className="relative w-full text-center">
                <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
                <div
                  className="text-xs font-bold tracking-normal leading-loose text-center relative
                    bg-[length:200%_auto] bg-gradient-to-r
                    from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                    bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                    drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                    drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                  style={{ textShadow: "0 0 5px rgba(255,215,0,0.5),0 0 12px rgba(251,191,36,0.4),0 0 25px rgba(245,158,11,0.3),0 3px 8px rgba(0,0,0,0.3)" }}
                >
                  <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                  धर्मो रक्षति रक्षितः
                  <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                </div>
              </div>
            </motion.div>

            {/* Headline + subtext — mobile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-start w-full"
            >
              <span className="text-primary font-medium text-xs uppercase tracking-wider mb-2">Send an Inquiry</span>
              <h1 className="font-serif font-bold leading-[1.15] mb-2 text-2xl sm:text-3xl">
                Ask Your Question.
                <span className="block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(130deg,#fef9c3 0%,#fcd34d 28%,#f59e0b 58%,#b45309 100%)" }}>
                  Find Your Path.
                </span>
              </h1>
              <motion.div
                initial={{ width: 0, opacity: 0 }} animate={{ width: "3.5rem", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.22,1,0.36,1] }}
                className="h-px mb-3 flex-shrink-0"
                style={{ background: "linear-gradient(90deg,rgba(251,191,36,1) 0%,rgba(251,191,36,0.15) 100%)" }}
              />
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                Share your details and our experts will guide you towards clarity and cosmic alignment.
              </p>
            </motion.div>
          </div>
          {/* ── END MOBILE ── */}

          {/* ── DESKTOP layout (lg+): text left | logo right ── */}
          <div className="hidden lg:grid items-center gap-x-10 xl:gap-x-16"
            style={{ gridTemplateColumns: "1fr auto" }}>

            {/* LEFT — Headline + subtext */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-start"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2">Send an Inquiry</span>
              <h1
                className="font-serif font-bold leading-[1.13] mb-3"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.6rem)" }}
              >
                Ask Your Question.
                <span className="block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(130deg,#fef9c3 0%,#fcd34d 28%,#f59e0b 58%,#b45309 100%)" }}>
                  Find Your Path.
                </span>
              </h1>
              <motion.div
                initial={{ width: 0, opacity: 0 }} animate={{ width: "5rem", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.22,1,0.36,1] }}
                className="h-px mb-3 flex-shrink-0"
                style={{ background: "linear-gradient(90deg,rgba(251,191,36,1) 0%,rgba(251,191,36,0.15) 100%)" }}
              />
              <p className="leading-relaxed"
                style={{ fontSize: "clamp(0.85rem,1.1vw,1.05rem)", color: "rgba(255,255,255,0.58)", maxWidth: "28rem" }}>
                Share your details and our experts will guide you towards clarity and cosmic alignment.
              </p>
            </motion.div>

            {/* RIGHT — Lion logo + shloka */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-center gap-1 justify-center"
              style={{ minWidth: "clamp(180px, 18vw, 280px)" }}
            >
              <div className="relative flex items-center justify-center">
                {/* glow behind logo */}
                <div className="pointer-events-none absolute rounded-full blur-2xl"
                  style={{
                    width:  "clamp(180px, 18vw, 280px)",
                    height: "clamp(180px, 18vw, 280px)",
                    background: "radial-gradient(circle,rgba(251,191,36,0.32) 0%,rgba(251,191,36,0.08) 55%,transparent 100%)",
                  }} />
                {/* pulsing rings */}
                {[
                  { s:[1,1.18,1], o:[0.4,0,0.4],  delay:0,   color:"rgba(139,92,246,0.25)"  },
                  { s:[1,1.38,1], o:[0.28,0,0.28], delay:1.1, color:"rgba(251,191,36,0.20)"  },
                ].map((r,i) => (
                  <motion.div key={i}
                    className="absolute rounded-full border pointer-events-none"
                    animate={{ scale: r.s as number[], opacity: r.o as number[] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
                    style={{
                      width:  "clamp(160px,16vw,260px)",
                      height: "clamp(160px,16vw,260px)",
                      borderColor: r.color,
                    }}
                  />
                ))}
                {/* Logo image */}
                <motion.img
                  src={LOGO}
                  alt="Astro Santosh Pandey"
                  className="relative z-10 h-auto object-contain"
                  style={{
                    width: "clamp(150px,14vw,240px)",
                    mixBlendMode: "screen",
                    filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                  }}
                  animate={{ y: [-6, 0, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Shloka */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32, ease: [0.22,1,0.36,1] }}
                className="relative mt-0"
              >
                <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
                <div
                  className="text-xs md:text-sm font-bold tracking-normal leading-loose text-center relative
                    bg-[length:200%_auto] bg-gradient-to-r
                    from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                    bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                    drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                    drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                  style={{ textShadow: "0 0 5px rgba(255,215,0,0.5),0 0 12px rgba(251,191,36,0.4),0 0 25px rgba(245,158,11,0.3),0 3px 8px rgba(0,0,0,0.3)" }}
                >
                  <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                  धर्मो रक्षति रक्षितः
                  <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                </div>
              </motion.div>
            </motion.div>

          </div>
          {/* ── END DESKTOP ── */}

        </div>

        {/* ── bottom gold divider ── */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22,1,0.36,1] }}
            className="h-px origin-center"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(251,191,36,0.1) 15%,rgba(251,191,36,0.45) 50%,rgba(251,191,36,0.1) 85%,transparent 100%)" }}
          />
        </div>

      </section>

      {/* ── Premium Service Notice ────────────────────────────────────────── */}
      <div className="bg-background border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-start sm:items-center gap-3 max-w-5xl mx-auto px-4 py-3 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(35 80% 45%/0.08))",
              border: "1.5px solid hsl(var(--primary)/0.35)",
            }}
          >
            {/* <span className="text-xl shrink-0 mt-0.5 sm:mt-0">💎</span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: "hsl(var(--card-foreground))" }}>
              <span className="font-bold text-primary">This is a premium and paid service.</span>
              {" "}Consultation will be provided only after payment of the applicable fee,
              {" "}<span className="font-semibold">within 2 working days</span> of confirmation.
            </p>
          </motion.div>
        </div>
      </div> */}

            <span className="text-xl shrink-0 mt-0.5"></span>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs sm:text-sm font-bold text-primary leading-snug">
                This is a premium and paid service.
              </p>
              <p className="text-xs sm:text-sm font-medium leading-snug" style={{ color: "hsl(var(--card-foreground))" }}>
                Consultation will be provided only after payment of the applicable fee,{" "}
                <span className="font-semibold">within 2 working days</span> of confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 bg-background" id="inquiry">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* ── LEFT: Service-wise Pricing ───────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Heading */}
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">
                  Service <span className="text-gradient-gold">Pricing</span>
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tap any category to see all services and fees.
                </p>
              </div>

              {/* ── 4 individual service accordions ── */}
              <ServiceWisePricing />

              {/* ── Compact contact strip ── */}
              <div
                className="flex flex-col gap-2.5 px-4 py-3 rounded-2xl"
                style={{ background: "hsl(var(--card)/0.5)", border: "1px solid hsl(var(--border))" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Questions? Reach us directly
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+918879731174"
                    className="inline-flex items-center gap-1.5 text-xs font-medium hover:text-primary transition-colors"
                    style={{ color: "hsl(var(--card-foreground))" }}>
                    <Phone size={12} style={{ color: "hsl(var(--primary))" }} /> +91 88797 31174
                  </a>
                  <a href="https://wa.me/918879731174" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium hover:text-primary transition-colors"
                    style={{ color: "hsl(var(--card-foreground))" }}>
                    <span className="text-sm">💬</span> WhatsApp Us
                  </a>
                </div>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <MapPin size={10} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                  Kalbadevi, Princess Street, Marine Lines, Mumbai
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT: Form ───────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="cosmic-card rounded-3xl p-5 md:p-8 shadow-2xl"
                style={{ border: "1.5px solid hsl(var(--border))" }}>
                <InquiryForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default Inquiry;


