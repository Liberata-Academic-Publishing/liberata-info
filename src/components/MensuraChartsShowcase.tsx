import { useRef, useState } from "react";
import chartTimeSeries from "../images/figma/mensura/Time Series.png";
import chartLine from "../images/figma/mensura/Line Chart.png";
import chartBar from "../images/figma/mensura/Bar Chart.png";
import chartScatter from "../images/figma/mensura/Scatterplot.png";
import chartBubble from "../images/figma/mensura/Bubble Chart.png";
import chartHistogram from "../images/figma/mensura/Histogram.png";
import "./MensuraChartsShowcase.css";

const CHART_TYPES = [
  { name: "Time Series", image: chartTimeSeries },
  { name: "Line Chart", image: chartLine },
  { name: "Bar Chart", image: chartBar },
  { name: "Scatterplot", image: chartScatter },
  { name: "Bubble Chart", image: chartBubble },
  { name: "Histogram", image: chartHistogram },
];

// Just the chevron from icon_carousel_next.svg, inlined without that
// asset's own baked-in translucent grey circle — the circle is part of the
// SVG file itself, not something CSS added, so it couldn't be styled away.
function ChevronIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.53784 14.3388L11.8196 11.0571C11.9936 10.883 12.0914 10.6469 12.0914 10.4007C12.0914 10.1545 11.9936 9.91844 11.8196 9.74437L8.53784 6.46265"
        stroke="currentColor"
        strokeWidth="1.55638"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartTile({ chart }: { chart: (typeof CHART_TYPES)[number] }) {
  return (
    <div className="MensuraChart-tile">
      <img src={chart.image} alt={`${chart.name} in Mensura`} />
      <p className="MensuraChart-name">{chart.name}</p>
    </div>
  );
}

function MensuraChartsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  };

  // Scrolls by exactly one tile (measured from the actual rendered layout)
  // instead of jumping a full "page" at a time — this is what gives the
  // next/previous tile its peek.
  const scrollByOne = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="MensuraCharts">
      {/* Desktop: the cards themselves fill the section's normal width and
          peek their own next/previous card at the edge — the arrow is a
          bare chevron (no box, no background) sitting separately out in the
          page margin, not overlapping the cards at all. */}
      <button
        type="button"
        className="MensuraCharts-arrow MensuraCharts-arrow-prev"
        aria-label="Previous charts"
        onClick={() => scrollByOne(-1)}
        disabled={atStart}
      >
        <ChevronIcon />
      </button>

      <div className="MensuraCharts-track-wrap">
        <div className="MensuraCharts-track" ref={trackRef} onScroll={updateEdges}>
          {CHART_TYPES.map((chart) => (
            <ChartTile chart={chart} key={chart.name} />
          ))}
        </div>
        {/* Softens the hard crop on whichever edge still has more to
            reveal — a plain rectangular clip otherwise looks like a
            mistake rather than "there's more this way." */}
        {!atStart && <div className="MensuraCharts-fade MensuraCharts-fade-left" aria-hidden="true" />}
        {!atEnd && <div className="MensuraCharts-fade MensuraCharts-fade-right" aria-hidden="true" />}
      </div>

      <button
        type="button"
        className="MensuraCharts-arrow MensuraCharts-arrow-next"
        aria-label="Next charts"
        onClick={() => scrollByOne(1)}
        disabled={atEnd}
      >
        <ChevronIcon />
      </button>

      {/* Mobile: swipe through one at a time, same peeking pattern as Textura/Norma */}
      <div className="MensuraCharts-mobile">
        {CHART_TYPES.map((chart) => (
          <ChartTile chart={chart} key={chart.name} />
        ))}
      </div>
    </div>
  );
}

export default MensuraChartsShowcase;
