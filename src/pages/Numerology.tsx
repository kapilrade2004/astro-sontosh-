//testing



// import { Helmet } from "react-helmet-async";
// import { AnimatePresence, motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";

// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Smartphone, PenTool, Calculator, Dice1, Users,
//   ArrowRight, CheckCircle, Hash, TrendingUp, Heart
// } from "lucide-react";
// import { useState } from "react";
// import { X } from "lucide-react";


// const services = [
//   {
//     icon: Smartphone,
//     title: "Mobile Numerology",
//     description: "Your mobile number carries powerful vibrations that affect your daily life. Decode the energy of your phone number and understand how it influences your luck, relationships, and opportunities.",
//     features: ["Number energy analysis", "Luck factor assessment", "Recommendation for changes", "Business number evaluation", "Compatibility with birth date"],
//   },
//   {
//     icon: PenTool,
//     title: "Name Correction",
//     description: "Your name creates vibrations that impact your success and well-being. Get personalized name spellings aligned with your birth numbers for enhanced prosperity and growth.",
//     features: ["Vibrational alignment", "Spelling modifications", "Business name analysis", "Brand name creation", "Signature enhancement"],
//   },
//   {
//     icon: Calculator,
//     title: "Numerology Predictions",
//     description: "Comprehensive life predictions based on your date of birth and name. Understand your life path, expression number, and soul urge for complete self-awareness.",
//     features: ["Life path analysis", "Career predictions", "Finance outlook", "Health insights", "Relationship guidance"],
//   },
//   {
//     icon: Dice1,
//     title: "Lucky & Unlucky Numbers",
//     description: "Discover which numbers bring you fortune and which ones to avoid. Use this knowledge for important decisions, vehicle numbers, house numbers, and more.",
//     features: ["Personal lucky numbers", "Date selection guidance", "Vehicle number analysis", "House number assessment", "Business number optimization"],
//   },
//   {
//     icon: Users,
//     title: "Compatibility Match",
//     description: "Check numerical compatibility with your partner, business associate, or team members. Understand the dynamics of your relationships through numbers.",
//     features: ["Partner compatibility", "Business partner analysis", "Team alignment", "Family harmony", "Relationship improvement tips"],
//   },
// ];

// const highlights = [
//   { icon: Hash, title: "Pythagorean System", description: "Ancient wisdom combined with modern application" },
//   { icon: TrendingUp, title: "Life Path Mapping", description: "Complete journey analysis from birth to destiny" },
//   { icon: Heart, title: "Relationship Insights", description: "Deep understanding of interpersonal dynamics" },
//   { icon: Calculator, title: "Personal Year Forecast", description: "Year-by-year predictions for planning ahead" },
// ];

// const faqs = [
//   {
//     question: "How does numerology work?",
//     answer: "Numerology is based on the principle that numbers carry specific vibrations that influence our lives. Your birth date and name convert into numbers that reveal your personality, strengths, challenges, and life path.",
//   },
//   {
//     question: "Can changing my name really improve my life?",
//     answer: "Yes, when done correctly. A name change aligns your personal vibration with your life goals. Many successful people have benefited from strategic name modifications based on numerology.",
//   },
//   {
//     question: "How important is my mobile number?",
//     answer: "Your mobile number is in constant contact with you and others contact you through it. Its vibration affects your daily communication, opportunities, and relationships. An aligned mobile number can enhance your luck.",
//   },
//   {
//     question: "What's the difference between lucky and favorable numbers?",
//     answer: "Lucky numbers bring general good fortune, while favorable numbers are specifically aligned with certain activities or goals. We analyze both to give you comprehensive guidance for different areas of life.",
//   },
//   {
//     question: "How accurate are numerology predictions?",
//     answer: "Numerology predictions have shown remarkable accuracy when calculated correctly. Combined with your efforts and the right remedies, they can significantly improve your chances of success in any endeavor.",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// /* ── Reusable Numerology Image visual ───────────────────────── */
// const NumerologyImage = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
//   const imgClass =
//     size === "sm"
//       ? "w-full h-48 sm:h-56 object-cover rounded-2xl"
//       : "w-full h-auto object-cover rounded-2xl";

//   return (
//     <div className={`relative w-full ${size === "sm" ? "max-w-sm mx-auto" : "max-w-lg"}`}>
//       {/* Outer purple-gold glow */}
//       <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-purple-500/25 via-amber-400/20 to-purple-800/20 blur-3xl animate-pulse pointer-events-none" />

