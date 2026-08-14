

import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Calendar, MessageCircle, Star, CheckCircle2, Users, Shield,
  UserCheck, Sparkles, Award, Headphones, Smartphone, CreditCard, Wallet,
  Landmark, Lock, ChevronLeft, ChevronRight, Zap, Mail, MapPin, Clock,
  User, CalendarIcon, ChevronDown, X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { format, startOfDay, isAfter, setMonth, setYear, getMonth, getYear } from "date-fns";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout/Layout";
import { Calendar as UiCalendar } from "@/components/ui/calendar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  KundliIcon, LoveIcon, MarriageIcon, CareerIcon, FinanceIcon, VastuIcon, PalmIcon,
  NumerologyIcon, AkashikIcon, UpiIcon,
} from "./ConsultationIcons";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
import astrologyImg from "@/assets/Astrology.jpeg";

/* ─────────────────────────────────────────────────────────────────────────


   BACKEND / PAYMENT: The booking form now runs a full Cashfree payment flow,
   mirroring the existing Quick Service checkout: validate → POST /payment
   (amount is looked up from PLAN_AMOUNTS, never entered by hand) → Cashfree
   checkout modal → POST /verify (with retry) → only once payment is confirmed
   does it POST /consultation-booking, which saves the lead and sends the
   admin + customer emails. The callback form has no payment step and calls
   POST /callback-request directly. See the backend files for route handlers,
   the DB migration, and email templates.

   ── CLIENT REVISION PASS (this version) ──────────────────────────────────
   Pure UI/visual pass — no logic, handlers, validation, state, or API calls
   were touched. Changes made per client feedback:
   1. Tightened vertical rhythm across every section (less scrolling).
   2. Service/hero icons replaced with a custom illustrated icon set
      (see ConsultationIcons.tsx) built to match the client's reference art:
      circular gradient badge, gold ring border, gold sparkle accent, and a
      glyph that reads instantly as the outcome (couple-in-a-heart for love,
      briefcase+growth arrow for career, coins+rupee for finance, etc).
   3. Merged the old "Trust badges strip" + "Trust strip under services"
      into a single confidence row, and merged "Secure Your Slot" into the
      Pricing section as a sidebar — removes a full section's worth of scroll.
   4. Added soft, colorful ambient glow accents behind section headers for a
      more vibrant, premium feel (kept subtle, not flashy).
───────────────────────────────────────────────────────────────────────── */

// ── Data ────────────────────────────────────────────────────────────────
// Every icon now carries its own accent so the badge itself signals the
// outcome (rose = love, emerald = growth, amber = prosperity, etc.) rather
// than every service looking the same gold-on-gold square.
const heroServices = [
  { icon: KundliIcon, label: "Kundli Analysis" },
  { icon: LoveIcon, label: "Love & Marriage" },
  { icon: CareerIcon, label: "Career & Business" },
  { icon: FinanceIcon, label: "Finance Stability" },
  { icon: VastuIcon, label: "Vastu Guidance" },
  { icon: AkashikIcon, label: "Akashik Record Reading" },
  { icon: PalmIcon, label: "Palmistry Reading" },
  { icon: NumerologyIcon, label: "Numerology Guidance" },
];

const trustBadges = [
  "Personalized Analysis",
  "Confidential Consultation",
  "Affordable Pricing",
  "Direct Expert Guidance",
];

