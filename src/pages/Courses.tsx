
// import { Helmet } from "react-helmet-async";
// import { Layout } from "@/components/layout/Layout";
// import { CosmicBackground } from "@/components/ui/CosmicBackground";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   BookOpen, Star, TrendingUp, User, ChevronRight,
//   CheckCircle2, Sparkles, GraduationCap
// } from "lucide-react";
// import CourseImg from "@/assets/CourseImg.jpeg";

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 }
//   })
// };

// const whyLearnItems = [
//   {
//     icon: BookOpen,
//     title: "Authentic Vedic Knowledge",
//     desc: "Learn astrology based on traditional Vedic principles and time-tested methodologies."
//   },
//   {
//     icon: TrendingUp,
//     title: "Structured Learning Path",
//     desc: "Courses are divided into Foundation, Intermediate, and Advanced levels to ensure progressive understanding."
//   },
//   {
//     icon: Star,
//     title: "Practical Horoscope Reading",
//     desc: "Understand how to interpret birth charts, yogas, planetary positions, and predictive combinations."
//   },
//   {
//     icon: User,
//     title: "Career & Personal Growth",
//     desc: "Use astrology for personal guidance, professional practice, or deeper spiritual understanding."
//   },
// ];

// const foundationTopics = [
//   "Introduction to Astrology",
//   "Understanding Lagna (Ascendant)",
//   "The 12 Houses in Astrology",
//   "Significations of Houses",
//   "Purushaarth: Dharma, Artha, Kama, Moksha",
//   "Types of Houses (Kendra, Trikona, Trishday etc.)",
//   "Introduction to Birth Chart",
//   "Introduction to 9 Planets and their Nature",
//   "Planetary Motion, Aspects & Avasthas",
//   "Planetary Friendship & Enmity",
//   "Exaltation, Debilitation & Mooltrikon",
//   "Introduction to 12 Zodiac Signs",
//   "Characteristics of Signs",
//   "Elements (Tatva) and Sign Nature",
//   "Body Parts & Zodiac Associations",
//   "Important Yogas in Astrology",
// ];

// const specialYogas = [
//   "Vesi Yoga", "Vasi Yoga", "Ubhayachari Yoga", "Budhaditya Yoga",
//   "Sunfa / Anfa / Durudhara Yoga", "Kemdrum Yoga", "Gajkesari Yoga",
//   "Chandradhi Yoga", "Amala Yoga", "Chandra Mangal Yoga",
// ];

// const panchMahapurushYogas = ["Ruchak", "Bhadra", "Hansa", "Malavya", "Shasha"];

// export const crashCourses = [
//   { title: "In-Depth Kundali Analysis",    desc: "Deep dive into reading and interpreting a complete birth chart." },
//   { title: "Vimshottari Dasha System",     desc: "Master the primary predictive timing system in Vedic astrology." },
//   { title: "Ashtakvarg Analysis",          desc: "Learn the Ashtakvarg method for transit and strength analysis." },
//   { title: "Planetary Conjunction",        desc: "Understand how planetary combinations affect life events." },
//   { title: "Career Prediction",            desc: "Techniques to analyse career, profession, and financial prospects." },
//   { title: "Medical Astrology",            desc: "Identify health patterns and disease tendencies through the chart." },
//   { title: "Child & Progeny Analysis",     desc: "Study of children, fertility, and parenting indicators in a chart." },
//   { title: "Retrograde Planets",           desc: "Understand the impact and interpretation of retrograde planets." },
//   { title: "Astrology Remedies",           desc: "Practical remedies including mantras, gemstones, and rituals." },
//   { title: "Gemstones & Crystals",         desc: "Selection and use of gemstones for planetary strengthening." },
//   { title: "Rudraksha Significance",       desc: "Types of Rudraksha beads and their astrological significance." },
// ];

