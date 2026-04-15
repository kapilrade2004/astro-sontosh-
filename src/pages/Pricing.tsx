



// import { Helmet } from "react-helmet-async";
// import { Layout } from "@/components/layout/Layout";
// import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
// import { CosmicBackground } from "@/components/ui/CosmicBackground";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   CheckCircle2, Sparkles, GraduationCap, ArrowRight, X,
//   BookOpen, Zap, Star, Layers
// } from "lucide-react";
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { AnimatePresence } from "framer-motion";
// import { crashCourses } from "./Courses";

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 }
//   })
// };

// // ── Sub-course options ───────────────────────────────────────────
// const intermediateCourseOptions = [
//   "Course 1 — Transit Analysis",
//   "Course 2 — Blank Chart Prediction",
// ];
// const advancedCourseOptions = [
//   "Nakshatra Astrology",
//   "Divisional Chart Analysis",
// ];
// const crashCourseOptions = crashCourses.map((c) => c.title);

// // ── Plan definitions ─────────────────────────────────────────────
// const plans = [
//   {
//     id: "foundation",
//     label: "Foundation",
//     name: "Foundation Course",
//     price: "₹15,000",
//     duration: "3 Months",
//     icon: BookOpen,
//     popular: false,
//     features: [
//       "Complete Astrology Fundamentals",
//       "Understanding Horoscope Structure",
//       "12 Houses & Zodiac Signs",
//       "Planetary Nature & Yogas",
//       "Panch Mahapurush Yogas",
//       "Ideal for Beginners",
//     ],
//   },
//   {
//     id: "intermediate",
//     label: "Intermediate",
//     name: "Intermediate Courses",
//     price: "₹25,000",
//     priceSuffix: "Each",
//     duration: "4 Months",
//     icon: Layers,
//     popular: true,
//     features: [
//       "Transit Analysis Techniques",
//       "Blank Chart Prediction",
//       "Event Timing Methods",
//       "Advanced Interpretation",
//     ],
//   },
//   {
//     id: "advanced",
//     label: "Advanced",
//     name: "Advanced Courses",
//     price: "₹40,000",
//     priceSuffix: "Each",
//     duration: "6 Months",
//     icon: Star,
//     popular: false,
//     features: [
//       "Nakshatra Astrology",
//       "Divisional Chart Analysis",
//       "Professional Prediction Techniques",
//       "Advanced Horoscope Interpretation",
//     ],
//   },
//   {
//     id: "crash",
//     label: "Crash Course",
//     name: "Crash Courses",
//     price: "₹7,000",
//     priceSuffix: "Each",
//     duration: "1 Month / course",
//     icon: Zap,
//     popular: false,
//     features: [
//       "11 Specialized Topics Available",
//       "Focused Learning Modules",
//       "Practical Application",
//       "Ideal for Skill Enhancement",
//     ],
//   },
// ];

// const enrollSteps = [
//   { num: "1", title: "Select Course" },
//   { num: "2", title: "Complete Payment" },
//   { num: "3", title: "Receive Login Details" },
//   { num: "4", title: "Access Learning Portal" },
// ];

// // ── Checkbox list ─────────────────────────────────────────────────
// const CheckboxList = ({
//   options,
//   selected,
//   onChange,
//   allowSelectAll,
//   selectAllLabel,
// }: {
//   options: string[];
//   selected: string[];
//   onChange: (val: string[]) => void;
//   allowSelectAll?: boolean;
//   selectAllLabel?: string;
// }) => {
//   const allSelected = selected.length === options.length;
//   const toggle = (opt: string) =>
//     onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
//   const toggleAll = () => onChange(allSelected ? [] : [...options]);

//   return (
//     <div className="space-y-2">
//       {allowSelectAll && (
//         <label className="flex items-center gap-2.5 cursor-pointer group pb-2 border-b border-primary/10">
//           <div
//             onClick={toggleAll}
//             className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-all shrink-0
//               ${allSelected ? "bg-primary border-primary" : "border-primary/40 bg-transparent hover:border-primary"}`}
//           >
//             {allSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
//           </div>
//           <span className="text-sm font-bold text-primary">{selectAllLabel || "Select All"}</span>
//         </label>
//       )}
//       <div className="space-y-2">
//         {options.map((opt) => {
//           const isChecked = selected.includes(opt);
//           return (
//             <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
//               <div
//                 onClick={() => toggle(opt)}
//                 className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-all shrink-0 mt-0.5
//                   ${isChecked ? "bg-primary border-primary" : "border-primary/30 bg-transparent hover:border-primary/60"}`}
//               >
//                 {isChecked && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
//               </div>
//               <span className={`text-sm leading-snug transition-colors ${isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
//                 {opt}
//               </span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ── Main Page ─────────────────────────────────────────────────────
// const Pricing = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activePlan, setActivePlan] = useState<typeof plans[0] | null>(null);
//   const [selectedSubCourses, setSelectedSubCourses] = useState<string[]>([]);
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { toast } = useToast();

