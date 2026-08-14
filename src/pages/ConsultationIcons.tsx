/* ─────────────────────────────────────────────────────────────────────────
   ConsultationIcons.tsx
   Custom icon set built to match the client-supplied reference art:
   circular gold-ring badge, deep gradient background per topic, small gold
   sparkle accents, and a simple centered glyph that reads instantly as the
   outcome (a couple for love, a briefcase+growth arrow for career, coins
   for finance, etc.) — same visual language as the two reference images
   ("Icon_set_2" colour version and "icon_set" gold line-art version),
   redrawn as inline SVG so they render crisply at any size with no image
   files to host.
   Each component accepts a `className` (sizing/positioning) prop, same as
   swapping in for a lucide-react icon.
───────────────────────────────────────────────────────────────────────── */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Sparkle = ({ x, y, s = 5 }: { x: number; y: number; s?: number }) => (
  <path
    d={`M${x} ${y - s} L${x + s * 0.28} ${y - s * 0.28} L${x + s} ${y} L${x + s * 0.28} ${y + s * 0.28} L${x} ${y + s} L${x - s * 0.28} ${y + s * 0.28} L${x - s} ${y} L${x - s * 0.28} ${y - s * 0.28} Z`}
    fill="#F4CE6B"
  />
);

const Badge = ({
  id,
  from,
  to,
  children,
}: {
  id: string;
  from: string;
  to: string;
  children: React.ReactNode;
}) => (
  <>
    <defs>
      <radialGradient id={`${id}-bg`} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="57" fill={`url(#${id}-bg)`} />
    <circle cx="60" cy="60" r="55.5" fill="none" stroke="#F4CE6B" strokeWidth="2" />
    <Sparkle x={60} y={12} s={5} />
    {children}
  </>
);

// 1. Kundli / Birth Chart — zodiac ring + diamond chart square
export const KundliIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="kundli" from="#6d4fc9" to="#2a1e5c">
      <circle cx="60" cy="60" r="40" fill="none" stroke="#F4CE6B" strokeWidth="1.4" opacity="0.6" />
      <rect x="38" y="38" width="44" height="44" fill="none" stroke="#F4CE6B" strokeWidth="2" />
      <path d="M38 38 L82 82 M82 38 L38 82 M60 38 V82 M38 60 H82" stroke="#F4CE6B" strokeWidth="1.2" opacity="0.85" />
    </Badge>
  </svg>
);

// 2. Love & Relationship — two silhouettes inside a heart
export const LoveIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="love" from="#ff6f91" to="#8a1441">
      <path
        d="M60 88C60 88 30 68 30 46C30 34 39 26 49 26C54 26 58 28.5 60 33C62 28.5 66 26 71 26C81 26 90 34 90 46C90 68 60 88 60 88Z"
        fill="none"
        stroke="#F4CE6B"
        strokeWidth="2.2"
      />
      <path d="M48 52 q3 -10 11 -10 q3 0 4 3" fill="none" stroke="#FFE3EC" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="52" cy="46" r="6" fill="#FFE3EC" />
      <path d="M72 52 q-3 -10 -11 -10 q-3 0 -4 3" fill="none" stroke="#FFC94A" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="68" cy="46" r="6" fill="#FFC94A" />
    </Badge>
  </svg>
);

// 2b. Marriage Consultation — interlocking wedding rings with gold jewel accent
export const MarriageIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="marriage" from="#e63956" to="#6b0a1d">
      <circle cx="48" cy="62" r="19" fill="none" stroke="#F4CE6B" strokeWidth="2.5" />
      <circle cx="72" cy="62" r="19" fill="none" stroke="#FFC94A" strokeWidth="2.5" />
      <polygon points="48,36 52,41 48,46 44,41" fill="#FFF" />
      <Sparkle x={72} y={38} s={5} />
    </Badge>
  </svg>
);

