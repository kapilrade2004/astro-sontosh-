
// import { MessageCircle, Star, Gem, Zap, Heart, Briefcase, Moon, Home, Clock, TrendingUp, Sparkles, Compass, Brain, Hash, DollarSign, Plane, Scroll, Baby } from "lucide-react";

// export type ServiceCategory =
//   | "love-relationships"
//   | "career-money"
//   | "instant-decisions"
//   | "personal-insights";

// export interface QuickService {
//   id: string;
//   slug: string;
//   title: string;
//   shortDescription: string;
//   price: number;
//   deliveryTime: string;
//   category: ServiceCategory;
//   icon: React.ElementType;
//   problemStatement: string;
//   whenToUse: string[];
//   benefits: string[];
//   risks: string[];
//   deliverables: string[];
//   requiresBirthTime: boolean;
//   requiresDOB: boolean;
// }

// export const serviceCategories: { id: ServiceCategory; label: string; emoji: string }[] = [
//   { id: "love-relationships", label: "Love & Relationships", emoji: "💞" },
//   { id: "career-money",       label: "Career & Money",       emoji: "💼" },
//   { id: "instant-decisions",  label: "Instant Decisions",    emoji: "⚡" },
//   { id: "personal-insights",  label: "Personal Insights",    emoji: "✨" },
// ];

// export const quickServices: QuickService[] = [

//   // ── LOVE & RELATIONSHIPS ───────────────────────────────────────
//   // REMOVED: matchmaking (Marriage – MatchMaking)

//   // {
//   //   id: "relationship-question",
//   //   slug: "ask-relationship-question",
//   //   title: "Ask 1 Relationship Question (Yes/No + Reason)",
//   //   shortDescription:
//   //     "Get a direct Yes/No astrological answer with the reason behind it for your most pressing relationship question.",
//   //   price: 1100,
//   //   deliveryTime: "6 hrs",
//   //   category: "love-relationships",
//   //   icon: MessageCircle,
//   //   problemStatement:
//   //     "You have one burning question about your relationship and the mind loops endlessly without a clear answer, creating anxiety and indecision.",
//   //   whenToUse: [
//   //     "You need a clear Yes or No on a specific romantic situation",
//   //     "You want to know if someone is genuinely interested in you",
//   //     "You are at a crossroads and need a directional answer fast",
//   //     "You feel confused about someone's true intentions towards you",
//   //   ],
//   //   benefits: [
//   //     "Get a direct, personalised Yes/No answer — not generic horoscope advice",
//   //     "Understand the planetary influences affecting your specific situation",
//   //     "Gain peace of mind and confidence to act",
//   //     "Receive the reason behind the answer so you understand the bigger picture",
//   //   ],
//   //   risks: [
//   //     "Acting without clarity can lead to regrettable decisions in matters of the heart",
//   //     "Unresolved emotional confusion affects your mental health and professional life",
//   //   ],
//   //   deliverables: [
//   //     "Clear Yes or No answer to your relationship question",
//   //     "Astrological reasoning behind the answer",
//   //     "Recommended next action and timing",
//   //     "Delivered via WhatsApp within 6 hours",
//   //   ],
//   //   requiresBirthTime: false,
//   //   requiresDOB: true,
//   // },

//   {
//     id: "relationship-conflict",
//     slug: "relationship-conflict-guidance",
//     title: "Relationship Conflict Guidance",
//     shortDescription:
//       "Understand the cosmic root of recurring conflicts in your relationship and receive targeted guidance to restore harmony.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "love-relationships",
//     icon: Heart,
//     problemStatement:
//       "Relationship conflicts that repeat despite efforts to resolve them often have a deeper planetary cause — a clash of energies that needs to be understood, not just managed.",
//     whenToUse: [
//       "You and your partner keep having the same argument with no resolution",
//       "You feel emotionally disconnected and don't understand why",
//       "Tension has been building and you want to address it before it escalates",
//       "You want to understand your partner's behaviour from a cosmic lens",
//     ],
//     benefits: [
//       "Identify the planetary reason behind the recurring conflict",
//       "Receive practical, chart-based guidance on restoring harmony",
//       "Understand each other's triggers and emotional needs astrologically",
//       "Get simple remedies to reduce friction in the relationship",
//     ],
//     risks: [
//       "Unresolved conflicts left unaddressed deepen emotional distance over time",
//       "Misunderstanding the root cause leads to wrong solutions that worsen the situation",
//     ],
//     deliverables: [
//       "Astrological analysis of the conflict pattern",
//       "Planetary reason behind the tension",
//       "Practical guidance and simple remedy",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "family-issue-insight",
//     slug: "family-issue-insight",
//     title: " Family Issue Insight",
//     shortDescription:
//       "Get quick astrological insight into a pressing family issue and clarity on the best path forward.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "love-relationships",
//     icon: Heart,
//     problemStatement:
//       "Family conflicts and tensions carry a unique emotional weight. When they persist despite goodwill, it often signals a deeper planetary imbalance affecting the family dynamic.",
//     whenToUse: [
//       "You are facing a stressful family situation and need perspective",
//       "There is ongoing tension between family members with no resolution",
//       "You want to know the right time or approach to address a family matter",
//       "You need clarity on whether a family decision will work out positively",
//     ],
//     benefits: [
//       "Gain cosmic perspective on why the family issue is persisting",
//       "Understand the planetary timing affecting your family dynamics",
//       "Receive actionable guidance on the best approach to take",
//       "Reduce family stress by acting at the right time in the right way",
//     ],
//     risks: [
//       "Acting at the wrong time or in the wrong way can deepen family rifts",
//       "Ignoring persistent family tension affects everyone's mental and physical wellbeing",
//     ],
//     deliverables: [
//       "Quick astrological insight into the family issue",
//       "Recommended approach and timing",
//       "One practical remedy or action step",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "love-situation-clarity",
//     slug: "love-situation-clarity",
//     title: "Love Situation Clarity (Where is it going?)",
//     shortDescription:
//       "Find out the likely direction of your current romantic situation — is it heading towards commitment, separation, or a turning point?",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "love-relationships",
//     icon: Heart,
//     problemStatement:
//       "When you're in the middle of a romantic situation with no clear signals, the uncertainty is exhausting. Astrology can reveal where the planetary energies are taking this connection.",
//     whenToUse: [
//       "You are in a relationship or talking stage and don't know where it's heading",
//       "Things have been ambiguous and you need clarity on the direction",
//       "You want to know if this person is likely to commit",
//       "You are unsure whether to invest more emotionally or move on",
//     ],
//     benefits: [
//       "Get a clear directional reading on your current love situation",
//       "Understand the planetary timing affecting the relationship's trajectory",
//       "Know what to expect in the coming weeks or months",
//       "Make an informed decision about whether to stay, invest, or let go",
//     ],
//     risks: [
//       "Investing emotionally in a connection that has no cosmic support wastes precious time",
//       "Leaving prematurely when a positive turning point is near is equally costly",
//     ],
//     deliverables: [
//       "Directional reading on where the situation is heading",
//       "Planetary influences affecting the connection",
//       "Likely timeline for a turning point or clarity",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "compatibility-quick-check",
//     slug: "compatibility-quick-check",
//     title: "Compatibility Quick Check",
//     shortDescription:
//       "A fast astrological compatibility snapshot between you and someone you're considering for a relationship or partnership.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "love-relationships",
//     icon: Heart,
//     problemStatement:
//       "Before investing deeply in a relationship or partnership, it's worth knowing whether the stars support the union — or if there are significant energetic incompatibilities to be aware of.",
//     whenToUse: [
//       "You have met someone new and want to check basic compatibility",
//       "You are evaluating a marriage proposal and need a quick answer",
//       "You want to understand the strengths and challenges of an existing relationship",
//       "You are considering a business partnership and want an energetic check",
//     ],
//     benefits: [
//       "Get a quick but meaningful compatibility snapshot",
//       "Understand the key areas of harmony and friction",
//       "Make a more informed decision about whether to proceed",
//       "Save time and emotional energy by knowing early",
//     ],
//     risks: [
//       "Entering an incompatible connection without awareness leads to predictable conflicts",
//       "Ignoring major incompatibilities can cost years of emotional investment",
//     ],
//     deliverables: [
//       "Compatibility score across key life areas",
//       "Top strengths of the union",
//       "Key challenge areas to be aware of",
//       "Delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   // ── CAREER & MONEY ─────────────────────────────────────────────
//   // REMOVED: career-direction-check (Career Direction Quick Check)

