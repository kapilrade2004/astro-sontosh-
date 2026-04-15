// import { ReactNode } from "react";
// import { Header } from "./Header";
// import { Footer } from "./Footer";
// import { WhatsAppButton } from "./WhatsAppButton";

// interface LayoutProps {
//   children: ReactNode;
// }

// export const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main>{children}</main>
//       <Footer />
//       <WhatsAppButton />
//     </div>
//   );
// };


//testing (14-4-2026)



import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

  useEffect(() => {
    // ── Disable right-click context menu ──
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // ── Disable text selection copy (Ctrl+C / Cmd+C) ──
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCopy  = (e.ctrlKey || e.metaKey) && e.key === "c";
      const isCut   = (e.ctrlKey || e.metaKey) && e.key === "x";
      const isSelectAll = (e.ctrlKey || e.metaKey) && e.key === "a";
      if (isCopy || isCut || isSelectAll) {
        e.preventDefault();
      }
    };

    // ── Disable drag-to-copy and copy event ──
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown",     handleKeyDown);
    document.addEventListener("copy",        handleCopy);
    document.addEventListener("cut",         handleCopy);
    document.addEventListener("dragstart",   handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown",     handleKeyDown);
      document.removeEventListener("copy",        handleCopy);
      document.removeEventListener("cut",         handleCopy);
      document.removeEventListener("dragstart",   handleDragStart);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-background"
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};