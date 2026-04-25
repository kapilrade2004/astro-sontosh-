// /**
//  * QuickServiceBookingTab.tsx
//  *
//  * Drop this component into your existing BookingForm / Contact page
//  * alongside "New Consultation" and "Follow-up Consultation" tabs.
//  *
//  * Usage:
//  *   1. Import and add a third tab button labelled "Quick Service"
//  *   2. Render <QuickServiceBookingTab /> when that tab is active
//  *
//  * The component mirrors the field layout of your existing Step-1 form:
//  *   Full Name | Email | Date of Birth
//  *   Mobile Number | Service Selector (dropdown of all quickServices)
//  *   Time of Birth (conditional) | Your Question
//  *   Price summary + Pay / Next Step CTA
//  *
//  * All styles use the same Tailwind + class tokens already in your project.
//  */

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CalendarIcon,
//   ChevronDown,
//   X,
//   CheckCircle2,
//   Zap,
//   Clock,
//   Info,
// } from "lucide-react";
// import { createPortal } from "react-dom";
// import { format, startOfDay, isAfter } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { quickServices, serviceCategories } from "@/data/quickServices";

// // ─── Inline DOB Picker (same logic as QuickServiceDetailPage) ────────────────
// const DobPicker = ({
//   value,
//   onChange,
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) => {
//   const today = startOfDay(new Date());
//   const [open, setOpen] = useState(false);
//   const [pending, setPending] = useState<Date | undefined>(
//     value ? new Date(value) : undefined
//   );
//   const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
//   const triggerRef = useRef<HTMLButtonElement>(null);

//   const openCal = () => {
//     if (triggerRef.current) {
//       const r = triggerRef.current.getBoundingClientRect();
//       const calH = 360;
//       const below = window.innerHeight - r.bottom;
//       const top =
//         below >= calH
//           ? r.bottom + window.scrollY + 4
//           : r.top + window.scrollY - calH - 4;
//       const w = Math.min(300, window.innerWidth - 32);
//       const left = Math.min(
//         r.left + window.scrollX,
//         window.innerWidth + window.scrollX - w - 8
//       );
//       setPos({ top, left, width: w });
//     }
//     setOpen(true);
//   };

//   useEffect(() => {
//     if (!open) return;
//     const h = (e: MouseEvent) => {
//       const t = e.target as HTMLElement;
//       if (t.closest("[data-qs-dob]")) return;
//       if (triggerRef.current?.contains(t)) return;
//       setOpen(false);
//       setPending(value ? new Date(value) : undefined);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, [open, value]);

//   const confirm = () => {
//     if (!pending) return;
//     onChange(format(pending, "yyyy-MM-dd"));
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         ref={triggerRef}
//         type="button"
//         onClick={openCal}
//         className={`w-full h-11 px-3 flex items-center justify-between rounded-md border bg-background/60 text-sm transition-colors hover:border-primary/60
//           ${error ? "border-red-500" : "border-primary/20"}`}
//       >
//         <span className={value ? "text-foreground" : "text-muted-foreground"}>
//           {value ? format(new Date(value), "dd MMM yyyy") : "Select date of birth"}
//         </span>
//         <div className="flex items-center gap-1.5 shrink-0">
//           {value && (
//             <span
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange("");
//                 setPending(undefined);
//               }}
//               className="text-muted-foreground hover:text-destructive transition-colors"
//             >
//               <X className="w-3.5 h-3.5" />
//             </span>
//           )}
//           <CalendarIcon className="w-4 h-4 text-primary/60" />
//         </div>
//       </button>
//       {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}

//       {typeof document !== "undefined" &&
//         createPortal(
//           <AnimatePresence>
//             {open && (
//               <>
//                 <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
//                 <motion.div
//                   data-qs-dob
//                   initial={{ opacity: 0, y: -6, scale: 0.97 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -6, scale: 0.97 }}
//                   transition={{ duration: 0.18 }}
//                   style={{
//                     position: "absolute",
//                     top: pos.top,
//                     left: pos.left,
//                     width: pos.width,
//                     zIndex: 999,
//                   }}
//                   className="bg-background border border-primary/25 rounded-2xl shadow-2xl overflow-hidden"
//                 >
//                   <div className="p-2">
//                     <Calendar
//                       mode="single"
//                       selected={pending}
//                       onSelect={(d) => {
//                         if (!d || isAfter(startOfDay(d), today)) return;
//                         setPending(d);
//                       }}
//                       disabled={(d) => isAfter(startOfDay(d), today)}
//                       initialFocus
//                     />
//                   </div>
//                   <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-primary/10 bg-primary/5">
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 h-9 text-xs border-primary/20"
//                       onClick={() => setOpen(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       type="button"
//                       size="sm"
//                       disabled={!pending}
//                       className="flex-1 h-9 text-xs bg-primary glow-gold font-bold"
//                       onClick={confirm}
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
//                       {pending ? `Confirm ${format(pending, "dd MMM")}` : "Pick a date"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>,
//           document.body
//         )}
//     </div>
//   );
// };

// // ─── Service Dropdown ─────────────────────────────────────────────────────────
// const ServiceDropdown = ({
//   value,
//   onChange,
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) => (
//   <div className="relative">
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className={`w-full h-11 pl-3 pr-8 appearance-none rounded-md border bg-background/60 text-sm transition-colors cursor-pointer
//         focus:outline-none focus:border-primary/60
//         ${!value ? "text-muted-foreground" : "text-foreground"}
//         ${error ? "border-red-500" : "border-primary/20"}`}
//     >
//       <option value="" disabled>
//         Select a Quick Service
//       </option>
//       {serviceCategories.map((cat) => (
//         <optgroup key={cat.id} label={`${cat.emoji}  ${cat.label}`}>
//           {quickServices
//             .filter((s) => s.category === cat.id)
//             .map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.title} — ₹{s.price.toLocaleString("en-IN")} · {s.deliveryTime}
//               </option>
//             ))}
//         </optgroup>
//       ))}
//     </select>
//     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60 pointer-events-none" />
//     {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
//   </div>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────
// export const QuickServiceBookingTab = ({
//   onNext,
// }: {
//   /**
//    * Called when the form is valid.
//    * Receives the collected form data so the parent can proceed to Step 2
//    * (slot selection / payment) — exactly like your existing consultation flow.
//    */
//   onNext?: (data: QuickServiceFormData) => void;
// }) => {
//   const { toast } = useToast();

//   const [form, setForm] = useState<QuickServiceFormData>({
//     fullName: "",
//     email: "",
//     dob: "",
//     phone: "",
//     serviceId: "",
//     timeOfBirth: "",
//     question: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const selectedService = quickServices.find((s) => s.id === form.serviceId) ?? null;

//   const update = (k: keyof QuickServiceFormData, v: string) => {
//     setForm((p) => ({ ...p, [k]: v }));
//     setErrors((p) => {
//       const n = { ...p };
//       delete n[k];
//       return n;
//     });
//   };

//   // Reset birth-time / dob when service changes to different requirements
//   const handleServiceChange = (id: string) => {
//     update("serviceId", id);
//     const svc = quickServices.find((s) => s.id === id);
//     if (svc && !svc.requiresDOB) update("dob", "");
//     if (svc && !svc.requiresBirthTime) update("timeOfBirth", "");
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.fullName.trim()) e.fullName = "Full name is required";
//     else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters";

//     if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       e.email = "Invalid email address";

//     if (!form.serviceId) e.serviceId = "Please select a service";

//     if (selectedService?.requiresDOB && !form.dob)
//       e.dob = "Date of birth is required for this service";

//     if (!form.phone) e.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be exactly 10 digits";

