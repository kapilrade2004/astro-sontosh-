// import { Helmet } from "react-helmet-async";
// import { motion } from "framer-motion";
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
//   Scan, Wind, DoorOpen, Building2, Wrench,
//   ArrowRight, CheckCircle
// } from "lucide-react";
// import earthImg from "../assets/earth.jpeg";
// import waterImg from "../assets/water.jpeg";
// import fireImg from "../assets/fire.jpeg";
// import airImg from "../assets/air.jpeg";
// import spaceImg from "../assets/space.jpeg";

// const services = [
//   {
//     icon: Scan,
//     title: "Energy Diagnosis of Property",
//     description: "Comprehensive scanning of your land, buildings, and directions to detect hidden defects. Identify negative energy zones affecting money, health, and peace in your property.",
//     features: ["Land energy scanning", "Building analysis", "Direction assessment", "Negative zone identification", "Energy flow mapping"],
//   },
//   {
//     icon: Wind,
//     title: "Panch Tatva Balancing (Five-Element Balancing)",
//     description: "Fix imbalances in the five cosmic elements - Earth, Water, Fire, Air, and Space. Proper balance of these elements brings growth, harmony, stability, and prosperity to your life.",
//     features: ["Element identification", "Imbalance correction", "Harmony restoration", "Growth enhancement", "Energy stabilization"],
//   },
//   {
//     icon: DoorOpen,
//     title: "Entrance, Layout & Direction Corrections",
//     description: "Optimize the placement of your main door, bedrooms, kitchen, staircase, and toilets. Proper positioning attracts better opportunities and removes obstacles from your path.",
//     features: ["Main door optimization", "Bedroom placement", "Kitchen direction", "Staircase positioning", "Toilet location correction"],
//   },
//   {
//     icon: Building2,
//     title: "Business & Career Growth Vastu",
//     description: "Specialized Vastu solutions for shops, offices, and industries. Improve sales, increase profits, enhance decision-making power, and attract more customers.",
//     features: ["Shop Vastu", "Office optimization", "Factory layout", "Sales improvement", "Decision power enhancement"],
//   },
//   {
//     icon: Wrench,
//     title: "Vastu Without Demolition",
//     description: "Modern Vastu remedies that require no breaking or construction. Scientific solutions using design alignment, colors, shapes, objects, and energy healing techniques.",
//     features: ["Non-destructive methods", "Color therapy", "Object placement", "Design alignment", "Energy healing"],
//   },
// ];

// const elements = [
//   { image: earthImg, title: "Earth (Prithvi)", description: "Stability, strength, and grounding energy", color: "from-amber-600/20 to-amber-700/10" },
//   { image: waterImg, title: "Water (Jal)", description: "Flow, prosperity, and emotional balance", color: "from-blue-500/20 to-blue-600/10" },
//   { image: fireImg, title: "Fire (Agni)", description: "Energy, transformation, and vitality", color: "from-red-500/20 to-red-600/10" },
//   { image: airImg, title: "Air (Vayu)", description: "Movement, growth, and fresh opportunities", color: "from-cyan-500/20 to-cyan-600/10" },
//   { image: spaceImg, title: "Space (Akash)", description: "Expansion, clarity, and cosmic connection", color: "from-purple-500/20 to-purple-600/10" },
// ];

// const faqs = [
//   {
//     question: "Do I need to demolish parts of my house for Vastu?",
//     answer: "No, modern Vastu offers powerful remedies without any demolition. Through strategic placement of colors, objects, yantras, and energy healing techniques, we can balance your property's energy effectively.",
//   },
//   {
//     question: "How long does it take to see results after Vastu corrections?",
//     answer: "Most clients report noticeable changes within 21-45 days of implementing Vastu remedies. However, some benefits may be immediate while deeper changes unfold over 3-6 months.",
//   },
//   {
//     question: "Can Vastu help with financial problems?",
//     answer: "Yes, Vastu directly impacts the flow of wealth energy in your property. Correcting the North and Northeast directions, optimizing the placement of lockers, and balancing elements can significantly improve finances.",
//   },
//   {
//     question: "Is online Vastu consultation effective?",
//     answer: "Absolutely. With detailed floor plans, photographs, and compass directions, we can provide comprehensive Vastu analysis and remedies remotely. Many clients have benefited from our online consultations.",
//   },
//   {
//     question: "Can Vastu help with health issues?",
//     answer: "Vastu affects your living environment's energy, which directly impacts health. Issues like constant illness, sleep problems, and chronic fatigue often improve after Vastu corrections, especially in bedrooms and kitchens.",
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