// const learningSteps = [
//   { num: "1", title: "Choose Your Course", desc: "Select the course that matches your learning level." },
//   { num: "2", title: "Enroll Online",       desc: "Complete your registration and secure your seat." },
//   { num: "3", title: "Get Login Access",    desc: "Receive your course login credentials." },
//   { num: "4", title: "Start Learning",      desc: "Access course material, sessions, and practical learning modules." },
// ];

// /* ── Reusable course photo ───────────────────────────────────
//    Keeps the glow blobs, badge icons, and boxShadow identical
//    between mobile (w-64) and desktop (w-80 / xl:w-96).
//    ─────────────────────────────────────────────────────────── */
// const CoursePhoto = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
//   const imgClass =
//     size === "sm"
//       ? "relative z-10 w-64 h-auto object-cover object-top rounded-2xl border border-primary/30 shadow-2xl"
//       : "relative z-10 w-80 xl:w-96 h-auto object-cover object-top rounded-2xl border border-primary/30 shadow-2xl";

//   return (
//     <div className="relative">
//       {/* outer glow */}
//       <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-amber-400/40 via-yellow-300/25 to-transparent blur-2xl animate-pulse pointer-events-none" />
//       {/* inner glow */}
//       <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-amber-400/20 to-transparent blur-md pointer-events-none" />

//       <img
//         src={CourseImg}
//         alt="Astro Santosh Pandey - Vedic Astrology Courses"
//         className={imgClass}
//         style={{
//           boxShadow:
//             "0 0 40px rgba(251,191,36,0.25), 0 0 80px rgba(245,158,11,0.15), 0 25px 50px rgba(0,0,0,0.4)",
//         }}
//       />

//       {/* bottom-right star badge */}
//       <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center animate-twinkle">
//         <Star className="h-6 w-6 text-primary" />
//       </div>

//       {/* top-left book badge */}
//       <div
//         className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center animate-twinkle"
//         style={{ animationDelay: "1s" }}
//       >
//         <BookOpen className="h-5 w-5 text-accent" />
//       </div>
//     </div>
//   );
// };

// const Courses = () => {
//   return (
//     <Layout>
//       <Helmet>
//         <title>Vedic Astrology Courses – Learn Astrology Online | Cosmic Guidance</title>
//         <meta name="description" content="Learn Vedic Astrology with structured courses from Foundation to Advanced. Practical horoscope reading, Nakshatra astrology, transit analysis and more." />
//       </Helmet>

//       {/* ── Hero ── */}
//       <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
//         <CosmicBackground />
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-14 items-center">

//             {/* Left Content */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeUp}
//               custom={0}
//               className="space-y-6"
//             >
//               <span className="text-primary font-medium text-sm uppercase tracking-wider">
//                 Vedic Astrology Courses – Vidya Dhanam
//               </span>

//               {/* Shloka */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="relative mt-3 mb-6"
//               >
//                 <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//                 <div
//                   className="text-sm md:text-lg font-bold tracking-normal leading-loose text-left relative
//                     bg-[length:200%_auto] bg-gradient-to-r
//                     from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                     bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                     drop-shadow-[0_0_20px_rgba(251,191,36,0.95)] drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                   style={{
//                     textShadow:
//                       "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
//                   विद्याधनं सर्वधनं प्रधानम्
//                   <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//                 </div>
//               </motion.div>

//               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight max-w-2xl">
//                 Learn the <span className="text-gradient-gold">Sacred Science </span>
//                 <br className="hidden lg:block" />
//                 of Vedic Astrology
//               </h1>

//               <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
//                 Discover the timeless wisdom of astrology and learn how planetary movements
//                 influence human life. Our structured courses are designed to help beginners,
//                 enthusiasts, and aspiring astrologers understand horoscope analysis, planetary
//                 energies, and predictive techniques.
//               </p>

//               {/* ── MOBILE: course photo between text and buttons ── */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.7, delay: 0.25 }}
//                 className="flex lg:hidden justify-center items-center py-4"
//               >
//                 <CoursePhoto size="sm" />
//               </motion.div>

