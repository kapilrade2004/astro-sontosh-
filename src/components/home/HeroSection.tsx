// import { motion } from "framer-motion";
// import { CosmicBackground } from "@/components/ui/CosmicBackground";
// import LOGO from "@/assets/logo by yash.png";
// import HeroImg from "@/assets/HeroImg.jpeg";

// /* ── animation presets ─────────────────────────────────────── */
// const ease = [0.22, 1, 0.36, 1] as const;

// const fadeLeft = (delay = 0) => ({
//   initial: { opacity: 0, x: -40 },
//   animate: { opacity: 1, x: 0 },
//   transition: { duration: 0.8, delay, ease },
// });

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 28 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.8, delay, ease },
// });

// const fadeScale = (delay = 0) => ({
//   initial: { opacity: 0, scale: 0.88 },
//   animate: { opacity: 1, scale: 1 },
//   transition: { duration: 0.85, delay, ease },
// });

// /* ── decorative zodiac glyphs (bg atmosphere) ──────────────── */
// const GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

// export const HeroSection = () => {
//   return (
//     <section
//       className="relative w-full overflow-hidden bg-gradient-hero"
//       style={{ paddingTop: "var(--navbar-height, 80px)" }}
//     >
//       {/* ── backgrounds ── */}
//       <CosmicBackground />

//       {/* deep centre glow */}
//       <div
//         className="pointer-events-none absolute inset-0 z-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)",
//         }}
//       />

//       {/* faint left-side violet glow */}
//       <div
//         className="pointer-events-none absolute inset-0 z-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 50% 70% at -5% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)",
//         }}
//       />

//       {/* faint right-side gold glow */}
//       <div
//         className="pointer-events-none absolute inset-0 z-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)",
//         }}
//       />

//       {/* ── floating zodiac glyphs ── */}
//       {GLYPHS.map((g, i) => (
//         <motion.span
//           key={i}
//           className="pointer-events-none absolute select-none font-serif"
//           style={{
//             top:      `${6  + ((i * 73) % 82)}%`,
//             left:     `${2  + ((i * 61) % 95)}%`,
//             fontSize: `${28 + ((i * 17) % 28)}px`,
//             color:    `rgba(251,191,36,${0.03 + (i % 3) * 0.015})`,
//           }}
//           animate={{ y: [0, -12, 0], opacity: [0.03, 0.09, 0.03] }}
//           transition={{ duration: 7 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
//         >
//           {g}
//         </motion.span>
//       ))}

//       {/* ── top gold divider ── */}
//       <div className="relative z-10 mx-auto px-6 lg:px-10 mt-5 lg:mt-7" style={{ maxWidth: "90rem" }}>
//         <motion.div
//           initial={{ scaleX: 0, opacity: 0 }}
//           animate={{ scaleX: 1, opacity: 1 }}
//           transition={{ duration: 1.1, ease }}
//           className="h-px origin-center"
//           style={{
//             background:
//               "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 15%, rgba(251,191,36,0.6) 50%, rgba(251,191,36,0.12) 85%, transparent 100%)",
//           }}
//         />
//       </div>

//       {/* ══════════════════════════════════════════════════════
//           MOBILE: stacked column  |  DESKTOP: 3-column grid
//          ══════════════════════════════════════════════════════ */}
//       <div
//         className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-12"
//         style={{ maxWidth: "90rem" }}
//       >

//         {/* ── MOBILE layout (hidden on lg+) ── */}
//         <div className="flex flex-col items-center gap-6 lg:hidden">

//           {/* Logo + shloka centred on mobile */}
//           <motion.div
//             {...fadeScale(0.1)}
//             className="flex flex-col items-center gap-2 w-full"
//           >
//             <div className="relative flex items-center justify-center">
//               {/* Ambient glow behind logo */}
//               <div
//                 className="pointer-events-none absolute rounded-full blur-2xl"
//                 style={{
//                   width: 240, height: 240,
//                   background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
//                 }}
//               />
//               <motion.img
//                 src={LOGO}
//                 alt="Astro Santosh Pandey Logo"
//                 className="relative z-10 h-auto object-contain"
//                 style={{
//                   width: 200,
//                   // KEY FIX: "screen" blend mode makes the dark JPEG background
//                   // invisible so only the gold lion/zodiac artwork shines through —
//                   // matching exactly how the logo looks in the screenshot.
//                   mixBlendMode: "screen",
//                   filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
//                 }}
//                 animate={{ y: [-5, 0, -5] }}
//                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//               />
//             </div>

