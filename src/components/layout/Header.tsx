

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Phone, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
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

// /* ─────────────────────────────────────────────────────────────────────────────
//    LogoBrand
//    A single reusable component used in both Header and Footer.
//    • The outer flex row is always `items-center` so both children share
//      the same vertical mid-point regardless of how tall either one is.
//    • Heights are fixed in px so they never reflow or drift at any zoom.
//    • The shloka text uses `display:block` (not inline) so it cannot
//      accidentally push the baseline of the name image upward.
// ───────────────────────────────────────────────────────────────────────────── */
// export const LogoBrand = () => (
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",   /* ← vertical centre for BOTH columns */
//       gap: "10px",
//     }}
//   >
//     {/* Left column: Ganesha / Hanuman icon */}
//     <img
//       src={hanumanGaneshaLogo}
//       alt="Hanuman Ganesha"
//       style={{
//         height: "clamp(62px, 7vw, 78px)",
//         width: "auto",
//         objectFit: "contain",
//         display: "block",
//         flexShrink: 0,
//       }}
//     />

//     {/* Right column: name logo stacked above shloka */}
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         justifyContent: "center",
//         gap: "3px",
//         /* Give this column an explicit height equal to the icon so that
//            justify-content:center works perfectly in every browser / zoom. */
//         height: "clamp(62px, 7vw, 78px)",
//       }}
//     >
//       <img
//         src={nameLogoImage}
//         alt="Astro Santosh Pandey"
//         style={{
//           height: "clamp(39px, 4.6vw, 50px)",
//           width: "auto",
//           objectFit: "contain",
//           display: "block",
//           flexShrink: 0,
//         }}
//       />
//       <span
//         style={{
//           display: "block",          /* block prevents inline baseline shift */
//           fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
//           fontStyle: "italic",
//           color: "#FFD700",
//           whiteSpace: "nowrap",
//           lineHeight: 1.2,
//           paddingLeft: "2px",
//           textShadow:
//             "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
//         }}
//       >
//         ज्योतिषं सर्वार्थ साधकं
//       </span>
//     </div>
//   </div>
// );

// export const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
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
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
//           ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
//           : "bg-transparent"
//         }`}
//     >
//       <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
//         <nav className="flex items-center justify-between h-20 lg:h-24">

//           {/* ── Logo ─────────────────────────────────────────────────────── */}
//           <Link
//             to="/"
//             className="flex-shrink-0"
//             style={{ textDecoration: "none", outline: "none" }}
//           >
//             {/* Inline the brand block so the Link itself is just a wrapper */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",   /* vertical centre */
//                 gap: "10px",
//                 paddingTop: "9px",      /* slight gap from top in header logo */
//               }}
//             >
//               {/* Ganesha / Hanuman icon */}
//               <img
//                 src={hanumanGaneshaLogo}
//                 alt="Hanuman Ganesha"
//                 style={{
//                   height: "clamp(62px, 7vw, 78px)",
//                   width: "auto",
//                   objectFit: "contain",
//                   display: "block",
//                   flexShrink: 0,
//                 }}
//               />

//               {/* Name logo + shloka column */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   justifyContent: "center",
//                   gap: "3px",
//                   height: "clamp(62px, 7vw, 78px)",      /* match icon height exactly */
//                 }}
//               >
//                 <img
//                   src={nameLogoImage}
//                   alt="Astro Santosh Pandey"
//                   style={{
//                     height: "clamp(39px, 4.6vw, 50px)",
//                     width: "auto",
//                     objectFit: "contain",
//                     display: "block",
//                     flexShrink: 0,
//                   }}
//                 />
//                 <span
//                   style={{
//                     display: "block",
//                     fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
//                     fontStyle: "italic",
//                     color: "#FFD700",
//                     whiteSpace: "nowrap",
//                     lineHeight: 1.2,
//                     paddingLeft: "2px",
//                     textShadow:
//                       "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
//                   }}
//                 >
//                   ज्योतिषं सर्वार्थ साधकं
//                 </span>
//               </div>
//             </div>
//           </Link>

