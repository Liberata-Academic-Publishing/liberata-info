import "./RoadmapTimeline.css";

const DEFAULT_ROADMAP = [
  { date: "June 2026", milestone: "Alpha version & testing with early users" },
  { date: "Dec 2026", milestone: "Beta open trials" },
  { date: "June 2027", milestone: "Full rollout" },
  { date: "Dec 2027", milestone: "AI based premium features" },
];

type Entry = { date: string; milestone: string };

const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// `new Date("June 2026")` relies on the JS engine's own loose parsing of a
// non-ISO string, which isn't standardized — Chrome (desktop and its dev
// tools device emulation, still the same engine) accepts it, but Safari on
// an actual iPhone returns Invalid Date for it. That silently broke every
// "reached" check below (isNaN caught it and skipped the entry), so no
// milestone was ever marked reached on a real iPhone even though the exact
// same code looked correct when just resizing a desktop browser. Parsing
// the "<Month> <year>" shape explicitly, rather than handing the whole
// string to `new Date`, sidesteps that engine-specific behavior entirely.
function parseEntryDate(date: string): Date | null {
  const match = date.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!match) return null;
  const monthIndex = MONTH_INDEX[match[1].slice(0, 3).toLowerCase()];
  if (monthIndex === undefined) return null;
  return new Date(Number(match[2]), monthIndex, 1);
}

// The most recent milestone whose date has already passed, so the timeline
// can show progress toward "now" instead of a static list. -1 means today
// is before every milestone (nothing reached yet).
function getCurrentIndex(entries: Entry[]): number {
  const today = new Date();
  let currentIndex = -1;
  entries.forEach((entry, i) => {
    const entryDate = parseEntryDate(entry.date);
    if (entryDate && entryDate <= today) {
      currentIndex = i;
    }
  });
  return currentIndex;
}

function RoadmapTimeline({ entries = DEFAULT_ROADMAP }: { entries?: Entry[] }) {
  const currentIndex = getCurrentIndex(entries);

  return (
    <div className="roadmap">
      {entries.map((entry, i) => {
        // Dot i and the connector leading away from it both fill once its
        // date has passed — that connector is the segment we're currently
        // in the middle of (e.g. between June and Dec once June has
        // passed), so it counts as "reached" too, not just the dot itself.
        const reached = i <= currentIndex;
        const stepClassName = ["roadmap-step", reached && "roadmap-step-reached"].filter(Boolean).join(" ");

        return (
          <div className={stepClassName} key={entry.date}>
            <p className="roadmap-date">{entry.date}</p>
            <div className="roadmap-line">
              {/* inline (not <img src="...svg">) so fill/stroke can reference
                  var(--neutral-400) / var(--brand-500) directly, same as the
                  mobile connector below, instead of a hardcoded hex baked
                  into a separate image file that can drift out of sync */}
              <svg className="roadmap-dot" viewBox="0 0 18.75 18.75" fill="none" aria-hidden="true">
                <circle cx="9.375" cy="9.375" r="9.375" />
              </svg>
              <svg className="roadmap-rule" viewBox="0 0 263.75 1.25" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="0.625" x2="263.75" y2="0.625" strokeWidth="1.25" />
              </svg>
            </div>
            <p className="roadmap-milestone">{entry.milestone}</p>
          </div>
        );
      })}
    </div>
  );
}

export default RoadmapTimeline;
