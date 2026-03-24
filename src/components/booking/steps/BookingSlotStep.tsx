


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Info, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BookingCalendar } from "../BookingCalendar";
import { Sparkles, Hash, Home, Scroll, Repeat, User } from "lucide-react";

// ── Pricing data (mirrors ServicePricingChart data) ──────────────
const newPricingData = [
    { service: "Astrology (Exact Birth Time Known)", price: "5100", duration: "30 min", icon: Sparkles },
    { service: "Astrology (Exact Birth Time NOT Known)", price: "7500", duration: "60 min", icon: Sparkles },
    { service: "Astrology (In-Person Mumbai)", price: "7500", duration: "60 min", icon: Sparkles },
    { service: "Premium Kundli", price: "2100", icon: Scroll },
    { service: "Numerology", price: "3100", duration: "30 min", icon: Hash },
    { service: "Vastu (Exploration)", price: "5100", duration: "30 min", icon: Home },
];

const repeatPricingData = [
    { service: "Astrology Follow-up (within 10 days)", price: "2100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (10-30 days)", price: "3100", duration: "30 min", icon: Repeat },
    { service: "Astrology Follow-up (post 30 days)", price: "5100", duration: "30 min", icon: Repeat },
    { service: "Numerology Follow-up (within 10 days)", price: "1100", duration: "30 min", icon: User },
    { service: "Numerology Follow-up (11-30 days)", price: "2100", duration: "30 min", icon: User },
];

// ── Inline collapsible pricing chart ────────────────────────────
const PricingRow = ({ item }: { item: typeof newPricingData[0] }) => (
    <div className="flex items-center justify-between px-3 py-1.5 hover:bg-primary/5 transition-colors">
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-2.5 h-2.5 text-primary" />
            </div>
            <div>
                <span className="font-semibold text-foreground text-[10px] block leading-tight">
                    {item.service}
                </span>
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
);

