

// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Sparkles, User, MapPin, UserCheck, CheckCircle2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { format } from "date-fns";

// // Sub-components
// import { BookingDetailsStep } from "./steps/BookingDetailsStep";
// import { BookingSlotStep } from "./steps/BookingSlotStep";
// import { BookingStatusScreen } from "./steps/BookingStatusScreen";
// import { sendLeadToCRM } from "@/lib/sendLeadToCRM";

// const newBookingServices = [
//     {
//         id: "astrology-exact-birth-time",
//         title: "Astrology - (Exact Birth Time Known)",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-no-exact-birth-time",
//         title: "Astrology - (Exact Birth Time NOT Known)",
//         description: "Individual consultation (phone/video) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-in-person",
//         title: "Astrology - In-Person (Mumbai Only)",
//         description: "Individual consultation (in-person) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     // {
//     //     id: "premium-kundli",
//     //     title: "Premium Kundli",
//     //     description: "Detailed life analysis and comprehensive horoscope report",
//     //     price: 2100,
//     //     icon: UserCheck,
//     // },
//     {
//         id: "numerology",
//         title: "Numerology Analysis",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 3100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "vastu ",
//         title: "Vastu Consultation",
//         // ── Row 4: Updated Vastu description text
//         description: "Vastu Exploration Call - INR 5100 | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: MapPin,
//     }
// ];

// const repeatBookingServices = [
//     {
//         id: "astrology-repeat-within-10",
//         title: "Astrology - Follow-up (within 10 days)",
//         description: "Follow-up consultation (within 10 days) - 30 Minutes",
//         price: 2100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-10-to-30",
//         title: "Astrology - Follow-up (11-30 days)",
//         description: "Follow-up consultation (after 10 days till 30 days) - 30 Minutes",
//         price: 3100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-post-30",
//         title: "Astrology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology-repeat-within-10",
//         title: "Numerology - Follow-up (within 10 days)",
//         description: "Individual consultation (phone/video) - (within 10 days) - 30 minutes",
//         price: 1100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "numerology-repeat-11-to-30",
//         title: "Numerology - Follow-up (11-30 days)",
//         description: "Individual consultation (phone/video) - (between 11 to 30 days) - 30 minutes",
//         price: 2100,
//         duration: "30",
//         icon: User,
//     },
//        {
//         id: "numerology-repeat-post-30",
//         title: "Numerology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
// ];

// const durations = [
//     { label: "30 Minutes", value: "30" },
//     { label: "1 Hour", value: "60" },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// export const BookingProcess = () => {
//     const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
//     const [bookingData, setBookingData] = useState({
//         consultationType: "new" as "new" | "repeat",
//         name: "",
//         email: "",
//         // ── Row 13: dob starts empty; will only be set via date-picker, never by manual typing
//         dob: "",
//         phone: "",
//         serviceId: "astrology-exact-birth-time",
//         duration: "30" as string,
//         gender: "",
//         place: "",
//         concern: "",
//         areaDimension: "",
//         floorPlan: null as File | null,
//         propertyLocation: "",
//         timeOfBirth: "",
//         selectedDate: undefined as Date | undefined,
//         selectedTime: null as string | null,
//     });
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     const [cashfree, setCashfree] = useState<{
//         checkout: (options: {
//             paymentSessionId: string;
//             redirectTarget: string;
//         }) => Promise<unknown>;
//     } | null>(null);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [paymentResult, setPaymentResult] = useState<{
//         success: boolean;
//         order_id?: string;
//         amount?: number;
//         message?: string;
//         [key: string]: unknown;
//     } | null>(null);

//     const { toast } = useToast();
//     const bookingRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const initSDK = async () => {
//             try {
//                 const cf = await load({ mode: "production" });
//                 setCashfree(cf);
//             } catch (error) {
//                 console.error("Failed to initialize Cashfree SDK", error);
//             }
//         };
//         initSDK();
//     }, []);

//     const scrollToBooking = () => {
//         if (bookingRef.current) {
//             const offset = 100;
//             const elementPosition = bookingRef.current.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;
//             window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         }
//     };

//     const activeServices = bookingData.consultationType === "repeat" ? repeatBookingServices : newBookingServices;
//     const allServices = [...newBookingServices, ...repeatBookingServices];
//     const selectedService = allServices.find(s => s.id === bookingData.serviceId);

//     const updateBookingData = (updates: Partial<typeof bookingData>) => {
//         if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
//             updates.serviceId = "";
//             updates.duration = "";
//         }
//         if (updates.serviceId) {
//             const service = allServices.find(s => s.id === updates.serviceId);
//             if (service && 'duration' in service && service.duration) {
//                 updates.duration = service.duration;
//             }
//         }
//         setBookingData(prev => ({ ...prev, ...updates }));
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length > 0) {
//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 updatedFields.forEach(field => delete newErrors[field]);
//                 if (updatedFields.includes("selectedDate") || updatedFields.includes("selectedTime")) {
//                     delete newErrors.slot;
//                 }
//                 return newErrors;
//             });
//         }
//     };

//     const validateStep1 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.name.trim()) newErrors.name = "Full name is required";
//         else if (bookingData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

//         if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
//             newErrors.email = "Invalid email format";
//         }

//         if (!bookingData.dob || bookingData.dob === "__future__") {
//             newErrors.dob = "Please select a correct date of birth. Future dates are not allowed.";
//         }

//         if (!bookingData.phone) newErrors.phone = "Phone number is required";
//         else if (!/^\d{10}$/.test(bookingData.phone)) newErrors.phone = "Phone number must be 10 digits";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const validateStep2 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
//         if (!bookingData.selectedDate || !bookingData.selectedTime) newErrors.slot = "Please select a date and time slot";
//         if (!bookingData.gender) newErrors.gender = "Please select gender";
//         if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";

//         const astrologyServices = ["astrology-exact-birth-time", "astrology-no-exact-birth-time", "astrology-in-person"];
//         if ((astrologyServices.includes(bookingData.serviceId) || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && !bookingData.timeOfBirth) {
//             newErrors.timeOfBirth = "Time of birth is required";
//         }

//         if (bookingData.serviceId === "vastu") {
//             if (!bookingData.areaDimension.trim()) newErrors.areaDimension = "Area dimension is required";
//             if (!bookingData.propertyLocation.trim()) newErrors.propertyLocation = "Property location is required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleNextStep = () => {
//         if (validateStep1()) {
//             setBookingStep("slot");
//             setTimeout(scrollToBooking, 100);
//         } else {
//             toast({
//                 title: "Validation Error",
//                 description: "Please check the highlighted fields and try again.",
//                 variant: "destructive"
//             });
//         }
//     };

//     const handleBackStep = () => {
//         setBookingStep("details");
//         setErrors({});
//         setTimeout(scrollToBooking, 100);
//     };

//     const verifyWithRetry = async (
//         orderId: string,
//         retries = 5,
//         delay = 2500
//     ): Promise<{ data: { success: boolean;[key: string]: unknown } } | null> => {
//         for (let i = 0; i < retries; i++) {
//             try {
//                 console.log(`Verify attempt ${i + 1} for order: ${orderId}`);
//                 const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
//                 if (verifyRes.data?.success) {
//                     console.log(`Verification succeeded on attempt ${i + 1}`);
//                     return verifyRes;
//                 }
//                 console.log(`Attempt ${i + 1} status not SUCCESS yet:`, verifyRes.data?.statuses);
//             } catch (err) {
//                 console.error(`Verify attempt ${i + 1} threw error:`, err);
//             }
//             if (i < retries - 1) {
//                 await new Promise(resolve => setTimeout(resolve, delay));
//             }
//         }
//         return null;
//     };

//     const handlePay = async () => {
//         if (!validateStep2()) {
//             toast({
//                 title: "Missing Information",
//                 description: "Please complete all required fields and select a slot.",
//                 variant: "destructive"
//             });
//             return;
//         }
//         if (!cashfree) {
//             toast({
//                 title: "System Error",
//                 description: "Payment system is not initialized. Please try again later.",
//                 variant: "destructive"
//             });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {

//             await sendLeadToCRM({
//                 name: bookingData.name,
//                 phone: bookingData.phone,
//                 email: bookingData.email || "",
//                 source: "Website Booking Form",
//                 tags: [
//                     "Booking Form",
//                     selectedService?.title || "",
//                     bookingData.consultationType || "",
//                     bookingData.selectedDate
//                         ? `Preferred Date: ${format(bookingData.selectedDate, "yyyy-MM-dd")}`
//                         : "",
//                     bookingData.selectedTime
//                         ? `Preferred Time: ${bookingData.selectedTime}`
//                         : "",
//                 ].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedService?.price),
//                 customer_name: bookingData.name,
//                 customer_phone: bookingData.phone,
//                 customer_email: bookingData.email || "customer@example.com",
//             });

//             if (!res.data || !res.data.payment_session_id) {
//                 toast({ title: "Error", description: "Failed to initialize payment session.", variant: "destructive" });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const checkoutResult: any = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) {
//                 console.error("Cashfree checkout error:", checkoutResult.error);
//                 setPaymentResult({
//                     success: false,
//                     message: checkoutResult.error.message || "Payment was not completed. Please try again."
//                 });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             const verifyRes = await verifyWithRetry(res.data.order_id, 5, 2500);

//             if (verifyRes && verifyRes.data?.success) {
//                 try {
//                     const formattedDate = bookingData.selectedDate
//                         ? format(bookingData.selectedDate, "yyyy-MM-dd")
//                         : null;
//                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//                     const { floorPlan, ...cleanBookingData } = bookingData;
//                     await axios.post(`${API_BASE_URL}/dataslotbooked`, {
//                         ...cleanBookingData,
//                         selectedDate: formattedDate,
//                         orderId: res.data.order_id,
//                         paymentSessionId: res.data.payment_session_id,
//                         amount: Number(selectedService?.price),
//                         serviceName: selectedService?.title
//                     });
//                 } catch (bookingError) {
//                     console.error("Failed to save booking details:", bookingError);
//                 }

//                 setPaymentResult(verifyRes.data);
//                 setBookingData(prev => ({
//                     ...prev,
//                     selectedDate: undefined,
//                     selectedTime: null,
//                     concern: "",
//                     duration: ""
//                 }));
//             } else {
//                 setPaymentResult({
//                     success: false,
//                     message: `We couldn't verify your payment automatically. If your money was deducted, please contact support with Order ID: ${res.data.order_id}`
//                 });
//             }
//         } catch (error) {
//             console.error("Payment flow error:", error);
//             toast({
//                 title: "Payment Error",
//                 description: "An error occurred while processing your payment. Please try again.",
//                 variant: "destructive"
//             });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     return (
//         <div ref={bookingRef} className="w-full max-w-5xl mx-auto">
//             <div className="flex flex-col items-center mb-1 md:mb-2">
//                 <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 text-center">
//                     Book Your <span className="text-gradient-gold">Consultation</span>
//                 </h2>
//                 <div className="w-16 h-1 bg-primary rounded-full mb-2 md:mb-4" />

//                 {/* Step Progress Bar */}
//                 <div className="flex items-center justify-center w-full max-w-sm mx-auto relative mb-8 md:mb-10">
//                     <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
//                     {[
//                         { id: "details", label: "Basic Info" },
//                         { id: "slot", label: "Select Slot & Pay" }
//                     ].map((step, i) => (
//                         <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${bookingStep === step.id || (bookingStep === "slot" && i === 0)
//                                 ? "bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110"
//                                 : "bg-background border-muted text-muted-foreground"
//                                 }`}>
//                                 {bookingStep === "slot" && i === 0 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
//                             </div>
//                             <span className={`text-[10px] sm:text-xs mt-2 font-semibold transition-colors duration-300 ${bookingStep === step.id ? "text-primary" : "text-muted-foreground"}`}>
//                                 {step.label}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="cosmic-card p-2 md:p-6 lg:p-6 bg-muted/30 backdrop-blur-sm">
//                 {paymentResult ? (
//                     <BookingStatusScreen
//                         paymentResult={paymentResult}
//                         selectedService={selectedService}
//                         bookingData={bookingData}
//                         onReset={() => {
//                             setPaymentResult(null);
//                             setBookingStep("details");
//                         }}
//                         onTryAgain={() => setPaymentResult(null)}
//                     />
//                 ) : (
//                     <>
//                         {bookingStep === "details" ? (
//                             <BookingDetailsStep
//                                 bookingData={bookingData}
//                                 updateBookingData={updateBookingData}
//                                 errors={errors}
//                                 bookingServices={activeServices}
//                                 onNext={handleNextStep}
//                             />
//                         ) : (
//                             <BookingSlotStep
//                                 bookingData={bookingData}
//                                 updateBookingData={updateBookingData}
//                                 errors={errors}
//                                 durations={durations}
//                                 selectedService={selectedService}
//                                 isProcessingPayment={isProcessingPayment}
//                                 onBack={handleBackStep}
//                                 onPay={handlePay}
//                             />
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };






