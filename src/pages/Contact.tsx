import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingProcess } from "@/components/booking/BookingProcess";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Book Your Consultation | Astro Santosh Pandey</title>
        <meta name="description" content="Contact Astro Santosh Pandey for expert astrology, numerology, vastu, and palmistry consultations. Book your personalized session today." />
        <link rel="canonical" href="https://astrosantoshpandey.com/contact" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-8 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Seek Clarity.<span className="text-gradient-gold"> Align with Dharma.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Ready to unlock the secrets of your destiny? Reach out to us for a personalized
                consultation and take the first step towards clarity and success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-6 md:py-8 bg-background relative scroll-mt-32" id="booking">
          <div className="container mx-auto px-2 md:px-4 max-w-[1600px]">
            <BookingProcess />
          </div>
        </section>

        {/* Map Section */}
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
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground mb-2">
                  Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
                </p>
                <Button
                  variant="link"
                  className="text-primary"
                  asChild
                >
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
      </Layout >
    </>
  );
};

export default Contact;


//testing
// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { BookingProcess } from "@/components/booking/BookingProcess";

// const Contact = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Contact Us - Book Your Consultation | Astro Santosh Pandey</title>
//         <meta name="description" content="Contact Astro Santosh Pandey for expert astrology, numerology, vastu, and palmistry consultations. Book your personalized session today." />
//         <link rel="canonical" href="https://astrosantoshpandey.com/contact" />
//       </Helmet>
//       <Layout>
//         {/* Hero Section */}
//         <section className="pt-20 pb-8 bg-gradient-hero relative overflow-hidden">
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-4xl"
//             >
//               <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
//               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
//                 Seek Clarity.<span className="text-gradient-gold"> Align with Dharma.</span>
//               </h1>
//               <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
//                 Ready to unlock the secrets of your destiny? Reach out to us for a personalized
//                 consultation and take the first step towards clarity and success.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Booking Section */}
//         <section className="py-6 md:py-8 bg-background relative scroll-mt-32" id="booking">
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
//                 ></iframe>
//               </div>
//               <div className="text-center mt-4">
//                 <p className="text-muted-foreground mb-2">
//                   Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
//                 </p>
//                 <Button
//                   variant="link"
//                   className="text-primary"
//                   asChild
//                 >
//                   <a
//                     href="https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Open in Google Maps
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout >
//     </>
//   );
// };

// export default Contact;