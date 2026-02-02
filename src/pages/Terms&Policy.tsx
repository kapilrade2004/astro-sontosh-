import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import {
  Shield, FileText, RefreshCw, AlertCircle,
  CheckCircle, ArrowRight, Scale, Lock
} from "lucide-react";
import { useEffect } from "react";

const TermsAndConditions = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offset = 100; // Adjust based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Legal Policies | Astro Santosh Pandey</title>
        <meta name="description" content="Terms and Conditions, Cancellation & Refund Policy for Astro Santosh Pandey's astrology, numerology, vastu, and palmistry services." />
        <link rel="canonical" href="https://astrosantoshpandey.com/terms" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Legal</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Terms & <span className="text-gradient-gold">Conditions</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
                Please read our terms carefully to understand your rights and responsibilities when using our services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="#terms" className="cosmic-card p-6 text-center group hover:scale-105 transition-transform">
                <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Terms of Use</h3>
                <p className="text-sm text-muted-foreground">Service usage terms</p>
              </a>
              <a href="#cancellation" className="cosmic-card p-6 text-center group hover:scale-105 transition-transform">
                <RefreshCw className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Cancellation Policy</h3>
                <p className="text-sm text-muted-foreground">Refund guidelines</p>
              </a>
              <a href="#jurisdiction" className="cosmic-card p-6 text-center group hover:scale-105 transition-transform">
                <Scale className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Jurisdiction</h3>
                <p className="text-sm text-muted-foreground">Legal governance</p>
              </a>
            </div>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section id="terms" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Terms & <span className="text-gradient-gold">Conditions</span>
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground mb-8">Last updated on 15-01-2026 22:19:27</p>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between <strong>Astro Santosh Pandey</strong> ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
                  </p>

                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/90">
                      By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason.
                    </p>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Key Terms
                    </h3>

                    <div className="space-y-4 pl-7">
                      <div>
                        <h4 className="font-semibold mb-2">Account Registration</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">No Warranty</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Use at Your Own Risk</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Intellectual Property</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents. You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Payment Terms</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          You agree to pay us the charges associated with availing the Services.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Lawful Use</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Third Party Links</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Binding Contract</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Force Majeure</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cancellation & Refund Policy Section */}
        <section id="cancellation" className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <RefreshCw className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Cancellation & <span className="text-gradient-gold">Refund Policy</span>
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground mb-8">Last updated on 15-01-2026 22:20:37</p>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Astro Santosh Pandey's astrological consultations are purely based on the astrological sutras as per the shared birth chart details and other credentials from the respective client's end. All the predictive inputs and remedies are provided purely as an opinion based on the principles of Astrology. Astro Santosh Pandey shall not entertain any dispute on differences arising out of any comparisons with any other service. However, Astro Santosh Pandey shall reply to any customer complaints or feedback within a reasonable time period and clarify any point based on the predictions as made by Astro Santosh Pandey.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    While Astro Santosh Pandey shall try to ensure that all remedial recommendations and predictions are prepared meticulously and with utmost care, Astro Santosh Pandey does not rule out the possibility of any unexpected / human errors. In case of any such errors, Astro Santosh Pandey's liability is limited to the extent of providing revised consultation & suggestions thereafter.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Astro Santosh Pandey is not liable to refund any consultation fee or any other charges considering the nature of service. Also, booked service will always be non-refundable and non-cancellable. However, revised consultation slot shall be provided if requested within 24 hours via email along with the appropriate reason.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Jurisdiction Section */}
        <section id="jurisdiction" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Governing Law & <span className="text-gradient-gold">Jurisdiction</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Governing Law</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Exclusive Jurisdiction</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in <strong>Mumbai, Maharashtra</strong>.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Contact Us</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Have Questions About Our <span className="text-gradient-gold">Terms</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                If you have any questions or concerns about our Terms and Conditions, please don't hesitate to reach out to us.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TermsAndConditions;