//testing 




// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Sparkles, User, MapPin, UserCheck, CheckCircle2, Zap } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { format } from "date-fns";

// // Sub-components
// import { BookingDetailsStep } from "./steps/BookingDetailsStep";
// import { BookingSlotStep } from "./steps/BookingSlotStep";
// import { BookingStatusScreen } from "./steps/BookingStatusScreen";
// import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
// import { QuickServiceBookingTab, type QuickServiceFormData } from "./QuickServiceBookingTab";
// import { quickServices } from "@/data/quickServices";

// const newBookingServices = [
//     {
//         id: "astrology-exact-birth-time",
//         title: "Astrology - (Exact Birth Time Known)",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-no-exact-birth-time",
//         title: "Astrology - (Exact Birth Time NOT Known)",
//         description: "Individual consultation (phone/video) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-in-person",
//         title: "Astrology - In-Person (Mumbai Only)",
//         description: "Individual consultation (in-person) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology",
//         title: "Numerology Analysis",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 3100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "vastu ",
//         title: "Vastu Consultation",
//         description: "Vastu Exploration Call - INR 5100 | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: MapPin,
//     }
// ];

// const repeatBookingServices = [
//     {
//         id: "astrology-repeat-within-10",
//         title: "Astrology - Follow-up (within 10 days)",
//         description: "Follow-up consultation (within 10 days) - 30 Minutes",
//         price: 2100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-10-to-30",
//         title: "Astrology - Follow-up (11-30 days)",
//         description: "Follow-up consultation (after 10 days till 30 days) - 30 Minutes",
//         price: 3100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-post-30",
//         title: "Astrology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology-repeat-within-10",
//         title: "Numerology - Follow-up (within 10 days)",
//         description: "Individual consultation (phone/video) - (within 10 days) - 30 minutes",
//         price: 1100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "numerology-repeat-11-to-30",
//         title: "Numerology - Follow-up (11-30 days)",
//         description: "Individual consultation (phone/video) - (between 11 to 30 days) - 30 minutes",
//         price: 2100,
//         duration: "30",
//         icon: User,
//     },
//        {
//         id: "numerology-repeat-post-30",
//         title: "Numerology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
// ];

// const durations = [
//     { label: "30 Minutes", value: "30" },
//     { label: "1 Hour", value: "60" },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// // Tab types
// type TabType = "new" | "repeat" | "quickservice";

// export const BookingProcess = () => {
//     // Tab state
//     const [activeTab, setActiveTab] = useState<TabType>("new");
    
//     // Consultation booking state (for new & repeat)
//     const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
//     const [bookingData, setBookingData] = useState({
//         consultationType: "new" as "new" | "repeat",
//         name: "",
//         email: "",
//         dob: "",
//         phone: "",
//         serviceId: "astrology-exact-birth-time",
//         duration: "30" as string,
//         gender: "",
//         place: "",
//         concern: "",
//         areaDimension: "",
//         floorPlan: null as File | null,
//         propertyLocation: "",
//         timeOfBirth: "",
//         selectedDate: undefined as Date | undefined,
//         selectedTime: null as string | null,
//     });
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     // Quick Service state
//     const [quickServiceData, setQuickServiceData] = useState<QuickServiceFormData | null>(null);
//     const [quickServiceStep, setQuickServiceStep] = useState<"details" | "slot">("details");

//     // Payment states
//     const [cashfree, setCashfree] = useState<{
//         checkout: (options: {
//             paymentSessionId: string;
//             redirectTarget: string;
//         }) => Promise<unknown>;
//     } | null>(null);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [paymentResult, setPaymentResult] = useState<{
//         success: boolean;
//         order_id?: string;
//         amount?: number;
//         message?: string;
//         [key: string]: unknown;
//     } | null>(null);

//     const { toast } = useToast();
//     const bookingRef = useRef<HTMLDivElement>(null);
    
//     // Get selected quick service details
//     const selectedQuickService = quickServiceData?.serviceId 
//         ? quickServices.find((s: any) => s.id === quickServiceData.serviceId)
//         : null;

//     useEffect(() => {
//         const initSDK = async () => {
//             try {
//                 const cf = await load({ mode: "production" });
//                 setCashfree(cf);
//             } catch (error) {
//                 console.error("Failed to initialize Cashfree SDK", error);
//             }
//         };
//         initSDK();
//     }, []);

//     const scrollToBooking = () => {
//         if (bookingRef.current) {
//             const offset = 100;
//             const elementPosition = bookingRef.current.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;
//             window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         }
//     };

//     const activeServices = bookingData.consultationType === "repeat" ? repeatBookingServices : newBookingServices;
//     const allServices = [...newBookingServices, ...repeatBookingServices];
//     const selectedService = allServices.find(s => s.id === bookingData.serviceId);

