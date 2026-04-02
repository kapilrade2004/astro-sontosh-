// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { BookingProcess } from "@/components/booking/BookingProcess";
// import LOGO from "@/assets/logo by yash.png";

// const ease = [0.22, 1, 0.36, 1] as const;

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 28 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.8, delay, ease },
// });

// const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai";

// const Contact = () => {
//   const { hash } = useLocation();

//   useEffect(() => {
//     if (hash === "#booking") {
//       setTimeout(() => {
//         const el = document.getElementById("booking");
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }, 150);
//     }
//   }, [hash]);

//   return (
//     <>
//       <Helmet>
//         <title>Contact Us - Book Your Consultation | Astro Santosh Pandey</title>
//         <meta
//           name="description"
//           content="Contact Astro Santosh Pandey for expert astrology, numerology, vastu, and palmistry consultations. Book your personalized session today."
//         />
//         <link rel="canonical" href="https://astrosantoshpandey.com/contact" />
//       </Helmet>

//       <Layout>

//         {/* ── Hero Section ── */}
//         <section className="pt-28 pb-8 bg-gradient-hero relative overflow-hidden">

//           {/* ambient glow layers */}
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               background:
//                 "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(251,191,36,0.06) 0%, transparent 70%)",
//             }}
//           />
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               background:
//                 "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.05) 0%, transparent 60%)",
//             }}
//           />

//           {/* top gold divider */}
//           <div className="absolute top-[6.8rem] left-0 right-0 z-10 px-4 sm:px-6 lg:px-10">
//             <motion.div
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 1.1, ease }}
//               className="h-px origin-center mx-auto"
//               style={{
//                 maxWidth: "90rem",
//                 background:
//                   "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 15%, rgba(251,191,36,0.55) 50%, rgba(251,191,36,0.12) 85%, transparent 100%)",
//               }}
//             />
//           </div>

//           <div className="container mx-auto px-4 sm:px-6 relative z-10">

//             {/* ── MOBILE layout (hidden on lg+) ── */}
//             <div className="flex flex-col items-center gap-6 lg:hidden">

//               {/* Logo + shloka centred on mobile */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.88 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.85, delay: 0.15, ease }}
//                 className="flex flex-col items-center gap-2 w-full"
//               >
//                 <div className="relative flex items-center justify-center">
//                   <div
//                     className="pointer-events-none absolute rounded-full blur-2xl"
//                     style={{
//                       width: 220, height: 220,
//                       background: "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
//                     }}
//                   />
//                   <motion.img
//                     src={LOGO}
//                     alt="Astro Santosh Pandey Logo"
//                     className="relative z-10 h-auto object-contain"
//                     style={{ width: 200, filter: "drop-shadow(0 0 28px rgba(251,191,36,0.5))" }}
//                     animate={{ y: [-5, 0, -5] }}
//                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                   />
//                 </div>

//                 {/* shloka */}
//                 <motion.div {...fadeUp(0.32)} className="relative w-full text-center">
//                   <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//                   <div
//                     className="text-sm font-bold tracking-normal leading-loose text-center relative
//                       bg-[length:200%_auto] bg-gradient-to-r
//                       from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                       bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                       drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                       drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                     style={{
//                       textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                     }}
//                   >
//                     <span className="inline-block mr-2 text-[#FFD700] animate-pulse">&#x0964;&#x0964;</span>
//                     &#x0927;&#x0930;&#x094D;&#x092E;&#x094B;&#x0020;&#x0930;&#x0915;&#x094D;&#x0937;&#x0924;&#x093F;&#x0020;&#x0930;&#x0915;&#x094D;&#x0937;&#x093F;&#x0924;&#x0903;
//                     <span className="inline-block ml-2 text-[#FFD700] animate-pulse">&#x0964;&#x0964;</span>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Text below logo on mobile */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2, ease }}
//                 className="flex flex-col items-start w-full"
//               >
//                 <span className="text-primary font-medium text-xs uppercase tracking-wider mb-3">
//                   Contact Us
//                 </span>

//                 <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 leading-tight">
//                   Seek Clarity.
//                   <span className="text-gradient-gold"> Align with Dharma.</span>
//                 </h1>

