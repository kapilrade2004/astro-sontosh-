import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
    format,
    isBefore,
    startOfToday,
    parse,
    addMinutes
} from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface BookingCalendarProps {
    onSelect: (date: Date | undefined, time: string | null) => void;
    selectedDate?: Date;
    selectedTime?: string | null;
    duration?: string;
}

interface Slot {
    time: string;
    available: boolean;
}

export const BookingCalendar = ({
    onSelect,
    selectedDate: propDate,
    selectedTime: propTime,
    duration = "30",
}: BookingCalendarProps) => {
    const [date, setDate] = useState<Date | undefined>(propDate || new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(
        propTime || null
    );
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSlots = async () => {
            if (date) {
                setIsLoading(true);
                try {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    const res = await axios.get(`${API_BASE_URL}/slots/${formattedDate}`);
                    if (res.data && res.data.success) {
                        setSlots(res.data.slots);
                    } else {
                        setSlots([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch slots:", error);
                    setSlots([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSlots([]);
                setIsLoading(false);
            }
        };

        fetchSlots();
    }, [date]);

    // Recalculate available time slots based on duration
    const timeSlots = useMemo(() => {
        if (!slots.length) return [];

        if (duration === "30") {
            return slots.filter(s => s.available).map(s => s.time);
        } else {
            // Logic for 60 minutes or other durations
            // Assuming slots are ordered.
            // We need to find if current slot AND next slot (30 mins later) are available.
            const availableTimes: string[] = [];

            // Map slots for easy lookup
            const slotMap = new Map<string, boolean>();
            slots.forEach(s => slotMap.set(s.time, s.available));

            slots.forEach(slot => {
                if (!slot.available) return;

                // For 60 mins, we need the slot at time + 30 mins to be available too
                // Assuming slots are in "HH:mm" format.
                const slotTime = parse(slot.time, "HH:mm", new Date());
                const nextSlotTime = addMinutes(slotTime, 30);
                const nextSlotStr = format(nextSlotTime, "HH:mm");

                // Special handling: backend time format might vary, assuming HH:mm or HH:mm:ss
                // The snippet used substring(0, 5) so it's HH:mm

                if (slotMap.get(nextSlotStr)) {
                    availableTimes.push(slot.time);
                }
            });
            return availableTimes;
        }
    }, [slots, duration]);

    useEffect(() => {
        if (selectedTime && !timeSlots.includes(selectedTime) && !isLoading) {
            setSelectedTime(null);
            onSelect(date, null);
        }
    }, [duration, timeSlots, isLoading]);

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        setSelectedTime(null);
        onSelect(newDate, null);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        onSelect(date, time);
    };

    return (
        <div
            className={cn(
                "flex flex-col lg:flex-row gap-2 lg:gap-3",
                "p-2 sm:p-3 lg:p-3",
                "bg-background/60 backdrop-blur-md",
                "rounded-2xl md:rounded-3xl",
                "border border-primary/20 shadow-1xl",
                "max-w-full lg:max-w-xl"
            )}
        >
            {/* DATE SECTION */}
            <div className="flex-1 flex flex-col space-y-2.5 lg:space-y-2.5 max-w-full lg:max-w-[300px]">
                <div className="flex items-center gap-2 text-primary px-1">
                    <CalendarIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <h3 className="font-bold text-sm lg:text-base uppercase tracking-wider">
                        Select Date
                    </h3>
                </div>

                <div className="w-full flex justify-center lg:justify-start">
                    <div className="w-full max-w-full sm:max-w-sm lg:max-w-full">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={(date) => isBefore(date, startOfToday())}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Confirmed Selection Summary */}
                {date && selectedTime && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 rounded-xl border border-primary/20 p-2.5 shadow-inner"
                    >
                        <p className="text-[9px] text-primary/60 uppercase tracking-widest font-bold mb-0.5">
                            Confirmed Selection
                        </p>
                        <div className="flex items-center gap-2.5">
                            <p className="font-serif text-xs text-primary">
                                {format(date, "MMMM do, yyyy")}
                            </p>
                            <div className="w-0.5 h-3.5 bg-primary/20 rounded-full" />
                            <p className="text-sm font-bold text-gradient-gold">
                                {selectedTime}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* TIME SECTION */}
            <div className="w-full lg:w-48 xl:w-56 flex flex-col space-y-2.5 lg:space-y-2.5 border-t lg:border-t-0 lg:border-l border-primary/10 pt-3 lg:pt-0 lg:pl-3 xl:pl-4">
                <div className="flex items-center gap-2 text-primary px-1">
                    <div className="flex items-center gap-2 flex-1">
                        <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                        <h3 className="font-bold text-xs lg:text-sm uppercase tracking-wider">
                            Select Time
                        </h3>
                    </div>
                    {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary/60" />}
                </div>

                {/* Responsive grid: 2 cols on mobile, 3 on small, 1 on large desktop, 2 on wide screens */}
                <div
                    className={cn(
                        "grid gap-2 px-1",
                        "grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2",
                        "max-h-[220px] sm:max-h-[260px] lg:max-h-[340px]",
                        "overflow-y-auto custom-scrollbar"
                    )}
                >
                    {!isLoading && timeSlots.length > 0 ? (
                        timeSlots.map((time) => (
                            <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => handleTimeSelect(time)}
                                className={cn(
                                    "h-10 sm:h-11 text-xs font-semibold rounded-lg",
                                    "transition-all duration-300 border-primary/10",
                                    selectedTime === time
                                        ? "bg-primary text-primary-foreground shadow-lg scale-[1.03] border-primary"
                                        : "hover:border-primary/50 hover:bg-primary/5 active:scale-95 bg-background/20"
                                )}
                            >
                                {time}
                            </Button>
                        ))
                    ) : (
                        <div className="col-span-full py-8 text-center text-xs text-muted-foreground italic">
                            {isLoading ? "Checking availability..." : "No slots available for this date"}
                        </div>
                    )}
                </div>

                {!date && !isLoading && (
                    <p className="text-xs text-muted-foreground text-center italic py-2">
                        Please select a date first
                    </p>
                )}
            </div>
        </div>
    );
};
