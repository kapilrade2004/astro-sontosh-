
import { useState, useRef } from "react";
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

/* ── decorative zodiac glyphs ──────────────────────────────── */
const GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

/* ── Video ID ───────────────────────────────────────────────── */
const VIDEO_ID = "-hDsJj_ZskU";

/* ══════════════════════════════════════════════════════════════
   AstrologerVideoCard
   ══════════════════════════════════════════════════════════════ */
interface VideoCardProps {
  width: string;
  ringSize: string;
}

const AstrologerVideoCard = ({ width, ringSize }: VideoCardProps) => {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }),
      "*"
    );
  };

  return (
    <div className="relative flex items-center justify-center">

      {/* glow blob */}
      <div
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: ringSize, height: ringSize,
          background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, rgba(139,92,246,0.06) 55%, transparent 100%)",
        }}
      />

      {/* pulsing rings */}
      {[
        { s: [1, 1.25, 1], o: [0.5,  0, 0.5],  delay: 0,   color: "rgba(139,92,246,0.3)"  },
        { s: [1, 1.52, 1], o: [0.35, 0, 0.35], delay: 1.0, color: "rgba(251,191,36,0.25)" },
        { s: [1, 1.80, 1], o: [0.18, 0, 0.18], delay: 2.1, color: "rgba(251,191,36,0.14)" },
      ].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border pointer-events-none"
          animate={{ scale: r.s as number[], opacity: r.o as number[] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          style={{ width: ringSize, height: ringSize, borderColor: r.color }}
        />
      ))}

      {/* floating video */}
      <motion.div
        animate={{ y: [-7, 0, -7] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width,
            aspectRatio: "9 / 16",
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
          {/* YouTube iframe */}
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            title="Astro Santosh Pandey"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            style={{ borderRadius: "inherit" }}
          />

          {/* top gold shimmer overlay */}
          <div
            className="absolute top-0 inset-x-0 h-14 pointer-events-none z-10"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.18) 0%, transparent 70%)" }}
          />

          {/* bottom fade overlay */}
          <div
            className="absolute bottom-0 inset-x-0 h-14 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, rgba(6,6,15,0.95) 0%, transparent 100%)" }}
          />

          {/* 🔊 Tap for Sound button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              text-xs font-semibold transition-all duration-200
              hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:    muted ? "rgba(0,0,0,0.60)" : "rgba(251,191,36,0.15)",
              border:        `1px solid ${muted ? "rgba(255,255,255,0.18)" : "rgba(251,191,36,0.55)"}`,
              color:         muted ? "rgba(255,255,255,0.80)" : "rgba(251,191,36,1)",
              backdropFilter: "blur(8px)",
              whiteSpace:    "nowrap",
            }}
          >
            {muted ? (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                Tap for Sound
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                Sound On
              </>
            )}
          </button>
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
  );
};

/* ══════════════════════════════════════════════════════════════
   HeroSection
   ══════════════════════════════════════════════════════════════ */
export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-hero"
      style={{ paddingTop: "var(--navbar-height, 80px)" }}
    >
      {/* ── backgrounds ── */}
      <CosmicBackground />

      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 20%, rgba(251,191,36,0.06) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 50% 70% at -5% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 40% 60% at 105% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)" }}
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

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
         ══════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-10 pt-2 lg:pt-3 pb-6 lg:pb-12"
        style={{ maxWidth: "90rem" }}
      >

        {/* ── MOBILE layout (hidden on lg+) ── */}
        <div className="flex flex-col items-center gap-6 lg:hidden">

          {/* Logo + shloka */}
          <motion.div {...fadeScale(0.1)} className="flex flex-col items-center gap-2 w-full">
            <div className="relative flex items-center justify-center">
              <div
                className="pointer-events-none absolute rounded-full blur-2xl"
                style={{
                  width: 240, height: 240,
                  background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
                }}
              />
              <motion.img
                src={LOGO}
                alt="Astro Santosh Pandey Logo"
                className="relative z-10 h-auto object-contain"
                style={{ width: 200, mixBlendMode: "screen", filter: "brightness(1.1) contrast(1.05) saturate(1.1)" }}
                animate={{ y: [-5, 0, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div {...fadeUp(0.32)} className="relative w-full text-center">
              <div className="absolute -inset-4 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
              <div
                className="text-sm font-bold tracking-normal leading-loose text-center relative
                  bg-[length:200%_auto] bg-gradient-to-r
                  from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                  bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                  drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                  drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                style={{ textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)" }}
              >
                <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                धर्मो रक्षति रक्षितः
                <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Headline + subtext */}
          <motion.div {...fadeLeft(0.2)} className="flex flex-col items-start w-full">
            <motion.h1
              {...fadeLeft(0.15)}
              className="font-serif font-bold leading-[1.15] mb-3.5 text-2xl sm:text-3xl"
            >
              <span>Transform Your Life</span>{" "}
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}>
                Astrology, Numerology,
              </span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}>
                Vastu &amp; Palmistry
              </span>
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "4rem", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              className="h-px mb-4 flex-shrink-0"
              style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
            />

            <motion.p
              {...fadeLeft(0.38)}
              className="leading-relaxed text-sm sm:text-base mb-4"
              style={{ color: "rgba(255,255,255,0.58)" }}
            >
              Accurate predictions, personalised remedies, and life-changing
              solutions for career, marriage, finance, health &amp; peace.
            </motion.p>

            {/* Client Photo in Circular Frame (Mobile) */}
            <motion.div {...fadeUp(0.45)} className="flex items-center gap-3 mt-1">
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-sm opacity-85 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 shadow-[0_0_18px_rgba(251,191,36,0.45)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/90 border border-amber-300/70">
                    <img
                      src={HeroImg}
                      alt="Astro Santosh Pandey"
                      className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-amber-200 tracking-wide font-serif">Astro Santosh Pandey</span>
                <span className="text-[11px] text-white/65">Vedic Astrologer &amp; Life Consultant</span>
              </div>
            </motion.div>
          </motion.div>

          {/* MOBILE — Video: centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease }}
            className="flex justify-center items-center w-full"
          >
            <AstrologerVideoCard width="240px" ringSize="220px" />
          </motion.div>

        </div>
        {/* ── END MOBILE ── */}

        {/* ── DESKTOP layout (hidden below lg) ── */}
        <div
          className="hidden lg:grid items-start gap-x-8 lg:gap-x-14 pt-2"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >

          {/* COL 1 — Headline + Subtext */}
          <div className="flex flex-col items-start">
            <motion.h1
              {...fadeLeft(0.15)}
              className="font-serif font-bold leading-[1.13] mb-5 lg:mb-6"
              style={{ fontSize: "clamp(1.35rem, 2.3vw, 2.4rem)" }}
            >
              <span>Transform Your Life</span>{" "}
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>With Expert</span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}>
                Astrology, Numerology,
              </span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(130deg, #fef9c3 0%, #fcd34d 28%, #f59e0b 58%, #b45309 100%)" }}>
                Vastu &amp; Palmistry
              </span>
              <span className="block" style={{ color: "rgba(255,255,255,0.92)" }}>Guidance</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              className="h-px mb-5 lg:mb-6 flex-shrink-0"
              style={{ background: "linear-gradient(90deg, rgba(251,191,36,1) 0%, rgba(251,191,36,0.15) 100%)" }}
            />

            <motion.p
              {...fadeLeft(0.38)}
              className="leading-relaxed mb-4"
              style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                color: "rgba(255,255,255,0.58)",
                maxWidth: "24rem",
              }}
            >
              Accurate predictions, personalised remedies, and life-changing
              solutions for career, marriage, finance, health &amp; peace.
            </motion.p>

            {/* Client Photo in Circular Frame (Desktop) */}
            <motion.div {...fadeUp(0.48)} className="mt-4 flex items-center gap-4">
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-md opacity-85 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 shadow-[0_0_22px_rgba(251,191,36,0.5)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/90 border-2 border-amber-300/70">
                    <img
                      src={HeroImg}
                      alt="Astro Santosh Pandey"
                      className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold text-amber-200 tracking-wide font-serif">Astro Santosh Pandey</span>
                <span className="text-xs text-white/65">Vedic Astrologer &amp; Life Consultant</span>
              </div>
            </motion.div>
          </div>

          {/* COL 2 — Video (CENTER) ← swapped here */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease }}
            className="flex flex-col items-center justify-center"
            style={{ minWidth: "clamp(280px, 28vw, 440px)" }}
          >
            <AstrologerVideoCard
              width="clamp(220px, 20vw, 380px)"
              ringSize="clamp(210px, 19vw, 360px)"
            />
          </motion.div>

          {/* COL 3 — Logo + Shloka (RIGHT) ← swapped here */}
          <motion.div
            {...fadeScale(0.1)}
            className="flex flex-col items-center gap-3 justify-center"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="pointer-events-none absolute rounded-full blur-2xl"
                style={{
                  width:  "clamp(300px, 32vw, 480px)",
                  height: "clamp(300px, 32vw, 480px)",
                  background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(251,191,36,0.08) 55%, transparent 100%)",
                }}
              />
              <motion.img
                src={LOGO}
                alt="Astro Santosh Pandey Logo"
                className="relative z-10 h-auto object-contain"
                style={{
                  width: "clamp(260px, 28vw, 420px)",
                  mixBlendMode: "screen",
                  filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                }}
                animate={{ y: [-6, 0, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div {...fadeUp(0.32)} className="relative mt-3 mb-2">
              <div className="absolute -inset-4 -left-2 bg-gradient-radial from-amber-400/20 via-yellow-400/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
              <div
                className="text-sm md:text-lg font-bold tracking-normal leading-loose text-center relative
                  bg-[length:200%_auto] bg-gradient-to-r
                  from-yellow-100 via-amber-200 via-yellow-300 via-amber-300 via-orange-300 to-yellow-100
                  bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]
                  drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]
                  drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]"
                style={{ textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 12px rgba(251,191,36,0.4), 0 0 25px rgba(245,158,11,0.3), 0 3px 8px rgba(0,0,0,0.3)" }}
              >
                <span className="inline-block mr-2 text-[#FFD700] animate-pulse">॥</span>
                धर्मो रक्षति रक्षितः
                <span className="inline-block ml-2 text-[#FFD700] animate-pulse">॥</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
        {/* ── END DESKTOP ── */}

      </div>

      {/* ── bottom gold divider ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10" style={{ maxWidth: "90rem" }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="h-px origin-center"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.1) 15%, rgba(251,191,36,0.45) 50%, rgba(251,191,36,0.1) 85%, transparent 100%)" }}
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