//       {/* Image container */}
//       <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//         <img
//           src="/src/assets/Numerology.jpeg"
//           alt="Numerology - Sacred Numbers & Zodiac"
//           className={imgClass}
//           style={{ filter: "brightness(1.0) contrast(1.05) saturate(1.08)" }}
//         />

//         {/* Gold shimmer overlay at top */}
//         <div
//           className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.12) 0%, transparent 70%)",
//           }}
//         />

//         {/* Bottom fade */}
//         <div
//           className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
//           style={{
//             background: "linear-gradient(to top, rgba(8,4,20,0.55) 0%, transparent 100%)",
//           }}
//         />

//         {/* Left edge fade */}
//         <div
//           className="absolute inset-y-0 left-0 w-8 pointer-events-none"
//           style={{ background: "linear-gradient(to right, rgba(8,4,20,0.4), transparent)" }}
//         />

//         {/* Right edge fade */}
//         <div
//           className="absolute inset-y-0 right-0 w-8 pointer-events-none"
//           style={{ background: "linear-gradient(to left, rgba(8,4,20,0.4), transparent)" }}
//         />
//       </div>

//       {/* Gold border ring */}
//       <div
//         className="absolute inset-0 rounded-2xl pointer-events-none"
//         style={{
//           boxShadow:
//             "inset 0 0 0 1.5px rgba(251,191,36,0.4), 0 0 35px rgba(251,191,36,0.2), 0 0 70px rgba(138,43,226,0.15)",
//         }}
//       />
//     </div>
//   );
// };

// const Numerology = () => {
//   const [openForm, setOpenForm] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     dob: ''
//   });
//   const [errors, setErrors] = useState({
//     name: '',
//     mobile: ''
//   });

//   const validateName = (name) => {
//     if (!name.trim()) return 'Name is required';
//     if (name.trim().length < 2) return 'Name must be at least 2 characters';
//     if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
//     return '';
//   };

