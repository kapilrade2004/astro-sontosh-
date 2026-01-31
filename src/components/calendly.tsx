import { useEffect } from "react";

interface CalendlyEmbedProps {
    height?: string;
}

const CalendlyEmbed = ({ height = "800px" }: CalendlyEmbedProps) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/suyograute2/30min"
            style={{ minWidth: "320px", height: height }}
        />
    );
};

export default CalendlyEmbed;

