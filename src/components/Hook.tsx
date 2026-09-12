import React from 'react';
import { Link } from 'react-router-dom';
import "./Hook.css";

type HookProps = {
  header: string;
  subheader: string;
  subtext?: string;
}

function Hook({ header, subheader, subtext }: HookProps) {
  return (
    <div className="Hook-wrapper">
      {/* DESKTOP: header, CTA, subheader (unchanged order/styling) */}
      <div className="Hook-content Hook-desktop">
        <div className="Hook-header">
          {header}
        </div>
        <div className="Hook-cta-row">
          <Link to="/beta-signup" className="Hook-cta">Sign up for beta</Link>
        </div>
        <div className="Hook-subheader-row">
          <div className="Hook-subheader">
            {subheader}
          </div>
        </div>
      </div>

      {/* MOBILE: header, subheader, CTA */}
      <div className="Hook-content Hook-mobile">
        <div className="Hook-header">
          {header}
        </div>
        <div className="Hook-subheader-row">
          <div className="Hook-subheader">
            {subheader}
          </div>
        </div>
        <div className="Hook-cta-row">
          {/* real icon instead of a plain "→" character, same fix as Norma's
              hero CTA — a plain-text arrow shrinks along with the button's
              font-size instead of staying legible at mobile's 16px */}
          <Link to="/beta-signup" className="Hook-cta">
            <span>Sign up for beta</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4.16626 10H15.8343M10.0003 15.834L15.8343 10L10.0003 4.16603" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hook