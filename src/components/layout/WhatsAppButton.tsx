import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/+918879731174"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white w-12 h-12 px-0 md:w-auto md:h-10 md:px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group md:gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-5 w-5" />
      <span className="hidden md:block font-semibold text-sm">Chat Now</span>
    </motion.a>
  );
};
