
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
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { quickServices, serviceCategories } from "@/data/quickServices";

// // ── Category accent config ───────────────────────────────────────────────────
// const categoryConfig: Record<string, { border: string; bg: string; label: string; dot: string }> = {
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

// // ── Shared input class ───────────────────────────────────────────────────────
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
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
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
//               "[&::-webkit-scrollbar]:w-1",
//               "[&::-webkit-scrollbar-track]:bg-white/5",
//               "[&::-webkit-scrollbar-thumb]:bg-primary/40",
//               "[&::-webkit-scrollbar-thumb]:rounded-full",
//             ].join(" ")}
//           >
//             <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

//             {serviceCategories.map((cat) => {
//               const catServices = quickServices.filter((s) => s.category === cat.id);
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
//                       "px-3.5 py-2 flex items-center gap-2 border-b",
//                       cfg.border,
//                       cfg.bg,
//                     ].join(" ")}
//                   >
//                     <span className="text-base leading-none">{cat.emoji}</span>
//                     <span className={["text-[10px] font-bold uppercase tracking-[0.12em]", cfg.label].join(" ")}>
//                       {cat.label}
//                     </span>
//                     <div className={["ml-auto w-1.5 h-1.5 rounded-full opacity-70", cfg.dot].join(" ")} />
//                   </div>

//                   {/* Services */}
//                   {catServices.map((service) => {
//                     const isSelected = service.id === value;
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
//                                 isSelected ? "text-primary" : "text-white/80 group-hover:text-white",
//                               ].join(" ")}
//                             >
//                               {service.title}
//                             </p>
//                             <div className="flex items-center gap-1.5 mt-0.5">
//                               <Clock className="w-2.5 h-2.5 text-primary/40" />
//                               <span className="text-[10px] text-white/35">{service.deliveryTime}</span>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2 shrink-0">
//                             <span
//                               className={[
//                                 "text-xs font-bold transition-colors duration-150",
//                                 isSelected ? "text-primary" : "text-primary/60 group-hover:text-primary/90",
//                               ].join(" ")}
//                             >
//                               ₹{service.price.toLocaleString("en-IN")}
//                             </span>
//                             {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               );
//             })}

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

// // ── Types ────────────────────────────────────────────────────────────────────
// export interface QuickServiceFormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   phone: string;
//   serviceId: string;
//   timeOfBirth: string;
//   question: string;
// }

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

//   // ── Validation ────────────────────────────────────────────────────────────
//   const validate = () => {
//     const e: Record<string, string> = {};

//     // Full Name — letters only, 3–60 chars
//     const nameTrimmed = form.fullName.trim();
//     if (!nameTrimmed) {
//       e.fullName = "Full name is required";
//     } else if (!/^[a-zA-Z\u00C0-\u024F\s.\-']+$/.test(nameTrimmed)) {
//       e.fullName = "Name must contain letters only (no numbers or symbols)";
//     } else if (nameTrimmed.length < 3) {
//       e.fullName = "Name must be at least 3 characters";
//     } else if (nameTrimmed.length > 60) {
//       e.fullName = "Name must be 60 characters or fewer";
//     }

//     // Email — optional, validate format if provided
//     if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       e.email = "Enter a valid email address";
//     }

//     // Service — required
//     if (!form.serviceId) {
//       e.serviceId = "Please select a service";
//     }

//     // DOB — required only when service demands it
//     if (selectedService?.requiresDOB && !form.dob) {
//       e.dob = "Date of birth is required for this service";
//     }

//     // Phone — required, exactly 10 digits, no all-same pattern
//     if (!form.phone) {
//       e.phone = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(form.phone)) {
//       e.phone = "Enter a valid 10-digit mobile number";
//     } else if (/^(\d)\1{9}$/.test(form.phone)) {
//       e.phone = "Enter a valid mobile number";
//     }

