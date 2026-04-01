// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { motion, AnimatePresence } from "framer-motion";
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
//   Hand, Heart, Activity, TrendingUp, Brain, Fingerprint,
//   ArrowRight, CheckCircle, Shield, Sparkles, HeartPulse, Wallet,
//   Users, Sun, Calendar, Target, MapPin, Phone, X
// } from "lucide-react";

// const palmLines = [
//   {
//     icon: Heart,
//     title: "Heart Line",
//     description: "Reveals your emotional nature, love life, and relationship patterns. Understand your capacity for love and how you express affection.",
//     features: ["Emotional depth analysis", "Love relationship patterns", "Romantic compatibility", "Emotional challenges", "Heart health indicators"],
//   },
//   {
//     icon: Activity,
//     title: "Life Line",
//     description: "Shows your vitality, life energy, and major life changes. Often misunderstood, it reveals quality of life rather than length.",
//     features: ["Vitality assessment", "Major life transitions", "Energy levels", "Life quality indicators", "Recovery potential"],
//   },
//   {
//     icon: HeartPulse,
//     title: "Health Line",
//     description: "Indicates physical constitution, potential health concerns, and periods requiring attention. Helps in preventive health planning.",
//     features: ["Constitution analysis", "Health vulnerability periods", "Organ sensitivity", "Stress indicators", "Wellness guidance"],
//   },
//   {
//     icon: TrendingUp,
//     title: "Fate Line",
//     description: "Represents your career path, life direction, and worldly success. Shows how destiny and personal effort shape your journey.",
//     features: ["Career trajectory", "Success periods", "Life direction", "Opportunity timing", "Achievement potential"],
//   },
//   {
//     icon: Brain,
//     title: "Head Line",
//     description: "Reveals your intellectual capacity, thinking style, and mental approach to life. Indicates creativity vs analytical abilities.",
//     features: ["Intellectual assessment", "Thinking patterns", "Learning style", "Decision-making ability", "Creative potential"],
//   },
//   {
//     icon: Sun,
//     title: "Sun Line",
//     description: "Indicates fame, success, creativity, and public recognition. Shows your potential for achievement and how you shine in the world.",
//     features: ["Success potential", "Creative talents", "Public recognition", "Achievement timing", "Artistic abilities"],
//   },
//   {
//     icon: Users,
//     title: "Marriage Line",
//     description: "Reveals relationship patterns, marriage timing, and partnership dynamics. Provides insights into your romantic journey.",
//     features: ["Marriage timing", "Relationship patterns", "Partner compatibility", "Emotional bonds", "Union challenges"],
//   },
// ];

// const palmistryBenefits = [
//   {
//     icon: Target,
//     title: "Character & Personality Analysis",
//     description: "Deep insights into your inherent nature, behavioral patterns, strengths, and areas for personal growth.",
//   },
//   {
//     icon: Calendar,
//     title: "Life Path & Event Timing",
//     description: "Detailed timeline of significant life events, transitions, and opportunities with precise timing indicators.",
//   },
//   {
//     icon: HeartPulse,
//     title: "Health & Well-being Indicators",
//     description: "Comprehensive health assessment revealing vulnerabilities, constitution, and preventive measures for wellness.",
//   },
//   {
//     icon: Wallet,
//     title: "Career & Financial Guidance",
//     description: "Professional path analysis, wealth indicators, financial potential, and prosperity timing.",
//   },
//   {
//     icon: Users,
//     title: "Relationship & Compatibility",
//     description: "Marriage timing, partner compatibility, relationship dynamics, and romantic journey insights.",
//   },
//   {
//     icon: CheckCircle,
//     title: "Validation When Birth Details Missing",
//     description: "Accurate readings when complete birth details are unavailable, providing essential astrological guidance.",
//   },
// ];

