import { useState, useMemo, useEffect } from "react";
import { format, addMinutes, isBefore, startOfToday, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingCalendarProps {
    onSelect: (date: Date | undefined, time: string | null) => void;
    selectedDate?: Date;
    selectedTime?: string | null;
    duration?: string; // in minutes
}

export const BookingCalendar = ({ onSelect, selectedDate: propDate, selectedTime: propTime, duration = "30" }: BookingCalendarProps) => {
    const [date, setDate] = useState<Date | undefined>(propDate || new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(propTime || null);

    const timeSlots = useMemo(() => {
        const slots: string[] = [];
        const startHour = 10;
        const endHour = 19;
        const slotDuration = parseInt(duration);

        let currentTime = setMinutes(setHours(new Date(), startHour), 0);
        const endTime = setMinutes(setHours(new Date(), endHour), 0);

        while (isBefore(addMinutes(currentTime, slotDuration), endTime) || addMinutes(currentTime, slotDuration).getTime() === endTime.getTime()) {
            slots.push(format(currentTime, "hh:mm a"));
            currentTime = addMinutes(currentTime, slotDuration);
        }

        return slots;
    }, [duration]);

    // Reset selected time if duration changes and current selection is no longer valid
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
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 p-3 sm:p-4 md:p-6 bg-background/50 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-primary/20">
            {/* Date Selection Section */}
            <div className="flex-1 flex flex-col space-y-4 w-full">
                <div className="flex items-center gap-2 text-primary px-1">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <h3 className="font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider">
                        Select Date
                    </h3>
                </div>

                <div className="w-full flex justify-center lg:justify-start">
                    <div className="w-full max-w-[320px] sm:max-w-sm">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            className="rounded-xl border border-primary/10 bg-background/40 shadow-inner w-full [&_.rdp-day]:text-xs sm:[&_.rdp-day]:text-sm"
                            disabled={(date) => isBefore(date, startOfToday())}
                        />
                    </div>
                </div>

                {/* Summary moved under calendar */}
                {date && selectedTime && (
                    <div className="w-full max-w-[320px] sm:max-w-sm mx-auto lg:mx-0">
                        <div className="p-3 sm:p-4 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
                            <p className="text-[9px] sm:text-[10px] text-primary/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mb-1">
                                Confirmed Selection
                            </p>
                            <p className="font-serif text-sm sm:text-base text-primary">
                                {format(date, "MMMM do, yyyy")}
                            </p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-gold mt-1">
                                {selectedTime}
                            </p>
                            <p className="text-[10px] text-primary/40 mt-1 italic">
                                ({duration} minutes session)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Time Selection Section */}
            <div className="w-full lg:w-72 xl:w-80 space-y-4 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10 pt-6 lg:pt-0 lg:pl-6 xl:pl-8">
                <div className="flex items-center gap-2 text-primary px-1">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <h3 className="font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider">
                        Select Time
                    </h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 max-h-[240px] sm:max-h-[280px] lg:max-h-[360px] overflow-y-auto px-1 custom-scrollbar">
                    {timeSlots.map((time) => (
                        <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={cn(
                                "h-10 sm:h-12 md:h-14 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-lg md:rounded-xl border-primary/10",
                                selectedTime === time
                                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02] border-primary"
                                    : "hover:border-primary/50 hover:bg-primary/5 active:scale-95 backdrop-blur-sm"
                            )}
                            onClick={() => handleTimeSelect(time)}
                        >
                            {time}
                        </Button>
                    ))}
                </div>

                {!date && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center italic px-2">
                        Please choose a date to see available slots
                    </p>
                )}
            </div>
        </div>
    );
};