//   const validateMobile = (mobile) => {
//     if (!mobile) return 'Mobile number is required';
//     if (!/^\d{10}$/.test(mobile)) return 'Mobile number must be exactly 10 digits';
//     return '';
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, name: value });
//     setErrors({ ...errors, name: validateName(value) });
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     if (value.length <= 10) {
//       setFormData({ ...formData, mobile: value });
//       setErrors({ ...errors, mobile: validateMobile(value) });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const nameError = validateName(formData.name);
//     const mobileError = validateMobile(formData.mobile);

//     if (nameError || mobileError) {
//       setErrors({ name: nameError, mobile: mobileError });
//       return;
//     }

//     const message = encodeURIComponent(
//       `Hello Astro Santosh Pandey,\n\nI would like to request a numerology analysis.\n\nMy Details:\nFull Name: ${formData.name}\nMobile Number: ${formData.mobile}\nDate of Birth: ${formData.dob}\n\nThank you.`
//     );

//     window.open(`https://wa.me/918879731174?text=${message}`, '_blank');

//     setFormData({ name: '', mobile: '', dob: '' });
//     setErrors({ name: '', mobile: '' });
//     setOpenForm(false);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Numerology Services - Name Correction, Mobile Numerology | Astro Santosh Pandey</title>
//         <meta name="description" content="Expert numerology services including mobile number analysis, name correction, lucky numbers, compatibility matching, and life predictions based on birth date." />
//         <link rel="canonical" href="https://astrosantoshpandey.com/numerology" />
//       </Helmet>
//       <Layout>

//         {/* ── Hero Section ── */}
//         <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">

//               {/* Left: Text Content */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <span className="text-primary font-medium text-sm uppercase tracking-wider">
//                   Numerology – The Science of Numbers
//                 </span>

//                 {/* Sanskrit Shloka */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   className="relative mt-3 mb-6"
//                 >
//                   <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//                   <div
//                     className="text-sm md:text-lg font-bold tracking-normal leading-loose text-left relative
//                       bg-[length:200%_auto] bg-gradient-to-r
//                       from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                       bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                       drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                       drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                     style={{
//                       textShadow:
//                         "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                     }}
//                   >
//                     <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
//                     यथा शिखा मयूराणां नागानां मणयो यथा ।
//                     <br />
//                     तद्वद् वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम्
//                     <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//                   </div>
//                 </motion.div>

//                 <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
//                   Discover the <span className="text-gradient-gold">Power of Numbers</span> in Your Life
//                 </h1>
//                 <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
//                   Numerology is a precise, data-driven occult science that uncovers personality traits, karmic strengths, and life cycles — using only your date of birth.
//                 </p>

//                 {/* ── MOBILE: Numerology image between text and button ── */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.85 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                   className="flex lg:hidden justify-center items-center mb-8"
//                 >
//                   <NumerologyImage size="sm" />
//                 </motion.div>

//                 <Button
//                   size="lg"
//                   className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
//                   onClick={() => setOpenForm(true)}
//                 >
//                   Check My Numbers
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </motion.div>

//               {/* Right: Numerology Image — desktop only */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 className="hidden lg:flex justify-center items-center"
//               >
//                 <NumerologyImage size="lg" />
//               </motion.div>

//             </div>
//           </div>
//         </section>

//         {/* ── Highlights ── */}
//         <section className="py-12 bg-background border-b border-border">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {highlights.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="text-center"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                     <item.icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
//                   <p className="text-muted-foreground text-xs">{item.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Services Section ── */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Our <span className="text-gradient-gold">Numerology Services</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Comprehensive number analysis to align your life with positive vibrations.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="space-y-8"
//             >
//               {services.map((service, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   className="cosmic-card p-8"
//                 >
//                   <div className="flex flex-col lg:flex-row gap-8">
//                     <div className="lg:w-1/3">
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
//                           <service.icon className="w-7 h-7 text-primary" />
//                         </div>
//                         <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed">{service.description}</p>
//                     </div>
//                     <div className="lg:w-2/3">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {service.features.map((feature, i) => (
//                           <div key={i} className="flex items-center gap-3">
//                             <CheckCircle className="w-5 h-5 text-primary shrink-0" />
//                             <span className="text-foreground/90">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* ── FAQ Section ── */}
//         <section className="py-20 bg-gradient-cosmic">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Frequently Asked <span className="text-gradient-gold">Questions</span>
//               </h2>
//             </motion.div>

//             <div className="max-w-3xl mx-auto">
//               <Accordion type="single" collapsible className="space-y-4">
//                 {faqs.map((faq, index) => (
//                   <AccordionItem key={index} value={`item-${index}`} className="cosmic-card px-6">
//                     <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
//                       {faq.question}
//                     </AccordionTrigger>
//                     <AccordionContent className="text-muted-foreground">
//                       {faq.answer}
//                     </AccordionContent>
//                   </AccordionItem>
//                 ))}
//               </Accordion>
//             </div>
//           </div>
//         </section>

//         {/* ── CTA Section ── */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="max-w-2xl mx-auto"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
//                 Ready to Decode <span className="text-gradient-gold">Your Numbers</span>?
//               </h2>
//               <p className="text-muted-foreground text-lg mb-8">
//                 Discover what your numbers reveal about your destiny and learn how to
//                 align them for success, prosperity, and happiness.
//               </p>
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
//                 onClick={() => setOpenForm(true)}
//               >
//                 Check My Numbers
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </motion.div>
//           </div>
//         </section>

//         {/* ── Modal Form ── */}
//         <AnimatePresence>
//           {openForm && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//               onClick={() => setOpenForm(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 30 }}
//                 animate={{ scale: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative w-full max-w-md mx-4 cosmic-card p-8"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close Button */}
//                 <button
//                   onClick={() => setOpenForm(false)}
//                   className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>

//                 {/* Title */}
//                 <h3 className="font-serif text-2xl font-bold mb-2 text-center">
//                   Check <span className="text-gradient-gold">My Numbers</span>
//                 </h3>
//                 <p className="text-sm text-muted-foreground text-center mb-6">
//                   Enter your details for accurate numerology analysis
//                 </p>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Name */}
//                   <div>
//                     <label className="text-sm font-medium">Full Name</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your name"
//                       value={formData.name}
//                       onChange={handleNameChange}
//                       className={`mt-1 w-full rounded-lg bg-background border ${
//                         errors.name ? 'border-red-500' : 'border-border'
//                       } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50`}
//                       required
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                     )}
//                   </div>

//                   {/* Mobile Number */}
//                   <div>
//                     <label className="text-sm font-medium">Mobile Number</label>
//                     <input
//                       type="tel"
//                       placeholder="Enter 10-digit mobile number"
//                       value={formData.mobile}
//                       onChange={handleMobileChange}
//                       className={`mt-1 w-full rounded-lg bg-background border ${
//                         errors.mobile ? 'border-red-500' : 'border-border'
//                       } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50`}
//                       required
//                     />
//                     {errors.mobile && (
//                       <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
//                     )}
//                   </div>

