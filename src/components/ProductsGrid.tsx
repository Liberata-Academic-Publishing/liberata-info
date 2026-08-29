import { Link } from "react-router-dom";
import iconFileText from "../images/figma/products/icon_file_text.svg";
import iconBarChart from "../images/figma/products/icon_bar_chart.svg";
import iconUsers from "../images/figma/products/icon_users.svg";
import iconArrowRight from "../images/figma/products/icon_arrow_right.svg";
import iconExpand from "../images/figma/products/icon_expand.svg";
import iconMinimize from "../images/figma/products/icon_minimize.svg";
import demoScriptura1 from "../images/figma/products/demo_scriptura_1.png";
import demoScriptura2 from "../images/figma/products/demo_scriptura_2.png";
import demoScriptura3 from "../images/figma/products/demo_scriptura_3.png";
import demoScriptura4 from "../images/figma/products/demo_scriptura_4.png";
import demoScriptura5 from "../images/figma/products/demo_scriptura_5.png";
import demoScriptura6 from "../images/figma/products/demo_scriptura_6.png";
import demoMensura1 from "../images/figma/products/demo_mensura_1.png";
import demoMensura2 from "../images/figma/products/demo_mensura_2.png";
import demoMensura3 from "../images/figma/products/demo_mensura_3.png";
// the carousel is shared with the product pages; only the surrounding card differs
import { DemoCarousel } from "./ProductFeatureShowcase";
import "./ProductsGrid.css";

type Product = {
  key: string;
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  exploreTo?: string;
  // Products-page demo slides; products without any fall back to the placeholder
  demo?: string[];
  demoAlt?: string;
};

const PRODUCTS: Product[] = [
  {
    key: "scriptura",
    name: "Scriptura",
    icon: iconFileText,
    shortDesc: "Open-access publishing with community-run peer review.",
    longDesc: "Open-access academic publishing & crowdsourced peer review.",
    exploreTo: "/products/scriptura",
    demo: [demoScriptura1, demoScriptura2, demoScriptura3, demoScriptura4, demoScriptura5, demoScriptura6],
    demoAlt: "Scriptura walkthrough: your papers, peer review bids, collections, and the replication marketplace",
    features: [
      "Peer-reviewed submissions",
      "Open-access publishing",
      "Crowdsourced editorial board",
      "Institutional DOI minting",
    ],
  },
  {
    key: "mensura",
    name: "Mensura",
    icon: iconBarChart,
    shortDesc: "Precise contribution metrics and institutional impact analysis.",
    longDesc: "Precise contribution metrics and institutional impact analysis.",
    exploreTo: "/products/mensura",
    demo: [demoMensura1, demoMensura2, demoMensura3],
    demoAlt: "Mensura walkthrough: entity dashboards, benchmarking tables, and impact charts",
    features: [
      "Real-time contribution tracking",
      "Impact factor analytics",
      "Institutional benchmarking",
      "Citation network mapping",
    ],
  },
  {
    key: "textura",
    name: "Textura",
    icon: iconUsers,
    shortDesc: "Discover research and form elite interdisciplinary teams.",
    longDesc: "Discover research and form elite interdisciplinary teams.",
    exploreTo: "/products/textura",
    features: [
      "Elite researcher discovery",
      "Interdisciplinary team matching",
      "Expertise graph visualization",
      "Collaboration request system",
    ],
  },
  {
    key: "norma",
    name: "Norma",
    icon: iconFileText,
    shortDesc: "Standardized compliance frameworks and regulatory alignment tools.",
    longDesc: "Standardized compliance frameworks and regulatory alignment tools.",
    exploreTo: "/products/norma",
    features: [
      "Regulatory compliance mapping",
      "Automated framework alignment",
      "Audit trail generation",
      "Policy version control",
    ],
  },
];

// TODO: point the remaining products at their real destinations once they exist
function ExploreCta({ to }: { to?: string }) {
  if (to) {
    return (
      <Link to={to} className="product-explore">
        <span>Explore</span>
        <img src={iconArrowRight} alt="" />
      </Link>
    );
  }
  return (
    <div className="product-explore">
      <span>Explore</span>
      <img src={iconArrowRight} alt="" />
    </div>
  );
}

function ProductIcon({ icon }: { icon: string }) {
  return (
    <div className="product-icon-tile">
      <img src={icon} alt="" />
    </div>
  );
}

// Collapsed state: expansion happens only via the expand button, matching the
// product pages. Explore still navigates straight to the product page.
function CompactCard({ product, onExpand }: { product: Product; onExpand?: () => void }) {
  return (
    <div className="product-card">
      {onExpand && (
        <button type="button" className="product-toggle" onClick={onExpand} aria-label={`Expand ${product.name}`}>
          <img src={iconExpand} alt="" />
        </button>
      )}
      <div className="product-card-top">
        <ProductIcon icon={product.icon} />
        <p className="product-name">{product.name}</p>
        <p className="product-desc">{product.shortDesc}</p>
      </div>
      <ExploreCta to={product.exploreTo} />
    </div>
  );
}

// Unlike the product pages, the Products card puts the demo on the RIGHT
// (Figma 1032:11455): 446px of text, a 40px gap, then the 563px carousel.
function FeaturedCard({ product, onMinimize }: { product: Product; onMinimize?: () => void }) {
  return (
    <div className="product-card product-card-featured">
      {onMinimize && (
        <button type="button" className="product-toggle" onClick={onMinimize} aria-label={`Minimize ${product.name}`}>
          <img src={iconMinimize} alt="" />
        </button>
      )}
      <div className="product-featured-left">
        <ProductIcon icon={product.icon} />
        <p className="product-name">{product.name}</p>
        <p className="product-desc">{product.longDesc}</p>
        <div className="product-features">
          {product.features.map((feature) => (
            <div className="product-feature" key={feature}>
              <span className="product-feature-dot" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <ExploreCta to={product.exploreTo} />
      </div>
      <div className="product-featured-right">
        {product.demo?.length ? (
          <DemoCarousel
            key={product.key}
            slides={product.demo}
            name={product.name}
            alt={product.demoAlt ?? `${product.name} preview`}
          />
        ) : (
          <div className="sf-demo-placeholder product-demo-placeholder">Demo (coming soon)</div>
        )}
      </div>
    </div>
  );
}

function ProductsGrid() {
  // Desktop: static grid, no expand/collapse — Explore links straight to the product page
  const desktop = (
    <div className="products-grid products-desktop">
      {PRODUCTS.map((product) => (
        <CompactCard key={product.key} product={product} />
      ))}
    </div>
  );

  return (
    <>
      {desktop}
      {/* Mobile: every product shown expanded, stacked vertically */}
      <div className="products-mobile">
        {PRODUCTS.map((product) => (
          <FeaturedCard key={product.key} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsGrid;
