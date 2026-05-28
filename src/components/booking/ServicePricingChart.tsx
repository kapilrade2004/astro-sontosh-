

import React from 'react';
import {
    Sparkles, Hash, Home, Scroll, Repeat, User,
    MessageCircle, Star, Gem, Heart, Briefcase, Zap,
    Moon, TrendingUp, Compass, Clock, Brain, DollarSign, Plane, Baby,
} from 'lucide-react';


const microPricingData = [
    // ── ₹500 tier ──
    { service: "Daily Ritual Suggestion (Simple Routine)",        price: "500",   icon: Moon        },
    { service: "Go Ahead or Wait Decision Guidance",              price: "500",   icon: Compass     },
    { service: "Right Time Check (Shubh Time for Any Decision)",  price: "500",   icon: Clock       },
    // ── ₹1,100 tier ──
    { service: "Ask 1 Question (Yes/No + Reason)",                price: "1,100", icon: MessageCircle },
    { service: "Relationship Guidance",                  price: "1,100", icon: Heart       },
    { service: "Family Issue Insight",           price: "1,100", icon: Heart       },
    { service: "Love Situation Guidance",     price: "1,100", icon: Heart       },
    { service: "Opportunity Check (Anything good coming soon?)",  price: "1,100", icon: TrendingUp  },
    { service: "Sleep / Stress Related Insight",                price: "1,100", icon: Moon        },
    { service: "Strength Insight (Hidden Strengths)",             price: "1,100", icon: Brain       },
    { service: "Name Initial Suggestion (for business/personal)", price: "1,100", icon: Hash        },
    { service: "Property Buying Time Check",                      price: "1,100", icon: Home        },
    { service: "Muhurat – Auspicious Timing",                     price: "1,100", icon: Star        },
    { service: " Know Your Lucky Days & Colours",                            price: "1,100", icon: Star        },
    { service: "Rudraksha / Crystal Recommendation",              price: "1,100", icon: Gem         },
    { service: "Tattoo Recommendation",                           price: "1,100", icon: Zap         },
    { service: "New Born Baby Name Recommendation",                              price: "1,100", icon: Baby        },
    // ── ₹2,100 tier ──
    { service: "Compatibility  Check",                       price: "2,100", icon: Heart       },
    { service: "Job Change Decision Guidance",                    price: "2,100", icon: Briefcase   },
    { service: "Money Flow Guidance",          price: "2,100", icon: DollarSign  },
    { service: "Career Guidance",                                 price: "2,100", icon: Briefcase   },
    { service: "Travel / Relocation Decision Check",              price: "2,100", icon: Plane       },
    { service: "Gemstone Recommendation",                         price: "2,100", icon: Gem         },
    { service: "Lifestyle & Behavioural Recommendation",          price: "2,100", icon: Heart       },
    { service: "Premium Kundli",                                  price: "2,100", icon: Scroll      },
];

const newPricingData = [
    { service: "Astrology (Exact Birth Time Known)",     price: "11,000", duration: "30 min", icon: Sparkles },
    { service: "Astrology (Exact Birth Time NOT Known)", price: "15,000", duration: "60 min", icon: Sparkles },
    { service: "Astrology (In-Person Mumbai)",           price: "15,000", duration: "60 min", icon: Sparkles },
    { service: "Numerology",                             price: "3,100",  duration: "30 min", icon: Hash     },
    { service: "Vastu (Exploration Call)",               price: "5,100",  duration: "30 min", icon: Home     },
];

const repeatPricingData = [
    { service: "Astrology Follow-up (within 10 days)",  price: "2,100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (11–30 days)",      price: "3,100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (post 30 days)",    price: "5,100", duration: "30 min", icon: Repeat },
    { service: "Numerology Follow-up (within 10 days)", price: "1,100", duration: "30 min", icon: User   },
    { service: "Numerology Follow-up (11–30 days)",     price: "2,100", duration: "30 min", icon: User   },
    { service: "Numerology Follow-up (post 30 days)",   price: "3,100", duration: "30 min", icon: User   },
];

const PricingSection = ({ title, data }: { title: string; data: typeof newPricingData }) => (
    <div className="mb-2 last:mb-0">
        <div className="bg-primary/5 px-3 py-1 border-y border-primary/10">
            <h4 className="text-primary/80 font-bold uppercase tracking-wider text-[8px]">{title}</h4>
        </div>
        <div className="divide-y divide-primary/10">
            {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-1.5 hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <div>
                            <span className="font-semibold text-foreground text-[10px] block leading-tight">{item.service}</span>
                            {"duration" in item && item.duration && (
                                <p className="text-[8px] text-muted-foreground leading-none mt-0.5">{item.duration}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2">
                        <span className="text-xs font-bold text-primary">₹{item.price}</span>
                        <span className="text-[7px] text-muted-foreground uppercase tracking-tighter leading-none">Amount</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ServicePricingChart = () => (
    <div className="w-full bg-background/50 backdrop-blur-md rounded-2xl border border-primary/20 overflow-hidden shadow-xl mt-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div className="bg-primary/10 px-3 py-1.5 border-b border-primary/20 sticky top-0 backdrop-blur-md z-10">
            <h3 className="text-primary font-bold uppercase tracking-wider text-[9px]">Service Pricing Guide</h3>
        </div>
        <PricingSection title="Micro / Quick Service"              data={microPricingData} />
        <PricingSection title="New Consultation"                   data={newPricingData}   />
        <PricingSection title="Repeat / Follow-up Consultation"    data={repeatPricingData} />
    </div>
);

export default ServicePricingChart;