import arrowFeeds from "../images/figma/products/arrow_feeds.svg";
import arrowPowers from "../images/figma/products/arrow_powers.svg";
import arrowPeople from "../images/figma/products/arrow_people.svg";
import arrowMachines from "../images/figma/products/arrow_machines.svg";
import dotPublishing from "../images/figma/products/dot_publishing.svg";
import dotResearch from "../images/figma/products/dot_research.svg";
import dotMethods from "../images/figma/products/dot_methods.svg";
import dotAi from "../images/figma/products/dot_ai.svg";
import "./EcosystemDiagram.css";

function MiniCard({ dot, label, name, sub }: { dot: string; label: string; name: string; sub: string }) {
  return (
    <div className="eco-card">
      <div className="eco-card-label">
        <img src={dot} alt="" />
        <span>{label}</span>
      </div>
      <p className="eco-card-name">{name}</p>
      <p className="eco-card-sub">{sub}</p>
    </div>
  );
}

function Connection({ label, arrow }: { label: string; arrow: string }) {
  return (
    <div className="eco-connection">
      <span>{label}</span>
      <img src={arrow} alt="" />
    </div>
  );
}

function EcosystemDiagram() {
  return (
    <div className="eco-diagram">
      <div className="eco-side">
        <MiniCard dot={dotPublishing} label="Publishing" name="Scriptura" sub="Reviewed open access" />
        <MiniCard dot={dotMethods} label="Open methods" name="Norma" sub="Reproducible metrics engine" />
      </div>
      <div className="eco-connections">
        <Connection label="feeds" arrow={arrowFeeds} />
        <Connection label="powers metrics" arrow={arrowPowers} />
      </div>
      <div className="eco-center">
        <p className="eco-center-title">Shared scholarly graph</p>
        <div className="eco-pills">
          <div className="eco-pill">Academic Capital</div>
          <div className="eco-pill">Contribution shares</div>
          <div className="eco-pill">D4 discovery tags</div>
          <div className="eco-pill">Entity hierarchy</div>
        </div>
      </div>
      <div className="eco-connections">
        <Connection label="for people" arrow={arrowPeople} />
        <Connection label="for machines" arrow={arrowMachines} />
      </div>
      <div className="eco-side">
        <MiniCard dot={dotResearch} label="Research intel" name="Mensura" sub="Benchmarking metrics" />
        <MiniCard dot={dotAi} label="AI training data" name="Textura" sub="Scientific AI training data" />
      </div>
    </div>
  );
}

export default EcosystemDiagram;
