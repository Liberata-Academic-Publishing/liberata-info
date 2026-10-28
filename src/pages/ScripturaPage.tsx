import { useState } from "react";
import Header from "../components/Header";
import ScripturaFeatures from "../components/ScripturaFeatures";
import RoadmapTimeline from "../components/RoadmapTimeline";
import ProductCta from "../components/ProductCta";
import ContactModal from "../components/ContactModal";
import iconPencil from "../images/figma/scriptura/icon_pencil.svg";
import iconCheck from "../images/figma/scriptura/icon_check.svg";
import iconBookAlt from "../images/figma/scriptura/icon_book_alt.svg";
import "../App.css";
import "./ScripturaPage.css";

const VIDEO_BASE = "https://pub-c93f131df06d44f88212bf9bdb396d2c.r2.dev/"; // same bucket as FaqsPage.tsx
const WALKTHROUGH_VIDEO = `${VIDEO_BASE}REPLACE_ME.mp4`; // TODO: swap in real filename once uploaded
// TODO: add poster once there's a still frame (see FaqsPage.tsx for the pattern)

const IMPACT_COLUMNS = [
  {
    icon: iconPencil,
    title: "For authors",
    body: "Get reviews and replications that strengthen your article, and offer shares of credit instead of paying legacy open-access fees. Keep your copyright, publish openly, and build a track record that does not depend on a journal's prestige.",
  },
  {
    icon: iconCheck,
    title: "For reviewers",
    body: "Checking and reproducing research earns durable, citable credit. Review is currently unpaid and invisible, and replication competes with the original for citations. Here, both earn a verified stake in the work they improve.",
  },
  {
    icon: iconBookAlt,
    title: "For readers and industry",
    body: "Judge work by replication counts, review status, and usage rather than the journal that published it. Search 250M+ works at fine-grained precision and read any of them for free, with no account required.",
  },
];

function ScripturaPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="ScripturaHero" id="intro">
        <Header />
        <h1 className="ScripturaHero-title">Scriptura</h1>
        <p className="ScripturaHero-subtitle">Open access academic publishing platform with incentivized quality controls</p>
        <p className="ScripturaHero-description">
          Publish preprints, exchange credit for peer review, commission replications, and verify scholarly contributions, all on open, auditable records.
        </p>
      </div>

      <div className="ScripturaBody">
        {/* hidden until the video's uploaded
        <div className="ScripturaSection" id="walkthrough">
          <div className="section-heading">Overview</div>
          <h2 className="ScripturaSection-title">Watch how Scriptura works</h2>
          <p className="ScripturaSection-subtitle">A walkthrough of every feature.</p>
          <video className="Scriptura-video" src={WALKTHROUGH_VIDEO} controls preload="none" />
        </div>
        */}

        <div className="ScripturaSection">
          <div className="section-heading">Features</div>
          <h2 className="ScripturaSection-title">How Scriptura supports your work, from draft to citation</h2>
          <ScripturaFeatures />
        </div>

        <div className="ScripturaSection">
          <div className="section-heading">Impact</div>
          <h2 className="ScripturaSection-title">Credit follows contribution</h2>
          <p className="ScripturaSection-subtitle">
            Legacy publishing rewards prestige and captures the value. Scriptura rewards the work itself: writing,
            reviewing, replicating, and building on research. Every article stays open to anyone.
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
          <div className="section-heading">Timeline</div>
          <RoadmapTimeline />
        </div>

        <ProductCta
          title="Join researchers, labs, and institutions on Scriptura"
          primaryLabel={
            <>
              <span>Sign up for beta</span>
              {/* real icon instead of a plain "→" character — same fix as
                  the Norma hero CTA and mobile "Sign up for beta" button */}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4.16626 10H15.8343M10.0003 15.834L15.8343 10L10.0003 4.16603" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </>
          }
          primaryTo="/beta-signup"
          secondaryLabel="Contact us"
          secondaryOnClick={() => setContactOpen(true)}
        />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </div>
  );
}

export default ScripturaPage;