//                   {/* Date of Birth */}
//                   <div>
//                     <label className="text-sm font-medium">Date of Birth</label>
//                     <input
//                       type="date"
//                       max={new Date().toISOString().split('T')[0]}
//                       value={formData.dob}
//                       onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                       className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2
//                         focus:outline-none focus:ring-2 focus:ring-primary/50 text-white
//                         [&::-webkit-calendar-picker-indicator]:invert"
//                       required
//                     />
//                   </div>

//                   {/* Submit */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold mt-4"
//                   >
//                     Send WhatsApp Request
//                   </Button>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </Layout>
//     </>
//   );
// };

// export default Numerology;





//testing






import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Smartphone, PenTool, Calculator, Dice1, Users,
  ArrowRight, CheckCircle, Hash, TrendingUp, Heart
} from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";


const services = [
  {
    icon: Smartphone,
    title: "Mobile Numerology",
    description: "Your mobile number carries powerful vibrations that affect your daily life. Decode the energy of your phone number and understand how it influences your luck, relationships, and opportunities.",
    features: ["Number energy analysis", "Luck factor assessment", "Recommendation for changes", "Business number evaluation", "Compatibility with birth date"],
  },
  {
    icon: PenTool,
    title: "Name Correction",
    description: "Your name creates vibrations that impact your success and well-being. Get personalized name spellings aligned with your birth numbers for enhanced prosperity and growth.",
    features: ["Vibrational alignment", "Spelling modifications", "Business name analysis", "Brand name creation", "Signature enhancement"],
  },
  {
    icon: Calculator,
    title: "Numerology Predictions",
    description: "Comprehensive life predictions based on your date of birth and name. Understand your life path, expression number, and soul urge for complete self-awareness.",
    features: ["Life path analysis", "Career predictions", "Finance outlook", "Health insights", "Relationship guidance"],
  },
  {
    icon: Dice1,
    title: "Lucky & Unlucky Numbers",
    description: "Discover which numbers bring you fortune and which ones to avoid. Use this knowledge for important decisions, vehicle numbers, house numbers, and more.",
    features: ["Personal lucky numbers", "Date selection guidance", "Vehicle number analysis", "House number assessment", "Business number optimization"],
  },
  {
    icon: Users,
    title: "Compatibility Match",
    description: "Check numerical compatibility with your partner, business associate, or team members. Understand the dynamics of your relationships through numbers.",
    features: ["Partner compatibility", "Business partner analysis", "Team alignment", "Family harmony", "Relationship improvement tips"],
  },
];

const highlights = [
  { icon: Hash, title: "Pythagorean System", description: "Ancient wisdom combined with modern application" },
  { icon: TrendingUp, title: "Life Path Mapping", description: "Complete journey analysis from birth to destiny" },
  { icon: Heart, title: "Relationship Insights", description: "Deep understanding of interpersonal dynamics" },
  { icon: Calculator, title: "Personal Year Forecast", description: "Year-by-year predictions for planning ahead" },
];

const faqs = [
  {
    question: "How does numerology work?",
    answer: "Numerology is based on the principle that numbers carry specific vibrations that influence our lives. Your birth date and name convert into numbers that reveal your personality, strengths, challenges, and life path.",
  },
  {
    question: "Can changing my name really improve my life?",
    answer: "Yes, when done correctly. A name change aligns your personal vibration with your life goals. Many successful people have benefited from strategic name modifications based on numerology.",
  },
  {
    question: "How important is my mobile number?",
    answer: "Your mobile number is in constant contact with you and others contact you through it. Its vibration affects your daily communication, opportunities, and relationships. An aligned mobile number can enhance your luck.",
  },
  {
    question: "What's the difference between lucky and favorable numbers?",
    answer: "Lucky numbers bring general good fortune, while favorable numbers are specifically aligned with certain activities or goals. We analyze both to give you comprehensive guidance for different areas of life.",
  },
  {
    question: "How accurate are numerology predictions?",
    answer: "Numerology predictions have shown remarkable accuracy when calculated correctly. Combined with your efforts and the right remedies, they can significantly improve your chances of success in any endeavor.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ── Reusable Numerology Image visual ───────────────────────── */
const NumerologyImage = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const imgClass =
    size === "sm"
      ? "w-full h-48 sm:h-56 object-cover rounded-2xl"
      : "w-full h-auto object-cover rounded-2xl";

  return (
    <div className={`relative w-full ${size === "sm" ? "max-w-sm mx-auto" : "max-w-lg"}`}>
      <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-purple-500/25 via-amber-400/20 to-purple-800/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="/src/assets/Numerology.jpeg"
          alt="Numerology - Sacred Numbers & Zodiac"
          className={imgClass}
          style={{ filter: "brightness(1.0) contrast(1.05) saturate(1.08)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,4,20,0.55) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(8,4,20,0.4), transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(8,4,20,0.4), transparent)" }}
        />
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px rgba(251,191,36,0.4), 0 0 35px rgba(251,191,36,0.2), 0 0 70px rgba(138,43,226,0.15)",
        }}
      />
    </div>
  );
};

