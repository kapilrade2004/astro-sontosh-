import React from 'react';
import { Sparkles, Hash, Home, Scroll, Hand } from 'lucide-react';

const pricingData = [
    { service: "Astrology", price: "2100", icon: Sparkles, note: "Consultation within 24 hours" },
    { service: "Numerology", price: "2100", icon: Hash },
    { service: "Vastu", price: "5100", icon: Home },
    { service: "Palmistry", price: "NA*", icon: Hand, note: "*In-person only" },
    { service: "Premium Kundli", price: "2100", icon: Scroll },
];

const ServicePricingChart = () => {
    return (
        <div className="w-full bg-background/50 backdrop-blur-md rounded-2xl border border-primary/20 overflow-hidden shadow-xl mt-4">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/20">
                <h3 className="text-primary font-bold uppercase tracking-wider text-[10px]">Service Pricing Guide</h3>
            </div>
            <div className="divide-y divide-primary/10">
                {pricingData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <item.icon className="w-3 h-3 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold text-foreground text-xs">{item.service}</span>
                                {item.note && <p className="text-[9px] text-muted-foreground leading-none">{item.note}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-primary">
                                {item.price !== "NA*" ? `₹${item.price}` : "NA"}
                            </span>
                            <span className="text-[8px] text-muted-foreground uppercase tracking-tighter leading-none">Booking Amount</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicePricingChart;
