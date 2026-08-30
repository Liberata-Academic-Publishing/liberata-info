import { useEffect, useState } from "react";
import "./BackToTop.css";

// Mobile-only "jump to top" button: hidden until the user scrolls down the
// page, then fades in fixed in the corner — except once the footer scrolls
// into view, where it hides again rather than floating on top of it (being
// fixed-position, it would otherwise sit over the footer's own content).
// Tapping it smooth-scrolls back to the top. Rendered once in App.tsx
// (alongside Footer) so it shows on every page without each page needing to
// add it itself.
function BackToTop() {
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolledPastThreshold(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Footer is rendered once, outside <Routes>, so it's always in the DOM
    // for the lifetime of the app — safe to look it up once on mount.
    const footer = document.querySelector(".Footer-body");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => setFooterVisible(entries[0].isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastThreshold && !footerVisible;

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " back-to-top-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="19" x2="12" y2="5" stroke="#3F4C67" strokeWidth="2" strokeLinecap="round" />
        <polyline points="5 12 12 5 19 12" fill="none" stroke="#3F4C67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default BackToTop;