//     if (!form.question.trim()) e.question = "Please describe your question";
//     else if (form.question.trim().length < 10)
//       e.question = "At least 10 characters required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => {
//     if (!validate()) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill all required fields before continuing.",
//         variant: "destructive",
//       });
//       return;
//     }
//     onNext?.(form);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.22 }}
//       className="space-y-5"
//     >
//       {/* ── Row 1: Full Name | Email | Date of Birth ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {/* Full Name */}
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Full Name <span className="text-red-400">*</span>
//           </Label>
//           <Input
//             placeholder="Enter full name"
//             className={`bg-background/60 border-primary/20 h-11 text-sm ${
//               errors.fullName ? "border-red-500" : ""
//             }`}
//             value={form.fullName}
//             onChange={(e) => update("fullName", e.target.value)}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-[10px]">{errors.fullName}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Email Address{" "}
//             <span className="text-muted-foreground font-normal">(optional)</span>
//           </Label>
//           <Input
//             type="email"
//             placeholder="email@example.com"
//             className={`bg-background/60 border-primary/20 h-11 text-sm ${
//               errors.email ? "border-red-500" : ""
//             }`}
//             value={form.email}
//             onChange={(e) => update("email", e.target.value)}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-[10px]">{errors.email}</p>
//           )}
//         </div>

//         {/* Date of Birth */}
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Date of Birth{" "}
//             {selectedService?.requiresDOB ? (
//               <span className="text-red-400">*</span>
//             ) : (
//               <span className="text-muted-foreground font-normal">(if required)</span>
//             )}
//           </Label>
//           <DobPicker
//             value={form.dob}
//             onChange={(v) => update("dob", v)}
//             error={errors.dob}
//           />
//         </div>
//       </div>

//       {/* ── Row 2: Mobile | Service ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Mobile */}
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Mobile Number <span className="text-red-400">*</span>
//           </Label>
//           <div className="flex">
//             <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs shrink-0">
//               +91
//             </span>
//             <Input
//               placeholder="10-digit number"
//               maxLength={10}
//               className={`bg-background/60 border-primary/20 h-11 text-sm rounded-l-none ${
//                 errors.phone ? "border-red-500" : ""
//               }`}
//               value={form.phone}
//               onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-[10px]">{errors.phone}</p>
//           )}
//         </div>

//         {/* Service Selector */}
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Quick Service <span className="text-red-400">*</span>
//           </Label>
//           <ServiceDropdown
//             value={form.serviceId}
//             onChange={handleServiceChange}
//             error={errors.serviceId}
//           />
//         </div>
//       </div>

//       {/* ── Row 3: Time of Birth (conditional) | Question ── */}
//       <div
//         className={`grid gap-4 ${
//           selectedService?.requiresBirthTime
//             ? "grid-cols-1 sm:grid-cols-[1fr_2fr]"
//             : "grid-cols-1"
//         }`}
//       >
//         {selectedService?.requiresBirthTime && (
//           <div className="space-y-1.5">
//             <Label className="text-primary font-medium text-xs">
//               Time of Birth{" "}
//               <span className="text-muted-foreground font-normal">(if known)</span>
//             </Label>
//             <Input
//               placeholder="e.g. 10:30 AM"
//               className="bg-background/60 border-primary/20 h-11 text-sm"
//               value={form.timeOfBirth}
//               onChange={(e) => update("timeOfBirth", e.target.value)}
//             />
//           </div>
//         )}

//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Your Question <span className="text-red-400">*</span>
//           </Label>
//           <Textarea
//             placeholder="Describe your question or what you need guidance on…"
//             rows={3}
//             className={`bg-background/60 border-primary/20 resize-none text-sm ${
//               errors.question ? "border-red-500" : ""
//             }`}
//             value={form.question}
//             onChange={(e) => update("question", e.target.value)}
//           />
//           {errors.question && (
//             <p className="text-red-500 text-[10px]">{errors.question}</p>
//           )}
//         </div>
//       </div>

//       {/* ── Selected Service Summary ── */}
//       <AnimatePresence>
//         {selectedService && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden"
//           >
//             <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-2xl">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
//                   <selectedService.icon className="w-4 h-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-foreground leading-snug">
//                     {selectedService.title}
//                   </p>
//                   <div className="flex items-center gap-1 mt-0.5">
//                     <Clock className="w-3 h-3 text-primary/60" />
//                     <span className="text-[10px] text-muted-foreground">
//                       Delivered in {selectedService.deliveryTime} via WhatsApp
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xl font-bold text-gradient-gold font-serif shrink-0 ml-4">
//                 ₹{selectedService.price.toLocaleString("en-IN")}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── CTA ── */}
//       <div className="flex items-center justify-between gap-4 pt-1">
//         <p className="text-[10px] text-muted-foreground flex items-center gap-1">
//           <Info className="w-3 h-3 shrink-0" />
//           Secure payment · Delivered on WhatsApp
//         </p>

//         <Button
//           type="button"
//           onClick={handleNext}
//           className="h-12 px-8 text-sm bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg shrink-0 flex items-center gap-2"
//         >
//           <Zap className="w-4 h-4" />
//           {selectedService
//             ? `Get Answer · ₹${selectedService.price.toLocaleString("en-IN")}`
//             : "Next Step →"}
//         </Button>
//       </div>
//     </motion.div>
//   );
// };

// // ─── Types ────────────────────────────────────────────────────────────────────
// export interface QuickServiceFormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   phone: string;
//   serviceId: string;
//   timeOfBirth: string;
//   question: string;
// }

// export default QuickServiceBookingTab;


// /* ─────────────────────────────────────────────────────────────────────────────
//    HOW TO INTEGRATE INTO YOUR EXISTING CONTACT / BOOKING PAGE
//    ─────────────────────────────────────────────────────────────────────────────

//    1. Import the component and its type:

//       import { QuickServiceBookingTab, type QuickServiceFormData }
//         from "@/components/booking/QuickServiceBookingTab";

//    2. Extend your existing tab state (you likely have something like):

//       type Tab = "new" | "followup";
//       const [tab, setTab] = useState<Tab>("new");

//       → Change to:

//       type Tab = "new" | "followup" | "quickservice";
//       const [tab, setTab] = useState<Tab>("new");

//    3. Add the third tab button next to your existing two:

//       <button
//         onClick={() => setTab("quickservice")}
//         className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border
//           ${tab === "quickservice"
//             ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
//             : "bg-background/50 text-muted-foreground border-primary/20 hover:border-primary/50 hover:text-primary"
//           }`}
//       >
//         ⚡ Quick Service
//       </button>

//    4. Render the tab panel:

//       {tab === "quickservice" && (
//         <QuickServiceBookingTab
//           onNext={(data) => {
//             // Store data in state then advance to Step 2 (payment) —
//             // same pattern as your existing consultation flow.
//             setQuickServiceData(data);
//             setStep(2);
//           }}
//         />
//       )}

//    5. In Step 2, use the stored quickServiceData to call your payment API
//       (the same /payment + /quick-service-order endpoints already wired up
//       in QuickServiceDetailPage.tsx).
//    ───────────────────────────────────────────────────────────────────────────── */




//testing




// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CalendarIcon,
//   ChevronDown,
//   X,
//   CheckCircle2,
//   Zap,
//   Clock,
//   Info,
//   Heart,
//   Briefcase,
//   Star,
//   Gem,
//   MessageCircle,
// } from "lucide-react";
// import { createPortal } from "react-dom";
// import { format, startOfDay, isAfter } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { quickServices, serviceCategories } from "@/data/quickServices";

// // Category icons mapping
// const categoryIcons: Record<string, React.ElementType> = {
//   "love-relationships": Heart,
//   "career-money": Briefcase,
//   "instant-decisions": Star,
//   "personal-insights": Gem,
// };