//   const handleEnrollClick = (plan: typeof plans[0]) => {
//     setActivePlan(plan);
//     setSelectedSubCourses([]);
//     setFormData({ name: "", email: "", phone: "" });
//     setIsSuccess(false);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setActivePlan(null);
//     setSelectedSubCourses([]);
//     setFormData({ name: "", email: "", phone: "" });
//     setIsSuccess(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const needsSubCourse = activePlan && activePlan.id !== "foundation";
//   const isFormValid = activePlan && (!needsSubCourse || selectedSubCourses.length > 0);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid) {
//       toast({ variant: "destructive", title: "Please select at least one course." });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";
//       const courseLabel = needsSubCourse && selectedSubCourses.length > 0
//         ? `${activePlan?.name}: ${selectedSubCourses.join(", ")}`
//         : activePlan?.name || "";

//       const response = await fetch(`${apiBaseUrl}/course-enrollment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           course: courseLabel,
//           price: activePlan?.price || "N/A",
//         }),
//       });
//       if (!response.ok) throw new Error("Server error");
//       setIsSuccess(true);
//     } catch {
//       toast({
//         variant: "destructive",
//         title: "Submission Failed",
//         description: "Something went wrong. Please try again or contact us on WhatsApp.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Get sub-course options for active plan
//   const subCourseOptions =
//     activePlan?.id === "intermediate" ? intermediateCourseOptions :
//     activePlan?.id === "advanced" ? advancedCourseOptions :
//     activePlan?.id === "crash" ? crashCourseOptions : [];

//   const selectAllLabel =
//     activePlan?.id === "intermediate" ? "Select Both Courses" :
//     activePlan?.id === "advanced" ? "Select Both Courses" :
//     "Select All 11 Courses";

//   return (
//     <Layout>
//       <Helmet>
//         <title>Course Pricing & Enrollment – Vedic Astrology Courses | Cosmic Guidance</title>
//         <meta name="description" content="View pricing for our Vedic Astrology courses — Foundation, Intermediate, Advanced & Crash Courses." />
//       </Helmet>

