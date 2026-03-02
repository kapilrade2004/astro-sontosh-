// import { Helmet } from "react-helmet-async";
// import { motion, AnimatePresence } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { useState, useRef, useEffect, useCallback } from "react";

// // ─── Types ───────────────────────────────────────────────────────────────────

// type Service = "Astrology" | "Numerology" | "Vastu" | "Palmistry";

// type Step =
//   | "welcome"
//   | "selectService"
//   | "enterMobile"
//   | "enterDOB"
//   | "enterTOB"
//   | "enterPOB"
//   | "enterDimensions"
//   | "selectDateTime"
//   | "palmistryInfo"
//   | "summary";

// interface FormData {
//   mobile: string;
//   dob: string;
//   tob: string;
//   pob: string;
//   length: string;
//   width: string;
//   consultDate: string;
//   consultTime: string;
// }

// // ─── Bot Bubble ───────────────────────────────────────────────────────────────

// const BotBubble = ({ text, delay = 0 }: { text: string; delay?: number }) => (
//   <motion.div
//     initial={{ opacity: 0, x: -16, scale: 0.95 }}
//     animate={{ opacity: 1, x: 0, scale: 1 }}
//     transition={{ duration: 0.32, delay, ease: "easeOut" }}
//     className="flex items-end gap-2 mb-3"
//   >
//     <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mb-1 shadow-lg shadow-amber-900/30">
//       🔮
//     </div>
//     <div
//       className="max-w-[88%] md:max-w-[82%] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl rounded-bl-sm text-xs md:text-sm leading-relaxed shadow-md"
//       style={{
//         background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)/0.8) 100%)",
//         border: "1px solid hsl(var(--border)/0.5)",
//         color: "hsl(var(--card-foreground))",
//       }}
//       dangerouslySetInnerHTML={{ __html: text }}
//     />
//   </motion.div>
// );

// const UserBubble = ({ text }: { text: string }) => (
//   <motion.div
//     initial={{ opacity: 0, x: 16, scale: 0.95 }}
//     animate={{ opacity: 1, x: 0, scale: 1 }}
//     transition={{ duration: 0.28, ease: "easeOut" }}
//     className="flex justify-end mb-3"
//   >
//     <div
//       className="max-w-[75%] md:max-w-[68%] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl rounded-br-sm text-xs md:text-sm font-medium shadow-md"
//       style={{
//         background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(35 80% 45%) 100%)",
//         color: "hsl(var(--primary-foreground))",
//       }}
//     >
//       {text}
//     </div>
//   </motion.div>
// );

// // ─── Service Option Button ────────────────────────────────────────────────────

// const ServiceOption = ({
//   label,
//   emoji,
//   onClick,
//   delay = 0,
// }: {
//   label: string;
//   emoji: string;
//   onClick: () => void;
//   delay?: number;
// }) => (
//   <motion.button
//     initial={{ opacity: 0, y: 8 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.28, delay }}
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.97 }}
//     onClick={onClick}
//     className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border flex items-center gap-3"
//     style={{
//       background: "hsl(var(--card)/0.6)",
//       borderColor: "hsl(var(--border))",
//       color: "hsl(var(--card-foreground))",
//     }}
//     onMouseEnter={(e) => {
//       (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--primary))";
//       (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--primary)/0.1)";
//     }}
//     onMouseLeave={(e) => {
//       (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--border))";
//       (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--card)/0.6)";
//     }}
//   >
//     <span className="text-base md:text-lg">{emoji}</span>
//     {label}
//   </motion.button>
// );

// // ─── Chat Input Field ─────────────────────────────────────────────────────────

