import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BookingDetailsStepProps {
    bookingData: any;
    updateBookingData: (updates: any) => void;
    errors: Record<string, string>;
    bookingServices: any[];
    onNext: () => void;
}

export const BookingDetailsStep = ({
    bookingData,
    updateBookingData,
    errors,
    bookingServices,
    onNext
}: BookingDetailsStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Consultation Type Toggle */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                <Button
                    variant={bookingData.consultationType === "new" ? "default" : "outline"}
                    className={`rounded-full px-6 py-2 transition-all ${bookingData.consultationType === "new" ? "glow-gold" : ""}`}
                    onClick={() => updateBookingData({ consultationType: "new" })}
                >
                    New Consultation
                </Button>
                <Button
                    variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
                    className={`rounded-full px-6 py-2 transition-all ${bookingData.consultationType === "repeat" ? "glow-gold" : ""}`}
                    onClick={() => updateBookingData({ consultationType: "repeat" })}
                >
                    Follow-up Consultation
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-primary font-medium">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="Enter full name"
                        className={`bg-background border-primary/20 focus:border-primary h-12 ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.name}
                        onChange={(e) => updateBookingData({ name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary font-medium">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className={`bg-background border-primary/20 focus:border-primary h-12 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.email}
                        onChange={(e) => updateBookingData({ email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob" className="text-primary font-medium">Date of Birth *</Label>
                    <Input
                        id="dob"
                        type="date"
                        className={`bg-background border-primary/20 focus:border-primary h-12 text-white
                            [&::-webkit-calendar-picker-indicator]:invert
                            [&::-webkit-calendar-picker-indicator]:opacity-100 ${errors.dob ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.dob}
                        onChange={(e) => updateBookingData({ dob: e.target.value })}
                    />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-primary font-medium">Mobile Number *</Label>
                    <div className="flex">
                        <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium">+91</span>
                        <Input
                            id="phone"
                            placeholder="Phone number"
                            className={`bg-background border-primary/20 focus:border-primary h-12 rounded-l-none ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                            maxLength={10}
                            value={bookingData.phone}
                            onChange={(e) => updateBookingData({ phone: e.target.value.replace(/\D/g, "") })}
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="service" className="text-primary font-medium">Service Request *</Label>
                    <Select
                        value={bookingData.serviceId}
                        onValueChange={(val) => updateBookingData({ serviceId: val })}
                    >
                        <SelectTrigger className={`bg-background border-primary/20 h-12 ${errors.serviceId ? "border-red-500 focus:border-red-500" : ""}`}>
                            <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                            {bookingServices.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* BTR Selection - Only for Astrology */}
            {bookingData.serviceId === "astrology" && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${bookingData.btr === "with"
                            ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "bg-background/50 border-primary/10 hover:border-primary/30"
                            }`}
                        onClick={() => updateBookingData({ btr: "with" })}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bookingData.btr === "with" ? "border-primary" : "border-muted-foreground"}`}>
                                {bookingData.btr === "with" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <span className="font-bold text-primary">Exact Birth Time NOT known (Birth Time Rectification)</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Consultation within 24 hours. Select this service if you do not know the exact birth time.
                            For eg - birth time could be between 1 pm to 2 pm. (Time range should not be greater than 1 hour)
                        </p>
                    </div>

                    <div
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${bookingData.btr === "without"
                            ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            : "bg-background/50 border-primary/10 hover:border-primary/30"
                            }`}
                        onClick={() => updateBookingData({ btr: "without" })}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bookingData.btr === "without" ? "border-primary" : "border-muted-foreground"}`}>
                                {bookingData.btr === "without" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <span className="font-bold text-primary">Exact Birth Time is Known</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Consultation within 24 hours. Select this service only if you know your exact birth time.
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="flex justify-end pt-8">
                <Button
                    size="lg"
                    className="px-12 py-6 text-lg bg-primary hover:bg-primary/90 glow-gold font-bold"
                    onClick={onNext}
                >
                    Next Step <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </motion.div>
    );
};
