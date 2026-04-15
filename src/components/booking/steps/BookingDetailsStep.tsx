

// import { useState, useRef, useEffect, useCallback } from "react";
// import { createPortal } from "react-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, CalendarIcon, CheckCircle2, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { format, startOfDay, isAfter } from "date-fns";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// interface BookingDetailsStepProps {
//     bookingData: any;
//     updateBookingData: (updates: any) => void;
//     errors: Record<string, string>;
//     bookingServices: any[];
//     onNext: () => void;
// }

// export const BookingDetailsStep = ({
//     bookingData,
//     updateBookingData,
//     errors,
//     bookingServices,
//     onNext,
// }: BookingDetailsStepProps) => {
//     const today = startOfDay(new Date());

//     const [calendarOpen, setCalendarOpen] = useState(false);
//     const [pendingDate, setPendingDate] = useState<Date | undefined>(
//         bookingData.dob ? new Date(bookingData.dob) : undefined
//     );
//     // Position of the calendar dropdown relative to viewport
//     const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0, width: 0 });

//     const triggerRef = useRef<HTMLButtonElement>(null);

//     // Compute and store the position every time the calendar opens
//     const openCalendar = useCallback(() => {
//         if (triggerRef.current) {
//             const rect = triggerRef.current.getBoundingClientRect();
//             const calendarHeight = 380;
//             const spaceBelow = window.innerHeight - rect.bottom;
//             const top =
//                 spaceBelow >= calendarHeight
//                     ? rect.bottom + window.scrollY + 4   // open below
//                     : rect.top + window.scrollY - calendarHeight - 4; // open above

//             // On mobile center it; on desktop align to trigger
//             const isMobile = window.innerWidth < 640;
//             const calWidth = Math.min(320, window.innerWidth - 32);
//             const left = isMobile
//                 ? (window.innerWidth - calWidth) / 2
//                 : Math.min(
//                     rect.left + window.scrollX,
//                     window.innerWidth + window.scrollX - calWidth - 8
//                   );

//             setCalendarPos({ top, left, width: calWidth });
//         }
//         setCalendarOpen(true);
//     }, []);

//     // Close on outside click
//     useEffect(() => {
//         if (!calendarOpen) return;
//         const handleOutside = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             // Ignore clicks inside the calendar portal
//             if (target.closest("[data-dob-calendar]")) return;
//             if (triggerRef.current?.contains(target)) return;
//             setCalendarOpen(false);
//             setPendingDate(bookingData.dob ? new Date(bookingData.dob) : undefined);
//         };
//         document.addEventListener("mousedown", handleOutside);
//         return () => document.removeEventListener("mousedown", handleOutside);
//     }, [calendarOpen, bookingData.dob]);

//     // Recompute position on scroll/resize
//     useEffect(() => {
//         if (!calendarOpen) return;
//         const update = () => openCalendar();
//         window.addEventListener("scroll", update, true);
//         window.addEventListener("resize", update);
//         return () => {
//             window.removeEventListener("scroll", update, true);
//             window.removeEventListener("resize", update);
//         };
//     }, [calendarOpen, openCalendar]);

//     const handleDobSelect = (date: Date | undefined) => {
//         if (!date || isAfter(startOfDay(date), today)) return;
//         setPendingDate(date);
//     };

//     const handleConfirm = () => {
//         if (!pendingDate) return;
//         updateBookingData({ dob: format(pendingDate, "yyyy-MM-dd") });
//         setCalendarOpen(false);
//     };

//     const handleCancel = () => {
//         setPendingDate(bookingData.dob ? new Date(bookingData.dob) : undefined);
//         setCalendarOpen(false);
//     };

//     const handleClear = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setPendingDate(undefined);
//         updateBookingData({ dob: "" });
//     };

//     const confirmedDob = bookingData.dob || "";
//     const dobError = errors.dob;

//     // Calendar portal content
//     const calendarPortal = (
//         <AnimatePresence>
//             {calendarOpen && (
//                 <>
//                     {/* Invisible full-screen backdrop */}
//                     <div className="fixed inset-0 z-[998]" onClick={handleCancel} />

//                     {/* Calendar panel — absolutely positioned via JS coords */}
//                     <motion.div
//                         data-dob-calendar
//                         initial={{ opacity: 0, y: -6, scale: 0.97 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -6, scale: 0.97 }}
//                         transition={{ duration: 0.18, ease: "easeOut" }}
//                         style={{
//                             position: "absolute",
//                             top: calendarPos.top,
//                             left: calendarPos.left,
//                             width: calendarPos.width,
//                             zIndex: 999,
//                         }}
//                         className="bg-background border border-primary/25 rounded-2xl shadow-2xl overflow-hidden"
//                     >
//                         {/* Month header + date grid */}
//                         <div className="p-2">
//                             <Calendar
//                                 mode="single"
//                                 selected={pendingDate}
//                                 onSelect={handleDobSelect}
//                                 disabled={(date) => isAfter(startOfDay(date), today)}
//                                 initialFocus
//                                 className="w-full"
//                             />
//                         </div>