//   {
//     id: "opportunity-check",
//     slug: "opportunity-check",
//     title: "Opportunity Check (Anything good coming soon?)",
//     shortDescription:
//       "Find out if a positive planetary window is opening for you in the near future — career, money, or life in general.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "career-money",
//     icon: TrendingUp,
//     problemStatement:
//       "Sometimes you feel like things are stuck and wonder if anything good is on the horizon. Your current Dasha and transit can tell you exactly when a positive window is approaching.",
//     whenToUse: [
//       "You've been going through a slow or difficult phase and want to know when it lifts",
//       "You want to know if now is a good time to make a move or wait",
//       "You feel something positive is coming but want confirmation",
//       "You want to plan upcoming months around your most favourable windows",
//     ],
//     benefits: [
//       "Know exactly when your next positive planetary window opens",
//       "Plan important actions, launches, or decisions around your power periods",
//       "Avoid acting in weak periods and conserve energy for the right time",
//       "Gain hope and motivation with a concrete timeline",
//     ],
//     risks: [
//       "Acting in a weak planetary period wastes effort and produces frustrating results",
//       "Missing your positive window by not being prepared is an avoidable loss",
//     ],
//     deliverables: [
//       "Current planetary period assessment",
//       "Next positive window timeline",
//       "Key areas of life that will be activated",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "job-change-guidance",
//     slug: "job-change-decision-guidance",
//     title: "Job Change Decision Guidance",
//     shortDescription:
//       "Should you take that new offer or stay? Get a clear astrological verdict on your job change decision.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "career-money",
//     icon: Briefcase,
//     problemStatement:
//       "A job change is a major life decision. The right move at the wrong planetary time can still lead to disappointment. Timing and alignment both matter.",
//     whenToUse: [
//       "You have received a job offer and are unsure whether to accept",
//       "You are planning to resign and want to know the right timing",
//       "You want to assess whether a new role aligns with your planetary chart",
//       "You are torn between two opportunities and need a decisive read",
//     ],
//     benefits: [
//       "Get a clear Yes or No on whether the job change is favourable",
//       "Know the best time window to make the move",
//       "Understand what the new role is likely to bring based on your chart",
//       "Avoid making a costly career mistake by acting at the wrong time",
//     ],
//     risks: [
//       "Leaving a stable job at the wrong planetary time can lead to instability",
//       "Declining a good opportunity due to fear without astrological backing is equally costly",
//     ],
//     deliverables: [
//       "Yes/No verdict on the job change",
//       "Best timing window for the move",
//       "What to expect in the new environment based on your chart",
//       "Delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "money-flow-check",
//     slug: "money-flow-check",
//     title: " Money Flow Guidance?)",
//     shortDescription:
//       "Find out the planetary reason your money feels blocked and receive targeted guidance to restore financial flow.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "career-money",
//     icon: DollarSign,
//     problemStatement:
//       "When money keeps slipping through your fingers or income stagnates despite effort, it often points to a specific planetary blockage in your chart.",
//     whenToUse: [
//       "You work hard but money doesn't accumulate",
//       "Unexpected expenses keep draining your savings",
//       "You feel there is a financial blockage you cannot explain",
//       "You want to know when your financial situation is likely to improve",
//     ],
//     benefits: [
//       "Identify the exact planetary cause of the financial blockage",
//       "Receive targeted remedies to restore money flow",
//       "Know when your financial planetary period improves",
//       "Gain clarity and stop blaming yourself for circumstances that are planetary",
//     ],
//     risks: [
//       "Continuing without understanding the root cause leads to repeated financial cycles",
//       "Wrong remedies applied without chart analysis can aggravate the blockage",
//     ],
//     deliverables: [
//       "Analysis of financial houses and planetary influences",
//       "Identified cause of the money blockage",
//       "Targeted remedy to restore flow",
//       "Delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "career-guidance",
//     slug: "career-guidance",
//     title: "Career Guidance",
//     shortDescription:
//       "Unlock your cosmic career blueprint — the right field, the right timing, the right moves for your professional rise.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "career-money",
//     icon: Briefcase,
//     problemStatement:
//       "Most people spend decades in careers that don't align with their natural strengths or destiny. Your birth chart holds the blueprint for your ideal professional path.",
//     whenToUse: [
//       "You are at a career crossroads — job change, business vs. job dilemma",
//       "You feel stuck or underpaid despite hard work",
//       "You want to know the best time to start a business or negotiate a raise",
//       "You are a student choosing between fields of study",
//     ],
//     benefits: [
//       "Identify your natural professional strengths from your planetary positions",
//       "Discover your most favourable career sectors as per your chart",
//       "Know the right timing (Dasha/Transit) for major career moves",
//       "Avoid costly career mistakes by aligning with your cosmic path",
//     ],
//     risks: [
//       "Choosing the wrong career path wastes years of energy, income, and opportunity",
//       "Making a big move in an unfavourable planetary period can backfire significantly",
//     ],
//     deliverables: [
//       "Career sector analysis based on 10th house and planetary positions",
//       "Current Dasha period and its impact on career",
//       "Best time windows for job changes, promotions, or business launch",
//       "Personalised action plan delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: true,
//     requiresDOB: true,
//   },

//   // ── INSTANT DECISIONS ──────────────────────────────────────────

//   {
//     id: "go-ahead-wait",
//     slug: "go-ahead-or-wait-decision-guidance",
//     title: "Go Ahead or Wait Decision Guidance",
//     shortDescription:
//       "Should you act now or wait? Get a clear astrological Go/Wait answer for any important decision you're facing.",
//     price: 500,
//     deliveryTime: "2 hrs",
//     category: "instant-decisions",
//     icon: Compass,
//     problemStatement:
//       "Timing is everything. The same action taken at the right planetary moment succeeds; taken at the wrong time, it struggles.",
//     whenToUse: [
//       "You are about to make a significant decision and feel uncertain about timing",
//       "You have an opportunity in front of you and want to know if now is the right time",
//       "You are torn between acting and waiting and need a clear directive",
//       "You want cosmic confirmation before taking an important step",
//     ],
//     benefits: [
//       "Get a clear Go or Wait answer — no ambiguity",
//       "Understand the planetary reason behind the recommendation",
//       "Save yourself from acting at the wrong time",
//       "Gain confidence to move forward decisively when the answer is Go",
//     ],
//     risks: [
//       "Acting at the wrong planetary moment wastes effort and often produces poor results",
//       "Waiting when the time is right causes you to miss valuable windows",
//     ],
//     deliverables: [
//       "Clear Go or Wait answer for your specific decision",
//       "Brief planetary reason for the recommendation",
//       "If Wait — approximate timeframe for when to proceed",
//       "Delivered via WhatsApp within 2 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "right-time-check",
//     slug: "right-time-check",
//     title: "Right Time Check (Shubh Time for Any Decision)",
//     shortDescription:
//       "Find the most auspicious Shubh Muhurat for any important decision, meeting, signing, or action.",
//     price: 500,
//     deliveryTime: "2 hrs",
//     category: "instant-decisions",
//     icon: Clock,
//     problemStatement:
//       "Every important action carries the energy of the moment it begins. Starting at a Shubh time dramatically improves the probability of a positive outcome.",
//     whenToUse: [
//       "You want to know the best time to sign a document or agreement",
//       "You are scheduling an important meeting or call",
//       "You want an auspicious time to start a new project or venture",
//       "You are planning any significant action and want maximum cosmic support",
//     ],
//     benefits: [
//       "Ensure your action starts under the most supportive planetary energy",
//       "Improve the probability of a positive outcome",
//       "Avoid inauspicious times that create unnecessary obstacles",
//       "Get a precise time window, not just a vague suggestion",
//     ],
//     risks: [
//       "Starting important actions in inauspicious windows invites avoidable obstacles",
//       "Ignoring Muhurat for major decisions reduces the support of cosmic forces",
//     ],
//     deliverables: [
//       "Shubh time window for your specific action",
//       "Brief explanation of why the window is favourable",
//       "Times to avoid on the same day",
//       "Delivered via WhatsApp within 2 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: false,
//   },

