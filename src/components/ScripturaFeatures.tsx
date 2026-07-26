import iconFileText from "../images/figma/products/icon_file_text.svg";
import iconRefreshCw from "../images/figma/scriptura/icon_refresh_cw.svg";
import iconShieldCheck from "../images/figma/scriptura/icon_shield_check.svg";
import iconSearch from "../images/figma/scriptura/icon_search.svg";
import ProductFeatureShowcase, { ShowcaseFeature } from "./ProductFeatureShowcase";

const FEATURES: ShowcaseFeature[] = [
  {
    key: "preprints",
    name: "Preprints & Papers",
    icon: <img src={iconFileText} alt="" />,
    gridDesc: "Host, version, and cite your work with DOI-linked records. Open access by default, and you keep the copyright.",
    altDesc: "Host, version, and cite your work with DOI-linked records. Open access by default, and you keep the copyright.",
    label: "/Preprints & Papers",
    headline: "Publishing that you actually own",
    longDesc:
      "Post a preprint the moment it's ready, attach your data and code, and get a citable, DOI-linked record — without signing your rights over to a journal.",
    points: [
      { lead: "Open by default.", text: "Every paper is free to read and download. No subscription, no paywall, no account required to access the work." },
      { lead: "Keep your copyright.", text: "No transfer of rights and no $2,000–$10,000 article-processing charge. The work stays yours to distribute." },
      { lead: "A versioned record.", text: "Revisions are tracked over time, so each reviewer's and replicator's contribution stays tied to the exact version they worked on." },
      { lead: "Honest contribution splits.", text: "Declare who did what up front. Anomalous share splits are easy to spot with graph metrics and get flagged." },
    ],
  },
  {
    key: "peer-review",
    name: "Peer Review Marketplace",
    icon: <img src={iconRefreshCw} alt="" />,
    gridDesc: "Offer reviewers a share of credit, so review is rewarded for improving the work — with enforced deadlines.",
    altDesc: "Commission and trade structured peer review with transparent, verifiable credit.",
    label: "/Peer Review Marketplace",
    headline: "Review that's worth doing",
    longDesc:
      "Authors post a review request offering a share of credit in the paper. Reviewers bid, the best matches are accepted, and everyone's incentive points the same way: toward making the work better.",
    points: [
      { lead: "Credit, not charity.", text: "Reviewers earn shares of the paper, so careful, substantive review is rewarded — not just getting it 'done'." },
      { lead: "On the clock.", text: "Every review runs against an enforced deadline. Miss it and the review simply doesn't count — with no penalty to the paper." },
      { lead: "Blind where it matters.", text: "Reviewers stay anonymous and can't see each other's comments. Authors see only coarse, anonymized credentials, so they choose on merit, not name." },
      { lead: "Conflict-proof.", text: "Authors and co-authors can't review their own work, and unusual author–reviewer patterns get flagged for collusion." },
    ],
  },
  {
    key: "replication",
    name: "Replication Marketplace",
    icon: <img src={iconShieldCheck} alt="" />,
    gridDesc: "Request or take on replications for a verified stake in the work. Reproducibility readers can trust.",
    altDesc: "Request or offer replications; build a verified record of reproducibility.",
    label: "/Replication Marketplace",
    headline: "Reproducibility, finally rewarded",
    longDesc:
      "Authors offer a stake in their paper to independent labs that reproduce the results. Replicators get durable credit instead of competing against the work for citations — and readers get a trust signal they can check.",
    points: [
      { lead: "A real market.", text: "Post a request with the shares offered, the timeline, the resources you'll provide, and whether negative results are accepted. Replicators accept or counter-offer." },
      { lead: "Verified, attached, visible.", text: "Completed replications live on the paper as a badge, readable at a glance from search results." },
      { lead: "Named and accountable.", text: "Replicators are non-anonymous, so their credentials and track record are fully transparent to authors and readers." },
      { lead: "Built to converge on truth.", text: "If a replication finds something different, authors can revise at no penalty rather than bury it — and a rejected replicator can publish their own findings instead." },
    ],
  },
  {
    key: "collections",
    name: "Collections",
    icon: <img src={iconSearch} alt="" />,
    gridDesc: "Search 250M+ open works at fine-grained precision, then save them into project folders and live journals.",
    altDesc: "Editors and institutions organize research into canonical, citable collections.",
    label: "/Collections",
    headline: "Find the right work, then keep it",
    longDesc:
      "Search 250M+ open papers at a granularity legacy tools can't reach, ranked by what authors actually meant — then organize what you find into project folders and journals that update themselves.",
    points: [
      { lead: "Precise by design.", text: "Search down to fine-grained topic tags, not the few dozen broad buckets of older tools. Results respect author-intended classification over keyword guessing." },
      { lead: "Quality over prestige.", text: "Filter and sort by Academic Capital, replications, saves, and reviews — real usage signals, not journal brand or impact factor." },
      { lead: "Open to everyone.", text: "Search, read, download, and share with no account. Only saving to a collection needs a login." },
      { lead: "Collections & journals.", text: "Bookmark papers into project folders, and spin up “journals” — custom feeds by tag, author, institution, and quality bar — that surface new preprints, reviews, and replications as they land." },
    ],
  },
];

function ScripturaFeatures() {
  return <ProductFeatureShowcase features={FEATURES} />;
}

export default ScripturaFeatures;
