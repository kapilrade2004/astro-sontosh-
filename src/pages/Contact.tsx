// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { BookingProcess } from "@/components/booking/BookingProcess";

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
//         {/* Hero Section */}
//         <section className="pt-32 pb-8 bg-gradient-hero relative overflow-hidden">
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-4xl"
//             >
//               <span className="text-primary font-medium text-sm uppercase tracking-wider">
//                 Contact Us
//               </span>
//               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
//                 Seek Clarity.
//                 <span className="text-gradient-gold"> Align with Dharma.</span>
//               </h1>
//               <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
//                 Ready to unlock the secrets of your destiny? Reach out to us for a personalized
//                 consultation and take the first step towards clarity and success.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Booking Section */}
//         <section
//           id="booking"
//           className="py-6 md:py-8 bg-background relative scroll-mt-32"
//         >
//           <div className="container mx-auto px-2 md:px-4 max-w-[1600px]">
//             <BookingProcess />
//           </div>
//         </section>

//         {/* Map Section */}
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
//                <Button variant="link" className="text-primary" asChild>
//   <a
//     href="https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Open in Google Maps
//   </a>
// </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

// export default Contact;






//testing




import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingProcess } from "@/components/booking/BookingProcess";
import LOGO from "@/assets/logo by yash.png";

const ease = [0.22, 1, 0.36, 1] as const;

const Contact = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#booking") {
      setTimeout(() => {
        const el = document.getElementById("booking");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
        <section className="pt-32 pb-8 bg-gradient-hero relative overflow-hidden">

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

          {/* top gold divider */}
          <div className="absolute top-[7.8rem] left-0 right-0 z-10 px-6 lg:px-10">
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

          {/* ── 2-column: text left | logo right ── */}
          <div className="container mx-auto px-4 relative z-10">
            <div
              className="grid items-center gap-x-8 lg:gap-x-16"
              style={{ gridTemplateColumns: "1fr auto" }}
            >

              {/* ── LEFT: text ── */}
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

                {/* gold accent rule */}
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
                  className="text-muted-foreground text-lg md:text-xl max-w-2xl"
                >
                  Ready to unlock the secrets of your destiny? Reach out to us for a personalized
                  consultation and take the first step towards clarity and success.
                </motion.p>
              </motion.div>

              {/* ── RIGHT: logo ── */}
              <motion.div
                initial={{ opacity: 0, x: 36, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease }}
                className="flex flex-col items-center gap-3"
                style={{ minWidth: "clamp(150px, 16vw, 260px)" }}
              >
                {/* glow disc */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="pointer-events-none absolute rounded-full blur-2xl"
                    style={{
                      width:  "clamp(170px, 18vw, 290px)",
                      height: "clamp(170px, 18vw, 290px)",
                      background:
                        "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
                    }}
                  />
                  <motion.img
                    src={LOGO}
                    alt="Astro Santosh Pandey Logo"
                    className="relative z-10 h-auto object-contain"
                    style={{
                      width: "clamp(150px, 16vw, 260px)",
                      filter: "drop-shadow(0 0 32px rgba(251,191,36,0.45))",
                    }}
                    animate={{ y: [-6, 0, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* ornament dots */}
                <div className="flex items-center gap-1.5">
                  {[4, 4, 6, 4, 4].map((sz, i) => (
                    <span
                      key={i}
                      className="rounded-full inline-block"
                      style={{
                        width:      sz,
                        height:     sz,
                        background: i === 2 ? "rgba(251,191,36,1)" : "rgba(251,191,36,0.38)",
                        boxShadow:  i === 2 ? "0 0 8px rgba(251,191,36,0.7)" : "none",
                      }}
                    />
                  ))}
                </div>

                {/* shloka pill */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.36, ease }}
                  className="relative px-4 py-2 rounded-lg"
                  style={{
                    background:     "rgba(251,191,36,0.055)",
                    border:         "1px solid rgba(251,191,36,0.22)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 120%, rgba(251,191,36,0.18) 0%, transparent 65%)",
                    }}
                  />
                  <p
                    className="relative font-bold whitespace-nowrap text-center"
                    style={{
                      fontSize: "clamp(0.72rem, 1vw, 0.95rem)",
                      backgroundImage:
                        "linear-gradient(90deg, #fef3c7 0%, #fde68a 25%, #fbbf24 50%, #fde68a 75%, #fef3c7 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      backgroundSize: "200% auto",
                    }}
                  >
                    ॥ धर्मो रक्षति रक्षितः ॥
                  </p>
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* bottom gold divider */}
          <div className="relative z-10 mt-8 px-6 lg:px-10">
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
          className="py-6 md:py-8 bg-background relative scroll-mt-32"
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
              <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
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
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
