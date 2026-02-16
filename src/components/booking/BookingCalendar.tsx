import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
    format,
    addMinutes,
    isBefore,
    startOfToday,
    setHours,
    setMinutes,
} from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
    onSelect: (date: Date | undefined, time: string | null) => void;
    selectedDate?: Date;
    selectedTime?: string | null;
    duration?: string;
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

    const timeSlots = useMemo(() => {
        const slots: string[] = [];
        const startHour = 10;
        const endHour = 19;
        const slotDuration = parseInt(duration);

        let currentTime = setMinutes(setHours(new Date(), startHour), 0);
        const endTime = setMinutes(setHours(new Date(), endHour), 0);

        while (
            isBefore(addMinutes(currentTime, slotDuration), endTime) ||
            addMinutes(currentTime, slotDuration).getTime() === endTime.getTime()
        ) {
            slots.push(format(currentTime, "hh:mm a"));
            currentTime = addMinutes(currentTime, slotDuration);
        }

        return slots;
    }, [duration]);

    useEffect(() => {
        if (selectedTime && !timeSlots.includes(selectedTime)) {
            setSelectedTime(null);
            onSelect(date, null);
        }
    }, [duration, timeSlots]);

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        onSelect(newDate, selectedTime);
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
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
                    <h3 className="font-bold text-xs lg:text-sm uppercase tracking-wider">
                        Select Time
                    </h3>
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
                    {timeSlots.map((time) => (
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
                    ))}
                </div>

                {!date && (
                    <p className="text-xs text-muted-foreground text-center italic py-2">
                        Please select a date first
                    </p>
                )}
            </div>
        </div>
    );
};