// const ChatInput = ({
//   value,
//   onChange,
//   onSubmit,
//   placeholder,
//   type = "text",
//   error,
//   delay = 0,
//   maxLength,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   onSubmit: () => void;
//   placeholder: string;
//   type?: string;
//   error?: string;
//   delay?: number;
//   maxLength?: number;
// }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 8 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay }}
//     className="ml-9 md:ml-10 mt-1 mb-2"
//   >
//     <div className="flex gap-2">
//       <input
//         type={type}
//         value={value}
//         maxLength={maxLength}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && onSubmit()}
//         placeholder={placeholder}
//         // No autoFocus — prevents keyboard pop & scroll on mobile
//         className="flex-1 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm outline-none transition-all"
//         style={{
//           background: "hsl(var(--card))",
//           border: `1px solid ${error ? "hsl(0 72% 51%)" : "hsl(var(--border))"}`,
//           color: "hsl(var(--card-foreground))",
//         }}
//       />
//       <Button
//         size="sm"
//         onClick={onSubmit}
//         className="shrink-0 rounded-xl px-3 md:px-4 text-xs md:text-sm"
//         style={{
//           background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(35 80% 45%) 100%)",
//         }}
//       >
//         ✓
//       </Button>
//     </div>
//     {error && (
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-xs mt-1.5"
//         style={{ color: "hsl(0 72% 51%)" }}
//       >
//         {error}
//       </motion.p>
//     )}
//   </motion.div>
// );

// // ─── Time Slots ───────────────────────────────────────────────────────────────

// const TIME_SLOTS = [
//   "09:00 AM", "10:00 AM", "11:00 AM",
//   "12:00 PM", "02:00 PM", "03:00 PM",
//   "04:00 PM", "05:00 PM", "06:00 PM",
// ];

// // ─── Main InquiryProcess Component ───────────────────────────────────────────

