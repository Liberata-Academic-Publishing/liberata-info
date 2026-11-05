import { useState } from "react";
import Header from "../components/Header";
import ProductFeatureShowcase, { ShowcaseFeature } from "../components/ProductFeatureShowcase";
import RoadmapTimeline from "../components/RoadmapTimeline";
import ProductCta from "../components/ProductCta";
import HeroLinkButton from "../components/HeroLinkButton";
import ContactModal from "../components/ContactModal";
import iconSearch from "../images/figma/mensura/icon_search.svg";
import iconDatabase from "../images/figma/mensura/icon_database.svg";
import iconChartBubble from "../images/figma/mensura/icon_chart_bubble.svg";
import iconCohorts from "../images/figma/mensura/icon_cohorts.svg";
import chartTimeSeries from "../images/figma/mensura/Time Series.png";
import chartLine from "../images/figma/mensura/Line Chart.png";
import chartBar from "../images/figma/mensura/Bar Chart.png";
import chartScatter from "../images/figma/mensura/Scatterplot.png";
import chartBubble from "../images/figma/mensura/Bubble Chart.png";
import chartHistogram from "../images/figma/mensura/Histogram.png";
import demoChart2 from "../images/figma/mensura/demo_chart_2.png";
import demoChart5 from "../images/figma/mensura/demo_chart_5.png";
import demoChart7 from "../images/figma/mensura/demo_chart_7.png";
import demoDataframe1 from "../images/figma/mensura/demo_dataframe_1.png";
import demoDataframe2 from "../images/figma/mensura/demo_dataframe_2.png";
import demoDataframe3 from "../images/figma/mensura/demo_dataframe_3.png";
import demoDataframe4 from "../images/figma/mensura/demo_dataframe_4.png";
import demoDataframe5 from "../images/figma/mensura/demo_dataframe_5.png";
import demoDataframe6 from "../images/figma/mensura/demo_dataframe_6.png";
import demoInspect1 from "../images/figma/mensura/demo_inspect_1.png";
import demoInspect2 from "../images/figma/mensura/demo_inspect_2.png";
import demoInspect3 from "../images/figma/mensura/demo_inspect_3.png";
import demoInspect4 from "../images/figma/mensura/demo_inspect_4.png";
import demoInspect5 from "../images/figma/mensura/demo_inspect_5.png";
import demoInspect6 from "../images/figma/mensura/demo_inspect_6.png";
import demoCohorts1 from "../images/figma/mensura/demo_cohorts_1.png";
import demoCohorts2 from "../images/figma/mensura/demo_cohorts_2.png";
import demoCohorts3 from "../images/figma/mensura/demo_cohorts_3.png";
import demoCohorts4 from "../images/figma/mensura/demo_cohorts_4.png";
import demoCohorts5 from "../images/figma/mensura/demo_cohorts_5.png";
import demoCohorts6 from "../images/figma/mensura/demo_cohorts_6.png";
import "../App.css";
import "./MensuraPage.css";

const MENSURA_URL = "https://mensura.liberata.app";