//           {/* ── Desktop Nav lg (1024–1279 px) ────────────────────────────── */}
//           <div className="hidden lg:flex xl:hidden items-center gap-3 flex-1 justify-center px-3 min-w-0">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative text-[11.5px] font-medium transition-colors hover:text-primary whitespace-nowrap ${location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                   }`}
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
//                 px-2.5 py-1 rounded-full border transition-all duration-200 flex-shrink-0
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

//           {/* ── Desktop Nav xl (1280 px+) ────────────────────────────────── */}
//           <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center px-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                   }`}
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
//                 relative inline-flex items-center gap-1.5 text-[13px] font-bold whitespace-nowrap
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

//           {/* ── CTA Buttons ──────────────────────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground/80 hover:text-primary px-2.5"
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

//           {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2 text-foreground"
//           >
//             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </nav>
//       </div>

//       {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
//           >
//             <div className="px-6 py-5 space-y-1">
//               {navItems.map((item, index) => (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link
//                     to={item.path}
//                     className={`block py-2.5 text-base font-medium border-b border-border/30 ${location.pathname === item.path ? "text-primary" : "text-foreground/80"
//                       }`}
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




//testing





import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Zap, ChevronDown, Sparkles, Hash, Compass, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import nameLogoImage from "@/assets/name_logo.png";
import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

const servicesOptions = [
  { name: "Astrology", path: "/astrology", desc: "Birth Chart & Kundali Guidance", icon: Sparkles },
  { name: "Numerology", path: "/numerology", desc: "Life Path & Number Vibrations", icon: Hash },
  { name: "Vastu", path: "/vastu", desc: "Space & Property Energy Harmony", icon: Compass },
  { name: "Palmistry", path: "/palmistry", desc: "Palm Reading & Line Analysis", icon: Hand },
];

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LogoBrand
   A single reusable component used in both Header and Footer.
   • The outer flex row is always `items-center` so both children share
     the same vertical mid-point regardless of how tall either one is.
   • Heights are fixed in px so they never reflow or drift at any zoom.
   • The shloka text uses `display:block` (not inline) so it cannot
     accidentally push the baseline of the name image upward.
