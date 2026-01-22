import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Linkedin, MessageCircle, Globe } from "lucide-react";
import LOGO from "@/assets/namelogo-removebg-preview.png";

const services = [
  { name: "Astrology", path: "/astrology" },
  { name: "Numerology", path: "/numerology" },
  { name: "Vastu", path: "/vastu" },
  { name: "Palmistry", path: "/palmistry" },
];

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Book Consultation", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/astrosantoshpandey", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/astrosantoshpandey/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@astrosantoshpandey", label: "YouTube" },
  { icon: Twitter, href: "https://x.com/astrosantoshrp", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/astrosantoshpandey", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/+918879731174", label: "WhatsApp" },
  { icon: Globe, href: "https://share.google/h4zhEpPG0x0vF57n3", label: "Google My Business" }
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-cosmic border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={LOGO} alt="astrosantoshpandey" className=" h-24 w-52" />
            </Link>
            <p className="text-primary/80 text-sm italic font-medium">
              ज्योतिषं सर्वार्थ साधकं
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transform your life with expert Astrology, Numerology, Vastu & Palmistry guidance.
              Accurate predictions and personalized remedies for a better tomorrow.
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Santosh R Pandey <br />
                  Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+918879731174" className="text-muted-foreground hover:text-primary text-sm">
                  +91 8879731174
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@cosmicguidance.com" className="text-muted-foreground hover:text-primary text-sm">
                  astrosantoshpandey@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Astro Santosh Pandey. All rights reserved. Empowering lives through ancient wisdom.
            <br />
            <Link
              to="/Terms#terms"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Terms & Conditions
            </Link>

            <span className="mx-2">|</span>

            <Link
              to="/Terms#cancellation"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Cancellation & Refund Policy
            </Link>
               <span className="mx-2">|</span>

            <Link
              to="/privacy"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Privacy Policy
            </Link>


          </p>
        </div>
      </div>
    </footer>
  );
};