const CollapsiblePricingChart = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full mt-1">
            {/* Toggle button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-200 group"
            >
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <IndianRupee className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        View Service Pricing 
                    </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                    <span>{isOpen ? "Hide" : "Show"}</span>
                    {isOpen
                        ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
                        : <ChevronDown className="w-3.5 h-3.5 text-primary" />
                    }
                </div>
            </button>

            {/* Collapsible panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="w-full bg-background/50 backdrop-blur-md rounded-b-xl border border-t-0 border-primary/20 overflow-hidden shadow-lg max-h-[360px] overflow-y-auto custom-scrollbar">
                            {/* New Consultation */}
                            <div className="bg-primary/5 px-3 py-1 border-y border-primary/10">
                                <h4 className="text-primary/80 font-bold uppercase tracking-wider text-[8px]">
                                    New Consultation
                                </h4>
                            </div>
                            <div className="divide-y divide-primary/10">
                                {newPricingData.map((item, i) => (
                                    <PricingRow key={i} item={item} />
                                ))}
                            </div>

                            {/* Repeat Consultation */}
                            <div className="bg-primary/5 px-3 py-1 border-y border-primary/10">
                                <h4 className="text-primary/80 font-bold uppercase tracking-wider text-[8px]">
                                    Repeat Consultation
                                </h4>
                            </div>
                            <div className="divide-y divide-primary/10">
                                {repeatPricingData.map((item, i) => (
                                    <PricingRow key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Main component ───────────────────────────────────────────────
interface BookingSlotStepProps {
    bookingData: any;
    updateBookingData: (updates: any) => void;
    errors: Record<string, string>;
    durations: any[];
    selectedService: any;
    isProcessingPayment: boolean;
    onBack: () => void;
    onPay: () => void;
}

export const BookingSlotStep = ({
    bookingData,
    updateBookingData,
    errors,
    durations,
    selectedService,
    isProcessingPayment,
    onBack,
    onPay
}: BookingSlotStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8"
        >
            <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-4 lg:gap-5 max-w-full xl:max-w-5xl">

                {/* ── LEFT: Calendar + Pricing toggle ── */}
                <div className="space-y-3 max-w-full lg:max-w-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <h3 className="font-bold text-base sm:text-lg uppercase tracking-wider">
                                Select Date & Time
                            </h3>
                        </div>

                        {bookingData.duration && selectedService && "duration" in selectedService && selectedService.duration && (
                            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium text-primary/80">Duration:</span>
                                <span className="text-xs font-bold text-primary">
                                    {selectedService.duration === "30" ? "30 Minutes" : "60 Minutes"}
                                </span>
                            </div>
                        )}

                        {bookingData.duration && selectedService && !("duration" in selectedService && selectedService.duration) && (
                            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium text-primary/80">Duration:</span>
                                <div className="flex gap-1.5">
                                    {durations.map((d) => (
                                        <button
                                            key={d.value}
                                            onClick={() => updateBookingData({ duration: d.value })}
                                            className={`text-[10px] px-2 py-0.5 rounded-md transition-all ${
                                                bookingData.duration === d.value
                                                    ? "bg-primary text-primary-foreground font-bold"
                                                    : "bg-background/50 text-muted-foreground hover:text-primary"
                                            }`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {errors.duration && (
                        <p className="text-red-500 text-sm font-semibold mb-2">{errors.duration}</p>
                    )}
                    {errors.slot && (
                        <p className="text-red-500 text-sm font-semibold mb-2">{errors.slot}</p>
                    )}

                    {bookingData.duration ? (
                        <div className="w-full">
                            <BookingCalendar
                                selectedDate={bookingData.selectedDate}
                                selectedTime={bookingData.selectedTime}
                                duration={bookingData.duration}
                                onSelect={(date, time) =>
                                    updateBookingData({ selectedDate: date, selectedTime: time })
                                }
                            />
                        </div>
                    ) : selectedService && !("duration" in selectedService && selectedService.duration) ? (
                        <div className="bg-background/20 rounded-2xl border border-primary/20 w-full p-8 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-primary font-serif">Select Session Duration</h4>
                                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    Please choose your preferred consultation time below.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 mt-2">
                                {durations.map((d) => (
                                    <Button
                                        key={d.value}
                                        variant="outline"
                                        size="sm"
                                        className={`min-w-[110px] h-10 text-xs font-bold border-primary/20 hover:border-primary hover:bg-primary/5 transition-all rounded-xl cosmic-card-minimal ${
                                            errors.duration ? "border-red-500" : ""
                                        }`}
                                        onClick={() => updateBookingData({ duration: d.value })}
                                    >
                                        {d.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* ── Collapsible Pricing Guide (replaces static ServicePricingChart) ── */}
                    <CollapsiblePricingChart />
                </div>

                {/* ── RIGHT: Form fields + Pay button ── */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-primary font-medium text-xs">Gender</Label>
                            <span className="sr-only">Select Gender</span>
                            <Select
                                value={bookingData.gender}
                                onValueChange={(val) => updateBookingData({ gender: val })}
                            >
                                <SelectTrigger
                                    className={`bg-background border-primary/20 h-10 text-sm ${errors.gender ? "border-red-500" : ""}`}
                                >
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && (
                                <p className="text-red-500 text-[10px] mt-1">{errors.gender}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-primary font-medium text-xs">Place of Birth</Label>
                            <Input
                                placeholder="City"
                                className={`bg-background border-primary/20 h-10 text-sm ${errors.place ? "border-red-500" : ""}`}
                                value={bookingData.place}
                                onChange={(e) => updateBookingData({ place: e.target.value })}
                            />
                            {errors.place && (
                                <p className="text-red-500 text-[10px] mt-1">{errors.place}</p>
                            )}
                        </div>
                    </div>

                    {(["astrology-exact-birth-time", "astrology-no-exact-birth-time", "astrology-in-person"].includes(bookingData.serviceId) ||
                        bookingData.serviceId === "numerology" ||
                        bookingData.serviceId === "premium-kundli") && (
                        <div className="space-y-1.5">
                            <Label className="text-primary font-medium text-xs">Time of Birth</Label>
                            <Input
                                type="time"
                                className={`bg-background border-primary/20 h-10 text-sm text-white
                                    [&::-webkit-calendar-picker-indicator]:invert
                                    [&::-webkit-calendar-picker-indicator]:opacity-100
                                    ${errors.timeOfBirth ? "border-red-500" : ""}`}
                                value={bookingData.timeOfBirth}
                                onChange={(e) => updateBookingData({ timeOfBirth: e.target.value })}
                            />
                            {errors.timeOfBirth && (
                                <p className="text-red-500 text-[10px] mt-1">{errors.timeOfBirth}</p>
                            )}
                        </div>
                    )}

                    {bookingData.serviceId === "vastu" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-4"
                        >
                            <div className="space-y-1.5">
                                <Label className="text-primary font-medium text-xs">Area Dimension</Label>
                                <Input
                                    placeholder="e.g. 20x40 ft"
                                    className={`bg-background border-primary/20 h-10 text-sm ${errors.areaDimension ? "border-red-500" : ""}`}
                                    value={bookingData.areaDimension}
                                    onChange={(e) => updateBookingData({ areaDimension: e.target.value })}
                                />
                                {errors.areaDimension && (
                                    <p className="text-red-500 text-[10px] mt-1">{errors.areaDimension}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-primary font-medium text-xs">Property Location</Label>
                                <Input
                                    placeholder="Nearest City / Area"
                                    className={`bg-background border-primary/20 h-10 text-sm ${errors.propertyLocation ? "border-red-500" : ""}`}
                                    value={bookingData.propertyLocation}
                                    onChange={(e) => updateBookingData({ propertyLocation: e.target.value })}
                                />
                                {errors.propertyLocation && (
                                    <p className="text-red-500 text-[10px] mt-1">{errors.propertyLocation}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-primary font-medium text-xs">Upload Floor Plan</Label>
                                <Input
                                    type="file"
                                    className="bg-background border-primary/20 h-10 py-1 text-xs"
                                    onChange={(e) => updateBookingData({ floorPlan: e.target.files?.[0] })}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-1.5">
                        <Label className="text-primary font-medium text-xs">Detailed Concern</Label>
                        <Textarea
                            placeholder="Your questions or details..."
                            rows={3}
                            className="bg-background border-primary/20 resize-none py-2 text-sm"
                            value={bookingData.concern}
                            onChange={(e) => updateBookingData({ concern: e.target.value })}
                        />
                    </div>

                    {/* ── Booking amount + Pay button ── */}
                    <div className="pt-4 space-y-4 border-t border-primary/20">
                        <div className="flex items-center justify-between p-3.5 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">
                                    Booking Amount
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">
                                        {bookingData.duration} Mins
                                    </span>
                                </div>
                            </div>
                            <div className="text-xl font-bold text-primary drop-shadow-sm font-serif">
                                ₹{selectedService?.price}
                            </div>
                        </div>

                        <div className="text-center space-y-3">
                            <Button
                                className="w-full h-12 text-base bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isProcessingPayment}
                                onClick={onPay}
                            >
                                {isProcessingPayment ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    `Confirm Booking & Pay ₹${selectedService?.price}`
                                )}
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                                <Info className="w-2.5 h-2.5 text-primary/60" />
                                <span>Secure transaction via Cashfree</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-start">
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Basic Info
                </Button>
            </div>
        </motion.div>
    );
};