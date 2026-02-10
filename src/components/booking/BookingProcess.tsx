import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Sparkles, User, MapPin, UserCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sub-components
import { BookingDetailsStep } from "./steps/BookingDetailsStep";
import { BookingSlotStep } from "./steps/BookingSlotStep";
import { BookingStatusScreen } from "./steps/BookingStatusScreen";

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
    {
        id: "palmistry",
        title: "Palmistry",
        description: "Hand analysis and future predictions.",
        price: 0,
        icon: User,
    }
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
        floorPlan: null as any,
        propertyLocation: "",
        timeOfBirth: "",
        selectedDate: undefined as Date | undefined,
        selectedTime: null as string | null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [cashfree, setCashfree] = useState<any>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentResult, setPaymentResult] = useState<any>(null);

    const { toast } = useToast();
    const bookingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initSDK = async () => {
            try {
                const cf = await load({ mode: "sandbox" }); // Replace with "production" when ready
                setCashfree(cf);
            } catch (error) {
                console.error("Failed to initialize Cashfree SDK", error);
            }
        };
        initSDK();
    }, []);

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

    const updateBookingData = (updates: Partial<typeof bookingData>) => {
        setBookingData(prev => ({ ...prev, ...updates }));
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

    const handlePay = async () => {
        if (!validateStep2()) {
            toast({
                title: "Missing Information",
                description: "Please complete all required fields and select a slot.",
                variant: "destructive"
            });
            return;
        }

        if (!cashfree) {
            toast({
                title: "System Error",
                description: "Payment system is not initialized. Please try again later.",
                variant: "destructive"
            });
            return;
        }

        setIsProcessingPayment(true);
        try {
            const res = await axios.post("http://localhost:8000/payment", {
                amount: Number(selectedService?.price),
                customer_name: bookingData.name,
                customer_phone: bookingData.phone,
                customer_email: bookingData.email || "customer@example.com",
            });

            if (res.data && res.data.payment_session_id) {
                const checkoutOptions = {
                    paymentSessionId: res.data.payment_session_id,
                    redirectTarget: "_modal",
                };

                cashfree.checkout(checkoutOptions).then(async () => {
                    try {
                        const verifyRes = await axios.post("http://localhost:8000/verify", {
                            orderId: res.data.order_id,
                        });

                        if (verifyRes.data && verifyRes.data.success) {
                            setPaymentResult(verifyRes.data);
                            // Reset booking-specific fields to "close" the form session
                            setBookingData(prev => ({
                                ...prev,
                                selectedDate: undefined,
                                selectedTime: null,
                                concern: "",
                                duration: ""
                            }));
                        } else {
                            setPaymentResult({
                                success: false,
                                message: verifyRes.data.message || "Payment verification failed."
                            });
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        setPaymentResult({
                            success: false,
                            message: "Something went wrong while verifying your payment."
                        });
                    } finally {
                        setIsProcessingPayment(false);
                    }
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to initialize payment session.",
                    variant: "destructive"
                });
                setIsProcessingPayment(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                title: "Payment Error",
                description: "An error occurred while processing your payment.",
                variant: "destructive"
            });
            setIsProcessingPayment(false);
        }
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
                {paymentResult ? (
                    <BookingStatusScreen
                        paymentResult={paymentResult}
                        selectedService={selectedService}
                        bookingData={bookingData}
                        onReset={() => {
                            setPaymentResult(null);
                            setBookingStep("details");
                        }}
                        onTryAgain={() => setPaymentResult(null)}
                    />
                ) : (
                    <>
                        {bookingStep === "details" ? (
                            <BookingDetailsStep
                                bookingData={bookingData}
                                updateBookingData={updateBookingData}
                                errors={errors}
                                bookingServices={bookingServices}
                                onNext={handleNextStep}
                            />
                        ) : (
                            <BookingSlotStep
                                bookingData={bookingData}
                                updateBookingData={updateBookingData}
                                errors={errors}
                                durations={durations}
                                selectedService={selectedService}
                                isProcessingPayment={isProcessingPayment}
                                onBack={handleBackStep}
                                onPay={handlePay}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
