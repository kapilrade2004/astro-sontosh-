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
            className="text-center space-y-8 py-8"
        >
            {paymentResult.success ? (
                <>
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif font-bold text-gradient-gold">Booking Confirmed!</h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground text-lg">
                                Your session for <span className="text-primary font-bold">{selectedService?.title}</span> is successfully booked.
                            </p>

                            {/* WhatsApp Notification Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4 shadow-inner"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-base font-bold text-white">
                                        You will be notified on <span className="text-green-500">WhatsApp</span> shortly!
                                    </p>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">
                                    Check your messages for session details
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="max-w-md mx-auto bg-background/40 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 space-y-4 text-left">
                        <div className="flex justify-between border-b border-primary/10 pb-2">
                            <span className="text-muted-foreground text-sm uppercase tracking-wider">Order ID</span>
                            <span className="font-mono text-xs">{paymentResult.order_id}</span>
                        </div>
                        <div className="flex justify-between border-b border-primary/10 pb-2">
                            <span className="text-muted-foreground text-sm uppercase tracking-wider">Amount Paid</span>
                            <span className="font-bold text-primary">₹{paymentResult.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground text-sm uppercase tracking-wider">Customer</span>
                            <span className="text-sm font-medium">{paymentResult.customer_name || bookingData.name}</span>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={onReset}
                            className="px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 glow-gold font-bold"
                        >
                            Book Another Consultation
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = "/"}
                            className="px-8 py-6 rounded-xl border-primary/20"
                        >
                            Go to Home
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info className="w-12 h-12 text-red-500" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif font-bold text-red-500">Payment Failed</h2>
                        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                            {paymentResult.message || "We couldn't process your payment. Please try again or contact support if money was deducted."}
                        </p>
                    </div>
                    <div className="pt-8">
                        <Button
                            onClick={onTryAgain}
                            className="px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 font-bold"
                        >
                            Try Again
                        </Button>
                    </div>
                </>
            )}
        </motion.div>
    );
};
