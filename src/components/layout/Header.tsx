

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logoImage from "@/assets/logo-removebg-preview (1).png";
// import nameLogoImage from "@/assets/name_logo.png";
// import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Astrology", path: "/astrology" },
//   { name: "Numerology", path: "/numerology" },
//   { name: "Vastu", path: "/vastu" },
//   { name: "Palmistry", path: "/palmistry" },
//   { name: "Courses", path: "/courses" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// export const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
//         ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
//         : "bg-transparent"
//         }`}
//     >
//       <div className="container mx-auto px-4">
//         <nav className="flex items-center justify-between h-24">

//           {/* ───── Logo ───── */}
//           <Link
//             to="/"
//             className="flex items-center gap-3 overflow-hidden"
//             style={{ textDecoration: "none", outline: "none", listStyle: "none" }}
//           >
//             {/* Hanuman Ganesha Logo */}
//             {/* FIX: motion.div must be block + line-height:0 to kill the inline
//                 baseline gap that renders as a dash/dot below the image.
//                 display:block + lineHeight:0 + fontSize:0 on the wrapper collapses
//                 all whitespace/baseline artifacts completely. */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               layout={false}
//               style={{ display: "block", lineHeight: 0, fontSize: 0 }}
//               className="flex-shrink-0"
//             >
//               <img
//                 src={hanumanGaneshaLogo}
//                 alt="Hanuman Ganesha"
//                 className="h-16 sm:h-20 md:h-24 w-auto object-contain"
//                 style={{ display: "block", verticalAlign: "bottom" }}
//               />

//               {/* <img
//   src={hanumanGaneshaLogo}
//   alt="Hanuman Ganesha"
//   className="h-16 sm:h-20 md:h-24 w-auto object-contain"
//   // style={{ display: "block", verticalAlign: "bottom", mixBlendMode: "screen" }}
//   style={{
//   display: "block",
//   verticalAlign: "bottom",
//   mixBlendMode: "multiply",
//   filter: "brightness(1.1)",
// }}
// /> */}
//             </motion.div>

//             {/* Name Logo & Shloka */}
//             <div className="flex flex-col items-start justify-center pointer-events-none">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//                 layout={false}
//                 style={{ display: "block", lineHeight: 0, fontSize: 0 }}
//                 className="flex-shrink-0"
//               >
//                 <img
//                   src={nameLogoImage}
//                   alt="Astro Santosh Pandey"
//                   className="h-12 sm:h-14 md:h-16 w-auto object-contain"
//                   style={{ display: "block", verticalAlign: "bottom" }}
// //                   style={{
// //   display: "block",
// //   verticalAlign: "bottom",
// //   mixBlendMode: "screen",
// // }}
//                 />
//               </motion.div>
//               <span
//                 className="text-[10px] sm:text-xs italic mt-0.5 text-[#FFD700] leading-tight pl-1"
//                 style={{
//                   textShadow:
//                     "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
//                 }}
//               >
//                 ज्योतिषं सर्वार्थ साधकं
//               </span>
//             </div>
//           </Link>

//           {/* ───── Desktop Navigation ───── */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
//                   ? "text-primary"
//                   : "text-foreground/80"
//                   }`}
//               >
//                 {item.name}
//                 {location.pathname === item.path && (
//                   <motion.div
//                     layoutId="activeNav"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* ───── CTA Buttons ───── */}
//           <div className="hidden lg:flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground/80 hover:text-primary"
//               asChild
//             >
//               <a
//                 href="https://wa.me/+918879731174"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Phone className="h-4 w-4 mr-2" />
//                 WhatsApp
//               </a>
//             </Button>
//             <Button
//               size="sm"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
//               asChild
//             >
//               <Link to="/contact#booking">Book Consultation</Link>
//             </Button>
//           </div>

//           {/* ───── Mobile Menu Button ───── */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2 text-foreground"
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </nav>
//       </div>

