import "./RoadmapTimeline.css";

const DEFAULT_ROADMAP = [
  { date: "June 2026", milestone: "Alpha version & testing with early users" },
  { date: "Dec 2026", milestone: "Beta open trials" },
  { date: "June 2027", milestone: "Full rollout" },
  { date: "Dec 2027", milestone: "AI based premium features" },
];

type Entry = { date: string; milestone: string };

function RoadmapTimeline({ entries = DEFAULT_ROADMAP }: { entries?: Entry[] }) {
  return (
    <div className="roadmap">
      {entries.map((entry) => (
        <div className="roadmap-step" key={entry.date}>
          <p className="roadmap-date">{entry.date}</p>
          <div className="roadmap-line">
            {/* inline (not <img src="...svg">) so fill/stroke can reference
                var(--neutral-400) directly, same as the mobile connector
                below, instead of a hardcoded hex baked into a separate
                image file that can drift out of sync */}
            <svg className="roadmap-dot" viewBox="0 0 18.75 18.75" fill="none" aria-hidden="true">
              <circle cx="9.375" cy="9.375" r="9.375" fill="var(--neutral-400)" />
            </svg>
            <svg className="roadmap-rule" viewBox="0 0 263.75 1.25" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="0.625" x2="263.75" y2="0.625" stroke="var(--neutral-400)" strokeWidth="1.25" />
            </svg>
          </div>
          <p className="roadmap-milestone">{entry.milestone}</p>
        </div>
      ))}
    </div>
  );
}

export default RoadmapTimeline;
