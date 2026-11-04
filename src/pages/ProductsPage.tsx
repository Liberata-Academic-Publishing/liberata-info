import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";
import EcosystemDiagram from "../components/EcosystemDiagram";
import "../App.css";
import "./ProductsPage.css";

function ProductsPage() {
  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="ProductsHero" id="intro">
        <Header />
        <h1 className="ProductsHero-title">Products</h1>
        <p className="ProductsHero-subtitle">
          Liberata's open ecosystem of academic tools and platforms for publishing, scientometrics, and data processing, compatible with existing open scholarship infrastructure
        </p>
      </div>

      <div className="ProductsBody">
        <ProductsGrid />
        <div className="ProductsEcosystem">
          <div className="section-heading">How they work together</div>
          <EcosystemDiagram />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