// // ─── Inline DOB Picker ────────────────
// const DobPicker = ({
//   value,
//   onChange,
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) => {
//   const today = startOfDay(new Date());
//   const [open, setOpen] = useState(false);
//   const [pending, setPending] = useState<Date | undefined>(
//     value ? new Date(value) : undefined
//   );
//   const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
//   const triggerRef = useRef<HTMLButtonElement>(null);

//   const openCal = () => {
//     if (triggerRef.current) {
//       const r = triggerRef.current.getBoundingClientRect();
//       const calH = 360;
//       const below = window.innerHeight - r.bottom;
//       const top =
//         below >= calH
//           ? r.bottom + window.scrollY + 4
//           : r.top + window.scrollY - calH - 4;
//       const w = Math.min(300, window.innerWidth - 32);
//       const left = Math.min(
//         r.left + window.scrollX,
//         window.innerWidth + window.scrollX - w - 8
//       );
//       setPos({ top, left, width: w });
//     }
//     setOpen(true);
//   };

//   useEffect(() => {
//     if (!open) return;
//     const h = (e: MouseEvent) => {
//       const t = e.target as HTMLElement;
//       if (t.closest("[data-qs-dob]")) return;
//       if (triggerRef.current?.contains(t)) return;
//       setOpen(false);
//       setPending(value ? new Date(value) : undefined);
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, [open, value]);

//   const confirm = () => {
//     if (!pending) return;
//     onChange(format(pending, "yyyy-MM-dd"));
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         ref={triggerRef}
//         type="button"
//         onClick={openCal}
//         className={`w-full h-11 px-3 flex items-center justify-between rounded-md border bg-background/60 text-sm transition-colors hover:border-primary/60
//           ${error ? "border-red-500" : "border-primary/20"}`}
//       >
//         <span className={value ? "text-foreground" : "text-muted-foreground"}>
//           {value ? format(new Date(value), "dd MMM yyyy") : "Select date of birth"}
//         </span>
//         <div className="flex items-center gap-1.5 shrink-0">
//           {value && (
//             <span
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange("");
//                 setPending(undefined);
//               }}
//               className="text-muted-foreground hover:text-destructive transition-colors"
//             >
//               <X className="w-3.5 h-3.5" />
//             </span>
//           )}
//           <CalendarIcon className="w-4 h-4 text-primary/60" />
//         </div>
//       </button>
//       {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}

//       {typeof document !== "undefined" &&
//         createPortal(
//           <AnimatePresence>
//             {open && (
//               <>
//                 <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
//                 <motion.div
//                   data-qs-dob
//                   initial={{ opacity: 0, y: -6, scale: 0.97 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -6, scale: 0.97 }}
//                   transition={{ duration: 0.18 }}
//                   style={{
//                     position: "absolute",
//                     top: pos.top,
//                     left: pos.left,
//                     width: pos.width,
//                     zIndex: 999,
//                   }}
//                   className="bg-background border border-primary/25 rounded-2xl shadow-2xl overflow-hidden"
//                 >
//                   <div className="p-2">
//                     <Calendar
//                       mode="single"
//                       selected={pending}
//                       onSelect={(d) => {
//                         if (!d || isAfter(startOfDay(d), today)) return;
//                         setPending(d);
//                       }}
//                       disabled={(d) => isAfter(startOfDay(d), today)}
//                       initialFocus
//                     />
//                   </div>
//                   <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-primary/10 bg-primary/5">
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 h-9 text-xs border-primary/20"
//                       onClick={() => setOpen(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       type="button"
//                       size="sm"
//                       disabled={!pending}
//                       className="flex-1 h-9 text-xs bg-primary glow-gold font-bold"
//                       onClick={confirm}
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
//                       {pending ? `Confirm ${format(pending, "dd MMM")}` : "Pick a date"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>,
//           document.body
//         )}
//     </div>
//   );
// };

// // ─── Improved Service Dropdown (no pricing shown) ───
// const ServiceDropdown = ({
//   value,
//   onChange,
//   error,
//   onServiceSelect,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
//   onServiceSelect?: (service: any) => void;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const selectedService = quickServices.find((s) => s.id === value);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (service: any) => {
//     onChange(service.id);
//     if (onServiceSelect) onServiceSelect(service);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full h-11 px-3 flex items-center justify-between rounded-md border bg-background/60 text-sm transition-colors hover:border-primary/60
//           ${error ? "border-red-500" : "border-primary/20"}
//           ${!value ? "text-muted-foreground" : "text-foreground"}`}
//       >
//         <span className="truncate">
//           {selectedService ? selectedService.title : "Select a Quick Service"}
//         </span>
//         <ChevronDown className={`w-4 h-4 text-primary/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
//       </button>
      
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute z-50 left-0 right-0 mt-2 bg-background border border-primary/20 rounded-xl shadow-2xl max-h-80 overflow-y-auto"
//           >
//             {serviceCategories.map((cat) => {
//               const CategoryIcon = categoryIcons[cat.id] || Star;
//               const catServices = quickServices.filter((s) => s.category === cat.id);
//               if (catServices.length === 0) return null;
//               return (
//                 <div key={cat.id}>
//                   <div className="px-3 py-2 bg-primary/10 border-b border-primary/20">
//                     <div className="flex items-center gap-2">
//                       <CategoryIcon className="w-3.5 h-3.5 text-primary" />
//                       <span className="text-xs font-bold text-primary uppercase tracking-wider">
//                         {cat.emoji} {cat.label}
//                       </span>
//                     </div>
//                   </div>
//                   {catServices.map((service) => (
//                     <button
//                       key={service.id}
//                       onClick={() => handleSelect(service)}
//                       className="w-full px-3 py-2.5 text-left hover:bg-primary/10 transition-colors border-b border-primary/5 last:border-0"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-foreground">{service.title}</p>
//                           <div className="flex items-center gap-2 mt-0.5">
//                             <Clock className="w-3 h-3 text-primary/50" />
//                             <span className="text-[10px] text-muted-foreground">{service.deliveryTime}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               );
//             })}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// export const QuickServiceBookingTab = ({
//   onNext,
// }: {
//   onNext?: (data: QuickServiceFormData) => void;
// }) => {
//   const { toast } = useToast();

//   const [form, setForm] = useState<QuickServiceFormData>({
//     fullName: "",
//     email: "",
//     dob: "",
//     phone: "",
//     serviceId: "",
//     timeOfBirth: "",
//     question: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const selectedService = quickServices.find((s) => s.id === form.serviceId) ?? null;

//   const update = (k: keyof QuickServiceFormData, v: string) => {
//     setForm((p) => ({ ...p, [k]: v }));
//     setErrors((p) => {
//       const n = { ...p };
//       delete n[k];
//       return n;
//     });
//   };

//   const handleServiceChange = (id: string) => {
//     update("serviceId", id);
//     const svc = quickServices.find((s) => s.id === id);
//     if (svc && !svc.requiresDOB) update("dob", "");
//     if (svc && !svc.requiresBirthTime) update("timeOfBirth", "");
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.fullName.trim()) e.fullName = "Full name is required";
//     else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters";

//     if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       e.email = "Invalid email address";

//     if (!form.serviceId) e.serviceId = "Please select a service";

//     if (selectedService?.requiresDOB && !form.dob)
//       e.dob = "Date of birth is required for this service";

//     if (!form.phone) e.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be exactly 10 digits";

//     if (!form.question.trim()) e.question = "Please describe your question";
//     else if (form.question.trim().length < 10)
//       e.question = "At least 10 characters required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => {
//     if (!validate()) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill all required fields before continuing.",
//         variant: "destructive",
//       });
//       return;
//     }
//     onNext?.(form);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.22 }}
//       className="space-y-5"
//     >
//       {/* ── Row 1: Full Name | Email | Date of Birth ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Full Name <span className="text-red-400">*</span>
//           </Label>
//           <Input
//             placeholder="Enter full name"
//             className={`bg-background/60 border-primary/20 h-11 text-sm ${
//               errors.fullName ? "border-red-500" : ""
//             }`}
//             value={form.fullName}
//             onChange={(e) => update("fullName", e.target.value)}
//           />
//           {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName}</p>}
//         </div>