//               <div className="flex flex-wrap gap-4">
//                 <Button size="lg" className="glow-gold" asChild>
//                   <a href="#courses">
//                     <BookOpen className="mr-2 h-5 w-5" />Explore Courses
//                   </a>
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-primary/50 text-primary hover:bg-primary/10"
//                   asChild
//                 >
//                   <Link to="/pricing">
//                     <GraduationCap className="mr-2 h-5 w-5" />Enroll Now
//                   </Link>
//                 </Button>
//               </div>
//             </motion.div>

//             {/* Right — Course Photo (desktop only) */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7 }}
//               className="hidden lg:flex justify-center items-center"
//             >
//               <CoursePhoto size="lg" />
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ── Why Learn ── */}
//       <section className="py-20 bg-gradient-cosmic">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={0}
//             className="text-center mb-14"
//           >
//             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//               Why Learn <span className="text-gradient-gold">Astrology</span>
//             </h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               Unlock the ancient wisdom that has guided civilizations for millennia.
//             </p>
//           </motion.div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {whyLearnItems.map((item, i) => (
//               <motion.div
//                 key={item.title}
//                 initial="hidden" whileInView="visible" viewport={{ once: true }}
//                 variants={fadeUp} custom={i}
//                 className="cosmic-card p-6 text-center space-y-4 hover:border-primary/40 transition-colors"
//               >
//                 <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
//                   <item.icon className="h-7 w-7 text-primary" />
//                 </div>
//                 <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
//                 <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Courses Section ── */}
//       <section id="courses" className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={0}
//             className="text-center mb-14"
//           >
//             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//               Our Astrology <span className="text-gradient-gold">Courses</span>
//             </h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               From foundational knowledge to advanced mastery — choose the path that matches your learning journey.
//             </p>
//           </motion.div>

//           {/* Foundation */}
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={0}
//             className="cosmic-card p-8 md:p-10 mb-10"
//           >
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
//               <div>
//                 <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
//                   Foundation
//                 </span>
//                 <h3 className="font-serif text-2xl md:text-3xl font-bold">Basic / Foundation Course</h3>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="text-2xl font-bold text-gradient-gold">3 Months</p>
//               </div>
//             </div>
//             <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
//               Perfect for beginners who want to understand the fundamentals of Vedic astrology,
//               horoscope structure, planetary influences, and zodiac signs.
//             </p>
//             <h4 className="font-serif text-lg font-semibold mb-4">What You Will Learn</h4>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
//               {foundationTopics.map((t) => (
//                 <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
//                   <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
//                 </div>
//               ))}
//             </div>
//             <h4 className="font-serif text-lg font-semibold mb-3">Special Yogas Covered</h4>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
//               {specialYogas.map((y) => (
//                 <div key={y} className="flex items-start gap-2 text-sm text-muted-foreground">
//                   <Star className="h-4 w-4 text-primary shrink-0 mt-0.5" />{y}
//                 </div>
//               ))}
//             </div>
//             <h4 className="font-serif text-lg font-semibold mb-3">Panch Mahapurush Yogas</h4>
//             <div className="flex flex-wrap gap-3 mb-8">
//               {panchMahapurushYogas.map((y) => (
//                 <span key={y} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{y}</span>
//               ))}
//             </div>
//             <Button className="glow-gold" asChild>
//               <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
//             </Button>
//           </motion.div>