// const InquiryProcess = () => {
//   const [step, setStep] = useState<Step>("welcome");
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [form, setForm] = useState<FormData>({
//     mobile: "", dob: "", tob: "", pob: "",
//     length: "", width: "", consultDate: "", consultTime: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   // Ref to the chat container — we scroll INSIDE it, not the page
//   const chatBodyRef = useRef<HTMLDivElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // Scroll only inside the chat box (no page jump)
//   const scrollToBottom = useCallback(() => {
//     if (bottomRef.current && chatBodyRef.current) {
//       chatBodyRef.current.scrollTo({
//         top: chatBodyRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, []);

//   useEffect(() => {
//     // Small delay so new content renders before we scroll
//     const t = setTimeout(scrollToBottom, 150);
//     return () => clearTimeout(t);
//   }, [step, scrollToBottom]);

//   const setField = (key: keyof FormData, value: string) => {
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((e) => ({ ...e, [key]: "" }));
//   };

//   const validate = (key: keyof FormData, value: string, label: string): boolean => {
//     if (!value.trim()) {
//       setErrors((e) => ({ ...e, [key]: `⚠️ Please enter your ${label}.` }));
//       return false;
//     }
//     if (key === "mobile" && !/^\d{10}$/.test(value.trim())) {
//       setErrors((e) => ({ ...e, mobile: "⚠️ Enter a valid 10-digit mobile number." }));
//       return false;
//     }
//     if (key === "dob" && !/^\d{2}-\d{2}-\d{4}$/.test(value.trim())) {
//       setErrors((e) => ({ ...e, dob: "⚠️ Use format DD-MM-YYYY (e.g. 12-08-1999)." }));
//       return false;
//     }
//     return true;
//   };

//   const handleServiceSelect = (service: Service) => {
//     setSelectedService(service);
//     if (service === "Palmistry") setStep("palmistryInfo");
//     else setStep("enterMobile");
//   };

//   const submitMobile = () => {
//     if (!validate("mobile", form.mobile, "mobile number")) return;
//     setStep("enterDOB");
//   };

//   const submitDOB = () => {
//     if (!validate("dob", form.dob, "date of birth")) return;
//     if (selectedService === "Astrology") setStep("enterTOB");
//     else if (selectedService === "Vastu") setStep("enterDimensions");
//     else setStep("selectDateTime");
//   };

//   const submitTOB = () => {
//     if (!validate("tob", form.tob, "time of birth")) return;
//     setStep("enterPOB");
//   };

//   const submitPOB = () => {
//     if (!validate("pob", form.pob, "place of birth")) return;
//     setStep("selectDateTime");
//   };

//   const submitDimensions = () => {
//     if (!validate("length", form.length, "property length")) return;
//     if (!validate("width", form.width, "property width")) return;
//     setStep("selectDateTime");
//   };

//   const submitDateTime = () => {
//     if (!form.consultDate) {
//       setErrors((e) => ({ ...e, consultDate: "⚠️ Please select a preferred date." }));
//       return;
//     }
//     if (!form.consultTime) {
//       setErrors((e) => ({ ...e, consultTime: "⚠️ Please select a preferred time slot." }));
//       return;
//     }
//     setStep("summary");
//   };

//   const handleReset = () => {
//     setStep("welcome");
//     setSelectedService(null);
//     setForm({ mobile: "", dob: "", tob: "", pob: "", length: "", width: "", consultDate: "", consultTime: "" });
//     setErrors({});
//     // Scroll back to top inside chat
//     setTimeout(() => chatBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 100);
//   };

//   const todayStr = new Date().toISOString().split("T")[0];

//   const serviceEmojis: Record<Service, string> = {
//     Astrology: "🪐", Numerology: "🔢", Vastu: "🏠", Palmistry: "✋",
//   };

//   const pastSteps: Step[] = (() => {
//     const order: Step[] = [
//       "welcome", "selectService", "enterMobile", "enterDOB",
//       "enterTOB", "enterPOB", "enterDimensions", "selectDateTime", "summary",
//     ];
//     return order.slice(0, order.indexOf(step));
//   })();

//   const isPast = (s: Step) => pastSteps.includes(s);

//   const progressSteps: Step[] = ["welcome", "selectService", "enterMobile", "enterDOB", "selectDateTime", "summary"];
//   const progressIndex = progressSteps.indexOf(step);

//   return (
//     <div className="w-full max-w-xl mx-auto px-0 md:px-0">
//       {/* ── Chat Card ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="cosmic-card rounded-2xl overflow-hidden mb-4 shadow-xl"
//       >
//         {/* ── Header ── */}
//         <div
//           className="px-4 md:px-6 py-3 md:py-4 flex items-center gap-3"
//           style={{
//             background: "linear-gradient(90deg, hsl(var(--primary)/0.15) 0%, hsl(35 80% 45%/0.1) 100%)",
//             borderBottom: "1px solid hsl(var(--border)/0.5)",
//           }}
//         >
//           <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-base md:text-lg shadow-lg shadow-amber-900/30 shrink-0">
//             🔮
//           </div>
//           <div className="min-w-0">
//             <p className="font-semibold text-xs md:text-sm truncate" style={{ color: "hsl(var(--card-foreground))" }}>
//               Astro Santosh Pandey
//             </p>
//             <p className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}>
//               <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 inline-block animate-pulse shrink-0" />
//               <span className="truncate">Online · Typically replies instantly</span>
//             </p>
//           </div>
//         </div>

//         {/* ── Chat Body — scrollable internally, page does NOT jump ── */}
//         <div
//           ref={chatBodyRef}
//           className="px-3 md:px-4 py-4 md:py-6 flex flex-col overflow-y-auto"
//           style={{
//             height: "clamp(380px, 55vh, 540px)",
//             background: "radial-gradient(ellipse at top left, hsl(var(--card)/0.4) 0%, transparent 70%), hsl(var(--background)/0.6)",
//             scrollBehavior: "smooth",
//           }}
//         >
//           {/* WELCOME */}
//           <BotBubble text="👋 Hello! Welcome to <strong>Astro Santosh Pandey</strong> ✨" delay={0.1} />
//           <BotBubble text="I'm here to help you find cosmic clarity. Please select a service to get started 👇" delay={0.3} />

//           {step === "welcome" && (
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="ml-9 md:ml-10 mt-1"
//             >
//               <Button
//                 size="sm"
//                 onClick={() => setStep("selectService")}
//                 style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(35 80% 45%) 100%)" }}
//                 className="rounded-xl text-xs md:text-sm font-medium"
//               >
//                 Get Started ✨
//               </Button>
//             </motion.div>
//           )}

//           {/* SELECT SERVICE */}
//           {step !== "welcome" && (
//             <>
//               <BotBubble text="<strong>Select a Service</strong>" delay={0} />
//               <AnimatePresence>
//                 {step === "selectService" && (
//                   <motion.div
//                     key="service-opts"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="ml-9 md:ml-10 flex flex-col gap-2 mb-3"
//                   >
//                     {(["Astrology", "Numerology", "Vastu", "Palmistry"] as Service[]).map((s, i) => (
//                       <ServiceOption
//                         key={s}
//                         label={s}
//                         emoji={serviceEmojis[s]}
//                         delay={i * 0.07}
//                         onClick={() => handleServiceSelect(s)}
//                       />
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}

//           {/* User selected service */}
//           {selectedService && step !== "selectService" && (
//             <UserBubble text={`${serviceEmojis[selectedService]} ${selectedService}`} />
//           )}

//           {/* PALMISTRY INFO */}
//           {step === "palmistryInfo" && (
//             <>
//               <BotBubble
//                 text="✋ <strong>Palmistry — In-Person Consultation Only</strong><br/><br/>Our Palmistry readings are conducted <strong>in-person in Mumbai</strong>.<br/>Our team will reach out to schedule your appointment. Thank you 🙏"
//                 delay={0.1}
//               />
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }} className="ml-9 md:ml-10 mt-2"
//               >
//                 <Button size="sm" variant="outline" onClick={handleReset} className="text-xs rounded-xl">
//                   ← Start Over
//                 </Button>
//               </motion.div>
//             </>
//           )}