// const additionalServices = [
//   {
//     icon: Fingerprint,
//     title: "Palm Structure Analysis",
//     description: "Complete analysis of hand shape, finger lengths, phalanges, and mounts for comprehensive personality insights.",
//   },
//   {
//     icon: Shield,
//     title: "Astrological Remedies",
//     description: "Customized astrological remedies to overcome challenges revealed in your palm and enhance positive aspects.",
//   },
//   {
//     icon: Sparkles,
//     title: "Future Timing",
//     description: "Precise timing of major life events using specialized palmistry techniques and markers.",
//   },
//   {
//     icon: Wallet,
//     title: "Wealth Indicators",
//     description: "Analysis of prosperity signs, money lines, and financial potential visible in your palms.",
//   },
// ];

// const remedyCategories = [
//   { title: "Relationship Healing", description: "Remedies to attract love and strengthen existing bonds" },
//   { title: "Career Block Removal", description: "Solutions to overcome professional obstacles and stagnation" },
//   { title: "Health Remedies", description: "Preventive measures and healing for health vulnerabilities" },
//   { title: "Wealth Activation", description: "Techniques to unlock financial potential and attract prosperity" },
// ];

// const faqs = [
//   {
//     question: "Can palmistry predict exact future events?",
//     answer: "Palmistry reveals tendencies, potential, and probable timings rather than fixed events. Your palm shows the path, but your choices shape the journey. We provide guidance to maximize positive outcomes and minimize challenges.",
//   },
//   {
//     question: "Do palm lines change over time?",
//     answer: "Yes, palm lines can change, especially the finer lines. Major lines remain relatively stable, but their depth and clarity can shift. This reflects how our actions and choices influence our destiny.",
//   },
//   {
//     question: "Which hand do you read for palmistry?",
//     answer: "We read both hands. The non-dominant hand shows inherited traits and potential, while the dominant hand reveals how you've developed and your current path. Together, they provide a complete picture.",
//   },
//   {
//     question: "Can you do palm reading through photos?",
//     answer: "Yes, with high-quality photos of both palms in proper lighting, we can provide accurate readings. Clear images showing all lines and mounts are essential for comprehensive analysis.",
//   },
//   {
//     question: "How accurate is palm reading?",
//     answer: "When performed by an experienced palmist, readings are remarkably accurate for personality assessment, potential revelation, and tendency prediction. Combined with remedies, palmistry becomes a powerful tool for life improvement.",
//   },
//   {
//     question: "Can palmistry help when birth details are missing?",
//     answer: "Absolutely! Palmistry serves as an excellent complementary tool when complete or accurate birth details are unavailable. Your palms provide reliable insights for astrological guidance and remedy suggestions.",
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

// const Palmistry = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <>
//       <Helmet>
//         <title>Palmistry Services - Palm Reading, Life Line Analysis | Astro Santosh Pandey</title>
//         <meta name="description" content="Expert palmistry services including heart line, life line, fate line, marriage line, sun line reading, palm structure analysis, and personalized astrological remedies." />
//         <link rel="canonical" href="https://astrosantoshpandey.com/palmistry" />
//       </Helmet>
//       <Layout>
//         {/* Hero Section */}
//     {/* Hero Section */}
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
//                   Palmistry – The Mirror of Destiny
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
//                     className="text-sm md:text-lg font-bold
//                       tracking-normal leading-loose text-left relative
//                       bg-[length:200%_auto]
//                       bg-gradient-to-r
//                       from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                       bg-clip-text text-transparent
//                       animate-[shimmer_5s_linear_infinite]
//                       drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                       drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                     style={{
//                       textShadow: `
//                         0 0 5px rgba(255,215,0,0.5),
//                         0 0 12px rgba(251,191,36,0.4),
//                         0 0 25px rgba(245,158,11,0.3),
//                         0 3px 8px rgba(0,0,0,0.3)
//                       `,
//                     }}
//                   >
//                     <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
//                     कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती ।
//                     <br />
//                     करमूले तु गोविन्दः प्रभाते करदर्शनम्
//                     <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//                   </div>
//                 </motion.div>

