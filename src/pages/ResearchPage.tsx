import { useState } from "react";
import Header from "../components/Header";
import iconSearch from "../images/figma/research/icon_search.svg";
import "../App.css";
import "./ResearchPage.css";

type Paper = {
  title: string;
  authors: string;
  meta: string;
  abstract: string;
  tag: string;
  category: string;
  // TODO: link to the actual papers once they are published
  url?: string;
};

const PAPERS: Paper[] = [
  {
    title: "Academic Contribution Weighted Ledger",
    authors: "C. Zhang, J. Holloway, et al.",
    meta: "2025 • Duke Academic Journal",
    abstract: "A novel approach to quantifying individual research contribution using share-based attribution models.",
    tag: "Metric",
    category: "Metrics",
  },
  {
    title: "Open Peer Review Ecosystems",
    authors: "M. Webb, S. Doe",
    meta: "2025 • IEEE Symposium",
    abstract: "Analyzing the impact of crowdsourced peer review on paper quality and publication speed.",
    tag: "Metric",
    category: "Metrics",
  },
  {
    title: "Incentivized Replication in Economics",
    authors: "L. Chen, K. Richards",
    meta: "2024 • Bass Connections Review",
    abstract: "Defining economic rewards for successful study replication in modern social sciences.",
    tag: "Metric",
    category: "Metrics",
  },
  {
    title: "Shareholder Models for IP Ownership",
    authors: "D. Blackwell, et al.",
    meta: "2024 • Journal of IP",
    abstract: "Bridging the gap between academic credit and legal intellectual property through share splits.",
    tag: "Metric",
    category: "Metrics",
  },
];

const CATEGORIES = ["All", "Systems", "Metrics", "Open Access"];

function ResearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const papers = PAPERS.filter((paper) => {
    const matchesCategory = category === "All" || paper.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.abstract.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const filterList = (extraClass: string) => (
    <div className={extraClass}>
      {CATEGORIES.map((name) => (
        <button
          type="button"
          key={name}
          className={`Research-filter ${name === category ? "active" : ""}`}
          onClick={() => setCategory(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="ResearchHero" id="intro">
        <Header />
        <h1 className="ResearchHero-title">Research.</h1>
        <p className="ResearchHero-subtitle">Papers associated with the Liberata platform</p>
      </div>

      <div className="ResearchBody">
        <div className="ResearchMain">
          <div className="Research-search">
            <img src={iconSearch} alt="" />
            <input
              type="search"
              placeholder="Search papers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search papers"
            />
          </div>

          {/* Mobile filter pills (sidebar shows these on desktop) */}
          {filterList("Research-filters-mobile")}

          <div className="Research-list">
            {papers.map((paper) => (
              <div className="Research-card" key={paper.title}>
                <span className="Research-tag">{paper.tag}</span>
                <p className="Research-card-title">{paper.title}</p>
                <p className="Research-card-authors">{paper.authors}</p>
                <p className="Research-card-meta">{paper.meta}</p>
                <p className="Research-card-abstract">{paper.abstract}</p>
                <span className="Research-card-link">Read paper →</span>
              </div>
            ))}
            {papers.length === 0 && (
              <p className="Research-empty">No papers match your search.</p>
            )}
          </div>

          {/* TODO: real pagination once there are more papers than one page */}
          <div className="Research-pagination">
            <span className="Research-page-arrow">←</span>
            <span className="Research-page active">1</span>
            <span className="Research-page">2</span>
            <span className="Research-page">3</span>
            <span className="Research-page-arrow">→</span>
          </div>
        </div>

        {filterList("Research-filters-sidebar")}
      </div>
    </div>
  );
}

export default ResearchPage;