//       {/* Hero */}
//       <section className="relative py-28 overflow-hidden">
//         <CosmicBackground />
//         <div className="container mx-auto px-4 relative z-10">
//           <Breadcrumbs />
//           <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-center max-w-3xl mx-auto space-y-4">
//             <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
//               Choose the Course That Fits Your <span className="text-gradient-gold">Learning Journey</span>
//             </h1>
//             <p className="text-muted-foreground text-lg leading-relaxed">
//               Our astrology programs are designed for beginners, learners, and advanced practitioners who want to explore Vedic astrology in a structured and practical way.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {plans.map((plan, i) => (
//               <motion.div
//                 key={plan.name}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeUp}
//                 custom={i}
//                 className={`cosmic-card p-8 flex flex-col relative ${plan.popular ? "border-primary/60 ring-2 ring-primary/30" : ""}`}
//               >
//                 {plan.popular && (
//                   <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
//                     Most Popular
//                   </span>
//                 )}
//                 <span className="text-xs font-semibold uppercase tracking-wider text-primary">{plan.label}</span>
//                 <h3 className="font-serif text-xl font-bold mt-2 mb-1">{plan.name}</h3>
//                 <p className="text-xs text-muted-foreground mb-3">{plan.duration}</p>
//                 <div className="mt-2 mb-6">
//                   <span className="text-4xl font-bold text-gradient-gold">{plan.price}</span>
//                   {plan.priceSuffix && <span className="text-muted-foreground text-sm ml-1">({plan.priceSuffix})</span>}
//                 </div>
//                 <ul className="space-y-3 mb-8 flex-1">
//                   {plan.features.map((f) => (
//                     <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
//                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   className={plan.popular ? "glow-gold w-full" : "w-full"}
//                   variant={plan.popular ? "default" : "outline"}
//                   onClick={() => handleEnrollClick(plan)}
//                 >
//                   Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enrollment Process */}
//       <section className="py-20 bg-gradient-cosmic">
//         <div className="container mx-auto px-4">
//           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
//             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Enrollment <span className="text-gradient-gold">Process</span></h2>
//           </motion.div>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
//             {enrollSteps.map((step, i) => (
//               <motion.div key={step.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-center gap-3 sm:gap-0">
//                 <div className="flex flex-col items-center text-center sm:px-8">
//                   <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-2">
//                     {step.num}
//                   </div>
//                   <span className="text-sm font-medium">{step.title}</span>
//                 </div>
//                 {i < enrollSteps.length - 1 && <ArrowRight className="hidden sm:block h-5 w-5 text-primary/50 mx-2" />}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 text-center max-w-2xl">
//           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="space-y-6">
//             <Sparkles className="h-10 w-10 text-primary mx-auto" />
//             <h2 className="font-serif text-3xl md:text-4xl font-bold">Begin Your Astrology Learning <span className="text-gradient-gold">Journey Today</span></h2>
//             <p className="text-muted-foreground leading-relaxed">Unlock the ancient wisdom of astrology and learn how to interpret the language of the planets.</p>
//             <Button size="lg" className="glow-gold" onClick={() => handleEnrollClick(plans[0])}>
//               <GraduationCap className="mr-2 h-5 w-5" />Enroll Now
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* ── Enrollment Modal ── */}
//       <AnimatePresence>
//         {isModalOpen && activePlan && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//             onClick={handleCloseModal}
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               transition={{ duration: 0.2 }}
//               className="relative w-full max-w-md bg-background/95 cosmic-card overflow-hidden max-h-[92vh] flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* ── Modal header with course info ── */}
//               <div className="bg-primary/8 border-b border-primary/15 px-6 py-5 shrink-0">
//                 <button
//                   onClick={handleCloseModal}
//                   className="absolute right-4 top-4 w-8 h-8 rounded-full bg-muted/40 hover:bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>

//                 <div className="flex items-center gap-3 pr-8">
//                   {/* Course icon */}
//                   <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
//                     <activePlan.icon className="w-5 h-5 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-0.5">
//                       {activePlan.label}
//                     </p>
//                     <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
//                       {activePlan.name}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm font-bold text-gradient-gold">{activePlan.price}</span>
//                       {activePlan.priceSuffix && (
//                         <span className="text-[10px] text-muted-foreground">/ {activePlan.priceSuffix}</span>
//                       )}
//                       <span className="text-muted-foreground/40">·</span>
//                       <span className="text-[10px] text-muted-foreground">{activePlan.duration}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ── Scrollable body ── */}
//               <div className="overflow-y-auto custom-scrollbar flex-1 px-6 py-5 space-y-4">

//                 {/* ── Success Screen ── */}
//                 {isSuccess ? (
//                   <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-5">
//                     <div className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
//                       <CheckCircle2 className="h-8 w-8 text-primary" />
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="font-serif text-xl font-bold text-foreground">
//                         Thank you for connecting with us.
//                       </h3>
//                       <p className="text-muted-foreground text-sm leading-relaxed">
//                         We have received your details / query. Our team shall respond within 24 hours.
//                       </p>
//                     </div>
//                     <Button className="glow-gold mt-2" onClick={handleCloseModal}>
//                       Close
//                     </Button>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Personal fields */}
//                     <div className="space-y-1">
//                       <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Full Name <span className="text-destructive">*</span>
//                       </label>
//                       <input
//                         id="name" name="name" required
//                         value={formData.name} onChange={handleChange}
//                         className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-primary/20 focus:border-primary/50 outline-none transition-colors text-sm placeholder:text-muted-foreground/50"
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     <div className="space-y-1">
//                       <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Phone Number <span className="text-destructive">*</span>
//                       </label>
//                       <input
//                         id="phone" name="phone" type="tel" required
//                         value={formData.phone} onChange={handleChange}
//                         className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-primary/20 focus:border-primary/50 outline-none transition-colors text-sm placeholder:text-muted-foreground/50"
//                         placeholder="Enter phone number"
//                       />
//                     </div>