//             {/* shloka */}
//             <motion.div {...fadeUp(0.32)} className="relative w-full text-center">
//               <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//               <div
//                 className="text-sm font-bold tracking-normal leading-loose text-center relative
//                   bg-[length:200%_auto] bg-gradient-to-r
//                   from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                   bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                   drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                   drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                 style={{
//                   textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                 }}
//               >
//                 <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
//                 धर्मो रक्षति रक्षितः
//                 <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Headline + subtext below logo on mobile */}
//           <motion.div
//             {...fadeLeft(0.2)}
//             className="flex flex-col items-start w-full"
//           >
//             <motion.h1
//               {...fadeLeft(0.15)}
//               className="font-serif font-bold leading-[1.15] mb-4 text-3xl sm:text-4xl"
//             >
//               Transform Your Life{" "}
//               <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
//               <span
//                 className="block bg-clip-text text-transparent"
//                 style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
//               >
//                 Astrology, Numerology,
//               </span>
//               <span
//                 className="block bg-clip-text text-transparent"
//                 style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
//               >
//                 Vastu &amp; Palmistry
//               </span>
//               <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
//             </motion.h1>

//             <motion.div
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "4rem", opacity: 1 }}
//               transition={{ duration: 0.9, delay: 0.32, ease }}
//               className="h-px mb-4 flex-shrink-0"
//               style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
//             />

//             <motion.p
//               {...fadeLeft(0.38)}
//               className="leading-relaxed text-sm sm:text-base"
//               style={{ color: "rgba(255,255,255,0.58)" }}
//             >
//               Accurate predictions, personalised remedies, and life-changing
//               solutions for career, marriage, finance, health &amp; peace.
//             </motion.p>
//           </motion.div>

//           {/* ── MOBILE: Astrologer Photo ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.85, delay: 0.3, ease }}
//             className="flex justify-center items-center w-full"
//           >
//             <div className="relative flex items-center justify-center">

//               {/* background glow blob */}
//               <div
//                 className="pointer-events-none absolute rounded-full blur-3xl"
//                 style={{
//                   width: 280,
//                   height: 280,
//                   background:
//                     "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
//                 }}
//               />

//               {/* pulsing rings */}
//               {[
//                 { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
//                 { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
//                 { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
//               ].map((r, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute rounded-full border pointer-events-none"
//                   animate={{ scale: r.s, opacity: r.o }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
//                   style={{
//                     width: 220,
//                     height: 220,
//                     borderColor: r.color,
//                   }}
//                 />
//               ))}

//               {/* floating image container */}
//               <motion.div
//                 animate={{ y: [-7, 0, -7] }}
//                 transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative z-10"
//               >
//                 {/* corner brackets */}
//                 {[
//                   { top: -10, left:  -10, borderTop:    "1.5px solid", borderLeft:   "1.5px solid" },
//                   { top: -10, right: -10, borderTop:    "1.5px solid", borderRight:  "1.5px solid" },
//                   { bottom: -10, left:  -10, borderBottom: "1.5px solid", borderLeft:  "1.5px solid" },
//                   { bottom: -10, right: -10, borderBottom: "1.5px solid", borderRight: "1.5px solid" },
//                 ].map((c, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 + i * 0.08 }}
//                     className="absolute pointer-events-none"
//                     style={{ ...c, width: 22, height: 22, borderColor: "rgba(251,191,36,0.75)", borderRadius: 3 }}
//                   />
//                 ))}

//                 <div
//                   className="relative rounded-2xl overflow-hidden"
//                   style={{
//                     background: "#06060f",
//                     boxShadow: [
//                       "0 0 0 1px rgba(251,191,36,0.38)",
//                       "0 0 28px rgba(251,191,36,0.15)",
//                       "0 0 70px rgba(251,191,36,0.07)",
//                       "inset 0 1px 0 rgba(255,255,255,0.04)",
//                       "0 32px 64px rgba(0,0,0,0.6)",
//                     ].join(", "),
//                   }}
//                 >
//                   <img
//                     src={HeroImg}
//                     alt="Astro Santosh Pandey"
//                     className="block h-auto object-cover object-top"
//                     style={{
//                       width: "260px",
//                       mixBlendMode: "screen",
//                       filter: "brightness(0.94) contrast(1.09) saturate(1.06)",
//                     }}
//                   />
//                   <div
//                     className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
//                     style={{
//                       background:
//                         "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 70%)",
//                     }}
//                   />
//                   <div
//                     className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
//                     style={{
//                       background: "linear-gradient(to top, rgba(6,6,15,0.96) 0%, transparent 100%)",
//                     }}
//                   />
//                 </div>
//               </motion.div>

