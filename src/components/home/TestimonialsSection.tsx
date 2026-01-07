import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "The career guidance I received was incredibly accurate. I was skeptical at first, but the prediction about my job change came true within the exact timeframe mentioned. The remedies suggested have brought immense positivity into my life.",
    service: "Career Astrology",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    text: "After struggling with business losses for years, the Vastu consultation transformed everything. Simple changes without any demolition brought a complete turnaround in my finances within 6 months.",
    service: "Vastu Consultation",
  },
  {
    name: "Anita Patel",
    location: "Ahmedabad, India",
    rating: 5,
    text: "My marriage was predicted with remarkable accuracy. The matchmaking analysis helped us understand our compatibility deeply. We've been happily married for 5 years now. Forever grateful!",
    service: "Marriage Astrology",
  },
  {
    name: "Vikram Singh",
    location: "Bangalore, India",
    rating: 5,
    text: "The numerology session changed my perspective completely. The name correction and mobile number analysis have visibly improved my luck and business dealings. Highly recommend!",
    service: "Numerology",
  },
  {
    name: "Meera Reddy",
    location: "Hyderabad, India",
    rating: 5,
    text: "The palm reading was eye-opening. Not only did it reveal my life path clearly, but the remedies for health concerns have been truly effective. A genuine and knowledgeable consultant.",
    service: "Palmistry",
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
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
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
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-primary" : "bg-muted-foreground/30"
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
