import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  X,
  Info,
  Sparkles,
  Zap,
} from "lucide-react";
import { createPortal } from "react-dom";
import { format, startOfDay, isAfter } from "date-fns";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendLeadToCRM } from "@/lib/sendLeadToCRM";
import { quickServices, serviceCategories } from "@/data/quickServices";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// ── Collapsible Section ──────────────────────────────────────────
const SectionBlock = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="cosmic-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-bold text-sm uppercase tracking-wider text-foreground text-left">
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary/60 shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-primary/10">
              <div className="pt-4 text-sm text-muted-foreground leading-relaxed">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── DOB Picker ───────────────────────────────────────────────────
const DobPicker = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) => {
  const today = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openCal = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      const calH = 360;
      const below = window.innerHeight - r.bottom;
      const top =
        below >= calH
          ? r.bottom + window.scrollY + 4
          : r.top + window.scrollY - calH - 4;
      const w = Math.min(300, window.innerWidth - 32);
      const left = Math.min(
        r.left + window.scrollX,
        window.innerWidth + window.scrollX - w - 8
      );
      setPos({ top, left, width: w });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-dob-qs]")) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
      setPending(value ? new Date(value) : undefined);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, value]);

  const confirm = () => {
    if (!pending) return;
    onChange(format(pending, "yyyy-MM-dd"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={openCal}
        className={`w-full h-10 px-3 flex items-center justify-between rounded-md border bg-background text-sm transition-colors hover:border-primary/60
          ${error ? "border-red-500" : "border-primary/20"}`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? format(new Date(value), "dd MMM yyyy") : "Select date of birth"}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setPending(undefined);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <CalendarIcon className="w-4 h-4 text-primary/60" />
        </div>
      </button>
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
                <motion.div
                  data-dob-qs
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: pos.top, left: pos.left, width: pos.width, zIndex: 999 }}
                  className="bg-background border border-primary/25 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-2">
                    <Calendar
                      mode="single"
                      selected={pending}
                      onSelect={(d) => {
                        if (!d || isAfter(startOfDay(d), today)) return;
                        setPending(d);
                      }}
                      disabled={(d) => isAfter(startOfDay(d), today)}
                      initialFocus
                    />
                  </div>
                  <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-primary/10 bg-primary/5">
                    <Button type="button" size="sm" variant="outline" className="flex-1 h-9 text-xs border-primary/20" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="button" size="sm" disabled={!pending} className="flex-1 h-9 text-xs bg-primary glow-gold font-bold" onClick={confirm}>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      {pending ? `Confirm ${format(pending, "dd MMM")}` : "Pick a date"}
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────
export const QuickServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const service = quickServices.find((s) => s.slug === slug);

  const [form, setForm] = useState({
    fullName: "", dob: "", timeOfBirth: "",
    question: "", phone: "", email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cashfree, setCashfree] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean; order_id?: string; amount?: number; message?: string;
  } | null>(null);

  useEffect(() => {
    const init = async () => {
      try { setCashfree(await load({ mode: "production" })); }
      catch (e) { console.error("Cashfree init failed", e); }
    };
    init();
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Service not found.</p>
          <Link to="/quick-services">
            <Button variant="outline">← Back to Quick Services</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const catLabel = serviceCategories.find((c) => c.id === service.category);

  const update = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length < 3) e.fullName = "At least 3 characters";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.question.trim()) e.question = "Your question is required";
    else if (form.question.trim().length < 10) e.question = "Please describe in at least 10 characters";
    if (!form.phone) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be 10 digits";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const verifyWithRetry = async (orderId: string, retries = 5, delay = 2500) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await axios.post(`${API_BASE_URL}/verify`, { orderId });
        if (res.data?.success) return res;
      } catch (err) { console.error(`Verify attempt ${i + 1} failed`, err); }
      if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
    }
    return null;
  };

  const handlePay = async () => {
    if (!validate()) {
      toast({ title: "Missing Information", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    if (!cashfree) {
      toast({ title: "System Error", description: "Payment system not ready. Please refresh.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    try {
      await sendLeadToCRM({
        name: form.fullName, phone: form.phone, email: form.email || "",
        source: "Quick Services Form",
        tags: ["Quick Service", service.title, `Delivery: ${service.deliveryTime}`],
      });

      const res = await axios.post(`${API_BASE_URL}/payment`, {
        amount: service.price,
        customer_name: form.fullName,
        customer_phone: form.phone,
        customer_email: form.email || "customer@example.com",
      });

      if (!res.data?.payment_session_id) {
        toast({ title: "Error", description: "Failed to create payment session.", variant: "destructive" });
        return;
      }

      const checkoutResult: any = await cashfree.checkout({
        paymentSessionId: res.data.payment_session_id,
        redirectTarget: "_modal",
      });

      if (checkoutResult?.error) {
        setPaymentResult({ success: false, message: checkoutResult.error.message || "Payment not completed." });
        return;
      }

      const verifyRes = await verifyWithRetry(res.data.order_id);

      if (verifyRes?.data?.success) {
        try {
          await axios.post(`${API_BASE_URL}/quick-service-order`, {
            serviceId: service.id, serviceTitle: service.title,
            price: service.price, deliveryTime: service.deliveryTime,
            fullName: form.fullName, dob: form.dob,
            timeOfBirth: form.timeOfBirth, question: form.question,
            phone: form.phone, email: form.email,
            orderId: res.data.order_id,
            paymentSessionId: res.data.payment_session_id,
          });
        } catch (err) { console.error("Failed to save quick service order", err); }

        setPaymentResult({ success: true, order_id: res.data.order_id, amount: service.price });
      } else {
        setPaymentResult({
          success: false,
          message: `Couldn't verify payment. Contact support with Order ID: ${res.data.order_id}`,
        });
      }
    } catch (err) {
      console.error("Payment error", err);
      toast({ title: "Payment Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Payment Result Screen ──────────────────────────────────────
  if (paymentResult) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full cosmic-card p-8 text-center space-y-6"
          >
            {paymentResult.success ? (
              <>
                <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-bold text-gradient-gold mb-2">Order Confirmed!</h2>
                  <p className="text-muted-foreground text-sm">
                    Your <span className="text-primary font-bold">{service.title}</span> report is being prepared.
                  </p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm font-bold">
                      Expect your answer on <span className="text-green-500">WhatsApp</span> within {service.deliveryTime}!
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Check your WhatsApp messages</p>
                </div>
                <div className="bg-background/40 border border-primary/20 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Order ID</span>
                    <span className="font-mono text-[10px]">{paymentResult.order_id}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-primary">₹{paymentResult.amount?.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Customer</span>
                    <span className="text-xs font-medium">{form.fullName}</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => navigate("/quick-services")} className="border-primary/20 text-sm">More Services</Button>
                  <Button variant="outline" onClick={() => navigate("/")} className="border-primary/20 text-sm">Go Home</Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-500/20 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Info className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-red-400">Payment Failed</h2>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">{paymentResult.message || "Couldn't process your payment."}</p>
                <Button onClick={() => setPaymentResult(null)} className="px-8 bg-primary hover:bg-primary/90 glow-gold font-bold">Try Again</Button>
              </>
            )}
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Main Detail Page ───────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className="relative z-10 flex-1 pt-28 pb-20">
        {/* breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/quick-services" className="hover:text-primary transition-colors">Quick Services</Link>
            <span>/</span>
            <span className="text-primary font-medium truncate">{service.title}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          {/* ── Service Hero ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="cosmic-card p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              {/* icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-primary" />
              </div>

              <div className="flex-1">
                {/* badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">
                    {catLabel?.emoji} {catLabel?.label}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-background border border-primary/15 text-muted-foreground px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Delivered in {service.deliveryTime}
                  </span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-2">
                  {service.title}
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                  {service.shortDescription}
                </p>
              </div>

              {/* price */}
              <div className="md:text-right shrink-0">
                <p className="text-4xl font-bold text-gradient-gold font-serif">
                  ₹{service.price.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">One-time fee</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* ── LEFT: Content Sections ──────────────────────── */}
            <div className="space-y-3">
              <SectionBlock title="Why This Matters" icon={AlertTriangle} defaultOpen>
                <p>{service.problemStatement}</p>
              </SectionBlock>

              <SectionBlock title="When to Use This Service" icon={CheckCircle2} defaultOpen>
                <ul className="space-y-2.5">
                  {service.whenToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-primary mt-0.5 shrink-0 text-xs">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="Benefits of Guidance" icon={Sparkles}>
                <ul className="space-y-2.5">
                  {service.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="Risks of Not Acting" icon={AlertTriangle}>
                <ul className="space-y-2.5">
                  {service.risks.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock title="What You Will Receive" icon={Package} defaultOpen>
                <ul className="space-y-2.5">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* back link */}
              <Link
                to="/quick-services"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Quick Services
              </Link>
            </div>

            {/* ── RIGHT: Sticky Form ───────────────────────────── */}
            <div>
              <div className="sticky top-28">
                <div className="cosmic-card overflow-hidden">
                  {/* form header */}
                  <div className="bg-primary/10 border-b border-primary/15 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-primary">
                        Get Your Answer
                      </h3>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Delivered via WhatsApp in {service.deliveryTime}
                    </p>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label className="text-primary font-medium text-xs">Full Name *</Label>
                      <Input
                        placeholder="Enter your full name"
                        className={`bg-background border-primary/20 h-10 text-sm ${errors.fullName ? "border-red-500" : ""}`}
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                      />
                      {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label className="text-primary font-medium text-xs">Phone Number *</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 bg-primary/10 border border-r-0 border-primary/20 rounded-l-md text-primary font-medium text-xs">
                          +91
                        </span>
                        <Input
                          placeholder="10-digit number"
                          className={`bg-background border-primary/20 h-10 text-sm rounded-l-none ${errors.phone ? "border-red-500" : ""}`}
                          maxLength={10}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label className="text-primary font-medium text-xs">
                        Email{" "}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        className={`bg-background border-primary/20 h-10 text-sm ${errors.email ? "border-red-500" : ""}`}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                      {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                    </div>

                    {/* DOB */}
                    {service.requiresDOB && (
                      <div className="space-y-1.5">
                        <Label className="text-primary font-medium text-xs">Date of Birth *</Label>
                        <DobPicker value={form.dob} onChange={(v) => update("dob", v)} error={errors.dob} />
                      </div>
                    )}

                    {/* Time of Birth */}
                    {service.requiresBirthTime && (
                      <div className="space-y-1.5">
                        <Label className="text-primary font-medium text-xs">
                          Time of Birth{" "}
                          <span className="text-muted-foreground font-normal">(optional)</span>
                        </Label>
                        <Input
                          placeholder="e.g. 10:30 AM (if known)"
                          className="bg-background border-primary/20 h-10 text-sm"
                          value={form.timeOfBirth}
                          onChange={(e) => update("timeOfBirth", e.target.value)}
                        />
                      </div>
                    )}

                    {/* Question */}
                    <div className="space-y-1.5">
                      <Label className="text-primary font-medium text-xs">Your Question *</Label>
                      <Textarea
                        placeholder="Describe your question in detail..."
                        rows={3}
                        className={`bg-background border-primary/20 resize-none text-sm ${errors.question ? "border-red-500" : ""}`}
                        value={form.question}
                        onChange={(e) => update("question", e.target.value)}
                      />
                      {errors.question && <p className="text-red-500 text-[10px]">{errors.question}</p>}
                    </div>

                    {/* Price summary */}
                    <div className="flex items-center justify-between p-3.5 bg-primary/10 border border-primary/20 rounded-2xl">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Total</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-primary/60" />
                          <span className="text-[10px] text-muted-foreground">in {service.deliveryTime}</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gradient-gold font-serif">
                        ₹{service.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Pay Button */}
                    <Button
                      className="w-full h-12 text-base bg-primary hover:bg-primary/90 glow-gold font-bold shadow-lg disabled:opacity-50"
                      disabled={isProcessing}
                      onClick={handlePay}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        `Get Answer · ₹${service.price.toLocaleString("en-IN")}`
                      )}
                    </Button>

                    <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
                      <Info className="w-2.5 h-2.5" />
                      Secure payment · Answer on WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuickServiceDetailPage;