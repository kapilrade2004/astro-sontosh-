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
    <div className="w-full overflow-hidden">
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/suyograute2/new-meeting"
        style={{
          minWidth: "100%",
          height: height,
        }}
      />
    </div>
  );
};

export default CalendlyEmbed;
