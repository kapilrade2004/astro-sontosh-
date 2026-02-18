import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/+918879731174"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white w-14 h-14 px-0 md:w-auto md:px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group md:gap-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" />
      <span className="hidden md:block font-bold text-xl">Chat Now</span>
    </motion.a>
  );
};
