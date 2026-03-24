import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/ui/CosmicBackground";
import LOGO from "@/assets/logo by yash.png";
import HeroImg from "@/assets/HeroImg.jpeg";

/* ── animation presets ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

const fadeScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.85, delay, ease },
});

/* ── decorative zodiac glyphs (bg atmosphere) ──────────────── */
const GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-hero"
      style={{ paddingTop: "var(--navbar-height, 80px)" }}
    >
      {/* ── backgrounds ── */}
      <CosmicBackground />

      {/* deep centre glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)",
        }}
      />

      {/* faint left-side violet glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at -5% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)",
        }}
      />

      {/* faint right-side gold glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── floating zodiac glyphs ── */}
      {GLYPHS.map((g, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none font-serif"
          style={{
            top:      `${6  + ((i * 73) % 82)}%`,
            left:     `${2  + ((i * 61) % 95)}%`,
            fontSize: `${28 + ((i * 17) % 28)}px`,
            color:    `rgba(251,191,36,${0.03 + (i % 3) * 0.015})`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.03, 0.09, 0.03] }}
          transition={{ duration: 7 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
        >
          {g}
        </motion.span>
      ))}

      {/* ── top gold divider ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10 mt-5 lg:mt-7" style={{ maxWidth: "90rem" }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
          className="h-px origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 15%, rgba(251,191,36,0.6) 50%, rgba(251,191,36,0.12) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          3-COLUMN GRID  —  text | logo+shloka | photo
         ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto w-full px-6 lg:px-10 py-8 lg:py-12"
        style={{ maxWidth: "90rem" }}
      >
        <div
          className="grid items-center gap-x-8 lg:gap-x-14"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >

          {/* ══ COL 1 — Headline + Subtext ══ */}
          <div className="flex flex-col items-start">

            {/* heading */}
            <motion.h1
              {...fadeLeft(0.15)}
              className="font-serif font-bold leading-[1.13] mb-5 lg:mb-6"
              style={{ fontSize: "clamp(1.6rem, 3vw, 3.2rem)" }}
            >
              Transform Your Life{" "}
              <span
                className="block"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                With Expert
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)",
                }}
              >
                Astrology, Numerology,
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)",
                }}
              >
                Vastu &amp; Palmistry
              </span>
              <span
                className="block"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Guidance
              </span>
            </motion.h1>

            {/* thin gold rule */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              className="h-px mb-5 lg:mb-6 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)",
              }}
            />

            {/* subtext */}
            <motion.p
              {...fadeLeft(0.38)}
              className="leading-relaxed"
              style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                color: "rgba(255,255,255,0.58)",
                maxWidth: "24rem",
              }}
            >
              Accurate predictions, personalised remedies, and life-changing
              solutions for career, marriage, finance, health &amp; peace.
            </motion.p>

            {/* CTA slot */}
            <motion.div
              {...fadeUp(0.48)}
              className="mt-7 lg:mt-9 flex flex-wrap gap-3"
            />
          </div>

          {/* ══ COL 2 — Logo + Shloka ══ */}
          <motion.div
            {...fadeScale(0.1)}
            className="flex flex-col items-center gap-3"
            style={{ minWidth: "clamp(180px, 18vw, 280px)" }}
          >
            {/* logo glow disc */}
            <div className="relative flex items-center justify-center">
              <div
                className="pointer-events-none absolute rounded-full blur-2xl"
                style={{
                  width:  "clamp(170px, 18vw, 290px)",
                  height: "clamp(170px, 18vw, 290px)",
                  background:
                    "radial-gradient(circle, rgba(251,191,36,0.26) 0%, transparent 70%)",
                }}
              />
              <motion.img
                src={LOGO}
                alt="Astro Santosh Pandey Logo"
                className="relative z-10 h-auto object-contain"
                style={{ width: "clamp(150px, 16vw, 260px)", filter: "drop-shadow(0 0 32px rgba(251,191,36,0.45))" }}
                animate={{ y: [-6, 0, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* ornament row */}
            <div className="flex items-center gap-1.5">
              {[4, 4, 6, 4, 4].map((sz, i) => (
                <span
                  key={i}
                  className="rounded-full inline-block"
                  style={{
                    width:      sz,
                    height:     sz,
                    background: i === 2 ? "rgba(251,191,36,1)" : "rgba(251,191,36,0.38)",
                    boxShadow:  i === 2 ? "0 0 8px rgba(251,191,36,0.7)" : "none",
                  }}
                />
              ))}
            </div>

            {/* shloka */}
            <motion.div
              {...fadeUp(0.32)}
              className="relative px-4 py-2 rounded-lg"
              style={{
                background: "rgba(251,191,36,0.055)",
                border:     "1px solid rgba(251,191,36,0.22)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* inner glow */}
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 120%, rgba(251,191,36,0.18) 0%, transparent 65%)",
                }}
              />
              <p
                className="relative font-bold whitespace-nowrap text-center"
                style={{
                  fontSize: "clamp(0.72rem, 1vw, 0.95rem)",
                  backgroundImage:
                    "linear-gradient(90deg, #fef3c7 0%, #fde68a 25%, #fbbf24 50%, #fde68a 75%, #fef3c7 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200% auto",
                }}
              >
                ॥ धर्मो रक्षति रक्षितः ॥
              </p>
            </motion.div>
          </motion.div>

          {/* ══ COL 3 — Astrologer Photo ══ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            className="flex justify-end items-start"
          >
            <div className="relative flex items-center justify-center">

              {/* outer ambient glow */}
              <div
                className="pointer-events-none absolute rounded-full blur-3xl"
                style={{
                  width:  "clamp(200px, 24vw, 420px)",
                  height: "clamp(200px, 24vw, 420px)",
                  background:
                    "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
                }}
              />

              {/* pulse rings */}
              {[
                { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
                { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
                { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border pointer-events-none"
                  animate={{ scale: r.s, opacity: r.o }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
                  style={{
                    width:       "clamp(160px, 18vw, 300px)",
                    height:      "clamp(160px, 18vw, 300px)",
                    borderColor: r.color,
                  }}
                />
              ))}

              {/* ── image card ── */}
              <motion.div
                animate={{ y: [-7, 0, -7] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                {/* corner bracket accents */}
                {[
                  { top: -10, left:  -10, borderTop:    "1.5px solid", borderLeft:   "1.5px solid" },
                  { top: -10, right: -10, borderTop:    "1.5px solid", borderRight:  "1.5px solid" },
                  { bottom: -10, left:  -10, borderBottom: "1.5px solid", borderLeft:  "1.5px solid" },
                  { bottom: -10, right: -10, borderBottom: "1.5px solid", borderRight: "1.5px solid" },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="absolute pointer-events-none"
                    style={{
                      ...c,
                      width:       22,
                      height:      22,
                      borderColor: "rgba(251,191,36,0.75)",
                      borderRadius: 3,
                    }}
                  />
                ))}

                {/* card */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "#06060f",
                    boxShadow: [
                      "0 0 0 1px rgba(251,191,36,0.38)",
                      "0 0 28px rgba(251,191,36,0.15)",
                      "0 0 70px rgba(251,191,36,0.07)",
                      "inset 0 1px 0 rgba(255,255,255,0.04)",
                      "0 32px 64px rgba(0,0,0,0.6)",
                    ].join(", "),
                  }}
                >
                  <img
                    src={HeroImg}
                    alt="Astro Santosh Pandey"
                    className="block h-auto object-cover object-top"
                    style={{
                      width:      "clamp(175px, 20vw, 310px)",
                      mixBlendMode: "screen",
                      filter:     "brightness(0.94) contrast(1.09) saturate(1.06)",
                    }}
                  />

                  {/* top gold shimmer */}
                  <div
                    className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 70%)",
                    }}
                  />

                  {/* bottom fade */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,6,15,0.96) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </motion.div>

              {/* sparkle dots */}
              {[
                { top: "9%",  left:  "1%",  size: 5, delay: 0.0 },
                { top: "22%", right: "3%",  size: 4, delay: 0.8 },
                { top: "48%", left:  "-1%", size: 6, delay: 1.6 },
                { top: "68%", right: "2%",  size: 4, delay: 0.4 },
                { top: "82%", left:  "5%",  size: 3, delay: 2.0 },
                { top: "33%", right: "0%",  size: 5, delay: 1.2 },
                { top: "58%", left:  "6%",  size: 3, delay: 2.4 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width:      s.size,
                    height:     s.size,
                    top:        s.top,
                    left:       "left"  in s ? s.left  : undefined,
                    right:      "right" in s ? s.right : undefined,
                    background: "rgba(251,191,36,0.85)",
                    boxShadow:  `0 0 ${s.size * 3}px rgba(251,191,36,0.9)`,
                  }}
                  animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── bottom gold divider ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="h-px origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)",
          }}
        />
      </div>

      {/* ── scroll indicator ── */}
      <motion.div
        className="relative z-10 flex justify-center py-5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(251,191,36,0.3)" }}
          >
            <motion.div
              className="w-[3px] h-2.5 rounded-full"
              style={{ background: "rgba(251,191,36,0.65)" }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};