//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Email Address{" "}
//             <span className="text-muted-foreground font-normal">(optional)</span>
//           </Label>
//           <Input
//             type="email"
//             placeholder="email@example.com"
//             className={`bg-background/60 border-primary/20 h-11 text-sm ${
//               errors.email ? "border-red-500" : ""
//             }`}
//             value={form.email}
//             onChange={(e) => update("email", e.target.value)}
//           />
//           {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
//         </div>

//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Date of Birth{" "}
//             {selectedService?.requiresDOB ? (
//               <span className="text-red-400">*</span>
//             ) : (
//               <span className="text-muted-foreground font-normal">(if required)</span>
//             )}
//           </Label>
//           <DobPicker
//             value={form.dob}
//             onChange={(v) => update("dob", v)}
//             error={errors.dob}
//           />
//         </div>
//       </div>

//       {/* ── Row 2: Mobile | Service ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Mobile Number <span className="text-red-400">*</span>
//           </Label>
//           <div className="flex">
//             <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs shrink-0">
//               +91
//             </span>
//             <Input
//               placeholder="10-digit number"
//               maxLength={10}
//               className={`bg-background/60 border-primary/20 h-11 text-sm rounded-l-none ${
//                 errors.phone ? "border-red-500" : ""
//               }`}
//               value={form.phone}
//               onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
//             />
//           </div>
//           {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
//         </div>

//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Quick Service <span className="text-red-400">*</span>
//           </Label>
//           <ServiceDropdown
//             value={form.serviceId}
//             onChange={handleServiceChange}
//             error={errors.serviceId}
//           />
//         </div>
//       </div>

//       {/* ── Row 3: Time of Birth (conditional) | Question ── */}
//       <div
//         className={`grid gap-4 ${
//           selectedService?.requiresBirthTime
//             ? "grid-cols-1 sm:grid-cols-[1fr_2fr]"
//             : "grid-cols-1"
//         }`}
//       >
//         {selectedService?.requiresBirthTime && (
//           <div className="space-y-1.5">
//             <Label className="text-primary font-medium text-xs">
//               Time of Birth{" "}
//               <span className="text-muted-foreground font-normal">(if known)</span>
//             </Label>
//             <Input
//               placeholder="e.g. 10:30 AM"
//               className="bg-background/60 border-primary/20 h-11 text-sm"
//               value={form.timeOfBirth}
//               onChange={(e) => update("timeOfBirth", e.target.value)}
//             />
//           </div>
//         )}

//         <div className="space-y-1.5">
//           <Label className="text-primary font-medium text-xs">
//             Your Question <span className="text-red-400">*</span>
//           </Label>
//           <Textarea
//             placeholder="Describe your question or what you need guidance on…"
//             rows={3}
//             className={`bg-background/60 border-primary/20 resize-none text-sm ${
//               errors.question ? "border-red-500" : ""
//             }`}
//             value={form.question}
//             onChange={(e) => update("question", e.target.value)}
//           />
//           {errors.question && <p className="text-red-500 text-[10px]">{errors.question}</p>}
//         </div>
//       </div>

//       {/* ── Selected Service Summary (shows price after selection) ── */}
//       <AnimatePresence>
//         {selectedService && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden"
//           >
//             <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-2xl">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
//                   <selectedService.icon className="w-4 h-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-foreground leading-snug">
//                     {selectedService.title}
//                   </p>
//                   <div className="flex items-center gap-1 mt-0.5">
//                     <Clock className="w-3 h-3 text-primary/60" />
//                     <span className="text-[10px] text-muted-foreground">
//                       Delivered in {selectedService.deliveryTime} via WhatsApp
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xl font-bold text-gradient-gold font-serif shrink-0 ml-4">
//                 ₹{selectedService.price.toLocaleString("en-IN")}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── CTA ── */}
//       <div className="flex items-center justify-between gap-4 pt-1">
//         <p className="text-[10px] text-muted-foreground flex items-center gap-1">
//           <Info className="w-3 h-3 shrink-0" />
//           Secure payment · Delivered on WhatsApp
//         </p>

//         <Button
//           type="button"
//           onClick={handleNext}
//           className="h-12 px-8 text-sm bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg shrink-0 flex items-center gap-2"
//         >
//           <Zap className="w-4 h-4" />
//           {selectedService
//             ? `Get Answer · ₹${selectedService.price.toLocaleString("en-IN")}`
//             : "Next Step →"}
//         </Button>
//       </div>
//     </motion.div>
//   );
// };

// export interface QuickServiceFormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   phone: string;
//   serviceId: string;
//   timeOfBirth: string;
//   question: string;
// }

// export default QuickServiceBookingTab;



//testing 2

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CalendarIcon,
//   ChevronDown,
//   X,
//   CheckCircle2,
//   Zap,
//   Clock,
//   Info,
//   Sparkles,
// } from "lucide-react";
// import { createPortal } from "react-dom";
// import { format, startOfDay, isAfter } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { quickServices, serviceCategories } from "@/data/quickServices";

// // ── Category accent config ──────────────────────────────────────────────────
// // Each category gets a gold-toned accent that still reads as part of the
// // site's dark/gold palette while being subtly distinct.
// const categoryConfig: Record<
//   string,
//   { border: string; bg: string; label: string; dot: string }
// > = {
//   "love-relationships": {
//     border: "border-rose-400/40",
//     bg: "bg-rose-900/20",
//     label: "text-rose-300",
//     dot: "bg-rose-400",
//   },
//   "career-money": {
//     border: "border-emerald-400/40",
//     bg: "bg-emerald-900/20",
//     label: "text-emerald-300",
//     dot: "bg-emerald-400",
//   },
//   "instant-decisions": {
//     border: "border-amber-400/40",
//     bg: "bg-amber-900/20",
//     label: "text-amber-300",
//     dot: "bg-amber-400",
//   },
//   "personal-insights": {
//     border: "border-violet-400/40",
//     bg: "bg-violet-900/20",
//     label: "text-violet-300",
//     dot: "bg-violet-400",
//   },
// };

// // ── Shared input class (dark/gold theme) ────────────────────────────────────
// const inputCls = (hasError?: boolean) =>
//   [
//     "w-full h-11 px-3 rounded-lg border text-sm transition-all duration-200",
//     "bg-white/5 text-foreground placeholder:text-white/30",
//     "focus:outline-none focus:ring-1 focus:ring-primary/60",
//     hasError
//       ? "border-red-500/70 focus:border-red-500"
//       : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
//   ].join(" ");

// // ── DOB Picker ───────────────────────────────────────────────────────────────
// const DobPicker = ({
//   value,
//   onChange,
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) => {
//   const today = startOfDay(new Date());
//   const [open, setOpen] = useState(false);
//   const [pending, setPending] = useState<Date | undefined>(
//     value ? new Date(value) : undefined
//   );
//   const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
//   const triggerRef = useRef<HTMLButtonElement>(null);

//   const openCal = () => {
//     if (triggerRef.current) {
//       const r = triggerRef.current.getBoundingClientRect();
//       const calH = 380;
//       const below = window.innerHeight - r.bottom;
//       const top =
//         below >= calH
//           ? r.bottom + window.scrollY + 4
//           : r.top + window.scrollY - calH - 4;
//       const w = Math.min(320, window.innerWidth - 32);
//       const left = Math.min(
//         r.left + window.scrollX,
//         window.innerWidth + window.scrollX - w - 8
//       );
//       setPos({ top, left, width: w });
//     }
//     setOpen(true);
//   };

//   useEffect(() => {
//     if (!open) return;
//     const handleClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest("[data-dob-picker]")) return;
//       if (triggerRef.current?.contains(target)) return;
//       setOpen(false);
//       setPending(value ? new Date(value) : undefined);
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [open, value]);

//   const confirm = () => {
//     if (!pending) return;
//     onChange(format(pending, "yyyy-MM-dd"));
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         ref={triggerRef}
//         type="button"
//         onClick={openCal}
//         className={[
//           "w-full h-11 px-3 flex items-center justify-between rounded-lg border",
//           "bg-white/5 text-sm transition-all duration-200",
//           "focus:outline-none focus:ring-1 focus:ring-primary/60",
//           error
//             ? "border-red-500/70"
//             : "border-primary/25 hover:border-primary/50",
//         ].join(" ")}
//       >
//         <span className={value ? "text-foreground" : "text-white/30"}>
//           {value
//             ? format(new Date(value), "dd MMM yyyy")
//             : "Select date of birth"}
//         </span>
//         <div className="flex items-center gap-1.5 shrink-0">
//           {value && (
//             <span
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange("");
//                 setPending(undefined);
//               }}
//               className="text-white/30 hover:text-red-400 transition-colors"
//             >
//               <X className="w-3.5 h-3.5" />
//             </span>
//           )}
//           <CalendarIcon className="w-4 h-4 text-primary/60" />
//         </div>
//       </button>
//       {error && (
//         <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
//           <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
//           {error}
//         </p>
//       )}

//       {typeof document !== "undefined" &&
//         createPortal(
//           <AnimatePresence>
//             {open && (
//               <>
//                 <div
//                   className="fixed inset-0 z-[998] bg-black/40"
//                   onClick={() => setOpen(false)}
//                 />
//                 <motion.div
//                   data-dob-picker
//                   initial={{ opacity: 0, y: -8, scale: 0.97 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -8, scale: 0.97 }}
//                   transition={{ duration: 0.18 }}
//                   style={{
//                     position: "absolute",
//                     top: pos.top,
//                     left: pos.left,
//                     width: pos.width,
//                     zIndex: 999,
//                   }}
//                   className="bg-[#1a1535] border border-primary/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
//                 >
//                   <div className="p-3">
//                     <Calendar
//                       mode="single"
//                       selected={pending}
//                       onSelect={(d) => {
//                         if (!d || isAfter(startOfDay(d), today)) return;
//                         setPending(d);
//                       }}
//                       disabled={(d) => isAfter(startOfDay(d), today)}
//                       initialFocus
//                     />
//                   </div>
//                   <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-primary/15 bg-primary/5">
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 h-9 text-xs border-primary/25 text-white/60 hover:text-white hover:border-primary/50"
//                       onClick={() => setOpen(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       type="button"
//                       size="sm"
//                       disabled={!pending}
//                       className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 font-bold text-black"
//                       onClick={confirm}
//                     >
//                       <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
//                       {pending
//                         ? `Confirm ${format(pending, "dd MMM")}`
//                         : "Pick a date"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>,
//           document.body
//         )}
//     </div>
//   );
// };

