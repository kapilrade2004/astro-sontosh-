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
            className="space-y-4 md:space-y-6"
        >
            {/* Consultation Type Toggle */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                <Button
                    variant={bookingData.consultationType === "new" ? "default" : "outline"}
                    className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${bookingData.consultationType === "new" ? "glow-gold" : ""}`}
                    onClick={() => updateBookingData({ consultationType: "new" })}
                >
                    New Consultation
                </Button>
                <Button
                    variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
                    className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${bookingData.consultationType === "repeat" ? "glow-gold" : ""}`}
                    onClick={() => updateBookingData({ consultationType: "repeat" })}
                >
                    Follow-up Consultation
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-primary font-medium text-xs">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="Enter full name"
                        className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.name}
                        onChange={(e) => updateBookingData({ name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-primary font-medium text-xs">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.email}
                        onChange={(e) => updateBookingData({ email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-primary font-medium text-xs">Date of Birth *</Label>
                    <Input
                        id="dob"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        className={`bg-background border-primary/20 focus:border-primary h-10 text-sm text-white
                            [&::-webkit-calendar-picker-indicator]:invert
                            [&::-webkit-calendar-picker-indicator]:opacity-100 ${errors.dob ? "border-red-500 focus:border-red-500" : ""}`}
                        value={bookingData.dob}
                        onChange={(e) => updateBookingData({ dob: e.target.value })}
                    />
                    {errors.dob && <p className="text-red-500 text-[10px] mt-1">{errors.dob}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-primary font-medium text-xs">Mobile Number *</Label>
                    <div className="flex">
                        <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs">+91</span>
                        <Input
                            id="phone"
                            placeholder="Phone number"
                            className={`bg-background border-primary/20 focus:border-primary h-10 text-sm rounded-l-none ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                            maxLength={10}
                            value={bookingData.phone}
                            onChange={(e) => updateBookingData({ phone: e.target.value.replace(/\D/g, "") })}
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="service" className="text-primary font-medium text-xs">Service Request *</Label>
                    <Select
                        value={bookingData.serviceId}
                        onValueChange={(val) => updateBookingData({ serviceId: val })}
                    >
                        <SelectTrigger className={`bg-background border-primary/20 h-10 text-sm ${errors.serviceId ? "border-red-500 focus:border-red-500" : ""}`}>
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

            <div className="flex justify-end pt-2">
                <Button
                    size="lg"
                    className="px-8 py-3 h-auto text-base bg-primary hover:bg-primary/90 glow-gold font-bold"
                    onClick={onNext}
                >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
};