───────────────────────────────────────────────────────────────────────────── */
export const LogoBrand = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",   /* ← vertical centre for BOTH columns */
      gap: "10px",
    }}
  >
    {/* Left column: Ganesha / Hanuman icon */}
    <img
      src={hanumanGaneshaLogo}
      alt="Hanuman Ganesha"
      style={{
        height: "clamp(62px, 7vw, 78px)",
        width: "auto",
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
    />

    {/* Right column: name logo stacked above shloka */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "3px",
        /* Give this column an explicit height equal to the icon so that
           justify-content:center works perfectly in every browser / zoom. */
        height: "clamp(62px, 7vw, 78px)",
      }}
    >
      <img
        src={nameLogoImage}
        alt="Astro Santosh Pandey"
        style={{
          height: "clamp(39px, 4.6vw, 50px)",
          width: "auto",
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          display: "block",          /* block prevents inline baseline shift */
          fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
          fontStyle: "italic",
          color: "#FFD700",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          paddingLeft: "2px",
          textShadow:
            "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
        }}
      >
        ज्योतिषं सर्वार्थ साधकं
      </span>
    </div>
  </div>
);

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const isQuickServices = location.pathname.startsWith("/quick-services");
  const isServicesActive = servicesOptions.some((s) => location.pathname === s.path);

  // ── Consultation landing page gets its own booking CTA target ───────────
  const isConsultationPage = location.pathname.startsWith("/consultation");
  const bookingHref = isConsultationPage ? "/consultation#booking-form" : "/contact#booking";

  const handleBookingClick = (e: React.MouseEvent) => {
    if (isConsultationPage) {
      e.preventDefault();
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderServicesDropdown = (textCls: string, layoutId: string) => (
    <div
      ref={dropdownRef}
      className="relative flex items-center"
      onMouseEnter={() => setIsServicesOpen(true)}
      onMouseLeave={() => setIsServicesOpen(false)}
    >
      <button
        onClick={() => setIsServicesOpen(!isServicesOpen)}
        className={`relative flex items-center gap-1 font-medium transition-colors hover:text-primary whitespace-nowrap py-1 ${textCls} ${
          isServicesActive || isServicesOpen ? "text-primary" : "text-foreground/80"
        }`}
      >
        <span>Services</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isServicesOpen ? "rotate-180 text-primary" : "text-foreground/60"
          }`}
        />
        {isServicesActive && (
          <motion.div
            layoutId={layoutId}
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          />
        )}
      </button>

      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl border border-primary/30 bg-background/95 backdrop-blur-xl p-2 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,215,0,0.1)] z-50 overflow-hidden"
          >
            <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-1 rounded-full" />
            <div className="space-y-0.5">
              {servicesOptions.map((item) => {
                const isSelected = location.pathname === item.path;
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsServicesOpen(false)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
                      isSelected
                        ? "bg-primary/15 border border-primary/30 text-primary"
                        : "hover:bg-primary/10 hover:text-primary text-foreground/90"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/50 group-hover:bg-primary/20 group-hover:text-primary text-muted-foreground"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{item.name}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-[10.5px] text-muted-foreground group-hover:text-foreground/75 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex-shrink-0"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                paddingTop: "9px",
              }}
            >
              <img
                src={hanumanGaneshaLogo}
                alt="Hanuman Ganesha"
                style={{
                  height: "clamp(62px, 7vw, 78px)",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "3px",
                  height: "clamp(62px, 7vw, 78px)",
                }}
              >
                <img
                  src={nameLogoImage}
                  alt="Astro Santosh Pandey"
                  style={{
                    height: "clamp(39px, 4.6vw, 50px)",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
                    fontStyle: "italic",
                    color: "#FFD700",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    paddingLeft: "2px",
                    textShadow:
                      "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
                  }}
                >
                  ज्योतिषं सर्वार्थ साधकं
                </span>
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav lg (1024–1279 px) ────────────────────────────── */}
          <div className="hidden lg:flex xl:hidden items-center gap-3 flex-1 justify-center px-3 min-w-0">
            <Link
              to="/"
              className={`relative text-[11.5px] font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location.pathname === "/" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Home
              {location.pathname === "/" && (
                <motion.div
                  layoutId="activeNavLg"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>

            {renderServicesDropdown("text-[11.5px]", "activeNavLg")}

            {mainNavItems.filter((i) => i.path !== "/").map((item) => (
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
                ${
                  isQuickServices
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

          {/* ── Desktop Nav xl (1280 px+) ────────────────────────────────── */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-1 justify-center px-4">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location.pathname === "/" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Home
              {location.pathname === "/" && (
                <motion.div
                  layoutId="activeNavXl"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>

            {renderServicesDropdown("text-sm", "activeNavXl")}

            {mainNavItems.filter((i) => i.path !== "/").map((item) => (
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
                ${
                  isQuickServices
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

          {/* ── CTA Buttons ──────────────────────────────────────────────── */}
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
              <Link to={bookingHref} onClick={handleBookingClick}>
                Book Consultation
              </Link>
            </Button>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              <Link
                to="/"
                className={`block py-2.5 text-base font-medium border-b border-border/30 ${
                  location.pathname === "/" ? "text-primary" : "text-foreground/80"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="border-b border-border/30 py-2">
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full py-1 text-base font-medium text-left"
                >
                  <span className={isServicesActive ? "text-primary font-semibold" : "text-foreground/80"}>
                    Services
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileServicesOpen ? "rotate-180 text-primary" : "text-foreground/60"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-3 pt-2 space-y-1.5 overflow-hidden"
                    >
                      {servicesOptions.map((item) => {
                        const isSelected = location.pathname === item.path;
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm transition-colors ${
                              isSelected
                                ? "bg-primary/15 text-primary font-semibold border border-primary/30"
                                : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            <IconComp className="w-4 h-4 text-primary shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainNavItems.filter((i) => i.path !== "/").map((item, index) => (
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
                transition={{ delay: mainNavItems.length * 0.05 }}
                className="pt-2"
              >
                <Link
                  to="/quick-services"
                  className={`
                    flex items-center gap-2 py-2.5 px-3 text-base font-bold rounded-xl border
                    ${
                      isQuickServices
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
                  <Link to={bookingHref} onClick={handleBookingClick}>
                    Book Consultation
                  </Link>
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