//               {/* sparkle dots */}
//               {[
//                 { top: "9%",  left:  "1%",  size: 5, delay: 0.0 },
//                 { top: "22%", right: "3%",  size: 4, delay: 0.8 },
//                 { top: "48%", left:  "-1%", size: 6, delay: 1.6 },
//                 { top: "68%", right: "2%",  size: 4, delay: 0.4 },
//                 { top: "82%", left:  "5%",  size: 3, delay: 2.0 },
//                 { top: "33%", right: "0%",  size: 5, delay: 1.2 },
//                 { top: "58%", left:  "6%",  size: 3, delay: 2.4 },
//               ].map((s, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute rounded-full pointer-events-none"
//                   style={{
//                     width:      s.size,
//                     height:     s.size,
//                     top:        s.top,
//                     left:       "left"  in s ? s.left  : undefined,
//                     right:      "right" in s ? s.right : undefined,
//                     background: "rgba(251,191,36,0.85)",
//                     boxShadow:  `0 0 ${s.size * 3}px rgba(251,191,36,0.9)`,
//                   }}
//                   animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
//                   transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//           {/* ── END MOBILE: Astrologer Photo ── */}

//         </div>

//         {/* ── DESKTOP layout (hidden below lg) ── */}
//         <div
//           className="hidden lg:grid items-center gap-x-8 lg:gap-x-14"
//           style={{ gridTemplateColumns: "1fr auto 1fr" }}
//         >

//           {/* COL 1 — Headline + Subtext */}
//           <div className="flex flex-col items-start">
//             <motion.h1
//               {...fadeLeft(0.15)}
//               className="font-serif font-bold leading-[1.13] mb-5 lg:mb-6"
//               style={{ fontSize: "clamp(1.6rem, 3vw, 3.2rem)" }}
//             >
//               Transform Your Life{" "}
//               <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
//               <span
//                 className="block bg-clip-text text-transparent"
//                 style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
//               >
//                 Astrology, Numerology,
//               </span>
//               <span
//                 className="block bg-clip-text text-transparent"
//                 style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
//               >
//                 Vastu &amp; Palmistry
//               </span>
//               <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
//             </motion.h1>

//             <motion.div
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: "5rem", opacity: 1 }}
//               transition={{ duration: 0.9, delay: 0.32, ease }}
//               className="h-px mb-5 lg:mb-6 flex-shrink-0"
//               style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
//             />

//             <motion.p
//               {...fadeLeft(0.38)}
//               className="leading-relaxed"
//               style={{
//                 fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
//                 color: "rgba(255,255,255,0.58)",
//                 maxWidth: "24rem",
//               }}
//             >
//               Accurate predictions, personalised remedies, and life-changing
//               solutions for career, marriage, finance, health &amp; peace.
//             </motion.p>

//             <motion.div {...fadeUp(0.48)} className="mt-7 lg:mt-9 flex flex-wrap gap-3" />
//           </div>

//           {/* COL 2 — Logo + Shloka */}
//           <motion.div
//             {...fadeScale(0.1)}
//             className="flex flex-col items-center gap-3"
//             style={{ minWidth: "clamp(280px, 30vw, 440px)" }}
//           >
//             <div className="relative flex items-center justify-center">
//               {/* Stronger ambient glow to complement gold logo */}
//               <div
//                 className="pointer-events-none absolute rounded-full blur-2xl"
//                 style={{
//                   width:  "clamp(300px, 32vw, 480px)",
//                   height: "clamp(300px, 32vw, 480px)",
//                   background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
//                 }}
//               />
//               <motion.img
//                 src={LOGO}
//                 alt="Astro Santosh Pandey Logo"
//                 className="relative z-10 h-auto object-contain"
//                 style={{
//                   width: "clamp(260px, 28vw, 420px)",
//                   // KEY FIX: "screen" blend mode knocks out the dark JPEG background
//                   // so only the vivid gold lion and zodiac ring are visible —
//                   // perfectly matching the screenshot's gold-on-dark aesthetic.
//                   mixBlendMode: "screen",
//                   filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
//                 }}
//                 animate={{ y: [-6, 0, -6] }}
//                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//               />
//             </div>

