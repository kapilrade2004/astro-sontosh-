import { useEffect } from "react";

interface CalendlyEmbedProps {
  height?: string;
}

const CalendlyEmbed = ({ height = "800px" }: CalendlyEmbedProps) => {
  useEffect(() => {
    // Avoid injecting script multiple times
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/suyograute2/new-meeting"
        style={{
          minWidth: "320px",
          height: "100vh",       // full viewport height on mobile
          maxHeight: height,     // respects custom height on desktop
        }}
      />
    </div>
  );
};

export default CalendlyEmbed;
