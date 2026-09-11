import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./ProductCta.css";

type ProductCtaProps = {
  title: string;
  subtitle: string;
  primaryLabel: ReactNode;
  primaryTo?: string;
  secondaryLabel: ReactNode;
  // "https://..." for an external site (plain <a>, opens in a new tab) or an
  // internal path like "/beta-signup" (react-router Link). Omit to keep the
  // secondary button inert, same as before.
  secondaryTo?: string;
};

// TODO: wire up real destinations (demo requests etc.) as they come online
function ProductCta({ title, subtitle, primaryLabel, primaryTo, secondaryLabel, secondaryTo }: ProductCtaProps) {
  const isExternal = (to: string) => /^https?:\/\//.test(to);

  return (
    <div className="product-cta">
      <h2 className="product-cta-title">{title}</h2>
      <p className="product-cta-subtitle">{subtitle}</p>
      <div className="product-cta-actions">
        {primaryTo ? (
          <Link to={primaryTo} className="product-cta-primary">{primaryLabel}</Link>
        ) : (
          <button type="button" className="product-cta-primary">{primaryLabel}</button>
        )}
        {secondaryTo ? (
          isExternal(secondaryTo) ? (
            <a href={secondaryTo} target="_blank" rel="noopener noreferrer" className="product-cta-secondary">{secondaryLabel}</a>
          ) : (
            <Link to={secondaryTo} className="product-cta-secondary">{secondaryLabel}</Link>
          )
        ) : (
          <button type="button" className="product-cta-secondary">{secondaryLabel}</button>
        )}
      </div>
    </div>
  );
}

export default ProductCta;
