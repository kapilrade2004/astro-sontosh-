

// import { Link } from "react-router-dom";
// import { SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
// import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { MapPin, Phone, Mail } from "lucide-react";

// import LOGO from "@/assets/name_logo.png";
// import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

// const services = [
//   { name: "Astrology",  path: "/astrology" },
//   { name: "Numerology", path: "/numerology" },
//   { name: "Vastu",      path: "/vastu" },
//   { name: "Palmistry",  path: "/palmistry" },
// ];

// const quickLinks = [
//   { name: "About Us",          path: "/about" },
//   { name: "Book Consultation", path: "/contact#booking" },
//   { name: "Inquiry",           path: "/inquiry" },
// ];

// const socialLinks = [
//   { icon: FaFacebookF, href: "https://www.facebook.com/astrosantoshpandey",        label: "Facebook",           color: "text-white", bgColor: "bg-[#1877F2]",  hoverBg: "hover:bg-[#1877F2]/90" },
//   { icon: SiInstagram, href: "https://www.instagram.com/astrosantoshpandey/",      label: "Instagram",          color: "text-white", bgColor: "",              hoverBg: "hover:opacity-90" },
//   { icon: FaYoutube,   href: "https://www.youtube.com/@astrosantoshpandey",        label: "YouTube",            color: "text-[#FF0000]", bgColor: "bg-white",  hoverBg: "hover:bg-white/90" },
//   { icon: SiX,         href: "https://x.com/astrosantoshrp",                       label: "Twitter / X",        color: "text-white", bgColor: "bg-black",      hoverBg: "hover:bg-black/90" },
//   { icon: FaLinkedin,  href: "https://www.linkedin.com/in/astrosantoshpandey",     label: "LinkedIn",           color: "text-white", bgColor: "bg-[#0A66C2]",  hoverBg: "hover:bg-[#0A66C2]/90" },
//   { icon: SiWhatsapp,  href: "https://wa.me/+918879731174",                        label: "WhatsApp",           color: "text-white", bgColor: "bg-[#25D366]",  hoverBg: "hover:bg-[#25D366]/90" },
//   { icon: FcGoogle,    href: "https://share.google/h4zhEpPG0x0vF57n3",             label: "Google My Business", color: "",           bgColor: "bg-white",      hoverBg: "hover:bg-white/90" },
// ];

// /* ─────────────────────────────────────────────────────────────────────────────
//    FooterLogo
//    Identical alignment strategy to the Header logo:
//    • outer row  → alignItems: "center"   (vertical centre for both columns)
//    • inner col  → height: "56px"         (matches the icon height exactly)
//    • justifyContent: "center"            (centres name + shloka within that 56 px)
//    • shloka span → display: "block"      (no inline baseline drift)
// ───────────────────────────────────────────────────────────────────────────── */
// const FooterLogo = () => (
//   <Link
//     to="/"
//     className="inline-flex mb-4"
//     style={{ textDecoration: "none" }}
//   >
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",   /* vertical centre for BOTH children */
//         gap: "10px",
//       }}
//     >
//       {/* Ganesha / Hanuman icon */}
//       <img
//         src={hanumanGaneshaLogo}
//         alt="Hanuman Ganesha"
//         style={{
//           height: "clamp(62px, 7vw, 78px)",
//           width: "auto",
//           objectFit: "contain",
//           display: "block",
//           flexShrink: 0,
//         }}
//       />

//       {/* Name logo + shloka column */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           justifyContent: "center",
//           gap: "3px",
//           height: "clamp(62px, 7vw, 78px)",        /* match icon height so justify-content works */
//         }}
//       >
//         <img
//           src={LOGO}
//           alt="Astro Santosh Pandey"
//           style={{
//             height: "clamp(39px, 4.6vw, 50px)",
//             width: "auto",
//             objectFit: "contain",
//             display: "block",
//             flexShrink: 0,
//           }}
//         />
//         <span
//           style={{
//             display: "block",        /* block prevents inline baseline shift */
//             fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
//             fontStyle: "italic",
//             color: "#FFD700",
//             whiteSpace: "nowrap",
//             lineHeight: 1.2,
//             paddingLeft: "2px",
//             textShadow:
//               "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
//           }}
//         >
//           ज्योतिषं सर्वार्थ साधकं
//         </span>
//       </div>
//     </div>
//   </Link>
// );

// export const Footer = () => {
//   return (
//     <footer className="bg-gradient-cosmic border-t border-border">
//       <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14">