//       {/* ───── Mobile Menu ───── */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
//           >
//             <div className="container mx-auto px-4 py-6 space-y-4">
//               {navItems.map((item, index) => (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link
//                     to={item.path}
//                     className={`block py-2 text-lg font-medium ${location.pathname === item.path
//                       ? "text-primary"
//                       : "text-foreground/80"
//                       }`}
//                   >
//                     {item.name}
//                   </Link>
//                 </motion.div>
//               ))}
//               <div className="pt-4 flex flex-col gap-3">
//                 <Button
//                   className="w-full bg-primary text-primary-foreground"
//                   asChild
//                 >
//                   <Link to="/contact">Book Consultation</Link>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full border-primary text-primary"
//                   asChild
//                 >
//                   <a
//                     href="https://wa.me/+918879731174"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     WhatsApp Now
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };





//testing


// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Phone, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import nameLogoImage from "@/assets/name_logo.png";
// import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

// const navItems = [
//   { name: "Home",       path: "/" },
//   { name: "Astrology",  path: "/astrology" },
//   { name: "Numerology", path: "/numerology" },
//   { name: "Vastu",      path: "/vastu" },
//   { name: "Palmistry",  path: "/palmistry" },
//   { name: "Courses",    path: "/courses" },
//   { name: "About",      path: "/about" },
//   { name: "Contact",    path: "/contact" },
// ];

// export const Header = () => {
//   const [isScrolled, setIsScrolled]             = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   const isQuickServices = location.pathname.startsWith("/quick-services");

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="w-full px-3 xl:px-6">
//         <nav className="flex items-center justify-between h-20">

//           {/* ── Logo ─────────────────────────────────────────────
//               Capped max-width so it never eats into the nav area.
//           ──────────────────────────────────────────────────────── */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 flex-shrink-0"
//             style={{ textDecoration: "none", outline: "none" }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               layout={false}
//               style={{ display: "block", lineHeight: 0, fontSize: 0 }}
//               className="flex-shrink-0"
//             >
//               <img
//                 src={hanumanGaneshaLogo}
//                 alt="Hanuman Ganesha"
//                 className="h-14 w-auto object-contain"
//                 style={{ display: "block", verticalAlign: "bottom" }}
//               />
//             </motion.div>

//             <div className="flex flex-col items-start justify-center pointer-events-none">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//                 layout={false}
//                 style={{ display: "block", lineHeight: 0, fontSize: 0 }}
//               >
//                 <img
//                   src={nameLogoImage}
//                   alt="Astro Santosh Pandey"
//                   className="h-9 w-auto object-contain"
//                   style={{ display: "block", verticalAlign: "bottom" }}
//                 />
//               </motion.div>
//               <span
//                 className="text-[9px] italic mt-0.5 text-[#FFD700] leading-tight pl-0.5 whitespace-nowrap"
//                 style={{
//                   textShadow: "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
//                 }}
//               >
//                 ज्योतिषं सर्वार्थ साधकं
//               </span>
//             </div>
//           </Link>

//           {/* ── Desktop Nav (lg: 1024-1279px) — compact ──────────
//               At this breakpoint we fit everything with tighter gaps
//               and slightly smaller text. WhatsApp label is hidden.
//           ──────────────────────────────────────────────────────── */}
//           <div className="hidden lg:flex xl:hidden items-center gap-3 flex-1 justify-center px-2 min-w-0">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative text-[11.5px] font-medium transition-colors hover:text-primary whitespace-nowrap ${
//                   location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                 }`}
//               >
//                 {item.name}
//                 {location.pathname === item.path && (
//                   <motion.div
//                     layoutId="activeNavLg"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
//                   />
//                 )}
//               </Link>
//             ))}
//             <Link
//               to="/quick-services"
//               className={`
//                 relative inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap
//                 px-2 py-0.5 rounded-full border transition-all duration-200 flex-shrink-0
//                 ${isQuickServices
//                   ? "bg-primary text-primary-foreground border-primary shadow-md"
//                   : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
//                 }
//               `}
//             >
//               {!isQuickServices && (
//                 <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-80" />
//               )}
//               <Zap className="w-2.5 h-2.5 flex-shrink-0" />
//               Quick Services
//             </Link>
//           </div>