//           {/* Intermediate */}
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={1}
//             className="cosmic-card p-8 md:p-10 mb-10"
//           >
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
//               <div>
//                 <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
//                   Intermediate
//                 </span>
//                 <h3 className="font-serif text-2xl md:text-3xl font-bold">Intermediate Courses</h3>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="text-2xl font-bold text-gradient-gold">4 Months</p>
//               </div>
//             </div>
//             <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
//               Designed for students who already understand basic astrology and want to develop
//               predictive skills and chart interpretation techniques.
//             </p>
//             <div className="grid md:grid-cols-2 gap-8 mb-8">
//               <div className="bg-muted/30 rounded-lg p-6 space-y-3">
//                 <h4 className="font-serif text-xl font-semibold">Course 1 — Transit Analysis</h4>
//                 <p className="text-muted-foreground text-sm">
//                   Learn how planetary movements influence life events and how astrologers use transits
//                   to predict important periods.
//                 </p>
//                 <ul className="space-y-2">
//                   {[
//                     "Understanding planetary transits",
//                     "Transit impact on houses and planets",
//                     "Timing of events",
//                     "Practical prediction techniques",
//                     "Combining transit with birth chart analysis",
//                   ].map(t => (
//                     <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
//                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="bg-muted/30 rounded-lg p-6 space-y-3">
//                 <h4 className="font-serif text-xl font-semibold">Course 2 — Blank Chart Prediction</h4>
//                 <p className="text-muted-foreground text-sm">
//                   A powerful method used by astrologers to analyze life possibilities without relying
//                   on birth time accuracy.
//                 </p>
//                 <ul className="space-y-2">
//                   {[
//                     "Blank chart analysis techniques",
//                     "Understanding planetary placements",
//                     "Event possibility analysis",
//                     "Interpreting planetary relationships",
//                     "Practical case studies",
//                   ].map(t => (
//                     <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
//                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <Button className="glow-gold" asChild>
//               <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
//             </Button>
//           </motion.div>

//           {/* Advanced */}
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={2}
//             className="cosmic-card p-8 md:p-10 mb-10"
//           >
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
//               <div>
//                 <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
//                   Advanced
//                 </span>
//                 <h3 className="font-serif text-2xl md:text-3xl font-bold">Advanced / Expert Level Courses</h3>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="text-2xl font-bold text-gradient-gold">6 Months</p>
//               </div>
//             </div>
//             <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
//               Advanced training for serious astrology practitioners who want to master deep
//               analytical and predictive techniques.
//             </p>
//             <div className="grid md:grid-cols-2 gap-8 mb-8">
//               <div className="bg-muted/30 rounded-lg p-6 space-y-3">
//                 <h4 className="font-serif text-xl font-semibold">Nakshatra Astrology</h4>
//                 <p className="text-muted-foreground text-sm">
//                   Understand the deeper layer of astrology through the 27 Nakshatras and their
//                   influence on destiny, personality, and karmic patterns.
//                 </p>
//                 <ul className="space-y-2">
//                   {[
//                     "Introduction to Nakshatra system",
//                     "Characteristics of 27 Nakshatras",
//                     "Nakshatra based predictions",
//                     "Nakshatra and planetary relationships",
//                     "Practical horoscope analysis",
//                   ].map(t => (
//                     <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
//                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="bg-muted/30 rounded-lg p-6 space-y-3">
//                 <h4 className="font-serif text-xl font-semibold">Divisional Chart Analysis</h4>
//                 <p className="text-muted-foreground text-sm">
//                   Learn advanced horoscope interpretation through divisional charts used by
//                   professional astrologers.
//                 </p>
//                 <ul className="space-y-2">
//                   {[
//                     "Importance of divisional charts",
//                     "D9 (Navamsa) analysis",
//                     "D10 (Career analysis)",
//                     "Relationship & marriage indicators",
//                     "Spiritual and karmic charts",
//                   ].map(t => (
//                     <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
//                       <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <Button className="glow-gold" asChild>
//               <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
//             </Button>
//           </motion.div>