//           {/* ── Brand ──────────────────────────────────────────────────────── */}
//           <div>
//             <FooterLogo />

//             <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//               Transform your life with expert Astrology, Numerology, Vastu &amp; Palmistry guidance.
//               Accurate predictions and personalized remedies for a better tomorrow.
//             </p>

//             {/* Social Icons */}
//             <div className="flex gap-3 flex-wrap">
//               {socialLinks.map((social) => {
//                 if (social.label === "Instagram") {
//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={social.label}
//                       className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md hover:opacity-90"
//                       style={{
//                         background:
//                           "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
//                       }}
//                     >
//                       <SiInstagram className="h-6 w-6 text-white" />
//                     </a>
//                   );
//                 }
//                 if (social.label === "Facebook") {
//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={social.label}
//                       className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md"
//                       style={{ background: "#1877F2" }}
//                     >
//                       <FaFacebookF className="h-7 w-8 text-white" />
//                     </a>
//                   );
//                 }
//                 return (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${social.bgColor} ${social.hoverBg} shadow-md`}
//                   >
//                     <social.icon className={`h-6 w-6 ${social.color}`} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* ── Services ───────────────────────────────────────────────────── */}
//           <div>
//             <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
//               Our Services
//             </h3>
//             <ul className="space-y-3">
//               {services.map((service) => (
//                 <li key={service.path}>
//                   <Link
//                     to={service.path}
//                     className="text-muted-foreground hover:text-primary transition-colors text-sm"
//                   >
//                     {service.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Quick Links ─────────────────────────────────────────────────── */}
//           <div>
//             <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className="text-muted-foreground hover:text-primary transition-colors text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Contact ─────────────────────────────────────────────────────── */}
//           <div>
//             <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
//               Contact Us
//             </h3>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
//                 <span className="text-muted-foreground text-sm">
//                   Santosh R Pandey <br />
//                   Address - Kalbadevi, Princess Street, Marine Lines, Mumbai
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="h-5 w-5 text-primary shrink-0" />
//                 <a
//                   href="tel:+918879731174"
//                   className="text-muted-foreground hover:text-primary text-sm"
//                 >
//                   +91 8879731174
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="h-5 w-5 text-primary shrink-0" />
//                 <a
//                   href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@astrosantoshpandey.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-primary text-sm text-muted-foreground"
//                 >
//                   connect@astrosantoshpandey.com
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
//         <div className="border-t border-border mt-12 pt-8 text-center">
//           <p className="text-muted-foreground text-sm">
//             © {new Date().getFullYear()} Astro Santosh Pandey. All rights reserved. Empowering
//             lives through ancient wisdom.
//             <br />
//             <Link
//               to="/Terms#terms"
//               className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
//             >
//               Terms &amp; Conditions
//             </Link>
//             <span className="mx-2">|</span>
//             <Link
//               to="/Terms#cancellation"
//               className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
//             >
//               Cancellation &amp; Refund Policy
//             </Link>
//             <span className="mx-2">|</span>
//             <Link
//               to="/privacy"
//               className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
//             >
//               Privacy Policy
//             </Link>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };



//testing


import { Link } from "react-router-dom";
import { SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MapPin, Phone, Mail } from "lucide-react";

import LOGO from "@/assets/name_logo.png";
import hanumanGaneshaLogo from "@/assets/hanuman-ganesha_logo.png";

const services = [
  { name: "Astrology",  path: "/astrology" },
  { name: "Numerology", path: "/numerology" },
  { name: "Vastu",      path: "/vastu" },
  { name: "Palmistry",  path: "/palmistry" },
];

