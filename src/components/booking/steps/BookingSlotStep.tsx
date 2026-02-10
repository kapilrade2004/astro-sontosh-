import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Info } from "lucide-react";
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
import ServicePricingChart from "../ServicePricingChart";

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
            className="space-y-12"
        >
            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12">
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wider">Select Date & Time</h3>
                        </div>

                        {bookingData.duration && (
                            <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary/80">Duration:</span>
                                <div className="flex gap-2">
                                    {durations.map((d) => (
                                        <button
                                            key={d.value}
                                            onClick={() => updateBookingData({ duration: d.value })}
                                            className={`text-xs px-2 py-1 rounded-md transition-all ${bookingData.duration === d.value
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

                    {errors.duration && <p className="text-red-500 text-sm font-semibold mb-2">{errors.duration}</p>}
                    {errors.slot && <p className="text-red-500 text-sm font-semibold mb-2">{errors.slot}</p>}

                    {bookingData.duration ? (
                        <div className="bg-background/20 rounded-2xl border border-primary/20 w-full overflow-hidden">
                            <BookingCalendar
                                selectedDate={bookingData.selectedDate}
                                selectedTime={bookingData.selectedTime}
                                duration={bookingData.duration}
                                onSelect={(date, time) => updateBookingData({ selectedDate: date, selectedTime: time })}
                            />
                        </div>
                    ) : (
                        <div className="bg-background/20 rounded-2xl border border-primary/20 w-full p-12 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold text-primary font-serif">Select Session Duration</h4>
                                <p className="text-muted-foreground max-w-xs mx-auto">Please choose your preferred consultation time below to see available slots.</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                {durations.map((d) => (
                                    <Button
                                        key={d.value}
                                        variant="outline"
                                        size="lg"
                                        className={`min-w-[140px] h-14 text-sm font-bold border-primary/20 hover:border-primary hover:bg-primary/5 transition-all rounded-xl cosmic-card-minimal ${errors.duration ? "border-red-500" : ""}`}
                                        onClick={() => updateBookingData({ duration: d.value })}
                                    >
                                        {d.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                    <ServicePricingChart />
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <Label className="text-primary font-medium">Gender</Label>
                            <Select
                                value={bookingData.gender}
                                onValueChange={(val) => updateBookingData({ gender: val })}
                            >
                                <SelectTrigger className={`bg-background border-primary/20 h-12 ${errors.gender ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-primary font-medium">Place of Birth</Label>
                            <Input
                                placeholder="Enter Place of Birth"
                                className={`bg-background border-primary/20 h-12 ${errors.place ? "border-red-500" : ""}`}
                                value={bookingData.place}
                                onChange={(e) => updateBookingData({ place: e.target.value })}
                            />
                            {errors.place && <p className="text-red-500 text-xs mt-1">{errors.place}</p>}
                        </div>
                    </div>

                    {(bookingData.serviceId === "astrology" || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && (
                        <div className="space-y-2">
                            <Label className="text-primary font-medium">Time of Birth</Label>
                            <Input
                                type="time"
                                className={`bg-background border-primary/20 h-12 text-white
                                [&::-webkit-calendar-picker-indicator]:invert
                                [&::-webkit-calendar-picker-indicator]:opacity-100 ${errors.timeOfBirth ? "border-red-500" : ""}`}
                                value={bookingData.timeOfBirth}
                                onChange={(e) => updateBookingData({ timeOfBirth: e.target.value })}
                            />
                            {errors.timeOfBirth && <p className="text-red-500 text-xs mt-1">{errors.timeOfBirth}</p>}
                        </div>
                    )}

                    {bookingData.serviceId === "vastu" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <Label className="text-primary font-medium">Area Dimension (Length and Width)</Label>
                                <Input
                                    placeholder="e.g. 20x40 ft"
                                    className={`bg-background border-primary/20 h-12 ${errors.areaDimension ? "border-red-500" : ""}`}
                                    value={bookingData.areaDimension}
                                    onChange={(e) => updateBookingData({ areaDimension: e.target.value })}
                                />
                                {errors.areaDimension && <p className="text-red-500 text-xs mt-1">{errors.areaDimension}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-primary font-medium">Property Location</Label>
                                <Input
                                    placeholder="Nearest City / Area"
                                    className={`bg-background border-primary/20 h-12 ${errors.propertyLocation ? "border-red-500" : ""}`}
                                    value={bookingData.propertyLocation}
                                    onChange={(e) => updateBookingData({ propertyLocation: e.target.value })}
                                />
                                {errors.propertyLocation && <p className="text-red-500 text-xs mt-1">{errors.propertyLocation}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-primary font-medium">Upload Floor Plan / House Map</Label>
                                <Input
                                    type="file"
                                    className="bg-background border-primary/20 h-12 py-2"
                                    onChange={(e) => updateBookingData({ floorPlan: e.target.files?.[0] })}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-primary font-medium">Please write your Detail Concern</Label>
                        <Textarea
                            placeholder="Your questions or details..."
                            rows={4}
                            className="bg-background border-primary/20 resize-none py-3"
                            value={bookingData.concern}
                            onChange={(e) => updateBookingData({ concern: e.target.value })}
                        />
                    </div>

                    <div className="pt-8 space-y-6 border-t border-primary/20">
                        <div className="flex items-center justify-between p-5 bg-primary/10 rounded-2xl border-2 border-primary/20 shadow-inner">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Booking Charges for {selectedService?.title}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                        {bookingData.duration} Mins Session
                                    </span>
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-lg border border-primary/10">
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">UPI:</span>
                                        <span className="text-xs font-bold text-primary font-mono tracking-tight">pandeysantoshr@okaxis</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-primary drop-shadow-sm">
                                {bookingData.serviceId === "palmistry" ? "NA" : `₹${selectedService?.price}`}
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-2">
                                <Info className="w-3 h-3 text-primary/60" />
                                <span>Secure transaction via Cashfree</span>
                            </div>
                            <Button
                                className="w-full h-16 text-xl bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isProcessingPayment}
                                onClick={onPay}
                            >
                                {isProcessingPayment ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    `Confirm Booking & Pay ₹${selectedService?.price}`
                                )}
                            </Button>
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