//   {
//     id: "muhurat",
//     slug: "muhurat-auspicious-timing",
//     title: "Muhurat – Auspicious Timing",
//     shortDescription:
//       "Find the most powerful cosmic window for buying jewellery, vehicles, property, and other major purchases.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "instant-decisions",
//     icon: Star,
//     problemStatement:
//       "Every major purchase carries energy. Starting an important transaction at the wrong planetary moment can invite obstacles, losses, or regret.",
//     whenToUse: [
//       "You are planning to buy gold, jewellery, or diamonds",
//       "You are finalising a vehicle purchase",
//       "You are registering or entering a new property",
//       "You want the most auspicious date for signing a business agreement",
//     ],
//     benefits: [
//       "Ensure your purchase is backed by positive planetary energy",
//       "Maximise the long-term value and positive outcome of the acquisition",
//       "Avoid inauspicious timings known to cause loss or complications",
//       "Get a precise date + time window, not just a vague suggestion",
//     ],
//     risks: [
//       "Acting in an inauspicious Muhurat can nullify the positive intent behind the purchase",
//       "Negative planetary aspects at the time of purchase can affect the object's longevity",
//     ],
//     deliverables: [
//       "3–5 auspicious date and time windows within your preferred month",
//       "Explanation of why each window is favourable",
//       "Things to avoid on the day of purchase",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "property-buying-time",
//     slug: "property-buying-time-check",
//     title: "Property Buying Time Check",
//     shortDescription:
//       "Is now the right time to buy property? Get an astrological verdict on timing for your real estate decision.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "instant-decisions",
//     icon: Home,
//     problemStatement:
//       "Property is one of the largest financial decisions of your life. The planetary period during which you buy significantly affects whether the property brings prosperity or problems.",
//     whenToUse: [
//       "You are actively looking for a property to buy",
//       "You have found a property and want to know if the timing is right",
//       "You want to know when your chart supports a property purchase",
//       "You want to avoid buying at a time that could bring complications",
//     ],
//     benefits: [
//       "Confirm whether your current planetary period supports property buying",
//       "Get a Shubh time window for registration or possession",
//       "Avoid purchasing in periods that create legal or financial complications",
//       "Ensure the property brings the prosperity and stability you're seeking",
//     ],
//     risks: [
//       "Buying property in an unfavourable Dasha can invite unexpected legal or financial issues",
//       "Poor timing can affect the happiness and prosperity associated with the property",
//     ],
//     deliverables: [
//       "Yes/No on current timing for property purchase",
//       "Best month/window for buying if timing needs adjustment",
//       "Auspicious date for registration or possession",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "travel-relocation-check",
//     slug: "travel-relocation-decision-check",
//     title: "Travel / Relocation Decision Check",
//     shortDescription:
//       "Should you travel or relocate now? Get an astrological verdict on the timing and direction for your move.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "instant-decisions",
//     icon: Plane,
//     problemStatement:
//       "Travel and relocation carry directional energy. Moving in the wrong planetary direction or at the wrong time can bring unexpected challenges despite thorough planning.",
//     whenToUse: [
//       "You are considering relocating to another city or country",
//       "You have an upcoming trip and want to check if it's astrologically favourable",
//       "You are evaluating two locations and want to know which direction is better for you",
//       "You want to know if your chart supports a move abroad",
//     ],
//     benefits: [
//       "Know if now is the right time to travel or relocate",
//       "Understand which geographic directions are auspicious for you",
//       "Avoid relocating in an unfavourable Dasha that creates instability",
//       "Plan your move with cosmic confidence",
//     ],
//     risks: [
//       "Relocating in a weak planetary period can lead to isolation, financial stress, or instability",
//       "Moving in the wrong geographic direction can suppress your planetary energy",
//     ],
//     deliverables: [
//       "Yes/No on timing of the travel or relocation",
//       "Auspicious directions for your chart",
//       "Best time window if current timing needs adjustment",
//       "Delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   // ── PERSONAL INSIGHTS ──────────────────────────────────────────
//   // REMOVED: lucky-day-finder, simple-remedy, rudraksha-suitability,
//   //          crystal-suitability, tattoo-suitability
//   // RENAMED: gemstone-suitability → "Personalised Gemstone Recommendation"
//   // ADDED:   newborn-baby-name