//           {/* ENTER MOBILE */}
//           {step !== "welcome" && step !== "selectService" && step !== "palmistryInfo" && (
//             <>
//               <BotBubble text="📱 Please enter your <strong>Mobile Number</strong>" delay={0.1} />
//               {step === "enterMobile" ? (
//                 <ChatInput
//                   value={form.mobile}
//                   onChange={(v) => setField("mobile", v.replace(/\D/g, ""))}
//                   onSubmit={submitMobile}
//                   placeholder="e.g. 9876543210"
//                   type="tel"
//                   maxLength={10}
//                   error={errors.mobile}
//                   delay={0.25}
//                 />
//               ) : (
//                 <UserBubble text={`📱 ${form.mobile}`} />
//               )}
//             </>
//           )}

//           {/* ENTER DOB */}
//           {(step === "enterDOB" || isPast("enterDOB") || step === "summary") &&
//             !["welcome", "selectService", "palmistryInfo", "enterMobile"].includes(step) && (
//               <>
//                 <BotBubble
//                   text={`📅 Please enter your <strong>Date of Birth</strong>${selectedService === "Astrology" ? " (we'll also need time &amp; place)" : ""}<br/><span style="opacity:0.65;font-size:0.7rem">Format: DD-MM-YYYY &nbsp;&nbsp; e.g. 12-08-1999</span>`}
//                   delay={0.1}
//                 />
//                 {step === "enterDOB" ? (
//                   <ChatInput
//                     value={form.dob}
//                     onChange={(v) => setField("dob", v)}
//                     onSubmit={submitDOB}
//                     placeholder="DD-MM-YYYY"
//                     error={errors.dob}
//                     delay={0.25}
//                   />
//                 ) : (
//                   <UserBubble text={`📅 ${form.dob}`} />
//                 )}
//               </>
//             )}

//           {/* ENTER TOB — Astrology only */}
//           {selectedService === "Astrology" &&
//             (step === "enterTOB" || isPast("enterTOB") || step === "summary") &&
//             !["welcome", "selectService", "palmistryInfo", "enterMobile", "enterDOB"].includes(step) && (
//               <>
//                 <BotBubble
//                   text="🕐 Please enter your <strong>Time of Birth</strong><br/><span style='opacity:0.65;font-size:0.7rem'>e.g. 01:13 PM</span>"
//                   delay={0.1}
//                 />
//                 {step === "enterTOB" ? (
//                   <ChatInput
//                     value={form.tob}
//                     onChange={(v) => setField("tob", v)}
//                     onSubmit={submitTOB}
//                     placeholder="e.g. 01:13 PM"
//                     error={errors.tob}
//                     delay={0.25}
//                   />
//                 ) : (
//                   <UserBubble text={`🕐 ${form.tob}`} />
//                 )}
//               </>
//             )}

