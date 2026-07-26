import Header from "../components/Header";
import ProductCta from "../components/ProductCta";
import KpiStrip from "../components/KpiStrip";
import visualLayer from "../images/figma/textura/visual_layer.svg";
import sparkCapital from "../images/figma/textura/spark_capital.svg";
import sparkVolatility from "../images/figma/textura/spark_volatility.svg";
import sparkSharpe from "../images/figma/textura/spark_sharpe.svg";
import sparkGini from "../images/figma/textura/spark_gini.svg";
import featDocBadge from "../images/figma/textura/feat_doc_badge.svg";
import tag1 from "../images/figma/textura/tag_1.svg";
import tag2 from "../images/figma/textura/tag_2.svg";
import tag3 from "../images/figma/textura/tag_3.svg";
import tag4 from "../images/figma/textura/tag_4.svg";
import tag5 from "../images/figma/textura/tag_5.svg";
import apiArrows from "../images/figma/textura/api_arrows.svg";
import graphIllustration from "../images/figma/textura/graph_illustration.svg";
import iconDownloadArrow from "../images/figma/textura/icon_download_arrow.svg";
import iconDownloadBase from "../images/figma/textura/icon_download_base.svg";
import iconPackageTile from "../images/figma/textura/icon_package_tile.svg";
import iconDeliver from "../images/figma/textura/icon_deliver.svg";
import iconCloud from "../images/figma/textura/icon_cloud.svg";
import iconCloudArrow from "../images/figma/textura/icon_cloud_arrow.svg";
import "../App.css";
import "./TexturaPage.css";

const KPIS = [
  { label: "total_capital", value: "812,412", spark: sparkCapital },
  { label: "volatility", value: "0.24", spark: sparkVolatility },
  { label: "sharpe_ratio", value: "1.87", spark: sparkSharpe },
  { label: "gini", value: "0.62", spark: sparkGini },
];

const DATASETS = [
  { name: "Materials Science", records: "2.4M records · versioned daily" },
  { name: "Computer Science", records: "3.1M records · versioned daily" },
  { name: "Life Sciences", records: "4.8M records · versioned daily" },
];

const ENDPOINTS = [
  { method: "GET", path: "/v1/papers", desc: "List all papers published on the Liberata ledger." },
  { method: "POST", path: "/v1/submit", desc: "Initiate a new manuscript submission with ORCID auth." },
  { method: "GET", path: "/v1/metrics/:id", desc: "Retrieve contribution metrics for a specific paper." },
];

// Decorative citation-graph diagram approximated with SVG primitives from the
// wireframe's node coordinates (the design builds it from dozens of separate
// line/ellipse layers)
function RecordGraph() {
  const nodes = [
    { cx: 240, cy: 89, r: 8, fill: "#7caced" },
    { cx: 332, cy: 180, r: 12, fill: "#7c3aed" },
    { cx: 198, cy: 115, r: 8, fill: "#7caced" },
    { cx: 206, cy: 188, r: 8, fill: "#10b981" },
    { cx: 192, cy: 59, r: 15, fill: "#1384ff" },
    { cx: 60, cy: 67, r: 12.5, fill: "#7caced" },
    { cx: 242, cy: 151, r: 17, fill: "#112ea8" },
    { cx: 312, cy: 80, r: 13, fill: "#7caced" },
    { cx: 352, cy: 130, r: 16, fill: "#1384ff" },
    { cx: 443, cy: 79, r: 5.7, fill: "#7caced" },
    { cx: 430, cy: 127, r: 8.5, fill: "#7caced" },
    { cx: 117, cy: 163, r: 16, fill: "#7caced" },
  ];
  const edges = [
    [6, 0], [6, 2], [6, 3], [6, 8], [6, 11], [6, 1],
    [4, 2], [4, 5], [4, 0], [4, 7],
    [8, 9], [8, 10], [8, 1],
    [0, 7], [7, 9], [11, 3], [5, 11], [2, 11],
  ];
  return (
    <svg className="TexturaRecord-graph" viewBox="0 0 490 240" role="img" aria-label="Citation and co-authorship graph">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#94a3b8"
          strokeOpacity="0.45"
          strokeWidth="1.6"
        />
      ))}
      {nodes.map((node) => (
        <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} fillOpacity="0.85" />
      ))}
    </svg>
  );
}