const services = [
  {
    icon: MarriageIcon,
    title: "Love, Marriage & Domestic Harmony",
    features: [
      "Relationship & Compatibility Guidance",
      "Marriage Timing & Kundli Matching",
      "Marital Issues & Conflict Resolution",
      "Domestic Harmony & Family Well-being",
    ],
  },
  {
    icon: CareerIcon,
    title: "Career Consultation",
    features: ["Job Change", "Opportunity Check", "Career Growth & Obstacle Removal"],
  },
  {
    icon: FinanceIcon,
    title: "Finance Consultation",
    features: ["Financial Obstacles", "Shubh Muhurat Check", "Investment Timing", "Business Suitability Check"],
  },
  {
    icon: KundliIcon,
    title: "Detailed Kundli Analysis",
    features: ["Birth Chart Reading", "Planetary Prediction", "Dasha & Transit Prediction", "Dosha & Shani Sade Sati Check", "Premium Kundli Report"],
  },
  {
    icon: VastuIcon,
    title: "Vastu Guidance",
    features: ["Home Vastu Analysis", "Property Selection Guidance", "Vastu Remedies", "Direction & Energy Balance"],
  },
  {
    icon: AkashikIcon,
    title: "Akashik Record Reading",
    features: ["Past Life Insights", "Life Purpose Guidance", "Karmic Blockages", "Spiritual Guidance"],
  },
  {
    icon: PalmIcon,
    title: "Palmistry Reading",
    features: ["Palm Reading Analysis", "Life Line Insights", "Career & Wealth Indicators", "Marriage & Relationship Insights"],
  },
  {
    icon: NumerologyIcon,
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
    name: "Detailed Kundli Analysis",
    price: "₹11,000",
    features: ["60 Minutes Consultation", "Full Birth Chart Reading", "Career + Marriage + Finance Review", "Priority Support"],
    popular: false,
  },
];

const paymentMethods = [
  { icon: UpiIcon, label: "UPI" },
  { icon: CreditCard, label: "Card Payment" },
  { icon: Wallet, label: "Wallets" },
  { icon: Landmark, label: "Net Banking" },
];

// Plain type names per client spec — also used as the Select's value and as the
// key Cashfree order amount is looked up by, so the PG never needs a manual amount.
const consultationTypeOptions = [
  "Basic Consultation",
  "Premium Consultation",
  "Detailed Kundli Analysis",
];

const PLAN_AMOUNTS: Record<string, number> = {
  "Basic Consultation": 1100,
  "Premium Consultation": 2100,
  "Detailed Kundli Analysis": 11000,
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

/* ─────────────────────────────────────────────────────────────────────────
   DobPicker / TimePicker
   Ported as-is from the existing Quick Service booking form so the
   Book Your Consultation form matches the same interaction pattern already
   used elsewhere on the site — calendar popup with month/year quick-jump,
   and an hour/minute/AM-PM scroll picker. Both are already fully
   responsive: DobPicker's popup is portal-rendered and repositions/clamps
   itself to the viewport (works down to small mobile widths), and
   TimePicker's dropdown is width-bound to its trigger, so it never
   overflows the form column on any screen size.
───────────────────────────────────────────────────────────────────────── */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const buildYears = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 1920; y--) years.push(y);
  return years;
};
const YEARS = buildYears();

const navSelectCls = [
  "flex-1 h-8 px-2 rounded-lg border text-xs font-semibold",
  "bg-white/10 text-white border-primary/30",
  "focus:outline-none focus:ring-1 focus:ring-primary/60",
  "cursor-pointer appearance-none",
  "[&>option]:bg-[#1a1535] [&>option]:text-white",
].join(" ");

