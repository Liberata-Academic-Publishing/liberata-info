import { ReactNode } from "react";
import "./HeroLinkButton.css";

// The white pill button used in product page heroes (same look as Norma's
// "View repository"): an external link that opens in a new tab.
function HeroLinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="HeroLinkButton">
      <span>{children}</span>
      {/* real icon instead of a plain "→" character so its size is controlled
          independently of the button's font-size */}
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4.16626 10H15.8343M10.0003 15.834L15.8343 10L10.0003 4.16603" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </a>
  );
}

export default HeroLinkButton;
