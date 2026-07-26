import Header from "../components/Header";
import ProductFeatureShowcase, { ShowcaseFeature } from "../components/ProductFeatureShowcase";
import RoadmapTimeline from "../components/RoadmapTimeline";
import ProductCta from "../components/ProductCta";
import iconSearch from "../images/figma/mensura/icon_search.svg";
import iconDatabase from "../images/figma/mensura/icon_database.svg";
import iconChartArrow from "../images/figma/mensura/icon_chart_arrow.svg";
import iconChartBubble from "../images/figma/mensura/icon_chart_bubble.svg";
import iconDollar from "../images/figma/mensura/icon_dollar.svg";
import imgDataframe from "../images/dataframe_comparison.png";
import imgChart from "../images/chart_example.png";
import "../App.css";
import "./MensuraPage.css";

const chartIcon = (
  <span className="sf-icon-stack">
    <img src={iconChartBubble} alt="" />
    <img className="sf-icon-stack-arrow" src={iconChartArrow} alt="" />
  </span>
);

const FEATURES: ShowcaseFeature[] = [
  {
    key: "inspect",
    name: "Inspect",
    icon: <img src={iconSearch} alt="" />,
    gridDesc: "Deep entity profiles for researchers, labs, departments, institutions, fields, and regions with Liberata-native metrics.",
    altDesc: "Deep entity profiles for researchers, labs, departments, institutions, fields, and regions with Liberata-native metrics.",
    label: "/Inspect",
    headline: "Every entity, fully explained",
    longDesc:
      "Search any researcher, lab, institution, field, or region and open a dashboard built around it — what they publish, where their academic capital comes from, and how they stack up against peers. No stitching together five different systems to get one answer.",
    points: [
      { lead: "Search everything.", text: "Researchers, labs, institutions, departments, fields, countries, and regions are all searchable from one bar. Entity type is labeled right in the results, so you're never guessing which \"Cambridge\" you found." },
      { lead: "Old and new metrics, side by side.", text: "Total and average citations sit next to Academic Capital and Risk Premium. Every card comes with a definition and shows where the entity lands against the 25th, 50th, and 75th percentile." },
      { lead: "Your layout.", text: "Cards can be removed, swapped, resized, and rearranged in an Edit View mode. The dashboard ends up shaped like your workflow, not a fixed template." },
      { lead: "Always exportable.", text: "Views convert to PDF or structured data, entities can be bookmarked for quick return, and view-only links can be shared with a colleague in seconds." },
    ],
  },
  {
    key: "dataframe",
    name: "Dataframe",
    icon: <img src={iconDatabase} alt="" />,
    gridDesc: "A spreadsheet-style workspace to line entities up side by side across any set of metrics. Sort, filter, and export benchmarking tables in seconds.",
    altDesc: "A spreadsheet-style workspace to line entities up side by side across any set of metrics. Sort, filter, and export benchmarking tables in seconds.",
    label: "/Dataframe",
    headline: "Build the table you actually need",
    longDesc:
      "Add entities as rows, metrics as columns, and build a comparison table across researchers, institutions, fields, regions, or labs. No flipping between tabs, no rebuilding the same spreadsheet from scratch every time.",
    points: [
      { lead: "Rows for entities, columns for metrics.", text: "Compare ten researchers or a hundred institutions in the same table. Mixed entity types are labeled clearly, so a table of labs and countries never gets confusing" },
      { lead: "Never manually saved.", text: "Every entity, metric, and layout choice saves automatically as you work — no Save button, no starting over." },
      { lead: "A real spreadsheet.", text: "Sort, filter, resize, collapse, and highlight columns and rows, the same way you already work in a table." },
      { lead: "Reusable, not disposable.", text: "Come back to a saved comparison later, or export it as CSV, TSV, XLSX, or PDF when it's ready to leave the platform." },
    ],
  },
  {
    key: "chart",
    name: "Chart",
    icon: chartIcon,
    gridDesc: "Track output, impact, and academic capital over time. See trajectories and field dynamics that a single number can't show.",
    altDesc: "Track output, impact, and academic capital over time. See trajectories and field dynamics that a single number can't show.",
    label: "/Chart",
    headline: "See the pattern, not just the numbers",
    longDesc:
      "Pick entities and metrics in any order and let the chart build itself — time series, scatter, bar, histogram, or bubble. Mark the spike, the drop, the turning point, and explain why it happened.",
    points: [
      { lead: "Build it your way.", text: "Add entities or metrics first, whichever comes to mind — the chart generates once both are selected, and what's chosen stays visible the whole time." },
      { lead: "Six ways to ask the question.", text: "Time series for trends, scatter and bubble for relationships, bar for rankings, histogram for distributions — each with the exact controls that chart type needs." },
      { lead: "Explain the moment.", text: "Drop a pin on a spike or anomaly and attach a note, right on the chart, right where it happened." },
      { lead: "Ready when you are.", text: "Every change saves automatically. Export to image or PDF, or share a view-only link when it's time to hand it off." },
    ],
  },
  {
    // No expanded design exists for Economic Impact yet — card renders without an expand button
    key: "economic",
    name: "Economic Impact",
    icon: <img src={iconDollar} alt="" />,
    gridDesc: "Connect scholarly output to downstream funding, patents, and technology transfer.",
    altDesc: "Connect scholarly output to downstream funding, patents, and technology transfer.",
    label: "/Economic Impact",
    headline: "",
    longDesc: "",
    points: [],
    expandable: false,
  },
];

const ANALYTICS_PANELS = [
  { title: "Dataframe", tag: "Institution:", image: imgDataframe, alt: "Mensura dataframe comparison table" },
  { title: "Charts", tag: "Top 3", image: imgChart, alt: "Mensura time-series chart" },
];

function MensuraPage() {
  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="MensuraHero" id="intro">
        <Header />
        <h1 className="MensuraHero-title">Mensura.</h1>
        <p className="MensuraHero-subtitle">Research intelligence for institutions, funders, and policymakers.</p>
        <p className="MensuraHero-description">
          Inspect, compare, and visualize research impact using Liberata-native Academic Capital metrics,
          quality-control signals, and scientometrics, at every scale from researcher to nation.
        </p>
      </div>

      <div className="MensuraBody">
        <div className="MensuraSection">
          <div className="section-heading">/Features</div>
          <h2 className="MensuraSection-title">The math of academic merit</h2>
          <ProductFeatureShowcase features={FEATURES} largeSmallTitles />
        </div>

        <div className="MensuraSection">
          <div className="section-heading">/Analytics</div>
          <h2 className="MensuraSection-title">Impact visualization</h2>
          <div className="MensuraAnalytics">
            {ANALYTICS_PANELS.map((panel) => (
              <div className="MensuraAnalytics-panel" key={panel.title}>
                <div className="MensuraAnalytics-header">
                  <span className="MensuraAnalytics-name">{panel.title}</span>
                  <span className="MensuraAnalytics-tag">{panel.tag}</span>
                </div>
                <img className="MensuraAnalytics-image" src={panel.image} alt={panel.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="MensuraSection">
          <div className="section-heading">/Roadmap</div>
          <RoadmapTimeline />
        </div>

        <ProductCta
          title="Measure what actually matters."
          subtitle="Built for research offices, funding agencies, and policymakers who need more than citation counts."
          primaryLabel="Get a demo →"
          primaryTo="/beta-signup"
          secondaryLabel="See sample metrics"
        />
      </div>
    </div>
  );
}

export default MensuraPage;