//   {
//     id: "lucky-color",
//     slug: "personal-lucky-color-suggestion",
//     title: "Personal Lucky Color Suggestion",
//     shortDescription:
//       "Discover the colours that amplify your personal planetary energy and those you should wear with caution.",
//     price: 500,
//     deliveryTime: "2 hrs",
//     category: "personal-insights",
//     icon: Sparkles,
//     problemStatement:
//       "Colour carries vibrational energy aligned with planetary forces. Wearing colours that conflict with your dominant planets subtly drains your energy, while your power colours amplify your natural magnetism.",
//     whenToUse: [
//       "You want to know which colours to wear for important days or events",
//       "You want to use colour intentionally to boost your confidence or luck",
//       "You are redesigning your wardrobe or workspace and want cosmic guidance",
//       "You want simple, powerful daily tools for personal alignment",
//     ],
//     benefits: [
//       "Wear colours that strengthen your planetary energy",
//       "Avoid colours that create subtle energetic friction",
//       "Use colour as a simple daily tool for confidence and magnetism",
//       "Immediately actionable — no rituals or investments required",
//     ],
//     risks: [
//       "Consistently wearing colours that oppose your dominant planets creates a subtle but persistent energetic drain",
//     ],
//     deliverables: [
//       "Your primary power colours based on your chart",
//       "Colours to use for specific intentions (confidence, wealth, love)",
//       "Colours to avoid or use sparingly",
//       "Delivered via WhatsApp within 2 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "daily-ritual",
//     slug: "daily-ritual-suggestion",
//     title: "Daily Ritual Suggestion (Simple Routine)",
//     shortDescription:
//       "Receive a simple, personalised daily ritual based on your chart — small actions with big cosmic impact.",
//     price: 500,
//     deliveryTime: "2 hrs",
//     category: "personal-insights",
//     icon: Moon,
//     problemStatement:
//       "Most people are disconnected from their natural planetary rhythm. A simple daily ritual aligned to your chart takes minutes but creates a consistent foundation of cosmic support.",
//     whenToUse: [
//       "You want to start a spiritually aligned daily practice",
//       "You feel scattered or low-energy and want a grounding routine",
//       "You are starting a new chapter and want to begin with cosmic alignment",
//       "You want small, sustainable actions that consistently support your wellbeing",
//     ],
//     benefits: [
//       "Receive a ritual that takes less than 10 minutes but is cosmically meaningful",
//       "Build a daily foundation of planetary support",
//       "Feel more grounded, focused, and energetically aligned",
//       "Simple enough to maintain — powerful enough to notice results",
//     ],
//     risks: [
//       "Living without any cosmic alignment means missing the compounding benefit of small, consistent planetary support",
//     ],
//     deliverables: [
//       "Personalised morning or evening ritual (2–3 simple actions)",
//       "Explanation of why each action is suited to your chart",
//       "Best time of day to perform the ritual",
//       "Delivered via WhatsApp within 2 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "sleep-stress-insight",
//     slug: "sleep-stress-astrology-insight",
//     title: " Sleep / Stress Related Insight",
//     shortDescription:
//       "Understand the planetary root of your sleep issues or stress and receive targeted remedies for relief.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Moon,
//     problemStatement:
//       "Chronic stress and disturbed sleep that persist despite lifestyle changes often have a planetary root — specific houses and planets in your chart govern your nervous system, mind, and rest.",
//     whenToUse: [
//       "You have been struggling with poor sleep or insomnia",
//       "Your stress levels have been unusually high and you want to understand why",
//       "You want to know if a current Dasha is affecting your mental peace",
//       "You want simple planetary remedies to improve sleep and reduce stress",
//     ],
//     benefits: [
//       "Identify the planetary cause of your sleep or stress issue",
//       "Receive targeted remedies — not generic wellness advice",
//       "Understand when this phase is likely to ease",
//       "Restore mental peace with cosmically aligned actions",
//     ],
//     risks: [
//       "Chronic stress and sleep deprivation without addressing the planetary root tends to recycle",
//     ],
//     deliverables: [
//       "Planetary analysis of stress and sleep patterns",
//       "Identified cause and likely duration",
//       "2–3 targeted remedies for relief",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "personal-strength-insight",
//     slug: "personal-strength-insight",
//     title: "Personal Strength Insight (Hidden Strengths)",
//     shortDescription:
//       "Discover the hidden strengths, talents, and natural gifts written in your birth chart that you may not be fully using.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Brain,
//     problemStatement:
//       "Most people are living at a fraction of their potential because they don't know their true planetary strengths. Your chart reveals gifts and talents you may have overlooked, dismissed, or never developed.",
//     whenToUse: [
//       "You feel you have untapped potential but don't know what it is",
//       "You want to understand your natural gifts from a cosmic perspective",
//       "You are at a crossroads and want to know what you're naturally built for",
//       "You want validation and direction for your unique strengths",
//     ],
//     benefits: [
//       "Discover your chart-confirmed hidden strengths and talents",
//       "Understand which planetary gifts you should be leveraging more",
//       "Gain self-confidence backed by cosmic insight",
//       "Identify areas where you can outperform with less effort",
//     ],
//     risks: [
//       "Operating without knowledge of your natural strengths means consistently working harder than necessary",
//     ],
//     deliverables: [
//       "Top 3 hidden strengths revealed by your chart",
//       "Planetary basis for each strength",
//       "How to activate and leverage each strength",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "name-initial-suggestion",
//     slug: "name-initial-suggestion",
//     title: "Name Initial Suggestion (for business/personal)",
//     shortDescription:
//       "Get an astrologically aligned name initial or letter that supports your planetary energy for business or personal use.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Hash,
//     problemStatement:
//       "Names carry vibrational frequency. The initial letter of your business, brand, or even your own name can either align with or work against your dominant planetary energies.",
//     whenToUse: [
//       "You are naming a new business or brand and want cosmic alignment",
//       "You are considering a name change and want astrological guidance",
//       "You want to know which initials are most powerful for you personally",
//       "You want a quick numerological and astrological check on a name",
//     ],
//     benefits: [
//       "Choose a name that vibrationally supports your planetary energy",
//       "Ensure your business or personal brand starts with an aligned initial",
//       "Simple, immediate guidance before committing to a name",
//       "Combines numerology and astrology for a well-rounded recommendation",
//     ],
//     risks: [
//       "A name that conflicts with your planetary energy subtly works against your success from day one",
//     ],
//     deliverables: [
//       "Recommended name initials for your purpose",
//       "Initials to avoid based on your chart",
//       "Brief reasoning for each recommendation",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "lucky-days",
//     slug: "personalised-lucky-days-colours",
//     title: "Personalised  Know Your Lucky Days & Colours",
//     shortDescription:
//       "Discover your personally auspicious days, colours, and numbers to maximise success in daily life.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Star,
//     problemStatement:
//       "There are days when everything flows effortlessly, and days when nothing works. Knowing your personal lucky days and colours lets you schedule what matters most for maximum impact.",
//     whenToUse: [
//       "You want to plan important meetings, launches, or decisions on power days",
//       "You want to know which colours amplify your personal magnetism",
//       "You are starting a new chapter and want daily life to support your goals",
//       "You want a comprehensive lucky profile for everyday use",
//     ],
//     benefits: [
//       "Plan your week around your most powerful days",
//       "Use colour psychology aligned with your planetary rulers",
//       "Improve luck in business, social interactions, and personal endeavours",
//       "Simple, immediately actionable insights",
//     ],
//     risks: [
//       "Scheduling critical actions on your weak days increases the chance of obstacles and delays",
//     ],
//     deliverables: [
//       "Your weekly lucky days and their optimal activities",
//       "Your power colours for different life areas",
//       "Your personal lucky numbers",
//       "Delivered as a handy PDF guide via WhatsApp",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "rudraksha-crystal-combo",
//     slug: "personalised-rudraksha-crystal",
//     title: "Personalised Rudraksha / Crystal Recommendation",
//     shortDescription:
//       "Find the specific Rudraksha bead or healing crystal that resonates with your planetary energy.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Gem,
//     problemStatement:
//       "Rudraksha and crystals are powerful tools — but only when matched to your specific planetary needs. Wearing the wrong Mukhi or crystal creates energetic dissonance rather than harmony.",
//     whenToUse: [
//       "You want a personalised Rudraksha and crystal combination recommendation",
//       "You want to enhance a specific life area: health, money, relationships, or spirituality",
//       "You want a more detailed recommendation than a basic suitability check",
//     ],
//     benefits: [
//       "Receive a chart-specific combination recommendation",
//       "Understand the planetary deity and energy behind your Rudraksha",
//       "Know how to cleanse, charge, and wear your crystal correctly",
//     ],
//     risks: [
//       "Wrong Mukhi Rudraksha can amplify negative planetary energies",
//     ],
//     deliverables: [
//       "Recommended Rudraksha Mukhi with explanation",
//       "Crystal recommendation for your dominant planetary need",
//       "Wearing and maintenance instructions",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "newborn-baby-name",
//     slug: "personalised-newborn-baby-name",
//     title: "Personalised 8.  New Born Baby Name Recommendation",
//     shortDescription:
//       "Get an astrologically and numerologically aligned name for your newborn — a name that supports their cosmic destiny from day one.",
//     price: 1100,
//     deliveryTime: "24 hrs",
//     category: "personal-insights",
//     icon: Baby,
//     problemStatement:
//       "A child's name is the first and most lasting gift you give them. A name aligned with their birth chart and numerological blueprint creates a lifelong foundation of positive energy, identity, and cosmic support.",
//     whenToUse: [
//       "Your baby has just been born and you want an astrologically aligned name",
//       "You want name suggestions that match your child's birth chart and numerology",
//       "You have shortlisted names and want to verify which is most auspicious",
//       "You want the name to support your child's planetary strengths",
//     ],
//     benefits: [
//       "Give your child a name that aligns with their planetary destiny",
//       "Receive multiple name suggestions across different initials",
//       "Ensure the name's numerological value supports success and wellbeing",
//       "A thoughtful, personalised gift that lasts a lifetime",
//     ],
//     risks: [
//       "A name that conflicts with the birth chart can create subtle identity and energetic dissonance throughout life",
//     ],
//     deliverables: [
//       "3–5 auspicious name suggestions based on birth chart",
//       "Explanation of why each name is aligned",
//       "Numerological value of each suggested name",
//       "Delivered via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: true,
//     requiresDOB: true,
//   },

//   // ── RENAMED: gemstone-suitability ─────────────────────────────
//   // Old title: "Gemstone Suitability Check (Basic)"
//   // New title: "Personalised Gemstone Recommendation"

//   {
//     id: "gemstone-suitability",
//     slug: "personalised-gemstone-recommendation",
//     title: "Personalised Gemstone Recommendation",
//     shortDescription:
//       "Know exactly which gemstone to wear — and which to avoid — to amplify your strengths and protect your energy.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "personal-insights",
//     icon: Gem,
//     problemStatement:
//       "The gemstone market is flooded with generic recommendations. Wearing the wrong stone can create more problems than it solves. Your unique birth chart determines which planetary energy you need to strengthen.",
//     whenToUse: [
//       "You want to wear a gemstone but need to know if it's right for you",
//       "A jeweller or relative recommended a stone but you want a second opinion",
//       "You feel your energy or luck needs a boost via gemstone support",
//       "You are going through a challenging Dasha and want gemstone support",
//     ],
//     benefits: [
//       "Receive a genuinely personalised recommendation — not a Sun-sign generalisation",
//       "Know the exact metal, weight, finger, and day to wear the stone",
//       "Understand which stones to strictly avoid based on your chart",
//       "Maximise the stone's impact with proper activation instructions",
//     ],
//     risks: [
//       "Wearing an incompatible gemstone can aggravate malefic planetary energies",
//       "Generic recommendations from jewellers are profit-driven, not chart-driven",
//     ],
//     deliverables: [
//       "Primary gemstone recommendation with full specifications",
//       "Alternative semi-precious stone option",
//       "Gemstones to strictly avoid",
//       "Activation ritual and wearing instructions",
//       "Delivered as a detailed PDF via WhatsApp & Email",
//     ],
//     requiresBirthTime: true,
//     requiresDOB: true,
//   },