const quickLinks = [
  { name: "About Us",          path: "/about" },
  { name: "Book Consultation", path: "/contact#booking" },
  { name: "Inquiry",           path: "/inquiry" },
  { name: "Astrology Guidance Consultation", path: "/consultation" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/astrosantoshpandey",        label: "Facebook",           color: "text-white", bgColor: "bg-[#1877F2]",  hoverBg: "hover:bg-[#1877F2]/90" },
  { icon: SiInstagram, href: "https://www.instagram.com/astrosantoshpandey/",      label: "Instagram",          color: "text-white", bgColor: "",              hoverBg: "hover:opacity-90" },
  { icon: FaYoutube,   href: "https://www.youtube.com/@astrosantoshpandey",        label: "YouTube",            color: "text-[#FF0000]", bgColor: "bg-white",  hoverBg: "hover:bg-white/90" },
  { icon: SiX,         href: "https://x.com/astrosantoshrp",                       label: "Twitter / X",        color: "text-white", bgColor: "bg-black",      hoverBg: "hover:bg-black/90" },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/in/astrosantoshpandey",     label: "LinkedIn",           color: "text-white", bgColor: "bg-[#0A66C2]",  hoverBg: "hover:bg-[#0A66C2]/90" },
  { icon: SiWhatsapp,  href: "https://wa.me/+918879731174",                        label: "WhatsApp",           color: "text-white", bgColor: "bg-[#25D366]",  hoverBg: "hover:bg-[#25D366]/90" },
  { icon: FcGoogle,    href: "https://share.google/h4zhEpPG0x0vF57n3",             label: "Google My Business", color: "",           bgColor: "bg-white",      hoverBg: "hover:bg-white/90" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FooterLogo
   Identical alignment strategy to the Header logo:
   • outer row  → alignItems: "center"   (vertical centre for both columns)
   • inner col  → height: "56px"         (matches the icon height exactly)
   • justifyContent: "center"            (centres name + shloka within that 56 px)
   • shloka span → display: "block"      (no inline baseline drift)
───────────────────────────────────────────────────────────────────────────── */
const FooterLogo = () => (
  <Link
    to="/"
    className="inline-flex mb-4"
    style={{ textDecoration: "none" }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",   /* vertical centre for BOTH children */
        gap: "10px",
      }}
    >
      {/* Ganesha / Hanuman icon */}
      <img
        src={hanumanGaneshaLogo}
        alt="Hanuman Ganesha"
        style={{
          height: "clamp(62px, 7vw, 78px)",
          width: "auto",
          objectFit: "contain",
          display: "block",
          flexShrink: 0,
        }}
      />

      {/* Name logo + shloka column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "3px",
          height: "clamp(62px, 7vw, 78px)",        /* match icon height so justify-content works */
        }}
      >
        <img
          src={LOGO}
          alt="Astro Santosh Pandey"
          style={{
            height: "clamp(39px, 4.6vw, 50px)",
            width: "auto",
            objectFit: "contain",
            display: "block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            display: "block",        /* block prevents inline baseline shift */
            fontSize: "clamp(10.5px, 1.25vw, 13.5px)",
            fontStyle: "italic",
            color: "#FFD700",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
            paddingLeft: "2px",
            textShadow:
              "0 0 3px rgba(255,215,0,0.4), 0 0 6px rgba(218,165,32,0.25)",
          }}
        >
          ज्योतिषं सर्वार्थ साधकं
        </span>
      </div>
    </div>
  </Link>
);

export const Footer = () => {
  return (
    <footer className="bg-gradient-cosmic border-t border-border">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14">

          {/* ── Brand ──────────────────────────────────────────────────────── */}
          <div>
            <FooterLogo />

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Transform your life with expert Astrology, Numerology, Vastu &amp; Palmistry guidance.
              Accurate predictions and personalized remedies for a better tomorrow.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                if (social.label === "Instagram") {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md hover:opacity-90"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                      }}
                    >
                      <SiInstagram className="h-6 w-6 text-white" />
                    </a>
                  );
                }
                if (social.label === "Facebook") {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md"
                      style={{ background: "#1877F2" }}
                    >
                      <FaFacebookF className="h-7 w-8 text-white" />
                    </a>
                  );
                }
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${social.bgColor} ${social.hoverBg} shadow-md`}
                  >
                    <social.icon className={`h-6 w-6 ${social.color}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Services ───────────────────────────────────────────────────── */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
              Our Services
            </h3>
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

          {/* ── Quick Links ─────────────────────────────────────────────────── */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
              Quick Links
            </h3>
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

          {/* ── Contact ─────────────────────────────────────────────────────── */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4 pt-2">
              Contact Us
            </h3>
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
                <a
                  href="tel:+918879731174"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  +91 8879731174
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@astrosantoshpandey.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary text-sm text-muted-foreground"
                >
                  connect@astrosantoshpandey.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Astro Santosh Pandey. All rights reserved. Empowering
            lives through ancient wisdom.
            <br />
            <Link
              to="/Terms#terms"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Terms &amp; Conditions
            </Link>
            <span className="mx-2">|</span>
            <Link
              to="/Terms#cancellation"
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              Cancellation &amp; Refund Policy
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