import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, Sparkles, UserCheck, User, Calendar,
  ArrowRight, ArrowLeft, ChevronRight, UserCircle, Hand
} from "lucide-react";

import CalendlyEmbed from "@/components/calendly";
import ServicePricingChart from "@/components/booking/ServicePricingChart";



// Services are now defined in bookingServices for the flow.

const bookingServices = [
  {
    id: "astrology",
    title: "Astrology Consultation",
    description: "Personalized birth chart analysis. Consultation within 24 hours.",
    price: 2100,
    icon: Sparkles,
  },
  {
    id: "numerology",
    title: "Numerology Analysis",
    description: "Discover the hidden meaning of numbers in your life.",
    price: 2100,
    icon: User,
  },
  {
    id: "vastu",
    title: "Vastu Consultation",
    description: "Align your living or workspace with cosmic energy.",
    price: 5100,
    icon: MapPin,
  },
  {
    id: "premium-kundli",
    title: "Premium Kundli",
    description: "Detailed life analysis and comprehensive horoscope report.",
    price: 2100,
    icon: UserCheck,
  },
  
];


const Contact = () => {
  const [bookingStep, setBookingStep] = useState<"details" | "slot">("details");
  const [bookingData, setBookingData] = useState({
    consultationType: "new" as "new" | "repeat",
    name: "",
    email: "",
    dob: "",
    phone: "",
    serviceId: "astrology",
    btr: "without" as "with" | "without",
    gender: "",
    place: "Mumbai",
    concern: "",
    // Vastu specific fields
    areaDimension: "",
    floorPlan: "" as any,
    propertyLocation: "",
    timeOfBirth: "",
  });

  const { toast } = useToast();

  return (
    <>
      <Helmet>
        <title>Contact Us - Book Your Consultation | Astro Santosh Pandey</title>
        <meta name="description" content="Contact Astro Santosh Pandey for expert astrology, numerology, vastu, and palmistry consultations. Book your personalized session today." />
        <link rel="canonical" href="https://astrosantoshpandey.com/contact" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Seek Clarity.<span className="text-gradient-gold"> Align with Dharma.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Ready to unlock the secrets of your destiny? Reach out to us for a personalized
                consultation and take the first step towards clarity and success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        

        {/* Booking Section */}
        <section className="py-20 bg-background relative" id="booking">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-center">
                Book Your <span className="text-gradient-gold">Consultation</span>
              </h2>
              <div className="w-24 h-1 bg-primary rounded-full mb-8" />

              {/* Step Progress Bar */}
              <div className="flex items-center justify-center w-full max-w-md mx-auto relative mb-12">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
                {[
                  { id: "details", label: "Basic Info" },
                  { id: "slot", label: "Select Slot & Pay" }
                ].map((step, i) => (
                  <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${bookingStep === step.id || (bookingStep === "slot" && i === 0)
                      ? "bg-primary border-primary text-primary-foreground shadow-glow-primary scale-110"
                      : "bg-background border-muted text-muted-foreground"
                      }`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm mt-3 font-semibold transition-colors duration-300 ${bookingStep === step.id ? "text-primary" : "text-muted-foreground"
                      }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cosmic-card p-6 md:p-12 overflow-hidden bg-muted/30 backdrop-blur-sm">
              {bookingStep === "details" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Consultation Type Toggle */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                    <Button
                      variant={bookingData.consultationType === "new" ? "default" : "outline"}
                      className={`rounded-full px-6 py-2 transition-all ${bookingData.consultationType === "new" ? "glow-gold" : ""}`}
                      onClick={() => setBookingData(prev => ({ ...prev, consultationType: "new" }))}
                    >
                      New Consultation
                    </Button>
                    <Button
                      variant={bookingData.consultationType === "repeat" ? "default" : "outline"}
                      className={`rounded-full px-6 py-2 transition-all ${bookingData.consultationType === "repeat" ? "glow-gold" : ""}`}
                      onClick={() => setBookingData(prev => ({ ...prev, consultationType: "repeat" }))}
                    >
                      Repeat Consultation
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-primary font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        className="bg-background border-primary/20 focus:border-primary h-12"
                        value={bookingData.name}
                        onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="bg-background border-primary/20 focus:border-primary h-12"
                        value={bookingData.email}
                        onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-primary font-medium">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        className="bg-background border-primary/20 focus:border-primary h-12 text-white
    [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:opacity-100"
                        value={bookingData.dob}
                        onChange={(e) => setBookingData(prev => ({ ...prev, dob: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary font-medium">Mobile Number *</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium">+91</span>
                        <Input
                          id="phone"
                          placeholder="Phone number"
                          className="bg-background border-primary/20 focus:border-primary h-12 rounded-l-none"
                          maxLength={10}
                          value={bookingData.phone}
                          onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, "") }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-primary font-medium">Service Request *</Label>
                      <Select
                        value={bookingData.serviceId}
                        onValueChange={(val) => setBookingData(prev => ({ ...prev, serviceId: val }))}
                      >
                        <SelectTrigger className="bg-background border-primary/20 h-12">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {bookingServices.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* BTR Selection - Only for Astrology */}
                  {bookingData.serviceId === "astrology" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${bookingData.btr === "with"
                          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-background/50 border-primary/10 hover:border-primary/30"
                          }`}
                        onClick={() => setBookingData(prev => ({ ...prev, btr: "with" }))}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bookingData.btr === "with" ? "border-primary" : "border-muted-foreground"}`}>
                            {bookingData.btr === "with" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                          <span className="font-bold text-primary">With BTR</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Consultation within 24 hours. Select this service only if you know your exact birth time.
                        </p>
                      </div>

                      <div
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${bookingData.btr === "without"
                          ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-background/50 border-primary/10 hover:border-primary/30"
                          }`}
                        onClick={() => setBookingData(prev => ({ ...prev, btr: "without" }))}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bookingData.btr === "without" ? "border-primary" : "border-muted-foreground"}`}>
                            {bookingData.btr === "without" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                          <span className="font-bold text-primary">Without BTR</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Consultation within 24 hours. Select this service if you do not know the exact birth time for eg - birth time could be btw 1 pm to 2 pm. ( Time range should not be greater then 1 hours )
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end pt-8">
                    <Button
                      size="lg"
                      className="px-12 py-6 text-lg bg-primary hover:bg-primary/90 glow-gold font-bold"
                      onClick={() => {
                        if (bookingData.name && bookingData.dob && bookingData.phone) {
                          setBookingStep("slot");
                        } else {
                          toast({ title: "Required Fields", description: "Please fill in all mandatory fields.", variant: "destructive" });
                        }
                      }}
                    >
                      Next Step <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {bookingStep === "slot" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side: Calendly */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-xl uppercase tracking-wider">Select Date & Time for booking</h3>
                      </div>
                      <div className="bg-background rounded-2xl border border-primary/20 overflow-hidden min-h-[600px] w-full">
                        <CalendlyEmbed height="w-full h-800px" />
                      </div>
                      <ServicePricingChart />

                    </div>

                    {/* Right Side: Additional Details */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-primary font-medium">Gender</Label>
                          <Select
                            value={bookingData.gender}
                            onValueChange={(val) => setBookingData(prev => ({ ...prev, gender: val }))}
                          >
                            <SelectTrigger className="bg-background border-primary/20 h-12">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-primary font-medium">Place of Birth</Label>
                          <Input
                            placeholder="Enter Place of Birth"
                            className="bg-background border-primary/20 h-12"
                            value={bookingData.place}
                            onChange={(e) => setBookingData(prev => ({ ...prev, place: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Time of Birth is required for Astrology and Numerology according to mockup table */}
                      {(bookingData.serviceId === "astrology" || bookingData.serviceId === "numerology" || bookingData.serviceId === "premium-kundli") && (
                        <div className="space-y-2">
                          <Label className="text-primary font-medium">Time of Birth</Label>
                          <Input
                            type="time"
                            className="bg-background border-primary/20 h-12 text-white
    [&::-webkit-calendar-picker-indicator]:invert
    [&::-webkit-calendar-picker-indicator]:opacity-100"
                            value={bookingData.timeOfBirth}
                            onChange={(e) => setBookingData(prev => ({ ...prev, timeOfBirth: e.target.value }))}
                          />
                        </div>
                      )}

                      {/* Vastu Specific Fields */}
                      {bookingData.serviceId === "vastu" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label className="text-primary font-medium">Area Dimension (Length and Width)</Label>
                            <Input
                              placeholder="e.g. 20x40 ft"
                              className="bg-background border-primary/20 h-12"
                              value={bookingData.areaDimension}
                              onChange={(e) => setBookingData(prev => ({ ...prev, areaDimension: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-primary font-medium">Property Location</Label>
                            <Input
                              placeholder="Nearest City / Area"
                              className="bg-background border-primary/20 h-12"
                              value={bookingData.propertyLocation}
                              onChange={(e) => setBookingData(prev => ({ ...prev, propertyLocation: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-primary font-medium">Upload Floor Plan / House Map</Label>
                            <Input
                              type="file"
                              className="bg-background border-primary/20 h-12 py-2"
                              onChange={(e) => setBookingData(prev => ({ ...prev, floorPlan: e.target.files?.[0] }))}
                            />
                          </div>
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <Label className="text-primary font-medium">Please write your Detail Concern</Label>
                        <Textarea
                          placeholder="Your questions or details..."
                          rows={4}
                          className="bg-background border-primary/20 resize-none py-3"
                          value={bookingData.concern}
                          onChange={(e) => setBookingData(prev => ({ ...prev, concern: e.target.value }))}
                        />
                      </div>

                      {/* Pricing and Payment */}
                      <div className="pt-8 space-y-6 border-t border-primary/20">
                        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Charges for {bookingServices.find(s => s.id === bookingData.serviceId)?.title}</p>
                            <p className="text-xs text-muted-foreground">as per selection</p>
                          </div>
                          <div className="text-1xl font-bold text-primary">
                            {bookingData.serviceId === "palmistry" ? "NA" : `₹${bookingServices.find(s => s.id === bookingData.serviceId)?.price} rs`}
                          </div>

                        </div>

                        <div className="text-center space-y-4">
                          <p className="text-sm text-primary font-medium"></p>
                          <div className="p-3 bg-muted rounded-lg font-mono text-sm border border-border">
                            pandeysantoshr@okaxis
                          </div>
                          <Button
                            className="w-full h-16 text-xl bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg"
                            onClick={() => {
                              toast({
                                title: "Payment Initiated",
                                description: "Redirecting to payment gateway...",
                              });
                            }}
                          >
                            Pay Now to Confirm booking
                          </Button>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">

                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <Button variant="ghost" onClick={() => setBookingStep("details")} className="gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back to Basic Info
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Find Us <span className="text-gradient-gold">Here</span>
              </h2>
            </motion.div>

            <div className="cosmic-card p-4 overflow-hidden">
              <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.8540385436492!2d72.82847882645552!3d18.94594651100226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf8a16f0fdf1%3A0xee0367f86d8c755b!2sAstro%20Santosh%20Pandey!5e0!3m2!1sen!2sin!4v1769161595874!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground mb-2">
                  Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
                </p>
                <Button
                  variant="link"
                  className="text-primary"
                  asChild
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Princess+Street+Marine+Lines+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout >
    </>
  );
};

export default Contact;