//   {
//     id: "lifestyle",
//     slug: "personalised-lifestyle-behavioural-recommendation",
//     title: "Lifestyle & Behavioural Recommendation",
//     shortDescription:
//       "Receive a personalised cosmic lifestyle prescription — diet, habits, and behavioural shifts aligned to your chart.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "personal-insights",
//     icon: Heart,
//     problemStatement:
//       "Generic wellness advice doesn't account for your unique planetary constitution. What works for one person can be counterproductive for another.",
//     whenToUse: [
//       "You want a lifestyle plan rooted in your astrological blueprint",
//       "You struggle with habits that don't stick despite good intentions",
//       "You want to align your diet, sleep, and daily rhythm with your cosmic nature",
//       "You are starting a wellness journey and want a personalised foundation",
//     ],
//     benefits: [
//       "Get lifestyle recommendations tailored to your planetary constitution",
//       "Understand the root behavioural patterns shown in your chart",
//       "Receive simple, implementable daily practices for your specific chart",
//       "Align your natural rhythms with planetary cycles for sustained energy",
//     ],
//     risks: [
//       "Ignoring your planetary constitution means repeated cycles of unsustainable habits",
//     ],
//     deliverables: [
//       "Dietary recommendations based on your dominant planets",
//       "Daily routine framework aligned with your chart",
//       "Behavioural tendencies to embrace and to moderate",
//       "Delivered as a personalised PDF guide via WhatsApp & Email",
//     ],
//     requiresBirthTime: true,
//     requiresDOB: true,
//   },

//   {
//     id: "tattoo-recommendation",
//     slug: "personalised-tattoo-recommendation",
//     title: "Personalised Tattoo Recommendation",
//     shortDescription:
//       "Choose a tattoo that carries the right energy for your chart — symbol, placement, and timing.",
//     price: 1100,
//     deliveryTime: "6 hrs",
//     category: "personal-insights",
//     icon: Zap,
//     problemStatement:
//       "A tattoo is permanent. Getting a symbol, deity, or element that conflicts with your planetary energies can create long-term energetic friction.",
//     whenToUse: [
//       "You are planning your first or next tattoo and want it to carry positive energy",
//       "You want a symbol that aligns with your planetary strengths",
//       "You are choosing between multiple design ideas and want cosmic guidance",
//     ],
//     benefits: [
//       "Choose a tattoo that works as a personal talisman",
//       "Know the most auspicious body placement based on your chart",
//       "Avoid symbols or placements that conflict with your planetary chart",
//       "Get an auspicious date window for getting the tattoo done",
//     ],
//     risks: [
//       "An astrologically incompatible tattoo can create a permanent energetic drain",
//     ],
//     deliverables: [
//       "Recommended symbols or motifs aligned to your chart",
//       "Ideal body placement based on planetary zones",
//       "Symbols to avoid",
//       "Auspicious date window for the tattoo session",
//       "Delivered via WhatsApp within 6 hours",
//     ],
//     requiresBirthTime: false,
//     requiresDOB: true,
//   },

//   {
//     id: "premium-kundli",
//     slug: "personalised-premium-kundli",
//     title: "Personalised Premium Kundli",
//     shortDescription:
//       "Receive a comprehensive, personalised Kundli report — detailed planetary positions, house analysis, Dasha timeline, and life predictions across all key areas.",
//     price: 2100,
//     deliveryTime: "24 hrs",
//     category: "personal-insights",
//     icon: Scroll,
//     problemStatement:
//       "Most people have never seen a properly interpreted Kundli — one that goes beyond generic Sun-sign descriptions and actually explains the specific planetary positions, their strength, and what they mean for your real life circumstances.",
//     whenToUse: [
//       "You want a detailed astrological document of your birth chart",
//       "You are beginning your journey with astrology and want a complete foundation",
//       "You want to understand your current Dasha and what life areas it activates",
//       "You want a reference document you can return to again and again",
//     ],
//     benefits: [
//       "Receive a comprehensive, personalised Kundli — not a computer-generated printout",
//       "Understand each planet's placement, strength, and real-life impact",
//       "Get your complete Dasha timeline with period-by-period interpretation",
//       "Have a permanent astrological reference document for all future decisions",
//     ],
//     risks: [
//       "Making major life decisions without understanding your own chart is navigating blindly",
//       "Generic Kundli software outputs miss the nuanced interpretations that matter most",
//     ],
//     deliverables: [
//       "Complete birth chart with all planetary positions",
//       "House-by-house analysis covering all key life areas",
//       "Full Dasha/Antardasha timeline with interpretations",
//       "Key strengths, challenges, and life themes from your chart",
//       "Delivered as a detailed PDF via WhatsApp & Email within 24 hours",
//     ],
//     requiresBirthTime: true,
//     requiresDOB: true,
//   },
// ];


//testing




import { MessageCircle, Star, Gem, Zap, Heart, Briefcase, Moon, Home, Clock, TrendingUp, Sparkles, Compass, Brain, Hash, DollarSign, Plane, Scroll, Baby } from "lucide-react";

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
  deliveryTime: string;
  category: ServiceCategory;
  icon: React.ElementType;
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
    id: "relationship-conflict",
    slug: "relationship-conflict-guidance",
    title: "Relationship  Guidance",
    shortDescription:
      "Understand the cosmic root of recurring conflicts in your relationship and receive targeted guidance to restore harmony.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "love-relationships",
    icon: Heart,
    problemStatement:
      "Relationship conflicts that repeat despite efforts to resolve them often have a deeper planetary cause — a clash of energies that needs to be understood, not just managed.",
    whenToUse: [
      "You and your partner keep having the same argument with no resolution",
      "You feel emotionally disconnected and don't understand why",
      "Tension has been building and you want to address it before it escalates",
      "You want to understand your partner's behaviour from a cosmic lens",
    ],
    benefits: [
      "Identify the planetary reason behind the recurring conflict",
      "Receive practical, chart-based guidance on restoring harmony",
      "Understand each other's triggers and emotional needs astrologically",
      "Get simple remedies to reduce friction in the relationship",
    ],
    risks: [
      "Unresolved conflicts left unaddressed deepen emotional distance over time",
      "Misunderstanding the root cause leads to wrong solutions that worsen the situation",
    ],
    deliverables: [
      "Astrological analysis of the conflict pattern",
      "Planetary reason behind the tension",
      "Practical guidance and simple remedy",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "family-issue-insight",
    slug: "family-issue-insight",
    title: " Family Issue Insight",
    shortDescription:
      "Get quick astrological insight into a pressing family issue and clarity on the best path forward.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "love-relationships",
    icon: Heart,
    problemStatement:
      "Family conflicts and tensions carry a unique emotional weight. When they persist despite goodwill, it often signals a deeper planetary imbalance affecting the family dynamic.",
    whenToUse: [
      "You are facing a stressful family situation and need perspective",
      "There is ongoing tension between family members with no resolution",
      "You want to know the right time or approach to address a family matter",
      "You need clarity on whether a family decision will work out positively",
    ],
    benefits: [
      "Gain cosmic perspective on why the family issue is persisting",
      "Understand the planetary timing affecting your family dynamics",
      "Receive actionable guidance on the best approach to take",
      "Reduce family stress by acting at the right time in the right way",
    ],
    risks: [
      "Acting at the wrong time or in the wrong way can deepen family rifts",
      "Ignoring persistent family tension affects everyone's mental and physical wellbeing",
    ],
    deliverables: [
      "Quick astrological insight into the family issue",
      "Recommended approach and timing",
      "One practical remedy or action step",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "love-situation-clarity",
    slug: "love-situation-clarity",
    title: "Love Situation Guidance",
    shortDescription:
      "Find out the likely direction of your current romantic situation — is it heading towards commitment, separation, or a turning point?",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "love-relationships",
    icon: Heart,
    problemStatement:
      "When you're in the middle of a romantic situation with no clear signals, the uncertainty is exhausting. Astrology can reveal where the planetary energies are taking this connection.",
    whenToUse: [
      "You are in a relationship or talking stage and don't know where it's heading",
      "Things have been ambiguous and you need clarity on the direction",
      "You want to know if this person is likely to commit",
      "You are unsure whether to invest more emotionally or move on",
    ],
    benefits: [
      "Get a clear directional reading on your current love situation",
      "Understand the planetary timing affecting the relationship's trajectory",
      "Know what to expect in the coming weeks or months",
      "Make an informed decision about whether to stay, invest, or let go",
    ],
    risks: [
      "Investing emotionally in a connection that has no cosmic support wastes precious time",
      "Leaving prematurely when a positive turning point is near is equally costly",
    ],
    deliverables: [
      "Directional reading on where the situation is heading",
      "Planetary influences affecting the connection",
      "Likely timeline for a turning point or clarity",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "compatibility-quick-check",
    slug: "compatibility-quick-check",
    title: "Compatibility  Check",
    shortDescription:
      "A fast astrological compatibility snapshot between you and someone you're considering for a relationship or partnership.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "love-relationships",
    icon: Heart,
    problemStatement:
      "Before investing deeply in a relationship or partnership, it's worth knowing whether the stars support the union — or if there are significant energetic incompatibilities to be aware of.",
    whenToUse: [
      "You have met someone new and want to check basic compatibility",
      "You are evaluating a marriage proposal and need a quick answer",
      "You want to understand the strengths and challenges of an existing relationship",
      "You are considering a business partnership and want an energetic check",
    ],
    benefits: [
      "Get a quick but meaningful compatibility snapshot",
      "Understand the key areas of harmony and friction",
      "Make a more informed decision about whether to proceed",
      "Save time and emotional energy by knowing early",
    ],
    risks: [
      "Entering an incompatible connection without awareness leads to predictable conflicts",
      "Ignoring major incompatibilities can cost years of emotional investment",
    ],
    deliverables: [
      "Compatibility score across key life areas",
      "Top strengths of the union",
      "Key challenge areas to be aware of",
      "Delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  // ── CAREER & MONEY ─────────────────────────────────────────────

  {
    id: "opportunity-check",
    slug: "opportunity-check",
    title: "Opportunity Check (Anything good coming soon?)",
    shortDescription:
      "Find out if a positive planetary window is opening for you in the near future — career, money, or life in general.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "career-money",
    icon: TrendingUp,
    problemStatement:
      "Sometimes you feel like things are stuck and wonder if anything good is on the horizon. Your current Dasha and transit can tell you exactly when a positive window is approaching.",
    whenToUse: [
      "You've been going through a slow or difficult phase and want to know when it lifts",
      "You want to know if now is a good time to make a move or wait",
      "You feel something positive is coming but want confirmation",
      "You want to plan upcoming months around your most favourable windows",
    ],
    benefits: [
      "Know exactly when your next positive planetary window opens",
      "Plan important actions, launches, or decisions around your power periods",
      "Avoid acting in weak periods and conserve energy for the right time",
      "Gain hope and motivation with a concrete timeline",
    ],
    risks: [
      "Acting in a weak planetary period wastes effort and produces frustrating results",
      "Missing your positive window by not being prepared is an avoidable loss",
    ],
    deliverables: [
      "Current planetary period assessment",
      "Next positive window timeline",
      "Key areas of life that will be activated",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "job-change-guidance",
    slug: "job-change-decision-guidance",
    title: "Job Change Decision Guidance",
    shortDescription:
      "Should you take that new offer or stay? Get a clear astrological verdict on your job change decision.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "career-money",
    icon: Briefcase,
    problemStatement:
      "A job change is a major life decision. The right move at the wrong planetary time can still lead to disappointment. Timing and alignment both matter.",
    whenToUse: [
      "You have received a job offer and are unsure whether to accept",
      "You are planning to resign and want to know the right timing",
      "You want to assess whether a new role aligns with your planetary chart",
      "You are torn between two opportunities and need a decisive read",
    ],
    benefits: [
      "Get a clear Yes or No on whether the job change is favourable",
      "Know the best time window to make the move",
      "Understand what the new role is likely to bring based on your chart",
      "Avoid making a costly career mistake by acting at the wrong time",
    ],
    risks: [
      "Leaving a stable job at the wrong planetary time can lead to instability",
      "Declining a good opportunity due to fear without astrological backing is equally costly",
    ],
    deliverables: [
      "Yes/No verdict on the job change",
      "Best timing window for the move",
      "What to expect in the new environment based on your chart",
      "Delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "money-flow-check",
    slug: "money-flow-check",
    title: " Money Flow Guidance",
    shortDescription:
      "Find out the planetary reason your money feels blocked and receive targeted guidance to restore financial flow.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "career-money",
    icon: DollarSign,
    problemStatement:
      "When money keeps slipping through your fingers or income stagnates despite effort, it often points to a specific planetary blockage in your chart.",
    whenToUse: [
      "You work hard but money doesn't accumulate",
      "Unexpected expenses keep draining your savings",
      "You feel there is a financial blockage you cannot explain",
      "You want to know when your financial situation is likely to improve",
    ],
    benefits: [
      "Identify the exact planetary cause of the financial blockage",
      "Receive targeted remedies to restore money flow",
      "Know when your financial planetary period improves",
      "Gain clarity and stop blaming yourself for circumstances that are planetary",
    ],
    risks: [
      "Continuing without understanding the root cause leads to repeated financial cycles",
      "Wrong remedies applied without chart analysis can aggravate the blockage",
    ],
    deliverables: [
      "Analysis of financial houses and planetary influences",
      "Identified cause of the money blockage",
      "Targeted remedy to restore flow",
      "Delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

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
      "Most people spend decades in careers that don't align with their natural strengths or destiny. Your birth chart holds the blueprint for your ideal professional path.",
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
      "Action plan delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },

  // ── INSTANT DECISIONS ──────────────────────────────────────────

  {
    id: "ask-one-question",
    slug: "ask-1-question-yes-no-reason",
    title: "Ask 1 Question (Yes/No + Reason)",
    shortDescription:
      "Get a direct Yes/No astrological answer with the reason behind it for your most pressing question.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "instant-decisions",
    icon: MessageCircle,
    problemStatement:
      "You have one burning question and the mind loops endlessly without a clear answer, creating anxiety and indecision.",
    whenToUse: [
      "You need a clear Yes or No on any specific situation",
      "You want to know if someone or something will work out in your favour",
      "You are at a crossroads and need a directional answer fast",
      "You feel confused and need a decisive cosmic read",
    ],
    benefits: [
      "Get a direct, personalised Yes/No answer — not generic horoscope advice",
      "Understand the planetary influences affecting your specific situation",
      "Gain peace of mind and confidence to act",
      "Receive the reason behind the answer so you understand the bigger picture",
    ],
    risks: [
      "Acting without clarity can lead to regrettable decisions",
      "Unresolved uncertainty affects your mental health and professional life",
    ],
    deliverables: [
      "Clear Yes or No answer to your question",
      "Astrological reasoning behind the answer",
      "Recommended next action and timing",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "go-ahead-wait",
    slug: "go-ahead-or-wait-decision-guidance",
    title: "Go Ahead or Wait Decision Guidance",
    shortDescription:
      "Should you act now or wait? Get a clear astrological Go/Wait answer for any important decision you're facing.",
    price: 500,
    deliveryTime: "2 hrs",
    category: "instant-decisions",
    icon: Compass,
    problemStatement:
      "Timing is everything. The same action taken at the right planetary moment succeeds; taken at the wrong time, it struggles.",
    whenToUse: [
      "You are about to make a significant decision and feel uncertain about timing",
      "You have an opportunity in front of you and want to know if now is the right time",
      "You are torn between acting and waiting and need a clear directive",
      "You want cosmic confirmation before taking an important step",
    ],
    benefits: [
      "Get a clear Go or Wait answer — no ambiguity",
      "Understand the planetary reason behind the recommendation",
      "Save yourself from acting at the wrong time",
      "Gain confidence to move forward decisively when the answer is Go",
    ],
    risks: [
      "Acting at the wrong planetary moment wastes effort and often produces poor results",
      "Waiting when the time is right causes you to miss valuable windows",
    ],
    deliverables: [
      "Clear Go or Wait answer for your specific decision",
      "Brief planetary reason for the recommendation",
      "If Wait — approximate timeframe for when to proceed",
      "Delivered via WhatsApp within 2 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "right-time-check",
    slug: "right-time-check",
    title: "Right Time Check (Shubh Time for Any Decision)",
    shortDescription:
      "Find the most auspicious Shubh Muhurat for any important decision, meeting, signing, or action.",
    price: 500,
    deliveryTime: "2 hrs",
    category: "instant-decisions",
    icon: Clock,
    problemStatement:
      "Every important action carries the energy of the moment it begins. Starting at a Shubh time dramatically improves the probability of a positive outcome.",
    whenToUse: [
      "You want to know the best time to sign a document or agreement",
      "You are scheduling an important meeting or call",
      "You want an auspicious time to start a new project or venture",
      "You are planning any significant action and want maximum cosmic support",
    ],
    benefits: [
      "Ensure your action starts under the most supportive planetary energy",
      "Improve the probability of a positive outcome",
      "Avoid inauspicious times that create unnecessary obstacles",
      "Get a precise time window, not just a vague suggestion",
    ],
    risks: [
      "Starting important actions in inauspicious windows invites avoidable obstacles",
      "Ignoring Muhurat for major decisions reduces the support of cosmic forces",
    ],
    deliverables: [
      "Shubh time window for your specific action",
      "Brief explanation of why the window is favourable",
      "Times to avoid on the same day",
      "Delivered via WhatsApp within 2 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: false,
  },

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
      "Every major purchase carries energy. Starting an important transaction at the wrong planetary moment can invite obstacles, losses, or regret.",
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
    id: "property-buying-time",
    slug: "property-buying-time-check",
    title: "Property Buying Time Check",
    shortDescription:
      "Is now the right time to buy property? Get an astrological verdict on timing for your real estate decision.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "instant-decisions",
    icon: Home,
    problemStatement:
      "Property is one of the largest financial decisions of your life. The planetary period during which you buy significantly affects whether the property brings prosperity or problems.",
    whenToUse: [
      "You are actively looking for a property to buy",
      "You have found a property and want to know if the timing is right",
      "You want to know when your chart supports a property purchase",
      "You want to avoid buying at a time that could bring complications",
    ],
    benefits: [
      "Confirm whether your current planetary period supports property buying",
      "Get a Shubh time window for registration or possession",
      "Avoid purchasing in periods that create legal or financial complications",
      "Ensure the property brings the prosperity and stability you're seeking",
    ],
    risks: [
      "Buying property in an unfavourable Dasha can invite unexpected legal or financial issues",
      "Poor timing can affect the happiness and prosperity associated with the property",
    ],
    deliverables: [
      "Yes/No on current timing for property purchase",
      "Best month/window for buying if timing needs adjustment",
      "Auspicious date for registration or possession",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "travel-relocation-check",
    slug: "travel-relocation-decision-check",
    title: "Travel / Relocation Decision Check",
    shortDescription:
      "Should you travel or relocate now? Get an astrological verdict on the timing and direction for your move.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "instant-decisions",
    icon: Plane,
    problemStatement:
      "Travel and relocation carry directional energy. Moving in the wrong planetary direction or at the wrong time can bring unexpected challenges despite thorough planning.",
    whenToUse: [
      "You are considering relocating to another city or country",
      "You have an upcoming trip and want to check if it's astrologically favourable",
      "You are evaluating two locations and want to know which direction is better for you",
      "You want to know if your chart supports a move abroad",
    ],
    benefits: [
      "Know if now is the right time to travel or relocate",
      "Understand which geographic directions are auspicious for you",
      "Avoid relocating in an unfavourable Dasha that creates instability",
      "Plan your move with cosmic confidence",
    ],
    risks: [
      "Relocating in a weak planetary period can lead to isolation, financial stress, or instability",
      "Moving in the wrong geographic direction can suppress your planetary energy",
    ],
    deliverables: [
      "Yes/No on timing of the travel or relocation",
      "Auspicious directions for your chart",
      "Best time window if current timing needs adjustment",
      "Delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  // ── PERSONAL INSIGHTS ──────────────────────────────────────────

  {
    id: "daily-ritual",
    slug: "daily-ritual-suggestion",
    title: "Daily Ritual Suggestion (Simple Routine)",
    shortDescription:
      "Receive a simple, daily ritual based on your chart — small actions with big cosmic impact.",
    price: 500,
    deliveryTime: "2 hrs",
    category: "personal-insights",
    icon: Moon,
    problemStatement:
      "Most people are disconnected from their natural planetary rhythm. A simple daily ritual aligned to your chart takes minutes but creates a consistent foundation of cosmic support.",
    whenToUse: [
      "You want to start a spiritually aligned daily practice",
      "You feel scattered or low-energy and want a grounding routine",
      "You are starting a new chapter and want to begin with cosmic alignment",
      "You want small, sustainable actions that consistently support your wellbeing",
    ],
    benefits: [
      "Receive a ritual that takes less than 10 minutes but is cosmically meaningful",
      "Build a daily foundation of planetary support",
      "Feel more grounded, focused, and energetically aligned",
      "Simple enough to maintain — powerful enough to notice results",
    ],
    risks: [
      "Living without any cosmic alignment means missing the compounding benefit of small, consistent planetary support",
    ],
    deliverables: [
      "Morning or evening ritual (2–3 simple actions)",
      "Explanation of why each action is suited to your chart",
      "Best time of day to perform the ritual",
      "Delivered via WhatsApp within 2 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "sleep-stress-insight",
    slug: "sleep-stress-astrology-insight",
    title: " Sleep / Stress Related Insight",
    shortDescription:
      "Understand the planetary root of your sleep issues or stress and receive targeted remedies for relief.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Moon,
    problemStatement:
      "Chronic stress and disturbed sleep that persist despite lifestyle changes often have a planetary root — specific houses and planets in your chart govern your nervous system, mind, and rest.",
    whenToUse: [
      "You have been struggling with poor sleep or insomnia",
      "Your stress levels have been unusually high and you want to understand why",
      "You want to know if a current Dasha is affecting your mental peace",
      "You want simple planetary remedies to improve sleep and reduce stress",
    ],
    benefits: [
      "Identify the planetary cause of your sleep or stress issue",
      "Receive targeted remedies — not generic wellness advice",
      "Understand when this phase is likely to ease",
      "Restore mental peace with cosmically aligned actions",
    ],
    risks: [
      "Chronic stress and sleep deprivation without addressing the planetary root tends to recycle",
    ],
    deliverables: [
      "Planetary analysis of stress and sleep patterns",
      "Identified cause and likely duration",
      "2–3 targeted remedies for relief",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "personal-strength-insight",
    slug: "personal-strength-insight",
    title: "Strength Insight (Hidden Strengths)",
    shortDescription:
      "Discover the hidden strengths, talents, and natural gifts written in your birth chart that you may not be fully using.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Brain,
    problemStatement:
      "Most people are living at a fraction of their potential because they don't know their true planetary strengths. Your chart reveals gifts and talents you may have overlooked, dismissed, or never developed.",
    whenToUse: [
      "You feel you have untapped potential but don't know what it is",
      "You want to understand your natural gifts from a cosmic perspective",
      "You are at a crossroads and want to know what you're naturally built for",
      "You want validation and direction for your unique strengths",
    ],
    benefits: [
      "Discover your chart-confirmed hidden strengths and talents",
      "Understand which planetary gifts you should be leveraging more",
      "Gain self-confidence backed by cosmic insight",
      "Identify areas where you can outperform with less effort",
    ],
    risks: [
      "Operating without knowledge of your natural strengths means consistently working harder than necessary",
    ],
    deliverables: [
      "Top 3 hidden strengths revealed by your chart",
      "Planetary basis for each strength",
      "How to activate and leverage each strength",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "name-initial-suggestion",
    slug: "name-initial-suggestion",
    title: "Name Initial Suggestion (for business/personal)",
    shortDescription:
      "Get an astrologically aligned name initial or letter that supports your planetary energy for business or personal use.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Hash,
    problemStatement:
      "Names carry vibrational frequency. The initial letter of your business, brand, or even your own name can either align with or work against your dominant planetary energies.",
    whenToUse: [
      "You are naming a new business or brand and want cosmic alignment",
      "You are considering a name change and want astrological guidance",
      "You want to know which initials are most powerful for you personally",
      "You want a quick numerological and astrological check on a name",
    ],
    benefits: [
      "Choose a name that vibrationally supports your planetary energy",
      "Ensure your business or personal brand starts with an aligned initial",
      "Simple, immediate guidance before committing to a name",
      "Combines numerology and astrology for a well-rounded recommendation",
    ],
    risks: [
      "A name that conflicts with your planetary energy subtly works against your success from day one",
    ],
    deliverables: [
      "Recommended name initials for your purpose",
      "Initials to avoid based on your chart",
      "Brief reasoning for each recommendation",
      "Delivered via WhatsApp within 6 hours",
    ],
    requiresBirthTime: false,
    requiresDOB: true,
  },

  {
    id: "lucky-days",
    slug: "personalised-lucky-days-colours",
    title: " Know Your Lucky Days & Colours",
    shortDescription:
      "Discover your personally auspicious days, colours, and numbers to maximise success in daily life.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Star,
    problemStatement:
      "There are days when everything flows effortlessly, and days when nothing works. Knowing your personal lucky days and colours lets you schedule what matters most for maximum impact.",
    whenToUse: [
      "You want to plan important meetings, launches, or decisions on power days",
      "You want to know which colours amplify your personal magnetism",
      "You are starting a new chapter and want daily life to support your goals",
      "You want a comprehensive lucky profile for everyday use",
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

  {
    id: "rudraksha-crystal-combo",
    slug: "personalised-rudraksha-crystal",
    title: "Rudraksha / Crystal Recommendation",
    shortDescription:
      "Find the specific Rudraksha bead or healing crystal that resonates with your planetary energy.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Gem,
    problemStatement:
      "Rudraksha and crystals are powerful tools — but only when matched to your specific planetary needs. Wearing the wrong Mukhi or crystal creates energetic dissonance rather than harmony.",
    whenToUse: [
      "You want a Rudraksha and crystal combination recommendation",
      "You want to enhance a specific life area: health, money, relationships, or spirituality",
      "You want a more detailed recommendation than a basic suitability check",
    ],
    benefits: [
      "Receive a chart-specific combination recommendation",
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
    id: "newborn-baby-name",
    slug: "personalised-newborn-baby-name",
    title: "New Born Baby Name Recommendation",
    shortDescription:
      "Get an astrologically and numerologically aligned name for your newborn — a name that supports their cosmic destiny from day one.",
    price: 1100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Baby,
    problemStatement:
      "A child's name is the first and most lasting gift you give them. A name aligned with their birth chart and numerological blueprint creates a lifelong foundation of positive energy, identity, and cosmic support.",
    whenToUse: [
      "Your baby has just been born and you want an astrologically aligned name",
      "You want name suggestions that match your child's birth chart and numerology",
      "You have shortlisted names and want to verify which is most auspicious",
      "You want the name to support your child's planetary strengths",
    ],
    benefits: [
      "Give your child a name that aligns with their planetary destiny",
      "Receive multiple name suggestions across different initials",
      "Ensure the name's numerological value supports success and wellbeing",
      "A thoughtful, gift that lasts a lifetime",
    ],
    risks: [
      "A name that conflicts with the birth chart can create subtle identity and energetic dissonance throughout life",
    ],
    deliverables: [
      "3–5 auspicious name suggestions based on birth chart",
      "Explanation of why each name is aligned",
      "Numerological value of each suggested name",
      "Delivered via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },

  {
    id: "gemstone-suitability",
    slug: "personalised-gemstone-recommendation",
    title: "Gemstone Recommendation",
    shortDescription:
      "Know exactly which gemstone to wear — and which to avoid — to amplify your strengths and protect your energy.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Gem,
    problemStatement:
      "The gemstone market is flooded with generic recommendations. Wearing the wrong stone can create more problems than it solves. Your unique birth chart determines which planetary energy you need to strengthen.",
    whenToUse: [
      "You want to wear a gemstone but need to know if it's right for you",
      "A jeweller or relative recommended a stone but you want a second opinion",
      "You feel your energy or luck needs a boost via gemstone support",
      "You are going through a challenging Dasha and want gemstone support",
    ],
    benefits: [
      "Receive a genuinely recommendation — not a Sun-sign generalisation",
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
    id: "lifestyle",
    slug: "personalised-lifestyle-behavioural-recommendation",
    title: "Lifestyle & Behavioural Recommendation",
    shortDescription:
      "Receive a cosmic lifestyle prescription — diet, habits, and behavioural shifts aligned to your chart.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Heart,
    problemStatement:
      "Generic wellness advice doesn't account for your unique planetary constitution. What works for one person can be counterproductive for another.",
    whenToUse: [
      "You want a lifestyle plan rooted in your astrological blueprint",
      "You struggle with habits that don't stick despite good intentions",
      "You want to align your diet, sleep, and daily rhythm with your cosmic nature",
      "You are starting a wellness journey and want a foundation",
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
      "Delivered as a PDF guide via WhatsApp & Email",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },

  {
    id: "tattoo-recommendation",
    slug: "personalised-tattoo-recommendation",
    title: "Tattoo Recommendation",
    shortDescription:
      "Choose a tattoo that carries the right energy for your chart — symbol, placement, and timing.",
    price: 1100,
    deliveryTime: "6 hrs",
    category: "personal-insights",
    icon: Zap,
    problemStatement:
      "A tattoo is permanent. Getting a symbol, deity, or element that conflicts with your planetary energies can create long-term energetic friction.",
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

  {
    id: "premium-kundli",
    slug: "personalised-premium-kundli",
    title: "Premium Kundli",
    shortDescription:
      "Receive a comprehensive Kundli report — detailed planetary positions, house analysis, Dasha timeline, and life predictions across all key areas.",
    price: 2100,
    deliveryTime: "24 hrs",
    category: "personal-insights",
    icon: Scroll,
    problemStatement:
      "Most people have never seen a properly interpreted Kundli — one that goes beyond generic Sun-sign descriptions and actually explains the specific planetary positions, their strength, and what they mean for your real life circumstances.",
    whenToUse: [
      "You want a detailed astrological document of your birth chart",
      "You are beginning your journey with astrology and want a complete foundation",
      "You want to understand your current Dasha and what life areas it activates",
      "You want a reference document you can return to again and again",
    ],
    benefits: [
      "Receive a comprehensive Kundli — not a computer-generated printout",
      "Understand each planet's placement, strength, and real-life impact",
      "Get your complete Dasha timeline with period-by-period interpretation",
      "Have a permanent astrological reference document for all future decisions",
    ],
    risks: [
      "Making major life decisions without understanding your own chart is navigating blindly",
      "Generic Kundli software outputs miss the nuanced interpretations that matter most",
    ],
    deliverables: [
      "Complete birth chart with all planetary positions",
      "House-by-house analysis covering all key life areas",
      "Full Dasha/Antardasha timeline with interpretations",
      "Key strengths, challenges, and life themes from your chart",
      "Delivered as a detailed PDF via WhatsApp & Email within 24 hours",
    ],
    requiresBirthTime: true,
    requiresDOB: true,
  },
];