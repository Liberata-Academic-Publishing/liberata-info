import roadmapDot from "../images/figma/scriptura/roadmap_dot.svg";
import roadmapLine from "../images/figma/scriptura/roadmap_line.svg";
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
            <img className="roadmap-dot" src={roadmapDot} alt="" />
            <img className="roadmap-rule" src={roadmapLine} alt="" />
          </div>
          <p className="roadmap-milestone">{entry.milestone}</p>
        </div>
      ))}
    </div>
  );
}

export default RoadmapTimeline;
