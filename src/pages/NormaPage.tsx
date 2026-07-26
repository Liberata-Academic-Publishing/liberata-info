import Header from "../components/Header";
import ProductCta from "../components/ProductCta";
import KpiStrip from "../components/KpiStrip";
import heroGraph from "../images/figma/norma/hero_graph.svg";
import sparkStarred from "../images/figma/norma/spark_starred.svg";
import sparkWatched from "../images/figma/norma/spark_watched.svg";
import sparkForked from "../images/figma/norma/spark_forked.svg";
import vizCitationNetwork from "../images/figma/norma/viz_citation_network.svg";
import vizCapitalOverTime from "../images/figma/norma/viz_capital_over_time.svg";
import outputChart from "../images/figma/norma/output_chart.svg";
import conceptReferencesMatrix from "../images/figma/norma/concept_references_matrix.svg";
import conceptMetricsNetwork from "../images/figma/norma/concept_metrics_network.svg";
import "../App.css";
import "./NormaPage.css";

const KPIS = [
  { label: "starred", value: "1", spark: sparkStarred },
  { label: "watched", value: "0", spark: sparkWatched },
  { label: "forked", value: "0", spark: sparkForked },
];

/*
 * The wireframe builds every diagram on this page out of hundreds of raw
 * ellipse/rectangle layers. They are decorative data-viz mocks, so we render
 * them from deterministic primitives instead of hundreds of tiny assets.
 */

// deterministic pseudo-random in [0, 1) — sin-hash so the (i, j) channels decorrelate
const prand = (i: number, j = 0) => {
  const x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const BLUE_DEEP = "#112ea8";
const BLUE = "#1384ff";
const BLUE_SOFT = "#7caced";
const CYAN = "#3ec7e8";

// blob-density heatmap: intensity falls off from organic cluster centres,
// with occasional bright cyan cells like the wireframe renders
function HeatGrid({ rows, cols, seed }: { rows: number; cols: number; seed: number }) {
  const centers = [
    { r: rows * 0.45, c: cols * 0.35 },
    { r: rows * 0.55, c: cols * 0.7 },
  ];
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const noise = prand(seed + r * cols + c);
      const d = Math.min(
        ...centers.map((k) => Math.hypot((r - k.r) / rows, (c - k.c) / cols))
      );
      const v = Math.max(0, 1 - d * 2.4) * 0.75 + noise * 0.35;
      let background;
      if (v > 0.72 && noise > 0.82) background = CYAN;
      else if (v > 0.72) background = BLUE_DEEP;
      else if (v > 0.52) background = BLUE;
      else if (v > 0.34) background = BLUE_SOFT;
      else if (v > 0.2) background = "rgba(124, 172, 237, 0.45)";
      else background = "rgba(124, 172, 237, 0.15)";
      cells.push(<span key={`${r}-${c}`} style={{ background }} />);
    }
  }
  return (
    <div className="NormaGrid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {cells}
    </div>
  );
}

// sparse scatter with density concentrated along a diagonal band
function ScatterBand({ seed, count = 90 }: { seed: number; count?: number }) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = prand(seed + i, 1) * 270 + 5;
    const bandY = 125 - (x / 280) * 95;
    const spread = 26 + prand(seed + i, 2) * 22;
    const y = bandY + (prand(seed + i, 3) - 0.5) * spread * 2;
    if (y < 6 || y > 134) continue;
    const noise = prand(seed + i, 4);
    const fill = noise > 0.9 ? CYAN : noise > 0.6 ? BLUE : noise > 0.3 ? BLUE_SOFT : BLUE_DEEP;
    dots.push(<circle key={i} cx={x} cy={y} r={1.4 + prand(seed + i, 5) * 2.6} fill={fill} fillOpacity={0.5 + noise * 0.5} />);
  }
  return <svg className="NormaDiagram-svg" viewBox="0 0 280 140">{dots}</svg>;
}

// node-edge network with halo-highlighted hubs
function DotNetwork({ seed }: { seed: number }) {
  const nodes = Array.from({ length: 14 }, (_, i) => ({
    cx: 20 + prand(seed + i, 1) * 240,
    cy: 15 + prand(seed + i, 2) * 110,
    r: 3.5 + prand(seed + i, 3) * 6,
    halo: prand(seed + i, 6) > 0.78,
    fill: prand(seed + i, 4) > 0.55 ? BLUE_DEEP : prand(seed + i, 4) > 0.25 ? BLUE : BLUE_SOFT,
  }));
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    let best = -1;
    let bestD = Infinity;
    let second = -1;
    let secondD = Infinity;
    nodes.forEach((m, j) => {
      if (i === j) return;
      const d = Math.hypot(n.cx - m.cx, n.cy - m.cy);
      if (d < bestD) { second = best; secondD = bestD; best = j; bestD = d; }
      else if (d < secondD) { second = j; secondD = d; }
    });
    if (best >= 0) edges.push([i, best]);
    if (second >= 0 && prand(seed + i, 7) > 0.4) edges.push([i, second]);
  });
  return (
    <svg className="NormaDiagram-svg" viewBox="0 0 280 140">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke={BLUE} strokeOpacity="0.4" strokeWidth="1.1" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.halo && <circle cx={n.cx} cy={n.cy} r={n.r + 6} fill={i % 2 ? CYAN : BLUE_SOFT} fillOpacity="0.35" />}
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} />
        </g>
      ))}
    </svg>
  );
}

