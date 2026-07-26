import Header from "../components/Header";
import ScripturaFeatures from "../components/ScripturaFeatures";
import RoadmapTimeline from "../components/RoadmapTimeline";
import ProductCta from "../components/ProductCta";
import iconPencil from "../images/figma/scriptura/icon_pencil.svg";
import iconCheck from "../images/figma/scriptura/icon_check.svg";
import iconBookAlt from "../images/figma/scriptura/icon_book_alt.svg";
import "../App.css";
import "./ScripturaPage.css";

const IMPACT_COLUMNS = [
  {
    icon: iconPencil,
    title: "For authors",
    body: "Get reviews and replications that genuinely strengthen your paper — and pay in shares of credit, not the $2,000–$10,000 fees legacy open access charges. Keep your copyright, publish openly, and build a real track record instead of borrowing a journal's prestige.",
  },
  {
    icon: iconCheck,
    title: "For reviewers",
    body: "Checking and reproducing research finally earns durable, citable credit. Where review today is unpaid and invisible and replication competes with the original for citations, here both earn a verified stake in the work they make better.",
  },
  {
    icon: iconBookAlt,
    title: "For readers and industry",
    body: "Judge work by whether it holds up — replication counts, review status, and real usage — rather than the logo on the journal. Search 250M+ works at fine-grained precision and read any of them free, no account required.",
  },
];

function ScripturaPage() {
  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="ScripturaHero" id="intro">
        <Header />
        <h1 className="ScripturaHero-title">Scriptura.</h1>
        <p className="ScripturaHero-subtitle">The open publishing platform for academic research.</p>
        <p className="ScripturaHero-description">
          Publish preprints, trade peer review for credit, commission replications, and verify scholarly contribution,
          all on one open record. No paywalls. No article fees. The credit goes to the people who do the work.
        </p>
      </div>

      <div className="ScripturaBody">
        <div className="ScripturaSection">
          <div className="section-heading">/Features</div>
          <h2 className="ScripturaSection-title">The new standard for publishing</h2>
          <ScripturaFeatures />
        </div>

        <div className="ScripturaSection">
          <div className="section-heading">/Impact</div>
          <h2 className="ScripturaSection-title">A fairer deal for everyone who does the work</h2>
          <p className="ScripturaSection-subtitle">
            Legacy publishing rewards prestige and captures the value. Scriptura rewards the work itself — writing,
            reviewing, replicating, and building on research — and keeps every paper open to anyone.
          </p>
          <div className="ScripturaImpact-columns">
            {IMPACT_COLUMNS.map((column) => (
              <div className="ScripturaImpact-column" key={column.title}>
                <div className="ScripturaImpact-icon">
                  <img src={column.icon} alt="" />
                </div>
                <p className="ScripturaImpact-title">{column.title}</p>
                <p className="ScripturaImpact-body">{column.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ScripturaSection">
          <div className="section-heading">/Roadmap</div>
          <RoadmapTimeline />
        </div>

        <ProductCta
          title="Ready to reshape academic publishing?"
          subtitle="Join researchers, labs, and institutions already building on Scriptura."
          primaryLabel="Start publishing →"
          primaryTo="/beta-signup"
          secondaryLabel="Request a demo"
        />
      </div>
    </div>
  );
}

export default ScripturaPage;