// const Vastu = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Vastu Shastra Services - Property Energy Diagnosis, Five Element Balancing | Astro Santosh Pandey</title>
//         <meta name="description" content="Expert Vastu Shastra services including property energy diagnosis, Panch Tatva balancing, direction corrections, business Vastu, and modern remedies without demolition." />
//         <link rel="canonical" href="https://astrosantoshpandey.com/vastu" />
//       </Helmet>
//       <Layout>
//   {/* Hero Section */}
//         <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">

//               {/* Left: Text Content */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 {/* Service Label */}
//                 <span className="text-primary font-medium text-sm uppercase tracking-wider">
//                   Vastu Shastra – Harmonizing Space & Energy
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
//                     नमस्ते वास्तु पुरुष भूश्य्या भिरत प्रभो ।
//                     <br />
//                     मद्घृं धन धन्यादि समृद्धं कुरु सर्वदा
//                     <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
//                   </div>
//                 </motion.div>

//                 {/* Main Heading */}
//                 <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
//                   Harmonize Your <span className="text-gradient-gold">Living Space</span> for Prosperity
//                 </h1>

//                 {/* Description */}
//                 <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
//                   Vastu Shastra balances the five elements — Earth, Water, Fire, Air, and Space — to create harmony, prosperity, and peace.
//                 </p>

//                 {/* CTA Button */}
//                 <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
//                   <Link to="/contact#booking">
//                     Book Vastu Audit
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </Link>
//                 </Button>
//               </motion.div>

//               {/* Right: Vastu Image */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.7, delay: 0.3 }}
//                 className="hidden lg:flex justify-center items-center"
//               >
//                 <div className="relative w-full max-w-lg">
//                   {/* Outer golden glow */}
//                   <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/30 via-yellow-300/15 to-transparent blur-3xl animate-pulse pointer-events-none" />

//                   {/* Image container */}
//                   <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                     <img
//                       src="/src/assets/vastu.jpeg"
//                       alt="Vastu Shastra - Sacred Architecture"
//                       className="w-full h-auto object-cover rounded-2xl"
//                       style={{
//                         filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
//                       }}
//                     />

//                     {/* Subtle dark overlay at bottom for depth */}
//                     <div
//                       className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
//                       style={{
//                         background:
//                           "linear-gradient(to top, rgba(8,4,20,0.6) 0%, transparent 100%)",
//                       }}
//                     />

//                     {/* Gold shimmer at top */}
//                     <div
//                       className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
//                       style={{
//                         background:
//                           "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)",
//                       }}
//                     />
//                   </div>

//                   {/* Gold border ring */}
//                   <div
//                     className="absolute inset-0 rounded-2xl pointer-events-none"
//                     style={{
//                       boxShadow:
//                         "inset 0 0 0 1.5px rgba(251,191,36,0.4), 0 0 35px rgba(251,191,36,0.2), 0 0 70px rgba(218,165,32,0.1)",
//                     }}
//                   />
//                 </div>
//               </motion.div>

//             </div>
//           </div>
//         </section>

