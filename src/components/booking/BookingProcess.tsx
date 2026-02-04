import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    Sparkles, User, MapPin, UserCheck,
    ArrowRight, ArrowLeft, Calendar, Clock,
    CheckCircle2, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ServicePricingChart from "./ServicePricingChart";
import { BookingCalendar } from "./BookingCalendar";

const bookingServices = [
    {
        id: "astrology",
        title: "Astrology Consultation",
        description: "Personalized birth chart analysis. Consultation within 24 hours.",
        price: 2100,
        icon: Sparkles,
    },
    {
        id: "numerology",
        title: "Numerology Analysis",
        description: "Discover the hidden meaning of numbers in your life.",
        price: 2100,
        icon: User,
    },
    {
        id: "vastu",
        title: "Vastu Consultation",
        description: "Align your living or workspace with cosmic energy.",
        price: 5100,
        icon: MapPin,
    },
    {
        id: "premium-kundli",
        title: "Premium Kundli",
        description: "Detailed life analysis and comprehensive horoscope report.",
        price: 2100,
        icon: UserCheck,
    },
];

const durations = [
    { label: "30 Minutes", value: "30" },
    { label: "45 Minutes", value: "45" },
    { label: "1 Hour", value: "60" },
];

export const BookingProcess = () => {
    const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
    const [bookingData, setBookingData] = useState({
        consultationType: "new" as "new" | "repeat",
        name: "",
        email: "",
        dob: "",
        phone: "",
        serviceId: "astrology",
        duration: "" as string,
        btr: "without" as "with" | "without",
        gender: "",
        place: "Mumbai",
        concern: "",
        areaDimension: "",
        floorPlan: "" as any,
        propertyLocation: "",
        timeOfBirth: "",
        selectedDate: undefined as Date | undefined,
        selectedTime: null as string | null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateBookingData = (updates: Partial<typeof bookingData>) => {
        setBookingData(prev => ({ ...prev, ...updates }));
        // Clear error when field is updated
        const updatedFields = Object.keys(updates);
        if (updatedFields.length > 0) {
            setErrors(prev => {
                const newErrors = { ...prev };
                updatedFields.forEach(field => delete newErrors[field]);
                if (updatedFields.includes("selectedDate") || updatedFields.includes("selectedTime")) {
                    delete newErrors.slot;
                }
                return newErrors;
            });
        }
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!bookingData.name.trim()) newErrors.name = "Full name is required";
        else if (bookingData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

        if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!bookingData.dob) newErrors.dob = "Date of birth is required";

        if (!bookingData.phone) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(bookingData.phone)) newErrors.phone = "Phone number must be 10 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
        if (!bookingData.selectedDate || !bookingData.selectedTime) newErrors.slot = "Please select a date and time slot";
        if (!bookingData.gender) newErrors.gender = "Please select gender";
        if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";

        if ((bookingData.serviceId === "astrology" || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && !bookingData.timeOfBirth) {
            newErrors.timeOfBirth = "Time of birth is required";
        }

        if (bookingData.serviceId === "vastu") {
            if (!bookingData.areaDimension.trim()) newErrors.areaDimension = "Area dimension is required";
            if (!bookingData.propertyLocation.trim()) newErrors.propertyLocation = "Property location is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const { toast } = useToast();
    const bookingRef = useRef<HTMLDivElement>(null);

    const scrollToBooking = () => {
        if (bookingRef.current) {
            const offset = 100;
            const elementPosition = bookingRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setBookingStep("slot");
            setTimeout(scrollToBooking, 100);
        } else {
            toast({
                title: "Validation Error",
                description: "Please check the highlighted fields and try again.",
                variant: "destructive"
            });
        }
    };

    const handleBackStep = () => {
        setBookingStep("details");
        setErrors({});
        setTimeout(scrollToBooking, 100);
    };

    const selectedService = bookingServices.find(s => s.id === bookingData.serviceId);

    return (
        <div ref={bookingRef} className="w-full">
            <div className="flex flex-col items-center mb-12">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-center">
                    Book Your <span className="text-gradient-gold">Consultation</span>
                </h2>
                <div className="w-24 h-1 bg-primary rounded-full mb-8" />

                {/* Step Progress Bar */}
                <div className="flex items-center justify-center w-full max-w-md mx-auto relative mb-12">
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
                    {[
                        { id: "details", label: "Basic Info" },
                        { id: "slot", label: "Select Slot & Pay" }
                    ].map((step, i) => (
                        <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${bookingStep === step.id || (bookingStep === "slot" && i === 0)
                                ? "bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110"
                                : "bg-background border-muted text-muted-foreground"
                                }`}>
                                {bookingStep === "slot" && i === 0 ? <CheckCircle2 className="w-6 h-6" /> : i + 1}
                            </div>
                            <span className={`text-sm mt-3 font-semibold transition-colors duration-300 ${bookingStep === step.id ? "text-primary" : "text-muted-foreground"}`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cosmic-card p-4 md:p-10 lg:p-16 bg-muted/30 backdrop-blur-sm">
                {bookingStep === "details" && (
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
                                onClick={() => setBookingData(prev => ({ ...prev, consultationType: "new" }))}
                            >
                                New Consultation
                            </Button>
                            <Button
                                variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
                                className={`rounded-full px-6 py-2 transition-all ${bookingData.consultationType === "repeat" ? "glow-gold" : ""}`}
                                onClick={() => setBookingData(prev => ({ ...prev, consultationType: "repeat" }))}
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
                                    onClick={() => setBookingData(prev => ({ ...prev, btr: "with" }))}
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
                                    onClick={() => setBookingData(prev => ({ ...prev, btr: "without" }))}
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
                                onClick={handleNextStep}
                            >
                                Next Step <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {bookingStep === "slot" && (
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

                                    {/* Duration Selection (Top Right) - Only show if already selected */}
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

                                {/* Pricing and Payment */}
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
                                            <span>Please pay via the UPI ID above to confirm booking</span>
                                        </div>
                                        <Button
                                            className="w-full h-16 text-xl bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg"
                                            onClick={() => {
                                                if (!validateStep2()) {
                                                    toast({
                                                        title: "Missing Information",
                                                        description: "Please complete all required fields and select a slot.",
                                                        variant: "destructive"
                                                    });
                                                    return;
                                                }
                                                toast({
                                                    title: "Booking Confirmation",
                                                    description: `Booking ${bookingData.duration} min session for ${bookingData.selectedTime} on ${bookingData.selectedDate?.toLocaleDateString()}...`,
                                                });
                                            }}
                                        >
                                            Confirm Booking & Pay ₹{selectedService?.price}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Button variant="ghost" onClick={handleBackStep} className="gap-2">
                                <ArrowLeft className="w-4 h-4" /> Back to Basic Info
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