//           {/* Crash Courses */}
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={3}
//             className="cosmic-card p-8 md:p-10 mb-10"
//           >
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
//               <div>
//                 <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full mb-3">
//                   Crash Course
//                 </span>
//                 <h3 className="font-serif text-2xl md:text-3xl font-bold">Astrology Crash Courses</h3>
//               </div>
//               <div className="text-right shrink-0">
//                 <p className="text-2xl font-bold text-gradient-gold">
//                   1 Month <span className="text-base text-muted-foreground font-normal">/ course</span>
//                 </p>
//               </div>
//             </div>
//             <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
//               Short and focused courses designed for students who want to master specific astrology
//               topics quickly. These courses provide deep insights into specialized areas of horoscope
//               interpretation.
//             </p>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//               {crashCourses.map((course, i) => (
//                 <div
//                   key={i}
//                   className="bg-muted/30 rounded-xl p-4 border border-primary/10 hover:border-primary/30 transition-colors space-y-2"
//                 >
//                   <div className="flex items-start gap-2">
//                     <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
//                       <span className="text-[10px] font-bold text-primary">{i + 1}</span>
//                     </div>
//                     <h4 className="font-serif text-sm font-semibold text-foreground leading-tight">
//                       {course.title}
//                     </h4>
//                   </div>
//                   <p className="text-muted-foreground text-xs leading-relaxed pl-8">{course.desc}</p>
//                 </div>
//               ))}
//             </div>
//             <Button className="glow-gold" asChild>
//               <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
//             </Button>
//           </motion.div>

//         </div>
//       </section>

//       {/* ── How It Works ── */}
//       <section className="py-20 bg-gradient-cosmic">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={0}
//             className="text-center mb-14"
//           >
//             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//               How the Course <span className="text-gradient-gold">Works</span>
//             </h2>
//           </motion.div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {learningSteps.map((step, i) => (
//               <motion.div
//                 key={step.num}
//                 initial="hidden" whileInView="visible" viewport={{ once: true }}
//                 variants={fadeUp} custom={i}
//                 className="text-center space-y-4"
//               >
//                 <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto text-2xl font-bold text-primary">
//                   {step.num}
//                 </div>
//                 <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
//                 <p className="text-muted-foreground text-sm">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Final CTA ── */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 text-center max-w-2xl">
//           <motion.div
//             initial="hidden" whileInView="visible" viewport={{ once: true }}
//             variants={fadeUp} custom={0}
//             className="space-y-6"
//           >
//             <Sparkles className="h-10 w-10 text-primary mx-auto" />
//             <h2 className="font-serif text-3xl md:text-4xl font-bold">
//               Start Your Journey into <span className="text-gradient-gold">Astrology</span>
//             </h2>
//             <p className="text-muted-foreground leading-relaxed">
//               Whether you are a beginner or an experienced learner, our courses help you understand
//               the deep science of astrology and its practical applications in life.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-primary/50 text-primary hover:bg-primary/10"
//                 asChild
//               >
//                 <Link to="/pricing">View Pricing & Enroll</Link>
//               </Button>
//               <Button size="lg" className="glow-gold" asChild>
//                 <Link to="/pricing"><GraduationCap className="mr-2 h-5 w-5" />Enroll Now</Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//     </Layout>
//   );
// };

// export default Courses;


//testing

import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Star, TrendingUp, User, ChevronRight,
  CheckCircle2, Sparkles, GraduationCap
} from "lucide-react";
import CourseImg from "@/assets/CourseImg.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const whyLearnItems = [
  {
    icon: BookOpen,
    title: "Authentic Vedic Knowledge",
    desc: "Learn astrology based on traditional Vedic principles and time-tested methodologies."
  },
  {
    icon: TrendingUp,
    title: "Structured Learning Path",
    desc: "Courses are divided into Foundation, Intermediate, and Advanced levels to ensure progressive understanding."
  },
  {
    icon: Star,
    title: "Practical Horoscope Reading",
    desc: "Understand how to interpret birth charts, yogas, planetary positions, and predictive combinations."
  },
  {
    icon: User,
    title: "Career & Personal Growth",
    desc: "Use astrology for personal guidance, professional practice, or deeper spiritual understanding."
  },
];