//                 <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
//                   Your Palms Hold the <span className="text-gradient-gold">Map of Your Destiny</span>
//                 </h1>
//                 <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-4">
//                   Discover the secrets written in your hands. Get detailed readings of your life lines,
//                   personality traits, and future potential with powerful astrological remedies.
//                 </p>
//                 <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
//                   Palmistry complements astrology, especially when birth details are unavailable. The palm reflects past karma, present actions, and future possibilities.
//                 </p>
//                 <Button
//                   size="lg"
//                   className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
//                   onClick={() => setShowPopup(true)}
//                 >
//                   Get Palm Reading Now
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </motion.div>

//               {/* Right: Palmistry Image with premium animations */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 className="hidden lg:flex justify-center items-center"
//               >
//                 <div className="relative flex items-center justify-center">

//                   {/* ── Pulse ring 1 — expands outward slowly ── */}
//                   <motion.div
//                     className="absolute rounded-full border border-primary/20"
//                     animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                     style={{ width: "340px", height: "340px" }}
//                   />

//                   {/* ── Pulse ring 2 — offset timing ── */}
//                   <motion.div
//                     className="absolute rounded-full border border-amber-400/15"
//                     animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                     style={{ width: "340px", height: "340px" }}
//                   />

//                   {/* ── Outer rotating glow ring ── */}
//                   <motion.div
//                     className="absolute rounded-full"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     style={{
//                       width: "340px",
//                       height: "340px",
//                       background:
//                         "conic-gradient(from 0deg, rgba(251,191,36,0.35), rgba(138,43,226,0.2), rgba(251,191,36,0.35), rgba(60,0,120,0.15), rgba(251,191,36,0.35))",
//                       borderRadius: "50%",
//                       filter: "blur(8px)",
//                     }}
//                   />

//                   {/* ── Floating image — gentle up/down bob ── */}
//                   <motion.div
//                     animate={{ y: [-10, 0, -10] }}
//                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                     className="relative z-10"
//                   >
//                     <div className="relative rounded-2xl overflow-hidden"
//                       style={{
//                         boxShadow:
//                           "0 0 50px rgba(138,43,226,0.4), 0 0 100px rgba(138,43,226,0.2), 0 0 0 1.5px rgba(251,191,36,0.45)",
//                       }}
//                     >
//                       <img
//                         src="/src/assets/Palmistry.jpeg"
//                         alt="Palmistry - Sacred Hand Reading Chart"
//                         className="w-72 lg:w-80 xl:w-[340px] h-auto object-cover rounded-2xl"
//                         style={{
//                           filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
//                         }}
//                       />

//                       {/* Gold shimmer overlay top */}
//                       <div
//                         className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
//                         style={{
//                           background:
//                             "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)",
//                         }}
//                       />

//                       {/* Bottom fade */}
//                       <div
//                         className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
//                         style={{
//                           background:
//                             "linear-gradient(to top, rgba(8,4,20,0.5) 0%, transparent 100%)",
//                         }}
//                       />
//                     </div>
//                   </motion.div>

//                   {/* ── Floating star particles ── */}
//                   {[
//                     { top: "8%",  left: "5%",  size: 6,  delay: 0 },
//                     { top: "15%", right: "6%", size: 5,  delay: 0.8 },
//                     { top: "70%", left: "3%",  size: 4,  delay: 1.4 },
//                     { top: "80%", right: "5%", size: 7,  delay: 0.4 },
//                     { top: "45%", left: "2%",  size: 4,  delay: 1.8 },
//                     { top: "30%", right: "3%", size: 5,  delay: 1.2 },
//                   ].map((star, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute rounded-full bg-amber-400/70 pointer-events-none"
//                       style={{
//                         width:  star.size,
//                         height: star.size,
//                         top:    star.top,
//                         left:   "left"  in star ? star.left  : undefined,
//                         right:  "right" in star ? star.right : undefined,
//                         boxShadow: `0 0 ${star.size * 2}px rgba(251,191,36,0.8)`,
//                       }}
//                       animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
//                       transition={{
//                         duration: 2.5,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                         delay: star.delay,
//                       }}
//                     />
//                   ))}