//                         {/* ── Confirm / Cancel buttons ── */}
//                         <div className="flex items-center gap-2 px-3 pb-3 pt-1 border-t border-primary/10 bg-primary/5">
//                             <Button
//                                 type="button"
//                                 size="sm"
//                                 variant="outline"
//                                 className="flex-1 h-9 text-xs border-primary/20 text-muted-foreground hover:text-foreground"
//                                 onClick={handleCancel}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 type="button"
//                                 size="sm"
//                                 disabled={!pendingDate}
//                                 className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 glow-gold font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
//                                 onClick={handleConfirm}
//                             >
//                                 <CheckCircle2 className="w-3.5 h-3.5" />
//                                 {pendingDate
//                                     ? `Confirm ${format(pendingDate, "dd MMM yyyy")}`
//                                     : "Pick a date"}
//                             </Button>
//                         </div>
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-4 md:space-y-6"
//         >
//             {/* Consultation Type Toggle */}
//             <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
//                 <Button
//                     variant={bookingData.consultationType === "new" ? "default" : "outline"}
//                     className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${
//                         bookingData.consultationType === "new" ? "glow-gold" : ""
//                     }`}
//                     onClick={() => updateBookingData({ consultationType: "new" })}
//                 >
//                     New Consultation
//                 </Button>
//                 <Button
//                     variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
//                     className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${
//                         bookingData.consultationType === "repeat" ? "glow-gold" : ""
//                     }`}
//                     onClick={() => updateBookingData({ consultationType: "repeat" })}
//                 >
//                     Follow-up Consultation
//                 </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Full Name */}
//                 <div className="space-y-1.5">
//                     <Label htmlFor="name" className="text-primary font-medium text-xs">
//                         Full Name *
//                     </Label>
//                     <Input
//                         id="name"
//                         placeholder="Enter full name"
//                         className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${
//                             errors.name ? "border-red-500 focus:border-red-500" : ""
//                         }`}
//                         value={bookingData.name}
//                         onChange={(e) => updateBookingData({ name: e.target.value })}
//                     />
//                     {errors.name && (
//                         <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>
//                     )}
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-1.5">
//                     <Label htmlFor="email" className="text-primary font-medium text-xs">
//                         Email Address
//                     </Label>
//                     <Input
//                         id="email"
//                         type="email"
//                         placeholder="email@example.com"
//                         className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${
//                             errors.email ? "border-red-500 focus:border-red-500" : ""
//                         }`}
//                         value={bookingData.email}
//                         onChange={(e) => updateBookingData({ email: e.target.value })}
//                     />
//                     {errors.email && (
//                         <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
//                     )}
//                 </div>

//                 {/* ── Date of Birth ── */}
//                 <div className="space-y-1.5">
//                     <Label className="text-primary font-medium text-xs">
//                         Date of Birth *
//                     </Label>

//                     {/* Trigger button — styled like an input */}
//                     <button
//                         ref={triggerRef}
//                         type="button"
//                         onClick={openCalendar}
//                         className={`w-full h-10 px-3 flex items-center justify-between gap-2 rounded-md border bg-background text-sm transition-colors
//                             hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30
//                             ${dobError ? "border-red-500" : "border-primary/20"}`}
//                     >
//                         <span className={confirmedDob ? "text-foreground" : "text-muted-foreground"}>
//                             {confirmedDob
//                                 ? format(new Date(confirmedDob), "dd MMM yyyy")
//                                 : "Select date of birth"}
//                         </span>
//                         <div className="flex items-center gap-1.5 shrink-0">
//                             {confirmedDob && (
//                                 <span
//                                     role="button"
//                                     tabIndex={0}
//                                     onClick={handleClear}
//                                     className="text-muted-foreground hover:text-destructive transition-colors"
//                                 >
//                                     <X className="w-3.5 h-3.5" />
//                                 </span>
//                             )}
//                             <CalendarIcon className="w-4 h-4 text-primary/60" />
//                         </div>
//                     </button>