//             <motion.div {...fadeUp(0.32)} className="relative mt-3 mb-2">
//               <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//               <div
//                 className="text-sm md:text-lg font-bold tracking-normal leading-loose text-center relative
//                   bg-[length:200%_auto] bg-gradient-to-r
//                   from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                   bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                   drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                   drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                 style={{
//                   textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                 }}
//               >
//                 <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
//                 धर्मो रक्षति रक्षितः
//                 <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* COL 3 — Astrologer Photo */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.85, delay: 0.18, ease }}
//             className="flex justify-end items-start"
//           >
//             <div className="relative flex items-center justify-center">

//               <div
//                 className="pointer-events-none absolute rounded-full blur-3xl"
//                 style={{
//                   width:  "clamp(240px, 28vw, 500px)",
//                   height: "clamp(240px, 28vw, 500px)",
//                   background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
//                 }}
//               />

//               {[
//                 { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
//                 { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
//                 { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
//               ].map((r, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute rounded-full border pointer-events-none"
//                   animate={{ scale: r.s, opacity: r.o }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
//                   style={{
//                     width:       "clamp(200px, 22vw, 370px)",
//                     height:      "clamp(200px, 22vw, 370px)",
//                     borderColor: r.color,
//                   }}
//                 />
//               ))}

//               <motion.div
//                 animate={{ y: [-7, 0, -7] }}
//                 transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative z-10"
//               >
//                 {[
//                   { top: -10, left:  -10, borderTop:    "1.5px solid", borderLeft:   "1.5px solid" },
//                   { top: -10, right: -10, borderTop:    "1.5px solid", borderRight:  "1.5px solid" },
//                   { bottom: -10, left:  -10, borderBottom: "1.5px solid", borderLeft:  "1.5px solid" },
//                   { bottom: -10, right: -10, borderBottom: "1.5px solid", borderRight: "1.5px solid" },
//                 ].map((c, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.6 + i * 0.08 }}
//                     className="absolute pointer-events-none"
//                     style={{ ...c, width: 22, height: 22, borderColor: "rgba(251,191,36,0.75)", borderRadius: 3 }}
//                   />
//                 ))}

//                 <div
//                   className="relative rounded-2xl overflow-hidden"
//                   style={{
//                     background: "#06060f",
//                     boxShadow: [
//                       "0 0 0 1px rgba(251,191,36,0.38)",
//                       "0 0 28px rgba(251,191,36,0.15)",
//                       "0 0 70px rgba(251,191,36,0.07)",
//                       "inset 0 1px 0 rgba(255,255,255,0.04)",
//                       "0 32px 64px rgba(0,0,0,0.6)",
//                     ].join(", "),
//                   }}
//                 >
//                   <img
//                     src={HeroImg}
//                     alt="Astro Santosh Pandey"
//                     className="block h-auto object-cover object-top"
//                     style={{
//                       width:        "clamp(215px, 24vw, 380px)",
//                       mixBlendMode: "screen",
//                       filter:       "brightness(0.94) contrast(1.09) saturate(1.06)",
//                     }}
//                   />
//                   <div
//                     className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
//                     style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 70%)" }}
//                   />
//                   <div
//                     className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
//                     style={{ background: "linear-gradient(to top, rgba(6,6,15,0.96) 0%, transparent 100%)" }}
//                   />
//                 </div>
//               </motion.div>

//               {[
//                 { top: "9%",  left:  "1%",  size: 5, delay: 0.0 },
//                 { top: "22%", right: "3%",  size: 4, delay: 0.8 },
//                 { top: "48%", left:  "-1%", size: 6, delay: 1.6 },
//                 { top: "68%", right: "2%",  size: 4, delay: 0.4 },
//                 { top: "82%", left:  "5%",  size: 3, delay: 2.0 },
//                 { top: "33%", right: "0%",  size: 5, delay: 1.2 },
//                 { top: "58%", left:  "6%",  size: 3, delay: 2.4 },
//               ].map((s, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute rounded-full pointer-events-none"
//                   style={{
//                     width:      s.size,
//                     height:     s.size,
//                     top:        s.top,
//                     left:       "left"  in s ? s.left  : undefined,
//                     right:      "right" in s ? s.right : undefined,
//                     background: "rgba(251,191,36,0.85)",
//                     boxShadow:  `0 0 ${s.size * 3}px rgba(251,191,36,0.9)`,
//                   }}
//                   animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
//                   transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//         </div>
//       </div>

