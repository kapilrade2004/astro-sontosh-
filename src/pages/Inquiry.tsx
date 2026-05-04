


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

type Service = "Astrology" | "Numerology" | "Vastu";

// interface FormData {
//   service: Service | "";
//   name: string;
//   mobile: string;
//   // dob: string;
//   // Numerology DOB uses separate dropdowns to prevent manual typing
//   dob_day: string;
//   dob_month: string;
//   dob_year: string;
//   tob_hour: string;
//   tob_minute: string;
//   tob_period: "AM" | "PM";
//   pob: string;
//   length: string;
//   width: string;
//   consultDate: string;
//   consultTime: string;
//   message: string;
// }

interface FormData {
  service: Service | "";
  name: string;
  mobile: string;
  // Unified DOB for Astrology + Numerology
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

// Numerology DOB dropdown data
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

// Name validation — letters/spaces/dots/hyphens only, min 2 chars
const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && /^[a-zA-Z\s.'\-]+$/.test(trimmed);
};

// Shared keydown guard: allows only letters, spaces and basic punctuation
// Used for BOTH Numerology and Vastu name fields
const nameKeyDownGuard = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowed = /^[a-zA-Z\s.'\-]$/;
  const navKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
  if (!allowed.test(e.key) && !navKeys.includes(e.key)) e.preventDefault();
};

// ─── EMPTY defined once — used in reset() and service-change wipe ─────
// const EMPTY: FormData = {
//   service: "", name: "", mobile: "", dob: "",
//   dob_day: "", dob_month: "", dob_year: "",
//   tob_hour: "", tob_minute: "", tob_period: "AM",
//   pob: "", length: "", width: "",
//   consultDate: "", consultTime: "", message: "",
// };

const EMPTY: FormData = {
  service: "", name: "", mobile: "",
  dob_day: "", dob_month: "", dob_year: "",
  tob_hour: "", tob_minute: "", tob_period: "AM",
  pob: "", length: "", width: "",
  consultDate: "", consultTime: "", message: "",
};
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
  form,
  setField,
  errors,
  clearedByServiceChange,
}: {
  form: FormData;
  setField: (k: keyof FormData, v: string) => void;
  errors: FieldErrors;
  // CHANGE 7: banner shown after a service-change data wipe
  clearedByServiceChange: boolean;
}) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
        Choose a Service
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground">Select the area you'd like guidance on</p>
    </div>

    {/* CHANGE 7: Inform user that previously entered data was cleared when they switched service */}
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
          <span>
            You switched services — all previously entered details have been cleared so you start fresh.
          </span>
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

// const Step2 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => {
//   const isAstrology  = form.service === "Astrology";
//   const isVastu      = form.service === "Vastu";
//   const isNumerology = form.service === "Numerology";

//   // Vastu dimensions: 1–200 ft dropdown
//   const DIMENSION_OPTIONS = Array.from({ length: 200 }, (_, i) => i + 1);

//   // Shared: name input requires letters-only guard for Numerology AND Vastu
//   const needsNameGuard = isNumerology || isVastu;

//   // Build Numerology DOB display string from dropdowns
//   const numDobDisplay = form.dob_day && form.dob_month && form.dob_year
//     ? `${form.dob_day}-${form.dob_month}-${form.dob_year}`
//     : "";

//   return (
//     <div className="space-y-5">
//       <div>
//         <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
//           Your Details
//         </h3>
//         <p className="text-xs md:text-sm text-muted-foreground">
//           Information required for your{" "}
//           <span style={{ color: "hsl(var(--primary))" }}>{form.service}</span> reading
//         </p>
//       </div>