//           {/* ── Desktop Nav (xl: 1280px+) — comfortable spacing ──
//               At this breakpoint everything has room to breathe.
//           ──────────────────────────────────────────────────────── */}
//           <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center px-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
//                   location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                 }`}
//               >
//                 {item.name}
//                 {location.pathname === item.path && (
//                   <motion.div
//                     layoutId="activeNavXl"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
//                   />
//                 )}
//               </Link>
//             ))}
//             <Link
//               to="/quick-services"
//               className={`
//                 relative inline-flex items-center gap-1 text-[13px] font-bold whitespace-nowrap
//                 px-3 py-1 rounded-full border transition-all duration-200 flex-shrink-0
//                 ${isQuickServices
//                   ? "bg-primary text-primary-foreground border-primary shadow-md"
//                   : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
//                 }
//               `}
//             >
//               {!isQuickServices && (
//                 <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-80" />
//               )}
//               <Zap className="w-3 h-3 flex-shrink-0" />
//               Quick Services
//             </Link>
//           </div>

//           {/* ── CTA Buttons ──────────────────────────────────────
//               flex-shrink-0 — never shrink or wrap.
//               WhatsApp: icon-only at lg, icon+label at xl+.
//           ──────────────────────────────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground/80 hover:text-primary px-2"
//               asChild
//             >
//               <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
//                 <Phone className="h-4 w-4" />
//                 <span className="hidden xl:inline xl:ml-1.5">WhatsApp</span>
//               </a>
//             </Button>

//             <Button
//               size="sm"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold whitespace-nowrap text-[11px] xl:text-sm px-3 xl:px-4"
//               asChild
//             >
//               <Link to="/contact#booking">Book Consultation</Link>
//             </Button>
//           </div>

//           {/* ── Mobile Hamburger ─────────────────────────────── */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2 text-foreground"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </nav>
//       </div>

//       {/* ── Mobile Menu ──────────────────────────────────────── */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
//           >
//             <div className="px-4 py-5 space-y-1">
//               {navItems.map((item, index) => (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link
//                     to={item.path}
//                     className={`block py-2.5 text-base font-medium border-b border-border/30 ${
//                       location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                     }`}
//                   >
//                     {item.name}
//                   </Link>
//                 </motion.div>
//               ))}

//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: navItems.length * 0.05 }}
//                 className="pt-2"
//               >
//                 <Link
//                   to="/quick-services"
//                   className={`
//                     flex items-center gap-2 py-2.5 px-3 text-base font-bold rounded-xl border
//                     ${isQuickServices
//                       ? "bg-primary text-primary-foreground border-primary"
//                       : "bg-primary/10 text-primary border-primary/20"
//                     }
//                   `}
//                 >
//                   <Zap className="w-4 h-4" />
//                   Quick Services
//                   {!isQuickServices && (
//                     <span className="ml-auto text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
//                       New
//                     </span>
//                   )}
//                 </Link>
//               </motion.div>

//               <div className="pt-4 flex flex-col gap-3 border-t border-border mt-3">
//                 <Button className="w-full bg-primary text-primary-foreground" asChild>
//                   <Link to="/contact">Book Consultation</Link>
//                 </Button>
//                 <Button variant="outline" className="w-full border-primary text-primary" asChild>
//                   <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
//                     WhatsApp Now
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };




//testing 2



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import nameLogoImage from "@/assets/name_logo.png";
import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