//     const updateBookingData = (updates: Partial<typeof bookingData>) => {
//         if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
//             updates.serviceId = "";
//             updates.duration = "";
//         }
//         if (updates.serviceId) {
//             const service = allServices.find(s => s.id === updates.serviceId);
//             if (service && 'duration' in service && service.duration) {
//                 updates.duration = service.duration;
//             }
//         }
//         setBookingData(prev => ({ ...prev, ...updates }));
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length > 0) {
//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 updatedFields.forEach(field => delete newErrors[field]);
//                 if (updatedFields.includes("selectedDate") || updatedFields.includes("selectedTime")) {
//                     delete newErrors.slot;
//                 }
//                 return newErrors;
//             });
//         }
//     };

//     const validateStep1 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.name.trim()) newErrors.name = "Full name is required";
//         else if (bookingData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

//         if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
//             newErrors.email = "Invalid email format";
//         }

//         if (!bookingData.dob || bookingData.dob === "__future__") {
//             newErrors.dob = "Please select a correct date of birth. Future dates are not allowed.";
//         }

//         if (!bookingData.phone) newErrors.phone = "Phone number is required";
//         else if (!/^\d{10}$/.test(bookingData.phone)) newErrors.phone = "Phone number must be 10 digits";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const validateStep2 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
//         if (!bookingData.selectedDate || !bookingData.selectedTime) newErrors.slot = "Please select a date and time slot";
//         if (!bookingData.gender) newErrors.gender = "Please select gender";
//         if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";

//         const astrologyServices = ["astrology-exact-birth-time", "astrology-no-exact-birth-time", "astrology-in-person"];
//         if ((astrologyServices.includes(bookingData.serviceId) || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && !bookingData.timeOfBirth) {
//             newErrors.timeOfBirth = "Time of birth is required";
//         }

//         if (bookingData.serviceId === "vastu") {
//             if (!bookingData.areaDimension.trim()) newErrors.areaDimension = "Area dimension is required";
//             if (!bookingData.propertyLocation.trim()) newErrors.propertyLocation = "Property location is required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleNextStep = () => {
//         if (validateStep1()) {
//             setBookingStep("slot");
//             setTimeout(scrollToBooking, 100);
//         } else {
//             toast({
//                 title: "Validation Error",
//                 description: "Please check the highlighted fields and try again.",
//                 variant: "destructive"
//             });
//         }
//     };

//     const handleBackStep = () => {
//         setBookingStep("details");
//         setErrors({});
//         setTimeout(scrollToBooking, 100);
//     };

//     // Quick Service handlers
//     const handleQuickServiceNext = (data: QuickServiceFormData) => {
//         setQuickServiceData(data);
//         setQuickServiceStep("slot");
//         setTimeout(scrollToBooking, 100);
//     };

//     const handleQuickServiceBack = () => {
//         setQuickServiceStep("details");
//         setTimeout(scrollToBooking, 100);
//     };

//     const verifyWithRetry = async (
//         orderId: string,
//         retries = 5,
//         delay = 2500
//     ): Promise<{ data: { success: boolean;[key: string]: unknown } } | null> => {
//         for (let i = 0; i < retries; i++) {
//             try {
//                 console.log(`Verify attempt ${i + 1} for order: ${orderId}`);
//                 const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
//                 if (verifyRes.data?.success) {
//                     console.log(`Verification succeeded on attempt ${i + 1}`);
//                     return verifyRes;
//                 }
//                 console.log(`Attempt ${i + 1} status not SUCCESS yet:`, verifyRes.data?.statuses);
//             } catch (err) {
//                 console.error(`Verify attempt ${i + 1} threw error:`, err);
//             }
//             if (i < retries - 1) {
//                 await new Promise(resolve => setTimeout(resolve, delay));
//             }
//         }
//         return null;
//     };

//     // Payment for consultation (new/repeat)
//     const handlePay = async () => {
//         if (!validateStep2()) {
//             toast({
//                 title: "Missing Information",
//                 description: "Please complete all required fields and select a slot.",
//                 variant: "destructive"
//             });
//             return;
//         }
//         if (!cashfree) {
//             toast({
//                 title: "System Error",
//                 description: "Payment system is not initialized. Please try again later.",
//                 variant: "destructive"
//             });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {

//             await sendLeadToCRM({
//                 name: bookingData.name,
//                 phone: bookingData.phone,
//                 email: bookingData.email || "",
//                 source: "Website Booking Form",
//                 tags: [
//                     "Booking Form",
//                     selectedService?.title || "",
//                     bookingData.consultationType || "",
//                     bookingData.selectedDate
//                         ? `Preferred Date: ${format(bookingData.selectedDate, "yyyy-MM-dd")}`
//                         : "",
//                     bookingData.selectedTime
//                         ? `Preferred Time: ${bookingData.selectedTime}`
//                         : "",
//                 ].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedService?.price),
//                 customer_name: bookingData.name,
//                 customer_phone: bookingData.phone,
//                 customer_email: bookingData.email || "customer@example.com",
//             });

//             if (!res.data || !res.data.payment_session_id) {
//                 toast({ title: "Error", description: "Failed to initialize payment session.", variant: "destructive" });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const checkoutResult: any = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) {
//                 console.error("Cashfree checkout error:", checkoutResult.error);
//                 setPaymentResult({
//                     success: false,
//                     message: checkoutResult.error.message || "Payment was not completed. Please try again."
//                 });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             const verifyRes = await verifyWithRetry(res.data.order_id, 5, 2500);

//             if (verifyRes && verifyRes.data?.success) {
//                 try {
//                     const formattedDate = bookingData.selectedDate
//                         ? format(bookingData.selectedDate, "yyyy-MM-dd")
//                         : null;
//                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//                     const { floorPlan, ...cleanBookingData } = bookingData;
//                     await axios.post(`${API_BASE_URL}/dataslotbooked`, {
//                         ...cleanBookingData,
//                         selectedDate: formattedDate,
//                         orderId: res.data.order_id,
//                         paymentSessionId: res.data.payment_session_id,
//                         amount: Number(selectedService?.price),
//                         serviceName: selectedService?.title
//                     });
//                 } catch (bookingError) {
//                     console.error("Failed to save booking details:", bookingError);
//                 }

//                 setPaymentResult(verifyRes.data);
//                 setBookingData(prev => ({
//                     ...prev,
//                     selectedDate: undefined,
//                     selectedTime: null,
//                     concern: "",
//                     duration: ""
//                 }));
//             } else {
//                 setPaymentResult({
//                     success: false,
//                     message: `We couldn't verify your payment automatically. If your money was deducted, please contact support with Order ID: ${res.data.order_id}`
//                 });
//             }
//         } catch (error) {
//             console.error("Payment flow error:", error);
//             toast({
//                 title: "Payment Error",
//                 description: "An error occurred while processing your payment. Please try again.",
//                 variant: "destructive"
//             });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     // Payment for Quick Service
//     const handleQuickServicePay = async () => {
//         if (!quickServiceData || !selectedQuickService) {
//             toast({
//                 title: "Missing Information",
//                 description: "Please complete the quick service form first.",
//                 variant: "destructive"
//             });
//             return;
//         }
//         if (!cashfree) {
//             toast({
//                 title: "System Error",
//                 description: "Payment system is not initialized. Please try again later.",
//                 variant: "destructive"
//             });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {
//             await sendLeadToCRM({
//                 name: quickServiceData.fullName,
//                 phone: quickServiceData.phone,
//                 email: quickServiceData.email || "",
//                 source: "Quick Service Booking",
//                 tags: [
//                     "Quick Service",
//                     selectedQuickService.title,
//                     `Service ID: ${quickServiceData.serviceId}`,
//                     quickServiceData.question ? `Question: ${quickServiceData.question.substring(0, 50)}` : "",
//                 ].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedQuickService.price),
//                 customer_name: quickServiceData.fullName,
//                 customer_phone: quickServiceData.phone,
//                 customer_email: quickServiceData.email || "customer@example.com",
//             });

//             if (!res.data || !res.data.payment_session_id) {
//                 toast({ title: "Error", description: "Failed to initialize payment session.", variant: "destructive" });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             const checkoutResult: any = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) {
//                 console.error("Cashfree checkout error:", checkoutResult.error);
//                 setPaymentResult({
//                     success: false,
//                     message: checkoutResult.error.message || "Payment was not completed. Please try again."
//                 });
//                 setIsProcessingPayment(false);
//                 return;
//             }

//             const verifyRes = await verifyWithRetry(res.data.order_id, 5, 2500);

//             if (verifyRes && verifyRes.data?.success) {
//                 try {
//                     await axios.post(`${API_BASE_URL}/quick-service-booking`, {
//                         ...quickServiceData,
//                         orderId: res.data.order_id,
//                         paymentSessionId: res.data.payment_session_id,
//                         amount: Number(selectedQuickService.price),
//                         serviceName: selectedQuickService.title,
//                         deliveryTime: selectedQuickService.deliveryTime
//                     });
//                 } catch (bookingError) {
//                     console.error("Failed to save quick service booking:", bookingError);
//                 }

//                 setPaymentResult(verifyRes.data);
//                 setQuickServiceData(null);
//                 setQuickServiceStep("details");
//             } else {
//                 setPaymentResult({
//                     success: false,
//                     message: `We couldn't verify your payment automatically. If your money was deducted, please contact support with Order ID: ${res.data.order_id}`
//                 });
//             }
//         } catch (error) {
//             console.error("Quick service payment error:", error);
//             toast({
//                 title: "Payment Error",
//                 description: "An error occurred while processing your payment. Please try again.",
//                 variant: "destructive"
//             });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     // Reset payment state
//     const resetPaymentState = () => {
//         setPaymentResult(null);
//         setBookingStep("details");
//         setQuickServiceStep("details");
//         setQuickServiceData(null);
//     };

//     // Determine current active tab's step and content
//     const isQuickServiceActive = activeTab === "quickservice";
//     const currentStep = isQuickServiceActive ? quickServiceStep : bookingStep;
//     const showPaymentResult = paymentResult !== null;

//     return (
//         <div ref={bookingRef} className="w-full max-w-5xl mx-auto">
//             <div className="flex flex-col items-center mb-1 md:mb-2">
//                 <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 text-center">
//                     Book Your <span className="text-gradient-gold">Consultation</span>
//                 </h2>
//                 <div className="w-16 h-1 bg-primary rounded-full mb-2 md:mb-4" />
//             </div>

//             <div className="cosmic-card p-2 md:p-6 lg:p-6 bg-muted/30 backdrop-blur-sm">
//                 {/* ── TABS INSIDE THE CARD ── New Consultation / Follow-up / Quick Service ── */}
//                 <div className="flex flex-wrap items-center justify-center gap-3 mb-6 pb-2 border-b border-primary/20">
//                     <button
//                         onClick={() => {
//                             setActiveTab("new");
//                             setPaymentResult(null);
//                             setBookingStep("details");
//                             setQuickServiceStep("details");
//                         }}
//                         className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200
//                             ${activeTab === "new"
//                                 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
//                                 : "text-muted-foreground hover:text-primary"
//                             }`}
//                     >
//                         ✨ New Consultation
//                     </button>
//                     <button
//                         onClick={() => {
//                             setActiveTab("repeat");
//                             setPaymentResult(null);
//                             setBookingStep("details");
//                             setQuickServiceStep("details");
//                         }}
//                         className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200
//                             ${activeTab === "repeat"
//                                 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
//                                 : "text-muted-foreground hover:text-primary"
//                             }`}
//                     >
//                         🔄 Follow-up Consultation
//                     </button>
//                     <button
//                         onClick={() => {
//                             setActiveTab("quickservice");
//                             setPaymentResult(null);
//                             setBookingStep("details");
//                             setQuickServiceStep("details");
//                             setQuickServiceData(null);
//                         }}
//                         className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200
//                             ${activeTab === "quickservice"
//                                 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
//                                 : "text-muted-foreground hover:text-primary"
//                             }`}
//                     >
//                         ⚡ Quick Service
//                     </button>
//                 </div>

//                 {/* Step Progress Bar - only show for consultation tabs */}
//                 {!isQuickServiceActive && !showPaymentResult && (
//                     <div className="flex items-center justify-center w-full max-w-sm mx-auto relative mb-8 md:mb-10">
//                         <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
//                         {[
//                             { id: "details", label: "Basic Info" },
//                             { id: "slot", label: "Select Slot & Pay" }
//                         ].map((step, i) => (
//                             <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
//                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${currentStep === step.id || (currentStep === "slot" && i === 0)
//                                     ? "bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110"
//                                     : "bg-background border-muted text-muted-foreground"
//                                     }`}>
//                                     {currentStep === "slot" && i === 0 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
//                                 </div>
//                                 <span className={`text-[10px] sm:text-xs mt-2 font-semibold transition-colors duration-300 ${currentStep === step.id ? "text-primary" : "text-muted-foreground"}`}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Quick Service Step Progress */}
//                 {isQuickServiceActive && !showPaymentResult && quickServiceStep === "slot" && (
//                     <div className="flex items-center justify-center w-full max-w-sm mx-auto relative mb-8 md:mb-10">
//                         <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
//                         <div className="flex-1 flex flex-col items-center relative z-10">
//                             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110">
//                                 <CheckCircle2 className="w-4 h-4" />
//                             </div>
//                             <span className="text-[10px] sm:text-xs mt-2 font-semibold text-primary">
//                                 Review & Pay
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 {showPaymentResult ? (
//                     <BookingStatusScreen
//                         paymentResult={paymentResult}
//                         selectedService={isQuickServiceActive ? selectedQuickService : selectedService}
//                         bookingData={isQuickServiceActive ? {
//                             name: quickServiceData?.fullName,
//                             phone: quickServiceData?.phone,
//                             email: quickServiceData?.email
//                         } : bookingData}
//                         onReset={resetPaymentState}
//                         onTryAgain={() => setPaymentResult(null)}
//                     />
//                 ) : (
//                     <>
//                         {/* Quick Service Tab Content */}
//                         {activeTab === "quickservice" && (
//                             quickServiceStep === "details" ? (
//                                 <QuickServiceBookingTab onNext={handleQuickServiceNext} />
//                             ) : (
//                                 <div className="space-y-6">
//                                     <div className="space-y-4">
//                                         <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
//                                             <Zap className="w-5 h-5 text-primary" />
//                                             <h3 className="font-bold text-lg">Review Your Quick Service Request</h3>
//                                         </div>
                                        
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Full Name:</span> <span className="font-medium">{quickServiceData?.fullName}</span></p>
//                                                 <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{quickServiceData?.email || "Not provided"}</span></p>
//                                                 <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium">+91 {quickServiceData?.phone}</span></p>
//                                                 {quickServiceData?.dob && (
//                                                     <p><span className="text-muted-foreground">Date of Birth:</span> <span className="font-medium">{quickServiceData.dob}</span></p>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Service:</span> <span className="font-medium text-primary">{selectedQuickService?.title}</span></p>
//                                                 <p><span className="text-muted-foreground">Delivery:</span> <span className="font-medium">{selectedQuickService?.deliveryTime} via WhatsApp</span></p>
//                                                 {quickServiceData?.timeOfBirth && (
//                                                     <p><span className="text-muted-foreground">Time of Birth:</span> <span className="font-medium">{quickServiceData.timeOfBirth}</span></p>
//                                                 )}
//                                             </div>
//                                         </div>
                                        
//                                         <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
//                                             <p className="text-muted-foreground text-xs mb-1">Your Question:</p>
//                                             <p className="text-sm italic">"{quickServiceData?.question}"</p>
//                                         </div>
                                        
//                                         <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-2xl">
//                                             <div>
//                                                 <p className="text-xs text-muted-foreground">Total Amount</p>
//                                                 <p className="text-2xl font-bold text-gradient-gold">₹{selectedQuickService?.price.toLocaleString("en-IN")}</p>
//                                             </div>
//                                             <p className="text-[10px] text-muted-foreground">Including all taxes</p>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
//                                         <button
//                                             onClick={handleQuickServiceBack}
//                                             className="px-6 py-2.5 rounded-xl border border-primary/20 text-sm font-medium hover:bg-primary/5 transition-colors"
//                                         >
//                                             ← Back
//                                         </button>
//                                         <button
//                                             onClick={handleQuickServicePay}
//                                             disabled={isProcessingPayment}
//                                             className={`px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 font-bold shadow-lg transition-all flex items-center justify-center gap-2
//                                                 ${isProcessingPayment ? "opacity-70 cursor-not-allowed" : ""}`}
//                                         >
//                                             {isProcessingPayment ? (
//                                                 <>Processing... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
//                                             ) : (
//                                                 <>Pay ₹{selectedQuickService?.price.toLocaleString("en-IN")} →</>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             )
//                         )}

//                         {/* New Consultation & Follow-up Tab Content */}
//                         {activeTab !== "quickservice" && (
//                             currentStep === "details" ? (
//                                 <BookingDetailsStep
//                                     bookingData={{ ...bookingData, consultationType: activeTab }}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     bookingServices={activeTab === "new" ? newBookingServices : repeatBookingServices}
//                                     onNext={handleNextStep}
//                                 />
//                             ) : (
//                                 <BookingSlotStep
//                                     bookingData={bookingData}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     durations={durations}
//                                     selectedService={selectedService}
//                                     isProcessingPayment={isProcessingPayment}
//                                     onBack={handleBackStep}
//                                     onPay={handlePay}
//                                 />
//                             )
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };


//testing 2


// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Sparkles, User, MapPin, CheckCircle2, Zap } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { format } from "date-fns";

// // Sub-components
// import { BookingDetailsStep } from "./steps/BookingDetailsStep";
// import { BookingSlotStep } from "./steps/BookingSlotStep";
// import { BookingStatusScreen } from "./steps/BookingStatusScreen";
// import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
// import { QuickServiceBookingTab, type QuickServiceFormData } from "./QuickServiceBookingTab";
// import { quickServices } from "@/data/quickServices";

// const newBookingServices = [
//     {
//         id: "astrology-exact-birth-time",
//         title: "Astrology - (Exact Birth Time Known)",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-no-exact-birth-time",
//         title: "Astrology - (Exact Birth Time NOT Known)",
//         description: "Individual consultation (phone/video) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-in-person",
//         title: "Astrology - In-Person (Mumbai Only)",
//         description: "Individual consultation (in-person) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology",
//         title: "Numerology Analysis",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 3100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "vastu ",
//         title: "Vastu Consultation",
//         description: "Vastu Exploration Call - INR 5100 | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: MapPin,
//     }
// ];

// const repeatBookingServices = [
//     {
//         id: "astrology-repeat-within-10",
//         title: "Astrology - Follow-up (within 10 days)",
//         description: "Follow-up consultation (within 10 days) - 30 Minutes",
//         price: 2100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-10-to-30",
//         title: "Astrology - Follow-up (11-30 days)",
//         description: "Follow-up consultation (after 10 days till 30 days) - 30 Minutes",
//         price: 3100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-post-30",
//         title: "Astrology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology-repeat-within-10",
//         title: "Numerology - Follow-up (within 10 days)",
//         description: "Individual consultation (phone/video) - (within 10 days) - 30 minutes",
//         price: 1100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "numerology-repeat-11-to-30",
//         title: "Numerology - Follow-up (11-30 days)",
//         description: "Individual consultation (phone/video) - (between 11 to 30 days) - 30 minutes",
//         price: 2100,
//         duration: "30",
//         icon: User,
//     },
//        {
//         id: "numerology-repeat-post-30",
//         title: "Numerology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
// ];

// const durations = [
//     { label: "30 Minutes", value: "30" },
//     { label: "1 Hour", value: "60" },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// type TabType = "new" | "repeat" | "quickservice";

// export const BookingProcess = () => {
//     const [activeTab, setActiveTab] = useState<TabType>("new");
    
//     const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
//     const [bookingData, setBookingData] = useState({
//         consultationType: "new" as "new" | "repeat",
//         name: "",
//         email: "",
//         dob: "",
//         phone: "",
//         serviceId: "astrology-exact-birth-time",
//         duration: "30" as string,
//         gender: "",
//         place: "",
//         concern: "",
//         areaDimension: "",
//         floorPlan: null as File | null,
//         propertyLocation: "",
//         timeOfBirth: "",
//         selectedDate: undefined as Date | undefined,
//         selectedTime: null as string | null,
//     });
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     const [quickServiceData, setQuickServiceData] = useState<QuickServiceFormData | null>(null);
//     const [quickServiceStep, setQuickServiceStep] = useState<"details" | "slot">("details");

//     const [cashfree, setCashfree] = useState<any>(null);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [paymentResult, setPaymentResult] = useState<any>(null);

//     const { toast } = useToast();
//     const bookingRef = useRef<HTMLDivElement>(null);
    
//     const selectedQuickService = quickServiceData?.serviceId 
//         ? quickServices.find((s: any) => s.id === quickServiceData.serviceId)
//         : null;

//     useEffect(() => {
//         const initSDK = async () => {
//             try {
//                 const cf = await load({ mode: "production" });
//                 setCashfree(cf);
//             } catch (error) {
//                 console.error("Failed to initialize Cashfree SDK", error);
//             }
//         };
//         initSDK();
//     }, []);

//     const scrollToBooking = () => {
//         if (bookingRef.current) {
//             const offset = 100;
//             const elementPosition = bookingRef.current.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;
//             window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         }
//     };

//     const selectedService = [...newBookingServices, ...repeatBookingServices].find(s => s.id === bookingData.serviceId);

//     const updateBookingData = (updates: Partial<typeof bookingData>) => {
//         if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
//             updates.serviceId = "";
//             updates.duration = "";
//         }
//         if (updates.serviceId) {
//             const service = [...newBookingServices, ...repeatBookingServices].find(s => s.id === updates.serviceId);
//             if (service && 'duration' in service && service.duration) {
//                 updates.duration = service.duration;
//             }
//         }
//         setBookingData(prev => ({ ...prev, ...updates }));
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length > 0) {
//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 updatedFields.forEach(field => delete newErrors[field]);
//                 if (updatedFields.includes("selectedDate") || updatedFields.includes("selectedTime")) {
//                     delete newErrors.slot;
//                 }
//                 return newErrors;
//             });
//         }
//     };

//     const validateStep1 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.name.trim()) newErrors.name = "Full name is required";
//         else if (bookingData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
//         if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
//             newErrors.email = "Invalid email format";
//         }
//         if (!bookingData.dob) newErrors.dob = "Date of birth is required";
//         if (!bookingData.phone) newErrors.phone = "Phone number is required";
//         else if (!/^\d{10}$/.test(bookingData.phone)) newErrors.phone = "Phone number must be 10 digits";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const validateStep2 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
//         if (!bookingData.selectedDate || !bookingData.selectedTime) newErrors.slot = "Please select a date and time slot";
//         if (!bookingData.gender) newErrors.gender = "Please select gender";
//         if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleNextStep = () => {
//         if (validateStep1()) {
//             setBookingStep("slot");
//             setTimeout(scrollToBooking, 100);
//         } else {
//             toast({
//                 title: "Validation Error",
//                 description: "Please check the highlighted fields and try again.",
//                 variant: "destructive"
//             });
//         }
//     };

//     const handleBackStep = () => {
//         setBookingStep("details");
//         setErrors({});
//         setTimeout(scrollToBooking, 100);
//     };

//     const handleQuickServiceNext = (data: QuickServiceFormData) => {
//         setQuickServiceData(data);
//         setQuickServiceStep("slot");
//         setTimeout(scrollToBooking, 100);
//     };

//     const handleQuickServiceBack = () => {
//         setQuickServiceStep("details");
//         setTimeout(scrollToBooking, 100);
//     };

//     const verifyWithRetry = async (orderId: string, retries = 5, delay = 2500) => {
//         for (let i = 0; i < retries; i++) {
//             try {
//                 const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
//                 if (verifyRes.data?.success) return verifyRes;
//             } catch (err) {}
//             if (i < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
//         }
//         return null;
//     };

//     const handlePay = async () => {
//         if (!validateStep2()) {
//             toast({ title: "Missing Information", description: "Please complete all required fields.", variant: "destructive" });
//             return;
//         }
//         if (!cashfree) {
//             toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {
//             await sendLeadToCRM({
//                 name: bookingData.name,
//                 phone: bookingData.phone,
//                 email: bookingData.email || "",
//                 source: "Website Booking Form",
//                 tags: [selectedService?.title || "", bookingData.consultationType || ""].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedService?.price),
//                 customer_name: bookingData.name,
//                 customer_phone: bookingData.phone,
//                 customer_email: bookingData.email || "customer@example.com",
//             });

//             if (!res.data?.payment_session_id) throw new Error("No payment session");

//             const checkoutResult = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

//             const verifyRes = await verifyWithRetry(res.data.order_id);
//             if (verifyRes?.data?.success) {
//                 setPaymentResult(verifyRes.data);
//                 setBookingStep("details");
//             } else {
//                 setPaymentResult({ success: false, message: "Payment verification failed. Please contact support." });
//             }
//         } catch (error) {
//             console.error("Payment error:", error);
//             toast({ title: "Payment Error", description: "An error occurred. Please try again.", variant: "destructive" });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const handleQuickServicePay = async () => {
//         if (!quickServiceData || !selectedQuickService) {
//             toast({ title: "Missing Information", description: "Please complete the form first.", variant: "destructive" });
//             return;
//         }
//         if (!cashfree) {
//             toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {
//             await sendLeadToCRM({
//                 name: quickServiceData.fullName,
//                 phone: quickServiceData.phone,
//                 email: quickServiceData.email || "",
//                 source: "Quick Service Booking",
//                 tags: ["Quick Service", selectedQuickService.title].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedQuickService.price),
//                 customer_name: quickServiceData.fullName,
//                 customer_phone: quickServiceData.phone,
//                 customer_email: quickServiceData.email || "customer@example.com",
//             });

//             if (!res.data?.payment_session_id) throw new Error("No payment session");

//             const checkoutResult = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

//             const verifyRes = await verifyWithRetry(res.data.order_id);
//             if (verifyRes?.data?.success) {
//                 setPaymentResult(verifyRes.data);
//                 setQuickServiceData(null);
//                 setQuickServiceStep("details");
//             } else {
//                 setPaymentResult({ success: false, message: "Payment verification failed." });
//             }
//         } catch (error) {
//             console.error("Quick service payment error:", error);
//             toast({ title: "Payment Error", description: "An error occurred. Please try again.", variant: "destructive" });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const resetPaymentState = () => {
//         setPaymentResult(null);
//         setBookingStep("details");
//         setQuickServiceStep("details");
//         setQuickServiceData(null);
//     };

//     const isQuickServiceActive = activeTab === "quickservice";
//     const currentStep = isQuickServiceActive ? quickServiceStep : bookingStep;
//     const showPaymentResult = paymentResult !== null;

//     return (
//         <div ref={bookingRef} className="w-full max-w-4xl mx-auto">
//             {/* Title Section - No tabs here */}
//             <div className="text-center mb-6">
//                 <h2 className="font-serif text-2xl md:text-3xl font-bold">
//                     Book Your <span className="text-gradient-gold">Consultation</span>
//                 </h2>
//                 <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
//             </div>

//             {/* Main Card - Tabs are ONLY inside this card */}
//             <div className="bg-gradient-to-br from-background via-background/95 to-primary/5 rounded-2xl border border-primary/20 p-4 md:p-6 shadow-xl">
                
//                 {/* TABS INSIDE THE CARD ONLY - No tabs outside */}
//                 <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 pb-3 border-b border-primary/20">
//                     {/* <button
//                         onClick={() => { setActiveTab("new"); setPaymentResult(null); setBookingStep("details"); setQuickServiceStep("details"); setQuickServiceData(null); }}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "new" 
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30" 
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         ✨ New Consultation
//                     </button>
//                     <button
//                         onClick={() => { setActiveTab("repeat"); setPaymentResult(null); setBookingStep("details"); setQuickServiceStep("details"); setQuickServiceData(null); }}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "repeat" 
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30" 
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         🔄 Follow-up Consultation
//                     </button> */}
//                     <button
//                         onClick={() => { setActiveTab("quickservice"); setPaymentResult(null); setBookingStep("details"); setQuickServiceStep("details"); setQuickServiceData(null); }}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "quickservice" 
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30" 
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         ⚡ Quick Service
//                     </button>
//                 </div>

//                 {/* Progress Steps */}
//                 {!isQuickServiceActive && !showPaymentResult && currentStep === "slot" && (
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
//                             <span className="text-xs text-muted-foreground ml-1">Basic Info</span>
//                         </div>
//                         <div className="w-12 h-px bg-primary/30" />
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
//                             <span className="text-xs text-primary ml-1 font-medium">Select Slot & Pay</span>
//                         </div>
//                     </div>
//                 )}

//                 {isQuickServiceActive && !showPaymentResult && quickServiceStep === "slot" && (
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
//                             <span className="text-xs text-muted-foreground ml-1">Details</span>
//                         </div>
//                         <div className="w-12 h-px bg-primary/30" />
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
//                             <span className="text-xs text-primary ml-1 font-medium">Review & Pay</span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Area */}
//                 {showPaymentResult ? (
//                     <BookingStatusScreen
//                         paymentResult={paymentResult}
//                         selectedService={isQuickServiceActive ? selectedQuickService : selectedService}
//                         bookingData={isQuickServiceActive ? { name: quickServiceData?.fullName, phone: quickServiceData?.phone, email: quickServiceData?.email } : bookingData}
//                         onReset={resetPaymentState}
//                         onTryAgain={() => setPaymentResult(null)}
//                     />
//                 ) : (
//                     <>
//                         {activeTab === "quickservice" && (
//                             quickServiceStep === "details" ? (
//                                 <QuickServiceBookingTab onNext={handleQuickServiceNext} />
//                             ) : (
//                                 <div className="space-y-5">
//                                     <div className="space-y-4">
//                                         <div className="flex items-center gap-2 pb-2 border-b border-primary/20">
//                                             <Zap className="w-5 h-5 text-primary" />
//                                             <h3 className="font-bold text-lg">Review Your Request</h3>
//                                         </div>
                                        
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-primary/5 p-4 rounded-xl">
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{quickServiceData?.fullName}</span></p>
//                                                 <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{quickServiceData?.email || "—"}</span></p>
//                                                 <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium">+91 {quickServiceData?.phone}</span></p>
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Service:</span> <span className="font-medium text-primary">{selectedQuickService?.title}</span></p>
//                                                 <p><span className="text-muted-foreground">Delivery:</span> <span className="font-medium">{selectedQuickService?.deliveryTime}</span></p>
//                                                 {quickServiceData?.dob && <p><span className="text-muted-foreground">DOB:</span> <span className="font-medium">{quickServiceData.dob}</span></p>}
//                                             </div>
//                                         </div>
                                        
//                                         <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
//                                             <p className="text-muted-foreground text-xs mb-1">Your Question:</p>
//                                             <p className="text-sm italic">"{quickServiceData?.question}"</p>
//                                         </div>
                                        
//                                         <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl border border-primary/20">
//                                             <div>
//                                                 <p className="text-xs text-muted-foreground">Total Amount</p>
//                                                 <p className="text-2xl font-bold text-primary">₹{selectedQuickService?.price?.toLocaleString("en-IN")}</p>
//                                             </div>
//                                             <p className="text-[10px] text-muted-foreground">Incl. all taxes</p>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="flex flex-col sm:flex-row gap-3 justify-between pt-2">
//                                         <button onClick={handleQuickServiceBack} className="px-6 py-2.5 rounded-xl border border-primary/20 text-sm font-medium hover:bg-primary/5 transition-colors">
//                                             ← Back
//                                         </button>
//                                         <button onClick={handleQuickServicePay} disabled={isProcessingPayment} className="px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
//                                             {isProcessingPayment ? (
//                                                 <>Processing... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
//                                             ) : (
//                                                 <>Pay ₹{selectedQuickService?.price?.toLocaleString("en-IN")} →</>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             )
//                         )}

//                         {activeTab !== "quickservice" && (
//                             currentStep === "details" ? (
//                                 <BookingDetailsStep
//                                     bookingData={{ ...bookingData, consultationType: activeTab }}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     bookingServices={activeTab === "new" ? newBookingServices : repeatBookingServices}
//                                     onNext={handleNextStep}
//                                 />
//                             ) : (
//                                 <BookingSlotStep
//                                     bookingData={bookingData}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     durations={durations}
//                                     selectedService={selectedService}
//                                     isProcessingPayment={isProcessingPayment}
//                                     onBack={handleBackStep}
//                                     onPay={handlePay}
//                                 />
//                             )
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };



//temporary


// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Sparkles, User, MapPin, CheckCircle2, Zap } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { format } from "date-fns";

// // Sub-components
// import { BookingDetailsStep } from "./steps/BookingDetailsStep";
// import { BookingSlotStep } from "./steps/BookingSlotStep";
// import { BookingStatusScreen } from "./steps/BookingStatusScreen";
// import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
// import { QuickServiceBookingTab, type QuickServiceFormData } from "./QuickServiceBookingTab";
// import { quickServices } from "@/data/quickServices";

// const newBookingServices = [
//     {
//         id: "astrology-exact-birth-time",
//         title: "Astrology - (Exact Birth Time Known)",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-no-exact-birth-time",
//         title: "Astrology - (Exact Birth Time NOT Known)",
//         description: "Individual consultation (phone/video) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-in-person",
//         title: "Astrology - In-Person (Mumbai Only)",
//         description: "Individual consultation (in-person) - 60 minutes",
//         price: 7500,
//         duration: "60",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology",
//         title: "Numerology Analysis",
//         description: "Individual consultation (phone/video) - 30 minutes",
//         price: 3100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "vastu ",
//         title: "Vastu Consultation",
//         description: "Vastu Exploration Call - INR 5100 | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
//         price: 5100,
//         duration: "30",
//         icon: MapPin,
//     }
// ];

// const repeatBookingServices = [
//     {
//         id: "astrology-repeat-within-10",
//         title: "Astrology - Follow-up (within 10 days)",
//         description: "Follow-up consultation (within 10 days) - 30 Minutes",
//         price: 2100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-10-to-30",
//         title: "Astrology - Follow-up (11-30 days)",
//         description: "Follow-up consultation (after 10 days till 30 days) - 30 Minutes",
//         price: 3100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "astrology-repeat-post-30",
//         title: "Astrology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
//     {
//         id: "numerology-repeat-within-10",
//         title: "Numerology - Follow-up (within 10 days)",
//         description: "Individual consultation (phone/video) - (within 10 days) - 30 minutes",
//         price: 1100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "numerology-repeat-11-to-30",
//         title: "Numerology - Follow-up (11-30 days)",
//         description: "Individual consultation (phone/video) - (between 11 to 30 days) - 30 minutes",
//         price: 2100,
//         duration: "30",
//         icon: User,
//     },
//     {
//         id: "numerology-repeat-post-30",
//         title: "Numerology - Follow-up (post 30 days)",
//         description: "Follow-up consultation (post 30 days) - 30 Minutes",
//         price: 5100,
//         duration: "30",
//         icon: Sparkles,
//     },
// ];

// const durations = [
//     { label: "30 Minutes", value: "30" },
//     { label: "1 Hour", value: "60" },
// ];

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// type TabType = "new" | "repeat" | "quickservice";

// export const BookingProcess = () => {
//     const [activeTab, setActiveTab] = useState<TabType>("new");

//     const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
//     const [bookingData, setBookingData] = useState({
//         consultationType: "new" as "new" | "repeat",
//         name: "",
//         email: "",
//         dob: "",
//         phone: "",
//         serviceId: "astrology-exact-birth-time",
//         duration: "30" as string,
//         gender: "",
//         place: "",
//         concern: "",
//         areaDimension: "",
//         floorPlan: null as File | null,
//         propertyLocation: "",
//         timeOfBirth: "",
//         selectedDate: undefined as Date | undefined,
//         selectedTime: null as string | null,
//     });
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     const [quickServiceData, setQuickServiceData] = useState<QuickServiceFormData | null>(null);
//     const [quickServiceStep, setQuickServiceStep] = useState<"details" | "slot">("details");

//     const [cashfree, setCashfree] = useState<any>(null);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [paymentResult, setPaymentResult] = useState<any>(null);

//     const { toast } = useToast();
//     const bookingRef = useRef<HTMLDivElement>(null);

//     const selectedQuickService = quickServiceData?.serviceId
//         ? quickServices.find((s: any) => s.id === quickServiceData.serviceId)
//         : null;

//     useEffect(() => {
//         const initSDK = async () => {
//             try {
//                 const cf = await load({ mode: "production" });
//                 setCashfree(cf);
//             } catch (error) {
//                 console.error("Failed to initialize Cashfree SDK", error);
//             }
//         };
//         initSDK();
//     }, []);

//     const scrollToBooking = () => {
//         if (bookingRef.current) {
//             const offset = 100;
//             const elementPosition = bookingRef.current.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset - offset;
//             window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//         }
//     };

//     const selectedService = [...newBookingServices, ...repeatBookingServices].find(s => s.id === bookingData.serviceId);

//     const updateBookingData = (updates: Partial<typeof bookingData>) => {
//         if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
//             updates.serviceId = "";
//             updates.duration = "";
//         }
//         if (updates.serviceId) {
//             const service = [...newBookingServices, ...repeatBookingServices].find(s => s.id === updates.serviceId);
//             if (service && 'duration' in service && service.duration) {
//                 updates.duration = service.duration;
//             }
//         }
//         setBookingData(prev => ({ ...prev, ...updates }));
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length > 0) {
//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 updatedFields.forEach(field => delete newErrors[field]);
//                 if (updatedFields.includes("selectedDate") || updatedFields.includes("selectedTime")) {
//                     delete newErrors.slot;
//                 }
//                 return newErrors;
//             });
//         }
//     };

//     const validateStep1 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.name.trim()) newErrors.name = "Full name is required";
//         else if (bookingData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
//         if (bookingData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
//             newErrors.email = "Invalid email format";
//         }
//         if (!bookingData.dob) newErrors.dob = "Date of birth is required";
//         if (!bookingData.phone) newErrors.phone = "Phone number is required";
//         else if (!/^\d{10}$/.test(bookingData.phone)) newErrors.phone = "Phone number must be 10 digits";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const validateStep2 = () => {
//         const newErrors: Record<string, string> = {};
//         if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
//         if (!bookingData.selectedDate || !bookingData.selectedTime) newErrors.slot = "Please select a date and time slot";
//         if (!bookingData.gender) newErrors.gender = "Please select gender";
//         if (!bookingData.place || !bookingData.place.trim()) newErrors.place = "Place of birth is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleNextStep = () => {
//         if (validateStep1()) {
//             setBookingStep("slot");
//             setTimeout(scrollToBooking, 100);
//         } else {
//             toast({
//                 title: "Validation Error",
//                 description: "Please check the highlighted fields and try again.",
//                 variant: "destructive"
//             });
//         }
//     };

//     const handleBackStep = () => {
//         setBookingStep("details");
//         setErrors({});
//         setTimeout(scrollToBooking, 100);
//     };

//     const handleQuickServiceNext = (data: QuickServiceFormData) => {
//         setQuickServiceData(data);
//         setQuickServiceStep("slot");
//         setTimeout(scrollToBooking, 100);
//     };

//     const handleQuickServiceBack = () => {
//         setQuickServiceStep("details");
//         setTimeout(scrollToBooking, 100);
//     };

//     const verifyWithRetry = async (orderId: string, retries = 5, delay = 2500) => {
//         for (let i = 0; i < retries; i++) {
//             try {
//                 const verifyRes = await axios.post(`${API_BASE_URL}/verify`, { orderId });
//                 if (verifyRes.data?.success) return verifyRes;
//             } catch (err) {}
//             if (i < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
//         }
//         return null;
//     };

//     const handlePay = async () => {
//         if (!validateStep2()) {
//             toast({ title: "Missing Information", description: "Please complete all required fields.", variant: "destructive" });
//             return;
//         }
//         if (!cashfree) {
//             toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {
//             await sendLeadToCRM({
//                 name: bookingData.name,
//                 phone: bookingData.phone,
//                 email: bookingData.email || "",
//                 source: "Website Booking Form",
//                 tags: [selectedService?.title || "", bookingData.consultationType || ""].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedService?.price),
//                 customer_name: bookingData.name,
//                 customer_phone: bookingData.phone,
//                 customer_email: bookingData.email || "customer@example.com",
//             });

//             if (!res.data?.payment_session_id) throw new Error("No payment session");

//             const checkoutResult = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

//             const verifyRes = await verifyWithRetry(res.data.order_id);
//             if (verifyRes?.data?.success) {
//                 setPaymentResult(verifyRes.data);
//                 setBookingStep("details");
//             } else {
//                 setPaymentResult({ success: false, message: "Payment verification failed. Please contact support." });
//             }
//         } catch (error) {
//             console.error("Payment error:", error);
//             toast({ title: "Payment Error", description: "An error occurred. Please try again.", variant: "destructive" });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const handleQuickServicePay = async () => {
//         if (!quickServiceData || !selectedQuickService) {
//             toast({ title: "Missing Information", description: "Please complete the form first.", variant: "destructive" });
//             return;
//         }
//         if (!cashfree) {
//             toast({ title: "System Error", description: "Payment system not initialized.", variant: "destructive" });
//             return;
//         }

//         setIsProcessingPayment(true);
//         try {
//             await sendLeadToCRM({
//                 name: quickServiceData.fullName,
//                 phone: quickServiceData.phone,
//                 email: quickServiceData.email || "",
//                 source: "Quick Service Booking",
//                 tags: ["Quick Service", selectedQuickService.title].filter(Boolean),
//             });

//             const res = await axios.post(`${API_BASE_URL}/payment`, {
//                 amount: Number(selectedQuickService.price),
//                 customer_name: quickServiceData.fullName,
//                 customer_phone: quickServiceData.phone,
//                 customer_email: quickServiceData.email || "customer@example.com",
//             });

//             if (!res.data?.payment_session_id) throw new Error("No payment session");

//             const checkoutResult = await cashfree.checkout({
//                 paymentSessionId: res.data.payment_session_id,
//                 redirectTarget: "_modal",
//             });

//             if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

//             const verifyRes = await verifyWithRetry(res.data.order_id);
//             if (verifyRes?.data?.success) {
//                 setPaymentResult(verifyRes.data);
//                 setQuickServiceData(null);
//                 setQuickServiceStep("details");
//             } else {
//                 setPaymentResult({ success: false, message: "Payment verification failed." });
//             }
//         } catch (error) {
//             console.error("Quick service payment error:", error);
//             toast({ title: "Payment Error", description: "An error occurred. Please try again.", variant: "destructive" });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const resetPaymentState = () => {
//         setPaymentResult(null);
//         setBookingStep("details");
//         setQuickServiceStep("details");
//         setQuickServiceData(null);
//     };

//     // When switching tabs, reset steps and sync consultationType in bookingData
//     const handleTabChange = (tab: TabType) => {
//         setActiveTab(tab);
//         setPaymentResult(null);
//         setBookingStep("details");
//         setQuickServiceStep("details");
//         setQuickServiceData(null);
//         setErrors({});
//         if (tab === "new" || tab === "repeat") {
//             setBookingData(prev => ({
//                 ...prev,
//                 consultationType: tab,
//                 serviceId: tab === "new" ? "astrology-exact-birth-time" : "",
//                 duration: tab === "new" ? "30" : "",
//             }));
//         }
//     };

//     const isQuickServiceActive = activeTab === "quickservice";
//     const currentStep = isQuickServiceActive ? quickServiceStep : bookingStep;
//     const showPaymentResult = paymentResult !== null;

//     return (
//         <div ref={bookingRef} className="w-full max-w-4xl mx-auto">
//             <div className="text-center mb-6">
//                 <h2 className="font-serif text-2xl md:text-3xl font-bold">
//                     Book Your <span className="text-gradient-gold">Consultation</span>
//                 </h2>
//                 <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
//             </div>

//             <div className="bg-gradient-to-br from-background via-background/95 to-primary/5 rounded-2xl border border-primary/20 p-4 md:p-6 shadow-xl">

//                 {/* ── Single top-level tab bar (the only tab bar in the component) ── */}
//                 <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 pb-3 border-b border-primary/20">
//                     <button
//                         onClick={() => handleTabChange("new")}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "new"
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30"
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         ✨ New Consultation
//                     </button>
//                     <button
//                         onClick={() => handleTabChange("repeat")}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "repeat"
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30"
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         🔄 Follow-up Consultation
//                     </button>
//                     <button
//                         onClick={() => handleTabChange("quickservice")}
//                         className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
//                             ${activeTab === "quickservice"
//                                 ? "bg-primary text-white shadow-lg shadow-primary/30"
//                                 : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
//                     >
//                         ⚡ Quick Service
//                     </button>
//                 </div>

//                 {/* Step indicator for New / Repeat consultation — slot step only */}
//                 {!isQuickServiceActive && !showPaymentResult && currentStep === "slot" && (
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
//                             <span className="text-xs text-muted-foreground ml-1">Basic Info</span>
//                         </div>
//                         <div className="w-12 h-px bg-primary/30" />
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
//                             <span className="text-xs text-primary ml-1 font-medium">Select Slot & Pay</span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Step indicator for Quick Service — slot step only */}
//                 {isQuickServiceActive && !showPaymentResult && quickServiceStep === "slot" && (
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
//                             <span className="text-xs text-muted-foreground ml-1">Details</span>
//                         </div>
//                         <div className="w-12 h-px bg-primary/30" />
//                         <div className="flex items-center">
//                             <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
//                             <span className="text-xs text-primary ml-1 font-medium">Review & Pay</span>
//                         </div>
//                     </div>
//                 )}

//                 {/* ── Content area ── */}
//                 {showPaymentResult ? (
//                     <BookingStatusScreen
//                         paymentResult={paymentResult}
//                         selectedService={isQuickServiceActive ? selectedQuickService : selectedService}
//                         bookingData={isQuickServiceActive ? { name: quickServiceData?.fullName, phone: quickServiceData?.phone, email: quickServiceData?.email } : bookingData}
//                         onReset={resetPaymentState}
//                         onTryAgain={() => setPaymentResult(null)}
//                     />
//                 ) : (
//                     <>
//                         {/* Quick Service tab */}
//                         {activeTab === "quickservice" && (
//                             quickServiceStep === "details" ? (
//                                 <QuickServiceBookingTab onNext={handleQuickServiceNext} />
//                             ) : (
//                                 <div className="space-y-5">
//                                     <div className="space-y-4">
//                                         <div className="flex items-center gap-2 pb-2 border-b border-primary/20">
//                                             <Zap className="w-5 h-5 text-primary" />
//                                             <h3 className="font-bold text-lg">Review Your Request</h3>
//                                         </div>

//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-primary/5 p-4 rounded-xl">
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{quickServiceData?.fullName}</span></p>
//                                                 <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{quickServiceData?.email || "—"}</span></p>
//                                                 <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium">+91 {quickServiceData?.phone}</span></p>
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <p><span className="text-muted-foreground">Service:</span> <span className="font-medium text-primary">{selectedQuickService?.title}</span></p>
//                                                 <p><span className="text-muted-foreground">Delivery:</span> <span className="font-medium">{selectedQuickService?.deliveryTime}</span></p>
//                                                 {quickServiceData?.dob && <p><span className="text-muted-foreground">DOB:</span> <span className="font-medium">{quickServiceData.dob}</span></p>}
//                                             </div>
//                                         </div>

//                                         <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
//                                             <p className="text-muted-foreground text-xs mb-1">Your Question:</p>
//                                             <p className="text-sm italic">"{quickServiceData?.question}"</p>
//                                         </div>

//                                         <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl border border-primary/20">
//                                             <div>
//                                                 <p className="text-xs text-muted-foreground">Total Amount</p>
//                                                 <p className="text-2xl font-bold text-primary">₹{selectedQuickService?.price?.toLocaleString("en-IN")}</p>
//                                             </div>
//                                             <p className="text-[10px] text-muted-foreground">Incl. all taxes</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row gap-3 justify-between pt-2">
//                                         <button onClick={handleQuickServiceBack} className="px-6 py-2.5 rounded-xl border border-primary/20 text-sm font-medium hover:bg-primary/5 transition-colors">
//                                             ← Back
//                                         </button>
//                                         <button onClick={handleQuickServicePay} disabled={isProcessingPayment} className="px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
//                                             {isProcessingPayment ? (
//                                                 <>Processing... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
//                                             ) : (
//                                                 <>Pay ₹{selectedQuickService?.price?.toLocaleString("en-IN")} →</>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             )
//                         )}

//                         {/*
//                          * New / Repeat Consultation tabs
//                          * NOTE: BookingDetailsStep must NOT render its own internal
//                          * "New Consultation / Follow-up Consultation" toggle buttons.
//                          * The active tab is already controlled by the top-level tab bar above.
//                          * Pass consultationType so the child knows which service list to use,
//                          * but do NOT let it render a secondary tab switcher.
//                          */}
//                         {activeTab !== "quickservice" && (
//                             currentStep === "details" ? (
//                                 <BookingDetailsStep
//                                     bookingData={{ ...bookingData, consultationType: activeTab as "new" | "repeat" }}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     bookingServices={activeTab === "new" ? newBookingServices : repeatBookingServices}
//                                     onNext={handleNextStep}
//                                 />
//                             ) : (
//                                 <BookingSlotStep
//                                     bookingData={bookingData}
//                                     updateBookingData={updateBookingData}
//                                     errors={errors}
//                                     durations={durations}
//                                     selectedService={selectedService}
//                                     isProcessingPayment={isProcessingPayment}
//                                     onBack={handleBackStep}
//                                     onPay={handlePay}
//                                 />
//                             )
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };


//temporary 2




import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { Sparkles, User, MapPin, CheckCircle2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Sub-components
import { BookingDetailsStep } from "./steps/BookingDetailsStep";
import { BookingSlotStep } from "./steps/BookingSlotStep";
import { BookingStatusScreen } from "./steps/BookingStatusScreen";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
import { QuickServiceBookingTab, type QuickServiceFormData } from "./QuickServiceBookingTab";
import { quickServices } from "@/data/quickServices";

const newBookingServices = [
    {
        id: "astrology-exact-birth-time",
        title: "Astrology - (Exact Birth Time Known)",
        description: "Individual consultation (phone/video) - 30 minutes",
        price: 11000,
        duration: "30",
        icon: Sparkles,
    },
    {
        id: "astrology-no-exact-birth-time",
        title: "Astrology - (Exact Birth Time NOT Known)",
        description: "Individual consultation (phone/video) - 60 minutes",
        price: 15000,
        duration: "60",
        icon: Sparkles,
    },
    {
        id: "astrology-in-person",
        title: "Astrology - In-Person (Mumbai Only)",
        description: "Individual consultation (in-person) - 60 minutes",
        price: 15000,
        duration: "60",
        icon: Sparkles,
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
        description: "Vastu Exploration Call | Home Vastu (Online Inquiry + Recommendations) - 30 minutes",
        price: 5100,
        duration: "30",
        icon: MapPin,
    },
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
        price: 3100,
        duration: "30",
        icon: Sparkles,
    },
];