//       {/* ── bottom gold divider ── */}
//       <div className="relative z-10 mx-auto px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
//         <motion.div
//           initial={{ scaleX: 0, opacity: 0 }}
//           animate={{ scaleX: 1, opacity: 1 }}
//           transition={{ duration: 1.1, delay: 0.5, ease }}
//           className="h-px origin-center"
//           style={{
//             background:
//               "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)",
//           }}
//         />
//       </div>

//       {/* ── scroll indicator ── */}
//       <motion.div
//         className="relative z-10 flex justify-center py-5"
//         animate={{ y: [0, 7, 0] }}
//         transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <div className="flex flex-col items-center gap-1">
//           <div
//             className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
//             style={{ borderColor: "rgba(251,191,36,0.3)" }}
//           >
//             <motion.div
//               className="w-[3px] h-2.5 rounded-full"
//               style={{ background: "rgba(251,191,36,0.65)" }}
//               animate={{ y: [0, 10, 0], opacity: [1, 0.25, 1] }}
//               transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };


//testing



import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import LOGO from "@/assets/logo by yash.png";
import HeroImg from "@/assets/HeroImgg.jpeg";

/* ── animation presets ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

const fadeScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.85, delay, ease },
});

/* ── decorative zodiac glyphs (bg atmosphere) ──────────────── */
const GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-hero"
      style={{ paddingTop: "var(--navbar-height, 80px)" }}
    >
      {/* ── backgrounds ── */}
      <CosmicBackground />

      {/* deep centre glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)",
        }}
      />

      {/* faint left-side violet glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at -5% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)",
        }}
      />

      {/* faint right-side gold glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── floating zodiac glyphs ── */}
      {GLYPHS.map((g, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none font-serif"
          style={{
            top:      `${6  + ((i * 73) % 82)}%`,
            left:     `${2  + ((i * 61) % 95)}%`,
            fontSize: `${28 + ((i * 17) % 28)}px`,
            color:    `rgba(251,191,36,${0.03 + (i % 3) * 0.015})`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.03, 0.09, 0.03] }}
          transition={{ duration: 7 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
        >
          {g}
        </motion.span>
      ))}

      {/* ── top gold divider ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10 mt-5 lg:mt-7" style={{ maxWidth: "90rem" }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
          className="h-px origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 15%, rgba(251,191,36,0.6) 50%, rgba(251,191,36,0.12) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE: stacked column  |  DESKTOP: 3-column grid
         ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-12"
        style={{ maxWidth: "90rem" }}
      >

        {/* ── MOBILE layout (hidden on lg+) ── */}
        <div className="flex flex-col items-center gap-6 lg:hidden">

          {/* Logo + shloka centred on mobile */}
          <motion.div
            {...fadeScale(0.1)}
            className="flex flex-col items-center gap-2 w-full"
          >
            <div className="relative flex items-center justify-center">
              {/* Ambient glow behind logo */}
              <div
                className="pointer-events-none absolute rounded-full blur-2xl"
                style={{
                  width: 240, height: 240,
                  background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
                }}
              />
              <motion.img
                src={LOGO}
                alt="Astro Santosh Pandey Logo"
                className="relative z-10 h-auto object-contain"
                style={{
                  width: 200,
                  mixBlendMode: "screen",
                  filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                }}
                animate={{ y: [-5, 0, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* shloka */}
            <motion.div {...fadeUp(0.32)} className="relative w-full text-center">
              <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
              <div
                className="text-sm font-bold tracking-normal leading-loose text-center relative
                  bg-[length:200%_auto] bg-gradient-to-r
                  from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                  bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                  drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                  drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                style={{
                  textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
                }}
              >
                <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                धर्मो रक्षति रक्षितः
                <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Headline + subtext below logo on mobile */}
          <motion.div
            {...fadeLeft(0.2)}
            className="flex flex-col items-start w-full"
          >
            <motion.h1
              {...fadeLeft(0.15)}
              className="font-serif font-bold leading-[1.15] mb-4 text-3xl sm:text-4xl"
            >
              Transform Your Life{" "}
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
              >
                Astrology, Numerology,
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
              >
                Vastu &amp; Palmistry
              </span>
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "4rem", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              className="h-px mb-4 flex-shrink-0"
              style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
            />

            <motion.p
              {...fadeLeft(0.38)}
              className="leading-relaxed text-sm sm:text-base"
              style={{ color: "rgba(255,255,255,0.58)" }}
            >
              Accurate predictions, personalised remedies, and life-changing
              solutions for career, marriage, finance, health &amp; peace.
            </motion.p>
          </motion.div>

          {/* ── MOBILE: Astrologer Photo ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease }}
            className="flex justify-center items-center w-full"
          >
            <div className="relative flex items-center justify-center">

              {/* background glow blob */}
              <div
                className="pointer-events-none absolute rounded-full blur-3xl"
                style={{
                  width: 280,
                  height: 280,
                  background:
                    "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
                }}
              />

              {/* pulsing rings */}
              {[
                { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
                { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
                { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border pointer-events-none"
                  animate={{ scale: r.s, opacity: r.o }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
                  style={{
                    width: 220,
                    height: 220,
                    borderColor: r.color,
                  }}
                />
              ))}

              {/* floating image container — corner brackets REMOVED */}
              <motion.div
                animate={{ y: [-7, 0, -7] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "#06060f",
                    boxShadow: [
                      "0 0 0 1px rgba(251,191,36,0.38)",
                      "0 0 28px rgba(251,191,36,0.15)",
                      "0 0 70px rgba(251,191,36,0.07)",
                      "inset 0 1px 0 rgba(255,255,255,0.04)",
                      "0 32px 64px rgba(0,0,0,0.6)",
                    ].join(", "),
                  }}
                >
                  <img
                    src={HeroImg}
                    alt="Astro Santosh Pandey"
                    className="block h-auto object-cover object-top"
                    style={{
                      width: "260px",
                      mixBlendMode: "screen",
                      filter: "brightness(0.94) contrast(1.09) saturate(1.06)",
                    }}
                  />
                  <div
                    className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(to top, rgba(6,6,15,0.96) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </motion.div>

              {/* sparkle dots */}
              {[
                { top: "9%",  left:  "1%",  size: 5, delay: 0.0 },
                { top: "22%", right: "3%",  size: 4, delay: 0.8 },
                { top: "48%", left:  "-1%", size: 6, delay: 1.6 },
                { top: "68%", right: "2%",  size: 4, delay: 0.4 },
                { top: "82%", left:  "5%",  size: 3, delay: 2.0 },
                { top: "33%", right: "0%",  size: 5, delay: 1.2 },
                { top: "58%", left:  "6%",  size: 3, delay: 2.4 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width:      s.size,
                    height:     s.size,
                    top:        s.top,
                    left:       "left"  in s ? s.left  : undefined,
                    right:      "right" in s ? s.right : undefined,
                    background: "rgba(251,191,36,0.85)",
                    boxShadow:  `0 0 ${s.size * 3}px rgba(251,191,36,0.9)`,
                  }}
                  animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
                />
              ))}
            </div>
          </motion.div>
          {/* ── END MOBILE: Astrologer Photo ── */}

        </div>

        {/* ── DESKTOP layout (hidden below lg) ── */}
        <div
          className="hidden lg:grid items-center gap-x-8 lg:gap-x-14"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >

          {/* COL 1 — Headline + Subtext */}
          <div className="flex flex-col items-start">
            <motion.h1
              {...fadeLeft(0.15)}
              className="font-serif font-bold leading-[1.13] mb-5 lg:mb-6"
              style={{ fontSize: "clamp(1.6rem, 3vw, 3.2rem)" }}
            >
              Transform Your Life{" "}
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
              >
                Astrology, Numerology,
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}
              >
                Vastu &amp; Palmistry
              </span>
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              className="h-px mb-5 lg:mb-6 flex-shrink-0"
              style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
            />

            <motion.p
              {...fadeLeft(0.38)}
              className="leading-relaxed"
              style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                color: "rgba(255,255,255,0.58)",
                maxWidth: "24rem",
              }}
            >
              Accurate predictions, personalised remedies, and life-changing
              solutions for career, marriage, finance, health &amp; peace.
            </motion.p>

            <motion.div {...fadeUp(0.48)} className="mt-7 lg:mt-9 flex flex-wrap gap-3" />
          </div>

          {/* COL 2 — Logo + Shloka */}
          <motion.div
            {...fadeScale(0.1)}
            className="flex flex-col items-center gap-3"
            style={{ minWidth: "clamp(280px, 30vw, 440px)" }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className="pointer-events-none absolute rounded-full blur-2xl"
                style={{
                  width:  "clamp(300px, 32vw, 480px)",
                  height: "clamp(300px, 32vw, 480px)",
                  background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
                }}
              />
              <motion.img
                src={LOGO}
                alt="Astro Santosh Pandey Logo"
                className="relative z-10 h-auto object-contain"
                style={{
                  width: "clamp(260px, 28vw, 420px)",
                  mixBlendMode: "screen",
                  filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                }}
                animate={{ y: [-6, 0, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div {...fadeUp(0.32)} className="relative mt-3 mb-2">
              <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
              <div
                className="text-sm md:text-lg font-bold tracking-normal leading-loose text-center relative
                  bg-[length:200%_auto] bg-gradient-to-r
                  from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                  bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                  drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                  drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                style={{
                  textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
                }}
              >
                <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                धर्मो रक्षति रक्षितः
                <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
              </div>
            </motion.div>
          </motion.div>

          {/* COL 3 — Astrologer Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            className="flex justify-end items-start"
          >
            <div className="relative flex items-center justify-center">

              <div
                className="pointer-events-none absolute rounded-full blur-3xl"
                style={{
                  width:  "clamp(240px, 28vw, 500px)",
                  height: "clamp(240px, 28vw, 500px)",
                  background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
                }}
              />

              {[
                { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
                { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
                { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border pointer-events-none"
                  animate={{ scale: r.s, opacity: r.o }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
                  style={{
                    width:       "clamp(200px, 22vw, 370px)",
                    height:      "clamp(200px, 22vw, 370px)",
                    borderColor: r.color,
                  }}
                />
              ))}

              {/* floating image container — corner brackets REMOVED */}
              <motion.div
                animate={{ y: [-7, 0, -7] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "#06060f",
                    boxShadow: [
                      "0 0 0 1px rgba(251,191,36,0.38)",
                      "0 0 28px rgba(251,191,36,0.15)",
                      "0 0 70px rgba(251,191,36,0.07)",
                      "inset 0 1px 0 rgba(255,255,255,0.04)",
                      "0 32px 64px rgba(0,0,0,0.6)",
                    ].join(", "),
                  }}
                >
                  <img
                    src={HeroImg}
                    alt="Astro Santosh Pandey"
                    className="block h-auto object-cover object-top"
                    style={{
                      width:        "clamp(215px, 24vw, 380px)",
                      mixBlendMode: "screen",
                      filter:       "brightness(0.94) contrast(1.09) saturate(1.06)",
                    }}
                  />
                  <div
                    className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 70%)" }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to top, rgba(6,6,15,0.96) 0%, transparent 100%)" }}
                  />
                </div>
              </motion.div>

              {[
                { top: "9%",  left:  "1%",  size: 5, delay: 0.0 },
                { top: "22%", right: "3%",  size: 4, delay: 0.8 },
                { top: "48%", left:  "-1%", size: 6, delay: 1.6 },
                { top: "68%", right: "2%",  size: 4, delay: 0.4 },
                { top: "82%", left:  "5%",  size: 3, delay: 2.0 },
                { top: "33%", right: "0%",  size: 5, delay: 1.2 },
                { top: "58%", left:  "6%",  size: 3, delay: 2.4 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width:      s.size,
                    height:     s.size,
                    top:        s.top,
                    left:       "left"  in s ? s.left  : undefined,
                    right:      "right" in s ? s.right : undefined,
                    background: "rgba(251,191,36,0.85)",
                    boxShadow:  `0 0 ${s.size * 3}px rgba(251,191,36,0.9)`,
                  }}
                  animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── bottom gold divider ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="h-px origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* ── scroll indicator ── */}
      <motion.div
        className="relative z-10 flex justify-center py-5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(251,191,36,0.3)" }}
          >
            <motion.div
              className="w-[3px] h-2.5 rounded-full"
              style={{ background: "rgba(251,191,36,0.65)" }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};