const navItems = [
  { name: "Home",       path: "/" },
  { name: "Astrology",  path: "/astrology" },
  { name: "Numerology", path: "/numerology" },
  { name: "Vastu",      path: "/vastu" },
  { name: "Palmistry",  path: "/palmistry" },
  { name: "Courses",    path: "/courses" },
  { name: "About",      path: "/about" },
  { name: "Contact",    path: "/contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isQuickServices = location.pathname.startsWith("/quick-services");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/*
        ── Outer wrapper ────────────────────────────────────────────────────
        px-6  → mobile  (24px each side)
        px-10 → md      (40px each side)
        px-14 → lg      (56px each side)  ← pulls logo away from left edge
        px-16 → xl      (64px each side)  ← pulls buttons away from right edge
        px-20 → 2xl     (80px each side)  ← generous on large monitors
      ──────────────────────────────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20">
        <nav className="flex items-center justify-between h-24">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              layout={false}
              style={{ display: "block", lineHeight: 0, fontSize: 0 }}
              className="flex-shrink-0"
            >
              <img
                src={hanumanGaneshaLogo}
                alt="Hanuman Ganesha"
                className="h-[72px] w-auto object-contain"
                style={{ display: "block", verticalAlign: "bottom" }}
              />
            </motion.div>

            <div className="flex flex-col items-start justify-center pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                layout={false}
                style={{ display: "block", lineHeight: 0, fontSize: 0 }}
              >
                <img
                  src={nameLogoImage}
                  alt="Astro Santosh Pandey"
                  className="h-12 w-auto object-contain"
                  style={{ display: "block", verticalAlign: "bottom" }}
                />
              </motion.div>
              <span
                className="text-[10px] italic mt-1 text-[#FFD700] leading-tight pl-0.5 whitespace-nowrap"
                style={{
                  textShadow: "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
                }}
              >
                ज्योतिषं सर्वार्थ साधकं
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav lg (1024–1279 px) ──────────────────────────────
              flex-1 + justify-center keeps nav perfectly centred between
              the logo and the CTA buttons at every viewport width.
          ─────────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex xl:hidden items-center gap-3 flex-1 justify-center px-3 min-w-0">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[11.5px] font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  location.pathname === item.path ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNavLg"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/quick-services"
              className={`
                relative inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap
                px-2.5 py-1 rounded-full border transition-all duration-200 flex-shrink-0
                ${isQuickServices
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                }
              `}
            >
              {!isQuickServices && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-80" />
              )}
              <Zap className="w-2.5 h-2.5 flex-shrink-0" />
              Quick Services
            </Link>
          </div>

          {/* ── Desktop Nav xl (1280 px+) ───────────────────────────────── */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  location.pathname === item.path ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNavXl"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/quick-services"
              className={`
                relative inline-flex items-center gap-1.5 text-[13px] font-bold whitespace-nowrap
                px-3 py-1 rounded-full border transition-all duration-200 flex-shrink-0
                ${isQuickServices
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                }
              `}
            >
              {!isQuickServices && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-80" />
              )}
              <Zap className="w-3 h-3 flex-shrink-0" />
              Quick Services
            </Link>
          </div>

          {/* ── CTA Buttons ─────────────────────────────────────────────────
              flex-shrink-0 so they never compress.
              WhatsApp label hidden at lg, visible at xl+.
          ─────────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/80 hover:text-primary px-2.5"
              asChild
            >
              <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline xl:ml-1.5">WhatsApp</span>
              </a>
            </Button>

            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold whitespace-nowrap text-[11px] xl:text-sm px-3 xl:px-4"
              asChild
            >
              <Link to="/contact#booking">Book Consultation</Link>
            </Button>
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────────── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="px-6 py-5 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`block py-2.5 text-base font-medium border-b border-border/30 ${
                      location.pathname === item.path ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-2"
              >
                <Link
                  to="/quick-services"
                  className={`
                    flex items-center gap-2 py-2.5 px-3 text-base font-bold rounded-xl border
                    ${isQuickServices
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-primary/10 text-primary border-primary/20"
                    }
                  `}
                >
                  <Zap className="w-4 h-4" />
                  Quick Services
                  {!isQuickServices && (
                    <span className="ml-auto text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      New
                    </span>
                  )}
                </Link>
              </motion.div>

              <div className="pt-4 flex flex-col gap-3 border-t border-border mt-3">
                <Button className="w-full bg-primary text-primary-foreground" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary" asChild>
                  <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                    WhatsApp Now
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};