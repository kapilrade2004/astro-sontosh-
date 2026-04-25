import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  quickServices,
  serviceCategories,
  type ServiceCategory,
} from "@/data/quickServices";

const ALL = "all" as const;
type Filter = ServiceCategory | typeof ALL;

export const QuickServicesPage = () => {
  const [active, setActive] = useState<Filter>(ALL);

  const filtered =
    active === ALL
      ? quickServices
      : quickServices.filter((s) => s.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-4 overflow-hidden">
        {/* ambient glow — matches other pages */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />
          <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* pill badge — same pattern as other pages */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Quick Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold leading-tight"
          >
            Get{" "}
            <span className="text-gradient-gold">Instant Answers</span>
            <br />
            from the Stars
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Focused, affordable astrological guidance delivered straight to
            your WhatsApp — no long consultations needed.
          </motion.p>

          {/* trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
          >
            {[
              { emoji: "⚡", label: "Answers in 2–24 hrs" },
              { emoji: "📱", label: "Delivered on WhatsApp" },
              { emoji: "🔒", label: "Secure Payment" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────── */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── CATEGORY FILTER ───────────────────────────────────── */}
      <section className="pt-8 pb-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FilterBtn
              active={active === ALL}
              onClick={() => setActive(ALL)}
              label="All Services"
              emoji="🔮"
              count={quickServices.length}
            />
            {serviceCategories.map((cat) => (
              <FilterBtn
                key={cat.id}
                active={active === cat.id}
                onClick={() => setActive(cat.id)}
                label={cat.label}
                emoji={cat.emoji}
                count={quickServices.filter((s) => s.category === cat.id).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────── */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* count label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold whitespace-nowrap">
              {filtered.length} Service{filtered.length !== 1 ? "s" : ""}
              {active !== ALL &&
                ` · ${serviceCategories.find((c) => c.id === active)?.label}`}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA STRIP ──────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center cosmic-card p-8 space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-bold">
            Need a Full Consultation?
          </p>
          <h3 className="font-serif text-2xl font-bold">
            Book a <span className="text-gradient-gold">Personal Session</span>
          </h3>
          <p className="text-muted-foreground text-sm">
            For deeper life questions, book a 30 or 60-minute one-on-one session.
          </p>
          <Link
            to="/contact#booking"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm glow-gold hover:bg-primary/90 transition-colors"
          >
            Book Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ── Filter Button ────────────────────────────────────────────────
const FilterBtn = ({
  active,
  onClick,
  label,
  emoji,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  emoji: string;
  count: number;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold
      transition-all duration-200 border
      ${active
        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
        : "bg-background/50 text-muted-foreground border-primary/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5"
      }
    `}
  >
    <span>{emoji}</span>
    {label}
    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"}`}>
      {count}
    </span>
  </button>
);

// ── Service Card ─────────────────────────────────────────────────
const ServiceCard = ({ service }: { service: (typeof quickServices)[0] }) => {
  const Icon = service.icon;
  const catLabel = serviceCategories.find((c) => c.id === service.category);

  return (
    <Link to={`/quick-services/${service.slug}`} className="group block h-full">
      {/* cosmic-card matches your site's existing card style */}
      <div className="cosmic-card h-full flex flex-col p-5 gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer">

        {/* top row: icon + category badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary/80 border border-primary/15 px-2 py-1 rounded-full whitespace-nowrap">
            {catLabel?.emoji} {catLabel?.label}
          </span>
        </div>

        {/* title */}
        <h3 className="font-serif font-bold text-base leading-snug group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>

        {/* description */}
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {service.shortDescription}
        </p>

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

        {/* footer: delivery + price + CTA */}
        <div className="flex items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3 text-primary/50" />
              <span>Delivered in {service.deliveryTime}</span>
            </div>
            <p className="text-xl font-bold text-gradient-gold font-serif">
              ₹{service.price.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold bg-primary text-primary-foreground px-3 py-2 rounded-xl group-hover:glow-gold transition-all duration-200 group-hover:scale-105 shrink-0">
            Get Answer
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuickServicesPage;