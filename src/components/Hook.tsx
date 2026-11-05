import React, { ReactNode } from 'react';
import "./Hook.css";

type HookProps = {
  header: string;
  subheader: ReactNode;
  subtext?: string;
}

function Hook({ header, subheader, subtext }: HookProps) {
  return (
    <div className="Hook-wrapper">
      {/* DESKTOP: header, subheader directly under it, then CTA */}
      <div className="Hook-content Hook-desktop">
        <div className="Hook-header">
          {header}
        </div>
        <div className="Hook-subheader-row">
          <div className="Hook-subheader">
            {subheader}
          </div>
        </div>
        {/* Hidden for now: the "Sign up for beta" button. Restore by uncommenting
            and re-adding `import { Link } from 'react-router-dom'`.
        <div className="Hook-cta-row">
          <Link to="/beta-signup" className="Hook-cta">Sign up for beta</Link>
        </div>
        */}
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
        {/* Hidden for now: the mobile "Sign up for beta" button (same as above).
        <div className="Hook-cta-row">
          <Link to="/beta-signup" className="Hook-cta">
            <span>Sign up for beta</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4.16626 10H15.8343M10.0003 15.834L15.8343 10L10.0003 4.16603" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
        */}
      </div>
    </div>
  )
}

export default Hook