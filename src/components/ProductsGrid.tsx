import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import iconFileText from "../images/figma/products/icon_file_text.svg";
import iconBarChart from "../images/figma/products/icon_bar_chart.svg";
import iconUsers from "../images/figma/products/icon_users.svg";
import iconArrowRight from "../images/figma/products/icon_arrow_right.svg";
import "./ProductsGrid.css";

type Product = {
  key: string;
  name: string;
  icon: string;
  shortDesc: ReactNode;
  exploreTo?: string;
};

const PRODUCTS: Product[] = [
  {
    key: "scriptura",
    name: "Scriptura",
    icon: iconFileText,
    shortDesc: (
      <>
        Diamond open access academic publishing platform with{" "}
        <span className="product-nowrap">marketplace-powered</span> quality controls
      </>
    ),
    exploreTo: "/products/scriptura",
  },
  {
    key: "mensura",
    name: "Mensura",
    icon: iconBarChart,
    shortDesc: "Precise and insightful scientometrics on a modern platform experience",
    exploreTo: "/products/mensura",
  },
  {
    key: "norma",
    name: "Norma",
    icon: iconFileText,
    shortDesc: (
      <>
        <span className="product-nowrap">Open-source</span>{" "}
        <span className="product-nowrap">graph-based</span> scientometrics for metascience research
      </>
    ),
    exploreTo: "/products/norma",
  },
  {
    key: "textura",
    name: "Textura",
    icon: iconUsers,
    shortDesc: "Rich data for scientific AI applications",
    exploreTo: "/products/textura",
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-card-top">
        <ProductIcon icon={product.icon} />
        <p className="product-name">{product.name}</p>
        <p className="product-desc">{product.shortDesc}</p>
      </div>
      <ExploreCta to={product.exploreTo} />
    </div>
  );
}

function ProductsGrid() {
  return (
    <div className="products-grid">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.key} product={product} />
      ))}
    </div>
  );
}

export default ProductsGrid;
