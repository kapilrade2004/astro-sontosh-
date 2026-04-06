import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronRight, Turtle, X } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import TUVV from "@/assets/The-Ultimate-Vishwakarma-Vastu-Course-1.png";
import SRPD from "@/assets/Santosh Radheshyam Pandey_Diploma_Palmistry - Certificate -1.png";
import SRPDA from "@/assets/Santosh Radheshyam Pandey_Diploma_Astrology-1.png";
import CTUAC from "@/assets/certificate-the-ultimate-astrology-course-659d0b0f793ea1f49f00fe4d-1.png"
import CRPBA from "@/assets/certificate-retrograde-planets-by-astro-arun-pandit-674476f971f0653e20048e85-1.png";
import CMPM from "@/assets/certificate-marriage-prediction-mastery-crash-course-678a3165f1f2ad27a3004247-1.png";
import CKMCBA from "@/assets/certificate-kundli-mastery-course-by-astro-arun-pandit-687647f35bca75814702c115-1.png";
import CBNCBA from "@/assets/certificate-basic-nakshatra-course-by-astro-arun-pandit-67178ad1c2832854f70c8694-1.png";
import C360ARB from "@/assets/certificate-360-astro-remedies-bootcamp-by-astro-arun-pandit-68511d95bfdcfa48780f5238-1.png";
import CAEC from "@/assets/astroexpertcursecertificate.jpeg";
import AVS from "@/assets/Astro-Vastu-Shastra-1.png";
import ATOETC from "@/assets/Advance-Timing-of-Events-Transit-Course-1.png";
import SPOA10 from "@/assets/10-Sureshot-Prediction-of-Astrology-1.png";
import CAG from "@/assets/Crystal-And-Gemstone-1.png"
import RC from "@/assets/Rudraksha-Course-1.png"
import CA from "@/assets/4. Certificate_Certificate_Astrology _page-0001.jpg"
import MCP from "@/assets/certificate-d10-chart-bootcamp-course-by-astro-arun-pandit-67c8194a8ed4440b570f0c07_page-0001.jpg"
import MCA from "@/assets/Mastery - Medical Astrology_page-0001.jpg"
import MDA from "@/assets/Mastery - Dasha Analysis.pdf_page-0001.jpg"
import MCHA from "@/assets/Mastery - Child Astrology_page-0001.jpg"
import MCHA2 from "@/assets/Mastery.jpeg"
import MCIPA from "@/assets/Master_in_Palmistry.png"
const certifications = [

    {
    id: 1,
    title: "Master in Palmistry",
    image: MCIPA,
    verified: true,
  },
  {
    id: 2,
    title: "Astro Expertise",
    image: CAEC,
    verified: true,
  },
  {
    id: 3,
    title: "Diploma in Palmistry",
    image: SRPD,
    verified: true,
  },
  {
    id: 4,
    title: "Diploma in Astrology",
    image: SRPDA,
    verified: true,
  },
  {
    id: 5,
    title: "Ultimate Astrology ",
    image: CTUAC,
    verified: true,
  },
  {
    id: 6,
    title: "Mastery - Retrograde Planets",
    image: CRPBA,
    verified: true,
  },

  {
    id: 7,
    title: "Mastery - Marriage Prediction",
    image: CMPM,
    verified: true,
  },
  {
    id: 8,
    title: "Mastery - Kundali Reading",
    image: CKMCBA,
    verified: true,
  },
  {
    id: 9,
    title: " Mastery - Nakshatra",
    image: CBNCBA,
    verified: true,
  },
  {
    id: 10,
    title: "Mastery - Astro Remedies",
    image: C360ARB,
    verified: true,
  },
  {
    id: 11,
    title: " Advanced Astro Vastu Shastra",
    image: AVS,
    verified: true,
  },
  {
    id: 12,
    title: "Mastery - Timing of Events / Transit",
    image: ATOETC,
    verified: true,
  },
  {
    id: 13,
    title: "Mastery - 10 Sureshot Prediction",
    image: SPOA10,
    verified: true,
  },

  {
    id: 14,
    title: " Mastery - Crystal & Gemstone",
    image: CAG,
    verified: true,
  },
  {
    id: 15,
    title: "Mastery - Rudraksha",
    image: RC,
    verified: true,
  },
  {
    id: 16,
    title: "The Ultimate Vishwakarma Vastu",
    image: TUVV,
    verified: true,
  },
  {
    id: 17,
    title: "Certification in Astrology",
    image: CA,
    verified: true,
  },
  {
    id: 18,
    title: "Mastery - Career Prediction",
    image: MCP,
    verified: true,
  },

{
  id: 19,
  title: "Mastery - Medical Astrology",
  image: MCA,
  verified: true,
},
{
  id: 20,
  title: "Mastery - Dasha Analysis",
  image: MDA,
  verified: true,
},
{
  id: 21,
  title: "Mastery - Child Astrology",
  image: MCHA,
  verified: true,
},



{
  id: 22,
  title: "Mastery - Conjunction Analysis",
  image: MCHA2,
  verified: true,
},

];

export default function CertificationsShowcase() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const displayedCerts = showAll ? certifications : certifications.slice(0, 3);

  const handleToggleShowAll = () => {
    if (showAll && sectionRef.current) {
      // When collapsing, scroll to the section smoothly
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

  const openCertificate = (certId: number) => {
    setSelectedCert(certId);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeCertificate = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  const selectedCertData = certifications.find(cert => cert.id === selectedCert);

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-gradient-cosmic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-gold">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Backed by years of rigorous training and internationally recognized qualifications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayedCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cosmic-card group hover:scale-105 transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10 rounded-t-xl overflow-hidden">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${cert.image ? 'hidden' : ''} fallback-icon`}>
                    <Award className="w-20 h-20 text-primary/30" />
                  </div>
                  {cert.verified && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold leading-tight mb-4">
                    {cert.title}
                  </h3>

                  <button
                    onClick={() => openCertificate(cert.id)}
                    className="flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                  >
                    View Certificate
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {certifications.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleShowAll}
                className="group"
              >
                {showAll ? "Show Less" : `View All ${certifications.length} Certifications`}
                <ChevronRight className={`w-5 h-5 ml-2 transition-transform ${showAll ? "rotate-90" : "group-hover:translate-x-1"}`} />
              </Button>
            </motion.div>
          )}

          {/* Stats Row */}
          {/* Stats Row */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-gradient-gold"></div>
              <div className="text-sm text-muted-foreground mt-1">
                Years of Dedicated Practice
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-gradient-gold">Multiple</div>
              <div className="text-sm text-muted-foreground mt-1">
                Astrology Disciplines
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-gradient-gold">Trusted</div>
              <div className="text-sm text-muted-foreground mt-1">
                Guidance & Insights
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-gradient-gold">Hundreds</div>
              <div className="text-sm text-muted-foreground mt-1">
                Consultations Delivered
              </div>
            </div>
          </motion.div> */}

        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCertificate}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-background rounded-2xl shadow-2xl overflow-hidden"
              style={{ cursor: 'default' }}
            >
              {/* Close Button */}
              <button
                onClick={closeCertificate}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Image */}
              <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                <img
                  src={selectedCertData.image}
                  alt={selectedCertData.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-xl"
                />
              </div>

              {/* Certificate Info */}
              <div className="p-6 border-t border-border bg-background">
                <div className="flex items-center justify-center">
                  <h3 className="font-serif text-2xl font-bold">
                    {selectedCertData.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}