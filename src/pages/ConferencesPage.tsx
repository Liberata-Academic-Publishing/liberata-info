import { useLayoutEffect, useRef, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import "./ConferencesPage.css";

type Conference = {
  name: string;
  location: string;
  date: string;
  // Only the featured (most recent) conference carries a pull-quote and a
  // link out to its writeup — the grid cards below don't have either yet.
  quote?: string;
  link?: { label: string; url: string };
  tags: string[];
  description: string;
  representedBy: string[];
  status: "attended" | "upcoming";
};

// Dot color for each focus-area tag, both in the filter row and on the tag
// pills themselves. Colors are otherwise untokenized in this codebase, so
// these are picked to stay distinguishable alongside the existing palette.
const FOCUS_AREAS: { label: string; color: string }[] = [
  { label: "Academic publishing", color: "#4f70d8" },
  { label: "Peer review", color: "#22d3ee" },
  { label: "Technology", color: "#8b5cf6" },
  { label: "Research integrity", color: "#f59e0b" },
];

const FOCUS_COLOR: Record<string, string> = Object.fromEntries(
  FOCUS_AREAS.map((f) => [f.label, f.color])
);

// TODO: verify names, dates, and locations against the source list before
// publishing — transcribed from the Figma mockup, some of it (attendee
// names especially) is small enough that it's worth a second pass.
const CONFERENCES: Conference[] = [
  {
    name: "CIVICA Open Science Conference 2026",
    location: "London, UK",
    date: "May 20, 2026",
    quote: "Shaping the Future of Open Research",
    tags: ["Academic publishing", "Research integrity"],
    description:
      "The CIVICA alliance's open-science gathering, on the practices and infrastructure that keep research open, reproducible, and trustworthy. Han Zhang represented Liberata; the full programme is published.",
    representedBy: ["Han Zhang"],
    status: "attended",
    link: { label: "Conference paper", url: "#" },
  },
  {
    name: "OIS Research Conference 2026",
    location: "Copenhagen, Denmark",
    date: "May 11–13, 2026",
    tags: ["Academic publishing", "Technology"],
    description: "On the systems and technology behind open, interoperable scholarship. Proceedings are published.",
    representedBy: ["Han Zhang"],
    status: "attended",
  },
  {
    name: "FOR2026 – Facts of Research",
    location: "Munich, Germany",
    date: "Apr 4–6, 2026",
    tags: ["Academic publishing", "Peer review", "Technology"],
    description: "Research on research — how open science gets studied, measured, and reviewed.",
    representedBy: ["Han Zhang"],
    status: "attended",
  },
  {
    name: "R2R 2026 – Research to Reader",
    location: "London, UK",
    date: "Feb 24, 2026",
    tags: ["Academic publishing", "Peer review", "Research integrity"],
    description: "Bridging research and readers, centred on peer review and integrity across the publishing pipeline.",
    representedBy: ["Patrick Prochazka", "Anish R. Verma"],
    status: "attended",
  },
  {
    name: "DiamondOA Summit 2026",
    location: "Bengaluru, India",
    date: "Feb 2, 2026",
    tags: ["Academic publishing", "Peer review", "Technology"],
    description: "On diamond open access — publishing free for authors and readers — and the peer review tooling that makes it work.",
    representedBy: ["Anshuman Sabu"],
    status: "attended",
  },
  {
    name: "STI 2026 – Science & Technology Indicators",
    location: "Antwerp, Belgium",
    date: "Sep 9–11, 2026",
    tags: ["Academic publishing", "Research integrity", "Technology"],
    description: "The 30th international conference on measuring publishing, integrity, and technology. Talk accepted.",
    representedBy: ["Anshuman Sabu"],
    status: "upcoming",
  },
  {
    name: "OASPA Annual Conference 2026",
    location: "Zagreb, Croatia",
    date: "Sep 21–23, 2026",
    tags: ["Academic publishing"],
    description: "The Open Access Scholarly Publishers Association's annual meeting on the practice and business of open publishing.",
    representedBy: ["Han Zhang"],
    status: "upcoming",
  },
  {
    name: "RDA 27th Plenary (P27)",
    location: "London, UK",
    date: "Oct 6–8, 2026",
    tags: ["Academic publishing", "Technology"],
    description: "The Research Data Alliance, on the data infrastructure under open publishing. Session accepted.",
    representedBy: ["Patrick Prochazka"],
    status: "upcoming",
  },
  {
    name: "IOSP 2026",
    location: "Leiden, Netherlands",
    date: "Oct 13–15, 2026",
    tags: ["Academic publishing", "Technology"],
    description: "An interdisciplinary gathering on open-science policy and the publishing technology that supports it.",
    representedBy: ["Han Zhang", "Patrick Prochazka"],
    status: "upcoming",
  },
  {
    name: "Charleston Conference 2026",
    location: "Charleston, SC, USA",
    date: "Nov 2–6, 2026",
    tags: ["Academic publishing"],
    description: "Brings libraries, publishers, and vendors together around scholarly collections. Proposal submitted.",
    representedBy: ["Han Zhang", "Patrick Prochazka"],
    status: "upcoming",
  },
];

const STATUS_FILTERS: { label: string; value: "All" | "Attended" | "Upcoming" }[] = [
  { label: "All", value: "All" },
  { label: "Attended", value: "Attended" },
  { label: "Upcoming", value: "Upcoming" },
];

function LocationPin() {
  return (
    <svg className="Conferences-pin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 15s5-4.5 5-8.5A5 5 0 0 0 3 6.5C3 10.5 8 15 8 15Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="6.5" r="1.75" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="Conferences-tag">
      <span className="Conferences-tag-dot" style={{ background: FOCUS_COLOR[label] ?? "var(--neutral-500)" }} />
      {label}
    </span>
  );
}

// Single-letter avatar, colored from the person's own name so the same
// person always gets the same color across cards.
function initialFor(name: string) {
  return name.charAt(0).toUpperCase();
}

function AttendeeAvatar({ name }: { name: string }) {
  return <span className="Conferences-avatar">{initialFor(name)}</span>;
}

function Attribution({ names }: { names: string[] }) {
  return (
    <div className="Conferences-attribution">
      <AttendeeAvatar name={names[0]} />
      <span className="Conferences-attribution-label">Represented by {names.join(" & ")}</span>
    </div>
  );
}

function FeaturedConference({ conf }: { conf: Conference }) {
  return (
    <div className="Conferences-featured">
      {/* TODO: conference photo pending — gradient placeholder per the wireframe */}
      <div className="Conferences-featured-image" />
      <div className="Conferences-featured-content">
        <div className="Conferences-meta">
          <span className="Conferences-location">
            <LocationPin />
            {conf.location}
          </span>
          <span className="Conferences-date">{conf.date}</span>
        </div>
        <p className="Conferences-featured-name">{conf.name}</p>
        {conf.quote && <p className="Conferences-quote">"{conf.quote}"</p>}
        <div className="Conferences-tags">
          {conf.tags.map((tag) => (
            <TagPill label={tag} key={tag} />
          ))}
        </div>
        <p className="Conferences-desc">{conf.description}</p>
        <div className="Conferences-featured-footer">
          <Attribution names={conf.representedBy} />
          {conf.link && (
            <a href={conf.link.url} className="Conferences-featured-link">
              {conf.link.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ConferenceCard({ conf }: { conf: Conference }) {
  return (
    <div className="Conferences-card">
      <div className="Conferences-meta">
        <span className="Conferences-location">
          <LocationPin />
          {conf.location}
        </span>
        <span className="Conferences-date">{conf.date}</span>
      </div>
      <p className="Conferences-card-name">{conf.name}</p>
      <div className="Conferences-tags">
        {conf.tags.map((tag) => (
          <TagPill label={tag} key={tag} />
        ))}
      </div>
      <p className="Conferences-desc">{conf.description}</p>
      <Attribution names={conf.representedBy} />
    </div>
  );
}

function ConferencesPage() {
  const [statusFilter, setStatusFilter] = useState<"All" | "Attended" | "Upcoming">("All");
  const [focusFilter, setFocusFilter] = useState<string | null>(null);

  // the indicator hugs whichever pill's text is active (their widths differ:
  // "All" vs "Attended" vs "Upcoming"), so its box is measured from the real
  // button rather than assumed to be an equal third of the toggle
  const statusPillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [statusIndicator, setStatusIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeIndex = STATUS_FILTERS.findIndex((f) => f.value === statusFilter);
    const activeEl = statusPillRefs.current[activeIndex];
    if (activeEl) {
      setStatusIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [statusFilter]);

  useLayoutEffect(() => {
    const recalc = () => {
      const activeIndex = STATUS_FILTERS.findIndex((f) => f.value === statusFilter);
      const activeEl = statusPillRefs.current[activeIndex];
      if (activeEl) {
        setStatusIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
      }
    };
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [featured, ...rest] = CONFERENCES;

  const filtered = rest.filter((conf) => {
    const matchesStatus =
      statusFilter === "All" || conf.status === statusFilter.toLowerCase();
    const matchesFocus = !focusFilter || conf.tags.includes(focusFilter);
    return matchesStatus && matchesFocus;
  });

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="ConferencesHero" id="intro">
        <Header />
        <h1 className="ConferencesHero-title">Conferences.</h1>
        <p className="ConferencesHero-subtitle">Conferences, features, and updates from Liberata</p>
      </div>

      <div className="ConferencesBody">
        <div className="section-heading">MOST RECENT</div>
        <FeaturedConference conf={featured} />

        <div className="Conferences-listHeader">
          <h2 className="ConferencesSection-title">All Conferences</h2>
          <div className="Conferences-statusToggle">
            {/* sliding pill behind the buttons — same pattern as Norma's
                Quickstart Code View/Output toggle and Textura's Graph
                View/Code View toggle, adapted so the pill hugs each
                button's actual measured width instead of an equal third */}
            <div
              className="Conferences-statusToggle-indicator"
              style={{ left: statusIndicator.left, width: statusIndicator.width }}
              aria-hidden="true"
            />
            {STATUS_FILTERS.map((f, i) => (
              <button
                type="button"
                key={f.value}
                ref={(el) => { statusPillRefs.current[i] = el; }}
                className={`Conferences-statusPill${statusFilter === f.value ? " active" : ""}`}
                onClick={() => setStatusFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="Conferences-focusRow">
          <span className="Conferences-focusRow-label">FOCUS AREAS</span>
          {FOCUS_AREAS.map((f) => (
            <button
              type="button"
              key={f.label}
              className={`Conferences-focusPill${focusFilter === f.label ? " active" : ""}`}
              onClick={() => setFocusFilter(focusFilter === f.label ? null : f.label)}
            >
              <span className="Conferences-tag-dot" style={{ background: f.color }} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="Conferences-grid">
          {filtered.map((conf) => (
            <ConferenceCard conf={conf} key={conf.name} />
          ))}
          {filtered.length === 0 && <p className="Conferences-empty">No conferences match those filters.</p>}
        </div>
      </div>
    </div>
  );
}

export default ConferencesPage;