const durations = [
    { label: "30 Minutes", value: "30" },
    { label: "1 Hour", value: "60" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type TabType = "new" | "repeat" | "quickservice";

export const BookingProcess = () => {
    const [activeTab, setActiveTab] = useState<TabType>("new");

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

    const [quickServiceData, setQuickServiceData] = useState<QuickServiceFormData | null>(null);
    const [quickServiceStep, setQuickServiceStep] = useState<"details" | "slot">("details");

    const [cashfree, setCashfree] = useState<any>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentResult, setPaymentResult] = useState<any>(null);

    const { toast } = useToast();
    const bookingRef = useRef<HTMLDivElement>(null);

    const selectedQuickService = quickServiceData?.serviceId
        ? quickServices.find((s: any) => s.id === quickServiceData.serviceId)
        : null;

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

    const selectedService = [...newBookingServices, ...repeatBookingServices].find(
        (s) => s.id === bookingData.serviceId
    );

    const updateBookingData = (updates: Partial<typeof bookingData>) => {
        if (updates.consultationType && updates.consultationType !== bookingData.consultationType) {
            updates.serviceId = "";
            updates.duration = "";
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
                if (
                    updatedFields.includes("selectedDate") ||
                    updatedFields.includes("selectedTime")
                ) {
                    delete newErrors.slot;
                }
                return newErrors;
            });
        }
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!bookingData.name.trim()) newErrors.name = "Full name is required";
        else if (bookingData.name.trim().length < 3)
            newErrors.name = "Name must be at least 3 characters";
        if (
            bookingData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)
        ) {
            newErrors.email = "Invalid email format";
        }
        if (!bookingData.dob) newErrors.dob = "Date of birth is required";
        if (!bookingData.phone) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(bookingData.phone))
            newErrors.phone = "Phone number must be 10 digits";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!bookingData.duration) newErrors.duration = "Consultation duration is required";
        if (!bookingData.selectedDate || !bookingData.selectedTime)
            newErrors.slot = "Please select a date and time slot";
        if (!bookingData.gender) newErrors.gender = "Please select gender";
        if (!bookingData.place || !bookingData.place.trim())
            newErrors.place = "Place of birth is required";
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
            if (i < retries - 1)
                await new Promise((resolve) => setTimeout(resolve, delay));
        }
        return null;
    };

    const handlePay = async () => {
        if (!validateStep2()) {
            toast({
                title: "Missing Information",
                description: "Please complete all required fields.",
                variant: "destructive",
            });
            return;
        }
        if (!cashfree) {
            toast({
                title: "System Error",
                description: "Payment system not initialized.",
                variant: "destructive",
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
                tags: [selectedService?.title || "", bookingData.consultationType || ""].filter(
                    Boolean
                ),
            });

            const res = await axios.post(`${API_BASE_URL}/payment`, {
                amount: Number(selectedService?.price),
                customer_name: bookingData.name,
                customer_phone: bookingData.phone,
                customer_email: bookingData.email || "customer@example.com",
            });

            if (!res.data?.payment_session_id) throw new Error("No payment session");

            const checkoutResult = await cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal",
            });

            if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

            const verifyRes = await verifyWithRetry(res.data.order_id);
            if (verifyRes?.data?.success) {
                setPaymentResult(verifyRes.data);
                setBookingStep("details");
            } else {
                setPaymentResult({
                    success: false,
                    message: "Payment verification failed. Please contact support.",
                });
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                title: "Payment Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handleQuickServicePay = async () => {
        if (!quickServiceData || !selectedQuickService) {
            toast({
                title: "Missing Information",
                description: "Please complete the form first.",
                variant: "destructive",
            });
            return;
        }
        if (!cashfree) {
            toast({
                title: "System Error",
                description: "Payment system not initialized.",
                variant: "destructive",
            });
            return;
        }

        setIsProcessingPayment(true);
        try {
            await sendLeadToCRM({
                name: quickServiceData.fullName,
                phone: quickServiceData.phone,
                email: quickServiceData.email || "",
                source: "Quick Service Booking",
                tags: ["Quick Service", selectedQuickService.title].filter(Boolean),
            });

            const res = await axios.post(`${API_BASE_URL}/payment`, {
                amount: Number(selectedQuickService.price),
                customer_name: quickServiceData.fullName,
                customer_phone: quickServiceData.phone,
                customer_email: quickServiceData.email || "customer@example.com",
            });

            if (!res.data?.payment_session_id) throw new Error("No payment session");

            const checkoutResult = await cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                redirectTarget: "_modal",
            });

            if (checkoutResult?.error) throw new Error(checkoutResult.error.message);

            const verifyRes = await verifyWithRetry(res.data.order_id);
            if (verifyRes?.data?.success) {
                setPaymentResult(verifyRes.data);
                setQuickServiceData(null);
                setQuickServiceStep("details");
            } else {
                setPaymentResult({ success: false, message: "Payment verification failed." });
            }
        } catch (error) {
            console.error("Quick service payment error:", error);
            toast({
                title: "Payment Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
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
                duration: tab === "new" ? "30" : "",
            }));
        }
    };

    const isQuickServiceActive = activeTab === "quickservice";
    const currentStep = isQuickServiceActive ? quickServiceStep : bookingStep;
    const showPaymentResult = paymentResult !== null;

    return (
        <div ref={bookingRef} className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                    Book Your <span className="text-gradient-gold">Consultation</span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
            </div>

            <div className="bg-gradient-to-br from-background via-background/95 to-primary/5 rounded-2xl border border-primary/20 p-4 md:p-6 shadow-xl">

                {/* ── Top-level tab bar ── */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 pb-3 border-b border-primary/20">
                    <button
                        onClick={() => handleTabChange("new")}
                        className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${activeTab === "new"
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                    >
                        ✨ New Consultation
                    </button>
                    <button
                        onClick={() => handleTabChange("repeat")}
                        className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${activeTab === "repeat"
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                    >
                        🔄 Follow-up Consultation
                    </button>
                    <button
                        onClick={() => handleTabChange("quickservice")}
                        className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                            ${activeTab === "quickservice"
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                    >
                        ⚡ Quick Service
                    </button>
                </div>

                {/* Step indicator — New / Repeat slot step */}
                {!isQuickServiceActive && !showPaymentResult && currentStep === "slot" && (
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                                ✓
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">Basic Info</span>
                        </div>
                        <div className="w-12 h-px bg-primary/30" />
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                2
                            </div>
                            <span className="text-xs text-primary ml-1 font-medium">
                                Select Slot & Pay
                            </span>
                        </div>
                    </div>
                )}

                {/* Step indicator — Quick Service slot step */}
                {isQuickServiceActive && !showPaymentResult && quickServiceStep === "slot" && (
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                                ✓
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">Details</span>
                        </div>
                        <div className="w-12 h-px bg-primary/30" />
                        <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                2
                            </div>
                            <span className="text-xs text-primary ml-1 font-medium">
                                Review & Pay
                            </span>
                        </div>
                    </div>
                )}

                {/* ── Content area ── */}
                {showPaymentResult ? (
                    <BookingStatusScreen
                        paymentResult={paymentResult}
                        selectedService={
                            isQuickServiceActive ? selectedQuickService : selectedService
                        }
                        bookingData={
                            isQuickServiceActive
                                ? {
                                      name: quickServiceData?.fullName,
                                      phone: quickServiceData?.phone,
                                      email: quickServiceData?.email,
                                  }
                                : bookingData
                        }
                        onReset={resetPaymentState}
                        onTryAgain={() => setPaymentResult(null)}
                    />
                ) : (
                    <>
                        {/* Quick Service tab */}
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
                                            </div>
                                            <div className="space-y-2">
                                                <p>
                                                    <span className="text-muted-foreground">Service:</span>{" "}
                                                    <span className="font-medium text-primary">
                                                        {selectedQuickService?.title}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="text-muted-foreground">Delivery:</span>{" "}
                                                    <span className="font-medium">
                                                        {selectedQuickService?.deliveryTime}
                                                    </span>
                                                </p>
                                                {quickServiceData?.dob && (
                                                    <p>
                                                        <span className="text-muted-foreground">DOB:</span>{" "}
                                                        <span className="font-medium">{quickServiceData.dob}</span>
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

                        {/* New / Repeat Consultation tabs */}
                        {activeTab !== "quickservice" &&
                            (currentStep === "details" ? (
                                <BookingDetailsStep
                                    bookingData={{
                                        ...bookingData,
                                        consultationType: activeTab as "new" | "repeat",
                                    }}
                                    updateBookingData={updateBookingData}
                                    errors={errors}
                                    bookingServices={
                                        activeTab === "new" ? newBookingServices : repeatBookingServices
                                    }
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