import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-cosmic relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-gold">Transform</span> Your Life?
          </h2>

          {/* <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"> */}
            {/* <p className="text-muted-foreground text-lg"> */}
            {/* <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-10">
            Take the first step towards clarity, success, and peace. Book your personalized
            consultation today and unlock the cosmic secrets of your destiny.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center"> */}

          <p className="text-muted-foreground text-lg">
  Take the first step towards clarity, success, and peace. Book your personalized
  consultation today and unlock the cosmic secrets of your destiny.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold text-lg px-8 py-6" asChild>
              <Link to="/contact#booking">
                Book Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6" asChild>
              <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </a>
            </Button>
          </div>

          <p className="text-muted-foreground text-sm mt-8">
            ✓ Confidential Consultation &nbsp;&nbsp; ✓ Accurate Predictions &nbsp;&nbsp; ✓ Proven Remedies
          </p>
        </motion.div>
      </div>
    </section>
  );
};