//     // Question — required, 10–500 chars
//     const questionTrimmed = form.question.trim();
//     if (!questionTrimmed) {
//       e.question = "Please describe your question";
//     } else if (questionTrimmed.length < 10) {
//       e.question = "Please provide at least 10 characters";
//     } else if (questionTrimmed.length > 500) {
//       e.question = "Question must be 500 characters or fewer";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => {
//     if (!validate()) {
//       toast({
//         title: "Missing or Invalid Information",
//         description: "Please correct the highlighted fields and try again.",
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
//             maxLength={60}
//             onChange={(e) => {
//               // Strip digits and most symbols in real-time
//               const filtered = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\s.\-']/g, "");
//               update("fullName", filtered);
//             }}
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
//               inputMode="numeric"
//               className={[inputCls(!!errors.phone), "rounded-l-none border-l-0"].join(" ")}
//               value={form.phone}
//               onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
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
//           <div className="relative">
//             <Textarea
//               placeholder="Describe your question or what guidance you seek…"
//               rows={3}
//               className={[
//                 "w-full px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 resize-none",
//                 "bg-white/5 text-foreground placeholder:text-white/30",
//                 "focus:outline-none focus:ring-1 focus:ring-primary/60",
//                 errors.question
//                   ? "border-red-500/70 focus:border-red-500"
//                   : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
//               ].join(" ")}
//               value={form.question}
//               maxLength={500}
//               onChange={(e) => update("question", e.target.value)}
//             />
//             {/* Character counter */}
//             <span
//               className={[
//                 "absolute bottom-2 right-3 text-[10px] pointer-events-none",
//                 form.question.length > 450 ? "text-amber-400/70" : "text-white/20",
//               ].join(" ")}
//             >
//               {form.question.length}/500
//             </span>
//           </div>
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

//       {/* Footer — trust note + CTA */}
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

// export default QuickServiceBookingTab;


//testing (2-5-2026)


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
  MapPin,
} from "lucide-react";
import { createPortal } from "react-dom";
import { format, startOfDay, isAfter } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { quickServices, serviceCategories } from "@/data/quickServices";

// ── Category accent config ────────────────────────────────────────────────────
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

// ── Shared input class ────────────────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  [
    "w-full h-11 px-3 rounded-lg border text-sm transition-all duration-200",
    "bg-white/5 text-foreground placeholder:text-white/30",
    "focus:outline-none focus:ring-1 focus:ring-primary/60",
    hasError
      ? "border-red-500/70 focus:border-red-500"
      : "border-primary/25 hover:border-primary/50 focus:border-primary/60",
  ].join(" ");

// ── DOB Picker ────────────────────────────────────────────────────────────────
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

// ── Service Dropdown ──────────────────────────────────────────────────────────
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

  const handleSelect = (service: (typeof quickServices)[0]) => {
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

      {/* Price pill when closed */}
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

                  {/* Services in category */}
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

// ── Field label helper ────────────────────────────────────────────────────────
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

// ── Error message helper ──────────────────────────────────────────────────────
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
      <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
      {msg}
    </p>
  ) : null;

// ── Types ─────────────────────────────────────────────────────────────────────
// ✅ FIX 1 DONE: placeOfBirth added to type so parent receives it via onNext
export interface QuickServiceFormData {
  fullName:     string;
  email:        string;
  dob:          string;
  phone:        string;
  serviceId:    string;
  timeOfBirth:  string;
  placeOfBirth: string; // ← NEW
  question:     string;
}