function TexturaPage() {
  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="TexturaHero" id="intro">
        <Header />
        <div className="TexturaHero-content">
          <h1 className="TexturaHero-title">Textura.</h1>
          <p className="TexturaHero-subtitle">Scientific AI training data - structured, validated, and expert-annotated.</p>
          <p className="TexturaHero-description">
            The natural source of expert annotations on state-of-the-art scientific literature, paired with graph
            representations, for scientific AI that actually understands research.
          </p>
          <div className="TexturaHero-actions">
            {/* TODO: point at the real repository once public */}
            <button type="button" className="TexturaHero-primary">View repository →</button>
            <a href="#textura-how" className="TexturaHero-secondary">See how it works</a>
          </div>
        </div>
        <div className="TexturaHero-visual" aria-hidden="true">
          <img className="TexturaHero-network" src={visualLayer} alt="" />
          <div className="TexturaHero-cards">
            {[0, 1, 2, 3].map((i) => (
              <div className={`TexturaHero-pill TexturaHero-pill-${i}`} key={i}>
                <span style={{ width: "35%" }} />
                <span style={{ width: "55%" }} />
                <span style={{ width: "42%" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="TexturaBody">
        <KpiStrip kpis={KPIS} />

        <div className="TexturaSection">
          <div className="section-heading">/Features</div>
          <h2 className="TexturaSection-title">Data infrastructure for scientific AI</h2>
          <div className="TexturaFeatures">
            <div className="TexturaFeature">
              <div className="TexturaFeature-illustration">
                <div className="TexturaDoc">
                  <span className="TexturaDoc-line TexturaDoc-line-title" />
                  <span className="TexturaDoc-line" style={{ width: "70%" }} />
                  <span className="TexturaDoc-line" style={{ width: "48%" }} />
                  <span className="TexturaDoc-line" style={{ width: "55%" }} />
                  <span className="TexturaDoc-line" style={{ width: "63%" }} />
                  <span className="TexturaDoc-line" style={{ width: "45%" }} />
                  <img className="TexturaDoc-badge" src={featDocBadge} alt="" />
                </div>
              </div>
              <p className="TexturaFeature-name">Quality-Controlled</p>
              <p className="TexturaFeature-desc">
                Scholarly data validated through Scriptura's peer-review and replication signals - not scraped from the open web.
              </p>
            </div>
            <div className="TexturaFeature">
              <div className="TexturaFeature-illustration">
                <div className="TexturaTags">
                  <div className="TexturaTags-row"><img src={tag5} alt="" /></div>
                  <div className="TexturaTags-row"><img src={tag3} alt="" /><img src={tag4} alt="" /></div>
                  <div className="TexturaTags-row"><img src={tag1} alt="" /><img src={tag2} alt="" /></div>
                </div>
              </div>
              <p className="TexturaFeature-name">Field & Quality Tagging</p>
              <p className="TexturaFeature-desc">
                Every record segmented by discipline, time period, quality tier, and position in the citation graph.
              </p>
            </div>
            <div className="TexturaFeature">
              <div className="TexturaFeature-illustration">
                <img className="TexturaFeature-api" src={apiArrows} alt="" />
              </div>
              <p className="TexturaFeature-name">API Access</p>
              <p className="TexturaFeature-desc">
                Programmatic endpoints for continuous, versioned dataset delivery and customer automation.
              </p>
            </div>
            <div className="TexturaFeature">
              <div className="TexturaFeature-illustration">
                <img className="TexturaFeature-graph" src={graphIllustration} alt="" />
              </div>
              <p className="TexturaFeature-name">Graph Representations</p>
              <p className="TexturaFeature-desc">
                Graph-linked records with entity relationships, citation networks, and co-authorship topology.
              </p>
            </div>
          </div>
        </div>

        <div className="TexturaSection" id="textura-how">
          <div className="section-heading">/How it works</div>
          <h2 className="TexturaSection-title">From scholarly record to AI training data.</h2>
          <div className="TexturaSteps">
            <div className="TexturaStep">
              <div className="TexturaStep-tile">
                <span className="TexturaStep-icon">
                  <img className="TexturaStep-download-arrow" src={iconDownloadArrow} alt="" />
                  <img className="TexturaStep-download-base" src={iconDownloadBase} alt="" />
                </span>
              </div>
              <p className="TexturaStep-name">Ingest</p>
              <p className="TexturaStep-desc">
                Internal scrapers pull validated, peer-reviewed, replication-marked content from the Scriptura record.
              </p>
            </div>
            <div className="TexturaStep">
              <img className="TexturaStep-tile-img" src={iconPackageTile} alt="" />
              <p className="TexturaStep-name">Package & Tag</p>
              <p className="TexturaStep-desc">
                Tagging and segmentation software structures datasets by field, time, quality level, and graph position.
              </p>
            </div>
            <div className="TexturaStep">
              <div className="TexturaStep-tile">
                <img className="TexturaStep-deliver" src={iconDeliver} alt="" />
              </div>
              <p className="TexturaStep-name">Deliver</p>
              <p className="TexturaStep-desc">
                API endpoints and bulk exports ship continuously updated, versioned scientific training datasets.
              </p>
            </div>
            <div className="TexturaStep">
              <div className="TexturaStep-tile">
                <span className="TexturaStep-icon">
                  <img className="TexturaStep-cloud" src={iconCloud} alt="" />
                  <img className="TexturaStep-cloud-arrow" src={iconCloudArrow} alt="" />
                </span>
              </div>
              <p className="TexturaStep-name">Train</p>
              <p className="TexturaStep-desc">
                Graph-linked, expert-annotated records drop straight into pipelines for scientific AI that understands research.
              </p>
            </div>
          </div>
        </div>

        <div className="TexturaSection">
          <div className="section-heading">/Inside a record</div>
          <h2 className="TexturaSection-title">Every record is graph-linked and annotated</h2>
          <div className="TexturaRecord">
            <div className="TexturaRecord-card">
              <p className="TexturaRecord-paper">Graph Scientometrics for Share-Based Publishing</p>
              <p className="TexturaRecord-authors">Zhang, Sabath, Dunn, Brinson · 2026 · cs.DL</p>
              <div className="TexturaRecord-chips">
                <span className="TexturaChip TexturaChip-blue">field: cs.DL</span>
                <span className="TexturaChip TexturaChip-blue">tier: A</span>
                <span className="TexturaChip TexturaChip-purple">peer-reviewed</span>
                <span className="TexturaChip TexturaChip-green">replicated</span>
                <span className="TexturaChip TexturaChip-lightblue">cited +142</span>
              </div>
              <div className="TexturaRecord-canvas">
                <RecordGraph />
              </div>
              <p className="TexturaRecord-caption">Citation & co-authorship neighborhood travels with every record.</p>
            </div>
            <div className="TexturaJson">
              <p>{"{"}</p>
              <div className="TexturaJson-level">
                <p>"id": <span className="TexturaJson-str">"ark:/67531/metadc26"</span>,</p>
                <p>"field": <span className="TexturaJson-str">"cs.DL"</span>,</p>
                <p>"year": <span className="TexturaJson-num">2026</span>,</p>
                <p>"quality_tier": <span className="TexturaJson-str">"A"</span>,</p>
                <p>"signals": [<span className="TexturaJson-str">"peer_reviewed", "replicated"</span>],</p>
                <p>"academic_capital": <span className="TexturaJson-num">0.9842</span>,</p>
                <p>"graph": {"{"}</p>
                <div className="TexturaJson-level">
                  <p>"cites": <span className="TexturaJson-num">42</span>,</p>
                  <p>"cited_by": <span className="TexturaJson-num">142</span>,</p>
                  <p>"coauthors": <span className="TexturaJson-num">4</span></p>
                </div>
                <p>{"},"}</p>
                <p>"annotations": <span className="TexturaJson-str">"expert"</span></p>
              </div>
              <p>{"}"}</p>
            </div>
          </div>
        </div>

        <div className="TexturaSection">
          <div className="section-heading">/Datasets</div>
          <h2 className="TexturaSection-title">Slice the data by field, time, and quality</h2>
          <p className="TexturaSection-subtitle">
            Every dataset is filtered to the quality tiers you need and ships with full graph context.
          </p>
          <div className="TexturaDatasets">
            {DATASETS.map((dataset) => (
              <div className="TexturaDataset" key={dataset.name}>
                <p className="TexturaDataset-name">{dataset.name}</p>
                <p className="TexturaDataset-records">{dataset.records}</p>
                <div className="TexturaDataset-bar">
                  <span className="TexturaDataset-bar-a" />
                  <span className="TexturaDataset-bar-b" />
                  <span className="TexturaDataset-bar-c" />
                </div>
                <div className="TexturaDataset-legend">
                  <span><i className="TexturaDot TexturaDot-a" /> Tier A</span>
                  <span><i className="TexturaDot TexturaDot-b" /> Tier B</span>
                  <span><i className="TexturaDot TexturaDot-c" /> Tier C</span>
                </div>
                <div className="TexturaRecord-chips">
                  <span className="TexturaChip TexturaChip-blue TexturaChip-square">graph-linked</span>
                  <span className="TexturaChip TexturaChip-purple TexturaChip-square">annotated</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="TexturaSection">
          <div className="section-heading">/Getting Started</div>
          <h2 className="TexturaSection-title">Integration Guide</h2>
          <div className="TexturaCurl">
            curl -X GET <span className="TexturaJson-str">"https://api.liberata.org/v1/papers"</span>
            {"      "}-H <span className="TexturaJson-str">"Authorization: Bearer YOUR_API_KEY"</span>
          </div>
          <div className="TexturaEndpoints">
            {ENDPOINTS.map((endpoint) => (
              <div className="TexturaEndpoint" key={endpoint.path}>
                <span className={`TexturaMethod TexturaMethod-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                <div className="TexturaEndpoint-info">
                  <p className="TexturaEndpoint-path">{endpoint.path}</p>
                  <p className="TexturaEndpoint-desc">{endpoint.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* TODO: link to the real API documentation once published */}
          <button type="button" className="TexturaDocsButton">View full documentation</button>
        </div>

        <ProductCta
          title="The scholarly record, ready for AI."
          subtitle="License structured scientific training data built on the world's most credibility-rich research corpus."
          primaryLabel="Request dataset access →"
          secondaryLabel="View API docs"
        />
      </div>
    </div>
  );
}

export default TexturaPage;
