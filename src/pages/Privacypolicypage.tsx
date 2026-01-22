import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Shield, Lock, Eye, Database, Users, FileText,
  Mail, AlertCircle, CheckCircle, ArrowRight, Settings,
  UserCheck,
  RefreshCw,
  MapPin
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offset = 100;
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
        <title>Privacy Policy | Astro Santosh Pandey</title>
        <meta name="description" content="Privacy Policy for Astro Santosh Pandey - Learn how we collect, use, and protect your personal information when you use our astrology services." />
        <link rel="canonical" href="https://astrosantoshpandey.com/privacy" />
      </Helmet>
      <Layout>
    
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Legal</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a href="#consent" className="p-6 border border-border rounded-lg text-center group hover:shadow-lg hover:scale-105 transition-all bg-card">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">User Consent</h3>
              <p className="text-sm text-muted-foreground">Your agreement</p>
            </a>
            <a href="#collection" className="p-6 border border-border rounded-lg text-center group hover:shadow-lg hover:scale-105 transition-all bg-card">
              <Database className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Data Collection</h3>
              <p className="text-sm text-muted-foreground">What we collect</p>
            </a>
            <a href="#usage" className="p-6 border border-border rounded-lg text-center group hover:shadow-lg hover:scale-105 transition-all bg-card">
              <Settings className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Data Usage</h3>
              <p className="text-sm text-muted-foreground">How we use it</p>
            </a>
            <a href="#rights" className="p-6 border border-border rounded-lg text-center group hover:shadow-lg hover:scale-105 transition-all bg-card">
              <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Your Rights</h3>
              <p className="text-sm text-muted-foreground">Control your data</p>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  Astro Santosh Pandey ("Astro Santosh Pandey", "We," "Us" or "Our") is committed to ensuring compliance with applicable privacy laws in the countries where our products / services are distributed / delivered. The protection of your personal data is of paramount importance to us. As such, we conduct our business in strict adherence to the data privacy and data security laws applicable in the respective jurisdiction where our products are distributed to you.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy is intended to inform you about the types of personal data we collect from you, how such personal data may be used and disclosed, how you may control the use of your personal data, and the measures we take to protect your personal data when you use/access the website and/or services offered on our website.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy is published in accordance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 which requires publishing of the Privacy policy for collection, use, storage and transfer of sensitive personal data or information.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Consent */}
      <section id="consent" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  User <span className="text-primary">Consent</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy, which may be updated or amended periodically (without prior intimation or approval), outlines the types of information collected from users, including personal identification details, contact information, birth details, and any forecasts or predictions made based on the information provided. It also explains how such information is used in connection with the services provided on the Website.
                </p>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/90">
                    By accessing and using the Website, you acknowledge that you have read, understood, and expressly consent to the terms of this Privacy Policy. If you do not agree with any of the terms outlined herein, you are advised not to use this Website.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Your continued use of the Website constitutes your unconditional consent to the collection, maintenance, use, processing, and disclosure of your personal and other information in accordance with this Privacy Policy.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy should be read in conjunction with the applicable Terms of Conditions and any other policies provided on the Website.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Information Collection */}
      <section id="collection" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Personal Information We <span className="text-primary">Collect</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  When you visit the website, we automatically collect certain information about your device, including but not limited to information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the website, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    We collect Device Information using the following technologies:
                  </h3>

                  <div className="space-y-4 pl-7">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <strong>"Cookies"</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org. "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps. "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the website.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Forms completed by users on the website.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Additionally when you make a purchase or attempt to make a purchase through the website, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
                </p>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">What is "Personal Information"?</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1. Device Information</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        This includes data about the device you use to access our website, such as device type, operating system, browser type, unique device identifiers, IP addresses, geo-location data and any other technical information related to the device or network through which you access our services. This information helps us to optimize our website and provide a more personalized and seamless experience to users.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2. Order Information</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        This includes personal details such as your name, address, phone number, email address, payment information, and any other data you provide when you place an order or make a purchase through our services. Order Information is used to process transactions, fulfill orders, provide customer support, and communicate with you regarding your order.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                    Together, Device Information and Order Information are referred to as "Personal Information" in this Privacy Policy. We collect and process this information in accordance with applicable privacy laws to improve your experience with our products and services, to manage your orders, and to ensure the security of our services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section id="usage" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  How Do We Use Your <span className="text-primary">Personal Information?</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      1. General
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We use the Order Information that we collect generally to fulfill any orders placed through the website (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      2. Additionally, we may use this Order Information to:
                    </h4>
                    <ul className="space-y-2 pl-6 text-muted-foreground text-sm">
                      <li>a. Communicate with you;</li>
                      <li>b. Screen our orders for potential risk or fraud; and</li>
                      <li>c. In accordance with the preferences, you have provided to us, we may use your personal information to send you information, updates, or advertisements related to our products or services</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      3. Advertisement
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We may use your information to provide you with product and service updates, newsletters and other communications about existing and/or new products and services by email, if you have provided your prior consent or we are otherwise permitted to do so under applicable law. Please note that you can opt-out of these advertisements by unsubscribing to our mails.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      4. Statistics and Research
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We may use your information to segment data and to otherwise create anonymous, aggregated statistics about the use of our products, services, which we may share with third parties and/or make available to the public.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      5. Product/Services Improvement
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We may use your information to improve and enhance existing products, services and applications and develop new offerings, recommendations, advertisements and other communications and learn more about customers' preferences in general.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      6. Publish your reviews, comments and content
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      Where you have uploaded product reviews, comments or content to our websites or application and made them publicly visible, we may link to, publish or publicize these materials elsewhere including in our own advertisements.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      7. Device Information
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We may use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our website (for example, by generating analytics about how our customers browse and interact with the website, and to assess the success of our marketing and advertising campaigns).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      8. Third-Party Sharing
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      We may share your data with trusted third parties who assist us in operating our website and delivering services, including payment processors, delivery partners, and marketing service providers. These third parties are obligated to keep your information secure and use it solely for the purposes we specify.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      9. Legal Obligations
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      Your data may be disclosed to comply with legal obligations, such as responding to subpoenas or protecting our rights and safety.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sharing Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Sharing Your <span className="text-primary">Personal Information</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <div className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/90 font-semibold">
                    THE USER HEREBY REPRESENT AND CONFIRMS THAT THE INFORMATION PROVIDED TO THE WEBSITE IS AUTHENTIC, CORRECT, CURRENT AND UPDATED. THE WEBSITE AND ITS ENTITES SHALL NOT BE RESPONSIBLE FOR THE AUTHENTICITY OF THE INFORMATION THAT THE USER MAY PROVIDE. THE USER SHALL BE PERSONALLY LIABLE AND INDEMNIFY THE WEBSITE FOR THE BREACH OF ANY PROVISION.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We may employ third party entities and individuals to facilitate our Services (e.g. maintenance, analysis, audit, marketing, and development). These third parties have limited access to your information only to perform these tasks on our behalf and are obligated to us, not to disclose or use it for other purposes. All of our approved third-party providers go through an extensive data protection compliance vetting process before being selected as a third party provider and are bound by all relevant data privacy laws, terms of confidentiality, non-disclosure agreement and this Privacy Policy.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Finally, there may be instances where we share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletters */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Newsletters
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  By subscribing to our newsletter you agree to receive email from us. The aim of our newsletter service is to keep our customers and visitors updated about new products/services/ book releases or new information about our books and/or Company. The subscription to our newsletter service is not mandatory. Please note if desired you can always opt out of it by unsubscribing with our newsletter mails.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Frequency</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The frequency of the newsletter issues may be 2-3 issues per month.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Limited Liability</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We reserve the sole right to either modify or discontinue the newsletter, at any time with or without any prior intimation to you. Any new features that augment or enhance the then-current services on this site shall also be subject to the Terms and Conditions. We reserve the sole right to delete users / visitors from our newsletter, without prior notice and/or reasoning. We will do so with any subscriber we deem registered with fake data and/or any other user who violates our Terms and Conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Double opt-in</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      As part of the registration process, all subscribers are required to confirm their email address. You will receive an email containing a link, which you must click to verify your email address and confirm your intention to subscribe. This confirmation is necessary to complete the subscription process.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We will not communicate / spread / publish or otherwise share your address or any other personal details in any manner contrary to the way detailed herein.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Do Not Track */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Do Not <span className="text-primary">Track</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  Please note that we do not alter our website's data collection and usage practices when we see a "Do Not Track" signal from your browser.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section id="rights" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Your <span className="text-primary">Rights</span>
                </h2>
              </div>

              <div className="border border-border rounded-lg p-8 md:p-12 space-y-6 bg-card shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through our official mail ID.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Additionally, if you are a non-European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    
        {/* Data Retention Section */}
        <section id="your-rights" className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <UserCheck className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Data Retention & <span className="text-gradient-gold">Your Rights</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Data Retention</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      When you place an order through the Site, we will retain your Order Information in our records for the purpose of processing and fulfilling your order, unless and until you request us to delete such information. You may request the deletion of your Order Information at any time, subject to applicable legal obligations and retention requirements.
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">Your Privacy Rights</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      You have the following rights regarding your personal data:
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                        <span className="text-primary font-bold text-lg">→</span>
                        <div>
                          <h4 className="font-semibold mb-1">Access Your Data</h4>
                          <p className="text-muted-foreground text-sm">
                            Request a copy of the personal data we hold about you.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                        <span className="text-primary font-bold text-lg">→</span>
                        <div>
                          <h4 className="font-semibold mb-1">Rectify Inaccuracies</h4>
                          <p className="text-muted-foreground text-sm">
                            Request corrections to any inaccurate or incomplete data.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                        <span className="text-primary font-bold text-lg">→</span>
                        <div>
                          <h4 className="font-semibold mb-1">Restrict Processing</h4>
                          <p className="text-muted-foreground text-sm">
                            Limit how your data is processed in certain circumstances.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                        <span className="text-primary font-bold text-lg">→</span>
                        <div>
                          <h4 className="font-semibold mb-1">Data Portability</h4>
                          <p className="text-muted-foreground text-sm">
                            Receive your data in a structured, commonly used format.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-sm font-semibold mb-2">Exercise Your Rights</p>
                      <p className="text-muted-foreground text-sm">
                        To exercise any of these rights, please contact us at{" "}
                        <a href="mailto:connect@astrosantoshpandey.com" className="text-primary hover:underline">
                          connect@astrosantoshpandey.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Security Section */}
        <section id="data-security" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Data <span className="text-gradient-gold">Security</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We implement robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our security practices include:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Encryption</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        All sensitive data is encrypted during transmission and storage using industry-standard protocols.
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Access Controls</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Strict access controls ensure only authorized personnel can access your personal information.
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Security Audits</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Regular security audits and vulnerability assessments to identify and address potential risks.
                      </p>
                    </div>

                    <div className="p-4 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Secure Servers</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Data stored on secure servers with multiple layers of protection and backup systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-amber-500/5 rounded-lg border border-amber-500/20 mt-6">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/90">
                      While we take every reasonable precaution to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards of data protection.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Minors Section */}
        <section className="py-20 bg-gradient-cosmic">
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
                    Protection of <span className="text-gradient-gold">Minors</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    The Website requires that users visiting and using the services are above 18 years of age. However, some service information is accessible to children under the age of 18 as well. It is stressed that the website is not designed or intended to be attractive for use by children under the age of 14, and no personal identifiable information of children below the age of 14 is collected knowingly.
                  </p>

                  <div className="flex items-start gap-3 p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">
                        IMPORTANT NOTICE FOR CHILDREN UNDER 14
                      </p>
                      <p className="text-sm text-foreground/90">
                        IF YOU ARE UNDER 14 YEARS OF AGE, PLEASE DO NOT USE ANY OF THE SERVICES PROVIDED BY THE WEBSITE AT ANY TIME OR IN ANY MANNER.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    If it comes to the knowledge of the concerned parent regarding sharing of any information of a child under the age of 14, please contact the website immediately. We will take appropriate steps and delete the data from the Website's systems.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Policy Changes Section */}
        <section className="py-20 bg-background">
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
                    Policy <span className="text-gradient-gold">Changes</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy periodically without prior notice to reflect changes in our practices, or for other operational, legal, or regulatory reasons. Any such updates will be effective upon posting on the Site.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your personal information.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-cosmic">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Contact <span className="text-gradient-gold">Us</span>
                  </h2>
                </div>

                <div className="cosmic-card p-8 md:p-12 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Email</h4>
                      </div>
                      <a href="mailto:connect@astrosantoshpandey.com" className="text-primary hover:underline text-sm">
                        connect@astrosantoshpandey.com
                      </a>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Address</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        219/174 Gold Mohur CHS, Kalbadevi,<br />
                        Princess Street, Marine Lines,<br />
                        Mumbai – 400 002
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 mt-6">
                    <h4 className="font-semibold mb-2">Grievance Officer</h4>
                    <p className="text-muted-foreground text-sm">
                      <strong>Santosh R Pandey</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Email:{" "}
                      <a href="mailto:astrosantoshpandey@gmail.com" className="text-primary hover:underline">
                        astrosantoshpandey@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Questions About Your <span className="text-gradient-gold">Privacy</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                If you have any questions or concerns about our Privacy Policy or how we handle your data, please don't hesitate to reach out.
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
     export default PrivacyPolicy;