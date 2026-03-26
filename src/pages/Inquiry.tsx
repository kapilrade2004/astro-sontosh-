import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";

import {
  ChevronRight, ChevronLeft, CheckCircle2,
  Star, Phone, Calendar, Clock, MapPin, Ruler,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Service = "Astrology" | "Numerology" | "Vastu" | "Palmistry";

interface FormData {
  service: Service | "";
  name: string;
  mobile: string;
  dob: string;
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
  { id: "Astrology", emoji: "🪐", label: "Astrology", desc: "Birth chart, predictions & planetary guidance" },
  { id: "Numerology", emoji: "🔢", label: "Numerology", desc: "Life path, destiny & soul urge numbers" },
  { id: "Vastu", emoji: "🏠", label: "Vastu", desc: "Space harmonisation & energy alignment" },
  { id: "Palmistry", emoji: "✋", label: "Palmistry", desc: "In-person reading of your life lines" },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
const todayStr = new Date().toISOString().split("T")[0];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";

const formatDisplayDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
};

// ─── Step Bar ─────────────────────────────────────────────────────────────────

const STEP_LABELS = ["Service", "Your Details", "Consultation", "Confirm"];

const StepBar = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-0 mb-8 select-none">
    {STEP_LABELS.map((label, i) => {
      const done = i < current;
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

const Step1 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
        Choose a Service
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground">Select the area you'd like guidance on</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            className="text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-250 flex items-start gap-3"
            style={{
              background: sel ? "linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(35 80% 45%/0.07))" : "hsl(var(--card)/0.7)",
              borderColor: sel ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow: sel ? "0 0 0 3px hsl(var(--primary)/0.1)" : "none",
            }}
          >
            <span className="text-2xl md:text-3xl shrink-0 mt-0.5">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base" style={{ color: sel ? "hsl(var(--primary))" : "hsl(var(--card-foreground))" }}>
                {s.label}
              </p>
              <p className="text-xs mt-0.5 text-muted-foreground">{s.desc}</p>
              {s.id === "Palmistry" && (
                <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
                  In-person · Mumbai only
                </span>
              )}
            </div>
            {sel && <CheckCircle2 className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))", width: 18, height: 18 }} />}
          </motion.button>
        );
      })}
    </div>
    {errors.service && (
      <p className="text-xs" style={{ color: "hsl(0 72% 51%)" }}>⚠️ {errors.service}</p>
    )}
  </div>
);

// ─── STEP 2 — Personal Details ────────────────────────────────────────────────

const Step2 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => {
  const isAstrology = form.service === "Astrology";
  const isVastu = form.service === "Vastu";
  const isPalmistry = form.service === "Palmistry";

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

      {/* Name */}
      <Field label="Full Name" icon={<Star size={13} />} error={errors.name} required>
        <input type="text" value={form.name} onChange={(e) => setField("name", e.target.value)}
          placeholder="e.g. Santosh R Pandey" className={iCls} style={iStyle(errors.name)} />
      </Field>

      {/* Mobile */}
      <Field label="Mobile Number" icon={<Phone size={13} />} error={errors.mobile} required
        hint="You'll receive a WhatsApp confirmation on this number">
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl text-sm font-medium shrink-0"
            style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            🇮🇳 +91
          </div>
          <input type="tel" value={form.mobile} maxLength={10}
            onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
            placeholder="9876543210" className={`${iCls} flex-1`} style={iStyle(errors.mobile)} />
        </div>
      </Field>

      {/* DOB — not for Vastu */}
      {!isVastu && (
        <Field label="Date of Birth" icon={<Calendar size={13} />} error={errors.dob} required
          hint={form.dob ? `Selected: ${formatDisplayDate(form.dob)}` : "Click to open calendar"}>
          <input type="date" value={form.dob} max={todayStr}
            onChange={(e) => setField("dob", e.target.value)}
            className={iCls} style={{ ...iStyle(errors.dob), colorScheme: "dark" }} />
        </Field>
      )}

      {/* Time of Birth — Astrology only */}
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
                    background: form.tob_period === p
                      ? "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))"
                      : "hsl(var(--card))",
                    color: form.tob_period === p ? "#fff" : "hsl(var(--muted-foreground))",
                  }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Field>
      )}

      {/* Place of Birth — Astrology only */}
      {isAstrology && (
        <Field label="Place of Birth" icon={<MapPin size={13} />} error={errors.pob} required hint="City / town where you were born">
          <input type="text" value={form.pob} onChange={(e) => setField("pob", e.target.value)}
            placeholder="e.g. Mumbai, Maharashtra" className={iCls} style={iStyle(errors.pob)} />
        </Field>
      )}

      {/* Dimensions — Vastu only */}
      {isVastu && (
        <Field label="Property Dimensions" icon={<Ruler size={13} />}
          error={errors.length || errors.width} required hint="Enter the Length and Width of your property">
          <div className="grid grid-cols-2 gap-3">
            <input type="number" value={form.length} onChange={(e) => setField("length", e.target.value)}
              placeholder="Length (ft)" className={iCls} style={iStyle(errors.length)} />
            <input type="number" value={form.width} onChange={(e) => setField("width", e.target.value)}
              placeholder="Width (ft)" className={iCls} style={iStyle(errors.width)} />
          </div>
        </Field>
      )}

      {/* Palmistry note */}
      {isPalmistry && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 p-4 rounded-2xl"
          style={{ background: "hsl(var(--primary)/0.08)", border: "1.5px solid hsl(var(--primary)/0.3)" }}>
          <span className="text-2xl shrink-0">✋</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: "hsl(var(--primary))" }}>In-Person · Mumbai Only</p>
            <p className="text-xs mt-1 text-muted-foreground">
              Palmistry readings are conducted exclusively in-person at our Mumbai centre.
              Our team will contact you on WhatsApp to schedule your visit.
            </p>
          </div>
        </motion.div>
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
        : "Click to open the calendar"}>
      <input type="date" min={todayStr} value={form.consultDate}
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
                background: sel ? "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(35 80% 45%/0.1))" : "hsl(var(--card)/0.6)",
                borderColor: sel ? "hsl(var(--primary))" : "hsl(var(--border))",
                color: sel ? "hsl(var(--primary))" : "hsl(var(--card-foreground))",
              }}>
              {slot}
            </motion.button>
          );
        })}
      </div>
    </Field>

    <Field label="Additional Message (Optional)" icon={<Star size={13} />}>
      <textarea value={form.message} onChange={(e) => setField("message", e.target.value)}
        placeholder="Any specific questions or concerns you'd like to discuss…"
        rows={3} className={`${iCls} resize-none`} style={iStyle()} />
    </Field>
  </div>
);

// ─── STEP 4 — Review ─────────────────────────────────────────────────────────

const Step4 = ({ form }: { form: FormData }) => {
  const svc = SERVICES.find((s) => s.id === form.service)!;
  const rows = [
    { label: "Service", value: `${svc.emoji} ${svc.label}` },
    { label: "Name", value: form.name },
    { label: "Mobile", value: `+91 ${form.mobile}` },
    ...(form.service !== "Vastu" ? [{ label: "Date of Birth", value: formatDisplayDate(form.dob) }] : []),
    ...(form.service === "Astrology" ? [{ label: "Time of Birth", value: `${form.tob_hour}:${form.tob_minute} ${form.tob_period}` }] : []),
    ...(form.service === "Astrology" ? [{ label: "Place of Birth", value: form.pob }] : []),
    ...(form.service === "Vastu" ? [{ label: "Dimensions", value: `${form.length}ft (L) × ${form.width}ft (W)` }] : []),
    ...(form.consultDate ? [{ label: "Preferred Date", value: new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) }] : []),
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
          <motion.div key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
            style={{
              background: i % 2 === 0 ? "hsl(var(--card)/0.5)" : "hsl(var(--card)/0.2)",
              borderColor: "hsl(var(--border))",
            }}>
            <span className="text-xs font-semibold w-28 shrink-0 pt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
              {row.label}
            </span>
            <span className="text-xs md:text-sm font-medium flex-1" style={{ color: "hsl(var(--card-foreground))" }}>
              {row.value}
            </span>
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
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }} className="text-center py-8 px-2 space-y-6">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
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

      {form.service === "Palmistry" && (
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">✋</span>
          <p className="text-muted-foreground">
            Your Palmistry reading is in-person at our Mumbai centre. We'll WhatsApp you to schedule your visit.
          </p>
        </div>
      )}
    </div>

    {/* Direct WhatsApp CTA */}
    <a
      href="https://wa.me/918879731174"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
      style={{ background: "#25D366", color: "#fff" }}
    >
      <span className="text-base">💬</span>
      Chat with us on WhatsApp
    </a>

    <div>
      <Button variant="outline" onClick={onReset} className="rounded-xl text-sm">
        Submit Another Inquiry
      </Button>
    </div>
  </motion.div>
);

// ─── Main Form Wrapper ────────────────────────────────────────────────────────

const EMPTY: FormData = {
  service: "", name: "", mobile: "", dob: "",
  tob_hour: "", tob_minute: "", tob_period: "AM",
  pob: "", length: "", width: "", consultDate: "", consultTime: "", message: "",
};

const InquiryForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (step === 0) {
      if (!form.service) e.service = "Please select a service to continue.";
    }
    if (step === 1) {
      if (!form.name.trim()) e.name = "Please enter your full name.";
      if (!form.mobile || !/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit number.";
      if (form.service !== "Vastu" && !form.dob) e.dob = "Please select your date of birth.";
      if (form.service === "Astrology") {
        if (!form.tob_hour) e.tob_hour = "Select hour.";
        if (!form.tob_minute) e.tob_minute = "Select minute.";
        if (!form.pob.trim()) e.pob = "Please enter your place of birth.";
      }
      if (form.service === "Vastu") {
        if (!form.length) e.length = "Enter length.";
        if (!form.width) e.width = "Enter width.";
      }
    }
    if (step === 2 && form.service !== "Palmistry") {
      if (!form.consultDate) e.consultDate = "Please select a date.";
      if (!form.consultTime) e.consultTime = "Please select a time slot.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 1 && form.service === "Palmistry") setStep(3);
    else setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setErrors({});
    if (step === 3 && form.service === "Palmistry") setStep(1);
    else setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const tob = form.service === "Astrology" && form.tob_hour && form.tob_minute
        ? `${form.tob_hour}:${form.tob_minute} ${form.tob_period}`
        : undefined;

      const payload = {
        service: form.service,
        name: form.name,
        mobile: form.mobile,
        dob: form.service !== "Vastu" ? form.dob : undefined,
        tob: tob,
        pob: form.service === "Astrology" ? form.pob : undefined,
        length: form.service === "Vastu" ? form.length : undefined,
        width: form.service === "Vastu" ? form.width : undefined,
        consultDate: form.consultDate || undefined,
        consultTime: form.consultTime || undefined,
        message: form.message || undefined,
      };

      await axios.post(`${API_BASE_URL}/inquiry`, payload);

      await sendLeadToCRM({
        name: form.name,
        phone: form.mobile,
        email: "",
        source: "Website Inquiry Form",
        tags: [
          "Inquiry Form",
          form.service || "",
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
    setForm(EMPTY);
    setErrors({});
    setStep(0);
    setSubmit(false);
    setSubmitError(null);
  };

  if (submitted) return <SuccessScreen form={form} onReset={reset} />;

  return (
    <div>
      <StepBar current={step} />
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}>
          {step === 0 && <Step1 form={form} setField={setField} errors={errors} />}
          {step === 1 && <Step2 form={form} setField={setField} errors={errors} />}
          {step === 2 && <Step3 form={form} setField={setField} errors={errors} />}
          {step === 3 && <Step4 form={form} />}
        </motion.div>
      </AnimatePresence>

      {/* Submit error */}
      {submitError && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl text-xs text-center"
          style={{ background: "hsl(0 72% 51%/0.1)", border: "1.5px solid hsl(0 72% 51%/0.4)", color: "hsl(0 72% 60%)" }}>
          ⚠️ {submitError}
        </motion.div>
      )}

      {/* Navigation */}
      <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <Button variant="outline" onClick={back} disabled={isSubmitting}
            className="rounded-xl flex items-center gap-1.5 text-sm">
            <ChevronLeft size={15} /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={next}
            className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
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
    </Helmet>
    <Layout>
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Send an Inquiry</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 leading-tight">
              Ask Your Question.
              <span className="text-gradient-gold"> Find Your Path.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Share your details and our experts will guide you towards clarity and cosmic alignment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-8 md:py-14 bg-background" id="inquiry">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* Left panel */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-bold mb-2">
                  Why Consult <span className="text-gradient-gold">Us?</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Over 25 years of expertise in Vedic sciences. Trusted by thousands across India and abroad.
                </p>
              </div>

              <div className="space-y-3">
                {SERVICES.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl cosmic-card">
                    <span className="text-xl shrink-0 mt-0.5">{s.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "hsl(var(--card-foreground))" }}>{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact info */}
              <div className="p-4 rounded-2xl space-y-3"
                style={{ background: "hsl(var(--card)/0.6)", border: "1.5px solid hsl(var(--border))" }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Direct Contact</p>
                <a href="tel:+918879731174"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  style={{ color: "hsl(var(--card-foreground))" }}>
                  <Phone size={14} style={{ color: "hsl(var(--primary))" }} />
                  +91 88797 31174
                </a>
                <a href="https://wa.me/918879731174" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  style={{ color: "hsl(var(--card-foreground))" }}>
                  <span className="text-base">💬</span>
                  WhatsApp Us
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                  Kalbadevi, Princess Street, Marine Lines, Mumbai
                </div>
              </div>
            </motion.div>

            {/* Right — Form card */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-3">
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