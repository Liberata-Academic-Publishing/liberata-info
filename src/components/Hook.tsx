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
          <Link to="/beta-signup" className="Hook-cta">Sign up for beta →</Link>
        </div>
      </div>
    </div>
  )
}

export default Hook