// // ── Service Dropdown ─────────────────────────────────────────────────────────
// const ServiceDropdown = ({
//   value,
//   onChange,
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   error?: string;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const selectedService = quickServices.find((s) => s.id === value);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       )
//         setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (service: any) => {
//     onChange(service.id);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Trigger */}
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={[
//           "w-full h-11 px-3.5 flex items-center justify-between rounded-lg border",
//           "bg-white/5 text-sm transition-all duration-200",
//           "focus:outline-none focus:ring-1 focus:ring-primary/60",
//           isOpen
//             ? "border-primary/60 ring-1 ring-primary/30"
//             : error
//             ? "border-red-500/70"
//             : "border-primary/25 hover:border-primary/50",
//         ].join(" ")}
//       >
//         <div className="flex items-center gap-2 min-w-0">
//           {selectedService ? (
//             <>
//               {/* Gold star accent for selected service */}
//               <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
//               <span className="text-foreground truncate font-medium">
//                 {selectedService.title}
//               </span>
//             </>
//           ) : (
//             <span className="text-white/30">Select a Quick Service</span>
//           )}
//         </div>
//         <ChevronDown
//           className={[
//             "w-4 h-4 shrink-0 ml-2 transition-all duration-300",
//             isOpen ? "rotate-180 text-primary" : "text-primary/50",
//           ].join(" ")}
//         />
//       </button>

//       {/* Selected service price pill */}
//       {selectedService && !isOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center"
//         >
//           <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/25 rounded-full px-2 py-0.5">
//             ₹{selectedService.price.toLocaleString("en-IN")}
//           </span>
//         </motion.div>
//       )}

//       {/* Dropdown panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
//             animate={{ opacity: 1, y: 0, scaleY: 1 }}
//             exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
//             transition={{ duration: 0.18, ease: "easeOut" }}
//             style={{ transformOrigin: "top" }}
//             className={[
//               "absolute z-50 left-0 right-0 mt-2 rounded-xl overflow-hidden",
//               "border border-primary/30",
//               "bg-[#120f2a] backdrop-blur-xl",
//               "shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,175,55,0.08)]",
//               "max-h-72 overflow-y-auto",
//               // Custom scrollbar
//               "[&::-webkit-scrollbar]:w-1",
//               "[&::-webkit-scrollbar-track]:bg-white/5",
//               "[&::-webkit-scrollbar-thumb]:bg-primary/40",
//               "[&::-webkit-scrollbar-thumb]:rounded-full",
//             ].join(" ")}
//           >
//             {/* Decorative top shimmer */}
//             <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

//             {serviceCategories.map((cat, catIdx) => {
//               const catServices = quickServices.filter(
//                 (s) => s.category === cat.id
//               );
//               if (catServices.length === 0) return null;
//               const cfg = categoryConfig[cat.id] ?? {
//                 border: "border-primary/30",
//                 bg: "bg-primary/10",
//                 label: "text-primary/80",
//                 dot: "bg-primary",
//               };

//               return (
//                 <div key={cat.id}>
//                   {/* Category header */}
//                   <div
//                     className={[
//                       "px-3.5 py-2 flex items-center gap-2",
//                       "border-b",
//                       cfg.border,
//                       cfg.bg,
//                     ].join(" ")}
//                   >
//                     <span className="text-base leading-none">{cat.emoji}</span>
//                     <span
//                       className={[
//                         "text-[10px] font-bold uppercase tracking-[0.12em]",
//                         cfg.label,
//                       ].join(" ")}
//                     >
//                       {cat.label}
//                     </span>
//                     <div
//                       className={[
//                         "ml-auto w-1.5 h-1.5 rounded-full opacity-70",
//                         cfg.dot,
//                       ].join(" ")}
//                     />
//                   </div>

//                   {/* Services in this category */}
//                   {catServices.map((service, svcIdx) => {
//                     const isSelected = service.id === value;
//                     const isLast =
//                       svcIdx === catServices.length - 1 &&
//                       catIdx === serviceCategories.length - 1;

//                     return (
//                       <button
//                         key={service.id}
//                         onClick={() => handleSelect(service)}
//                         className={[
//                           "w-full px-3.5 py-2.5 text-left transition-all duration-150 group",
//                           "border-b border-white/5 last:border-0",
//                           isSelected
//                             ? "bg-primary/15 border-l-2 border-l-primary pl-3"
//                             : "hover:bg-white/5 border-l-2 border-l-transparent",
//                         ].join(" ")}
//                       >
//                         <div className="flex items-center justify-between gap-3">
//                           <div className="flex-1 min-w-0">
//                             <p
//                               className={[
//                                 "text-sm font-medium truncate transition-colors duration-150",
//                                 isSelected
//                                   ? "text-primary"
//                                   : "text-white/80 group-hover:text-white",
//                               ].join(" ")}
//                             >
//                               {service.title}
//                             </p>
//                             <div className="flex items-center gap-1.5 mt-0.5">
//                               <Clock className="w-2.5 h-2.5 text-primary/40" />
//                               <span className="text-[10px] text-white/35">
//                                 {service.deliveryTime}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-2 shrink-0">
//                             <span
//                               className={[
//                                 "text-xs font-bold transition-colors duration-150",
//                                 isSelected
//                                   ? "text-primary"
//                                   : "text-primary/60 group-hover:text-primary/90",
//                               ].join(" ")}
//                             >
//                               ₹{service.price.toLocaleString("en-IN")}
//                             </span>
//                             {isSelected && (
//                               <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               );
//             })}

//             {/* Decorative bottom shimmer */}
//             <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {error && (
//         <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
//           <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ── Field label helper ───────────────────────────────────────────────────────
// const FieldLabel = ({
//   children,
//   required,
//   optional,
// }: {
//   children: React.ReactNode;
//   required?: boolean;
//   optional?: string;
// }) => (
//   <Label className="text-primary/90 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
//     {children}
//     {required && <span className="text-red-400 normal-case tracking-normal text-xs">*</span>}
//     {optional && (
//       <span className="text-white/35 font-normal normal-case tracking-normal text-[10px]">
//         ({optional})
//       </span>
//     )}
//   </Label>
// );

// // ── Error message helper ─────────────────────────────────────────────────────
// const FieldError = ({ msg }: { msg?: string }) =>
//   msg ? (
//     <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
//       <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
//       {msg}
//     </p>
//   ) : null;

// // ── Main component ───────────────────────────────────────────────────────────
// export const QuickServiceBookingTab = ({
//   onNext,
// }: {
//   onNext?: (data: QuickServiceFormData) => void;
// }) => {
//   const { toast } = useToast();
//   const [form, setForm] = useState<QuickServiceFormData>({
//     fullName: "",
//     email: "",
//     dob: "",
//     phone: "",
//     serviceId: "",
//     timeOfBirth: "",
//     question: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const selectedService =
//     quickServices.find((s) => s.id === form.serviceId) ?? null;

//   const update = (k: keyof QuickServiceFormData, v: string) => {
//     setForm((p) => ({ ...p, [k]: v }));
//     setErrors((p) => {
//       const n = { ...p };
//       delete n[k];
//       return n;
//     });
//   };

//   const handleServiceChange = (id: string) => {
//     update("serviceId", id);
//     const svc = quickServices.find((s) => s.id === id);
//     if (svc && !svc.requiresDOB) update("dob", "");
//     if (svc && !svc.requiresBirthTime) update("timeOfBirth", "");
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.fullName.trim()) e.fullName = "Full name is required";
//     else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters";
//     if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       e.email = "Invalid email address";
//     if (!form.serviceId) e.serviceId = "Please select a service";
//     if (selectedService?.requiresDOB && !form.dob)
//       e.dob = "Date of birth is required for this service";
//     if (!form.phone) e.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be exactly 10 digits";
//     if (!form.question.trim()) e.question = "Please describe your question";
//     else if (form.question.trim().length < 10)
//       e.question = "Please provide at least 10 characters";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => {
//     if (!validate()) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }
//     onNext?.(form);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.22 }}
//       className="space-y-5"
//     >
//       {/* Row 1 — Name / Email / DOB */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="space-y-1.5">
//           <FieldLabel required>Full Name</FieldLabel>
//           <input
//             placeholder="Enter your full name"
//             className={inputCls(!!errors.fullName)}
//             value={form.fullName}
//             onChange={(e) => update("fullName", e.target.value)}
//           />
//           <FieldError msg={errors.fullName} />
//         </div>

//         <div className="space-y-1.5">
//           <FieldLabel optional="optional">Email Address</FieldLabel>
//           <input
//             type="email"
//             placeholder="email@example.com"
//             className={inputCls(!!errors.email)}
//             value={form.email}
//             onChange={(e) => update("email", e.target.value)}
//           />
//           <FieldError msg={errors.email} />
//         </div>

//         <div className="space-y-1.5">
//           <FieldLabel
//             required={selectedService?.requiresDOB}
//             optional={!selectedService?.requiresDOB ? "if required" : undefined}
//           >
//             Date of Birth
//           </FieldLabel>
//           <DobPicker
//             value={form.dob}
//             onChange={(v) => update("dob", v)}
//             error={errors.dob}
//           />
//         </div>
//       </div>

//       {/* Row 2 — Phone / Service */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <FieldLabel required>Mobile Number</FieldLabel>
//           <div className="flex">
//             <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/25 rounded-l-lg text-primary font-bold text-xs tracking-wide">
//               +91
//             </span>
//             <input
//               placeholder="10-digit number"
//               maxLength={10}
//               className={[
//                 inputCls(!!errors.phone),
//                 "rounded-l-none border-l-0",
//               ].join(" ")}
//               value={form.phone}
//               onChange={(e) =>
//                 update("phone", e.target.value.replace(/\D/g, ""))
//               }
//             />
//           </div>
//           <FieldError msg={errors.phone} />
//         </div>

//         <div className="space-y-1.5">
//           <FieldLabel required>Quick Service</FieldLabel>
//           <ServiceDropdown
//             value={form.serviceId}
//             onChange={handleServiceChange}
//             error={errors.serviceId}
//           />
//         </div>
//       </div>

//       {/* Row 3 — Time of Birth (conditional) + Question */}
//       <div
//         className={`grid gap-4 ${
//           selectedService?.requiresBirthTime
//             ? "grid-cols-1 sm:grid-cols-[1fr_2fr]"
//             : "grid-cols-1"
//         }`}
//       >
//         {selectedService?.requiresBirthTime && (
//           <div className="space-y-1.5">
//             <FieldLabel optional="if known">Time of Birth</FieldLabel>
//             <input
//               placeholder="e.g. 10:30 AM"
//               className={inputCls()}
//               value={form.timeOfBirth}
//               onChange={(e) => update("timeOfBirth", e.target.value)}
//             />
//           </div>
//         )}

//         <div className="space-y-1.5">
//           <FieldLabel required>Your Question</FieldLabel>
//           <Textarea
//             placeholder="Describe your question or what guidance you seek…"
//             rows={3}
//             className={[
//               "w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 resize-none",
//               "bg-white/5 text-foreground placeholder:text-white/30",
//               "focus:outline-none focus:ring-1 focus:ring-primary/60",
//               errors.question
//                 ? "border-red-500/70 focus:border-red-500"
//                 : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
//             ].join(" ")}
//             value={form.question}
//             onChange={(e) => update("question", e.target.value)}
//           />
//           <FieldError msg={errors.question} />
//         </div>
//       </div>

//       {/* Selected service summary card */}
//       <AnimatePresence>
//         {selectedService && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden"
//           >
//             <div
//               className={[
//                 "flex items-center justify-between p-4 rounded-xl",
//                 "bg-gradient-to-r from-primary/12 via-primary/8 to-primary/5",
//                 "border border-primary/30",
//                 "shadow-[0_0_20px_rgba(212,175,55,0.06)]",
//               ].join(" ")}
//             >
//               {/* Left — icon + info */}
//               <div className="flex items-center gap-3">
//                 <div
//                   className={[
//                     "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
//                     "bg-primary/15 border border-primary/30",
//                     "shadow-[0_0_12px_rgba(212,175,55,0.15)]",
//                   ].join(" ")}
//                 >
//                   <selectedService.icon className="w-5 h-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-white leading-snug">
//                     {selectedService.title}
//                   </p>
//                   <div className="flex items-center gap-1 mt-0.5">
//                     <Clock className="w-3 h-3 text-primary/50" />
//                     <span className="text-[10px] text-white/45">
//                       Delivered in {selectedService.deliveryTime} · via WhatsApp
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right — price */}
//               <div className="text-right shrink-0 ml-4">
//                 <p className="text-[10px] text-white/35 mb-0.5">Total</p>
//                 <p className="text-xl font-bold text-primary leading-none">
//                   ₹{selectedService.price.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Footer row — trust note + CTA */}
//       <div className="flex items-center justify-between gap-4 pt-1">
//         <p className="text-[10px] text-white/35 flex items-center gap-1.5">
//           <Info className="w-3 h-3 text-primary/40 shrink-0" />
//           Secure payment · Delivered on WhatsApp
//         </p>