const FEATURES: ShowcaseFeature[] = [
  {
    key: "inspect",
    name: "Inspect",
    icon: <img src={iconSearch} alt="" />,
    gridDesc: "Detailed entity profiles for researchers, labs, departments, institutions, fields, and geographic regions with Liberata's Norma scientometrics",
    altDesc: "Detailed entity profiles for researchers, labs, departments, institutions, fields, and geographic regions with Liberata's Norma scientometrics",
    label: "Inspect",
    demo: [demoInspect1, demoInspect2, demoInspect3, demoInspect4, demoInspect5, demoInspect6],
    demoAlt: "Mensura entity profile: a search bar above a dashboard of metric cards for the selected entity",
    headline: "Detailed reports for academic entities",
    longDesc:
      "Examine any researcher, lab, institution, field, or region on a customizable dashboard of metrics and indicators.",
    points: [
      { lead: "Universal search.", text: "Anything that has a portfolio of contribution shares on articles exists as an inspectable entity, all searchable with intuitive filters." },
      { lead: "Novel and conventional metrics.", text: "Customize your reports and dashboards to track the metrics you care about with a complete catalog of conventional and Liberata's Norma metrics." },
      { lead: "Interactive widgets.", text: "Go beyond customizing a dashboard of visuals with interactive components that allow for deeper entity analysis." },
      { lead: "Exportable and shareable.", text: "Export dashboards into print-friendly versions or share interactive views with colleagues in a couple of clicks." },
    ],
  },
  {
    key: "dataframe",
    name: "Dataframe",
    icon: <img src={iconDatabase} alt="" />,
    gridDesc: "Augmented spreadsheet workspace to line entities up for comparison across any set of metrics. Sort, filter, and export benchmarking tables in seconds.",
    altDesc: "Augmented spreadsheet workspace to line entities up for comparison across any set of metrics. Sort, filter, and export benchmarking tables in seconds.",
    label: "Dataframe",
    demo: [demoDataframe1, demoDataframe2, demoDataframe3, demoDataframe4, demoDataframe5, demoDataframe6],
    demoAlt: "Mensura dataframe: entities as rows and metrics as sortable columns in a comparison table",
    headline: "Tabular comparison of any entities on any metrics",
    longDesc:
      "Add entities as rows, metrics as columns, and build a comparison table across researchers, institutions, fields, or geographic regions.",
    points: [
      { lead: "Rows for entities, columns for metrics.", text: "Compare ten researchers or a hundred institutions in the same table. Mixed entity types are labeled clearly, so a table of labs and countries never gets confusing." },
      { lead: "Custom entities and metrics.", text: "Import custom cohorts of entities you want to compare as one row, expandable into constituent rows. Use spreadsheet programming to make and save custom metrics and macros to compare them." },
      { lead: "Real-time updates.", text: "Values in your spreadsheets update automatically. Lock spreadsheets to keep snapshots in time." },
      { lead: "Exportable and shareable.", text: "Checkpoint, duplicate, export, and share your data tables in standardized formats like CSV, XLSX, or PDF when they are ready to leave the platform." },
    ],
  },
  {
    key: "chart",
    name: "Chart",
    icon: <img src={iconChartBubble} alt="" />,
    gridDesc: "Track output, impact, and institutional risks over time. Visualize trajectories and dynamics with powerful graph tools.",
    altDesc: "Track output, impact, and institutional risks over time. Visualize trajectories and dynamics with powerful graph tools.",
    label: "Chart",
    demo: [chartTimeSeries, chartLine, chartBar, chartScatter, chartBubble, chartHistogram, demoChart2, demoChart5, demoChart7],
    demoAlt: "Mensura charts: time series, line, bar, scatterplot, bubble, and histogram examples, followed by the chart builder and chart library",
    headline: "Visualizations that capture academia's dynamics and trends",
    longDesc:
      "Pick entities, metrics, and chart type to build elegant visualizations.",
    points: [
      { lead: "Build it your way.", text: "Add entities or metrics first, in either order. The chart generates once both are selected, and the current selection stays visible throughout." },
      { lead: "Custom entities and metrics.", text: "Import custom metrics to plot them on custom cohorts." },
      { lead: "Annotate and highlight.", text: "Use pins, rulers, and sketch tools to annotate your visualizations. Customize your axes and legends to highlight important details." },
      { lead: "Exportable snapshots.", text: "Lock your chart data to preserve a snapshot or let it update automatically. Export beautiful visualizations to standard and print formats." },
    ],
  },
  {
    key: "cohorts",
    name: "Cohorts",
    icon: <img className="sf-icon-cohorts" src={iconCohorts} alt="" />,
    gridDesc: "Construct your own academic entity groupings from people, institutions, academic fields, or geographic regions for use with Inspect, Dataframe, or Chart.",
    altDesc: "Construct your own academic entity groupings from people, institutions, academic fields, or geographic regions for use with Inspect, Dataframe, or Chart.",
    label: "Cohorts",
    demo: [demoCohorts1, demoCohorts2, demoCohorts3, demoCohorts4, demoCohorts5, demoCohorts6],
    demoAlt: "Mensura cohort builder: a dynamic cohort form beside a live preview of the matching researchers",
    headline: "Make custom academic entities for inspection and comparison",
    longDesc:
      "Liberata treats anything with a portfolio of contribution shares on articles as an academic entity for its metrics. This gives unprecedented customizability for analysis on groupings and subcomponents of traditional entities.",
    points: [
      { lead: "Dynamic or static.", text: "Build static cohorts, which are bundles of entities you search and select, or define a dynamic rule like \"Top N institutions in X\", which automatically populates the cohort and swaps its constituent entities." },
      { lead: "Inspect, Dataframe, or Chart.", text: "Use your cohorts just like an academic entity in any other platform feature for inspection, comparison, and visualization." },
      { lead: "Filter and sort.", text: "Organize your cohorts and rank them by impact, risk, relevance, and more." },
      { lead: "Checkpoint and share.", text: "Checkpoint your dynamic cohorts to save a static copy, and share your cohorts with other platform users." },
    ],
  },
];

function MensuraPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="MensuraHero" id="intro">
        <Header />
        <h1 className="MensuraHero-title">Mensura</h1>
        <p className="MensuraHero-subtitle">Research intelligence for institutions, funders, and policymakers</p>
        <p className="MensuraHero-description">
          Inspect, compare, and visualize research impact using Liberata scientometrics, extensible to all academic entities, from researchers to institutions to geographic regions.
        </p>
        <HeroLinkButton href={MENSURA_URL}>Open Mensura</HeroLinkButton>
      </div>

      <div className="MensuraBody">
        <div className="MensuraSection">
          <div className="section-heading">Features</div>
          <h2 className="MensuraSection-title">Unified power tool for inspecting, comparing, charting, and grouping all academic entities</h2>
          <ProductFeatureShowcase features={FEATURES} />
        </div>

        <div className="MensuraSection">
          <div className="section-heading">Timeline</div>
          <RoadmapTimeline />
        </div>

        <ProductCta
          title="Join institutions, funders, and policymakers on Mensura"
          primaryLabel={
            <>
              <span>Open Mensura</span>
              {/* real icon instead of a plain "→" character — same fix as
                  Scriptura's and Textura's ProductCta, the Norma hero CTA,
                  and the mobile "Sign up for beta" button */}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4.16626 10H15.8343M10.0003 15.834L15.8343 10L10.0003 4.16603" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </>
          }
          primaryTo={MENSURA_URL}
          secondaryLabel="Contact us"
          secondaryOnClick={() => setContactOpen(true)}
        />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </div>
  );
}

export default MensuraPage;
