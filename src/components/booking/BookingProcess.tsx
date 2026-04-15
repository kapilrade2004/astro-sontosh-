

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Sparkles, User, MapPin, UserCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Sub-components
import { BookingDetailsStep } from "./steps/BookingDetailsStep";
import { BookingSlotStep } from "./steps/BookingSlotStep";
import { BookingStatusScreen } from "./steps/BookingStatusScreen";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";

const newBookingServices = [
    {
        id: "astrology-exact-birth-time",
        title: "Astrology - (Exact Birth Time Known)",
        description: "Individual consultation (phone/video) - 30 minutes",
        price: 5100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-no-exact-birth-time",
        title: "Astrology - (Exact Birth Time NOT Known)",
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
    // {
    //     id: "premium-kundli",
    //     title: "Premium Kundli",
    //     description: "Detailed life analysis and comprehensive horoscope report",
    //     price: 2100,
    //     icon: UserCheck,
    // },
    {
        id: "numerology",
        title: "Numerology Analysis",
        description: "Individual consultation (phone/video) - 30 minutes",
        price: 3100,
        duration: "30",
        icon: User,
    },
    {
        id: "vastu ",
        title: "Vastu Consultation",
        // ── Row 4: Updated Vastu description text
        description: "Vastu Exploration Call - INR 5100 | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
        price: 5100,
        duration: "30",
        icon: MapPin,
    }
];

const repeatBookingServices = [
    {
        id: "astrology-repeat-within-10",
        title: "Astrology - Follow-up (within 10 days)",
        description: "Follow-up consultation (within 10 days) - 30 Minutes",
        price: 2100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-repeat-10-to-30",
        title: "Astrology - Follow-up (11-30 days)",
        description: "Follow-up consultation (after 10 days till 30 days) - 30 Minutes",
        price: 3100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-repeat-post-30",
        title: "Astrology - Follow-up (post 30 days)",
        description: "Follow-up consultation (post 30 days) - 30 Minutes",
        price: 5100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "numerology-repeat-within-10",
        title: "Numerology - Follow-up (within 10 days)",
        description: "Individual consultation (phone/video) - (within 10 days) - 30 minutes",
        price: 1100,
        duration: "30",
        icon: User,
    },
    {
        id: "numerology-repeat-11-to-30",
        title: "Numerology - Follow-up (11-30 days)",
        description: "Individual consultation (phone/video) - (between 11 to 30 days) - 30 minutes",
        price: 2100,
        duration: "30",
        icon: User,
    },
       {
        id: "numerology-repeat-post-30",
        title: "Numerology - Follow-up (post 30 days)",
        description: "Follow-up consultation (post 30 days) - 30 Minutes",
        price: 5100,
        duration: "30",
        icon: Sparkles,
    },
];

const durations = [
    { label: "30 Minutes", value: "30" },
    { label: "1 Hour", value: "60" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const BookingProcess = () => {
    const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
    const [bookingData, setBookingData] = useState({
        consultationType: "new" as "new" | "repeat",
        name: "",
        email: "",
        // ── Row 13: dob starts empty; will only be set via date-picker, never by manual typing
        dob: "",
        phone: "",
        serviceId: "astrology-exact-birth-time",
        duration: "30" as string,
        gender: "",
        place: "",
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
                const cf = await load({ mode: "production" });
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
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const activeServices = bookingData.consultationType === "repeat" ? repeatBookingServices : newBookingServices;
    const allServices = [...newBookingServices, ...repeatBookingServices];
    const selectedService = allServices.find(s => s.id === bookingData.serviceId);

    const updateBookingData = (updates: Partial<typeof bookingData>) => {
        if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
            updates.serviceId = "";
            updates.duration = "";
        }
        if (updates.serviceId) {
            const service = allServices.find(s => s.id === updates.serviceId);
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

        if (!bookingData.dob || bookingData.dob === "__future__") {
            newErrors.dob = "Please select a correct date of birth. Future dates are not allowed.";
        }

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

    const verifyWithRetry = async (
        orderId: string,
        retries = 5,
        delay = 2500
    ): Promise<{ data: { success: boolean;[key: string]: unknown } } | null> => {
        for (let i = 0; i < retries; i++) {
            try {
                console.log(`Verify attempt ${i + 1} for order: ${orderId}`);
                const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
                if (verifyRes.data?.success) {
                    console.log(`Verification succeeded on attempt ${i + 1}`);
                    return verifyRes;
                }
                console.log(`Attempt ${i + 1} status not SUCCESS yet:`, verifyRes.data?.statuses);
            } catch (err) {
                console.error(`Verify attempt ${i + 1} threw error:`, err);
            }
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        return null;
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

            await sendLeadToCRM({
                name: bookingData.name,
                phone: bookingData.phone,
                email: bookingData.email || "",
                source: "Website Booking Form",
                tags: [
                    "Booking Form",
                    selectedService?.title || "",
                    bookingData.consultationType || "",
                    bookingData.selectedDate
                        ? `Preferred Date: ${format(bookingData.selectedDate, "yyyy-MM-dd")}`
                        : "",
                    bookingData.selectedTime
                        ? `Preferred Time: ${bookingData.selectedTime}`
                        : "",
                ].filter(Boolean),
            });

            const res = await axios.post(`${API_BASE_URL}/payment`, {
                amount: Number(selectedService?.price),
                customer_name: bookingData.name,
                customer_phone: bookingData.phone,
                customer_email: bookingData.email || "customer@example.com",
            });

            if (!res.data || !res.data.payment_session_id) {
                toast({ title: "Error", description: "Failed to initialize payment session.", variant: "destructive" });
                setIsProcessingPayment(false);
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const checkoutResult: any = await cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal",
            });

            if (checkoutResult?.error) {
                console.error("Cashfree checkout error:", checkoutResult.error);
                setPaymentResult({
                    success: false,
                    message: checkoutResult.error.message || "Payment was not completed. Please try again."
                });
                setIsProcessingPayment(false);
                return;
            }

            const verifyRes = await verifyWithRetry(res.data.order_id, 5, 2500);

            if (verifyRes && verifyRes.data?.success) {
                try {
                    const formattedDate = bookingData.selectedDate
                        ? format(bookingData.selectedDate, "yyyy-MM-dd")
                        : null;
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { floorPlan, ...cleanBookingData } = bookingData;
                    await axios.post(`${API_BASE_URL}/dataslotbooked`, {
                        ...cleanBookingData,
                        selectedDate: formattedDate,
                        orderId: res.data.order_id,
                        paymentSessionId: res.data.payment_session_id,
                        amount: Number(selectedService?.price),
                        serviceName: selectedService?.title
                    });
                } catch (bookingError) {
                    console.error("Failed to save booking details:", bookingError);
                }

                setPaymentResult(verifyRes.data);
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
                    message: `We couldn't verify your payment automatically. If your money was deducted, please contact support with Order ID: ${res.data.order_id}`
                });
            }
        } catch (error) {
            console.error("Payment flow error:", error);
            toast({
                title: "Payment Error",
                description: "An error occurred while processing your payment. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsProcessingPayment(false);
        }
    };

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
                                bookingServices={activeServices}
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