const foundationTopics = [
  "Introduction to Astrology",
  "Understanding Lagna (Ascendant)",
  "The 12 Houses in Astrology",
  "Significations of Houses",
  "Purushaarth: Dharma, Artha, Kama, Moksha",
  "Types of Houses (Kendra, Trikona, Trishday etc.)",
  "Introduction to Birth Chart",
  "Introduction to 9 Planets and their Nature",
  "Planetary Motion, Aspects & Avasthas",
  "Planetary Friendship & Enmity",
  "Exaltation, Debilitation & Mooltrikon",
  "Introduction to 12 Zodiac Signs",
  "Characteristics of Signs",
  "Elements (Tatva) and Sign Nature",
  "Body Parts & Zodiac Associations",
  "Important Yogas in Astrology",
];

const specialYogas = [
  "Vesi Yoga", "Vasi Yoga", "Ubhayachari Yoga", "Budhaditya Yoga",
  "Sunfa / Anfa / Durudhara Yoga", "Kemdrum Yoga", "Gajkesari Yoga",
  "Chandradhi Yoga", "Amala Yoga", "Chandra Mangal Yoga",
];

const panchMahapurushYogas = ["Ruchak", "Bhadra", "Hansa", "Malavya", "Shasha"];

export const crashCourses = [
  { title: "In-Depth Kundali Analysis",    desc: "Deep dive into reading and interpreting a complete birth chart." },
  { title: "Vimshottari Dasha System",     desc: "Master the primary predictive timing system in Vedic astrology." },
  { title: "Ashtakvarg Analysis",          desc: "Learn the Ashtakvarg method for transit and strength analysis." },
  { title: "Planetary Conjunction",        desc: "Understand how planetary combinations affect life events." },
  { title: "Career Prediction",            desc: "Techniques to analyse career, profession, and financial prospects." },
  { title: "Medical Astrology",            desc: "Identify health patterns and disease tendencies through the chart." },
  { title: "Child & Progeny Analysis",     desc: "Study of children, fertility, and parenting indicators in a chart." },
  { title: "Retrograde Planets",           desc: "Understand the impact and interpretation of retrograde planets." },
  { title: "Astrology Remedies",           desc: "Practical remedies including mantras, gemstones, and rituals." },
  { title: "Gemstones & Crystals",         desc: "Selection and use of gemstones for planetary strengthening." },
  { title: "Rudraksha Significance",       desc: "Types of Rudraksha beads and their astrological significance." },
];

const learningSteps = [
  { num: "1", title: "Choose Your Course", desc: "Select the course that matches your learning level." },
  { num: "2", title: "Enroll Online",       desc: "Complete your registration and secure your seat." },
  { num: "3", title: "Get Login Access",    desc: "Receive your course login credentials." },
  { num: "4", title: "Start Learning",      desc: "Access course material, sessions, and practical learning modules." },
];

/* ── Session Badge ────────────────────────────────────────────── */
const SessionBadge = ({ sessions, duration }: { sessions: string; duration: string }) => (
  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-2 mb-6">
    <div className="flex items-center gap-1.5">
      <Star className="w-3.5 h-3.5 text-primary shrink-0" />
      <span className="text-sm font-bold text-primary">{sessions} Sessions</span>
    </div>
    <span className="text-primary/30">|</span>
    <span className="text-sm text-muted-foreground font-medium">{duration}</span>
  </div>
);

/* ── Reusable course photo ─────────────────────────────────────── */
const CoursePhoto = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const imgClass =
    size === "sm"
      ? "relative z-10 w-64 h-auto object-cover object-top rounded-2xl border border-primary/30 shadow-2xl"
      : "relative z-10 w-80 xl:w-96 h-auto object-cover object-top rounded-2xl border border-primary/30 shadow-2xl";

  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-amber-400/40 via-yellow-300/25 to-transparent blur-2xl animate-pulse pointer-events-none" />
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-amber-400/20 to-transparent blur-md pointer-events-none" />
      <img
        src={CourseImg}
        alt="Astro Santosh Pandey - Vedic Astrology Courses"
        className={imgClass}
        style={{
          boxShadow:
            "0 0 40px rgba(251,191,36,0.25), 0 0 80px rgba(245,158,11,0.15), 0 25px 50px rgba(0,0,0,0.4)",
        }}
      />
      <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center animate-twinkle">
        <Star className="h-6 w-6 text-primary" />
      </div>
      <div
        className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center animate-twinkle"
        style={{ animationDelay: "1s" }}
      >
        <BookOpen className="h-5 w-5 text-accent" />
      </div>
    </div>
  );
};