//                 <div
//                   className="h-px mb-4 flex-shrink-0"
//                   style={{
//                     width: "4rem",
//                     background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)",
//                   }}
//                 />

//                 <p className="text-muted-foreground text-base leading-relaxed">
//                   Ready to unlock the secrets of your destiny? Reach out to us for a personalized
//                   consultation and take the first step towards clarity and success.
//                 </p>
//               </motion.div>
//             </div>

//             {/* ── DESKTOP layout (hidden below lg) ── */}
//             <div
//               className="hidden lg:grid items-center gap-x-8 lg:gap-x-16"
//               style={{ gridTemplateColumns: "1fr auto" }}
//             >

//               {/* LEFT: text */}
//               <motion.div
//                 initial={{ opacity: 0, x: -36 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.12, ease }}
//                 className="max-w-4xl"
//               >
//                 <motion.span
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.1, ease }}
//                   className="text-primary font-medium text-sm uppercase tracking-wider"
//                 >
//                   Contact Us
//                 </motion.span>

//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.75, delay: 0.2, ease }}
//                   className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-4"
//                 >
//                   Seek Clarity.
//                   <span className="text-gradient-gold"> Align with Dharma.</span>
//                 </motion.h1>

//                 <motion.div
//                   initial={{ width: 0, opacity: 0 }}
//                   animate={{ width: "5rem", opacity: 1 }}
//                   transition={{ duration: 0.9, delay: 0.32, ease }}
//                   className="h-px mb-5 flex-shrink-0"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)",
//                   }}
//                 />

//                 <motion.p
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.75, delay: 0.3, ease }}
//                   className="text-muted-foreground text-lg md:text-xl max-w-2xl"
//                 >
//                   Ready to unlock the secrets of your destiny? Reach out to us for a personalized
//                   consultation and take the first step towards clarity and success.
//                 </motion.p>
//               </motion.div>

//               {/* RIGHT: logo */}
//               <motion.div
//                 initial={{ opacity: 0, x: 36, scale: 0.88 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ duration: 0.85, delay: 0.15, ease }}
//                 className="flex flex-col items-center gap-3"
//                 style={{ minWidth: "clamp(280px, 30vw, 440px)" }}
//               >
//                 <div className="relative flex items-center justify-center">
//                   <div
//                     className="pointer-events-none absolute rounded-full blur-2xl"
//                     style={{
//                       width:  "clamp(280px, 30vw, 460px)",
//                       height: "clamp(280px, 30vw, 460px)",
//                       background:
//                         "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
//                     }}
//                   />
//                   <motion.img
//                     src={LOGO}
//                     alt="Astro Santosh Pandey Logo"
//                     className="relative z-10 h-auto object-contain"
//                     style={{
//                       width: "clamp(260px, 28vw, 420px)",
//                       filter: "drop-shadow(0 0 40px rgba(251,191,36,0.55))",
//                     }}
//                     animate={{ y: [-6, 0, -6] }}
//                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                   />
//                 </div>

//                 <motion.div
//                   {...fadeUp(0.32)}
//                   className="relative mt-3 mb-2 w-full"
//                 >
//                   <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
//                   <div
//                     className="text-sm md:text-lg font-bold tracking-normal leading-loose text-center relative
//                       bg-[length:200%_auto] bg-gradient-to-r
//                       from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
//                       bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
//                       drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
//                       drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
//                     style={{
//                       textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
//                     }}
//                   >
//                     <span className="inline-block mr-2 text-[#FFD700] animate-pulse">&#x0964;&#x0964;</span>
//                     &#x0927;&#x0930;&#x094D;&#x092E;&#x094B;&#x0020;&#x0930;&#x0915;&#x094D;&#x0937;&#x0924;&#x093F;&#x0020;&#x0930;&#x0915;&#x094D;&#x0937;&#x093F;&#x0924;&#x0903;
//                     <span className="inline-block ml-2 text-[#FFD700] animate-pulse">&#x0964;&#x0964;</span>
//                   </div>
//                 </motion.div>
//               </motion.div>

//             </div>
//           </div>

