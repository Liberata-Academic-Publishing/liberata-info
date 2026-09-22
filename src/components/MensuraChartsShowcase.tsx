import { useState } from "react";
import iconCarouselNext from "../images/figma/products/icon_carousel_next.svg";
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

const PER_PAGE = 3;

function ChartTile({ chart }: { chart: (typeof CHART_TYPES)[number] }) {
  return (
    <div className="MensuraChart-tile">
      <img src={chart.image} alt={`${chart.name} in Mensura`} />
      <p className="MensuraChart-name">{chart.name}</p>
    </div>
  );
}

function MensuraChartsShowcase() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(CHART_TYPES.length / PER_PAGE);
  const next = () => setPage((p) => (p + 1) % pageCount);
  const prev = () => setPage((p) => (p - 1 + pageCount) % pageCount);

  return (
    <div className="MensuraCharts">
      {/* Desktop: 3 charts at a time, arrows page by a full row */}
      <div className="MensuraCharts-desktop">
        <button type="button" className="MensuraCharts-arrow" aria-label="Previous charts" onClick={prev}>
          <img src={iconCarouselNext} alt="" />
        </button>
        <div className="MensuraCharts-viewport">
          <div className="MensuraCharts-track" style={{ transform: `translateX(-${page * 100}%)` }}>
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div className="MensuraCharts-page" key={pageIndex}>
                {CHART_TYPES.slice(pageIndex * PER_PAGE, pageIndex * PER_PAGE + PER_PAGE).map((chart) => (
                  <ChartTile chart={chart} key={chart.name} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="MensuraCharts-arrow MensuraCharts-arrow-next" aria-label="Next charts" onClick={next}>
          <img src={iconCarouselNext} alt="" />
        </button>
      </div>

      {/* Mobile: swipe through one at a time, same pattern as Textura/Norma */}
      <div className="MensuraCharts-mobile">
        {CHART_TYPES.map((chart) => (
          <ChartTile chart={chart} key={chart.name} />
        ))}
      </div>
    </div>
  );
}

export default MensuraChartsShowcase;