//         {/* Five Elements */}
//         <section className="py-20 bg-background border-b border-border">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
//                 The <span className="text-gradient-gold">Panch Tatva</span> (Five Elements)
//               </h2>
//               <p className="text-muted-foreground">
//                 Balance these cosmic elements in your property for complete harmony and prosperity.
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//               {elements.map((element, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="cosmic-card p-4 text-center group hover:scale-105 transition-transform"
//                 >
//                   <div className={`w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20 group-hover:border-primary/50 transition-colors shadow-lg`}>
//                     <img
//                       src={element.image}
//                       alt={element.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                   </div>
//                   <h3 className="font-semibold text-sm md:text-base mb-2">{element.title}</h3>
//                   <p className="text-muted-foreground text-xs md:text-sm">{element.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section className="py-20 bg-background">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
//                 Our <span className="text-gradient-gold">Vastu Services</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Comprehensive Vastu solutions for homes, offices, and commercial properties.
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
//                 Ready to <span className="text-gradient-gold">Transform Your Space</span>?
//               </h2>
//               <p className="text-muted-foreground text-lg mb-8">
//                 Book your Vastu audit today and discover how simple changes can bring
//                 profound improvements to your life.
//               </p>
//               <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
//                 <Link to="/contact#booking">
//                   Book Vastu Audit
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Link>
//               </Button>
//             </motion.div>
//           </div>
//         </section>
//       </Layout >
//     </>
//   );
// };

// export default Vastu;



//test





import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
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
  Scan, Wind, DoorOpen, Building2, Wrench,
  ArrowRight, CheckCircle
} from "lucide-react";
import earthImg from "../assets/earth.jpeg";
import waterImg from "../assets/water.jpeg";
import fireImg from "../assets/fire.jpeg";
import airImg from "../assets/air.jpeg";
import spaceImg from "../assets/space.jpeg";

const services = [
  {
    icon: Scan,
    title: "Energy Diagnosis of Property",
    description: "Comprehensive scanning of your land, buildings, and directions to detect hidden defects. Identify negative energy zones affecting money, health, and peace in your property.",
    features: ["Land energy scanning", "Building analysis", "Direction assessment", "Negative zone identification", "Energy flow mapping"],
  },
  {
    icon: Wind,
    title: "Panch Tatva Balancing (Five-Element Balancing)",
    description: "Fix imbalances in the five cosmic elements - Earth, Water, Fire, Air, and Space. Proper balance of these elements brings growth, harmony, stability, and prosperity to your life.",
    features: ["Element identification", "Imbalance correction", "Harmony restoration", "Growth enhancement", "Energy stabilization"],
  },
  {
    icon: DoorOpen,
    title: "Entrance, Layout & Direction Corrections",
    description: "Optimize the placement of your main door, bedrooms, kitchen, staircase, and toilets. Proper positioning attracts better opportunities and removes obstacles from your path.",
    features: ["Main door optimization", "Bedroom placement", "Kitchen direction", "Staircase positioning", "Toilet location correction"],
  },
  {
    icon: Building2,
    title: "Business & Career Growth Vastu",
    description: "Specialized Vastu solutions for shops, offices, and industries. Improve sales, increase profits, enhance decision-making power, and attract more customers.",
    features: ["Shop Vastu", "Office optimization", "Factory layout", "Sales improvement", "Decision power enhancement"],
  },
  {
    icon: Wrench,
    title: "Vastu Without Demolition",
    description: "Modern Vastu remedies that require no breaking or construction. Scientific solutions using design alignment, colors, shapes, objects, and energy healing techniques.",
    features: ["Non-destructive methods", "Color therapy", "Object placement", "Design alignment", "Energy healing"],
  },
];

const elements = [
  { image: earthImg, title: "Earth (Prithvi)", description: "Stability, strength, and grounding energy", color: "from-amber-600/20 to-amber-700/10" },
  { image: waterImg, title: "Water (Jal)", description: "Flow, prosperity, and emotional balance", color: "from-blue-500/20 to-blue-600/10" },
  { image: fireImg, title: "Fire (Agni)", description: "Energy, transformation, and vitality", color: "from-red-500/20 to-red-600/10" },
  { image: airImg, title: "Air (Vayu)", description: "Movement, growth, and fresh opportunities", color: "from-cyan-500/20 to-cyan-600/10" },
  { image: spaceImg, title: "Space (Akash)", description: "Expansion, clarity, and cosmic connection", color: "from-purple-500/20 to-purple-600/10" },
];