//           {/* ENTER POB — Astrology only */}
//           {selectedService === "Astrology" &&
//             (step === "enterPOB" || isPast("enterPOB") || step === "summary") &&
//             !["welcome", "selectService", "palmistryInfo", "enterMobile", "enterDOB", "enterTOB"].includes(step) && (
//               <>
//                 <BotBubble
//                   text="📍 Please enter your <strong>Place of Birth</strong><br/><span style='opacity:0.65;font-size:0.7rem'>City / Town &nbsp; e.g. Mumbai, Maharashtra</span>"
//                   delay={0.1}
//                 />
//                 {step === "enterPOB" ? (
//                   <ChatInput
//                     value={form.pob}
//                     onChange={(v) => setField("pob", v)}
//                     onSubmit={submitPOB}
//                     placeholder="e.g. Mumbai, Maharashtra"
//                     error={errors.pob}
//                     delay={0.25}
//                   />
//                 ) : (
//                   <UserBubble text={`📍 ${form.pob}`} />
//                 )}
//               </>
//             )}

//           {/* ENTER DIMENSIONS — Vastu only */}
//           {selectedService === "Vastu" &&
//             (step === "enterDimensions" || isPast("enterDimensions") || step === "summary") &&
//             !["welcome", "selectService", "palmistryInfo", "enterMobile", "enterDOB"].includes(step) && (
//               <>
//                 <BotBubble
//                   text="📐 Please enter your <strong>Property Dimensions</strong><br/><span style='opacity:0.65;font-size:0.7rem'>Length and Width in feet</span>"
//                   delay={0.1}
//                 />
//                 {step === "enterDimensions" ? (
//                   <motion.div
//                     initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.25 }} className="ml-9 md:ml-10 mt-1 mb-2"
//                   >
//                     <div className="flex gap-2 mb-2">
//                       <input
//                         type="number"
//                         value={form.length}
//                         onChange={(e) => setField("length", e.target.value)}
//                         placeholder="Length (ft)"
//                         className="flex-1 px-3 py-2 md:py-2.5 rounded-xl text-xs md:text-sm outline-none"
//                         style={{
//                           background: "hsl(var(--card))",
//                           border: `1px solid ${errors.length ? "hsl(0 72% 51%)" : "hsl(var(--border))"}`,
//                           color: "hsl(var(--card-foreground))",
//                         }}
//                       />
//                       <input
//                         type="number"
//                         value={form.width}
//                         onChange={(e) => setField("width", e.target.value)}
//                         placeholder="Width (ft)"
//                         className="flex-1 px-3 py-2 md:py-2.5 rounded-xl text-xs md:text-sm outline-none"
//                         style={{
//                           background: "hsl(var(--card))",
//                           border: `1px solid ${errors.width ? "hsl(0 72% 51%)" : "hsl(var(--border))"}`,
//                           color: "hsl(var(--card-foreground))",
//                         }}
//                       />
//                       <Button
//                         size="sm" onClick={submitDimensions}
//                         className="shrink-0 rounded-xl px-3 md:px-4 text-xs md:text-sm"
//                         style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(35 80% 45%) 100%)" }}
//                       >✓</Button>
//                     </div>
//                     {(errors.length || errors.width) && (
//                       <p className="text-xs mt-1" style={{ color: "hsl(0 72% 51%)" }}>
//                         {errors.length || errors.width}
//                       </p>
//                     )}
//                   </motion.div>
//                 ) : (
//                   <UserBubble text={`📐 ${form.length}ft (L) × ${form.width}ft (W)`} />
//                 )}
//               </>
//             )}

//           {/* SELECT DATE & TIME */}
//           {(step === "selectDateTime" || step === "summary") && (
//             <>
//               <BotBubble
//                 text="🗓️ Almost done! Please select your <strong>Preferred Consultation Date &amp; Time</strong>"
//                 delay={0.1}
//               />

