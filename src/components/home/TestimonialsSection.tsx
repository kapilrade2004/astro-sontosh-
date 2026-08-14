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
    text: "Santosh Ji provided clear and accurate guidance. His advice was practical, reassuring, and helped me make better decisions. Truly recommended!",
    service: "Astrology",
  },
  {
    name: "Nancy Joshi ",
    location: "Mumbai, India",
    rating: 5,
    image: NANCYJOSHI, // Add your image path here
    text: "A very insightful and positive consultation. Santosh Ji explained everything patiently and gave guidance that was easy to understand and follow.",
    service: "Career Astrology",
  },
  {
    name: "SONALDEVI ",
    location: "Mumbai, India",
    rating: 5,
    image: sonaldevi,
    text: "I really appreciated Santosh Ji’s thoughtful guidance. His calm approach gave me clarity and a positive direction when I needed it most.",
    service: "Vastu Consultation",
  },


  {
    name: "Soumitra Bhattacharya",
    location: "Kolkata, India",
    rating: 5,
    image: SUMITRA,
    text: "Santosh Ji provided thoughtful guidance with a practical approach. His insights helped me gain clarity and bring a more positive balance to my personal and professional life.",
    service: "Palmistry",
  },
  {
    name: "Kuheli Sinha Majumder",
    location: "Bangalore, India",
    rating: 5,
    image: KUHELI,
    text: "Santosh Ji’s guidance was precise, supportive, and easy to understand. His insights helped me look at my challenges with a more positive perspective.",
    service: "Child Astrology, Health Astrology, Career Astrology",
  },
  {
    name: "Anisha Surve",
    location: "India",
    rating: 5,
    image: "/path-to-anisha.jpg",
    text: "The Kundli analysis was clear, detailed, and easy to understand. Santosh Ji’s guidance gave me a better perspective and helped me move forward with confidence.",
    service: "Kundli Analysis",
  },
  {
    name: "Laxmi Ghute",
    location: "Chandrapur, Maharashtra",
    rating: 5,
    image: "/path-to-laxmi.jpg",
    text: "A wonderful experience with clear and meaningful guidance. Santosh Ji explained things very well and gave practical insights that I truly appreciated.",
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
    <section className="py-10 md:py-16 bg-gradient-cosmic relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6 md:mb-10"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3">
            Stories of <span className="text-gradient-gold">Transformation</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Hear from our clients who experienced real changes in their lives
            through our guidance and remedies.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="cosmic-card p-4 sm:p-7 md:p-10 min-h-[220px] flex items-center">
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
                <div className="flex flex-col items-center mb-3 sm:mb-4">
                  {/* Profile Image */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 ring-2 ring-primary/20">
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
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary/50" />
                    </div>
                  </div>

                  {/* <Quote className="w-10 h-10 text-primary/30" /> */}
                </div>

                <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed mb-4 sm:mb-6 italic text-center">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="font-serif text-base sm:text-lg font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex gap-1 mb-0.5 justify-end">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="text-primary text-xs sm:text-sm font-medium">
                      {testimonials[currentIndex].service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4 sm:mt-6">
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