import React from 'react';
import { Link } from 'react-router-dom';
import "./Hook.css";

type HookProps = {
  header: string;
  subheader: string;
  subtext? :string
}

function Hook({header, subheader, subtext}:HookProps) {
  return (
    <div className="Hook-wrapper">
      <div style={{width: '85vw', marginTop: '10vh'}}>
        <div className="Hook-header">
          {header}
        </div>

        {/* {subtext && <div className="Hook-subtext">{subtext}</div>} */}
        <div className="Hook-cta-row">
          <Link to="/beta-signup" className="Hook-cta">Sign up for beta</Link>
        </div>

        <div style={{width: 'inherit', display: 'flex', justifyContent: 'end', marginTop: '0vh', opacity: .8}}>
          <div className="Hook-subheader">
            {subheader}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hook