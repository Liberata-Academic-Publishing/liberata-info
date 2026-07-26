import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./ProductCta.css";

type ProductCtaProps = {
  title: string;
  subtitle: string;
  primaryLabel: ReactNode;
  primaryTo?: string;
  secondaryLabel: ReactNode;
};

// TODO: wire up real destinations (demo requests etc.) as they come online
function ProductCta({ title, subtitle, primaryLabel, primaryTo, secondaryLabel }: ProductCtaProps) {
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
        <button type="button" className="product-cta-secondary">{secondaryLabel}</button>
      </div>
    </div>
  );
}

export default ProductCta;