//                     <div className="space-y-1">
//                       <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                         Email Address <span className="text-muted-foreground/50 normal-case font-normal">(Optional)</span>
//                       </label>
//                       <input
//                         id="email" name="email" type="email"
//                         value={formData.email} onChange={handleChange}
//                         className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-primary/20 focus:border-primary/50 outline-none transition-colors text-sm placeholder:text-muted-foreground/50"
//                         placeholder="Enter email address"
//                       />
//                     </div>

//                     {/* ── Sub-course selection — only for Intermediate, Advanced, Crash ── */}
//                     {needsSubCourse && (
//                       <div className="space-y-3 pt-2 border-t border-primary/10">
//                         <div className="flex items-center justify-between">
//                           <p className="text-xs font-bold text-foreground uppercase tracking-wider">
//                             Select Course(s) <span className="text-destructive">*</span>
//                           </p>
//                           {selectedSubCourses.length > 0 && (
//                             <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
//                               {selectedSubCourses.length} selected
//                             </span>
//                           )}
//                         </div>

//                         <div className={`bg-muted/20 rounded-xl border border-primary/15 p-3.5
//                           ${activePlan.id === "crash" ? "max-h-52 overflow-y-auto custom-scrollbar" : ""}`}>
//                           <CheckboxList
//                             options={subCourseOptions}
//                             selected={selectedSubCourses}
//                             onChange={setSelectedSubCourses}
//                             allowSelectAll
//                             selectAllLabel={selectAllLabel}
//                           />
//                         </div>

//                         {selectedSubCourses.length === 0 && (
//                           <p className="text-[10px] text-muted-foreground/70">
//                             Please select at least one course to proceed.
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>

//               {/* ── Fixed footer with submit ── */}
//               {!isSuccess && (
//                 <div className="px-6 py-4 border-t border-primary/10 bg-background/50 shrink-0">
//                   <Button
//                     type="button"
//                     className="w-full glow-gold h-11 text-sm font-bold"
//                     disabled={isSubmitting || !isFormValid || !formData.name || !formData.phone}
//                     onClick={handleSubmit}
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
//                         Submitting...
//                       </div>
//                     ) : (
//                       <>
//                         <GraduationCap className="w-4 h-4 mr-2" />
//                         Submit Enrollment Request
//                       </>
//                     )}
//                   </Button>
//                   <p className="text-center text-[10px] text-muted-foreground mt-2.5">
//                     By submitting, you agree to our terms. We will contact you soon!
//                   </p>
//                 </div>
//               )}

//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Layout>
//   );
// };

// export default Pricing;


//testing


import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CheckCircle2, Sparkles, GraduationCap, ArrowRight, X,
  BookOpen, Zap, Star, Layers
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence } from "framer-motion";
import { crashCourses } from "./Courses";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

// ── Sub-course options ───────────────────────────────────────────
const intermediateCourseOptions = [
  "Course 1 — Transit Analysis",
  "Course 2 — Blank Chart Prediction",
];
const advancedCourseOptions = [
  "Nakshatra Astrology",
  "Divisional Chart Analysis",
];
const crashCourseOptions = crashCourses.map((c) => c.title);