//                     {dobError && (
//                         <p className="text-red-500 text-[10px] mt-1 leading-snug">{dobError}</p>
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Number + Service */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1.5">
//                     <Label htmlFor="phone" className="text-primary font-medium text-xs">
//                         Mobile Number *
//                     </Label>
//                     <div className="flex">
//                         <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs">
//                             +91
//                         </span>
//                         <Input
//                             id="phone"
//                             placeholder="Phone number"
//                             className={`bg-background border-primary/20 focus:border-primary h-10 text-sm rounded-l-none ${
//                                 errors.phone ? "border-red-500 focus:border-red-500" : ""
//                             }`}
//                             maxLength={10}
//                             value={bookingData.phone}
//                             onChange={(e) =>
//                                 updateBookingData({ phone: e.target.value.replace(/\D/g, "") })
//                             }
//                         />
//                     </div>
//                     {errors.phone && (
//                         <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>
//                     )}
//                 </div>

//                 <div className="space-y-1.5">
//                     <Label htmlFor="service" className="text-primary font-medium text-xs">
//                         Service Request *
//                     </Label>
//                     <Select
//                         value={bookingData.serviceId}
//                         onValueChange={(val) => updateBookingData({ serviceId: val })}
//                     >
//                         <SelectTrigger
//                             className={`bg-background border-primary/20 h-10 text-sm ${
//                                 errors.serviceId ? "border-red-500 focus:border-red-500" : ""
//                             }`}
//                         >
//                             <SelectValue placeholder="Select service" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {bookingServices.map((s) => (
//                                 <SelectItem key={s.id} value={s.id}>
//                                     {s.title}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>

//             <div className="flex justify-end pt-2">
//                 <Button
//                     size="lg"
//                     className="px-8 py-3 h-auto text-base bg-primary hover:bg-primary/90 glow-gold font-bold"
//                     onClick={onNext}
//                 >
//                     Next Step <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//             </div>

//             {/* Calendar rendered into document.body via portal — never clips or overlaps form */}
//             {typeof document !== "undefined" && createPortal(calendarPortal, document.body)}
//         </motion.div>
//     );
// };


//testing 