//               {step === "selectDateTime" ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.25 }}
//                   className="ml-9 md:ml-10 mt-1 mb-2 space-y-3"
//                 >
//                   {/* Date Picker */}
//                   <div>
//                     <label className="text-xs font-medium mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
//                       Preferred Date
//                     </label>
//                     <input
//                       type="date"
//                       min={todayStr}
//                       value={form.consultDate}
//                       onChange={(e) => setField("consultDate", e.target.value)}
//                       className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm outline-none"
//                       style={{
//                         background: "hsl(var(--card))",
//                         border: `1px solid ${errors.consultDate ? "hsl(0 72% 51%)" : "hsl(var(--border))"}`,
//                         color: "hsl(var(--card-foreground))",
//                         colorScheme: "dark",
//                       }}
//                     />
//                     {errors.consultDate && (
//                       <p className="text-xs mt-1" style={{ color: "hsl(0 72% 51%)" }}>{errors.consultDate}</p>
//                     )}
//                   </div>

//                   {/* Time Slot Grid — 3 cols mobile, same desktop */}
//                   <div>
//                     <label className="text-xs font-medium mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
//                       Preferred Time Slot
//                     </label>
//                     <div className="grid grid-cols-3 gap-1.5 md:gap-2">
//                       {TIME_SLOTS.map((slot) => (
//                         <button
//                           key={slot}
//                           onClick={() => setField("consultTime", slot)}
//                           className="px-1 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-medium transition-all duration-200 border"
//                           style={{
//                             background: form.consultTime === slot ? "hsl(var(--primary)/0.15)" : "hsl(var(--card)/0.6)",
//                             borderColor: form.consultTime === slot ? "hsl(var(--primary))" : "hsl(var(--border))",
//                             color: form.consultTime === slot ? "hsl(var(--primary))" : "hsl(var(--card-foreground))",
//                           }}
//                         >
//                           {slot}
//                         </button>
//                       ))}
//                     </div>
//                     {errors.consultTime && (
//                       <p className="text-xs mt-1" style={{ color: "hsl(0 72% 51%)" }}>{errors.consultTime}</p>
//                     )}
//                   </div>

//                   <Button
//                     onClick={submitDateTime}
//                     className="w-full rounded-xl font-medium text-xs md:text-sm"
//                     style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(35 80% 45%) 100%)" }}
//                   >
//                     Confirm Inquiry →
//                   </Button>
//                 </motion.div>
//               ) : (
//                 <UserBubble
//                   text={`🗓️ ${new Date(form.consultDate).toLocaleDateString("en-IN", {
//                     day: "2-digit", month: "short", year: "numeric",
//                   })} at ${form.consultTime}`}
//                 />
//               )}
//             </>
//           )}

//           {/* SUMMARY */}
//           {step === "summary" && (
//             <>
//               <BotBubble text="🎉 <strong>Thank You!</strong> Your inquiry has been received successfully. 🎉" delay={0.2} />
//               <BotBubble
//                 text={`<strong>Here's a summary of your inquiry:</strong><br/><br/>
// ${serviceEmojis[selectedService!]} <strong>Service:</strong>&nbsp;<span style="color:hsl(var(--primary))">${selectedService}</span><br/>
// 📱 <strong>Mobile:</strong>&nbsp;<span style="color:hsl(var(--primary))">+91 ${form.mobile}</span><br/>
// ${form.dob ? `📅 <strong>DOB:</strong>&nbsp;<span style="color:hsl(var(--primary))">${form.dob}</span><br/>` : ""}${form.tob ? `🕐 <strong>TOB:</strong>&nbsp;<span style="color:hsl(var(--primary))">${form.tob}</span><br/>` : ""}${form.pob ? `📍 <strong>POB:</strong>&nbsp;<span style="color:hsl(var(--primary))">${form.pob}</span><br/>` : ""}${form.length ? `📐 <strong>Dimensions:</strong>&nbsp;<span style="color:hsl(var(--primary))">${form.length}ft × ${form.width}ft</span><br/>` : ""}🗓️ <strong>Date:</strong>&nbsp;<span style="color:hsl(var(--primary))">${new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span><br/>
// ⏰ <strong>Time:</strong>&nbsp;<span style="color:hsl(var(--primary))">${form.consultTime}</span><br/><br/>
// Our <strong><span style="color:hsl(var(--primary))">team</span></strong> will contact you on <strong>+91 ${form.mobile}</strong> shortly. 🙏`}
//                 delay={0.4}
//               />
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }} className="ml-9 md:ml-10 mt-2"
//               >
//                 <Button size="sm" variant="outline" onClick={handleReset} className="text-xs rounded-xl">
//                   ← New Inquiry
//                 </Button>
//               </motion.div>
//             </>
//           )}

