import { useState } from "react";
import Header from "../components/Header";
import iconSearch from "../images/figma/research/icon_search.svg";
import "../App.css";
import "./NewsPage.css";

type NewsItem = {
  tag: string;
  category: string;
  date: string;
  title: string;
  description: string;
  // TODO: link to the actual stories once they exist
  url?: string;
};

// TODO: placeholder items from the wireframe — replace with real news entries
const NEWS: NewsItem[] = [
  { tag: "Conference", category: "Conferences", date: "Date", title: "Title", description: "Description" },
  { tag: "Feature", category: "Features", date: "Date", title: "Title", description: "Description" },
  { tag: "Conference", category: "Conferences", date: "Sep 2025", title: "Duke Innovation Forum", description: "Description" },
  { tag: "Update", category: "Updates", date: "Aug 2025", title: "Textura Alpha Release", description: "Description" },
];

const CATEGORIES = ["All", "Conferences", "Features", "Updates", "Media"];

function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const items = NEWS.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const filterList = (extraClass: string) => (
    <div className={extraClass}>
      {CATEGORIES.map((name) => (
        <button
          type="button"
          key={name}
          className={`News-filter ${name === category ? "active" : ""}`}
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
      <div className="NewsHero" id="intro">
        <Header />
        <h1 className="NewsHero-title">News.</h1>
        <p className="NewsHero-subtitle">Conferences, features, and updates from Liberata</p>
      </div>

      <div className="NewsBody">
        <div className="NewsMain">
          {/* Search + pill filters appear on mobile per the mobile wireframe */}
          <div className="News-search">
            <img src={iconSearch} alt="" />
            <input
              type="search"
              placeholder="Search news"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search news"
            />
          </div>
          {filterList("News-filters-mobile")}

          <div className="News-grid">
            {items.map((item, i) => (
              <div className="News-card" key={`${item.title}-${i}`}>
                <div className="News-card-top">
                  <span className="News-tag">{item.tag}</span>
                  <span className="News-date">{item.date}</span>
                </div>
                {/* TODO: story image pending — gradient placeholder per the wireframe */}
                <div className="News-image" />
                <div className="News-card-text">
                  <p className="News-card-title">{item.title}</p>
                  <p className="News-card-desc">{item.description}</p>
                </div>
                <span className="News-card-link">Read more →</span>
              </div>
            ))}
            {items.length === 0 && <p className="News-empty">No news matches your search.</p>}
          </div>

          {/* TODO: real pagination once there is more than one page of news */}
          <div className="News-pagination">
            <span className="News-page-arrow">←</span>
            <span className="News-page active">1</span>
            <span className="News-page">2</span>
            <span className="News-page">3</span>
            <span className="News-page-arrow">→</span>
          </div>
        </div>

        {filterList("News-filters-sidebar")}
      </div>
    </div>
  );
}

export default NewsPage;
