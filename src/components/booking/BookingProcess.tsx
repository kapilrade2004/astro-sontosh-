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
        id: "astrology-exact-birth-time",
        title: "Astrology - Exact Birth Time Known",
        description: "Individual consultation (phone/video) - 30 minutes",
        price: 5100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-no-exact-birth-time",
        title: "Astrology - Exact Birth Time NOT Known",
        description: "Individual consultation (phone/video) - 60 minutes",
        price: 7500,
        duration: "60",
        icon: Sparkles,
    },
    {
        id: "astrology-in-person",
        title: "Astrology - In-Person (Mumbai Only)",
        description: "Individual consultation (in-person) - 60 minutes",
        price: 7500,
        duration: "60",
        icon: Sparkles,
    },
    {
        id: "premium-kundli",
        title: "Premium Kundli",
        description: "Detailed life analysis and comprehensive horoscope report",
        price: 2100,
        icon: UserCheck,
    },
    {
        id: "numerology",
        title: "Numerology Analysis",
        description: "Individual consultation (phone/video) - 30 minutes",
        price: 3100,
        duration: "30",
        icon: User,
    },
    {
        id: "vastu",
        title: "Vastu Consultation",
        description: "Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
        price: 5100,
        duration: "30",
        icon: MapPin,
    }
];

const durations = [
    { label: "30 Minutes", value: "30" },
    { label: "1 Hour", value: "60" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://cashfee-payment-integration-1.onrender.com";

export const BookingProcess = () => {
    const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
    const [bookingData, setBookingData] = useState({
        consultationType: "new" as "new" | "repeat",
        name: "",
        email: "",
        dob: "",
        phone: "",
        serviceId: "astrology-exact-birth-time",
        duration: "30" as string,
        gender: "",
        place: "Mumbai",
        concern: "",
        areaDimension: "",
        floorPlan: null as File | null,
        propertyLocation: "",
        timeOfBirth: "",
        selectedDate: undefined as Date | undefined,
        selectedTime: null as string | null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [cashfree, setCashfree] = useState<{
        checkout: (options: {
            paymentSessionId: string;
            redirectTarget: string;
        }) => Promise<unknown>;
    } | null>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentResult, setPaymentResult] = useState<{
        success: boolean;
        order_id?: string;
        amount?: number;
        message?: string;
        [key: string]: unknown;
    } | null>(null);

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
        // If serviceId is being updated, check if the service has a predefined duration
        if (updates.serviceId) {
            const service = bookingServices.find(s => s.id === updates.serviceId);
            if (service && 'duration' in service && service.duration) {
                updates.duration = service.duration;
            }
        }

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

        const astrologyServices = ["astrology-exact-birth-time", "astrology-no-exact-birth-time", "astrology-in-person"];
        if ((astrologyServices.includes(bookingData.serviceId) || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && !bookingData.timeOfBirth) {
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

        // Cashfree integration temporarily disabled

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
            const res = await axios.post(`${API_BASE_URL}/payment`, {
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
                        const verifyRes = await axios.post(`${API_BASE_URL}/verify`, {
                            orderId: res.data.order_id,
                        });

                        if (verifyRes.data && verifyRes.data.success) {
                            // Send booking details to backend
                            try {
                                await axios.post(`${API_BASE_URL}/dataslotbooked`, {
                                    ...bookingData,
                                    orderId: res.data.order_id,
                                    paymentSessionId: res.data.payment_session_id,
                                    amount: Number(selectedService?.price),
                                    serviceName: selectedService?.title
                                });
                            } catch (error) {
                                console.error("Failed to save booking details:", error);
                                // We don't block the UI here as payment was successful
                            }

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
        <div ref={bookingRef} className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-1 md:mb-2">
                <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 text-center">
                    Book Your <span className="text-gradient-gold">Consultation</span>
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full mb-2 md:mb-4" />

                {/* Step Progress Bar */}
                <div className="flex items-center justify-center w-full max-w-sm mx-auto relative mb-8 md:mb-10">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
                    {[
                        { id: "details", label: "Basic Info" },
                        { id: "slot", label: "Select Slot & Pay" }
                    ].map((step, i) => (
                        <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${bookingStep === step.id || (bookingStep === "slot" && i === 0)
                                ? "bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110"
                                : "bg-background border-muted text-muted-foreground"
                                }`}>
                                {bookingStep === "slot" && i === 0 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                            </div>
                            <span className={`text-[10px] sm:text-xs mt-2 font-semibold transition-colors duration-300 ${bookingStep === step.id ? "text-primary" : "text-muted-foreground"}`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cosmic-card p-2 md:p-6 lg:p-6 bg-muted/30 backdrop-blur-sm">
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