// ── Main component ────────────────────────────────────────────────────────────
export const QuickServiceBookingTab = ({
  onNext,
}: {
  onNext?: (data: QuickServiceFormData) => void;
}) => {
  const { toast }  = useToast();
  const navigate   = useNavigate(); // ✅ FIX 2 & 3: for redirect on Get Answer

  // ✅ FIX 1 DONE: placeOfBirth added to form state
  const [form, setForm] = useState<QuickServiceFormData>({
    fullName:     "",
    email:        "",
    dob:          "",
    phone:        "",
    serviceId:    "",
    timeOfBirth:  "",
    placeOfBirth: "", // ← NEW
    question:     "",
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
    // Clear DOB/TOB only if previous service required them and new one doesn't
    const svc = quickServices.find((s) => s.id === id);
    if (svc && !svc.requiresDOB) update("dob", "");
    if (svc && !svc.requiresBirthTime) update("timeOfBirth", "");
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};

    // Full Name
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

    // Email (optional)
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    // Service
    if (!form.serviceId) {
      e.serviceId = "Please select a service";
    }

    // DOB — required only when service demands it
    if (selectedService?.requiresDOB && !form.dob) {
      e.dob = "Date of birth is required for this service";
    }

    // Phone
    if (!form.phone) {
      e.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      e.phone = "Enter a valid 10-digit mobile number";
    } else if (/^(\d)\1{9}$/.test(form.phone)) {
      e.phone = "Enter a valid mobile number";
    }

    // ✅ FIX 1 DONE: Place of Birth — always required
    if (!form.placeOfBirth.trim()) {
      e.placeOfBirth = "Place of birth is required";
    }

    // Question
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

  // ✅ FIX 2 & 3 DONE: redirect to correct service page on Get Answer
  const handleNext = () => {
    if (!validate()) {
      toast({
        title: "Missing or Invalid Information",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    if (onNext) {
      // Parent component handles navigation (e.g. multi-step flow)
      onNext(form);
    } else if (selectedService) {
      // Direct redirect to the service's dedicated page
      // Pass prefill data via location state so the detail page can pre-fill the form
      navigate(`/quick-services/${selectedService.slug}`, {
        state: { prefill: form },
      });
    }
  };

  // ── Shared props for form rows (re-enable selection/paste inside inputs) ──
  const formRowProps = {
    style: { userSelect: "text" as const, WebkitUserSelect: "text" as const },
    onCopy:  (e: React.ClipboardEvent) => e.stopPropagation(),
    onCut:   (e: React.ClipboardEvent) => e.stopPropagation(),
    onPaste: (e: React.ClipboardEvent) => e.stopPropagation(),
  };

  return (
    // ✅ FIX 4 DONE: copy-paste disabled on outer wrapper
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-5"
      onCopy={(e)  => e.preventDefault()}
      onCut={(e)   => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >

      {/* ── Row 1: Name / Email / DOB ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" {...formRowProps}>
        {/* Full Name */}
        <div className="space-y-1.5">
          <FieldLabel required>Full Name</FieldLabel>
          <input
            placeholder="Enter your full name"
            className={inputCls(!!errors.fullName)}
            value={form.fullName}
            maxLength={60}
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\s.\-']/g, "");
              update("fullName", filtered);
            }}
          />
          <FieldError msg={errors.fullName} />
        </div>

        {/* Email */}
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

        {/* DOB */}
        <div className="space-y-1.5">
          <FieldLabel
            required={!!selectedService?.requiresDOB}
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

      {/* ── Row 2: Phone / Service ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" {...formRowProps}>
        {/* Phone */}
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

        {/* Service */}
        <div className="space-y-1.5">
          <FieldLabel required>Quick Service</FieldLabel>
          <ServiceDropdown
            value={form.serviceId}
            onChange={handleServiceChange}
            error={errors.serviceId}
          />
        </div>
      </div>

      {/* ── Row 3: Place of Birth / Time of Birth ─────────────── */}
      {/* ✅ FIX 1 DONE: POB always visible + required. TOB always visible (optional). */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" {...formRowProps}>
        {/* Place of Birth */}
        <div className="space-y-1.5">
          <FieldLabel required>
            <MapPin className="w-3 h-3 mr-0.5" />
            Place of Birth
          </FieldLabel>
          <input
            placeholder="City, State (e.g. Mumbai, Maharashtra)"
            className={inputCls(!!errors.placeOfBirth)}
            value={form.placeOfBirth}
            maxLength={100}
            onChange={(e) => update("placeOfBirth", e.target.value)}
          />
          <FieldError msg={errors.placeOfBirth} />
        </div>

        {/* Time of Birth — always visible, optional */}
        <div className="space-y-1.5">
          <FieldLabel optional="if known">Time of Birth</FieldLabel>
          <input
            placeholder="e.g. 10:30 AM"
            className={inputCls()}
            value={form.timeOfBirth}
            onChange={(e) => update("timeOfBirth", e.target.value)}
          />
        </div>
      </div>

      {/* ── Row 4: Question ───────────────────────────────────── */}
      <div className="space-y-1.5" {...formRowProps}>
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

      {/* ── Selected service summary card ─────────────────────── */}
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
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={[
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    "bg-primary/15 border border-primary/30",
                    "shadow-[0_0_12px_rgba(212,175,55,0.15)]",
                  ].join(" ")}
                >
                  <selectedService.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white leading-snug truncate">
                    {selectedService.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-primary/50 shrink-0" />
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

      {/* ── Footer: trust note + CTA ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <p className="text-[10px] text-white/35 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-primary/40 shrink-0" />
          Secure payment · Delivered on WhatsApp
        </p>

        {/* ✅ FIX 2 & 3 DONE: redirects to /quick-services/:slug on valid submit */}
        <button
          onClick={handleNext}
          className={[
            "relative h-11 px-6 rounded-lg text-sm font-bold overflow-hidden",
            "bg-primary text-black transition-all duration-200",
            "hover:bg-primary/90 active:scale-[0.98]",
            "shadow-[0_4px_20px_rgba(212,175,55,0.35)]",
            "hover:shadow-[0_4px_28px_rgba(212,175,55,0.5)]",
            "flex items-center gap-2 w-full sm:w-auto justify-center",
          ].join(" ")}
        >
          <Zap className="w-4 h-4 shrink-0" />
          {selectedService
            ? `Get Answer · ₹${selectedService.price.toLocaleString("en-IN")}`
            : "Get Answer →"}
        </button>
      </div>

    </motion.div>
  );
};

export default QuickServiceBookingTab;