// 3. Career & Business — briefcase with rising bars
export const CareerIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="career" from="#3aa1e0" to="#0c3a63">
      <rect x="40" y="52" width="40" height="30" rx="3" fill="none" stroke="#F4CE6B" strokeWidth="2.2" />
      <path d="M50 52 v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" fill="none" stroke="#F4CE6B" strokeWidth="2.2" />
      <line x1="40" y1="66" x2="80" y2="66" stroke="#F4CE6B" strokeWidth="1.6" opacity="0.7" />
      <rect x="45" y="75" width="5" height="8" fill="#8FD3FF" />
      <rect x="53" y="71" width="5" height="12" fill="#8FD3FF" />
      <rect x="61" y="66" width="5" height="17" fill="#8FD3FF" />
      <path d="M62 40 L74 30 M74 30 l-6 1 M74 30 l1 6" fill="none" stroke="#9CFFB0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Badge>
  </svg>
);

// 4. Finance Stability — coin stack + rupee coin + growth arrow
export const FinanceIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="finance" from="#2fae7a" to="#0b3d2c">
      <path d="M34 78 L48 60 L60 68 L82 40" fill="none" stroke="#9CFFB0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 40 l-9 -1 l2 9" fill="none" stroke="#9CFFB0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="47" cy="83" rx="10" ry="4" fill="none" stroke="#F4CE6B" strokeWidth="1.8" />
      <ellipse cx="47" cy="79" rx="10" ry="4" fill="none" stroke="#F4CE6B" strokeWidth="1.8" />
      <circle cx="74" cy="76" r="12" fill="#F4CE6B" opacity="0.95" />
      <text x="74" y="81" fontSize="13" textAnchor="middle" fill="#4a2f00" fontFamily="serif" fontWeight="bold">
        ₹
      </text>
    </Badge>
  </svg>
);

// 5. Vastu Guidance — compass + home
export const VastuIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="vastu" from="#b8752f" to="#3a2308">
      <path d="M60 40 L78 82 H42 Z" fill="none" stroke="#F4CE6B" strokeWidth="2" opacity="0.55" />
      <path d="M40 72 L60 56 L80 72 V86 H40 Z" fill="none" stroke="#F4CE6B" strokeWidth="2.2" />
      <rect x="53" y="76" width="14" height="10" fill="none" stroke="#F4CE6B" strokeWidth="1.6" />
      <circle cx="60" cy="56" r="3" fill="#F4CE6B" />
      <text x="60" y="35" fontSize="7" textAnchor="middle" fill="#F4CE6B" opacity="0.8">N</text>
    </Badge>
  </svg>
);

// 6. Palmistry — open palm closely matching the client's reference art:
// tapered fingers with rounded tips, a naturally-attached thumb, finger
// crease lines, curved palm lines, and sparkle accents outside the hand.
export const PalmIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="palm" from="#8b3fbf" to="#2c0f47">
      <path
        d="M28 46 L29.4 49.6 L33 51 L29.4 52.4 L28 56 L26.6 52.4 L23 51 L26.6 49.6 Z"
        fill="#F4CE6B"
        opacity="0.85"
      />
      <path
        d="M92 68 L93.1 70.8 L96 72 L93.1 73.2 L92 76 L90.9 73.2 L88 72 L90.9 70.8 Z"
        fill="#F4CE6B"
        opacity="0.85"
      />

      <g fill="none" stroke="#F4CE6B" strokeWidth="2" strokeLinejoin="round">
        {/* palm — sides bow slightly and narrow toward the wrist */}
        <path d="M45 63 C43 68 43 78 45 85 C46.5 91 49 95 54 96 L70 96 C75 95 77.5 91 79 85 C81 78 81 68 79 63 C74 60.5 68 59 62 59 C56 59 50 60.5 45 63 Z" />
        {/* pinky */}
        <path d="M44.8 63 L45.8 41.2 A3.2 3.2 0 0 1 52.2 41.2 L53.2 63 Z" />
        {/* ring */}
        <path d="M53.6 60 L54.7 33.3 A3.3 3.3 0 0 1 61.3 33.3 L62.4 60 Z" />
        {/* middle */}
        <path d="M62.6 59 L63.7 29.3 A3.3 3.3 0 0 1 70.3 29.3 L71.4 59 Z" />
        {/* index */}
        <path d="M71.8 61 L72.8 36.2 A3.2 3.2 0 0 1 79.2 36.2 L80.2 61 Z" />
        {/* thumb */}
        <path d="M40 66 C33 65 27 68 24 74 C22 78 23 82 27 83 C32 84 38 80 42 75 C44 72 43 68 40 66 Z" />
      </g>

      {/* finger crease lines */}
      <g stroke="#F4CE6B" strokeWidth="1.1" opacity="0.55">
        <line x1="45.5" y1="49" x2="52.5" y2="49" />
        <line x1="54.5" y1="43" x2="61.5" y2="43" />
        <line x1="63.5" y1="41" x2="70.5" y2="41" />
        <line x1="72" y1="45" x2="79.5" y2="45" />
      </g>

      {/* palm lines */}
      <g fill="none" stroke="#E9C8FF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9">
        <path d="M48 68 Q62 78 76 70" />
        <path d="M47 78 Q60 88 74 82" />
        <path d="M52 62 Q58 60 63 63" />
      </g>
    </Badge>
  </svg>
);