//         <button
//           onClick={handleNext}
//           className={[
//             "relative h-11 px-6 rounded-lg text-sm font-bold overflow-hidden",
//             "bg-primary text-black transition-all duration-200",
//             "hover:bg-primary/90 active:scale-[0.98]",
//             "shadow-[0_4px_20px_rgba(212,175,55,0.35)]",
//             "hover:shadow-[0_4px_28px_rgba(212,175,55,0.5)]",
//             "flex items-center gap-2",
//           ].join(" ")}
//         >
//           {/* Shimmer overlay */}
//           <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
//           <Zap className="w-4 h-4 shrink-0" />
//           {selectedService
//             ? `Get Answer · ₹${selectedService.price.toLocaleString("en-IN")}`
//             : "Next Step →"}
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export interface QuickServiceFormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   phone: string;
//   serviceId: string;
//   timeOfBirth: string;
//   question: string;
// }

// export default QuickServiceBookingTab;




//temporary






import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  ChevronDown,
  X,
  CheckCircle2,
  Zap,
  Clock,
  Info,
  Sparkles,
} from "lucide-react";
import { createPortal } from "react-dom";
import { format, startOfDay, isAfter } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { quickServices, serviceCategories } from "@/data/quickServices";

// ── Category accent config ───────────────────────────────────────────────────
const categoryConfig: Record<string, { border: string; bg: string; label: string; dot: string }> = {
  "love-relationships": {
    border: "border-rose-400/40",
    bg: "bg-rose-900/20",
    label: "text-rose-300",
    dot: "bg-rose-400",
  },
  "career-money": {
    border: "border-emerald-400/40",
    bg: "bg-emerald-900/20",
    label: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  "instant-decisions": {
    border: "border-amber-400/40",
    bg: "bg-amber-900/20",
    label: "text-amber-300",
    dot: "bg-amber-400",
  },
  "personal-insights": {
    border: "border-violet-400/40",
    bg: "bg-violet-900/20",
    label: "text-violet-300",
    dot: "bg-violet-400",
  },
};

// ── Shared input class ───────────────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  [
    "w-full h-11 px-3 rounded-lg border text-sm transition-all duration-200",
    "bg-white/5 text-foreground placeholder:text-white/30",
    "focus:outline-none focus:ring-1 focus:ring-primary/60",
    hasError
      ? "border-red-500/70 focus:border-red-500"
      : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
  ].join(" ");

// ── DOB Picker ───────────────────────────────────────────────────────────────
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
  const [pending, setPending] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openCal = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      const calH = 380;
      const below = window.innerHeight - r.bottom;
      const top =
        below >= calH
          ? r.bottom + window.scrollY + 4
          : r.top + window.scrollY - calH - 4;
      const w = Math.min(320, window.innerWidth - 32);
      const left = Math.min(
        r.left + window.scrollX,
        window.innerWidth + window.scrollX - w - 8
      );
      setPos({ top, left, width: w });
    }
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

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={openCal}
        className={[
          "w-full h-11 px-3 flex items-center justify-between rounded-lg border",
          "bg-white/5 text-sm transition-all duration-200",
          "focus:outline-none focus:ring-1 focus:ring-primary/60",
          error
            ? "border-red-500/70"
            : "border-primary/25 hover:border-primary/50",
        ].join(" ")}
      >
        <span className={value ? "text-foreground" : "text-white/30"}>
          {value ? format(new Date(value), "dd MMM yyyy") : "Select date of birth"}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setPending(undefined);
              }}
              className="text-white/30 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <CalendarIcon className="w-4 h-4 text-primary/60" />
        </div>
      </button>
      {error && (
        <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
          {error}
        </p>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <div
                  className="fixed inset-0 z-[998] bg-black/40"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  data-dob-picker
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    zIndex: 999,
                  }}
                  className="bg-[#1a1535] border border-primary/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="p-3">
                    <Calendar
                      mode="single"
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