//       {/* ── Full Name ──
//           Letters-only keydown guard + paste blocked for BOTH Numerology AND Vastu.
//           CHANGE 5: Neutral placeholder — no personal example names.
//       */}
//       <Field label="Full Name" icon={<Star size={13} />} error={errors.name} required>
//         <input
//           type="text"
//           value={form.name}
//           onChange={(e) => setField("name", e.target.value)}
//           placeholder="Enter your full name"
//           className={iCls}
//           style={iStyle(errors.name)}
//           onKeyDown={needsNameGuard ? nameKeyDownGuard : undefined}
//           onPaste={needsNameGuard ? (e) => e.preventDefault() : undefined}
//         />
//         {needsNameGuard && (
//           <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
//             ℹ️ Only letters are accepted. Copy-paste is disabled for accuracy.
//           </p>
//         )}
//       </Field>

//       {/* ── Mobile ── */}
//       <Field
//         label="Mobile Number"
//         icon={<Phone size={13} />}
//         error={errors.mobile}
//         required
//         hint="You'll receive a WhatsApp confirmation on this number"
//       >
//         <div className="flex gap-2">
//           <div
//             className="flex items-center px-3 rounded-xl text-sm font-medium shrink-0"
//             style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
//           >
//             🇮🇳 +91
//           </div>
//           <input
//             type="tel"
//             value={form.mobile}
//             maxLength={10}
//             onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
//             placeholder="Enter your 10-digit number"
//             className={`${iCls} flex-1`}
//             style={iStyle(errors.mobile)}
//           />
//         </div>
//       </Field>

//       {/* ── Date of Birth — Astrology: native date picker (optional) ──
//           CHANGE 6: DOB is optional for Astrology. Hint text updated to clarify.
//       */}
//       {isAstrology && (
//         <Field
//           label="Date of Birth"
//           icon={<Calendar size={13} />}
//           error={errors.dob}
//           required={false}
//           hint={
//             form.dob
//               ? `Selected: ${formatDisplayDate(form.dob)}`
//               : "Optional — leave blank if not known"
//           }
//         >
//           <input
//             type="date"
//             value={form.dob}
//             max={todayStr}
//             onChange={(e) => setField("dob", e.target.value)}
//             className={iCls}
//             style={{ ...iStyle(errors.dob), colorScheme: "dark" }}
//           />
//           {/* CHANGE 6: Contextual note pointing users to prior consultation details */}
//           {/* <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
//             ℹ️ Had a prior consultation? Your birth details may already be on record — you can leave this blank.
//           </p> */}
//         </Field>
//       )}

//       {/* ── Date of Birth — Numerology: dropdown selects ONLY (no manual typing) ──
//           CHANGE 2: Disabled manual entry. Three select dropdowns (Day / Month / Year).
//           CHANGE 6: DOB is optional for Numerology. Hint text updated to clarify.
//       */}
//       {isNumerology && (
//         <Field
//           label="Date of Birth"
//           icon={<Calendar size={13} />}
//           error={errors.dob_day || errors.dob_month || errors.dob_year}
//           required={false}
//           hint={numDobDisplay ? `Selected: ${numDobDisplay}` : ""}
//         >
//           <div className="grid grid-cols-3 gap-2">
//             {/* Day */}
//             <select
//               value={form.dob_day}
//               onChange={(e) => setField("dob_day", e.target.value)}
//               className={iCls}
//               style={{ ...iStyle(errors.dob_day), colorScheme: "dark" }}
//             >
//               <option value="">Day</option>
//               {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
//             </select>
//             {/* Month */}
//             <select
//               value={form.dob_month}
//               onChange={(e) => setField("dob_month", e.target.value)}
//               className={iCls}
//               style={{ ...iStyle(errors.dob_month), colorScheme: "dark" }}
//             >
//               <option value="">Month</option>
//               {MONTHS.map((m) => <option key={m.val} value={m.val}>{m.label}</option>)}
//             </select>
//             {/* Year */}
//             <select
//               value={form.dob_year}
//               onChange={(e) => setField("dob_year", e.target.value)}
//               className={iCls}
//               style={{ ...iStyle(errors.dob_year), colorScheme: "dark" }}
//             >
//               <option value="">Year</option>
//               {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
//             </select>
//           </div>
//           <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
//             ℹ️ Please select from the dropdowns — manual typing is disabled for accuracy.
//           </p>
//           {/* CHANGE 6: Contextual note pointing users to prior consultation details */}
//           {/* <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
//             Had a prior consultation? Your birth details may already be on record — you can leave this blank.
//           </p> */}
//         </Field>
//       )}

//       {/* ── Time of Birth — Astrology only ── */}
//       {isAstrology && (
//         <Field
//           label="Time of Birth"
//           icon={<Clock size={13} />}
//           error={errors.tob_hour || errors.tob_minute}
//           required
//           hint={
//             form.tob_hour && form.tob_minute
//               ? `Selected: ${form.tob_hour}:${form.tob_minute} ${form.tob_period}`
//               : "Select hour, minute and AM/PM"
//           }
//         >
//           <div className="grid grid-cols-3 gap-2">
//             <select
//               value={form.tob_hour}
//               onChange={(e) => setField("tob_hour", e.target.value)}
//               className={iCls}
//               style={{ ...iStyle(errors.tob_hour), colorScheme: "dark" }}
//             >
//               <option value="">Hour</option>
//               {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
//             </select>
//             <select
//               value={form.tob_minute}
//               onChange={(e) => setField("tob_minute", e.target.value)}
//               className={iCls}
//               style={{ ...iStyle(errors.tob_minute), colorScheme: "dark" }}
//             >
//               <option value="">Min</option>
//               {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
//             </select>
//             <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid hsl(var(--border))" }}>
//               {(["AM", "PM"] as const).map((p) => (
//                 <button
//                   key={p}
//                   type="button"
//                   onClick={() => setField("tob_period", p)}
//                   className="flex-1 text-sm font-bold transition-all duration-200"
//                   style={{
//                     background: form.tob_period === p
//                       ? "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))"
//                       : "hsl(var(--card))",
//                     color: form.tob_period === p ? "#fff" : "hsl(var(--muted-foreground))",
//                   }}
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </Field>
//       )}

//       {/* ── Place of Birth — Astrology only ──
//           CHANGE 5: Neutral placeholder — no personal example value.
//       */}
//       {isAstrology && (
//         <Field
//           label="Place of Birth"
//           icon={<MapPin size={13} />}
//           error={errors.pob}
//           required
//           hint="City or town where you were born"
//         >
//           <input
//             type="text"
//             value={form.pob}
//             onChange={(e) => setField("pob", e.target.value)}
//             placeholder="Enter your place of birth"
//             className={iCls}
//             style={iStyle(errors.pob)}
//           />
//         </Field>
//       )}

//       {/* ── Vastu dimensions — dropdown 1–200 ft ── */}
//       {isVastu && (
//         <Field
//           label="Property Dimensions"
//           icon={<Ruler size={13} />}
//           error={errors.length || errors.width}
//           required
//           hint="Select the Length and Width of your property in feet"
//         >
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1">
//               <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Length (ft)</span>
//               <select
//                 value={form.length}
//                 onChange={(e) => setField("length", e.target.value)}
//                 className={iCls}
//                 style={{ ...iStyle(errors.length), colorScheme: "dark" }}
//               >
//                 <option value="">Select Length</option>
//                 {DIMENSION_OPTIONS.map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
//               </select>
//             </div>
//             <div className="flex flex-col gap-1">
//               <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Width (ft)</span>
//               <select
//                 value={form.width}
//                 onChange={(e) => setField("width", e.target.value)}
//                 className={iCls}
//                 style={{ ...iStyle(errors.width), colorScheme: "dark" }}
//               >
//                 <option value="">Select Width</option>
//                 {DIMENSION_OPTIONS.map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
//               </select>
//             </div>
//           </div>
//         </Field>
//       )}
//     </div>
//   );
// };

// ─── STEP 2 — Personal Details (UPDATED) ────────────────────────────────────────────────
const Step2 = ({ form, setField, errors }: { form: FormData; setField: (k: keyof FormData, v: string) => void; errors: FieldErrors }) => {
  const isAstrology  = form.service === "Astrology";
  const isVastu      = form.service === "Vastu";
  const isNumerology = form.service === "Numerology";

  const DIMENSION_OPTIONS = Array.from({ length: 200 }, (_, i) => i + 1);
  // const needsNameGuard = isNumerology || isVastu;
const needsNameGuard = isAstrology || isNumerology || isVastu; 
  const dobDisplay = form.dob_day && form.dob_month && form.dob_year 
    ? `${form.dob_day}-${form.dob_month}-${form.dob_year}` 
    : "";

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

      {/* Full Name */}
      <Field label="Full Name" icon={<Star size={13} />} error={errors.name} required>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Enter your full name"
          className={iCls}
          style={iStyle(errors.name)}
          onKeyDown={needsNameGuard ? nameKeyDownGuard : undefined}
          onPaste={needsNameGuard ? (e) => e.preventDefault() : undefined}
        />
        {needsNameGuard && (
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            ℹ️ Only letters are accepted. Copy-paste is disabled for accuracy.
          </p>
        )}
      </Field>

      {/* Mobile Number */}
      <Field
        label="Mobile Number"
        icon={<Phone size={13} />}
        error={errors.mobile}
        required
        hint="You'll receive a WhatsApp confirmation on this number"
      >
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl text-sm font-medium shrink-0"
               style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
            🇮🇳 +91
          </div>
          <input
            type="tel"
            value={form.mobile}
            maxLength={10}
            onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
            placeholder="Enter your 10-digit number"
            className={`${iCls} flex-1`}
            style={iStyle(errors.mobile)}
          />
        </div>
      </Field>

      {/* UNIFIED DOB Dropdowns - For Astrology & Numerology */}
      {(isAstrology || isNumerology) && (
        // <Field
        //   label="Date of Birth"
        //   icon={<Calendar size={13} />}
        //   error={errors.dob_day || errors.dob_month || errors.dob_year}
        //   required={false}
        //   hint={dobDisplay ? `Selected: ${dobDisplay}` : "Select from dropdowns only"}
        // >
        <Field
  label="Date of Birth"
  icon={<Calendar size={13} />}
  error={errors.dob_day || errors.dob_month || errors.dob_year}
  required={true}   // ← change from false to true
  hint={dobDisplay ? `Selected: ${dobDisplay}` : "Select from dropdowns only"}
>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={form.dob_day}
              onChange={(e) => setField("dob_day", e.target.value)}
              className={iCls}
              style={{ ...iStyle(errors.dob_day), colorScheme: "dark" }}
            >
              <option value="">Day</option>
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select
              value={form.dob_month}
              onChange={(e) => setField("dob_month", e.target.value)}
              className={iCls}
              style={{ ...iStyle(errors.dob_month), colorScheme: "dark" }}
            >
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m.val} value={m.val}>{m.label}</option>)}
            </select>

            <select
              value={form.dob_year}
              onChange={(e) => setField("dob_year", e.target.value)}
              className={iCls}
              style={{ ...iStyle(errors.dob_year), colorScheme: "dark" }}
            >
              <option value="">Year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            ℹ️ Manual entry disabled. Please select from dropdowns only.
          </p>
        </Field>
      )}

      {/* Time of Birth - Astrology only */}
    {isAstrology && (
        <Field
          label="Time of Birth"
          icon={<Clock size={13} />}
          error={errors.tob_hour || errors.tob_minute}
          required
          hint={
            form.tob_hour && form.tob_minute
              ? `Selected: ${form.tob_hour}:${form.tob_minute} ${form.tob_period}`
              : "Select hour, minute and AM/PM"
          }
        >
          <div className="grid grid-cols-3 gap-2">
            <select
              value={form.tob_hour}
              onChange={(e) => setField("tob_hour", e.target.value)}
              className={iCls}
              style={{ ...iStyle(errors.tob_hour), colorScheme: "dark" }}
            >
              <option value="">Hour</option>
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
            <select
              value={form.tob_minute}
              onChange={(e) => setField("tob_minute", e.target.value)}
              className={iCls}
              style={{ ...iStyle(errors.tob_minute), colorScheme: "dark" }}
            >
              <option value="">Min</option>
              {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid hsl(var(--border))" }}>
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setField("tob_period", p)}
                  className="flex-1 text-sm font-bold transition-all duration-200"
                  style={{
                    background: form.tob_period === p
                      ? "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))"
                      : "hsl(var(--card))",
                    color: form.tob_period === p ? "#fff" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Field>
      )}

      {/* ── Place of Birth — Astrology only ──
          CHANGE 5: Neutral placeholder — no personal example value.
      */}
      {isAstrology && (
        <Field
          label="Place of Birth"
          icon={<MapPin size={13} />}
          error={errors.pob}
          required
          hint="City or town where you were born"
        >
          <input
            type="text"
            value={form.pob}
            onChange={(e) => setField("pob", e.target.value)}
            placeholder="Enter your place of birth"
            className={iCls}
            style={iStyle(errors.pob)}
          />
        </Field>
      )}

      {/* ── Vastu dimensions — dropdown 1–200 ft ── */}
      {isVastu && (
        <Field
          label="Property Dimensions"
          icon={<Ruler size={13} />}
          error={errors.length || errors.width}
          required
          hint="Select the Length and Width of your property in feet"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Length (ft)</span>
              <select
                value={form.length}
                onChange={(e) => setField("length", e.target.value)}
                className={iCls}
                style={{ ...iStyle(errors.length), colorScheme: "dark" }}
              >
                <option value="">Select Length</option>
                {DIMENSION_OPTIONS.map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Width (ft)</span>
              <select
                value={form.width}
                onChange={(e) => setField("width", e.target.value)}
                className={iCls}
                style={{ ...iStyle(errors.width), colorScheme: "dark" }}
              >
                <option value="">Select Width</option>
                {DIMENSION_OPTIONS.map((v) => <option key={v} value={String(v)}>{v} ft</option>)}
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

    <Field
      label="Preferred Date"
      icon={<Calendar size={13} />}
      error={errors.consultDate}
      required
      hint={
        form.consultDate
          ? `Selected: ${new Date(form.consultDate).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}`
          : "Available dates: today up to 3 months ahead"
      }
    >
      <input
        type="date"
        min={todayStr}
        max={maxConsultDate}
        value={form.consultDate}
        onChange={(e) => setField("consultDate", e.target.value)}
        className={iCls}
        style={{ ...iStyle(errors.consultDate), colorScheme: "dark" }}
      />
    </Field>

    <Field label="Preferred Time Slot" icon={<Clock size={13} />} error={errors.consultTime} required>
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((slot) => {
          const sel = form.consultTime === slot;
          return (
            <motion.button
              key={slot}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setField("consultTime", slot)}
              className="py-2.5 px-2 rounded-xl text-xs md:text-sm font-semibold border-2 transition-all duration-200"
              style={{
                background:  sel ? "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(35 80% 45%/0.1))" : "hsl(var(--card)/0.6)",
                borderColor: sel ? "hsl(var(--primary))" : "hsl(var(--border))",
                color:       sel ? "hsl(var(--primary))" : "hsl(var(--card-foreground))",
              }}
            >
              {slot}
            </motion.button>
          );
        })}
      </div>
    </Field>

    <Field label="Additional Message (Optional)" icon={<Star size={13} />}>
      <textarea
        value={form.message}
        onChange={(e) => setField("message", e.target.value)}
        placeholder="Any specific questions or concerns you'd like to discuss…"
        rows={3}
        className={`${iCls} resize-none`}
        style={iStyle()}
      />
    </Field>
  </div>
);

// ─── STEP 4 — Review ─────────────────────────────────────────────────────────

// const Step4 = ({ form }: { form: FormData }) => {
//   const svc = SERVICES.find((s) => s.id === form.service)!;

//   // Build Numerology DOB display string from dropdowns
//   const numDobDisplay = form.dob_day && form.dob_month && form.dob_year
//     ? `${form.dob_day}-${form.dob_month}-${form.dob_year}`
//     : null;

//   const rows = [
//     { label: "Service", value: `${svc.emoji} ${svc.label}` },
//     { label: "Name",    value: form.name },
//     { label: "Mobile",  value: `+91 ${form.mobile}` },
//     // Astrology — native DOB (optional, only show if filled)
//     ...(form.service === "Astrology" && form.dob
//       ? [{ label: "Date of Birth", value: formatDisplayDate(form.dob) }]
//       : []),
//     // Numerology — dropdown DOB (optional, only show if all three parts filled)
//     ...(form.service === "Numerology" && numDobDisplay
//       ? [{ label: "Date of Birth", value: numDobDisplay }]
//       : []),
//     ...(form.service === "Astrology"
//       ? [{ label: "Time of Birth",  value: `${form.tob_hour}:${form.tob_minute} ${form.tob_period}` }]
//       : []),
//     ...(form.service === "Astrology"
//       ? [{ label: "Place of Birth", value: form.pob }]
//       : []),
//     ...(form.service === "Vastu"
//       ? [{ label: "Dimensions",     value: `${form.length}ft (L) × ${form.width}ft (W)` }]
//       : []),
//     ...(form.consultDate
//       ? [{ label: "Preferred Date", value: new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) }]
//       : []),
//     ...(form.consultTime ? [{ label: "Preferred Time", value: form.consultTime }] : []),
//     ...(form.message     ? [{ label: "Message",        value: form.message }]     : []),
//   ];

//   return (
//     <div className="space-y-5">
//       <div>
//         <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: "hsl(var(--card-foreground))" }}>
//           Review Your Inquiry
//         </h3>
//         <p className="text-xs md:text-sm text-muted-foreground">Please verify your details before submitting</p>
//       </div>
//       <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid hsl(var(--border))" }}>
//         {rows.map((row, i) => (
//           <motion.div
//             key={row.label}
//             initial={{ opacity: 0, x: -8 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.04 }}
//             className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
//             style={{
//               background:  i % 2 === 0 ? "hsl(var(--card)/0.5)" : "hsl(var(--card)/0.2)",
//               borderColor: "hsl(var(--border))",
//             }}
//           >
//             <span className="text-xs font-semibold w-28 shrink-0 pt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
//               {row.label}
//             </span>
//             <span className="text-xs md:text-sm font-medium flex-1" style={{ color: "hsl(var(--card-foreground))" }}>
//               {row.value}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//       <div
//         className="flex gap-3 p-4 rounded-2xl text-xs text-muted-foreground"
//         style={{ background: "hsl(var(--primary)/0.07)", border: "1.5px solid hsl(var(--primary)/0.2)" }}
//       >
//         <span className="text-base shrink-0">🔒</span>
//         Your information is confidential and will only be used to provide personalised astrological guidance.
//       </div>
//     </div>
//   );
// };

// ─── STEP 4 — Review ─────────────────────────────────────────────────────────
const Step4 = ({ form }: { form: FormData }) => {
  const svc = SERVICES.find((s) => s.id === form.service)!;

  // Unified DOB display
  const dobDisplay = form.dob_day && form.dob_month && form.dob_year
    ? `${form.dob_day}-${form.dob_month}-${form.dob_year}`
    : null;

  const rows = [
    { label: "Service", value: `${svc.emoji} ${svc.label}` },
    { label: "Name",    value: form.name },
    { label: "Mobile",  value: `+91 ${form.mobile}` },

    // Unified DOB display for both Astrology and Numerology
    ...(dobDisplay ? [{ label: "Date of Birth", value: dobDisplay }] : []),

    // Time of Birth - Astrology only
    ...(form.service === "Astrology" && form.tob_hour && form.tob_minute
      ? [{ label: "Time of Birth", value: `${form.tob_hour}:${form.tob_minute} ${form.tob_period}` }]
      : []),

    // Place of Birth - Astrology only
    ...(form.service === "Astrology" && form.pob
      ? [{ label: "Place of Birth", value: form.pob }]
      : []),

    // Vastu Dimensions
    ...(form.service === "Vastu" && form.length && form.width
      ? [{ label: "Dimensions", value: `${form.length}ft (L) × ${form.width}ft (W)` }]
      : []),

    // Consultation Details
    ...(form.consultDate
      ? [{ label: "Preferred Date", value: new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) }]
      : []),
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
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0"
            style={{
              background: i % 2 === 0 ? "hsl(var(--card)/0.5)" : "hsl(var(--card)/0.2)",
              borderColor: "hsl(var(--border))",
            }}
          >
            <span className="text-xs font-semibold w-28 shrink-0 pt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
              {row.label}
            </span>
            <span className="text-xs md:text-sm font-medium flex-1" style={{ color: "hsl(var(--card-foreground))" }}>
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div
        className="flex gap-3 p-4 rounded-2xl text-xs text-muted-foreground"
        style={{ background: "hsl(var(--primary)/0.07)", border: "1.5px solid hsl(var(--primary)/0.2)" }}
      >
        <span className="text-base shrink-0">🔒</span>
        Your information is confidential and will only be used to provide personalised astrological guidance.
      </div>
    </div>
  );
};
// ─── Success ─────────────────────────────────────────────────────────────────

const SuccessScreen = ({ form, onReset }: { form: FormData; onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="text-center py-8 px-2 space-y-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
      className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}
    >
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
    <div
      className="rounded-2xl p-4 text-sm space-y-3 text-left"
      style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}
    >
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

const InquiryForm = () => {
  const [step, setStep]                 = useState(0);
  const [submitted, setSubmit]          = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [form, setForm]                 = useState<FormData>(EMPTY);
  const [errors, setErrors]             = useState<FieldErrors>({});

  // CHANGE 7: Track whether a service change just wiped data so the banner shows
  const [clearedByServiceChange, setClearedByServiceChange] = useState(false);

  // When service switches, wipe ALL fields (including name and mobile) so the
  // user starts completely fresh for the new service.
  // CHANGE 7: Full wipe on service change + show confirmation banner.
  const setField = (key: keyof FormData, value: string) => {
    setForm((f) => {
      if (key === "service" && value !== f.service && f.service !== "") {
        // Service changed while another service was already selected — wipe everything
        setClearedByServiceChange(true);
        // Auto-hide banner after 4 seconds
        setTimeout(() => setClearedByServiceChange(false), 4000);
        return { ...EMPTY, service: value as Service };
      }
      if (key === "service") {
        // First-time service selection — no prior data to wipe, no banner needed
        return { ...f, service: value as Service };
      }
      return { ...f, [key]: value };
    });
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};

    if (step === 0) {
      if (!form.service) e.service = "Please select a service to continue.";
    }

    // if (step === 1) {
    //   // Name validation for ALL services — Astrology, Vastu and Numerology
    //   if (!form.name.trim()) {
    //     e.name = "Please enter your full name.";
    //   } else if (!isValidName(form.name)) {
    //     e.name = "Name must be at least 2 characters and contain only letters.";
    //   }
    //   if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
    //     e.mobile = "Enter a valid 10-digit number.";
    //   }
    //   // DOB is optional for all services — no required validation
    //   if (form.service === "Astrology") {
    //     if (!form.tob_hour)   e.tob_hour   = "Select hour.";
    //     if (!form.tob_minute) e.tob_minute = "Select minute.";
    //     if (!form.pob.trim()) e.pob        = "Please enter your place of birth.";
    //   }
    //   if (form.service === "Vastu") {
    //     if (!form.length) e.length = "Please select a length.";
    //     if (!form.width)  e.width  = "Please select a width.";
    //   }
    // }

    if (step === 1) {
  if (!form.name.trim() || !isValidName(form.name)) {
    e.name = "Please enter a valid full name (min 2 letters only).";
  }
  if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
    e.mobile = "Enter a valid 10-digit number.";
  }

  // DOB Validation (Unified)
  // if ((form.service === "Astrology" || form.service === "Numerology")) {
  //   if (!form.dob_day || !form.dob_month || !form.dob_year) {
  //     e.dob_day = "Please select your full Date of Birth.";
  //   }
  // }


  // DOB Validation (Unified)
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
        ? `${form.tob_hour}:${form.tob_minute} ${form.tob_period}`
        : undefined;

      // Build Numerology DOB from dropdown fields
      const numDob = form.service === "Numerology" && form.dob_day && form.dob_month && form.dob_year
        ? `${form.dob_year}-${form.dob_month}-${form.dob_day}`
        : undefined;

      // const payload = {
      //   service:     form.service,
      //   name:        form.name,
      //   mobile:      form.mobile,
      //   // DOB: Astrology uses native picker, Numerology uses assembled dropdown value
      //   dob: form.service === "Astrology"
      //     ? (form.dob || undefined)
      //     : numDob,
      //   tob,
      //   pob:         form.service === "Astrology" ? form.pob    : undefined,
      //   length:      form.service === "Vastu"     ? form.length : undefined,
      //   width:       form.service === "Vastu"     ? form.width  : undefined,
      //   consultDate: form.consultDate || undefined,
      //   consultTime: form.consultTime || undefined,
      //   message:     form.message     || undefined,
      // };
      const payload = {
  service: form.service,
  name: form.name,
  mobile: form.mobile,
  dob: (form.dob_day && form.dob_month && form.dob_year) 
    ? `${form.dob_year}-${form.dob_month}-${form.dob_day}` 
    : undefined,
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
        name:  form.name,
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

  // reset() restores full EMPTY — all previously filled data is cleared
  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStep(0);
    setSubmit(false);
    setSubmitError(null);
    setClearedByServiceChange(false);
  };

  if (submitted) return <SuccessScreen form={form} onReset={reset} />;

  return (
    <div>
      <StepBar current={step} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {step === 0 && (
            <Step1
              form={form}
              setField={setField}
              errors={errors}
              clearedByServiceChange={clearedByServiceChange}
            />
          )}
          {step === 1 && <Step2 form={form} setField={setField} errors={errors} />}
          {step === 2 && <Step3 form={form} setField={setField} errors={errors} />}
          {step === 3 && <Step4 form={form} />}
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl text-xs text-center"
          style={{ background: "hsl(0 72% 51%/0.1)", border: "1.5px solid hsl(0 72% 51%/0.4)", color: "hsl(0 72% 60%)" }}
        >
          ⚠️ {submitError}
        </motion.div>
      )}

      <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <Button
            variant="outline"
            onClick={back}
            disabled={isSubmitting}
            className="rounded-xl flex items-center gap-1.5 text-sm"
          >
            <ChevronLeft size={15} /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button
            onClick={next}
            className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}
          >
            Continue <ChevronRight size={15} />
          </Button>
        ) : (
          <Button
            onClick={submit}
            disabled={isSubmitting}
            className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}
          >
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
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
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

      <section className="py-8 md:py-14 bg-background" id="inquiry">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
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
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl cosmic-card"
                  >
                    <span className="text-xl shrink-0 mt-0.5">{s.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "hsl(var(--card-foreground))" }}>{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div
                className="p-4 rounded-2xl space-y-3"
                style={{ background: "hsl(var(--card)/0.6)", border: "1.5px solid hsl(var(--border))" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Direct Contact</p>
                <a
                  href="tel:+918879731174"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  style={{ color: "hsl(var(--card-foreground))" }}
                >
                  <Phone size={14} style={{ color: "hsl(var(--primary))" }} /> +91 88797 31174
                </a>
                <a
                  href="https://wa.me/918879731174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  style={{ color: "hsl(var(--card-foreground))" }}
                >
                  <span className="text-base">💬</span> WhatsApp Us
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                  Kalbadevi, Princess Street, Marine Lines, Mumbai
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div
                className="cosmic-card rounded-3xl p-5 md:p-8 shadow-2xl"
                style={{ border: "1.5px solid hsl(var(--border))" }}
              >
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