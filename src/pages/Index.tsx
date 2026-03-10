import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedPredictions } from "@/components/home/FeaturedPredictions";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RemediesSection } from "@/components/home/RemediesSection";
import { CTASection } from "@/components/home/CTASection";
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Astro Santosh Pandey - Expert Astrology, Numerology, Vastu & Palmistry Consultant</title>
        <meta name="description" content="Transform your life with expert Astrology, Numerology, Vastu & Palmistry guidance. Accurate predictions, personalised remedies for career, marriage, finance & health." />
        <meta name="keywords" content="astrology, numerology, vastu, palmistry, horoscope, birth chart, kundli, predictions, remedies" />
        <link rel="canonical" href="https://astrosantoshpandey.com" />
      </Helmet>
      <Layout>
        <HeroSection />
        <WhyChooseUs />
        <ServicesPreview />
        <FeaturedPredictions />
        <TestimonialsSection />
        <RemediesSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