// jagged multi-series area chart with horizontal gridlines
function AreaChart({ compact = false }: { compact?: boolean }) {
  const seriesA = "0,118 25,108 45,112 65,96 85,100 110,82 135,88 160,66 185,72 210,52 235,58 260,28 280,12";
  const seriesB = "0,128 25,124 45,118 65,121 85,110 110,113 135,102 160,106 185,92 210,96 235,84 260,74 280,62";
  const grid = [30, 60, 90, 120];
  return (
    <svg className="NormaDiagram-svg" viewBox="0 0 280 140" preserveAspectRatio={compact ? "none" : "xMidYMid meet"}>
      {grid.map((y) => (
        <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#cbd5e1" strokeOpacity={compact ? 0.25 : 0.8} strokeWidth="1" />
      ))}
      <polyline points={`${seriesB} 280,140 0,140`} fill={CYAN} fillOpacity="0.25" stroke="none" />
      <polyline points={seriesB} fill="none" stroke={CYAN} strokeWidth="2" />
      <polyline points={`${seriesA} 280,140 0,140`} fill={BLUE} fillOpacity="0.3" stroke="none" />
      <polyline points={seriesA} fill="none" stroke={BLUE_DEEP} strokeWidth="2.2" />
    </svg>
  );
}

const CAPABILITIES = [
  {
    name: "Capital & reference metrics",
    desc: "Returns, volatility, Sharpe, concentration, inequality, and overall system health, paper-by-paper.",
    diagram: <HeatGrid rows={8} cols={13} seed={7} />,
  },
  {
    name: "Portfolio & system metrics",
    desc: "Returns, volatility, Sharpe, concentration, inequality, and overall system health, paper-by-paper.",
    diagram: <AreaChart />,
  },
  {
    name: "Synthetic data generators",
    desc: "Generate controlled citation networks at any density to test, benchmark, and reproduce results.",
    diagram: <DotNetwork seed={11} />,
  },
  {
    name: "Public Data Index",
    desc: "Sparsity matrix and citation Concentration patterns across the whole academic corpus.",
    diagram: <ScatterBand seed={23} />,
  },
];

const VISUALIZATIONS = [
  {
    name: "Citation network",
    caption: "View the citations matrix as a structural map — see where citations concentrate in the corpus.",
    diagram: <img className="NormaDiagram-img" src={conceptMetricsNetwork} alt="" />,
  },
  {
    name: "Capital allocation",
    caption: "Capital accrued by each researcher from each paper — bright cells are concentrated impact.",
    diagram: <HeatGrid rows={9} cols={15} seed={41} />,
  },
  {
    name: "Capital over time",
    caption: "How capital accumulates across the graph as citations arrive and contributions compound.",
    diagram: <img className="NormaDiagram-img" src={vizCapitalOverTime} alt="" />,
  },
];

const CONCEPTS = [
  {
    name: "Capital Matrix",
    caption: "Rows are papers, columns are researchers. Entry [i, j] is the capital researcher j accrued from paper i. Shape (papers × researchers).",
    diagram: <HeatGrid rows={10} cols={16} seed={53} />,
  },
  {
    name: "References Matrix",
    caption: "Papers on both axes. Entry [i, j] counts how often paper i cites paper j — the citation graph as a sparse matrix.",
    diagram: <img className="NormaDiagram-img" src={conceptReferencesMatrix} alt="" />,
  },
  {
    name: "Metrics",
    caption: "Portfolio, market, distribution, and system metrics quantify concentration, returns, risk, and the health of the whole network.",
    diagram: <img className="NormaDiagram-img" src={vizCitationNetwork} alt="" />,
  },
];

const OUTPUT_ROWS = [
  { label: "Total capital", value: "812412" },
  { label: "Volatility", value: "0.24" },
  { label: "Sharpe ratio", value: "1.87" },
  { label: "Papers x researchers", value: "100 x 240" },
];

