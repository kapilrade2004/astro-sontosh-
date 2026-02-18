import { motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingStatusScreenProps {
    paymentResult: {
        success: boolean;
        order_id?: string;
        amount?: number;
        currency?: string;
        customer_name?: string;
        customer_phone?: string;
        customer_email?: string;
        payment_status?: string;
        message?: string;
    };
    selectedService: any;
    bookingData: any;
    onReset: () => void;
    onTryAgain: () => void;
}

export const BookingStatusScreen = ({
    paymentResult,
    selectedService,
    bookingData,
    onReset,
    onTryAgain
}: BookingStatusScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 md:space-y-6 py-4 md:py-6"
        >
            {paymentResult.success ? (
                <>
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold">Booking Confirmed!</h2>
                        <div className="space-y-3">
                            <p className="text-muted-foreground text-sm md:text-base">
                                Your session for <span className="text-primary font-bold">{selectedService?.title}</span> is successfully booked.
                            </p>

                            {/* WhatsApp Notification Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/5 border border-green-500/20 rounded-2xl p-3 shadow-inner max-w-sm mx-auto"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-sm font-bold text-white">
                                        You will be notified on <span className="text-green-500">WhatsApp</span> shortly!
                                    </p>
                                </div>
                                <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter">
                                    Check your messages for session details
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="max-w-sm mx-auto bg-background/40 backdrop-blur-sm rounded-2xl p-4 border border-primary/20 space-y-3 text-left shadow-lg">
                        <div className="flex justify-between border-b border-primary/10 pb-1.5">
                            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Order ID</span>
                            <span className="font-mono text-[10px]">{paymentResult.order_id}</span>
                        </div>
                        <div className="flex justify-between border-b border-primary/10 pb-1.5">
                            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Amount Paid</span>
                            <span className="font-bold text-primary text-sm">₹{paymentResult.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Customer</span>
                            <span className="text-xs font-medium">{paymentResult.customer_name || bookingData.name}</span>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">

                        <Button
                            variant="outline"
                            onClick={() => window.location.href = "/"}
                            className="px-6 py-2.5 h-auto rounded-xl border-primary/20 text-sm"
                        >
                            Go to Home
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Info className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-serif font-bold text-red-500">Payment Failed</h2>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                            {paymentResult.message || "We couldn't process your payment. Please try again."}
                        </p>
                    </div>
                    <div className="pt-6">
                        <Button
                            onClick={onTryAgain}
                            className="px-8 py-3 h-auto rounded-xl bg-primary hover:bg-primary/90 font-bold"
                        >
                            Try Again
                        </Button>
                    </div>
                </>
            )}
        </motion.div>
    );
};