// ── Service Dropdown ─────────────────────────────────────────────────────────
const ServiceDropdown = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedService = quickServices.find((s) => s.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (service: any) => {
    onChange(service.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={[
          "w-full h-11 px-3.5 flex items-center justify-between rounded-lg border",
          "bg-white/5 text-sm transition-all duration-200",
          "focus:outline-none focus:ring-1 focus:ring-primary/60",
          isOpen
            ? "border-primary/60 ring-1 ring-primary/30"
            : error
            ? "border-red-500/70"
            : "border-primary/25 hover:border-primary/50",
        ].join(" ")}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedService ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-foreground truncate font-medium">
                {selectedService.title}
              </span>
            </>
          ) : (
            <span className="text-white/30">Select a Quick Service</span>
          )}
        </div>
        <ChevronDown
          className={[
            "w-4 h-4 shrink-0 ml-2 transition-all duration-300",
            isOpen ? "rotate-180 text-primary" : "text-primary/50",
          ].join(" ")}
        />
      </button>

      {/* Selected service price pill */}
      {selectedService && !isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center"
        >
          <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/25 rounded-full px-2 py-0.5">
            ₹{selectedService.price.toLocaleString("en-IN")}
          </span>
        </motion.div>
      )}

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className={[
              "absolute z-50 left-0 right-0 mt-2 rounded-xl overflow-hidden",
              "border border-primary/30",
              "bg-[#120f2a] backdrop-blur-xl",
              "shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,175,55,0.08)]",
              "max-h-72 overflow-y-auto",
              "[&::-webkit-scrollbar]:w-1",
              "[&::-webkit-scrollbar-track]:bg-white/5",
              "[&::-webkit-scrollbar-thumb]:bg-primary/40",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
            ].join(" ")}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {serviceCategories.map((cat) => {
              const catServices = quickServices.filter((s) => s.category === cat.id);
              if (catServices.length === 0) return null;
              const cfg = categoryConfig[cat.id] ?? {
                border: "border-primary/30",
                bg: "bg-primary/10",
                label: "text-primary/80",
                dot: "bg-primary",
              };

              return (
                <div key={cat.id}>
                  {/* Category header */}
                  <div
                    className={[
                      "px-3.5 py-2 flex items-center gap-2 border-b",
                      cfg.border,
                      cfg.bg,
                    ].join(" ")}
                  >
                    <span className="text-base leading-none">{cat.emoji}</span>
                    <span className={["text-[10px] font-bold uppercase tracking-[0.12em]", cfg.label].join(" ")}>
                      {cat.label}
                    </span>
                    <div className={["ml-auto w-1.5 h-1.5 rounded-full opacity-70", cfg.dot].join(" ")} />
                  </div>

                  {/* Services */}
                  {catServices.map((service) => {
                    const isSelected = service.id === value;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleSelect(service)}
                        className={[
                          "w-full px-3.5 py-2.5 text-left transition-all duration-150 group",
                          "border-b border-white/5 last:border-0",
                          isSelected
                            ? "bg-primary/15 border-l-2 border-l-primary pl-3"
                            : "hover:bg-white/5 border-l-2 border-l-transparent",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p
                              className={[
                                "text-sm font-medium truncate transition-colors duration-150",
                                isSelected ? "text-primary" : "text-white/80 group-hover:text-white",
                              ].join(" ")}
                            >
                              {service.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-2.5 h-2.5 text-primary/40" />
                              <span className="text-[10px] text-white/35">{service.deliveryTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={[
                                "text-xs font-bold transition-colors duration-150",
                                isSelected ? "text-primary" : "text-primary/60 group-hover:text-primary/90",
                              ].join(" ")}
                            >
                              ₹{service.price.toLocaleString("en-IN")}
                            </span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}

            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
          {error}
        </p>
      )}
    </div>
  );
};

// ── Field label helper ───────────────────────────────────────────────────────
const FieldLabel = ({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: string;
}) => (
  <Label className="text-primary/90 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
    {children}
    {required && <span className="text-red-400 normal-case tracking-normal text-xs">*</span>}
    {optional && (
      <span className="text-white/35 font-normal normal-case tracking-normal text-[10px]">
        ({optional})
      </span>
    )}
  </Label>
);

// ── Error message helper ─────────────────────────────────────────────────────
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
      {msg}
    </p>
  ) : null;

// ── Types ────────────────────────────────────────────────────────────────────
export interface QuickServiceFormData {
  fullName: string;
  email: string;
  dob: string;
  phone: string;
  serviceId: string;
  timeOfBirth: string;
  question: string;
}

// ── Main component ───────────────────────────────────────────────────────────
export const QuickServiceBookingTab = ({
  onNext,
}: {
  onNext?: (data: QuickServiceFormData) => void;
}) => {
  const { toast } = useToast();
  const [form, setForm] = useState<QuickServiceFormData>({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    serviceId: "",
    timeOfBirth: "",
    question: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const selectedService = quickServices.find((s) => s.id === form.serviceId) ?? null;

  const update = (k: keyof QuickServiceFormData, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => {
      const n = { ...p };
      delete n[k];
      return n;
    });
  };

  const handleServiceChange = (id: string) => {
    update("serviceId", id);
    const svc = quickServices.find((s) => s.id === id);
    if (svc && !svc.requiresDOB) update("dob", "");
    if (svc && !svc.requiresBirthTime) update("timeOfBirth", "");
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};

    // Full Name — letters only, 3–60 chars
    const nameTrimmed = form.fullName.trim();
    if (!nameTrimmed) {
      e.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\u00C0-\u024F\s.\-']+$/.test(nameTrimmed)) {
      e.fullName = "Name must contain letters only (no numbers or symbols)";
    } else if (nameTrimmed.length < 3) {
      e.fullName = "Name must be at least 3 characters";
    } else if (nameTrimmed.length > 60) {
      e.fullName = "Name must be 60 characters or fewer";
    }

    // Email — optional, validate format if provided
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    // Service — required
    if (!form.serviceId) {
      e.serviceId = "Please select a service";
    }

    // DOB — required only when service demands it
    if (selectedService?.requiresDOB && !form.dob) {
      e.dob = "Date of birth is required for this service";
    }

    // Phone — required, exactly 10 digits, no all-same pattern
    if (!form.phone) {
      e.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      e.phone = "Enter a valid 10-digit mobile number";
    } else if (/^(\d)\1{9}$/.test(form.phone)) {
      e.phone = "Enter a valid mobile number";
    }

    // Question — required, 10–500 chars
    const questionTrimmed = form.question.trim();
    if (!questionTrimmed) {
      e.question = "Please describe your question";
    } else if (questionTrimmed.length < 10) {
      e.question = "Please provide at least 10 characters";
    } else if (questionTrimmed.length > 500) {
      e.question = "Question must be 500 characters or fewer";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) {
      toast({
        title: "Missing or Invalid Information",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }
    onNext?.(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-5"
    >
      {/* Row 1 — Name / Email / DOB */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <FieldLabel required>Full Name</FieldLabel>
          <input
            placeholder="Enter your full name"
            className={inputCls(!!errors.fullName)}
            value={form.fullName}
            maxLength={60}
            onChange={(e) => {
              // Strip digits and most symbols in real-time
              const filtered = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\s.\-']/g, "");
              update("fullName", filtered);
            }}
          />
          <FieldError msg={errors.fullName} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel optional="optional">Email Address</FieldLabel>
          <input
            type="email"
            placeholder="email@example.com"
            className={inputCls(!!errors.email)}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <FieldError msg={errors.email} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel
            required={selectedService?.requiresDOB}
            optional={!selectedService?.requiresDOB ? "if required" : undefined}
          >
            Date of Birth
          </FieldLabel>
          <DobPicker
            value={form.dob}
            onChange={(v) => update("dob", v)}
            error={errors.dob}
          />
        </div>
      </div>

      {/* Row 2 — Phone / Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel required>Mobile Number</FieldLabel>
          <div className="flex">
            <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/25 rounded-l-lg text-primary font-bold text-xs tracking-wide">
              +91
            </span>
            <input
              placeholder="10-digit number"
              maxLength={10}
              inputMode="numeric"
              className={[inputCls(!!errors.phone), "rounded-l-none border-l-0"].join(" ")}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <FieldError msg={errors.phone} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel required>Quick Service</FieldLabel>
          <ServiceDropdown
            value={form.serviceId}
            onChange={handleServiceChange}
            error={errors.serviceId}
          />
        </div>
      </div>

      {/* Row 3 — Time of Birth (conditional) + Question */}
      <div
        className={`grid gap-4 ${
          selectedService?.requiresBirthTime
            ? "grid-cols-1 sm:grid-cols-[1fr_2fr]"
            : "grid-cols-1"
        }`}
      >
        {selectedService?.requiresBirthTime && (
          <div className="space-y-1.5">
            <FieldLabel optional="if known">Time of Birth</FieldLabel>
            <input
              placeholder="e.g. 10:30 AM"
              className={inputCls()}
              value={form.timeOfBirth}
              onChange={(e) => update("timeOfBirth", e.target.value)}
            />
          </div>
        )}

        <div className="space-y-1.5">
          <FieldLabel required>Your Question</FieldLabel>
          <div className="relative">
            <Textarea
              placeholder="Describe your question or what guidance you seek…"
              rows={3}
              className={[
                "w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 resize-none",
                "bg-white/5 text-foreground placeholder:text-white/30",
                "focus:outline-none focus:ring-1 focus:ring-primary/60",
                errors.question
                  ? "border-red-500/70 focus:border-red-500"
                  : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
              ].join(" ")}
              value={form.question}
              maxLength={500}
              onChange={(e) => update("question", e.target.value)}
            />
            {/* Character counter */}
            <span
              className={[
                "absolute bottom-2 right-3 text-[10px] pointer-events-none",
                form.question.length > 450 ? "text-amber-400/70" : "text-white/20",
              ].join(" ")}
            >
              {form.question.length}/500
            </span>
          </div>
          <FieldError msg={errors.question} />
        </div>
      </div>

      {/* Selected service summary card */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={[
                "flex items-center justify-between p-4 rounded-xl",
                "bg-gradient-to-r from-primary/12 via-primary/8 to-primary/5",
                "border border-primary/30",
                "shadow-[0_0_20px_rgba(212,175,55,0.06)]",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    "bg-primary/15 border border-primary/30",
                    "shadow-[0_0_12px_rgba(212,175,55,0.15)]",
                  ].join(" ")}
                >
                  <selectedService.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {selectedService.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-primary/50" />
                    <span className="text-[10px] text-white/45">
                      Delivered in {selectedService.deliveryTime} · via WhatsApp
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[10px] text-white/35 mb-0.5">Total</p>
                <p className="text-xl font-bold text-primary leading-none">
                  ₹{selectedService.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — trust note + CTA */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-[10px] text-white/35 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-primary/40 shrink-0" />
          Secure payment · Delivered on WhatsApp
        </p>

        <button
          onClick={handleNext}
          className={[
            "relative h-11 px-6 rounded-lg text-sm font-bold overflow-hidden",
            "bg-primary text-black transition-all duration-200",
            "hover:bg-primary/90 active:scale-[0.98]",
            "shadow-[0_4px_20px_rgba(212,175,55,0.35)]",
            "hover:shadow-[0_4px_28px_rgba(212,175,55,0.5)]",
            "flex items-center gap-2",
          ].join(" ")}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
          <Zap className="w-4 h-4 shrink-0" />
          {selectedService
            ? `Get Answer · ₹${selectedService.price.toLocaleString("en-IN")}`
            : "Next Step →"}
        </button>
      </div>
    </motion.div>
  );
};

export default QuickServiceBookingTab;