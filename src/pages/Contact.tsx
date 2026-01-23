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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, Sparkles
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Santosh R Pandey",
      "Address - Kalbadevi, Princess Street, Marine Lines, Mumbai"
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 88797 31174"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [" connect@astrosantoshpandey.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Saturday", "10:00 AM - 7:00 PM", "Sunday: By Appointment"],
  },
];

const services = [
  "Astrology Consultation",
  "Numerology Analysis",
  "Vastu Consultation",
  "Palmistry Reading",
  "Career Guidance",
  "Marriage Matchmaking",
  "Health Analysis",
  "Business Consultation",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-numeric
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setIsSubmitting(false);
  };

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
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cosmic-card p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  Book Your <span className="text-gradient-gold">Consultation</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours to schedule
                  your personalized consultation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-muted border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        className="bg-muted border-border"
                      />

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Required *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="bg-muted border-border">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements, preferred date/time, or any specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="bg-muted border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* WhatsApp & Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Quick WhatsApp Card */}
                <div className="cosmic-card p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-[#25D366]" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">Prefer WhatsApp?</h3>
                  <p className="text-muted-foreground mb-6">
                    Get quick responses and instant consultation booking through WhatsApp.
                    We're available 7 days a week.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                    asChild
                  >
                    <a href="https://wa.me/+918879731174" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Now
                    </a>
                  </Button>
                </div>

                {/* Quick Call Card */}
                <div className="cosmic-card p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">Call Directly</h3>
                  <p className="text-muted-foreground mb-6">
                    Speak with us directly for urgent consultations or immediate guidance.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href="tel:+918879731174">
                      <Phone className="w-5 h-5 mr-2" />
                      +91 8879731174
                    </a>
                  </Button>
                </div>

                {/* What to Expect */}
                <div className="cosmic-card p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="font-serif text-xl font-semibold">What to Expect</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">1.</span>
                      <span>Response within 24 hours with available slots</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">2.</span>
                      <span>Pre-consultation questionnaire for accurate analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">3.</span>
                      <span>45-60 minute detailed consultation session</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">4.</span>
                      <span>Written summary with predictions and remedies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">5.</span>
                      <span>Follow-up support for 30 days post-consultation</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
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
              <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Address - Kalbadevi,Princess Street, Marine Lines, Mumbai
                  </p>
                  <Button
                    variant="link"
                    className="text-primary mt-4"
                    asChild
                  >
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