const Courses = () => {
  return (
    <Layout>
      <Helmet>
        <title>Vedic Astrology Courses – Learn Astrology Online | Cosmic Guidance</title>
        <meta name="description" content="Learn Vedic Astrology with structured courses from Foundation to Advanced. Practical horoscope reading, Nakshatra astrology, transit analysis and more." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <CosmicBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="space-y-6"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Vedic Astrology Courses – Vidya Dhanam
              </span>
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
                    drop-shadow-[0_0_20px_rgba(251,191,36,0.95)] drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                  style={{
                    textShadow:
                      "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                  विद्याधनं सर्वधनं प्रधानम्
                  <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                </div>
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight max-w-2xl">
                Learn the <span className="text-gradient-gold">Sacred Science </span>
                <br className="hidden lg:block" />
                of Vedic Astrology
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Discover the timeless wisdom of astrology and learn how planetary movements
                influence human life. Our structured courses are designed to help beginners,
                enthusiasts, and aspiring astrologers understand horoscope analysis, planetary
                energies, and predictive techniques.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="flex lg:hidden justify-center items-center py-4"
              >
                <CoursePhoto size="sm" />
              </motion.div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="glow-gold" asChild>
                  <a href="#courses">
                    <BookOpen className="mr-2 h-5 w-5" />Explore Courses
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to="/pricing">
                    <GraduationCap className="mr-2 h-5 w-5" />Enroll Now
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:flex justify-center items-center"
            >
              <CoursePhoto size="lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Learn ── */}
      <section className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Why Learn <span className="text-gradient-gold">Astrology</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock the ancient wisdom that has guided civilizations for millennia.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyLearnItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="cosmic-card p-6 text-center space-y-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Section ── */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Our Astrology <span className="text-gradient-gold">Courses</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From foundational knowledge to advanced mastery — choose the path that matches your learning journey.
            </p>
          </motion.div>

          {/* Foundation */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="cosmic-card p-8 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  Foundation
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Basic / Foundation Course</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-gradient-gold">3 Months</p>
              </div>
            </div>

            {/* ── SESSION BADGE ── */}
            <SessionBadge sessions="12" duration="3 Months" />

            <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Perfect for beginners who want to understand the fundamentals of Vedic astrology,
              horoscope structure, planetary influences, and zodiac signs.
            </p>
            <h4 className="font-serif text-lg font-semibold mb-4">What You Will Learn</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {foundationTopics.map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                </div>
              ))}
            </div>
            <h4 className="font-serif text-lg font-semibold mb-3">Special Yogas Covered</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {specialYogas.map((y) => (
                <div key={y} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary shrink-0 mt-0.5" />{y}
                </div>
              ))}
            </div>
            <h4 className="font-serif text-lg font-semibold mb-3">Panch Mahapurush Yogas</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {panchMahapurushYogas.map((y) => (
                <span key={y} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{y}</span>
              ))}
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
            </Button>
          </motion.div>

          {/* Intermediate */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={1}
            className="cosmic-card p-8 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  Intermediate
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Intermediate Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-gradient-gold">4 Months</p>
              </div>
            </div>

            {/* ── SESSION BADGE ── */}
            <SessionBadge sessions="16" duration="4 Months / Per Course" />

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Designed for students who already understand basic astrology and want to develop
              predictive skills and chart interpretation techniques.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Course 1 — Transit Analysis</h4>
                <p className="text-muted-foreground text-sm">
                  Learn how planetary movements influence life events and how astrologers use transits
                  to predict important periods.
                </p>
                <ul className="space-y-2">
                  {[
                    "Understanding planetary transits",
                    "Transit impact on houses and planets",
                    "Timing of events",
                    "Practical prediction techniques",
                    "Combining transit with birth chart analysis",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Course 2 — Blank Chart Prediction</h4>
                <p className="text-muted-foreground text-sm">
                  A powerful method used by astrologers to analyze life possibilities without relying
                  on birth time accuracy.
                </p>
                <ul className="space-y-2">
                  {[
                    "Blank chart analysis techniques",
                    "Understanding planetary placements",
                    "Event possibility analysis",
                    "Interpreting planetary relationships",
                    "Practical case studies",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
            </Button>
          </motion.div>

          {/* Advanced */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={2}
            className="cosmic-card p-8 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  Advanced
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Advanced / Expert Level Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-gradient-gold">6 Months</p>
              </div>
            </div>

            {/* ── SESSION BADGE ── */}
            <SessionBadge sessions="24" duration="6 Months / Per Course" />

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Advanced training for serious astrology practitioners who want to master deep
              analytical and predictive techniques.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Nakshatra Astrology</h4>
                <p className="text-muted-foreground text-sm">
                  Understand the deeper layer of astrology through the 27 Nakshatras and their
                  influence on destiny, personality, and karmic patterns.
                </p>
                <ul className="space-y-2">
                  {[
                    "Introduction to Nakshatra system",
                    "Characteristics of 27 Nakshatras",
                    "Nakshatra based predictions",
                    "Nakshatra and planetary relationships",
                    "Practical horoscope analysis",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                <h4 className="font-serif text-xl font-semibold">Divisional Chart Analysis</h4>
                <p className="text-muted-foreground text-sm">
                  Learn advanced horoscope interpretation through divisional charts used by
                  professional astrologers.
                </p>
                <ul className="space-y-2">
                  {[
                    "Importance of divisional charts",
                    "D9 (Navamsa) analysis",
                    "D10 (Career analysis)",
                    "Relationship & marriage indicators",
                    "Spiritual and karmic charts",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
            </Button>
          </motion.div>

          {/* Crash Courses */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={3}
            className="cosmic-card p-8 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full mb-3">
                  Crash Course
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Astrology Crash Courses</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-gradient-gold">
                  1 Month <span className="text-base text-muted-foreground font-normal">/ course</span>
                </p>
              </div>
            </div>

            {/* ── SESSION BADGE ── */}
            <SessionBadge sessions="4" duration="1 Month / Per Course" />

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Short and focused courses designed for students who want to master specific astrology
              topics quickly. These courses provide deep insights into specialized areas of horoscope
              interpretation.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {crashCourses.map((course, i) => (
                <div
                  key={i}
                  className="bg-muted/30 rounded-xl p-4 border border-primary/10 hover:border-primary/30 transition-colors space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-foreground leading-tight">
                      {course.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed pl-8">{course.desc}</p>
                </div>
              ))}
            </div>
            <Button className="glow-gold" asChild>
              <Link to="/pricing"><ChevronRight className="mr-2 h-4 w-4" />View Pricing & Enroll</Link>
            </Button>
          </motion.div>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              How the Course <span className="text-gradient-gold">Works</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                  {step.num}
                </div>
                <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="space-y-6"
          >
            <Sparkles className="h-10 w-10 text-primary mx-auto" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Start Your Journey into <span className="text-gradient-gold">Astrology</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a beginner or an experienced learner, our courses help you understand
              the deep science of astrology and its practical applications in life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                asChild
              >
                <Link to="/pricing">View Pricing & Enroll</Link>
              </Button>
              <Button size="lg" className="glow-gold" asChild>
                <Link to="/pricing"><GraduationCap className="mr-2 h-5 w-5" />Enroll Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Courses;