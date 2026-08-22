

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Sparkles, User, MapPin, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import { BookingDetailsStep }   from "./steps/BookingDetailsStep";
import { BookingSlotStep }      from "./steps/BookingSlotStep";
import { BookingStatusScreen }  from "./steps/BookingStatusScreen";
import { sendLeadToCRM }        from "@/lib/sendLeadToCRM";
import { QuickServiceBookingTab, type QuickServiceFormData } from "./QuickServiceBookingTab";
import { quickServices }        from "@/data/quickServices";

// ── NEW CONSULTATION SERVICES ─────────────────────────────────────────────────
const newBookingServices = [
    {
        id: "astrology-exact-birth-time",
        title: "Astrology - (Exact Birth Time Known)",
        description: "Individual consultation (phone/video) — Exact Birth Time Known · 30 minutes",
        price: 21000,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-no-exact-birth-time",
        title: "Astrology - (Exact Birth Time NOT Known)",
        description: "Individual consultation (phone/video) — Exact Birth Time NOT Known · 60 minutes",
        price: 31000,
        duration: "60",
        icon: Sparkles,
    },
    {
        id: "astrology-in-person",
        title: "Astrology - In-Person (Mumbai Only)",
        description: "Individual consultation (in-person) in Mumbai only · 60 minutes",
        price: 31000,
        duration: "60",
        icon: Sparkles,
    },
    {
        id: "numerology",
        title: "Numerology Analysis",
        description: "Individual consultation (phone/video) · 30 minutes",
        price: 5100,
        duration: "30",
        icon: User,
    },
    {
        id: "vastu",
        title: "Vastu Consultation",
        description: "Home Vastu (Online Inquiry + Recommendations) — No Visit · 30 minutes",
        price: 11000,
        duration: "30",
        icon: MapPin,
    },
];

// ── REPEAT / FOLLOW-UP CONSULTATION SERVICES ──────────────────────────────────
const repeatBookingServices = [
    {
        id: "astrology-repeat-within-10",
        title: "Astrology - Follow-up (within 10 days)",
        description: "Follow-up consultation within 10 days · 30 minutes",
        price: 3100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-repeat-10-to-30",
        title: "Astrology - Follow-up (11–30 days)",
        description: "Follow-up consultation from 11 days till 30 days · 30 minutes",
        price: 5100,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-repeat-post-30",
        title: "Astrology - Follow-up (post 30 days)",
        description: "Follow-up consultation post 30 days · 30 minutes",
        price: 11000,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "numerology-repeat-within-10",
        title: "Numerology - Follow-up (within 10 days)",
        description: "Follow-up consultation within 10 days · 30 minutes",
        price: 1100,
        duration: "30",
        icon: User,
    },
    {
        id: "numerology-repeat-11-to-30",
        title: "Numerology - Follow-up (11–30 days)",
        description: "Follow-up consultation from 11 days till 30 days · 30 minutes",
        price: 2100,
        duration: "30",
        icon: User,
    },
    {
        id: "numerology-repeat-post-30",
        title: "Numerology - Follow-up (post 30 days)",
        description: "Follow-up consultation post 30 days · 30 minutes",
        price: 3100,
        duration: "30",
        icon: User,
    },
];