//           {/* Scroll anchor — inside chat box */}
//           <div ref={bottomRef} className="h-1 shrink-0" />
//         </div>
//       </motion.div>

//       {/* Progress Dots */}
//       <div className="flex justify-center items-center gap-1.5 pb-2">
//         {progressSteps.map((s, i) => (
//           <div
//             key={s}
//             className="rounded-full transition-all duration-300"
//             style={{
//               width: progressIndex === i ? "20px" : "7px",
//               height: "7px",
//               background: progressIndex >= i ? "hsl(var(--primary))" : "hsl(var(--border))",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── Page ─────────────────────────────────────────────────────────────────────

// const Inquiry = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Inquiry - Ask Your Question | Astro Santosh Pandey</title>
//         <meta
//           name="description"
//           content="Send an inquiry to Astro Santosh Pandey. Get personalized guidance on astrology, numerology, vastu, and palmistry."
//         />
//         <link rel="canonical" href="https://astrosantoshpandey.com/inquiry" />
//       </Helmet>
//       <Layout>
//         {/* Hero */}
//         <section className="pt-28 md:pt-32 pb-6 md:pb-8 bg-gradient-hero relative overflow-hidden">
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-4xl"
//             >
//               <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">
//                 Send an Inquiry
//               </span>
//               <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 leading-tight">
//                 Ask Your Question.
//                 <span className="text-gradient-gold"> Find Your Path.</span>
//               </h1>
//               <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl">
//                 Have a question about your stars, numbers, or space? Send us an inquiry
//                 and our experts will guide you towards clarity and cosmic alignment.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Chat Section */}
//         <section className="py-6 md:py-12 bg-background relative scroll-mt-32" id="inquiry">
//           <div className="container mx-auto px-3 sm:px-4 max-w-xl md:max-w-2xl lg:max-w-3xl">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-center mb-6 md:mb-8"
//             >
//               <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
//                 Chat With <span className="text-gradient-gold">Our Team</span>
//               </h2>
//               <p className="text-muted-foreground text-xs md:text-sm lg:text-base max-w-lg mx-auto">
//                 Select your area of interest, share your details, and we'll reach out to you personally.
//               </p>
//             </motion.div>
//             <InquiryProcess />
//           </div>
//         </section>

//         {/* Info Cards */}
//         <section className="py-8 md:py-10 bg-gradient-cosmic">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto"
//             >
//               {[
//                 { icon: "🪐", title: "Astrology", desc: "Birth chart analysis, transit readings & life predictions." },
//                 { icon: "🔢", title: "Numerology", desc: "Unlock your life path, destiny & soul urge through numbers." },
//                 { icon: "🏠", title: "Vastu", desc: "Harmonize your living and work spaces with cosmic energies." },
//                 { icon: "✋", title: "Palmistry", desc: "Read the lines of destiny on your palm — in-person in Mumbai." },
//               ].map((card, i) => (
//                 <motion.div
//                   key={card.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   className="cosmic-card p-4 md:p-6 rounded-2xl text-center"
//                 >
//                   <div className="text-2xl md:text-4xl mb-2 md:mb-3">{card.icon}</div>
//                   <h3 className="font-serif font-bold text-sm md:text-lg mb-1 md:mb-2">{card.title}</h3>
//                   <p className="text-muted-foreground text-[11px] md:text-sm leading-relaxed">{card.desc}</p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

// export default Inquiry;


//testing