import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarIcon, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfDay, isAfter } from "date-fns";
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
    onNext,
}: BookingDetailsStepProps) => {
    const today = startOfDay(new Date());

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [pendingDate, setPendingDate] = useState<Date | undefined>(
        bookingData.dob ? new Date(bookingData.dob) : undefined
    );
    const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0, width: 0 });

    // ── Name validation state (local to this step) ──────────────
    const [nameError, setNameError] = useState("");

    const triggerRef = useRef<HTMLButtonElement>(null);

    const validateName = (value: string): string => {
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 3) return "Name must be at least 3 characters.";
        if (!/^[a-zA-Z\s]+$/.test(value.trim()))
            return "Name can only contain letters and spaces.";
        return "";
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        updateBookingData({ name: value });
        setNameError(validateName(value));
    };

    // Combine local nameError with parent errors.name (parent runs on Next click)
    const displayNameError = nameError || errors.name;

    // Compute and store the position every time the calendar opens
    const openCalendar = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const calendarHeight = 380;
            const spaceBelow = window.innerHeight - rect.bottom;
            const top =
                spaceBelow >= calendarHeight
                    ? rect.bottom + window.scrollY + 4
                    : rect.top + window.scrollY - calendarHeight - 4;

            const isMobile = window.innerWidth < 640;
            const calWidth = Math.min(320, window.innerWidth - 32);
            const left = isMobile
                ? (window.innerWidth - calWidth) / 2
                : Math.min(
                    rect.left + window.scrollX,
                    window.innerWidth + window.scrollX - calWidth - 8
                  );

            setCalendarPos({ top, left, width: calWidth });
        }
        setCalendarOpen(true);
    }, []);

    // Close on outside click
    useEffect(() => {
        if (!calendarOpen) return;
        const handleOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-dob-calendar]")) return;
            if (triggerRef.current?.contains(target)) return;
            setCalendarOpen(false);
            setPendingDate(bookingData.dob ? new Date(bookingData.dob) : undefined);
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [calendarOpen, bookingData.dob]);

    // Recompute position on scroll/resize
    useEffect(() => {
        if (!calendarOpen) return;
        const update = () => openCalendar();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [calendarOpen, openCalendar]);

    const handleDobSelect = (date: Date | undefined) => {
        if (!date || isAfter(startOfDay(date), today)) return;
        setPendingDate(date);
    };

    const handleConfirm = () => {
        if (!pendingDate) return;
        updateBookingData({ dob: format(pendingDate, "yyyy-MM-dd") });
        setCalendarOpen(false);
    };

    const handleCancel = () => {
        setPendingDate(bookingData.dob ? new Date(bookingData.dob) : undefined);
        setCalendarOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPendingDate(undefined);
        updateBookingData({ dob: "" });
    };

    // ── Run name validation before passing to parent's onNext ──
    const handleNext = () => {
        const err = validateName(bookingData.name);
        setNameError(err);
        if (err) return; // stop here — parent's validateStep1 will catch other fields
        onNext();
    };

    const confirmedDob = bookingData.dob || "";
    const dobError = errors.dob;

    // Calendar portal content
    const calendarPortal = (
        <AnimatePresence>
            {calendarOpen && (
                <>
                    <div className="fixed inset-0 z-[998]" onClick={handleCancel} />
                    <motion.div
                        data-dob-calendar
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            top: calendarPos.top,
                            left: calendarPos.left,
                            width: calendarPos.width,
                            zIndex: 999,
                        }}
                        className="bg-background border border-primary/25 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-2">
                            <Calendar
                                mode="single"
                                selected={pendingDate}
                                onSelect={handleDobSelect}
                                disabled={(date) => isAfter(startOfDay(date), today)}
                                initialFocus
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-3 pb-3 pt-1 border-t border-primary/10 bg-primary/5">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="flex-1 h-9 text-xs border-primary/20 text-muted-foreground hover:text-foreground"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                disabled={!pendingDate}
                                className="flex-1 h-9 text-xs bg-primary hover:bg-primary/90 glow-gold font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                                onClick={handleConfirm}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {pendingDate
                                    ? `Confirm ${format(pendingDate, "dd MMM yyyy")}`
                                    : "Pick a date"}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

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
                    className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${
                        bookingData.consultationType === "new" ? "glow-gold" : ""
                    }`}
                    onClick={() => updateBookingData({ consultationType: "new" })}
                >
                    New Consultation
                </Button>
                <Button
                    variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
                    className={`rounded-full px-5 py-1.5 h-auto text-sm transition-all ${
                        bookingData.consultationType === "repeat" ? "glow-gold" : ""
                    }`}
                    onClick={() => updateBookingData({ consultationType: "repeat" })}
                >
                    Follow-up Consultation
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* ── Full Name with live validation ── */}
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-primary font-medium text-xs">
                        Full Name *
                    </Label>
                    <Input
                        id="name"
                        placeholder="Enter full name"
                        className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${
                            displayNameError ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        value={bookingData.name}
                        onChange={handleNameChange}
                    />
                    {displayNameError && (
                        <p className="text-red-500 text-[10px] mt-1">{displayNameError}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-primary font-medium text-xs">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className={`bg-background border-primary/20 focus:border-primary h-10 text-sm ${
                            errors.email ? "border-red-500 focus:border-red-500" : ""
                        }`}
                        value={bookingData.email}
                        onChange={(e) => updateBookingData({ email: e.target.value })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
                    )}
                </div>

                {/* ── Date of Birth ── */}
                <div className="space-y-1.5">
                    <Label className="text-primary font-medium text-xs">
                        Date of Birth *
                    </Label>
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={openCalendar}
                        className={`w-full h-10 px-3 flex items-center justify-between gap-2 rounded-md border bg-background text-sm transition-colors
                            hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30
                            ${dobError ? "border-red-500" : "border-primary/20"}`}
                    >
                        <span className={confirmedDob ? "text-foreground" : "text-muted-foreground"}>
                            {confirmedDob
                                ? format(new Date(confirmedDob), "dd MMM yyyy")
                                : "Select date of birth"}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {confirmedDob && (
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleClear}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </span>
                            )}
                            <CalendarIcon className="w-4 h-4 text-primary/60" />
                        </div>
                    </button>
                    {dobError && (
                        <p className="text-red-500 text-[10px] mt-1 leading-snug">{dobError}</p>
                    )}
                </div>
            </div>

            {/* Mobile Number + Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-primary font-medium text-xs">
                        Mobile Number *
                    </Label>
                    <div className="flex">
                        <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs">
                            +91
                        </span>
                        <Input
                            id="phone"
                            placeholder="Phone number"
                            className={`bg-background border-primary/20 focus:border-primary h-10 text-sm rounded-l-none ${
                                errors.phone ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            maxLength={10}
                            value={bookingData.phone}
                            onChange={(e) =>
                                updateBookingData({ phone: e.target.value.replace(/\D/g, "") })
                            }
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="service" className="text-primary font-medium text-xs">
                        Service Request *
                    </Label>
                    <Select
                        value={bookingData.serviceId}
                        onValueChange={(val) => updateBookingData({ serviceId: val })}
                    >
                        <SelectTrigger
                            className={`bg-background border-primary/20 h-10 text-sm ${
                                errors.serviceId ? "border-red-500 focus:border-red-500" : ""
                            }`}
                        >
                            <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                            {bookingServices.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                    {s.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <Button
                    size="lg"
                    className="px-8 py-3 h-auto text-base bg-primary hover:bg-primary/90 glow-gold font-bold"
                    onClick={handleNext}
                >
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>

            {typeof document !== "undefined" && createPortal(calendarPortal, document.body)}
        </motion.div>
    );
};