//           {/* bottom gold divider */}
//           <div className="relative z-10 mt-8 px-4 sm:px-6 lg:px-10">
//             <motion.div
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 1.1, delay: 0.45, ease }}
//               className="h-px origin-center mx-auto"
//               style={{
//                 maxWidth: "90rem",
//                 background:
//                   "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)",
//               }}
//             />
//           </div>
//         </section>

//         {/* ── Booking Section ── */}
//         <section
//           id="booking"
//           className="py-6 md:py-8 bg-background relative scroll-mt-32"
//         >
//           <div className="container mx-auto px-2 md:px-4 max-w-[1600px]">
//             <BookingProcess />
//           </div>
//         </section>

//         {/* ── Map Section ── */}
//         <section className="py-6 bg-gradient-cosmic">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-8"
//             >
//               <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
//                 Find Us <span className="text-gradient-gold">Here</span>
//               </h2>
//             </motion.div>

//             <div className="cosmic-card p-4 overflow-hidden">
//               <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.8540385436492!2d72.82847882645552!3d18.94594651100226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf8a16f0fdf1%3A0xee0367f86d8c755b!2sAstro%20Santosh%20Pandey!5e0!3m2!1sen!2sin!4v1769161595874!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="Location Map"
//                 />
//               </div>
//               <div className="text-center mt-4">
//                 <p className="text-muted-foreground mb-2">
//                   Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
//                 </p>
//                 <Button variant="link" className="text-primary" asChild>
//                   <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
//                     Open in Google Maps
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//       </Layout>
//     </>
//   );
// };

// export default Contact;



//test




import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingProcess } from "@/components/booking/BookingProcess";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LOGO from "@/assets/logo by yash.png";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai";