const DobPicker = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) => {
  const today = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [viewMonth, setViewMonth] = useState<Date>(value ? new Date(value) : new Date());
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openCal = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      const calH = 430;
      const below = window.innerHeight - r.bottom;
      const top = below >= calH ? r.bottom + window.scrollY + 4 : r.top + window.scrollY - calH - 4;
      const w = Math.min(320, window.innerWidth - 32);
      const left = Math.min(r.left + window.scrollX, window.innerWidth + window.scrollX - w - 8);
      setPos({ top, left, width: w });
    }
    setViewMonth(pending ?? new Date());
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-dob-picker]")) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
      setPending(value ? new Date(value) : undefined);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, value]);

  const confirm = () => {
    if (!pending) return;
    onChange(format(pending, "yyyy-MM-dd"));
    setOpen(false);
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setViewMonth((prev) => setMonth(prev, newMonth));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setViewMonth((prev) => setYear(prev, newYear));
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={openCal}
        className={[
          "w-full h-11 pl-10 pr-3 flex items-center justify-between rounded-xl border",
          "bg-muted/30 text-sm transition-all duration-200",
          "focus:outline-none focus:ring-1 focus:ring-primary/60",
          error ? "border-red-500/70" : "border-primary/20 hover:border-primary/50",
        ].join(" ")}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground/50"}>
          {value ? format(new Date(value), "dd MMM yyyy") : "Select date of birth"}
        </span>
        {value && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setPending(undefined);
            }}
            className="text-muted-foreground/50 hover:text-red-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </button>
      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-[998] bg-black/40" onClick={() => setOpen(false)} />
                <motion.div
                  data-dob-picker
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: pos.top, left: pos.left, width: pos.width, zIndex: 999 }}
                  className="bg-[#1a1535] border border-primary/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 pt-3 pb-1">
                    <select value={getMonth(viewMonth)} onChange={handleMonthSelect} className={navSelectCls} aria-label="Select month">
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i}>{m}</option>
                      ))}
                    </select>
                    <select value={getYear(viewMonth)} onChange={handleYearSelect} className={navSelectCls} aria-label="Select year">
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div className="px-3 pb-1">
                    <UiCalendar
                      mode="single"
                      month={viewMonth}
                      onMonthChange={setViewMonth}
                      selected={pending}
                      onSelect={(d) => {
                        if (!d || isAfter(startOfDay(d), today)) return;
                        setPending(d);
                      }}
                      disabled={(d) => isAfter(startOfDay(d), today)}
                      initialFocus
                    />
                  </div>
                  <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-primary/15 bg-primary/5">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex-1 h-9 text-xs border-primary/25 text-white/60 hover:text-white hover:border-primary/50"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      disabled={!pending}
                      className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 font-bold text-black"
                      onClick={confirm}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      {pending ? `Confirm ${format(pending, "dd MMM")}` : "Pick a date"}
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

const TimePicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [selHour, setSelHour] = useState<number | null>(null);
  const [selMin, setSelMin] = useState("00");
  const [selAmPm, setSelAmPm] = useState<"AM" | "PM">("AM");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) {
      setSelHour(null);
      setSelMin("00");
      setSelAmPm("AM");
      return;
    }
    const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      setSelHour(parseInt(match[1], 10));
      setSelMin(match[2]);
      setSelAmPm(match[3].toUpperCase() as "AM" | "PM");
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open || !minuteScrollRef.current) return;
    const idx = parseInt(selMin, 10);
    const itemH = 34;
    minuteScrollRef.current.scrollTop = Math.max(0, idx * itemH - itemH * 2);
  }, [open]);

  const handleConfirm = () => {
    if (!selHour) return;
    onChange(`${String(selHour).padStart(2, "0")}:${selMin} ${selAmPm}`);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSelHour(null);
    setSelMin("00");
    setSelAmPm("AM");
  };

  const isReady = selHour !== null;
  const previewLabel = isReady ? `${String(selHour).padStart(2, "0")}:${selMin} ${selAmPm}` : "Select hour to confirm";
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "w-full h-11 pl-10 pr-3 flex items-center justify-between rounded-xl border",
          "bg-muted/30 text-sm transition-all duration-200",
          "focus:outline-none focus:ring-1 focus:ring-primary/60",
          open ? "border-primary/60 ring-1 ring-primary/30" : "border-primary/20 hover:border-primary/50",
        ].join(" ")}
      >
        <span className={value ? "text-foreground font-medium" : "text-muted-foreground/50"}>
          {value || "Select Time of Birth"}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {value && (
            <span onClick={handleClear} className="text-muted-foreground/50 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown className={["w-4 h-4 transition-all duration-300", open ? "rotate-180 text-primary" : "text-primary/50"].join(" ")} />
        </div>
      </button>
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ transformOrigin: "top", zIndex: 50 }}
            className="absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden border border-primary/30 bg-[#1a1535] shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="grid grid-cols-3 px-4 pt-3 pb-1.5 gap-2">
              {["Hour", "Minute", "AM / PM"].map((h) => (
                <div key={h} className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">{h}</div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 px-3 pb-3">
              <div className="grid grid-cols-3 gap-1 content-start">
                {hours.map((h) => {
                  const active = selHour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelHour(h)}
                      className={[
                        "rounded-lg py-1.5 text-xs font-bold transition-all duration-150 border",
                        active
                          ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                          : "bg-white/5 text-white/55 border-transparent hover:border-primary/30 hover:text-white hover:bg-white/10",
                      ].join(" ")}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
              <div
                ref={minuteScrollRef}
                className="h-[168px] overflow-y-auto rounded-lg bg-white/[0.03]"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.4) rgba(255,255,255,0.05)" }}
              >
                {minutes.map((m) => {
                  const active = selMin === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelMin(m)}
                      className={[
                        "w-full py-1.5 text-center text-sm font-bold transition-all duration-150 block",
                        active ? "bg-primary text-black rounded-lg" : "text-white/45 hover:text-white hover:bg-white/[0.08]",
                      ].join(" ")}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 pt-0.5">
                {(["AM", "PM"] as const).map((period) => {
                  const active = selAmPm === period;
                  return (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelAmPm(period)}
                      className={[
                        "w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-150 border-2",
                        active
                          ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(212,175,55,0.35)]"
                          : "bg-transparent text-white/50 border-white/10 hover:border-primary/40 hover:text-white",
                      ].join(" ")}
                    >
                      {period}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between px-3 pb-3 pt-1 border-t border-primary/15 bg-primary/5">
              <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                <Clock className="w-3 h-3 text-primary/40 shrink-0" />
                <span>{previewLabel}</span>
              </div>
              <button
                type="button"
                disabled={!isReady}
                onClick={handleConfirm}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-200",
                  isReady
                    ? "bg-primary text-black hover:bg-primary/90 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "bg-primary/25 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                tap OK to confirm →
              </button>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
  const [callbackData, setCallbackData] = useState({ fullName: "", mobile: "", email: "" });
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

  const handleCallbackEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCallbackData((prev) => ({ ...prev, email: value }));
    setCallbackErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const validateCallbackAll = (): boolean => {
    const errors = {
      fullName: validateName(callbackData.fullName),
      mobile: validatePhone(callbackData.mobile),
      email: validateEmail(callbackData.email),
    };
    setCallbackErrors(errors);
    return Object.values(errors).every((e) => !e);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCallbackAll()) return;
    setIsSubmittingCallback(true);
    try {
      // Send lead to CRM & email notification engine
      await sendLeadToCRM({
        name: callbackData.fullName,
        phone: callbackData.mobile,
        email: callbackData.email,
        source: "Free Callback Request",
        tags: ["callback-request", "landing-page"],
      });

      const response = await fetch(`${apiBaseUrl}/callback-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: callbackData.fullName,
          mobile: callbackData.mobile,
          email: callbackData.email,
          source: "Free Callback Request",
          landingPageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        console.warn("Backend callback route returned error status, but CRM lead email was dispatched.");
      }

      setIsCallbackSuccess(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 3500);
    } catch (err) {
      console.error("Callback submission error:", err);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
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
        <section className="pt-16 sm:pt-20 pb-4 md:pb-6 bg-gradient-hero relative overflow-hidden">
          {/* Ambient colour accents behind the hero for a more vibrant feel */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-rose-500/20 blur-[90px]" />
          <div className="pointer-events-none absolute top-10 -right-16 w-80 h-80 rounded-full bg-violet-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-400/10 blur-[90px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
              {/* Zodiac visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1 flex justify-center relative my-2 lg:my-0"
              >
                <div className="relative w-full max-w-[240px] sm:max-w-xs aspect-square">
                  {/* Outer glow */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber-400/30 via-yellow-300/15 to-transparent blur-3xl animate-pulse pointer-events-none" />
                  {/* Inner glow */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-500/10 to-amber-400/20 blur-xl pointer-events-none" />

                  {/* Circular image */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
                    style={{
                      boxShadow:
                        "0 0 50px rgba(251,191,36,0.3), 0 0 100px rgba(218,165,32,0.15), 0 0 0 2px rgba(251,191,36,0.4)",
                    }}
                  >
                    <motion.img
                      src={astrologyImg}
                      alt="Vedic Astrology Zodiac Wheel - Nakshatra Chart"
                      className="w-full h-full object-cover rounded-full"
                      style={{ filter: "brightness(1.0) contrast(1.05) saturate(1.1)" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <p className="text-foreground/90 text-sm sm:text-base mb-0.5">Get Accurate</p>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold mb-1">
                  <span className="text-gradient-gold">ASTROLOGY GUIDANCE</span>
                </h1>
                <p className="text-lg sm:text-2xl font-serif font-semibold mb-1">For Your Life Problems</p>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                  Personalized Consultation by <span className="text-primary font-medium">Astro Santosh Pandey</span>
                </p>

                {/* 8 service badges */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {heroServices.map((s) => (
                    <div key={s.label} className="flex flex-col items-center text-center gap-0.5">
                      <s.icon className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
                      <span className="text-[9.5px] sm:text-[10px] text-muted-foreground leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <StarRow />
                  <span className="text-xs sm:text-sm text-muted-foreground">Trusted by Clients Across the World</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm" onClick={scrollToBooking}>
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                    Book Consultation Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm" asChild>
                    <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm mt-2.5">
                  <a
                    href="tel:+918879731174"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-amber-300 transition-colors text-xs sm:text-sm"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                    <span>Or call us directly:</span>
                    <span className="font-bold text-amber-300 hover:underline tracking-wide">+91 88797 31174</span>
                  </a>

                  <span className="hidden sm:inline text-white/30">•</span>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@astrosantoshpandey.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-amber-300 transition-colors text-xs sm:text-sm"
                  >
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                    <span>Email:</span>
                    <span className="font-semibold text-amber-200 hover:underline">connect@astrosantoshpandey.com</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Confidence strip (merged trust badges + trust strip) ── */}
        <div className="bg-cosmic-navy border-y border-primary/20 py-2">
          <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs">
            {trustBadges.map((b) => (
              <span key={b} className="flex items-center gap-1 text-foreground/90">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                {b}
              </span>
            ))}
            <span className="hidden sm:inline text-primary/25">|</span>
            {trustStrip.map((t) => (
              <span key={t.label} className="flex items-center gap-1 text-foreground/70">
                <t.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <section className="py-4 md:py-6 bg-background relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[100px]" />
          <div className="container mx-auto px-4 relative">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
            >
              OUR ASTROLOGY <span className="text-gradient-gold">CONSULTATION SERVICES</span>
            </motion.h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.05 }}
                  className="cosmic-card p-2 sm:p-3.5 group hover:-translate-y-1 hover:glow-gold transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-0.5 inline-block">
                      <service.icon className="w-5.5 h-5.5 sm:w-8 sm:h-8 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)] transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <h3 className="font-serif text-[10.5px] sm:text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-amber-300 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <ul className="space-y-0.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-0.5 sm:gap-1 text-[9.5px] sm:text-[11px] md:text-xs text-foreground/80 leading-tight">
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0 mt-0.5 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" strokeWidth={2.2} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing (merged with Secure Your Slot) ── */}
        <section className="py-4 md:py-6 bg-gradient-cosmic relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="container mx-auto px-4 relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-3 md:mb-5"
            >
              CHOOSE YOUR <span className="text-gradient-gold">CONSULTATION</span>
            </motion.h2>

            <div className="grid lg:grid-cols-3 gap-3 sm:gap-5 max-w-6xl mx-auto items-start">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`cosmic-card p-3.5 sm:p-5 md:p-6 flex flex-col relative ${plan.popular ? "border-primary/60 ring-2 ring-primary/30 lg:-translate-y-2" : ""}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" /> MOST POPULAR
                    </span>
                  )}
                  <h3 className="font-serif text-xs sm:text-base font-bold text-center mb-1 mt-0.5">{plan.name}</h3>
                  <div className="text-center mb-2 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-gradient-gold">{plan.price}</span>
                  </div>
                  <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={plan.popular ? "glow-gold w-full h-8 sm:h-10 text-[11px] sm:text-sm" : "w-full h-8 sm:h-10 text-[11px] sm:text-sm"}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => {
                      setBookingData((prev) => ({ ...prev, consultationType: plan.name }));
                      setBookingErrors((prev) => ({ ...prev, consultationType: "" }));
                      scrollToBooking();
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* How it works + payment options + secure CTA, condensed into one row under the plans */}
            <div className="mt-4 sm:mt-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-3 sm:gap-5 items-center">
              <div className="flex flex-col gap-1.5 sm:gap-2.5">
                {enrollSteps.map((step) => (
                  <div key={step.num} className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-primary text-[11px] sm:text-xs font-bold shrink-0">
                      {step.num}
                    </div>
                    <span className="text-[11px] sm:text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </div>

              <div className="cosmic-card p-3 sm:p-4">
                <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-2">
                  Payment Options
                </p>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {paymentMethods.map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col items-center justify-center gap-0.5 py-1.5 sm:py-2 px-1 rounded-xl bg-gradient-to-br from-amber-500/10 via-background to-amber-950/20 border border-amber-400/25 hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-300 group shadow-sm"
                    >
                      {m.label === "UPI" ? (
                        <m.icon className="h-4 sm:h-5 w-auto drop-shadow-[0_2px_6px_rgba(251,191,36,0.3)] transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <m.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)] transition-transform duration-300 group-hover:scale-105" strokeWidth={2.2} />
                      )}
                      <span className="text-[11px] sm:text-xs font-bold text-foreground group-hover:text-amber-300 transition-colors">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-1">
                <Button size="lg" className="w-full text-xs sm:text-base font-bold h-9 sm:h-12 glow-gold shadow-lg" onClick={scrollToBooking}>
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-amber-300 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" strokeWidth={2.2} />
                  Pay &amp; Book Consultation
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-amber-300 font-bold">
                  <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" strokeWidth={2.2} /> Secure Payment
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-foreground/80">100% Secure &amp; Encrypted</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking Form ── */}
        <section id="booking-form" className="py-4 md:py-6 bg-background scroll-mt-4">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
            >
              BOOK YOUR <span className="text-gradient-gold">CONSULTATION</span>
            </motion.h2>

            <div className="cosmic-card p-3.5 sm:p-6 md:p-8 max-w-4xl mx-auto">
              {isBookingSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold">Thank you!</h3>
                    <p className="text-muted-foreground text-xs max-w-md">
                      Your consultation request has been received successfully. Our team will contact you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-2.5 sm:gap-y-3.5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Date of Birth <span className="text-destructive">*</span>
                    </label>
                    <DobPicker
                      value={bookingData.dob}
                      onChange={(v) => {
                        setBookingData((prev) => ({ ...prev, dob: v }));
                        setBookingErrors((prev) => ({ ...prev, dob: validateRequired(v, "Date of birth") }));
                      }}
                      error={bookingErrors.dob}
                    />
                    {bookingErrors.dob && <p className="text-red-500 text-[11px]">{bookingErrors.dob}</p>}
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-1">
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Time of Birth <span className="text-destructive">*</span>
                    </label>
                    <TimePicker
                      value={bookingData.timeOfBirth}
                      onChange={(v) => {
                        setBookingData((prev) => ({ ...prev, timeOfBirth: v }));
                        setBookingErrors((prev) => ({ ...prev, timeOfBirth: validateRequired(v, "Time of birth") }));
                      }}
                    />
                    {bookingErrors.timeOfBirth && <p className="text-red-500 text-[11px]">{bookingErrors.timeOfBirth}</p>}
                  </div>

                  {/* Place of Birth */}
                  <div className="space-y-1">
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Consultation Type <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={bookingData.consultationType}
                      onValueChange={handleConsultationTypeChange}
                    >
                      <SelectTrigger
                        className={`w-full px-4 py-2 h-auto rounded-xl bg-muted/30 border text-xs sm:text-sm ${
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
                    <label className="text-[10.5px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Message / Problem Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={2.5}
                      value={bookingData.message}
                      onChange={handleBookingChange}
                      placeholder="Briefly describe your question or concern"
                      className={`w-full px-4 py-2 rounded-xl bg-muted/30 border transition-colors text-xs sm:text-sm placeholder:text-muted-foreground/50 outline-none resize-none ${
                        bookingErrors.message ? "border-red-500" : "border-primary/20 focus:border-primary/50"
                      }`}
                    />
                    {bookingErrors.message && <p className="text-red-500 text-[11px]">{bookingErrors.message}</p>}
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-3 flex flex-col items-center gap-1.5 pt-0.5">
                    <Button type="submit" size="lg" className="w-full md:w-auto px-8 h-10 text-xs sm:text-sm glow-gold" disabled={isSubmittingBooking}>
                      {isSubmittingBooking ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Book Now"
                      )}
                    </Button>
                    <p className="text-[10.5px] sm:text-[11px] text-muted-foreground text-center">
                      Our team will contact you soon! · Your information is safe with us.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Testimonials (Home Page Review Section) ── */}
        <TestimonialsSection />

        {/* ── Callback + Limited Slots ── */}
        <section className="py-4 md:py-6 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-lg sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
            >
              STILL HAVE QUESTIONS? <span className="text-gradient-gold">GET A FREE CALLBACK</span>
            </motion.h2>

            <div className="cosmic-card p-3.5 sm:p-5 md:p-6 max-w-4xl mx-auto">
              {isCallbackSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-3 space-y-1.5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="font-serif text-sm sm:text-base font-bold">Thank you!</p>
                  <p className="text-muted-foreground text-xs max-w-md">
                    Your callback request has been received successfully. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="grid sm:grid-cols-4 gap-2.5 sm:gap-3 items-start">
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
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input
                        type="email"
                        name="email"
                        value={callbackData.email}
                        onChange={handleCallbackEmailChange}
                        placeholder="Enter Your Email *"
                        className={inputCls(callbackErrors.email)}
                      />
                    </div>
                    {callbackErrors.email && <p className="text-red-500 text-[11px]">{callbackErrors.email}</p>}
                  </div>
                  <Button type="submit" className="w-full glow-gold h-9 sm:h-10 text-xs sm:text-sm font-bold" disabled={isSubmittingCallback}>
                    {isSubmittingCallback ? "Sending..." : (
                      <>
                        <Phone className="w-3.5 h-3.5 mr-1.5" /> REQUEST CALLBACK
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Limited slots banner */}
            <div className="max-w-4xl mx-auto mt-4 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 flex items-center justify-center gap-2 text-center">
              <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-primary">
                Limited Daily Consultation Slots Available —{" "}
                <button onClick={scrollToBooking} className="underline underline-offset-2">Book Now!</button>
              </span>
            </div>

            <p className="text-center text-xs sm:text-sm text-muted-foreground italic mt-4 max-w-2xl mx-auto">
              "True astrology is not only about predicting the future; it is about understanding yourself,
              your karma, and making better choices with awareness."
            </p>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-5 md:py-7 bg-cosmic-navy border-t border-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-base sm:text-xl md:text-2xl font-bold mb-1">GET ANSWERS TO YOUR LIFE QUESTIONS TODAY</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3">
              Book Your Personal Consultation With <span className="text-primary font-medium">Astro Santosh Pandey</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white h-9 sm:h-10 text-xs sm:text-sm px-4 sm:px-5" asChild>
                <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" /> WHATSAPP NOW
                </a>
              </Button>
              <Button size="lg" className="glow-gold h-9 sm:h-10 text-xs sm:text-sm px-4 sm:px-5" onClick={scrollToBooking}>
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" /> BOOK CONSULTATION
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ConsultationLanding;