function NormaPage() {
  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="NormaHero" id="intro">
        <Header />
        <div className="NormaHero-inner">
          <div className="NormaHero-content">
            <h1 className="NormaHero-title">Norma.</h1>
            <p className="NormaHero-subtitle">Research intelligence for the people who fund, hire, and shape science.</p>
            <p className="NormaHero-description">
              Inspect, compare, and visualize the impact of any researcher, lab, institution, field, or nation — built
              on Liberata's Academic Capital metrics, quality-control signals, and the scientometrics you already trust.
            </p>
            <div className="NormaHero-actions">
              {/* TODO: point at the real repository once public */}
              <button type="button" className="NormaHero-primary">View repository →</button>
              <a href="#norma-quickstart" className="NormaHero-secondary">See how it works</a>
            </div>
          </div>
          <div className="NormaHero-glass" aria-hidden="true">
            <img className="NormaHero-graph" src={heroGraph} alt="" />
            <div className="NormaHero-glass-footer">
              <span>citation_network.svg</span>
              <span>nodes = papers · edges = citations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="NormaBody">
        <KpiStrip kpis={KPIS} />

        <div className="NormaSection">
          <div className="section-heading">/Features</div>
          <h2 className="NormaSection-title">Data infrastructure for scientific AI</h2>
          <div className="NormaCards NormaCards-4">
            {CAPABILITIES.map((card) => (
              <div className="NormaCard" key={card.name}>
                <div className="NormaCard-illustration">{card.diagram}</div>
                <p className="NormaCard-name">{card.name}</p>
                <p className="NormaCard-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="NormaSection">
          <div className="section-heading">/Visualize</div>
          <h2 className="NormaSection-title">See how capital flows</h2>
          <div className="NormaCards NormaCards-3">
            {VISUALIZATIONS.map((panel) => (
              <div className="NormaCard" key={panel.name}>
                <div className="NormaCard-illustration NormaCard-illustration-tall">{panel.diagram}</div>
                <p className="NormaCard-name">{panel.name}</p>
                <p className="NormaCard-desc">{panel.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="NormaSection" id="norma-quickstart">
          <div className="section-heading">/Quickstart</div>
          <h2 className="NormaSection-title">From install to metrics in 30 seconds</h2>
          <div className="NormaQuickstart">
            <pre className="NormaCode">
<span className="tok-kw">from</span> liberata_metrics.generators <span className="tok-kw">import</span> <span className="tok-fn">generate_references_matrix</span>{"\n"}
<span className="tok-kw">from</span> liberata_metrics.metrics.portfolio_metrics <span className="tok-kw">import</span> <span className="tok-fn">PortfolioMetrics</span>{"\n\n"}
<span className="tok-comment"># generate a 100-paper test portfolio</span>{"\n"}
refs, ms_ids, ms_map, dates, meta, capital, contribs = \{"\n"}
{"  "}<span className="tok-fn">generate_references_matrix</span>(num_manuscripts=<span className="tok-num">100</span>, seed=<span className="tok-num">42</span>){"\n\n"}
<span className="tok-comment"># compute portfolio metrics</span>{"\n"}
pm = <span className="tok-fn">PortfolioMetrics</span>(capital){"\n"}
<span className="tok-kw">print</span>(f<span className="tok-str">"Total capital: {"{"}pm.total_capital():.2f{"}"}"</span>){"\n"}
<span className="tok-kw">print</span>(f<span className="tok-str">"Volatility:{"    "}{"{"}pm.compute_volatility():.4f{"}"}"</span>){"\n\n"}
<span className="tok-comment"># visualize the citation network</span>{"\n"}
matrix_visuals.<span className="tok-fn">plot_sparsity_pattern</span>(refs)
            </pre>
            <div className="NormaOutput">
              <p className="NormaOutput-header">// OUTPUT</p>
              {OUTPUT_ROWS.map((row) => (
                <div className="NormaOutput-row" key={row.label}>
                  <span className="NormaOutput-label">{row.label}</span>
                  <span className="NormaOutput-value">{row.value}</span>
                </div>
              ))}
              <div className="NormaOutput-chart">
                <img src={outputChart} alt="" />
              </div>
            </div>
          </div>
          {/* TODO: link to the real documentation once published */}
          <button type="button" className="NormaDocsButton">View full documentation</button>
        </div>

        <div className="NormaSection">
          <div className="section-heading">/Concepts</div>
          <h2 className="NormaSection-title">The data model</h2>
          <div className="NormaCards NormaCards-3">
            {CONCEPTS.map((panel) => (
              <div className="NormaCard" key={panel.name}>
                <div className="NormaCard-illustration NormaCard-illustration-tall">{panel.diagram}</div>
                <p className="NormaCard-name">{panel.name}</p>
                <p className="NormaCard-desc">{panel.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <ProductCta
          title="Open-source graph-based scientometrics."
          subtitle="Decision-grade intelligence on every researcher, lab, and institution — built on the world's most credibility-rich research corpus."
          primaryLabel="View repository →"
          secondaryLabel="View API docs"
        />
      </div>
    </div>
  );
}

export default NormaPage;
