import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";
import PANKAGPATEL from "@/assets/pankajpatel.jpeg";
import NANCYJOSHI from "@/assets/Nancy Joshi.jpeg";
import KUHELI from "@/assets/kuheli.jpeg";
import sonaldevi from "@/assets/sonaldevi.jpeg";
import SUMITRA from "@/assets/sumitra-bhattacharya.jpeg"
import ANKITAPRAB from "@/assets/ankitaprab.jpeg"

const testimonials = [

  {
    name: "Pankaj Patel",
    location: "Mumbai, India",
    rating: 5,
    image: PANKAGPATEL, // Add your image path here
    text: "It’s my first consultation with Astro Santosh Pandeyji.It was nice elaborative, detailed and everything explained.I would recommend him to anyone.He has got good knowledge and deep expertise.Everything is explained by logic and science behind it.",
    service: "Career Astrology",
  },
  {
    name: "Ankita Parab",
    location: "Virar,Maharashtra",
    rating: 5,
    image: ANKITAPRAB, // Add your image path here
    text: "Astrologer Santosh Ji gave me truly great guidance at a time when I was very confused. His advice was accurate, practical, and deeply reassuring. The remedies he suggested were simple yet very effective, and they helped me see my situation with much more clarity.What I appreciated the most was his calm approach and honest guidance—he didn’t create fear, only solutions. After speaking with him, I felt mentally lighter and more confident about my decisions.I genuinely recommend Santosh Ji to anyone who is facing personal or life-related problems and needs clear, trustworthy guidance. 🙏✨",
    service: "Astrology",
  },
  {
    name: "Nancy Joshi ",
    location: "Mumbai, India",
    rating: 5,
    image: NANCYJOSHI, // Add your image path here
    text: "I truly appreciated the depth and clarity of this astrologer Santosh Pandey.  He took the time to understand my concerns and explained everything in a calm, thoughtful manner. The insights felt accurate and meaningful, not rushed or generic. What stood out most was the practical guidance, which helped me see my situation from a more balanced and positive perspective. I left the session feeling reassured and more confident about my next steps. Highly recommended for anyone seeking genuine and mindful guidance.",
    service: "Career Astrology",
  },
  {
    name: "SONALDEVI ",
    location: "Mumbai, India",
    rating: 5,
    image: sonaldevi,
    text: "Radhe Radhe!I consulted Astrologer Santosh Ji at a time when I was seeking clarity for both my health and career. His guidance regarding my diabetes and skin concerns was compassionate, practical, and spiritually uplifting. The remedies suggested were simple yet powerful, and I personally experienced positive results.As I continued my journey with him for career guidance, his insights brought clarity to real-life challenges and helped me take confident, well-aligned decisions. His wisdom and thoughtful approach created a deep sense of trust and inner balance.I express my sincere gratitude to Astrologer Santosh Ji for his divine guidance. I highly recommend him to anyone seeking authentic solutions, clarity, and direction to unlock the right path in life with divine blessings and astrological remedies.",
    service: "Vastu Consultation",
  },


  {
    name: "Soumitra Bhattacharya",
    location: "Kolkata, India",
    rating: 5,
    image: SUMITRA,
    text: "I’m an ITSM professional working in MNC . My belief system is based on my experiences. I used to be disturbed at some point in time due to my personal life, affecting my professional commitment. I realised that I needed help.I consulted Astro Santosh Pandey, who performed a deep analysis of my birth chat aligned with recent planetary dynamics, to offer precise remedies that has healed me. I am greatful to his services.",
    service: "Palmistry",
  },
  {
    name: "Kuheli Sinha Majumder",
    location: "Bangalore, India",
    rating: 5,
    image: KUHELI,
    text: "2023 onwards I had been facing personal challenges related to my husband’s health/career and deterioration in my neuro diverse child. This in turn took a toll on my mental and physical wellbeing. Despite being a self-driven person and doing my best, I couldn’t get a hold of the situation.  That’s when Universe connected me to Santoshji. His precision on reading all our charts gave us clarity on ‘Whys’. Add on was his non-judgmental demeanor that made me feel completely supported and heard. Thereafter his intuitive approach and predictions helped me to navigate through the challenges. The remedies were customized to ensure that it wasn’t too overwhelming for a person like me with limited spiritual aptitude.  I will lifelong be indebted to him for the equivocal support extended at a time when I could see no ray of hope. I would highly recommend him to anyone who is unable to bowl the googly that life throws upon. Thanks to him, the science behind the stars feel accessible and real🙏",
    service: "Child Astrology, Health Astrology, Career Astrology",
  },
  {
    name: "Anisha Surve",
    location: "India",
    rating: 5,
    image: "/path-to-anisha.jpg",
    text: "Consulting with Astro Santosh Pandeyji has truly been a blessing in my life. I feel honoured to express my heartfelt gratitude for his invaluable guidance and insights. Understanding the details of my Kundli through a factual and logical approach has provided me with a profound perspective on life. His explanations guided me to tackle challenges with a positive mindset, and the remedies provided significantly mitigated these challenges, leading to an overall improvement in my life’s journey. I now consider his guidance as my lifetime go-to resource. Hari Om Namah Shivaay 🙏",
    service: "Kundli Analysis",
  },
  {
    name: "Laxmi Ghute",
    location: "Chandrapur, Maharashtra",
    rating: 5,
    image: "/path-to-laxmi.jpg",
    text: "I am deeply grateful to Santosh Pandey ji for the guidance and learning I received. This experience was not limited to a consultation; it was a genuine process of understanding and transformation. My horoscope was analyzed with exceptional depth, clarity, and accuracy, and the remedies suggested were practical and truly effective. What sets him apart is his ability to teach astrology logically, with clear reasoning behind every prediction and remedy. This guidance has helped me both personally and professionally, and I highly recommend him to anyone seeking authentic astrology and meaningful results.",
    service: "Astrology & Horoscope Analysis",
  },

];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-cosmic relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Stories of <span className="text-gradient-gold">Transformation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our clients who experienced real changes in their lives
            through our guidance and remedies.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="cosmic-card p-8 md:p-12 min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="flex flex-col items-center mb-6">
                  {/* Profile Image */}
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 ring-2 ring-primary/20">
                    {testimonials[currentIndex].image ? (
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center bg-primary/10 ${testimonials[currentIndex].image ? 'hidden' : ''} fallback-icon`}>
                      <User className="w-10 h-10 text-primary/50" />
                    </div>
                  </div>

                  {/* <Quote className="w-10 h-10 text-primary/30" /> */}
                </div>

                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic text-center">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="font-serif text-xl font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex gap-1 mb-1 justify-end">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="text-primary text-sm font-medium">
                      {testimonials[currentIndex].service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-primary" : "bg-muted-foreground/30"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};