// ── Empty form & error state ─────────────────────────────────────
const emptyForm = { name: "", mobile: "", dob: "" };
const emptyErrors = { name: "", mobile: "" };

const Numerology = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyErrors);

  // ── Reset helper — clears both form data and errors ──
  const resetForm = () => {
    setFormData(emptyForm);
    setErrors(emptyErrors);
  };

  // ── Close modal and always reset ──
  const handleCloseForm = () => {
    setOpenForm(false);
    resetForm();
  };

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateMobile = (mobile: string) => {
    if (!mobile) return "Mobile number is required";
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be exactly 10 digits";
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    setErrors({ ...errors, name: validateName(value) });
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, mobile: value });
      setErrors({ ...errors, mobile: validateMobile(value) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const mobileError = validateMobile(formData.mobile);

    if (nameError || mobileError) {
      setErrors({ name: nameError, mobile: mobileError });
      return;
    }

    const message = encodeURIComponent(
      `Hello Astro Santosh Pandey,\n\nI would like to request a numerology analysis.\n\nMy Details:\nFull Name: ${formData.name}\nMobile Number: ${formData.mobile}\nDate of Birth: ${formData.dob}\n\nThank you.`
    );

    window.open(`https://wa.me/918879731174?text=${message}`, "_blank");

    // ── Clear form + close after successful submit ──
    handleCloseForm();
  };

  return (
    <>
      <Helmet>
        <title>Numerology Services - Name Correction, Mobile Numerology | Astro Santosh Pandey</title>
        <meta name="description" content="Expert numerology services including mobile number analysis, name correction, lucky numbers, compatibility matching, and life predictions based on birth date." />
        <link rel="canonical" href="https://astrosantoshpandey.com/numerology" />
      </Helmet>
      <Layout>

        {/* ── Hero Section ── */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Numerology – The Science of Numbers
                </span>

                {/* Sanskrit Shloka */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mt-3 mb-6"
                >
                  <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
                  <div
                    className="text-sm md:text-lg font-bold tracking-normal leading-loose text-left relative
                      bg-[length:200%_auto] bg-gradient-to-r
                      from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                      bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                      drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                      drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                    style={{
                      textShadow:
                        "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                    यथा शिखा मयूराणां नागानां मणयो यथा ।
                    <br />
                    तद्वद् वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम्
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Discover the <span className="text-gradient-gold">Power of Numbers</span> in Your Life
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                  Numerology is a precise, data-driven occult science that uncovers personality traits, karmic strengths, and life cycles — using only your date of birth.
                </p>

                {/* ── MOBILE: Numerology image between text and button ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex lg:hidden justify-center items-center mb-8"
                >
                  <NumerologyImage size="sm" />
                </motion.div>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                  onClick={() => setOpenForm(true)}
                >
                  Check My Numbers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Right: Numerology Image — desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center"
              >
                <NumerologyImage size="lg" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Section ── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient-gold">Numerology Services</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive number analysis to align your life with positive vibrations.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="cosmic-card p-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient-gold">Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="cosmic-card px-6">
                    <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Ready to Decode <span className="text-gradient-gold">Your Numbers</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Discover what your numbers reveal about your destiny and learn how to
                align them for success, prosperity, and happiness.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                onClick={() => setOpenForm(true)}
              >
                Check My Numbers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── Modal Form ── */}
        <AnimatePresence>
          {openForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={handleCloseForm}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-md mx-4 cosmic-card p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseForm}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold mb-2 text-center">
                  Check <span className="text-gradient-gold">My Numbers</span>
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Enter your details for accurate numerology analysis
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleNameChange}
                      className={`mt-1 w-full rounded-lg bg-background border ${
                        errors.name ? "border-red-500" : "border-border"
                      } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-sm font-medium">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      className={`mt-1 w-full rounded-lg bg-background border ${
                        errors.mobile ? "border-red-500" : "border-border"
                      } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      required
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="text-sm font-medium">Date of Birth</label>
                    <input
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-background border border-border px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-primary/50 text-white
                        [&::-webkit-calendar-picker-indicator]:invert"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold mt-4"
                  >
                    Send WhatsApp Request
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </Layout>
    </>
  );
};

export default Numerology;