const faqs = [
  {
    question: "Do I need to demolish parts of my house for Vastu?",
    answer: "No, modern Vastu offers powerful remedies without any demolition. Through strategic placement of colors, objects, yantras, and energy healing techniques, we can balance your property's energy effectively.",
  },
  {
    question: "How long does it take to see results after Vastu corrections?",
    answer: "Most clients report noticeable changes within 21-45 days of implementing Vastu remedies. However, some benefits may be immediate while deeper changes unfold over 3-6 months.",
  },
  {
    question: "Can Vastu help with financial problems?",
    answer: "Yes, Vastu directly impacts the flow of wealth energy in your property. Correcting the North and Northeast directions, optimizing the placement of lockers, and balancing elements can significantly improve finances.",
  },
  {
    question: "Is online Vastu consultation effective?",
    answer: "Absolutely. With detailed floor plans, photographs, and compass directions, we can provide comprehensive Vastu analysis and remedies remotely. Many clients have benefited from our online consultations.",
  },
  {
    question: "Can Vastu help with health issues?",
    answer: "Vastu affects your living environment's energy, which directly impacts health. Issues like constant illness, sleep problems, and chronic fatigue often improve after Vastu corrections, especially in bedrooms and kitchens.",
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

/* ── Reusable Vastu Image visual ─────────────────────────────── */
const VastuImage = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const imgClass =
    size === "sm"
      ? "w-full h-48 sm:h-56 object-cover rounded-2xl"
      : "w-full h-auto object-cover rounded-2xl";

  return (
    <div className={`relative w-full ${size === "sm" ? "max-w-sm mx-auto" : "max-w-lg"}`}>
      {/* Outer golden glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/30 via-yellow-300/15 to-transparent blur-3xl animate-pulse pointer-events-none" />

      {/* Image container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="/src/assets/vastu.jpeg"
          alt="Vastu Shastra - Sacred Architecture"
          className={imgClass}
          style={{ filter: "brightness(0.95) contrast(1.05) saturate(1.1)" }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,4,20,0.6) 0%, transparent 100%)",
          }}
        />

        {/* Gold shimmer at top */}
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Gold border ring */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1.5px rgba(251,191,36,0.4), 0 0 35px rgba(251,191,36,0.2), 0 0 70px rgba(218,165,32,0.1)",
        }}
      />
    </div>
  );
};

const Vastu = () => {
  return (
    <>
      <Helmet>
        <title>Vastu Shastra Services - Property Energy Diagnosis, Five Element Balancing | Astro Santosh Pandey</title>
        <meta name="description" content="Expert Vastu Shastra services including property energy diagnosis, Panch Tatva balancing, direction corrections, business Vastu, and modern remedies without demolition." />
        <link rel="canonical" href="https://astrosantoshpandey.com/vastu" />
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
                  Vastu Shastra – Harmonizing Space & Energy
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
                    नमस्ते वास्तु पुरुष भूश्य्या भिरत प्रभो ।
                    <br />
                    मद्घृं धन धन्यादि समृद्धं कुरु सर्वदा
                    <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
                  </div>
                </motion.div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Harmonize Your <span className="text-gradient-gold">Living Space</span> for Prosperity
                </h1>

                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                  Vastu Shastra balances the five elements — Earth, Water, Fire, Air, and Space — to create harmony, prosperity, and peace.
                </p>

                {/* ── MOBILE: Vastu image between description and button ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex lg:hidden justify-center items-center mb-8"
                >
                  <VastuImage size="sm" />
                </motion.div>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                  asChild
                >
                  <Link to="/contact#booking">
                    Book Vastu Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              {/* Right: Vastu Image — desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center"
              >
                <VastuImage size="lg" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Five Elements ── */}
        <section className="py-20 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                The <span className="text-gradient-gold">Panch Tatva</span> (Five Elements)
              </h2>
              <p className="text-muted-foreground">
                Balance these cosmic elements in your property for complete harmony and prosperity.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {elements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-4 text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20 group-hover:border-primary/50 transition-colors shadow-lg">
                    <img
                      src={element.image}
                      alt={element.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-2">{element.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{element.description}</p>
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
                Our <span className="text-gradient-gold">Vastu Services</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive Vastu solutions for homes, offices, and commercial properties.
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
                Ready to <span className="text-gradient-gold">Transform Your Space</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Book your Vastu audit today and discover how simple changes can bring
                profound improvements to your life.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                asChild
              >
                <Link to="/contact#booking">
                  Book Vastu Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </Layout>
    </>
  );
};

export default Vastu;