const durations = [
    { label: "30 Minutes", value: "30" },
    { label: "1 Hour",     value: "60" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type TabType = "new" | "repeat" | "quickservice";

export const BookingProcess = () => {
    const getInitialTab = (): TabType => {
        if (typeof window !== "undefined" && window.location.hash === "#quickservice") {
            return "quickservice";
        }
        return "new";
    };

    const [activeTab, setActiveTab]           = useState<TabType>(getInitialTab);
    const [bookingStep, setBookingStep]       = useState<"details" | "slot">("details");
    const [bookingData, setBookingData]       = useState({
        consultationType: "new" as "new" | "repeat",
        name: "",
        email: "",
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
    const [errors, setErrors]                 = useState<Record<string, string>>({});
    const [quickServiceData, setQuickServiceData] = useState<QuickServiceFormData | null>(null);
    const [quickServiceStep, setQuickServiceStep] = useState<"details" | "slot">("details");
    const [cashfree, setCashfree]             = useState<any>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentResult, setPaymentResult]   = useState<any>(null);

    const { toast }    = useToast();
    const bookingRef   = useRef<HTMLDivElement>(null);

    const selectedQuickService = quickServiceData?.serviceId
        ? quickServices.find((s: any) => s.id === quickServiceData.serviceId)
        : null;

    // ── hash listener ────────────────────────────────────────────
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === "#quickservice") {
                setActiveTab("quickservice");
                setPaymentResult(null);
                setBookingStep("details");
                setQuickServiceStep("details");
                setQuickServiceData(null);
                setErrors({});
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // ── Cashfree SDK init ────────────────────────────────────────
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
            const offsetPosition  = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const selectedService = [...newBookingServices, ...repeatBookingServices].find(
        (s) => s.id === bookingData.serviceId
    );

    const updateBookingData = (updates: Partial<typeof bookingData>) => {
        if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
            updates.serviceId = "";
            updates.duration  = "";
        }
        if (updates.serviceId) {
            const service = [...newBookingServices, ...repeatBookingServices].find(
                (s) => s.id === updates.serviceId
            );
            if (service && "duration" in service && service.duration) {
                updates.duration = service.duration;
            }
        }
        setBookingData((prev) => ({ ...prev, ...updates }));
        const updatedFields = Object.keys(updates);
        if (updatedFields.length > 0) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                updatedFields.forEach((field) => delete newErrors[field]);
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
        if (!bookingData.selectedDate || !bookingData.selectedTime)
            newErrors.slot = "Please select a date and time slot";
        if (!bookingData.gender) newErrors.gender = "Please select gender";
        if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";
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
                variant: "destructive",
            });
        }
    };

    const handleBackStep = () => {
        setBookingStep("details");
        setErrors({});
        setTimeout(scrollToBooking, 100);
    };

    const handleQuickServiceNext = (data: QuickServiceFormData) => {
        setQuickServiceData(data);
        setQuickServiceStep("slot");
        setTimeout(scrollToBooking, 100);
    };

    const handleQuickServiceBack = () => {
        setQuickServiceStep("details");
        setTimeout(scrollToBooking, 100);
    };

    const verifyWithRetry = async (orderId: string, retries = 5, delay = 2500) => {
        for (let i = 0; i < retries; i++) {
            try {
                const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
                if (verifyRes.data?.success) return verifyRes;
            } catch (err) {}
            if (i < retries - 1) await new Promise((resolve) => setTimeout(resolve, delay));
        }
        return null;
    };

    // ── Standard booking payment ──────────────────────────────────
    const handlePay = async () => {
        if (!validateStep2()) {
            toast({ title: "Missing Information", description: "Please complete all required fields.", variant: "destructive" });
            return;
        }
        if (!cashfree) {
            toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
            return;
        }
        setIsProcessingPayment(true);
        try {
            await sendLeadToCRM({
                name:   bookingData.name,
                phone:  bookingData.phone,
                email:  bookingData.email || "",
                source: "Website Booking Form",
                tags:   [selectedService?.title || "", bookingData.consultationType || ""].filter(Boolean),
            });
            const res = await axios.post(`${API_BASE_URL}/payment`, {
                amount:         Number(selectedService?.price),
                customer_name:  bookingData.name,
                customer_phone: bookingData.phone,
                customer_email: bookingData.email || "customer@example.com",
            });
            if (!res.data?.payment_session_id) {
                setPaymentResult({ success: false, message: "Could not create a payment session. Please try again." });
                return;
            }
            const checkoutResult = await cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal",
            });
            if (checkoutResult?.error) {
                setPaymentResult({ success: false, message: checkoutResult.error.message || "Payment was not completed. Please try again." });
                return;
            }
            const verifyRes = await verifyWithRetry(res.data.order_id);
            if (verifyRes?.data?.success) {
                // Save booking data
                try {
                    const formattedDate = bookingData.selectedDate
                        ? format(bookingData.selectedDate, "yyyy-MM-dd")
                        : null;
                    const { floorPlan, ...cleanBookingData } = bookingData;
                    await axios.post(`${API_BASE_URL}/dataslotbooked`, {
                        ...cleanBookingData,
                        selectedDate:     formattedDate,
                        orderId:          res.data.order_id,
                        paymentSessionId: res.data.payment_session_id,
                        amount:           Number(selectedService?.price),
                        serviceName:      selectedService?.title,
                    });
                } catch (bookingError) {
                    console.error("Failed to save booking details:", bookingError);
                }
                setPaymentResult(verifyRes.data);
                setBookingStep("details");
            } else {
                setPaymentResult({ success: false, message: "Payment verification failed. Please contact support." });
            }
        } catch (error: any) {
            console.error("Payment error:", error);
            setPaymentResult({ success: false, message: error?.message || "Something went wrong. Please try again." });
        } finally {
            setIsProcessingPayment(false);
        }
    };

    // ── Quick Service payment ─────────────────────────────────────
    const handleQuickServicePay = async () => {
        if (!quickServiceData || !selectedQuickService) {
            toast({ title: "Missing Information", description: "Please complete the form first.", variant: "destructive" });
            return;
        }
        if (!cashfree) {
            toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
            return;
        }
        setIsProcessingPayment(true);
        try {
            await sendLeadToCRM({
                name:   quickServiceData.fullName,
                phone:  quickServiceData.phone,
                email:  quickServiceData.email || "",
                source: "Quick Service Booking",
                tags:   ["Quick Service", selectedQuickService.title].filter(Boolean),
            });

            const res = await axios.post(`${API_BASE_URL}/payment`, {
                amount:         Number(selectedQuickService.price),
                customer_name:  quickServiceData.fullName,
                customer_phone: quickServiceData.phone,
                customer_email: quickServiceData.email || "customer@example.com",
            });

            if (!res.data?.payment_session_id) {
                setPaymentResult({ success: false, message: "Could not create a payment session. Please try again." });
                return;
            }

            const checkoutResult = await cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal",
            });

            if (checkoutResult?.error) {
                setPaymentResult({ success: false, message: checkoutResult.error.message || "Payment was not completed. Please try again." });
                return;
            }

            const verifyRes = await verifyWithRetry(res.data.order_id);

            if (verifyRes?.data?.success) {
                // ✅ FIX: Save quick service order to backend — triggers WhatsApp + CRM
                // Now includes placeOfBirth and timeOfBirth from updated QuickServiceFormData
                try {
                    await axios.post(`${API_BASE_URL}/quick-service-order`, {
                        serviceId:        quickServiceData.serviceId,
                        serviceTitle:     selectedQuickService.title,
                        price:            Number(selectedQuickService.price),
                        deliveryTime:     selectedQuickService.deliveryTime,
                        fullName:         quickServiceData.fullName,
                        dob:              quickServiceData.dob,
                        timeOfBirth:      quickServiceData.timeOfBirth,   // ✅ FIX
                        placeOfBirth:     quickServiceData.placeOfBirth,  // ✅ FIX
                        question:         quickServiceData.question,
                        phone:            quickServiceData.phone,
                        email:            quickServiceData.email,
                        orderId:          res.data.order_id,
                        paymentSessionId: res.data.payment_session_id,
                    });
                } catch (orderError) {
                    console.error("Failed to save quick service order:", orderError);
                }

                setPaymentResult(verifyRes.data);
                setQuickServiceData(null);
                setQuickServiceStep("details");
            } else {
                setPaymentResult({
                    success: false,
                    message: `Couldn't verify payment. Contact support with Order ID: ${res.data.order_id}`,
                });
            }
        } catch (error: any) {
            console.error("Quick service payment error:", error);
            setPaymentResult({ success: false, message: error?.message || "Something went wrong. Please try again." });
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const resetPaymentState = () => {
        setPaymentResult(null);
        setBookingStep("details");
        setQuickServiceStep("details");
        setQuickServiceData(null);
    };

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setPaymentResult(null);
        setBookingStep("details");
        setQuickServiceStep("details");
        setQuickServiceData(null);
        setErrors({});
        if (tab === "new" || tab === "repeat") {
            setBookingData((prev) => ({
                ...prev,
                consultationType: tab,
                serviceId: tab === "new" ? "astrology-exact-birth-time" : "",
                duration:  tab === "new" ? "30" : "",
            }));
        }
    };

    const isQuickServiceActive = activeTab === "quickservice";
    const currentStep          = isQuickServiceActive ? quickServiceStep : bookingStep;
    const showPaymentResult    = paymentResult !== null;

    return (
        <div ref={bookingRef} className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    Book Your <span className="text-gradient-gold">Consultation</span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
            </div>

            <div className="bg-gradient-to-br from-background via-background/95 to-primary/5 rounded-2xl border border-primary/20 p-4 md:p-6 shadow-xl">

                {/* ── Tab bar ─────────────────────────────────────── */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 pb-3 border-b border-primary/20">
                    {[
                        { id: "new",          label: "✨ New Consultation"      },
                        { id: "repeat",       label: "🔄 Follow-up Consultation" },
                        { id: "quickservice", label: "⚡ Quick Service"          },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as TabType)}
                            className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Step indicator — New / Repeat ────────────────── */}
                {!isQuickServiceActive && !showPaymentResult && currentStep === "slot" && (
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
                            <span className="text-xs text-muted-foreground ml-1">Basic Info</span>
                        </div>
                        <div className="w-12 h-px bg-primary/30" />
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                            <span className="text-xs text-primary ml-1 font-medium">Select Slot & Pay</span>
                        </div>
                    </div>
                )}

                {/* ── Step indicator — Quick Service ───────────────── */}
                {isQuickServiceActive && !showPaymentResult && quickServiceStep === "slot" && (
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
                            <span className="text-xs text-muted-foreground ml-1">Details</span>
                        </div>
                        <div className="w-12 h-px bg-primary/30" />
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                            <span className="text-xs text-primary ml-1 font-medium">Review & Pay</span>
                        </div>
                    </div>
                )}

                {/* ── Content ─────────────────────────────────────── */}
                {showPaymentResult ? (
                    <BookingStatusScreen
                        paymentResult={paymentResult}
                        selectedService={isQuickServiceActive ? selectedQuickService : selectedService}
                        bookingData={
                            isQuickServiceActive
                                ? { name: quickServiceData?.fullName, phone: quickServiceData?.phone, email: quickServiceData?.email }
                                : bookingData
                        }
                        onReset={resetPaymentState}
                        onTryAgain={() => setPaymentResult(null)}
                    />
                ) : (
                    <>
                        {/* ── Quick Service tab ──────────────────────── */}
                        {activeTab === "quickservice" &&
                            (quickServiceStep === "details" ? (
                                <QuickServiceBookingTab onNext={handleQuickServiceNext} />
                            ) : (
                                <div className="space-y-5">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 pb-2 border-b border-primary/20">
                                            <Zap className="w-5 h-5 text-primary" />
                                            <h3 className="font-bold text-lg">Review Your Request</h3>
                                        </div>

                                        {/* ✅ FIX: review grid now shows placeOfBirth + timeOfBirth */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-primary/5 p-4 rounded-xl">
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="text-muted-foreground">Name:</span>{" "}
                                                    <span className="font-medium">{quickServiceData?.fullName}</span>
                                                </p>
                                                <p>
                                                    <span className="text-muted-foreground">Email:</span>{" "}
                                                    <span className="font-medium">{quickServiceData?.email || "—"}</span>
                                                </p>
                                                <p>
                                                    <span className="text-muted-foreground">Phone:</span>{" "}
                                                    <span className="font-medium">+91 {quickServiceData?.phone}</span>
                                                </p>
                                                {quickServiceData?.dob && (
                                                    <p>
                                                        <span className="text-muted-foreground">DOB:</span>{" "}
                                                        <span className="font-medium">{quickServiceData.dob}</span>
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="text-muted-foreground">Service:</span>{" "}
                                                    <span className="font-medium text-primary">{selectedQuickService?.title}</span>
                                                </p>
                                                <p>
                                                    <span className="text-muted-foreground">Delivery:</span>{" "}
                                                    <span className="font-medium">{selectedQuickService?.deliveryTime}</span>
                                                </p>
                                                {/* ✅ FIX: placeOfBirth shown in review */}
                                                {quickServiceData?.placeOfBirth && (
                                                    <p>
                                                        <span className="text-muted-foreground">Place of Birth:</span>{" "}
                                                        <span className="font-medium">{quickServiceData.placeOfBirth}</span>
                                                    </p>
                                                )}
                                                {/* ✅ FIX: timeOfBirth shown in review */}
                                                {quickServiceData?.timeOfBirth && (
                                                    <p>
                                                        <span className="text-muted-foreground">Time of Birth:</span>{" "}
                                                        <span className="font-medium">{quickServiceData.timeOfBirth}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                                            <p className="text-muted-foreground text-xs mb-1">Your Question:</p>
                                            <p className="text-sm italic">"{quickServiceData?.question}"</p>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl border border-primary/20">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Total Amount</p>
                                                <p className="text-2xl font-bold text-primary">
                                                    ₹{selectedQuickService?.price?.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">Incl. all taxes</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-between pt-2">
                                        <button
                                            onClick={handleQuickServiceBack}
                                            className="px-6 py-2.5 rounded-xl border border-primary/20 text-sm font-medium hover:bg-primary/5 transition-colors"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={handleQuickServicePay}
                                            disabled={isProcessingPayment}
                                            className="px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isProcessingPayment ? (
                                                <>
                                                    Processing...{" "}
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                </>
                                            ) : (
                                                <>Pay ₹{selectedQuickService?.price?.toLocaleString("en-IN")} →</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}

                        {/* ── New / Repeat tab ───────────────────────── */}
                        {activeTab !== "quickservice" &&
                            (currentStep === "details" ? (
                                <BookingDetailsStep
                                    bookingData={{ ...bookingData, consultationType: activeTab as "new" | "repeat" }}
                                    updateBookingData={updateBookingData}
                                    errors={errors}
                                    bookingServices={activeTab === "new" ? newBookingServices : repeatBookingServices}
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
                            ))}
                    </>
                )}
            </div>
        </div>
    );
};