import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  { id: "Astrology",  emoji: "🪐", label: "Astrology",  desc: "Birth chart, predictions & planetary guidance" },
  { id: "Numerology", emoji: "🔢", label: "Numerology", desc: "Life path, destiny & soul urge numbers" },
  { id: "Vastu",      emoji: "🏠", label: "Vastu",      desc: "Space harmonisation & energy alignment" },
  { id: "Palmistry",  emoji: "✋", label: "Palmistry",  desc: "In-person reading of your life lines" },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];

const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
const todayStr = new Date().toISOString().split("T")[0];

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
      const done   = i < current;
      const active = i === current;
      return (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{
                scale: active ? 1.1 : 1,
              }}
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
  const isVastu     = form.service === "Vastu";
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
      <Field label="Mobile Number" icon={<Phone size={13} />} error={errors.mobile} required hint="We'll contact you on this number to confirm your appointment">
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
            {/* Hour dropdown */}
            <select value={form.tob_hour} onChange={(e) => setField("tob_hour", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.tob_hour), colorScheme: "dark" }}>
              <option value="">Hour</option>
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
            {/* Minute dropdown */}
            <select value={form.tob_minute} onChange={(e) => setField("tob_minute", e.target.value)}
              className={iCls} style={{ ...iStyle(errors.tob_minute), colorScheme: "dark" }}>
              <option value="">Min</option>
              {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            {/* AM / PM toggle */}
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
              Our team will contact you to schedule your visit.
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
    { label: "Service",        value: `${svc.emoji} ${svc.label}` },
    { label: "Name",           value: form.name },
    { label: "Mobile",         value: `+91 ${form.mobile}` },
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
    <div className="rounded-2xl p-4 text-sm space-y-2 text-left"
      style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}>
      <p className="text-muted-foreground">
        📱 We'll reach out on{" "}
        <strong style={{ color: "hsl(var(--card-foreground))" }}>+91 {form.mobile}</strong> to confirm your appointment.
      </p>
      {form.consultDate && (
        <p className="text-muted-foreground">
          🗓️ Preferred slot:{" "}
          <strong style={{ color: "hsl(var(--primary))" }}>
            {new Date(form.consultDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
            {form.consultTime && ` at ${form.consultTime}`}
          </strong>
        </p>
      )}
    </div>
    <Button variant="outline" onClick={onReset} className="rounded-xl text-sm">
      Submit Another Inquiry
    </Button>
  </motion.div>
);

// ─── Main Form Wrapper ────────────────────────────────────────────────────────

const EMPTY: FormData = {
  service: "", name: "", mobile: "", dob: "",
  tob_hour: "", tob_minute: "", tob_period: "AM",
  pob: "", length: "", width: "", consultDate: "", consultTime: "", message: "",
};

const InquiryForm = () => {
  const [step, setStep]         = useState(0);
  const [submitted, setSubmit]  = useState(false);
  const [form, setForm]         = useState<FormData>(EMPTY);
  const [errors, setErrors]     = useState<FieldErrors>({});

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
      if (!form.name.trim())                           e.name   = "Please enter your full name.";
      if (!form.mobile || !/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit number.";
      if (form.service !== "Vastu" && !form.dob)       e.dob    = "Please select your date of birth.";
      if (form.service === "Astrology") {
        if (!form.tob_hour)   e.tob_hour   = "Select hour.";
        if (!form.tob_minute) e.tob_minute = "Select minute.";
        if (!form.pob.trim()) e.pob        = "Please enter your place of birth.";
      }
      if (form.service === "Vastu") {
        if (!form.length) e.length = "Enter length.";
        if (!form.width)  e.width  = "Enter width.";
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

  const submit = () => {
    if (!validate()) return;
    setSubmit(true);
  };

  const reset = () => { setForm(EMPTY); setErrors({}); setStep(0); setSubmit(false); };

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

      {/* Navigation */}
      <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <Button variant="outline" onClick={back} className="rounded-xl flex items-center gap-1.5 text-sm">
            <ChevronLeft size={15} /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={next} className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}>
            Continue <ChevronRight size={15} />
          </Button>
        ) : (
          <Button onClick={submit} className="rounded-xl flex items-center gap-1.5 text-sm font-semibold px-6"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(35 80% 45%))" }}>
            Submit Inquiry <CheckCircle2 size={15} />
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