// 7. Numerology — 3x3 lucky grid
export const NumerologyIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="numerology" from="#2f8f8a" to="#0c2f2d">
      <rect x="38" y="38" width="44" height="44" rx="2" fill="none" stroke="#F4CE6B" strokeWidth="2.2" />
      <line x1="38" y1="52.67" x2="82" y2="52.67" stroke="#F4CE6B" strokeWidth="1.4" opacity="0.8" />
      <line x1="38" y1="67.33" x2="82" y2="67.33" stroke="#F4CE6B" strokeWidth="1.4" opacity="0.8" />
      <line x1="52.67" y1="38" x2="52.67" y2="82" stroke="#F4CE6B" strokeWidth="1.4" opacity="0.8" />
      <line x1="67.33" y1="38" x2="67.33" y2="82" stroke="#F4CE6B" strokeWidth="1.4" opacity="0.8" />
      <text x="45.3" y="49" fontSize="9" textAnchor="middle" fill="#BFF3EF">1</text>
      <text x="60" y="49" fontSize="9" textAnchor="middle" fill="#BFF3EF">2</text>
      <text x="74.7" y="49" fontSize="9" textAnchor="middle" fill="#BFF3EF">3</text>
      <text x="45.3" y="63.7" fontSize="9" textAnchor="middle" fill="#BFF3EF">4</text>
      <text x="60" y="63.7" fontSize="9" textAnchor="middle" fill="#BFF3EF">5</text>
      <text x="74.7" y="63.7" fontSize="9" textAnchor="middle" fill="#BFF3EF">6</text>
      <text x="45.3" y="78.3" fontSize="9" textAnchor="middle" fill="#BFF3EF">7</text>
      <text x="60" y="78.3" fontSize="9" textAnchor="middle" fill="#BFF3EF">8</text>
      <text x="74.7" y="78.3" fontSize="9" textAnchor="middle" fill="#BFF3EF">9</text>
    </Badge>
  </svg>
);

// 8. Akashik Record Reading — open book, lotus, guiding star
export const AkashikIcon = (props: IconProps) => (
  <svg viewBox="0 0 120 120" {...props}>
    <Badge id="akashik" from="#7a4fc9" to="#241246">
      <path d="M60 62 L60 88 M60 62 C50 56 40 58 34 62 V82 C40 78 50 76 60 82" fill="none" stroke="#F4CE6B" strokeWidth="2" />
      <path d="M60 62 C70 56 80 58 86 62 V82 C80 78 70 76 60 82" fill="none" stroke="#F4CE6B" strokeWidth="2" />
      <path d="M60 66 C57 60 51 60 48 63 C51 65 55 66 60 70 C65 66 69 65 72 63 C69 60 63 60 60 66Z" fill="#FF8FD0" opacity="0.9" />
      <Sparkle x={60} y={38} s={7} />
    </Badge>
  </svg>
);

// 9. Official UPI Logo Component — crisp NPCI dual-arrow geometry & official UPI branding
export const UpiIcon = (props: IconProps) => (
  <svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(2, 6)">
      {/* Green arrow */}
      <path d="M0 26L11 2H20L9 26H0Z" fill="#008844" />
      {/* Orange arrow */}
      <path d="M11 26L22 2H31L20 26H11Z" fill="#FF6600" />
    </g>
    <text
      x="38"
      y="28"
      fill="#F4CE6B"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="25"
      fontStyle="italic"
      letterSpacing="0.5"
    >
      UPI
    </text>
  </svg>
);