const Contact = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#booking") {
      setTimeout(() => {
        const el = document.getElementById("booking");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>Contact Us - Book Your Consultation | Astro Santosh Pandey</title>
        <meta
          name="description"
          content="Contact Astro Santosh Pandey for expert astrology, numerology, vastu, and palmistry consultations. Book your personalized session today."
        />
        <link rel="canonical" href="https://astrosantoshpandey.com/contact" />
      </Helmet>

      <Layout>

        {/* ── Hero Section ── */}
        <section className="pt-24 sm:pt-28 pb-0 bg-gradient-hero relative overflow-hidden">

          {/* ambient glow layers */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(251,191,36,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.05) 0%, transparent 60%)",
            }}
          />

          {/* ── top gold divider — flow-based so it never overlaps ── */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease }}
              className="h-px origin-center mx-auto"
              style={{
                maxWidth: "90rem",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 15%, rgba(251,191,36,0.55) 50%, rgba(251,191,36,0.12) 85%, transparent 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">

            {/* ══════════════════════════════════════════
                MOBILE layout (hidden on lg+)
               ══════════════════════════════════════════ */}
            <div className="flex flex-col items-center gap-6 lg:hidden pb-8">

              {/* Logo + shloka */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease }}
                className="flex flex-col items-center gap-2 w-full"
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="pointer-events-none absolute rounded-full blur-2xl"
                    style={{
                      width: 220,
                      height: 220,
                      background:
                        "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
                    }}
                  />
                  {/* <motion.img
                    src={LOGO}
                    alt="Astro Santosh Pandey Logo"
                    className="relative z-10 h-auto object-contain"
                    style={{
                      width: 200,
                      filter: "drop-shadow(0 0 28px rgba(251,191,36,0.5))",
                    }}
                    animate={{ y: [-5, 0, -5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  /> */}


                   <motion.img
                                  src={LOGO}
                                  alt="Astro Santosh Pandey Logo"
                                  className="relative z-10 h-auto object-contain"
                                  style={{
                                    width: 200,
                                    // KEY FIX: "screen" blend mode makes the dark JPEG background
                                    // invisible so only the gold lion/zodiac artwork shines through —
                                    // matching exactly how the logo looks in the screenshot.
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
                      textShadow:
                        "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                    धर्मो रक्षति रक्षितः
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Text + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="flex flex-col items-start w-full"
              >
                <span className="text-primary font-medium text-xs uppercase tracking-wider mb-3">
                  Contact Us
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Seek Clarity.
                  <span className="text-gradient-gold"> Align with Dharma.</span>
                </h1>

                <div
                  className="h-px mb-4 flex-shrink-0"
                  style={{
                    width: "4rem",
                    background:
                      "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)",
                  }}
                />

                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Ready to unlock the secrets of your destiny? Reach out to us for a
                  personalized consultation and take the first step towards clarity and
                  success.
                </p>

                {/* ── MOBILE CTA ── */}
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold w-full sm:w-auto"
                  asChild
                >
                  <a href="#booking">
                    Book a Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* ══════════════════════════════════════════
                DESKTOP layout (hidden below lg)
               ══════════════════════════════════════════ */}
            <div
              className="hidden lg:grid items-center gap-x-8 lg:gap-x-16 pb-10"
              style={{ gridTemplateColumns: "1fr auto" }}
            >

              {/* LEFT: text */}
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                className="max-w-4xl"
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="text-primary font-medium text-sm uppercase tracking-wider"
                >
                  Contact Us
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.2, ease }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-4"
                >
                  Seek Clarity.
                  <span className="text-gradient-gold"> Align with Dharma.</span>
                </motion.h1>

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "5rem", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.32, ease }}
                  className="h-px mb-5 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.3, ease }}
                  className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
                >
                  Ready to unlock the secrets of your destiny? Reach out to us for a
                  personalized consultation and take the first step towards clarity and
                  success.
                </motion.p>

                {/* ── DESKTOP CTA ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.42, ease }}
                >
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                    asChild
                  >
                    <a href="#booking">
                      Book a Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* RIGHT: logo + shloka */}
              <motion.div
                initial={{ opacity: 0, x: 36, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease }}
                className="flex flex-col items-center gap-3"
                style={{ minWidth: "clamp(280px, 30vw, 440px)" }}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className="pointer-events-none absolute rounded-full blur-2xl"
                    style={{
                      width: "clamp(280px, 30vw, 460px)",
                      height: "clamp(280px, 30vw, 460px)",
                      background:
                        "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
                    }}
                  />
                  {/* <motion.img
                    src={LOGO}
                    alt="Astro Santosh Pandey Logo"
                    className="relative z-10 h-auto object-contain"
                    style={{
                      width: "clamp(260px, 28vw, 420px)",
                      filter: "drop-shadow(0 0 40px rgba(251,191,36,0.55))",
                    }}
                    animate={{ y: [-6, 0, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  /> */}

                    <motion.img
                                  src={LOGO}
                                  alt="Astro Santosh Pandey Logo"
                                  className="relative z-10 h-auto object-contain"
                                  style={{
                                    width: "clamp(260px, 28vw, 420px)",
                                    // KEY FIX: "screen" blend mode knocks out the dark JPEG background
                                    // so only the vivid gold lion and zodiac ring are visible —
                                    // perfectly matching the screenshot's gold-on-dark aesthetic.
                                    mixBlendMode: "screen",
                                    filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                                  }}
                                  animate={{ y: [-6, 0, -6] }}
                                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                />
                </div>

                <motion.div {...fadeUp(0.32)} className="relative mt-3 mb-2 w-full">
                  <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
                  <div
                    className="text-sm md:text-lg font-bold tracking-normal leading-loose text-center relative
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
                    धर्मो रक्षति रक्षितः
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* ── bottom gold divider ── */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease }}
              className="h-px origin-center mx-auto"
              style={{
                maxWidth: "90rem",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)",
              }}
            />
          </div>
        </section>

        {/* ── Booking Section ── */}
        <section
          id="booking"
          className="py-6 md:py-8 bg-background relative scroll-mt-24"
        >
          <div className="container mx-auto px-2 md:px-4 max-w-[1600px]">
            <BookingProcess />
          </div>
        </section>

        {/* ── Map Section ── */}
        <section className="py-6 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Find Us <span className="text-gradient-gold">Here</span>
              </h2>
            </motion.div>

            <div className="cosmic-card p-4 overflow-hidden">
              <div className="w-full h-[300px] sm:h-[400px] bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.8540385436492!2d72.82847882645552!3d18.94594651100226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf8a16f0fdf1%3A0xee0367f86d8c755b!2sAstro%20Santosh%20Pandey!5e0!3m2!1sen!2sin!4v1769161595874!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground mb-2">
                  Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
                </p>
                <Button variant="link" className="text-primary" asChild>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
};

export default Contact;