// ── Plan definitions ─────────────────────────────────────────────
const plans = [
  {
    id: "foundation",
    label: "Foundation",
    name: "Foundation Course",
    price: "₹15,000",
    duration: "3 Months",
    icon: BookOpen,
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
    id: "intermediate",
    label: "Intermediate",
    name: "Intermediate Courses",
    price: "₹25,000",
    priceSuffix: "Each",
    duration: "4 Months",
    icon: Layers,
    popular: true,
    features: [
      "Transit Analysis Techniques",
      "Blank Chart Prediction",
      "Event Timing Methods",
      "Advanced Interpretation",
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    name: "Advanced Courses",
    price: "₹40,000",
    priceSuffix: "Each",
    duration: "6 Months",
    icon: Star,
    popular: false,
    features: [
      "Nakshatra Astrology",
      "Divisional Chart Analysis",
      "Professional Prediction Techniques",
      "Advanced Horoscope Interpretation",
    ],
  },
  {
    id: "crash",
    label: "Crash Course",
    name: "Crash Courses",
    price: "₹7,000",
    priceSuffix: "Each",
    duration: "1 Month / course",
    icon: Zap,
    popular: false,
    features: [
      "11 Specialized Topics Available",
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

// ── Standalone validation helpers ────────────────────────────────
const validateName = (value: string): string => {
  if (!value.trim()) return "Full name is required.";
  if (value.trim().length < 3) return "Name must be at least 3 characters.";
  if (!/^[a-zA-Z\s]+$/.test(value.trim()))
    return "Name can only contain letters and spaces.";
  return "";
};

const validatePhone = (value: string): string => {
  if (!value.trim()) return "Phone number is required.";
  if (!/^\d{10}$/.test(value.trim()))
    return "Enter a valid 10-digit phone number.";
  return "";
};

// Email is optional — only validate format if something is entered
const validateEmail = (value: string): string => {
  if (!value.trim()) return "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    return "Enter a valid email address (e.g. name@example.com).";
  return "";
};

// ── Checkbox list ─────────────────────────────────────────────────
const CheckboxList = ({
  options,
  selected,
  onChange,
  allowSelectAll,
  selectAllLabel,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  allowSelectAll?: boolean;
  selectAllLabel?: string;
}) => {
  const allSelected = selected.length === options.length;
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  const toggleAll = () => onChange(allSelected ? [] : [...options]);

  return (
    <div className="space-y-2">
      {allowSelectAll && (
        <label className="flex items-center gap-2.5 cursor-pointer group pb-2 border-b border-primary/10">
          <div
            onClick={toggleAll}
            className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-all shrink-0
              ${allSelected ? "bg-primary border-primary" : "border-primary/40 bg-transparent hover:border-primary"}`}
          >
            {allSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
          </div>
          <span className="text-sm font-bold text-primary">{selectAllLabel || "Select All"}</span>
        </label>
      )}
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = selected.includes(opt);
          return (
            <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggle(opt)}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-all shrink-0 mt-0.5
                  ${isChecked ? "bg-primary border-primary" : "border-primary/30 bg-transparent hover:border-primary/60"}`}
              >
                {isChecked && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className={`text-sm leading-snug transition-colors ${isChecked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                {opt}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────
const Pricing = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [activePlan, setActivePlan]     = useState<typeof plans[0] | null>(null);
  const [selectedSubCourses, setSelectedSubCourses] = useState<string[]>([]);
  const [formData, setFormData]         = useState({ name: "", email: "", phone: "" });

  // ── Per-field error strings ──────────────────────────────────
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const { toast } = useToast();

  // ── Open modal — reset everything ───────────────────────────
  const handleEnrollClick = (plan: typeof plans[0]) => {
    setActivePlan(plan);
    setSelectedSubCourses([]);
    setFormData({ name: "", email: "", phone: "" });
    setFormErrors({});
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  // ── Close modal — reset everything ──────────────────────────
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActivePlan(null);
    setSelectedSubCourses([]);
    setFormData({ name: "", email: "", phone: "" });
    setFormErrors({});
    setIsSuccess(false);
  };

  // ── Live validation on every keystroke ──────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only allow digits in phone field
    const sanitised = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: sanitised }));

    let error = "";
    if (name === "name")  error = validateName(sanitised);
    if (name === "phone") error = validatePhone(sanitised);
    if (name === "email") error = validateEmail(sanitised);

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ── Full validation run on submit ────────────────────────────
  const validateAll = (): boolean => {
    const errors = {
      name:  validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
    };
    setFormErrors(errors);
    return !errors.name && !errors.phone && !errors.email;
  };

  const needsSubCourse = activePlan && activePlan.id !== "foundation";
  const isFormValid    = activePlan && (!needsSubCourse || selectedSubCourses.length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    if (!isFormValid) {
      toast({ variant: "destructive", title: "Please select at least one course." });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBaseUrl  = import.meta.env.VITE_API_BASE_URL || "https://backend.astrosantoshpandey.com";
      const courseLabel = needsSubCourse && selectedSubCourses.length > 0
        ? `${activePlan?.name}: ${selectedSubCourses.join(", ")}`
        : activePlan?.name || "";

      const response = await fetch(`${apiBaseUrl}/course-enrollment`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          course: courseLabel,
          price:  activePlan?.price || "N/A",
        }),
      });
      if (!response.ok) throw new Error("Server error");
      setIsSuccess(true);
    } catch {
      toast({
        variant:     "destructive",
        title:       "Submission Failed",
        description: "Something went wrong. Please try again or contact us on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subCourseOptions =
    activePlan?.id === "intermediate" ? intermediateCourseOptions :
    activePlan?.id === "advanced"     ? advancedCourseOptions     :
    activePlan?.id === "crash"        ? crashCourseOptions        : [];

  const selectAllLabel =
    activePlan?.id === "intermediate" ? "Select Both Courses" :
    activePlan?.id === "advanced"     ? "Select Both Courses" :
    "Select All 11 Courses";

  // ── Shared input className builder ───────────────────────────
  const inputCls = (field: "name" | "phone" | "email") =>
    `w-full px-4 py-2.5 rounded-xl bg-muted/30 border transition-colors text-sm placeholder:text-muted-foreground/50 outline-none ${
      formErrors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-primary/20 focus:border-primary/50"
    }`;

  return (
    <Layout>
      <Helmet>
        <title>Course Pricing & Enrollment – Vedic Astrology Courses | Cosmic Guidance</title>
        <meta name="description" content="View pricing for our Vedic Astrology courses — Foundation, Intermediate, Advanced & Crash Courses." />
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
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className={`cosmic-card p-8 flex flex-col relative ${plan.popular ? "border-primary/60 ring-2 ring-primary/30" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{plan.label}</span>
                <h3 className="font-serif text-xl font-bold mt-2 mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{plan.duration}</p>
                <div className="mt-2 mb-6">
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
                  onClick={() => handleEnrollClick(plan)}
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
                {i < enrollSteps.length - 1 && <ArrowRight className="hidden sm:block h-5 w-5 text-primary/50 mx-2" />}
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
            <p className="text-muted-foreground leading-relaxed">Unlock the ancient wisdom of astrology and learn how to interpret the language of the planets.</p>
            <Button size="lg" className="glow-gold" onClick={() => handleEnrollClick(plans[0])}>
              <GraduationCap className="mr-2 h-5 w-5" />Enroll Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Enrollment Modal ── */}
      <AnimatePresence>
        {isModalOpen && activePlan && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-background/95 cosmic-card overflow-hidden max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-primary/8 border-b border-primary/15 px-6 py-5 shrink-0">
                <button
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-muted/40 hover:bg-muted/70 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 pr-8">
                  <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <activePlan.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-0.5">{activePlan.label}</p>
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{activePlan.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-gradient-gold">{activePlan.price}</span>
                      {activePlan.priceSuffix && <span className="text-[10px] text-muted-foreground">/ {activePlan.priceSuffix}</span>}
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[10px] text-muted-foreground">{activePlan.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto custom-scrollbar flex-1 px-6 py-5 space-y-4">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-foreground">Thank you for connecting with us.</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We have received your details / query. Our team shall respond within 24 hours.
                      </p>
                    </div>
                    <Button className="glow-gold mt-2" onClick={handleCloseModal}>Close</Button>
                  </div>
                ) : (
                  <>
                    {/* ── Full Name ── */}
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name" name="name" required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputCls("name")}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* ── Phone Number ── */}
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="phone" name="phone" type="tel" required
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputCls("phone")}
                        placeholder="Enter 10-digit phone number"
                        maxLength={10}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* ── Email Address (optional) ── */}
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Email Address{" "}
                        <span className="text-muted-foreground/50 normal-case font-normal">(Optional)</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputCls("email")}
                        placeholder="Enter email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    {/* ── Sub-course selection ── */}
                    {needsSubCourse && (
                      <div className="space-y-3 pt-2 border-t border-primary/10">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                            Select Course(s) <span className="text-destructive">*</span>
                          </p>
                          {selectedSubCourses.length > 0 && (
                            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              {selectedSubCourses.length} selected
                            </span>
                          )}
                        </div>
                        <div className={`bg-muted/20 rounded-xl border border-primary/15 p-3.5 ${
                          activePlan.id === "crash" ? "max-h-52 overflow-y-auto custom-scrollbar" : ""
                        }`}>
                          <CheckboxList
                            options={subCourseOptions}
                            selected={selectedSubCourses}
                            onChange={setSelectedSubCourses}
                            allowSelectAll
                            selectAllLabel={selectAllLabel}
                          />
                        </div>
                        {selectedSubCourses.length === 0 && (
                          <p className="text-[10px] text-muted-foreground/70">
                            Please select at least one course to proceed.
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Fixed footer */}
              {!isSuccess && (
                <div className="px-6 py-4 border-t border-primary/10 bg-background/50 shrink-0">
                  <Button
                    type="button"
                    className="w-full glow-gold h-11 text-sm font-bold"
                    disabled={isSubmitting || !isFormValid}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Submit Enrollment Request
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground mt-2.5">
                    By submitting, you agree to our terms. We will contact you soon!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Pricing;