//                 </div>
//               </motion.div>

//             </div>
//           </div>
//         </section>
//         {/* Benefits Section */}
//         <section className="py-20 bg-gradient-cosmic">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 What <span className="text-gradient-gold">Palmistry</span> Reveals
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Comprehensive insights into every aspect of your life through palm analysis
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {palmistryBenefits.map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="cosmic-card p-6 group hover:scale-105 transition-transform"
//                 >
//                   <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
//                     <benefit.icon className="w-7 h-7 text-primary" />
//                   </div>
//                   <h3 className="font-serif text-xl font-semibold mb-3">{benefit.title}</h3>
//                   <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Major Lines Section */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Major <span className="text-gradient-gold">Palm Lines</span> Reading
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Comprehensive analysis of all seven major lines revealing your complete life story
//               </p>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="space-y-8"
//             >
//               {palmLines.map((line, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   className="cosmic-card p-8"
//                 >
//                   <div className="flex flex-col lg:flex-row gap-8">
//                     <div className="lg:w-1/3">
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
//                           <line.icon className="w-7 h-7 text-primary" />
//                         </div>
//                         <h3 className="font-serif text-2xl font-semibold">{line.title}</h3>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed">{line.description}</p>
//                     </div>
//                     <div className="lg:w-2/3">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {line.features.map((feature, i) => (
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

//         {/* Additional Services */}
//         <section className="py-20 bg-gradient-cosmic">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Additional <span className="text-gradient-gold">Palm Analysis</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Specialized services for complete palm structure and phalange analysis
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {additionalServices.map((service, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="cosmic-card p-6 text-center group hover:scale-105 transition-transform"
//                 >
//                   <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
//                     <service.icon className="w-7 h-7 text-primary" />
//                   </div>
//                   <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
//                   <p className="text-muted-foreground text-sm">{service.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Remedies Section */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-12"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Astrological <span className="text-gradient-gold">Remedies</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Personalized astrological solutions to overcome challenges and enhance positive potential revealed in your palms
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {remedyCategories.map((remedy, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="cosmic-card p-6 flex items-start gap-4"
//                 >
//                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                     <CheckCircle className="w-5 h-5 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-1">{remedy.title}</h3>
//                     <p className="text-muted-foreground text-sm">{remedy.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
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

//         {/* CTA Section */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="max-w-2xl mx-auto"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
//                 Ready to Read <span className="text-gradient-gold">Your Destiny</span>?
//               </h2>
//               <p className="text-muted-foreground text-lg mb-8">
//                 Get your comprehensive palm reading today and discover what your hands
//                 reveal about your past, present, and future with personalized astrological remedies.
//               </p>
//               <Button
//                 size="lg"
//                 className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
//                 onClick={() => setShowPopup(true)}
//               >
//                 Get Palm Reading Now
//               </Button>
//             </motion.div>
//           </div>
//         </section>
//       </Layout>

//       {/* Palm Reading Info Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(6px)" }}
//             onClick={() => setShowPopup(false)}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.85, y: 30 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.85, y: 30 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
//               style={{
//                 background: "linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)",
//                 border: "1px solid rgba(212, 175, 55, 0.35)",
//                 boxShadow: "0 0 60px rgba(212, 175, 55, 0.2), 0 25px 60px rgba(0,0,0,0.6)",
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Gold top accent bar */}
//               <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

//               {/* Close button */}
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
//                 style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
//                 onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,0.25)")}
//                 onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,175,55,0.1)")}
//               >
//                 <X className="w-4 h-4" />
//               </button>

//               <div className="p-8">
//                 {/* Icon */}
//                 <div
//                   className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto"
//                   style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}
//                 >
//                   <Hand className="w-8 h-8" style={{ color: "#D4AF37" }} />
//                 </div>

//                 {/* Title */}
//                 <h3
//                   className="font-serif text-2xl font-bold text-center mb-2"
//                   style={{ color: "#D4AF37" }}
//                 >
//                   Palm Reading Service
//                 </h3>

//                 <div
//                   className="w-16 h-0.5 mx-auto mb-5"
//                   style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
//                 />

//                 {/* Message */}
//                 <div
//                   className="rounded-xl p-4 mb-6 text-center"
//                   style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
//                 >
//                   <p className="text-white/90 leading-relaxed text-base">
//                     This is{" "}
//                     <span className="font-semibold" style={{ color: "#D4AF37" }}>
//                       'In Person Service by Appointment'
//                     </span>{" "}
//                     only for{" "}
//                     <span className="inline-flex items-center gap-1 font-semibold" style={{ color: "#D4AF37" }}>
//                       <MapPin className="w-4 h-4" />
//                       Mumbai
//                     </span>{" "}
//                     location.
//                   </p>
//                 </div>

//                 {/* Contact info */}
//                 <p className="text-white/70 text-sm text-center mb-5">
//                   For more details, please reach us at
//                 </p>
//                 <a
//                   href="tel:+918879731174"
//                   className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-semibold text-base transition-all"
//                   style={{
//                     background: "linear-gradient(135deg, #D4AF37, #F5D06A)",
//                     color: "#1a0f2e",
//                     boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
//                   }}
//                   onMouseEnter={e => {
//                     (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(212,175,55,0.6)";
//                     (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
//                   }}
//                   onMouseLeave={e => {
//                     (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.4)";
//                     (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
//                   }}
//                 >
//                   <Phone className="w-5 h-5" />
//                   +91 8879731174
//                 </a>

//                 <button
//                   onClick={() => setShowPopup(false)}
//                   className="mt-4 w-full py-2 text-sm transition-colors rounded-lg"
//                   style={{ color: "rgba(255,255,255,0.45)" }}
//                   onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)")}
//                   onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)")}
//                 >
//                   Close
//                 </button>
//               </div>

//               {/* Gold bottom accent bar */}
//               <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Palmistry;



//test






import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
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
  Hand, Heart, Activity, TrendingUp, Brain, Fingerprint,
  ArrowRight, CheckCircle, Shield, Sparkles, HeartPulse, Wallet,
  Users, Sun, Calendar, Target, MapPin, Phone, X
} from "lucide-react";

const palmLines = [
  {
    icon: Heart,
    title: "Heart Line",
    description: "Reveals your emotional nature, love life, and relationship patterns. Understand your capacity for love and how you express affection.",
    features: ["Emotional depth analysis", "Love relationship patterns", "Romantic compatibility", "Emotional challenges", "Heart health indicators"],
  },
  {
    icon: Activity,
    title: "Life Line",
    description: "Shows your vitality, life energy, and major life changes. Often misunderstood, it reveals quality of life rather than length.",
    features: ["Vitality assessment", "Major life transitions", "Energy levels", "Life quality indicators", "Recovery potential"],
  },
  {
    icon: HeartPulse,
    title: "Health Line",
    description: "Indicates physical constitution, potential health concerns, and periods requiring attention. Helps in preventive health planning.",
    features: ["Constitution analysis", "Health vulnerability periods", "Organ sensitivity", "Stress indicators", "Wellness guidance"],
  },
  {
    icon: TrendingUp,
    title: "Fate Line",
    description: "Represents your career path, life direction, and worldly success. Shows how destiny and personal effort shape your journey.",
    features: ["Career trajectory", "Success periods", "Life direction", "Opportunity timing", "Achievement potential"],
  },
  {
    icon: Brain,
    title: "Head Line",
    description: "Reveals your intellectual capacity, thinking style, and mental approach to life. Indicates creativity vs analytical abilities.",
    features: ["Intellectual assessment", "Thinking patterns", "Learning style", "Decision-making ability", "Creative potential"],
  },
  {
    icon: Sun,
    title: "Sun Line",
    description: "Indicates fame, success, creativity, and public recognition. Shows your potential for achievement and how you shine in the world.",
    features: ["Success potential", "Creative talents", "Public recognition", "Achievement timing", "Artistic abilities"],
  },
  {
    icon: Users,
    title: "Marriage Line",
    description: "Reveals relationship patterns, marriage timing, and partnership dynamics. Provides insights into your romantic journey.",
    features: ["Marriage timing", "Relationship patterns", "Partner compatibility", "Emotional bonds", "Union challenges"],
  },
];

const palmistryBenefits = [
  {
    icon: Target,
    title: "Character & Personality Analysis",
    description: "Deep insights into your inherent nature, behavioral patterns, strengths, and areas for personal growth.",
  },
  {
    icon: Calendar,
    title: "Life Path & Event Timing",
    description: "Detailed timeline of significant life events, transitions, and opportunities with precise timing indicators.",
  },
  {
    icon: HeartPulse,
    title: "Health & Well-being Indicators",
    description: "Comprehensive health assessment revealing vulnerabilities, constitution, and preventive measures for wellness.",
  },
  {
    icon: Wallet,
    title: "Career & Financial Guidance",
    description: "Professional path analysis, wealth indicators, financial potential, and prosperity timing.",
  },
  {
    icon: Users,
    title: "Relationship & Compatibility",
    description: "Marriage timing, partner compatibility, relationship dynamics, and romantic journey insights.",
  },
  {
    icon: CheckCircle,
    title: "Validation When Birth Details Missing",
    description: "Accurate readings when complete birth details are unavailable, providing essential astrological guidance.",
  },
];

const additionalServices = [
  {
    icon: Fingerprint,
    title: "Palm Structure Analysis",
    description: "Complete analysis of hand shape, finger lengths, phalanges, and mounts for comprehensive personality insights.",
  },
  {
    icon: Shield,
    title: "Astrological Remedies",
    description: "Customized astrological remedies to overcome challenges revealed in your palm and enhance positive aspects.",
  },
  {
    icon: Sparkles,
    title: "Future Timing",
    description: "Precise timing of major life events using specialized palmistry techniques and markers.",
  },
  {
    icon: Wallet,
    title: "Wealth Indicators",
    description: "Analysis of prosperity signs, money lines, and financial potential visible in your palms.",
  },
];

const remedyCategories = [
  { title: "Relationship Healing", description: "Remedies to attract love and strengthen existing bonds" },
  { title: "Career Block Removal", description: "Solutions to overcome professional obstacles and stagnation" },
  { title: "Health Remedies", description: "Preventive measures and healing for health vulnerabilities" },
  { title: "Wealth Activation", description: "Techniques to unlock financial potential and attract prosperity" },
];

const faqs = [
  {
    question: "Can palmistry predict exact future events?",
    answer: "Palmistry reveals tendencies, potential, and probable timings rather than fixed events. Your palm shows the path, but your choices shape the journey. We provide guidance to maximize positive outcomes and minimize challenges.",
  },
  {
    question: "Do palm lines change over time?",
    answer: "Yes, palm lines can change, especially the finer lines. Major lines remain relatively stable, but their depth and clarity can shift. This reflects how our actions and choices influence our destiny.",
  },
  {
    question: "Which hand do you read for palmistry?",
    answer: "We read both hands. The non-dominant hand shows inherited traits and potential, while the dominant hand reveals how you've developed and your current path. Together, they provide a complete picture.",
  },
  {
    question: "Can you do palm reading through photos?",
    answer: "Yes, with high-quality photos of both palms in proper lighting, we can provide accurate readings. Clear images showing all lines and mounts are essential for comprehensive analysis.",
  },
  {
    question: "How accurate is palm reading?",
    answer: "When performed by an experienced palmist, readings are remarkably accurate for personality assessment, potential revelation, and tendency prediction. Combined with remedies, palmistry becomes a powerful tool for life improvement.",
  },
  {
    question: "Can palmistry help when birth details are missing?",
    answer: "Absolutely! Palmistry serves as an excellent complementary tool when complete or accurate birth details are unavailable. Your palms provide reliable insights for astrological guidance and remedy suggestions.",
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

/* ── Reusable animated Palmistry image ───────────────────────
   size="sm"  → mobile  (260 px rings, w-64 image)
   size="lg"  → desktop (340 px rings, w-72/80/[340px] image)
   ─────────────────────────────────────────────────────────── */
const PalmistryImage = ({
  size = "lg",
  onLoad,
}: {
  size?: "sm" | "lg";
  onLoad?: () => void;
}) => {
  const ringSize  = size === "sm" ? "260px" : "340px";
  const imgClass  =
    size === "sm"
      ? "w-64 h-auto object-cover rounded-2xl"
      : "w-72 lg:w-80 xl:w-[340px] h-auto object-cover rounded-2xl";

  const stars = [
    { top: "8%",  left: "5%",  size: 6, delay: 0 },
    { top: "15%", right: "6%", size: 5, delay: 0.8 },
    { top: "70%", left: "3%",  size: 4, delay: 1.4 },
    { top: "80%", right: "5%", size: 7, delay: 0.4 },
    { top: "45%", left: "2%",  size: 4, delay: 1.8 },
    { top: "30%", right: "3%", size: 5, delay: 1.2 },
  ];

  return (
    <div className="relative flex items-center justify-center">

      {/* Pulse ring 1 */}
      <motion.div
        className="absolute rounded-full border border-primary/20"
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: ringSize, height: ringSize }}
      />

      {/* Pulse ring 2 */}
      <motion.div
        className="absolute rounded-full border border-amber-400/15"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ width: ringSize, height: ringSize }}
      />

      {/* Rotating conic glow ring */}
      <motion.div
        className="absolute rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          width: ringSize,
          height: ringSize,
          background:
            "conic-gradient(from 0deg, rgba(251,191,36,0.35), rgba(138,43,226,0.2), rgba(251,191,36,0.35), rgba(60,0,120,0.15), rgba(251,191,36,0.35))",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />

      {/* Floating image */}
      <motion.div
        animate={{ y: [-10, 0, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 50px rgba(138,43,226,0.4), 0 0 100px rgba(138,43,226,0.2), 0 0 0 1.5px rgba(251,191,36,0.45)",
          }}
        >
          <img
            src="/src/assets/Palmistry.jpeg"
            alt="Palmistry - Sacred Hand Reading Chart"
            className={imgClass}
            style={{ filter: "brightness(1.05) contrast(1.05) saturate(1.1)" }}
            onLoad={onLoad}
          />

          {/* Gold shimmer top */}
          <div
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(8,4,20,0.5) 0%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* Star particles */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/70 pointer-events-none"
          style={{
            width:  star.size,
            height: star.size,
            top:    star.top,
            left:   "left"  in star ? star.left  : undefined,
            right:  "right" in star ? star.right : undefined,
            boxShadow: `0 0 ${star.size * 2}px rgba(251,191,36,0.8)`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}
    </div>
  );
};

const Palmistry = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Helmet>
        <title>Palmistry Services - Palm Reading, Life Line Analysis | Astro Santosh Pandey</title>
        <meta name="description" content="Expert palmistry services including heart line, life line, fate line, marriage line, sun line reading, palm structure analysis, and personalized astrological remedies." />
        <link rel="canonical" href="https://astrosantoshpandey.com/palmistry" />
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
                  Palmistry – The Mirror of Destiny
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
                    कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती ।
                    <br />
                    करमूले तु गोविन्दः प्रभाते करदर्शनम्
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Your Palms Hold the{" "}
                  <span className="text-gradient-gold">Map of Your Destiny</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-4">
                  Discover the secrets written in your hands. Get detailed readings of your life lines,
                  personality traits, and future potential with powerful astrological remedies.
                </p>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                  Palmistry complements astrology, especially when birth details are unavailable. The palm reflects past karma, present actions, and future possibilities.
                </p>

                {/* ── MOBILE: full animated image between text and button ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex lg:hidden justify-center items-center mb-10"
                >
                  <PalmistryImage size="sm" />
                </motion.div>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                  onClick={() => setShowPopup(true)}
                >
                  Get Palm Reading Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              {/* Right: Palmistry Image — desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center"
              >
                <PalmistryImage size="lg" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Benefits Section ── */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                What <span className="text-gradient-gold">Palmistry</span> Reveals
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive insights into every aspect of your life through palm analysis
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palmistryBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 group hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Major Lines Section ── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Major <span className="text-gradient-gold">Palm Lines</span> Reading
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive analysis of all seven major lines revealing your complete life story
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {palmLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="cosmic-card p-8"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <line.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold">{line.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{line.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {line.features.map((feature, i) => (
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

        {/* ── Additional Services ── */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Additional <span className="text-gradient-gold">Palm Analysis</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Specialized services for complete palm structure and phalange analysis
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Remedies Section ── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Astrological <span className="text-gradient-gold">Remedies</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Personalized astrological solutions to overcome challenges and enhance positive potential revealed in your palms
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {remedyCategories.map((remedy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{remedy.title}</h3>
                    <p className="text-muted-foreground text-sm">{remedy.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Ready to Read <span className="text-gradient-gold">Your Destiny</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get your comprehensive palm reading today and discover what your hands
                reveal about your past, present, and future with personalized astrological remedies.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                onClick={() => setShowPopup(true)}
              >
                Get Palm Reading Now
              </Button>
            </motion.div>
          </div>
        </section>

      </Layout>

      {/* ── Palm Reading Info Popup ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                boxShadow: "0 0 60px rgba(212, 175, 55, 0.2), 0 25px 60px rgba(0,0,0,0.6)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
              />

              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.25)")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.1)")}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                  style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}
                >
                  <Hand className="w-8 h-8" style={{ color: "#D4AF37" }} />
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-2xl font-bold text-center mb-2"
                  style={{ color: "#D4AF37" }}
                >
                  Palm Reading Service
                </h3>

                <div
                  className="w-16 h-0.5 mx-auto mb-5"
                  style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
                />

                {/* Message */}
                <div
                  className="rounded-xl p-4 mb-6 text-center"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <p className="text-white/90 leading-relaxed text-base">
                    This is{" "}
                    <span className="font-semibold" style={{ color: "#D4AF37" }}>
                      'In Person Service by Appointment'
                    </span>{" "}
                    only for{" "}
                    <span
                      className="inline-flex items-center gap-1 font-semibold"
                      style={{ color: "#D4AF37" }}
                    >
                      <MapPin className="w-4 h-4" />
                      Mumbai
                    </span>{" "}
                    location.
                  </p>
                </div>

                {/* Contact info */}
                <p className="text-white/70 text-sm text-center mb-5">
                  For more details, please reach us at
                </p>
                <a
                  href="tel:+918879731174"
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-semibold text-base transition-all"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #F5D06A)",
                    color: "#1a0f2e",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(212,175,55,0.6)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <Phone className="w-5 h-5" />
                  +91 8879731174
                </a>

                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-4 w-full py-2 text-sm transition-colors rounded-lg"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)")}
                >
                  Close
                </button>
              </div>

              {/* Gold bottom accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Palmistry;