import { MessageCircle, Star, Gem, Zap, Heart, Briefcase } from "lucide-react";

export type ServiceCategory =
  | "love-relationships"
  | "career-money"
  | "instant-decisions"
  | "personal-insights";

export interface QuickService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  price: number;
  deliveryTime: string; // e.g. "2 hrs", "6 hrs", "24 hrs"
  category: ServiceCategory;
  icon: React.ElementType;
  // Individual page sections
  problemStatement: string;
  whenToUse: string[];
  benefits: string[];
  risks: string[];
  deliverables: string[];
  requiresBirthTime: boolean;
  requiresDOB: boolean;
}

export const serviceCategories: { id: ServiceCategory; label: string; emoji: string }[] = [
  { id: "love-relationships", label: "Love & Relationships", emoji: "💞" },
  { id: "career-money",       label: "Career & Money",       emoji: "💼" },
  { id: "instant-decisions",  label: "Instant Decisions",    emoji: "⚡" },
  { id: "personal-insights",  label: "Personal Insights",    emoji: "✨" },
];

export const quickServices: QuickService[] = [
  // ── LOVE & RELATIONSHIPS ───────────────────────────────────────
  {
    id: "matchmaking",
    slug: "marriage-matchmaking",
    title: "Marriage – MatchMaking",
    shortDescription:
      "Astrological compatibility analysis to help you find or evaluate a life partner with cosmic precision.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "love-relationships",
    icon: Heart,
    problemStatement:
      "Choosing a life partner is the single most important decision you'll ever make. Yet most people rely on chance, gut feeling, or fleeting chemistry — ignoring the cosmic blueprint that reveals true compatibility at the soul level.",
    whenToUse: [
      "You are considering a marriage proposal and want a second opinion from the stars",
      "You have shortlisted a few profiles and want to compare compatibility",
      "Your family wants a Kundli-match before proceeding with an alliance",
      "You want to understand the long-term emotional and financial compatibility",
    ],
    benefits: [
      "Discover true compatibility across emotional, financial, and spiritual dimensions",
      "Identify potential friction points before they become real-life problems",
      "Understand the strengths and growth areas of the union",
      "Make a confident, informed decision backed by centuries of Jyotish wisdom",
    ],
    risks: [
      "Proceeding without compatibility analysis risks emotional and financial incompatibility",
      "Ignoring cosmic signs can lead to recurring conflicts that erode the relationship",
      "Misaligned Gunas can impact health, children, and family harmony",
    ],
    deliverables: [
      "Guna Milan score with detailed breakdown (36 points)",
      "Mangal Dosha analysis for both horoscopes",
      "Compatibility across 8 major life areas",
      "Recommended auspicious date range for engagement/marriage",
      "Delivered as a detailed PDF report via WhatsApp & Email",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },
  {
    id: "relationship-question",
    slug: "address-relationship-question",
    title: "Address 1 Relationship Question",
    shortDescription:
      "Get a precise, personalised astrological answer to your most pressing love or relationship question.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "love-relationships",
    icon: MessageCircle,
    problemStatement:
      "You have one burning question about your relationship — will he come back? Is she the one? Should I confess? The mind loops endlessly without a clear answer, creating anxiety and indecision.",
    whenToUse: [
      "You need clarity on a specific situation in your romantic life",
      "You are at a crossroads and need a directional answer",
      "You want to know the cosmic timing of an upcoming event",
      "You feel confused about someone's intentions towards you",
    ],
    benefits: [
      "Get a direct, personalised answer — not generic horoscope advice",
      "Understand the planetary influences affecting your specific situation",
      "Gain peace of mind and the confidence to act",
      "Receive guidance on the best timing for your next step",
    ],
    risks: [
      "Acting without clarity can lead to regrettable decisions in matters of the heart",
      "Unresolved emotional confusion affects your mental health and professional life",
    ],
    deliverables: [
      "Written astrological analysis of your specific question",
      "Planetary influences affecting the situation",
      "Recommended action and timing",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  // ── CAREER & MONEY ─────────────────────────────────────────────
  {
    id: "career-guidance",
    slug: "career-guidance",
    title: "Career Guidance",
    shortDescription:
      "Unlock your cosmic career blueprint — the right field, the right timing, the right moves for your professional rise.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "career-money",
    icon: Briefcase,
    problemStatement:
      "Most people spend decades in careers that don't align with their natural strengths or destiny. They follow societal expectations or random opportunities, wondering why success feels forced. Your birth chart holds the blueprint for your ideal professional path.",
    whenToUse: [
      "You are at a career crossroads — job change, business vs. job dilemma",
      "You feel stuck or underpaid despite hard work",
      "You want to know the best time to start a business or negotiate a raise",
      "You are a student choosing between fields of study",
    ],
    benefits: [
      "Identify your natural professional strengths from your planetary positions",
      "Discover your most favourable career sectors as per your chart",
      "Know the right timing (Dasha/Transit) for major career moves",
      "Avoid costly career mistakes by aligning with your cosmic path",
    ],
    risks: [
      "Choosing the wrong career path wastes years of energy, income, and opportunity",
      "Making a big move in an unfavourable planetary period can backfire significantly",
    ],
    deliverables: [
      "Career sector analysis based on 10th house and planetary positions",
      "Current Dasha period and its impact on career",
      "Best time windows for job changes, promotions, or business launch",
      "Personalised action plan delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },

  // ── INSTANT DECISIONS ─────────────────────────────────────────
  {
    id: "muhurat",
    slug: "muhurat-auspicious-timing",
    title: "Muhurat – Auspicious Timing",
    shortDescription:
      "Find the most powerful cosmic window for buying jewellery, vehicles, property, and other major purchases.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "instant-decisions",
    icon: Star,
    problemStatement:
      "Every major purchase carries energy. Starting an important transaction at the wrong planetary moment can invite obstacles, losses, or regret. A Muhurat aligns your action with the universe's most supportive energy.",
    whenToUse: [
      "You are planning to buy gold, jewellery, or diamonds",
      "You are finalising a vehicle purchase",
      "You are registering or entering a new property",
      "You want the most auspicious date for signing a business agreement",
    ],
    benefits: [
      "Ensure your purchase is backed by positive planetary energy",
      "Maximise the long-term value and positive outcome of the acquisition",
      "Avoid inauspicious timings known to cause loss or complications",
      "Get a precise date + time window, not just a vague suggestion",
    ],
    risks: [
      "Acting in an inauspicious Muhurat can nullify the positive intent behind the purchase",
      "Negative planetary aspects at the time of purchase can affect the object's longevity",
    ],
    deliverables: [
      "3–5 auspicious date and time windows within your preferred month",
      "Explanation of why each window is favourable",
      "Things to avoid on the day of purchase",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },
  {
    id: "lucky-days",
    slug: "personalised-lucky-days-colours",
    title: "Personalised Lucky Days & Colours",
    shortDescription:
      "Discover your personally auspicious days, colours, and numbers to maximise success in daily life.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "instant-decisions",
    icon: Star,
    problemStatement:
      "There are days when everything flows effortlessly, and days when nothing works. This isn't random — it's planetary timing. Knowing your personal lucky days and colours lets you schedule what matters most for maximum impact.",
    whenToUse: [
      "You want to plan important meetings, launches, or decisions on power days",
      "You want to know which colours amplify your personal magnetism",
      "You are starting a new chapter and want daily life to support your goals",
      "You want a simple, practical tool for everyday cosmic alignment",
    ],
    benefits: [
      "Plan your week around your most powerful days",
      "Use colour psychology aligned with your planetary rulers",
      "Improve luck in business, social interactions, and personal endeavours",
      "Simple, immediately actionable insights",
    ],
    risks: [
      "Scheduling critical actions on your weak days increases the chance of obstacles and delays",
    ],
    deliverables: [
      "Your weekly lucky days and their optimal activities",
      "Your power colours for different life areas",
      "Your personal lucky numbers",
      "Delivered as a handy PDF guide via WhatsApp",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  // ── PERSONAL INSIGHTS ──────────────────────────────────────────
  {
    id: "gemstone",
    slug: "personalised-gemstone-recommendation",
    title: "Personalised Gemstone Recommendation",
    shortDescription:
      "Know exactly which gemstone to wear — and which to avoid — to amplify your strengths and protect your energy.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Gem,
    problemStatement:
      "The gemstone market is flooded with generic recommendations. Wearing the wrong stone can create more problems than it solves. Your unique birth chart determines which planetary energy you need to strengthen — and which gemstone channels exactly that.",
    whenToUse: [
      "You want to wear a gemstone but need to know if it's right for you",
      "You feel like your energy or luck needs a boost",
      "A jeweller or relative recommended a stone but you want a second opinion",
      "You are going through a challenging Dasha and want gemstone support",
    ],
    benefits: [
      "Receive a genuinely personalised recommendation — not a Sun-sign generalisation",
      "Know the exact metal, weight, finger, and day to wear the stone",
      "Understand which stones to strictly avoid based on your chart",
      "Maximise the stone's impact with proper activation instructions",
    ],
    risks: [
      "Wearing an incompatible gemstone can aggravate malefic planetary energies",
      "Generic recommendations from jewellers are profit-driven, not chart-driven",
    ],
    deliverables: [
      "Primary gemstone recommendation with full specifications",
      "Alternative semi-precious stone option",
      "Gemstones to strictly avoid",
      "Activation ritual and wearing instructions",
      "Delivered as a detailed PDF via WhatsApp & Email",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },
  {
    id: "rudraksha",
    slug: "personalised-rudraksha-crystal",
    title: "Personalised Rudraksha / Crystal Recommendation",
    shortDescription:
      "Find the specific Rudraksha bead or healing crystal that resonates with your planetary energy.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Gem,
    problemStatement:
      "Rudraksha and crystals are powerful tools — but only when matched to your specific planetary needs. Wearing the wrong Mukhi or crystal creates energetic dissonance rather than harmony.",
    whenToUse: [
      "You want to start wearing Rudraksha and need guidance on the right Mukhi",
      "You are drawn to crystals but don't know which resonates with your chart",
      "You want to enhance a specific life area: health, money, relationships, or spirituality",
    ],
    benefits: [
      "Receive a chart-specific recommendation, not a generic guide",
      "Understand the planetary deity and energy behind your Rudraksha",
      "Know how to cleanse, charge, and wear your crystal correctly",
    ],
    risks: [
      "Wrong Mukhi Rudraksha can amplify negative planetary energies",
    ],
    deliverables: [
      "Recommended Rudraksha Mukhi with explanation",
      "Crystal recommendation for your dominant planetary need",
      "Wearing and maintenance instructions",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },
  {
    id: "lifestyle",
    slug: "personalised-lifestyle-behavioural-recommendation",
    title: "Lifestyle & Behavioural Recommendation",
    shortDescription:
      "Receive a personalised cosmic lifestyle prescription — diet, habits, and behavioural shifts aligned to your chart.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Heart,
    problemStatement:
      "Generic wellness advice doesn't account for your unique planetary constitution. What works for one person can be counterproductive for another. Your chart reveals the specific lifestyle patterns that will allow you to thrive physically, mentally, and energetically.",
    whenToUse: [
      "You want a lifestyle plan rooted in your astrological blueprint",
      "You struggle with habits that don't stick despite good intentions",
      "You want to align your diet, sleep, and daily rhythm with your cosmic nature",
      "You are starting a wellness journey and want a personalised foundation",
    ],
    benefits: [
      "Get lifestyle recommendations tailored to your planetary constitution",
      "Understand the root behavioural patterns shown in your chart",
      "Receive simple, implementable daily practices for your specific chart",
      "Align your natural rhythms with planetary cycles for sustained energy",
    ],
    risks: [
      "Ignoring your planetary constitution means repeated cycles of unsustainable habits",
    ],
    deliverables: [
      "Dietary recommendations based on your dominant planets",
      "Daily routine framework aligned with your chart",
      "Behavioural tendencies to embrace and to moderate",
      "Delivered as a personalised PDF guide via WhatsApp & Email",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },
  {
    id: "tattoo",
    slug: "personalised-tattoo-recommendation",
    title: "Personalised Tattoo Recommendation",
    shortDescription:
      "Choose a tattoo that carries the right energy for your chart — symbol, placement, and timing.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Zap,
    problemStatement:
      "A tattoo is permanent. Getting a symbol, deity, or element that conflicts with your planetary energies can create long-term energetic friction. Your chart reveals exactly what symbols, elements, and placements will serve as protective or amplifying talismans.",
    whenToUse: [
      "You are planning your first or next tattoo and want it to carry positive energy",
      "You want a symbol that aligns with your planetary strengths",
      "You are choosing between multiple design ideas and want cosmic guidance",
    ],
    benefits: [
      "Choose a tattoo that works as a personal talisman",
      "Know the most auspicious body placement based on your chart",
      "Avoid symbols or placements that conflict with your planetary chart",
      "Get an auspicious date window for getting the tattoo done",
    ],
    risks: [
      "An astrologically incompatible tattoo can create a permanent energetic drain",
    ],
    deliverables: [
      "Recommended symbols or motifs aligned to your chart",
      "Ideal body placement based on planetary zones",
      "Symbols to avoid",
      "Auspicious date window for the tattoo session",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },
];