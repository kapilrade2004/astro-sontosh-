// import React from 'react';
// import { Sparkles, Hash, Home, Scroll, Repeat } from 'lucide-react';

// const newPricingData = [
//     { service: "Astrology (Exact Birth Time Known)", price: "5100", duration: "30 min", icon: Sparkles },
//     { service: "Astrology (Exact Birth Time NOT Known)", price: "7500", duration: "60 min", icon: Sparkles },
//     { service: "Astrology (In-Person Mumbai)", price: "7500", duration: "60 min", icon: Sparkles },
//     { service: "Premium Kundli", price: "2100", icon: Scroll },
//     { service: "Numerology", price: "3100", duration: "30 min", icon: Hash },
//     { service: "Vastu (Exploration Call)", price: "5100", duration: "30 min", icon: Home },
// ];

// const repeatPricingData = [
//     { service: "Astrology Follow-up (within 10 days)", price: "2100", duration: "30 min", icon: Repeat },
//     { service: "Astrology Follow-up (10-30 days)", price: "3100", duration: "30 min", icon: Repeat },
//     { service: "Astrology Follow-up (post 30 days)", price: "5100", duration: "30 min", icon: Repeat },
//     { service: "Numerology Follow-up (within 10 days)", price: "1100", duration: "30 min", icon: Repeat },
//     { service: "Numerology Follow-up (11-30 days)", price: "2100", duration: "30 min", icon: Repeat },
// ];

// const PricingSection = ({ title, data }: { title: string, data: typeof newPricingData }) => (
//     <div className="mb-2 last:mb-0">
//         <div className="bg-primary/5 px-3 py-1 border-y border-primary/10">
//             <h4 className="text-primary/80 font-bold uppercase tracking-wider text-[8px]">{title}</h4>
//         </div>
//         <div className="divide-y divide-primary/10">
//             {data.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between px-3 py-1.5 hover:bg-primary/5 transition-colors">
//                     <div className="flex items-center gap-2">
//                         <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
//                             <item.icon className="w-2.5 h-2.5 text-primary" />
//                         </div>
//                         <div>
//                             <span className="font-semibold text-foreground text-[10px] block leading-tight">{item.service}</span>
//                             {item.duration && <p className="text-[8px] text-muted-foreground leading-none mt-0.5">{item.duration}</p>}
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-end shrink-0 pl-2">
//                         <span className="text-xs font-bold text-primary">
//                             ₹{item.price}
//                         </span>
//                         <span className="text-[7px] text-muted-foreground uppercase tracking-tighter leading-none">Amount</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// const ServicePricingChart = () => {
//     return (
//         <div className="w-full bg-background/50 backdrop-blur-md rounded-2xl border border-primary/20 overflow-hidden shadow-xl mt-4 max-h-[500px] overflow-y-auto custom-scrollbar">
//             <div className="bg-primary/10 px-3 py-1.5 border-b border-primary/20 sticky top-0 backdrop-blur-md z-10">
//                 <h3 className="text-primary font-bold uppercase tracking-wider text-[9px]">Service Pricing Guide</h3>
//             </div>

//             <PricingSection title="New Consultation" data={newPricingData} />
//             <PricingSection title="Repeat Consultation" data={repeatPricingData} />
//         </div>
//     );
// };

// export default ServicePricingChart;


//testing



import React from 'react';
import { Sparkles, Hash, Home, Scroll, Repeat, MessageCircle, Star, Gem, Heart, Briefcase, Zap } from 'lucide-react';

const microPricingData = [
    { service: "Address 1 question", price: "1100", icon: MessageCircle },
    { service: "Muhurat for buying Jewellery, Vehicles, Property, etc", price: "1100", icon: Star },
    { service: "Personalised Auspicious / Lucky - Days, Colour, etc.", price: "1100", icon: Star },
    { service: "Personalised Rudraksha / Crystal Recommendation", price: "1100", icon: Gem },
    { service: "Personalised Tattoo Recommendation", price: "1100", icon: Zap },
    { service: "Personalised Gemstone Recommendation", price: "2100", icon: Gem },
    { service: "Personalised Lifestyle Behavioural Recommendation", price: "2100", icon: Heart },
    { service: "Marriage - MatchMaking", price: "2100", icon: Heart },
    { service: "Career - Guidance", price: "2100", icon: Briefcase },
    // { service: "Premium Kundli", price: "2100", icon: Scroll },
];

const newPricingData = [
    { service: "Astrology (Exact Birth Time Known)", price: "5100", duration: "30 min", icon: Sparkles },
    { service: "Astrology (Exact Birth Time NOT Known)", price: "7500", duration: "60 min", icon: Sparkles },
    { service: "Astrology (In-Person Mumbai)", price: "7500", duration: "60 min", icon: Sparkles },
    // { service: "Premium Kundli", price: "2100", icon: Scroll },
    { service: "Numerology", price: "3100", duration: "30 min", icon: Hash },
    { service: "Vastu (Exploration Call)", price: "5100", duration: "30 min", icon: Home },
];

const repeatPricingData = [
    { service: "Astrology Follow-up (within 10 days)", price: "2100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (11-30 days)", price: "3100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (post 30 days)", price: "5100", duration: "30 min", icon: Repeat },
    { service: "Numerology Follow-up (within 10 days)", price: "1100", duration: "30 min", icon: Repeat },
    { service: "Numerology Follow-up (11-30 days)", price: "2100", duration: "30 min", icon: Repeat },
    { service: "Numerology Follow-up (post 30 days)", price: "5100", duration: "30 min", icon: Repeat },
];

const PricingSection = ({ title, data }: { title: string, data: typeof newPricingData }) => (
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
                            {item.duration && <p className="text-[8px] text-muted-foreground leading-none mt-0.5">{item.duration}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2">
                        <span className="text-xs font-bold text-primary">
                            ₹{item.price}
                        </span>
                        <span className="text-[7px] text-muted-foreground uppercase tracking-tighter leading-none">Amount</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ServicePricingChart = () => {
    return (
        <div className="w-full bg-background/50 backdrop-blur-md rounded-2xl border border-primary/20 overflow-hidden shadow-xl mt-4 max-h-[500px] overflow-y-auto custom-scrollbar">
            <div className="bg-primary/10 px-3 py-1.5 border-b border-primary/20 sticky top-0 backdrop-blur-md z-10">
                <h3 className="text-primary font-bold uppercase tracking-wider text-[9px]">Service Pricing Guide</h3>
            </div>

            <PricingSection title="Micro / Quick Service" data={microPricingData} />
            <PricingSection title="New Consultation" data={newPricingData} />
            <PricingSection title="Repeat Consultation" data={repeatPricingData} />
        </div>
    );
};

export default ServicePricingChart;